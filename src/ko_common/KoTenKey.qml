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
import com.jolla.keyboard 1.0
import "../.."

CharacterKey {
    // For cheonjiin plus layout with separate buttons for jaum
    property bool plusMode: false
    property bool plusDouble: false
    property int widthDiv: plusMode ? 8 : plusDouble ? 4 : 5
    height: portraitMode == false ? geometry.keyHeightLandscape
                     :  geometry.keyHeightPortrait
    separator: SeparatorState.VisibleSeparator
    implicitWidth: main.width / widthDiv
}
