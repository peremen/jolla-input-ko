import QtQuick 2.0
import Sailfish.Silica 1.0 as Silica
import com.jolla.keyboard 1.0
import ".."
import "ko_common"

KeyboardLayout {
    id: main

    type: "custom"
    Component.onCompleted: {
        keyboard.autocaps = false
    }

    height: portraitMode == false ? geometry.keyHeightLandscape * 4
                     :  geometry.keyHeightPortrait * 4

    KeyboardRow {
        KoArrowKey {
            direction: "left"
        }
        KoTenKey { caption: "ㅣ"; captionShifted: "1"; symView: "("; symView2: "{"; }
        KoTenKey { caption: "ㆍ"; captionShifted: "2"; symView: ")"; symView2: "}" }
        KoTenKey { caption: "ㅡ"; captionShifted: "3"; symView: "/"; symView2: "$" }
        KoTenKey {
            enabled: Silica.Clipboard.hasText
            separator: SeparatorState.HiddenSeparator
            opacity: enabled ? (pressed ? 0.6 : 1.0)
            : 0.3
            key: Qt.Key_Paste

            Image {
                anchors.centerIn: parent
                source: "image://theme/icon-m-clipboard?"
                + (parent.pressed ? Silica.Theme.highlightColor : Silica.Theme.primaryColor)
            }
        }
    }

    KeyboardRow {
        KoArrowKey {
            direction: "right"
        }
        KoTenKey { caption: "ㄱㅋ"; captionShifted: "4"; symView: "<"; symView2: "[" }
        KoTenKey { caption: "ㄴㄹ"; captionShifted: "5"; symView: ">"; symView2: "]" }
        KoTenKey { caption: "ㄷㅌ"; captionShifted: "6"; symView: "@"; symView2: "₩" }
        SpacebarKey {
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
    }

    KeyboardRow {
        ShiftKey {
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        KoTenKey { caption: "ㅂㅍ"; captionShifted: "7"; symView: "#"; symView2: "^" }
        KoTenKey { caption: "ㅅㅎ"; captionShifted: "8"; symView: "+"; symView2: "=" }
        KoTenKey { caption: "ㅈㅊ"; captionShifted: "9"; symView: "-"; symView2: "_" }
        BackspaceKey {
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
    }

    KeyboardRow {
        SymbolKey {
            caption: keyboard.inSymView ? "한글" : "기호" // symbols/hangul
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
        KoTenKey { caption: ".,"; captionShifted: "*"; symView: ":"; symView2: ";" }
        KoTenKey { caption: "ㅇㅁ"; captionShifted: "0"; symView: "&"; symView2: "~" }
        KoTenKey { caption: "?!"; captionShifted: "#"; symView: "\'"; symView2: "\"" }
        EnterKey {
            implicitWidth: main.width / 5
            height: geometry.keyHeightPortrait
        }
    }
}
