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

.import "hangul.js" as Hangul;

var max_preedit_len = 8;
var inputQ = [];
var prevKey = "";

// Commit string
var cstr = "";

var ko_cheonjiin_map = {
    'ㅣ': 'ㅣ', 'ㆍ': 'ㆍ', 'ㅡ': 'ㅡ',
    'ㄱㅋ': 'ㄱ', 'ㄴㄹ': 'ㄴ', 'ㄷㅌ': 'ㄷ',
    'ㅂㅍ': 'ㅂ', 'ㅅㅎ': 'ㅅ', 'ㅈㅊ': 'ㅈ',
    '.,': '.', 'ㅇㅁ': 'ㅇ', '?!': '?'
};

var merge_map = {
    'ㅣㆍ': 'ㅏ', 'ㅡㅣ': 'ㅢ', 'ㆍㅣ': 'ㅓ', 'ㆍㅡ': 'ㅗ', 'ㅡㆍ': 'ㅜ', 'ㆍㆍ': '：',
    // if you press · three times it returns to single dot
    '：ㆍ': 'ㆍ', 'ㅑㆍ': 'ㅏ', 'ㅠㆍ': 'ㅜ',
    'ㅏㆍ': 'ㅑ', '：ㅣ': 'ㅕ', '：ㅡ': 'ㅛ', 'ㅜㆍ': 'ㅠ',
    'ㅏㅣ': 'ㅐ', 'ㅓㅣ': 'ㅔ',
    'ㅑㅣ': 'ㅒ', 'ㅕㅣ': 'ㅖ',
    'ㅠㅣ': 'ㅜㅓ',
    'ㄱㄱ': 'ㅋ', 'ㅋㄱ': 'ㄲ', 'ㄲㄱ': 'ㄱ',
    'ㄴㄴ': 'ㄹ', 'ㄹㄴ': 'ㄴ',
    'ㄷㄷ': 'ㅌ', 'ㅌㄷ': 'ㄸ', 'ㄸㄷ': 'ㄷ',
    'ㅂㅂ': 'ㅍ', 'ㅍㅂ': 'ㅃ', 'ㅃㅂ': 'ㅂ',
    'ㅅㅅ': 'ㅎ', 'ㅎㅅ': 'ㅆ', 'ㅆㅅ': 'ㅅ',
    'ㅈㅈ': 'ㅊ', 'ㅊㅈ': 'ㅉ', 'ㅉㅈ': 'ㅈ',
    '..': ',', ',.': '.',
    'ㅇㅇ': 'ㅁ', 'ㅁㅇ': 'ㅇ',
    '??': '!', '!?': '?'
};

// To prevent cutting preedit when choosing the second jong
var combinable_jong_groups = {
'ㄱㅅ': null,
'ㄴㅈ': null,
'ㄴㅅ': null,
'ㄹㄱ': null,
'ㄹㅇ': null,
'ㄹㅂ': null,
'ㄹㅅ': null,
'ㄹㄷ': null,
'ㅂㅅ': null
};

function _mergePrev(arr) {
    var str = arr.join('');
    if (merge_map.hasOwnProperty(str)) {
        return merge_map[str].split('');
    }
    return arr;
}

function _mergeQ() {
    var str = Hangul.h.a(inputQ);
    return str;
}

function _updateBlock(key) {
    var str = _mergeQ();
    var lastChar = str.slice(-1);
    var prev = inputQ[inputQ.length-2];
    if (str.length > 1 && lastChar != 'ㆍ' && lastChar != '：' && !_isCombinableGroup(prev, key)) {
        cstr = str.slice(0,-1);
        str = lastChar;
        inputQ = Hangul.h.d(str);
    }
}

function _isCombinableGroup(prev, key) {
    if (prevKey == key) {
        return true;
    }
    if (combinable_jong_groups.hasOwnProperty(prev + key)) {
        return true;
    }
    return false;
}

function process(key) {
    if (inputQ.length == 0) {
        inputQ.push(key);
    /*} else if (key == '?' || key == '.') {
        if (prevKey != key) {
            _flushQ();
        }
        */
    } else {
        var merged = _mergePrev([inputQ.pop(), key]);
        inputQ.push(merged[0]);
        if (merged.length == 2) {
            inputQ.push(merged[1]);
        }
        _updateBlock(key);
    }
    prevKey = key;
    return true;
}

function backspace() {
    if (inputQ.length > 0) {
        inputQ.pop();
        return true;
    }
    return false;
}

function isEmpty() {
    return inputQ.length == 0 ? true: false;
}

function reset() {
    cstr = "";
    inputQ = [];
}

function _flushQ() {
    cstr += _mergeQ();
    inputQ = [];
};

function getCommitString() {
    return cstr;
}

function getPreeditString() {
    return _mergeQ();
}

function flushCommitString() {
    cstr = "";
}

function flush() {
    var ret = cstr + _mergeQ();
    reset();
    return ret;
}
