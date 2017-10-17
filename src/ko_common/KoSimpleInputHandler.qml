/*
    This is an extension to Dotdanbae
    Copyright (C) 2017- Topias Vainio <toxip@disroot.org>.  All rights reserved

    This file is part of Dotdanbae.
    Copyright (C) 2014- Shinjo Park <me@peremen.name>. All rights reserved.

    Dotdanbae is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Dotdanbae is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Dotdanbae. If not, see <http://www.gnu.org/licenses/>.
 */

import QtQuick 2.0
import com.meego.maliitquick 1.0
import Sailfish.Silica 1.0
import com.jolla.keyboard 1.0
import ".."
import "../.."

import "cheonjiin_naratgeul.js" as KoHandler


InputHandler {
    Component.onCompleted: init()

    Component {
        id: pasteComponent
        PasteButton {
            onClicked: {
                flush()
                MInputMethodQuick.sendCommit(Clipboard.text)
                keyboard.expandedPaste = false
            }
        }
    }

    Component {
        id: verticalPasteComponent
        PasteButton {
            width: parent.width
            height: geometry.keyHeightLandscape

            onClicked: {
                flush()
                MInputMethodQuick.sendCommit(Clipboard.text)
            }
        }
    }

    function init() {
        KoHandler.init('simple')
    }

    onActiveChanged: {
        if (!active) {
            flush();
        }
    }

    function handleKeyClick() {
        var handled = false
        keyboard.expandedPaste = false

        if (pressedKey.key === Qt.Key_Backspace) {
            // If backspace is not handled by Cheonjiin handler, forward to default handler
            handled = KoHandler.backspace()
            if (handled) {
                updateString()
                if (KoHandler.isEmpty()) {
                    // Needs workaround: setting empty preedit string does not invalidate it
                    MInputMethodQuick.sendCommit("")
                }
            }
        } else if (pressedKey.key === Qt.Key_Space || pressedKey.key === Qt.Key_Return) {
            // Send both commit and preedit string
            flush()
            if (keyboard.shiftState !== ShiftState.LockedShift) {
                keyboard.shiftState = ShiftState.NoShift
            }
        } else if (pressedKey.text.length !== 0) {
            if (!KoHandler.ko_key_map.hasOwnProperty(pressedKey.text)) {
                flush()
                return false
            }
            handled = KoHandler.process(pressedKey.text)
            updateString()
            // No case in Hangul: always reset shift status
            if (keyboard.shiftState !== ShiftState.LockedShift) {
                keyboard.shiftState = ShiftState.NoShift
            }
        }
        return handled
    }

    function flush() {
        var cstr = ""
        cstr = KoHandler.flush()
        if (cstr.length > 0) {
            MInputMethodQuick.sendCommit(cstr)
        } else {
            MInputMethodQuick.sendCommit("")
        }
        MInputMethodQuick.sendPreedit("")
    }

    function updateString() {
        var pstr = ""
        var cstr = ""
        pstr = KoHandler.getPreeditString()
        cstr = KoHandler.getCommitString()

        if (cstr.length > 0) {
            MInputMethodQuick.sendCommit(cstr)
            KoHandler.flushCommitString()
        }

        if (pstr.length > 0) {
            MInputMethodQuick.sendPreedit(pstr)
        }
    }

    function reset() {
        KoHandler.reset('simple')
    }

    topItem: Component {
        TopItem {
            SilicaListView {
                id: predictionList

                orientation: ListView.Horizontal
                anchors.fill: parent
                header: pasteComponent
                boundsBehavior: !keyboard.expandedPaste && Clipboard.hasText ? Flickable.DragOverBounds : Flickable.StopAtBounds

                onDraggingChanged: {
                    if (!dragging && !keyboard.expandedPaste && contentX < -(headerItem.width + Theme.paddingLarge)) {
                        keyboard.expandedPaste = true
                        positionViewAtBeginning()
                    }
                }

                Connections {
                    target: Clipboard
                    onTextChanged: {
                        if (Clipboard.hasText) {
                            // need to have updated width before repositioning view
                            positionerTimer.restart()
                        }
                    }
                }

                Timer {
                    id: positionerTimer
                    interval: 10
                    onTriggered: predictionList.positionViewAtBeginning()
                }
            }
        }
    }

    verticalItem: Component {
        Item {
            id: verticalContainer

            SilicaListView {
                id: verticalList

                anchors.fill: parent
                clip: true
                header: Component {
                    PasteButtonVertical {
                        visible: Clipboard.hasText
                        width: verticalList.width
                        height: visible ? geometry.keyHeightLandscape : 0
                        popupParent: verticalContainer
                        popupAnchor: 2 // center

                        onClicked: {
                            flush()
                            MInputMethodQuick.sendCommit(Clipboard.text)
                        }
                    }
                }

                Connections {
                    target: Clipboard
                    onTextChanged: {
                        verticalList.positionViewAtBeginning()
                        clipboardChange.restart()
                    }
                }

                Timer {
                    id: clipboardChange
                    interval: 1000
                }
            }
        }
    }
}
