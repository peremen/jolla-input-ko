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

var max_preedit_len = 8;
var inputQ = new Array(6 * max_preedit_len +1).join('0').split('').map(parseFloat)
var cur_q_idx = 0;

var ko_naratgeul_map = {
    'ㄱ': 1, 'ㄴ': 2, 'ㅏㅓ': 3,
    'ㄹ': 4, 'ㅁ': 5, 'ㅗㅜ': 6,
    'ㅅ': 7, 'ㅇ': 8, 'ㅣ': 9,
    '획추가': 10, 'ㅡ': 11, '쌍자음': 12,
};

var key_class_map = {
    1:0, 2:0, 3:1,
    4:0, 5:0, 6:1,
    7:0, 8:0, 9:1,
    10:2, 11:1, 12:3
};

var key_chars = [[0], [1], [3], [20, 22], [6], [7], [24, 26], [10], [12], [29], [0], [28], [0]];
var transform_addstroke = [0, 16, 2, 4, 17, 5, 6, 8, 18, 9, 13, 11, 19, 15, 14, 10, 1, 3, 7, 12, 21, 20, 23, 22, 25, 24, 27, 26, 29, 28];
var transform_double = [0, 2, 1, 3, 5, 4, 6, 7, 9, 8, 11, 10, 12, 14, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

var cstr = ""; // Commit string

/* Adaption into libhangul-like API.
 * Since we don't use any DOM object here, API like libhangul is more suitable.
 */

function backspace() {
    var cleared = false;
    if (inputQ[cur_q_idx]) {
        inputQ[cur_q_idx] = 0;
        cleared = true;
        if (cur_q_idx == 0) return true;
    }
    for (var i = cur_q_idx; i >= 0; i--) {
        if (inputQ[i]) {
            if (cleared) {
                cur_q_idx = i;
                return true;
            } else {
                inputQ[i] = 0;
                cleared = true;
                continue;
            }
        }
    }
    return false;
}

function isEmpty() {
    return cur_q_idx == 0 && inputQ[0] == 0;
}


function merge_jung(a, b, c) {
    var arr1 = [0, 2, 4, 6, 8, 12, 13, 17, 18, 20];
    var arr2 = [1, 3, 5, 7];
    if (a == 0) return -1;
    if (b == 0 && c == 0) {
        return arr1[a - 20];
    } else {
        if (20 <= a && a <= 23) {
            if (b == 29 && c == 0) {
                return arr2[a - 20];
            } else {
                return -1;
            }
        } else if (a == 24) {
            if (b == 20) {
                return (c == 0) ? 9 : ((c == 29) ? 10 : -1);
            } else if (b == 29) {
                return (c == 0) ? 11 : -1;
            } else {
                return -1;
            }
        } else if (a == 26) {
            if (b == 22) {
                return (c == 0) ? 14 : ((c == 29) ? 15 : -1);
            } else if (b == 29) {
                return (c == 0) ? 16 : -1;
            } else {
                return -1;
            }
        } else if (a == 28) {
            if (b == 29 && c == 0) return 19;
            else return -1;
        } else {
            return -1;
        }
    }
}

function merge_jong(a, b) {
    //ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ
    var arr1 = [1, 2, 4, 7, -1, 8, 16, 17, -1, 19, 20, 21, 22, -1, 23, 24, 25, 26, 27];
    if (a == 0 && b == 0) return Array(0, -1);
    if (b == 0) {
        if (arr1[a - 1] > 0) return Array(arr1[a - 1], -1);
        else {
            return Array(0, a - 1);
        }
    } else {
        if (a == 1) { // ㄳ
            if (b == 10) return Array(3, -1);
            else return Array(1, b - 1);
        } else if (a == 3) { // ㄵ, ㄶ
            if (b == 13) return Array(5, -1);
            else if (b == 19) return Array(6, -1);
            else return Array(4, b - 1);
        } else if (a == 6) { // ㄺ ㄻ ㄼ ㄽ ㄾ ㄿ ㅀ
            if (b == 1) return Array(9, -1);
            else if (b == 7) return Array(10, -1);
            else if (b == 8) return Array(11, -1);
            else if (b == 10) return Array(12, -1);
            else if (b == 17) return Array(13, -1);
            else if (b == 18) return Array(14, -1);
            else if (b == 19) return Array(15, -1);
            else return Array(8, b - 1);
        } else if (a == 8) { // ㅄ
            if (b == 10) return Array(18, -1);
            else return Array(17, b - 1);
        } else { // anything else
            return Array(arr1[a - 1], b - 1);
        }
    }
}

function merge_q() {
    var i, str = "";
    //ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ
    var ja_transform = [1, 2, 4, 7, 8, 9, 0x11, 0x12, 0x13, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E];
    //ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅘ ㅙ ㅚ ㅛ ㅜ ㅝ ㅞ ㅟ ㅠ ㅡ ㅢ ㅣ
    var mo_transform = [0x1F, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, 0x2E, 0x2F, 0x30, 0x31, 0x32, 0x33];
    for (i = 0; i < max_preedit_len; i++) {
        var cho = inputQ[i * 6] - 1;
        var jung = merge_jung(inputQ[i * 6 + 1], inputQ[i * 6 + 2], inputQ[i * 6 + 3]);
        var jong = merge_jong(inputQ[i * 6 + 4], inputQ[i * 6 + 5]);
        //addlogmessage(cho + "," + jung + "," + jong);

        if (cho == -1 && jung == -1 && jong[0] <= 0) return str;
        if (cho > -1 && jung > -1 && jong[0] > -1) { // Has both cho and jung
            str += String.fromCharCode(0xAC00 + cho * 588 + jung * 28 + jong[0]);
        } else if (cho > -1 && jung == -1) { // Cho only
            str += String.fromCharCode(0x3130 + ja_transform[cho]);
        } else if (cho == -1 && jung > -1) { // Jung only
            str += String.fromCharCode(0x3130 + mo_transform[jung]);
        }
        if (jong[1] > -1) {
            str += String.fromCharCode(0x3130 + ja_transform[jong[1]]);
        }
    }
    return str;
}

function reset() {
    cur_q_idx = 0;
    cstr = "";
    inputQ = new Array(6 * max_preedit_len  +1).join('0').split('').map(parseFloat)
    //addlogmessage("Queue reset.");
}

function flush_q() {
    cstr += merge_q();
    cur_q_idx = 0;
    inputQ = new Array(6 * max_preedit_len +1).join('0').split('').map(parseFloat)
}

function process(key) {
    // param k: key text from KoNaratgeulInputHandler, translated by map
    var t;
    var key_class = key_class_map[key];
    if (key_class == 0) {
        if (cur_q_idx % 6 == 0) { // Jaum
            if (inputQ[cur_q_idx] == 0) {
                inputQ[cur_q_idx] = key_chars[key][0];
            } else {
                cur_q_idx += 6;
                if (cur_q_idx >= 6 * max_preedit_len) {
                    flush_q();
                }
                inputQ[cur_q_idx] = key_chars[key][0];
            }
        } else if (cur_q_idx % 6 == 1 || cur_q_idx % 6 == 2 || cur_q_idx % 6 == 3) {
            // 1, 2, 3: Jung
            // Jaum should go to jong part
            cur_q_idx += (4 - cur_q_idx % 6);
            inputQ[cur_q_idx] = key_chars[key][0];
        } else if (cur_q_idx % 6 == 4) {
            // 4: Jong part 1
            if (inputQ[cur_q_idx] == 0) {
                inputQ[cur_q_idx] = key_chars[key][0];
            } else {
                var ret = merge_jong(inputQ[cur_q_idx], inputQ[cur_q_idx + 1]);
                if (ret[0] <= 0) {
                    // Invalid jong, move to n+1 and start from n+2
                    cur_q_idx += 2;
                    if (cur_q_idx >= 6 * max_preedit_len) {
                        t = inputQ[cur_q_idx - 2];
                        inputQ[cur_q_idx - 2] = 0;
                        flush_q();
                        inputQ[cur_q_idx] = t;
                    } else {
                        inputQ[cur_q_idx] = inputQ[cur_q_idx - 2];
                        inputQ[cur_q_idx - 2] = 0;
                    }
                    cur_q_idx += 6;
                    inputQ[cur_q_idx] = key_chars[key][0];
                } else {
                    // Start new jong
                    cur_q_idx++;
                    inputQ[cur_q_idx] = key_chars[key][0];
                }
            }
        } else {
            // 5: jong part 2
            if (inputQ[cur_q_idx] == 0) {
                inputQ[cur_q_idx] = key_chars[key][0];
            } else {
                var ret = merge_jong(inputQ[cur_q_idx - 1], inputQ[cur_q_idx]);
                // Assertion: ret[0] != -1 (filtered before)
                if (ret[1] == -1) {
                    // No trailing char, move to n+1
                    cur_q_idx++;
                    if (cur_q_idx >= 6 * max_preedit_len) {
                        flush_q();
                    }
                    inputQ[cur_q_idx] = key_chars[key][0];
                } else {
                    // Has trailing char, move to n+1 and start from n+2
                    cur_q_idx += 1;
                    if (cur_q_idx >= 6 * max_preedit_len) {
                        t = inputQ[cur_q_idx - 1];
                        inputQ[cur_q_idx - 1] = 0;
                        flush_q();
                        inputQ[cur_q_idx] = t;
                    } else {
                        inputQ[cur_q_idx] = inputQ[cur_q_idx - 1];
                        inputQ[cur_q_idx - 1] = 0;
                    }
                    cur_q_idx += 6;
                    inputQ[cur_q_idx] = key_chars[key][0];
                }
            }
        }
    } else if (key_class == 1) {
        if (cur_q_idx % 6 == 0) {
            // Insert first moum
            cur_q_idx++;
            inputQ[cur_q_idx] = key_chars[key][0];
        } else if (cur_q_idx % 6 == 1) {
            // First moum, double press only possible here
            if (inputQ[cur_q_idx] == key_chars[key][0]) {
                // Handle double press
                if (key_chars[key].length == 2) {
                    inputQ[cur_q_idx] = key_chars[key][1];
                } else {
                    // Key has only 1 moum, insert another
                    cur_q_idx += 6;
                    if (cur_q_idx >= 6 * max_preedit_len) {
                        flush_q();
                        cur_q_idx = 1;
                    }
                    inputQ[cur_q_idx] = key_chars[key][0];
                }
            } else if (inputQ[cur_q_idx] == key_chars[key][1]) {
                // Handle double press
                inputQ[cur_q_idx] = key_chars[key][0];
            } else {
                // Different key pressed, combination start
                if (20 <= inputQ[cur_q_idx] && inputQ[cur_q_idx] <= 23) { // ㅏ, ㅑ, ㅓ, ㅕ
                    if (key_chars[key][0] == 29) { // ㅐ, ㅒ, ㅔ, ㅖ, no further combination
                        cur_q_idx++;
                        inputQ[cur_q_idx] = 29;
                    } else { // start new vowel
                        cur_q_idx += 6;
                        if (cur_q_idx >= 6 * max_preedit_len) {
                            flush_q();
                            cur_q_idx = 1;
                        }
                        inputQ[cur_q_idx] = key_chars[key][0];
                    }
                } else if (inputQ[cur_q_idx] == 24 || inputQ[cur_q_idx] == 26) { // ㅗ, ㅜ
                    if (key_chars[key][0] == 20) { // ㅘ, ㅝ, can combine
                        cur_q_idx++;
                        inputQ[cur_q_idx] = (inputQ[cur_q_idx - 1] == 24) ? 20 : 22;
                    } else if (key_chars[key][0] == 29) { // ㅚ, ㅟ, no further combination
                        cur_q_idx++;
                        inputQ[cur_q_idx] = 29;
                    } else {
                        // Not allowed combination
                        cur_q_idx += 6;
                        if (cur_q_idx >= 6 * max_preedit_len) {
                            flush_q();
                            cur_q_idx = 1;
                        }
                        inputQ[cur_q_idx] = key_chars[key][0];
                    }
                } else if (inputQ[cur_q_idx] == 28) { // ㅡ
                    // ㅢ, no further combination
                    if (key_chars[key][0] == 29) {
                        cur_q_idx++;
                        inputQ[cur_q_idx] = 29;
                    } else {
                        // Not allowed combination
                        cur_q_idx += 6;
                        if (cur_q_idx >= 6 * max_preedit_len) {
                            flush_q();
                            cur_q_idx = 1;
                        }
                        inputQ[cur_q_idx] = key_chars[key][0];
                    }
                } else {
                    // Not allowed combination
                    cur_q_idx += 6;
                    if (cur_q_idx >= 6 * max_preedit_len) {
                        flush_q();
                        cur_q_idx = 1;
                    }
                    inputQ[cur_q_idx] = key_chars[key][0];
                }
            }
        } else if (cur_q_idx % 6 == 2) {
            // Only allow ㅘ, ㅝ + ㅣ
            if (key_chars[key][0] == 29) {
                // 24, 20 26, 22
                if ((inputQ[cur_q_idx - 1] == 24 && inputQ[cur_q_idx] == 20) ||
                    (inputQ[cur_q_idx - 1] == 26 && inputQ[cur_q_idx] == 22)) {
                    cur_q_idx++;
                    inputQ[cur_q_idx] = 29;
                } else {
                    cur_q_idx += 5;
                    if (cur_q_idx >= 6 * max_preedit_len) {
                        flush_q();
                        cur_q_idx = 1;
                    }
                    inputQ[cur_q_idx] = key_chars[key][0];
                }
            } else {
                cur_q_idx += 5;
                if (cur_q_idx >= 6 * max_preedit_len) {
                    flush_q();
                    cur_q_idx = 1;
                }
                inputQ[cur_q_idx] = key_chars[key][0];
            }
        } else if (cur_q_idx % 6 == 3) {
            // All combined
            cur_q_idx += 4;
            if (cur_q_idx >= 6 * max_preedit_len) {
                flush_q();
                cur_q_idx = 1;
            }
            inputQ[cur_q_idx] = key_chars[key][0];
        } else if (cur_q_idx % 6 == 4) {
            // Use jong as next cho and vowel
            cur_q_idx += 2;
            if (cur_q_idx >= 6 * max_preedit_len) {
                t = inputQ[cur_q_idx - 2];
                inputQ[cur_q_idx - 2] = 0;
                flush_q();
                inputQ[cur_q_idx] = t;
            } else {
                inputQ[cur_q_idx] = inputQ[cur_q_idx - 2];
                inputQ[cur_q_idx - 2] = 0;
            }
            cur_q_idx++;
            inputQ[cur_q_idx] = key_chars[key][0];
        } else if (cur_q_idx % 6 == 5) {
            // Use jong[5] as next cho and vowel
            cur_q_idx++;
            if (cur_q_idx >= 6 * max_preedit_len) {
                t = inputQ[cur_q_idx - 1];
                inputQ[cur_q_idx - 1] = 0;
                flush_q();
                inputQ[cur_q_idx] = t;
            } else {
                inputQ[cur_q_idx] = inputQ[cur_q_idx - 1];
                inputQ[cur_q_idx - 1] = 0;
            }
            cur_q_idx++;
            inputQ[cur_q_idx] = key_chars[key][0];
        }
    } else if (key_class == 2) {
        if (cur_q_idx % 6 == 0 || cur_q_idx % 6 == 1 || cur_q_idx % 6 == 4 || cur_q_idx % 6 == 5) {
            inputQ[cur_q_idx] = transform_addstroke[inputQ[cur_q_idx]];
        }
    } else if (key_class == 3) {
        if (cur_q_idx % 6 == 0 || cur_q_idx % 6 == 4 || cur_q_idx % 6 == 5) {
            inputQ[cur_q_idx] = transform_double[inputQ[cur_q_idx]];
        }
    }
    return true;
}

function getCommitString() {
    return cstr;
}

function getPreeditString() {
    return merge_q();
}

function flushCommitString() {
    cstr = "";
}

function flushPreeditString() {
    flush_q();
}

function flush() {
    var ret = cstr + merge_q();
    reset();
    return ret;
}
