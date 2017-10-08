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
/* Copyright (c) 2014 Janne Edelman <janne.edelman@gmail.com>
 * Copyright (C) 2012-2013 Jolla Ltd.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list
 * of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 * Neither the name of Nokia Corporation nor the names of its contributors may be
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
 */

import QtQuick 2.0
import com.meego.maliitquick 1.0
import Sailfish.Silica 1.0
import ".."
import "../.."

FunctionKey {
    property string direction
    icon.source: ((direction === "up") ? "image://theme/icon-m-up"
               :  (direction === "down") ? "image://theme/icon-m-down"
               :  (direction === "left") ? "image://theme/icon-m-left"
               :  (direction === "right") ? "image://theme/icon-m-right" : "")
    icon.opacity: pressed ? 0.6 : 1
    repeat: true
    key: ((direction === "up") ? Qt.Key_Up
               :  (direction === "down") ? Qt.Key_Down
               :  (direction === "left") ? Qt.Key_Left
               :  (direction === "right") ? Qt.Key_Right : Qt.Key_Unknown)
    background.visible: false

    onPressedChanged: {
    	if(pressed) {
    	    arrowKeyPress()
    	    if(repeat) {
    		autorepeatTimer.interval = 800
    		autorepeatTimer.start()
    	    }
    	} else {
    	    autorepeatTimer.stop();
    	}
    }

    Timer {
        id: autorepeatTimer
        repeat: true

        onTriggered: {
            interval = 80
            if (pressed) {
                arrowKeyPress()
            } else {
                stop()
            }
        }
    }

    function arrowKeyPress() { }
}
