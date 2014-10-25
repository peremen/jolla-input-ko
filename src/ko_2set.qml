// Copyright (C) 2014 Park Shinjo.
// Based on en.qml

import QtQuick 2.0
import Sailfish.Silica 1.0
import ".."

KeyboardLayout {
    // enables possibility to use own InputHandler,
    // disables autocaps and text prediction
    type: "custom"
    Component.onCompleted: {
        // disable autocaps
        keyboard.autocaps = false
    }
    
    KeyboardRow {
        CharacterKey { caption: "ㅂ"; captionShifted: "ㅃ"; symView: "1"; symView2: "€"; accents: "ㅃ" }
        CharacterKey { caption: "ㅈ"; captionShifted: "ㅉ"; symView: "2"; symView2: "£"; accents: "ㅉ" }
        CharacterKey { caption: "ㄷ"; captionShifted: "ㄸ"; symView: "3"; symView2: "$"; accents: "ㄸ" }
        CharacterKey { caption: "ㄱ"; captionShifted: "ㄲ"; symView: "4"; symView2: "₩"; accents: "ㄲ" }
        CharacterKey { caption: "ㅅ"; captionShifted: "ㅆ"; symView: "5"; symView2: "₹"; accents: "ㅆ" }
        CharacterKey { caption: "ㅛ"; captionShifted: "ㅛ"; symView: "6"; symView2: "%" }
        CharacterKey { caption: "ㅕ"; captionShifted: "ㅕ"; symView: "7"; symView2: "<" }
        CharacterKey { caption: "ㅑ"; captionShifted: "ㅑ"; symView: "8"; symView2: ">" }
        CharacterKey { caption: "ㅐ"; captionShifted: "ㅒ"; symView: "9"; symView2: "["; accents: "ㅒ" }
        CharacterKey { caption: "ㅔ"; captionShifted: "ㅖ"; symView: "0"; symView2: "]"; accents: "ㅖ" }
    }

    KeyboardRow {
        CharacterKey { caption: "ㅁ"; captionShifted: "ㅁ"; symView: "*"; symView2: "`" }
        CharacterKey { caption: "ㄴ"; captionShifted: "ㄴ"; symView: "#"; symView2: "^" }
        CharacterKey { caption: "ㅇ"; captionShifted: "ㅇ"; symView: "+"; symView2: "|" }
        CharacterKey { caption: "ㄹ"; captionShifted: "ㄹ"; symView: "-"; symView2: "_" }
        CharacterKey { caption: "ㅎ"; captionShifted: "ㅎ"; symView: "="; symView2: "§" }
        CharacterKey { caption: "ㅗ"; captionShifted: "ㅗ"; symView: "("; symView2: "{" }
        CharacterKey { caption: "ㅓ"; captionShifted: "ㅓ"; symView: ")"; symView2: "}" }
        CharacterKey { caption: "ㅏ"; captionShifted: "ㅏ"; symView: "!"; symView2: "¡" }
        CharacterKey { caption: "ㅣ"; captionShifted: "ㅣ"; symView: "?"; symView2: "¿" }
    }

    KeyboardRow {
        ShiftKey {}

        CharacterKey { caption: "ㅋ"; captionShifted: "ㅋ"; symView: "@"; symView2: "«" }
        CharacterKey { caption: "ㅌ"; captionShifted: "ㅌ"; symView: "&"; symView2: "»" }
        CharacterKey { caption: "ㅊ"; captionShifted: "ㅊ"; symView: "/"; symView2: "\"" }
        CharacterKey { caption: "ㅍ"; captionShifted: "ㅍ"; symView: "\\"; symView2: "“" }
        CharacterKey { caption: "ㅠ"; captionShifted: "ㅠ"; symView: "'"; symView2: "”" }
        CharacterKey { caption: "ㅜ"; captionShifted: "ㅜ"; symView: ";"; symView2: "„" }
        CharacterKey { caption: "ㅡ"; captionShifted: "ㅡ"; symView: ":"; symView2: "~" }

        BackspaceKey {}
    }
    
    KeyboardRow {
        SymbolKey {
            caption: keyboard.inSymView ? "한글" : "?123" // symbols/hangul
        }
        
        ContextAwareCommaKey {}
        SpacebarKey {
            fixedWidth: true
        }
        CharacterKey {
            caption: "."
            captionShifted: "."
            symView: "."
            symView2: "."
            width: punctuationKeyWidth
        }

        EnterKey {}
    }

}
