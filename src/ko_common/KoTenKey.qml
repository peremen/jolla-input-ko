import QtQuick 2.0
import "../.."

CharacterKey {
    // For cheonjiin plus layout with separate buttons for jaum
    property bool plusMode: false
    height: geometry.keyHeightPortrait
    implicitWidth: plusMode ? main.width / 10 : main.width / 5
}
