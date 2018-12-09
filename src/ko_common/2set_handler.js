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

    This file contains code from ohi, original copyright notice is following.
 */

/*
 * Author : Ho-Seok Ee <hsee@korea.ac.kr>
 * Release: 2006/07/14
 * Update : 2011/01/22

 Copyright (C) Ho-Seok Ee <hsee@korea.ac.kr>. All rights reserved.
 
  This program is free software; you can redistribute it and/or
  modify it under the terms of the GNU General Public License as
  published by the Free Software Foundation; either version 2 of
  the License, or (at your option) any later version.
 
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.
 
  The license can be found at http://www.gnu.org/licenses/gpl.txt.
 */

/*
 * Inverse mapping between Hangul syllables and corresponding QWERTY key
 */

var ko_2set_qwerty_map = {
    'ㅂ': 'q', 'ㅈ': 'w', 'ㄷ': 'e', 'ㄱ': 'r', 'ㅅ': 't', 'ㅛ': 'y', 'ㅕ': 'u', 'ㅑ': 'i', 'ㅐ': 'o', 'ㅔ': 'p',
    'ㅃ': 'Q', 'ㅉ': 'W', 'ㄸ': 'E', 'ㄲ': 'R', 'ㅆ': 'T', 'ㅒ': 'O', 'ㅖ': 'P',
    'ㅁ': 'a', 'ㄴ': 's', 'ㅇ': 'd', 'ㄹ': 'f', 'ㅎ': 'g', 'ㅗ': 'h', 'ㅓ': 'j', 'ㅏ': 'k', 'ㅣ': 'l',
    'ㅋ': 'z', 'ㅌ': 'x', 'ㅊ': 'c', 'ㅍ': 'v', 'ㅠ': 'b', 'ㅜ': 'n', 'ㅡ': 'm',
};

var ohiQ = Array(0,0,0,0,0,0);
var cstr = ""; // Commit string
var pstr = ""; // Preedit string

/* Part of ohi source code.
 */

function ohiDoubleJamo(a, c, d) {
        var i, a=Array( // Double Jamos
                Array(Array(1,7,18,21,24),1,7,18,21,24), // Cho
                Array(Array(39,44,49),Array(31,32,51),Array(35,36,51),51), // Jung
                Array(Array(1,4,9,18,21),Array(1,21),Array(24,30),Array(1,17,18,21,28,29,30),Array(0,21),21))[a]; // Jong
        for (i=a[0].length; c!=a[0][i-1]; i--) if (!i) return i;
        for (a=a[i], i=a.length||1; 1; i--) if (!i || d==a || d==a[i-1]) return i;
}

function ohiInsert(m, c) { // Insert
        if (!c && ohiQ=='0,0,0,0,0,0') return true;
        if (c.length!=6) ohiQ=Array(0,0,0,0,0,0);
        else {
                var m=m||'0,0,0,0,0,0', i=c[0]+c[1], j=c[2]+c[3], k=c[4]+c[5];
                c=i&&j?0xac00+(i-(i<3?1:i<5?2:i<10?4:i<20?11:12))*588+(j-31)*28+k-(k<8?0:k<19?1:k<25?2:3):0x3130+(i||j||k);
        }
        
        pstr = (m == '0,0,0,0,0,0' || c && pstr.length > 1 ? '' : pstr) + String.fromCharCode(c);
        if (c && m) {
            cstr = cstr + pstr.substr(0, pstr.length - 1);
            pstr = pstr.substr(-1);
        }
}

function ohiHangul2(c) { // 2-Bulsik
        if (c<65 || (c-1)%32>25) {
            //ohiInsert(0,c);
            return false;
        } // Filter out ![a-zA-Z]
        else if ((c=Array(17,48,26,23,7,9,30,39,33,35,31,51,49,44,32,36,18,1,4,21,37,29,24,28,43,27)[c%32-1]
                        +(c==79||c==80?2:c==69||c==81||c==82||c==84||c==87?1:0))<31) { // Jaum
                if ((!ohiQ[5] || !(ohiQ[0]=-1)) && ohiQ[2]) ohiQ[5]=ohiDoubleJamo(2,ohiQ[4],c);
                if (!ohiQ[2] || ohiQ[0]<0 || ohiQ[0] && (!ohiQ[4] || !ohiQ[5]) && (ohiQ[4] || c==8 || c==19 || c==25))
                        ohiInsert((ohiQ=ohiQ[1]||ohiQ[2]||!ohiDoubleJamo(0,ohiQ[0],c)?ohiQ:0),ohiQ=Array(c,ohiQ?0:1,0,0,0,0));
                else if (!ohiQ[0] && (ohiQ[0]=c) || (ohiQ[4]=ohiQ[4]||c)) ohiInsert(0,ohiQ);
                if (ohiQ[5]) ohiQ[5]=c;
        }
        else { // Moum
                if ((!ohiQ[3] || ohiQ[4] || !(ohiQ[2]=-1)) && !ohiQ[4]) ohiQ[3]=ohiDoubleJamo(1,ohiQ[2],c);
                if ((ohiQ[0] && ohiQ[2]>0 && ohiQ[4]) && (ohiQ[5] || !(ohiQ[5]=ohiQ[4]) || !(ohiQ[4]=0))) {
                        ohiInsert(0,Array(ohiQ[0],ohiQ[1],ohiQ[2],ohiQ[3],ohiQ[4],0));
                        ohiInsert(ohiQ,ohiQ=Array(ohiQ[5],0,c,0,0,0));
                }
                else if ((!ohiQ[0] || ohiQ[2]) && (!ohiQ[3] || ohiQ[4]) || ohiQ[2]<0) ohiInsert(ohiQ,ohiQ=Array(0,0,c,0,0,0));
                else if (ohiQ[2]=ohiQ[2]||c) ohiInsert(0,ohiQ);
        }
        return true;
}

/* Adaption of ohi into libhangul-like API.
 * Since we don't use any DOM object here, API like libhangul is more suitable.
 */

function backspace() {
    if (ohiQ[1] || ohiQ[3] || ohiQ[0] && ohiQ[2]) { // Backspace
        for (var i=5; !ohiQ[i];) i--;
        ohiInsert(ohiQ[i]=0, ohiQ);
        return true;
    }
    if (ohiQ[0]) {
        ohiQ[0]=0;
        pstr = "";
        return true;
    }
    return false;
}

function isEmpty() {
    return ohiQ == '0,0,0,0,0,0';
}

function process(k) {
    // param k: key text from Ko2SetInputHandler, translated by qwerty map
    if (pstr.length == 0) ohiQ=Array(0,0,0,0,0,0);
    return ohiHangul2(k);
}

function getCommitString() {
    return cstr;
}

function getPreeditString() {
    return pstr;
}

function flushCommitString() {
    cstr = "";
}

function flushPreeditString() {
    pstr = "";
}

function reset() {
    pstr = "";
    cstr = "";
    ohiQ = Array(0, 0, 0, 0, 0, 0);
}

function flush() {
    ohiInsert(0, 0);
    
    var ret = cstr + pstr;
    reset();
    return ret;
}
