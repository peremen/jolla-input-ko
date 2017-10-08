/*
    This is an extension to Dotdanbae
    Copyright (C) 2017- Topias Vainio <toxip@disroot.org>.  All rights reserved

    This file is part of Dotdanbae.
    Copyright (C) 2014- Shinjo Park <me@peremen.name>. All rights reserved

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
import Sailfish.Silica 1.0
import com.jolla.keyboard 1.0
import "../.."

PasteButtonBase {
    id: pasteContainer
    property int separator: SeparatorState.AutomaticSeparator
    property bool implicitSeparator: true // set by layouting

    enabled: Clipboard.hasText
    height: portraitMode == false ? geometry.keyHeightLandscape
                                  : geometry.keyHeightPortrait

    KeySeparator {
        visible: (separator === SeparatorState.AutomaticSeparator && implicitSeparator)
                 || separator === SeparatorState.VisibleSeparator
    }

    Image {
        id: pasteIcon
        opacity: pasteContainer.enabled ? (pasteContainer.pressed ? 0.6 : 1.0) : 0.3
        anchors.centerIn: parent
        source: "image://theme/icon-m-clipboard?"
        + (parent.pressed ? Theme.highlightColor : Theme.primaryColor)
    }

    onClicked: {
        MInputMethodQuick.sendCommit(Clipboard.text)
        keyboard.expandedPaste = false
    }
}
