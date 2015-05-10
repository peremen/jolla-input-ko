/*
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
import Sailfish.Silica 1.0
import com.jolla.keyboard 1.0
import ".."
import "../.."

import "naratgeul_handler.js" as KoNaratgeulHandler


InputHandler { 
    Component.onCompleted: init()
    
    function init() {
        KoNaratgeulHandler.reset()
    }
    
    function handleKeyClick() {
        var handled = false
        keyboard.expandedPaste = false

        if (pressedKey.key === Qt.Key_Backspace) {
            // If backspace is not handled by libhangul, forward to default handler
            handled = KoNaratgeulHandler.backspace()
            if (handled) {
                updateString()
                if (KoNaratgeulHandler.isEmpty()) {
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
            if (!KoNaratgeulHandler.ko_naratgeul_map.hasOwnProperty(pressedKey.text)) {
                flush()
                return false
            }
            handled = KoNaratgeulHandler.process(KoNaratgeulHandler.ko_naratgeul_map[pressedKey.text])
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
        cstr = KoNaratgeulHandler.flush()
        if (cstr.length > 0) {
            MInputMethodQuick.sendCommit(cstr)
        } else {
            MInputMethodQuick.sendCommit("")
        }
        MInputMethodQuick.sendPreedit("")
    }
    
    function updateString() {
        var cstr = ""
        var pstr = ""
        cstr = KoNaratgeulHandler.getCommitString()
        pstr = KoNaratgeulHandler.getPreeditString()
        
        if (cstr.length > 0) {
            MInputMethodQuick.sendCommit(cstr)
            KoNaratgeulHandler.flushCommitString()
        }
        
        if (pstr.length > 0) {
            MInputMethodQuick.sendPreedit(pstr)
        }
    }
     
    function reset() {
        KoNaratgeulHandler.reset()
    }
    
}
