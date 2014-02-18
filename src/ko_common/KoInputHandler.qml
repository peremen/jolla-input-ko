import QtQuick 2.0
import Sailfish.Silica 1.0
import com.jolla.keyboard 1.0
import ".."
import "../.."

import "2set_handler.js" as Ko2SetHandler


InputHandler { 
    Component.onCompleted: init()
    
    function init() {
        Ko2SetHandler.reset()
    }
    
    function handleKeyClick() {
        var handled = false
        keyboard.expandedPaste = false

        if (pressedKey.key === Qt.Key_Backspace) {
            // If backspace is not handled by libhangul, forward to default handler
            handled = Ko2SetHandler.backspace()
            if (handled) {
                updateString()
                if (Ko2SetHandler.isEmpty()) {
                    // Needs workaround: setting empty preedit string does not invalidate it
                    MInputMethodQuick.sendCommit("")
                }
            } else {
                if (Ko2SetHandler.getPreeditString().length > 0) {
                    flush()
                }
            }
        } else if (pressedKey.key === Qt.Key_Space || pressedKey.key === Qt.Key_Return) {
            // Send both commit and preedit string 
            flush()
            if (keyboard.shiftState !== ShiftState.LockedShift) {
                keyboard.shiftState = ShiftState.NoShift
            }
        } else if (pressedKey.text.length !== 0) {
            if (!Ko2SetHandler.ko_2set_qwerty_map.hasOwnProperty(pressedKey.text)) {
                flush()
                return false
            }
            handled = Ko2SetHandler.process(Ko2SetHandler.ko_2set_qwerty_map[pressedKey.text].charCodeAt(0))
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
        cstr = Ko2SetHandler.flush()
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
        cstr = Ko2SetHandler.getCommitString()
        pstr = Ko2SetHandler.getPreeditString()
        
        if (cstr.length > 0) {
            MInputMethodQuick.sendCommit(cstr)
            Ko2SetHandler.flushCommitString()
        }
        
        if (pstr.length > 0) {
            MInputMethodQuick.sendPreedit(pstr)
        }
    }
     
    function reset() {
        Ko2SetHandler.reset()
    }
    
}
