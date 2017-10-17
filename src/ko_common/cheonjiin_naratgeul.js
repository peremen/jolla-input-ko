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

var ko_key_arr = [
    'ㅣ', 'ㆍ', 'ㅡ',
    'ㄱㅋ', 'ㄴㄹ', 'ㄷㅌ',
    'ㅂㅍ', 'ㅅㅎ', 'ㅈㅊ',
    ',.', 'ㅇㅁ', '?!',
    'ㄱ', 'ㅋ', 'ㄲ', 'ㄴ', 'ㄹ', 'ㄷ', 'ㅌ', 'ㄸ',
    'ㅂ', 'ㅍ', 'ㅃ', 'ㅅ', 'ㅎ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅉ',
    'ㅇ', 'ㅁ',
    'ㅏㅓ', 'ㅗㅜ',
    '획추가', '쌍자음',
];

var merge_map = {
    'ㅣㆍ': 'ㅏ', 'ㅡㅣ': 'ㅢ', 'ㆍㅣ': 'ㅓ', 'ㆍㅡ': 'ㅗ', 'ㅡㆍ': 'ㅜ', 'ㆍㆍ': '：',
    // if you press · three times it returns to single dot
    '：ㆍ': 'ㆍ', 'ㅑㆍ': 'ㅏ', 'ㅠㆍ': 'ㅜ',
    'ㅏㆍ': 'ㅑ', '：ㅣ': 'ㅕ', '：ㅡ': 'ㅛ', 'ㅜㆍ': 'ㅠ',
    'ㅏㅣ': 'ㅐ', 'ㅓㅣ': 'ㅔ',
    'ㅑㅣ': 'ㅒ', 'ㅕㅣ': 'ㅖ',
    'ㅠㅣ': 'ㅜㅓ',
    // cheonjiin layout
    'ㄱㄱㅋ': 'ㅋ', 'ㅋㄱㅋ': 'ㄲ', 'ㄲㄱㅋ': 'ㄱ',
    'ㄴㄴㄹ': 'ㄹ', 'ㄹㄴㄹ': 'ㄴ',
    'ㄷㄷㅌ': 'ㅌ', 'ㅌㄷㅌ': 'ㄸ', 'ㄸㄷㅌ': 'ㄷ',
    'ㅂㅂㅍ': 'ㅍ', 'ㅍㅂㅍ': 'ㅃ', 'ㅃㅂㅍ': 'ㅂ',
    'ㅅㅅㅎ': 'ㅎ', 'ㅎㅅㅎ': 'ㅆ', 'ㅆㅅㅎ': 'ㅅ',
    'ㅈㅈㅊ': 'ㅊ', 'ㅊㅈㅊ': 'ㅉ', 'ㅉㅈㅊ': 'ㅈ',
    'ㅇㅇㅁ': 'ㅁ', 'ㅁㅇㅁ': 'ㅇ',
    // cheonjiin plus layout
    'ㅋㅋ': 'ㄲ', 'ㄲㅋ': 'ㅋ',
    'ㅌㅌ': 'ㄸ', 'ㄸㅌ': 'ㅌ',
    'ㅍㅍ': 'ㅃ', 'ㅃㅍ': 'ㅍ',
    'ㅎㅎ': 'ㅆ', 'ㅆㅎ': 'ㅎ',
    'ㅊㅊ': 'ㅉ', 'ㅉㅊ': 'ㅊ',
    ',,.': '.',
    '??!': '!',
    // naratgeul layout
    'ㅏㅏㅓ': 'ㅓ', 'ㅓㅏㅓ': 'ㅏ',
    'ㅗㅗㅜ': 'ㅜ', 'ㅜㅗㅜ': 'ㅗ',
    'ㅜㅏㅓ': 'ㅜㅓ',
    'ㅏ획추가': 'ㅑ', 'ㅑ획추가': 'ㅏ',
    'ㅓ획추가': 'ㅕ', 'ㅕ획추가': 'ㅓ',
    'ㅗ획추가': 'ㅛ', 'ㅛ획추가': 'ㅗ',
    'ㅜ획추가': 'ㅠ', 'ㅠ획추가': 'ㅜ',
    'ㄱ획추가': 'ㅋ', 'ㅋ획추가': 'ㄱ',
    'ㄴ획추가': 'ㄷ', 'ㄷ획추가': 'ㅌ', 'ㅌ획추가': 'ㄴ',
    'ㅁ획추가': 'ㅂ', 'ㅂ획추가': 'ㅍ', 'ㅍ획추가': 'ㅁ',
    'ㅅ획추가': 'ㅈ', 'ㅈ획추가': 'ㅊ', 'ㅊ획추가': 'ㅅ',
    'ㅇ획추가': 'ㅎ', 'ㅎ획추가': 'ㅇ',
    'ㄱ쌍자음': 'ㄲ', 'ㄲ쌍자음': 'ㄱ',
    'ㄷ쌍자음': 'ㄸ', 'ㄸ쌍자음': 'ㄷ',
    'ㅂ쌍자음': 'ㅃ', 'ㅃ쌍자음': 'ㅂ',
    'ㅅ쌍자음': 'ㅆ', 'ㅆ쌍자음': 'ㅅ',
    'ㅈ쌍자음': 'ㅉ', 'ㅉ쌍자음': 'ㅈ'
};

// To prevent cutting preedit when choosing the second jong
var combinable_jong = [
    'ㄱㅅㅎ',
    'ㄴㅈㅊ',
    'ㄴㅅㅎ',
    'ㄹㄱㅋ',
    'ㄹㅇㅁ',
    'ㄹㅂㅍ',
    'ㄹㅅㅎ',
    'ㄹㄷㅌ',
    'ㅂㅅㅎ',
    'ㄱㅅ',
    'ㄴㅈ',
    'ㄴㅎ',
    'ㄹㄱ',
    'ㄹㅁ',
    'ㄹㅂ',
    'ㄹㅅ',
    'ㄹㅌ',
    'ㄹㅍ',
    'ㄹㅎ',
    'ㅂㅅ'
];

var loopable = [
    'ㄱㅋ',
    'ㄴㄹ',
    'ㄷㅌ',
    'ㅂㅍ',
    'ㅅㅎ',
    'ㅈㅊ',
    'ㅇㅁ',
    'ㅏㅓ',
    'ㅗㅜ',
    '획추가',
    '쌍자음',
];

function _makeHash(array){
    var length = array.length, hash = {};
    for (var i = 0; i < length; i++) {
        if(array[i]) {
            hash[array[i]] = i;
        }
    }
    return hash;
}

var combinable_jong_groups = _makeHash(combinable_jong);
var ko_key_map = _makeHash(ko_key_arr);
var loopable_map = _makeHash(loopable);

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
    if (str.length > 1 && lastChar != 'ㆍ' && lastChar != '：'
                       && !_isCombinable(prev, key)
                       && !_isLoopable(key)) {
        cstr = str.slice(0,-1);
        str = lastChar;
        inputQ = Hangul.h.d(str);
    }
}

function _isCombinable(prev, key) {
    if (combinable_jong_groups.hasOwnProperty(prev + key)) {
        return true;
    }
    return false;
}

function _isLoopable(key) {
    if (loopable_map.hasOwnProperty(key) && prevKey == key || key.length > 2) {
        return true;
    }
    return false;
}

function process(key) {
    if (inputQ.length == 0 && key !== '획추가' && key !== '쌍자음') {
        inputQ.push(key.charAt(0));
    } else {
        if (key == '획추가' && Hangul.h.isVowel(inputQ[inputQ.length-1])
                           && Hangul.h.isVowel(inputQ[inputQ.length-2])
                           && Hangul.h.a(inputQ).length < 2) {
            return true;
        }
        if (key == '쌍자음' && !Hangul.h.isConsonant(inputQ[inputQ.length-1])) {
            return true;
        }
        var merged = _mergePrev([inputQ.pop(), key]);
        inputQ.push(merged[0]);
        if (merged.length == 2 && merged[1] !== '획추가' && merged[1] !== '쌍자음') {
            inputQ.push(merged[1].charAt(0));
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
