// Copyright (C) 2014 Park Shinjo.
// Based on en.qml:
/*
 * Copyright (C) 2012-2013 Jolla ltd and/or its subsidiary(-ies). All rights reserved.
 *
 * Contact: Pekka Vuorela <pekka.vuorela@jollamobile.com>
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list
 * of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 * Neither the name of Jolla Ltd nor the names of its contributors may be
 * used to endorse or promote products derived from this software without specific
 * prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
 * THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import QtQuick 2.0
import Sailfish.Silica 1.0 as Silica
import ".."

KeyboardLayout {
    id: main

    // enables possibility to use own InputHandler,
    // disables autocaps and text prediction
    type: "custom"
    Component.onCompleted: {
        // disable autocaps
        keyboard.autocaps = false
    }
    
    KeyboardRow {
        CharacterKey {
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
            enabled: Silica.Clipboard.hasText
            opacity: enabled ? (pressed ? 0.6 : 1.0)
                             : 0.3
            key: Qt.Key_Paste
            
            Image {
                anchors.centerIn: parent
                source: "image://theme/icon-m-clipboard?"
                        + (parent.pressed ? Silica.Theme.highlightColor : Silica.Theme.primaryColor)
            }
        }
        CharacterKey {
            caption: "ㄱ"; captionShifted: "1"; symView: "("; symView2: "{"; 
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        CharacterKey {
            caption: "ㄴ"; captionShifted: "2"; symView: ")"; symView2: "}"
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        CharacterKey {
            caption: "ㅏㅓ"; captionShifted: "3"; symView: "!"; symView2: "$"
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        SymbolKey {
            caption: keyboard.inSymView ? "한글" : "기호" // symbols/hangul
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
            // separator: false
        }
    }

    KeyboardRow {
        ContextAwareCommaKey {
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        CharacterKey {
            caption: "ㄹ"; captionShifted: "4"; symView: "<"; symView2: "["
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        CharacterKey {
            caption: "ㅁ"; captionShifted: "5"; symView: ">"; symView2: "]"
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        CharacterKey {
            caption: "ㅗㅜ"; captionShifted: "6"; symView: "?"; symView2: "₩"
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        SpacebarKey {
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
    }

    KeyboardRow {
        CharacterKey {
            caption: "."; captionShifted: "."; symView: "."; symView2: "."
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        CharacterKey {
            caption: "ㅅ"; captionShifted: "7"; symView: "#"; symView2: "^"
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        CharacterKey {
            caption: "ㅇ"; captionShifted: "8"; symView: "+"; symView2: "="
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        CharacterKey {
            caption: "ㅣ"; captionShifted: "9"; symView: "-"; symView2: "_"
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        BackspaceKey {
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
            separator: false
        }
    }

    KeyboardRow {
        ShiftKey {
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        CharacterKey {
            caption: "획추가"; captionShifted: "*"; symView: "@"; symView2: "\""
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        CharacterKey {
            caption: "ㅡ"; captionShifted: "0"; symView: "&"; symView2: "~" 
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        CharacterKey { 
            caption: "쌍자음"; captionShifted: "#"; symView: ":"; symView2: ";"
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        EnterKey {
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
            separator: false
        }
    }

}
