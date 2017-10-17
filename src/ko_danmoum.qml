/*
    This file is an extension to Dotdanbae
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

    This file contains code from Jolla, original copyright notice is following.
 */
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
import Sailfish.Silica 1.0
import com.jolla.keyboard 1.0
import ".."
import "ko_common"

KeyboardLayout {
    id: main
    splitSupported: true

    // enables possibility to use own InputHandler,
    // disables autocaps and text prediction
    type: "custom"
    Component.onCompleted: {
        // disable autocaps
        keyboard.autocaps = false
    }

    KeyboardRow {
        separateButtonSizes: attributes.inSymView
        splitIndex: 4

        CharacterKey { caption: "ㅂ"; captionShifted: "ㅃ"; symView: "1"; symView2: "€"; accents: "ㅃ" }
        CharacterKey { caption: "ㅈ"; captionShifted: "ㅉ"; symView: "2"; symView2: "£"; accents: "ㅉ" }
        CharacterKey { caption: "ㄷ"; captionShifted: "ㄸ"; symView: "3"; symView2: "$"; accents: "ㄸ" }
        CharacterKey { caption: "ㄱ"; captionShifted: "ㄲ"; symView: "4"; symView2: "₩"; accents: "ㄲ" }
        CharacterKey { caption: "ㅅ"; captionShifted: "ㅆ"; symView: "5"; symView2: "₹"; accents: "ㅆ" }
        CharacterKey { caption: "ㅗ"; captionShifted: "ㅛ"; symView: "6"; symView2: "%" }
        CharacterKey { active: attributes.inSymView;       symView: "7"; symView2: "<" }
        CharacterKey { active: attributes.inSymView;       symView: "8"; symView2: ">" }
        CharacterKey { caption: "ㅐ"; captionShifted: "ㅒ"; symView: "9"; symView2: "["; accents: "ㅒ" }
        CharacterKey { caption: "ㅔ"; captionShifted: "ㅖ"; symView: "0"; symView2: "]"; accents: "ㅖ" }
    }

    KeyboardRow {
        separateButtonSizes: attributes.inSymView
        splitIndex: 4

        CharacterKey { caption: "ㅁ"; captionShifted: "ㅁ"; symView: "*"; symView2: "`" }
        CharacterKey { caption: "ㄴ"; captionShifted: "ㄴ"; symView: "#"; symView2: "^" }
        CharacterKey { caption: "ㅇ"; captionShifted: "ㅇ"; symView: "+"; symView2: "|" }
        CharacterKey { caption: "ㄹ"; captionShifted: "ㄹ"; symView: "-"; symView2: "_" }
        CharacterKey { caption: "ㅎ"; captionShifted: "ㅎ"; symView: "="; symView2: "§" }
        CharacterKey { active: attributes.inSymView;       symView: "("; symView2: "{" }
        CharacterKey { caption: "ㅓ"; captionShifted: "ㅕ"; symView: ")"; symView2: "}" }
        CharacterKey { caption: "ㅏ"; captionShifted: "ㅑ"; symView: "!"; symView2: "¡" }
        CharacterKey { caption: "ㅣ"; captionShifted: "ㅣ"; symView: "?"; symView2: "¿" }
    }

    KeyboardRow {
        separateButtonSizes: attributes.inSymView
        splitIndex: 5

        ShiftKey {
            implicitWidth: attributes.inSymView ? shiftKeyWidth : shiftKeyWidthNarrow
        }

        CharacterKey { caption: "ㅋ"; captionShifted: "ㅋ"; symView: "@"; symView2: "«" }
        CharacterKey { caption: "ㅌ"; captionShifted: "ㅌ"; symView: "&"; symView2: "»" }
        CharacterKey { caption: "ㅊ"; captionShifted: "ㅊ"; symView: "/"; symView2: "\"" }
        CharacterKey { caption: "ㅍ"; captionShifted: "ㅍ"; symView: "\\"; symView2: "“" }
        CharacterKey { active: attributes.inSymView;       symView: "'"; symView2: "”" }
        CharacterKey { caption: "ㅜ"; captionShifted: "ㅠ"; symView: ";"; symView2: "„" }
        CharacterKey { caption: "ㅡ"; captionShifted: "ㅡ"; symView: ":"; symView2: "~" }

        BackspaceKey {}
    }

    KeyboardRow {
        splitIndex: 3

        SymbolKey {
            caption: keyboard.inSymView ? "한글" : "?123" // symbols/hangul
            onPressedChanged: updateSizes()
        }

        ContextAwareCommaKey {}
        SpacebarKey {}
        SpacebarKey {
            active: splitActive
            languageLabel: ""
        }
        CharacterKey {
            caption: "."
            captionShifted: "."
            symView: "."
            symView2: "."
            implicitWidth: punctuationKeyWidth
            fixedWidth: !splitActive
            separator: SeparatorState.HiddenSeparator
        }

        EnterKey {}
    }

}
