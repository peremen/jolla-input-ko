Dotdanbae keyboard
==============

## Introduction
Dotdanbae is Korean input method for Sailfish OS. Keyboard interface is based on
[Japanese IME](https://github.com/BeholdMyGlory/jolla-anthy-jp), Korean input
automata for 2-set keyboard is based on [Online Hangul Input](http://ohi.kr/).
Cheonjiin input uses [Hangul.js](https://github.com/e-/Hangul.js) for assembling
the letters. Dotdanbae supports multiple layouts.

The name comes from Korean word for sailboat.

## Supported layouts
* 2-set layout
* Naratgeul
* Support for Cheonjiin and SKY Hangul is planned.

## Build and install
There are no native code used in this input method. To install on your device,
just install the provided rpm file using your favorite way.

Requires Sailfish OS 1.0.3.8 or above.

## To-dos
* Support for other Korean layouts (e.g. 3set, other 10-key based layouts)
* Word suggestion support
* Follow finalized API for Jolla's input method.

## License
Dotdanbae is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

External components used in this program is licensed as following:

* Sailfish keyboard layout code: Modified BSD License
* Online Hangul Input: GNU General Public License version 2.0 and later
* Hangul.js library: MIT
