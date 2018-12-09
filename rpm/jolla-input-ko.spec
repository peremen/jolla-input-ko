Name: dotdanbae
Version: 0.5.1
Release: 1%{?dist}
Summary: Korean layout and input method for Sailfish OS
License: GPLv2+
Source: %{name}-%{version}.tar.gz
BuildArch: noarch
URL:    https://github.com/peremen/jolla-input-ko
Requires:   jolla-keyboard

%description
Dotdanbae is Korean input method for Sailfish OS.
This app provides 2-set, Naratgeul, Cheonjiin layout.

The name stands for sailboat in Korean.

%define debug_package %{nil}

%prep
%setup -q

%build
# do nothing

%install
#rm -rf %{buildroot}
#make install DESTDIR=%{buildroot}
mkdir -p %{buildroot}/usr/share/maliit/plugins/com/jolla/layouts/
cp -r src/ko* %{buildroot}/usr/share/maliit/plugins/com/jolla/layouts/
chmod -x %{buildroot}/usr/share/maliit/plugins/com/jolla/layouts/*.qml
chmod -x %{buildroot}/usr/share/maliit/plugins/com/jolla/layouts/ko.conf
chmod -x %{buildroot}/usr/share/maliit/plugins/com/jolla/layouts/ko_common/*.*

%clean
rm -rf %{buildroot}

%files
/usr/share/maliit/plugins/com/jolla/layouts/ko_2set.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_naratgeul.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_cheonjiin.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_cheonjiin_plus.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_simple.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_vega.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko.conf
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/KoInputHandler.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/KoCheonNaratInputHandler.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/KoSimpleInputHandler.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/KoArrowKey.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/KoPasteKey.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/KoTenKey.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/2set_handler.js
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/cheonjiin_naratgeul.js
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/hangul.js

%changelog
* Mon Nov 19 2018 Topias Vainio <toxip@disroot.org> 0.5.1
- Added VEGA layout
- Changed to semantic versioning

* Wed Oct 18 2017 Topias Vainio <toxip@disroot.org> 0.5
- Added cheonjiin plus layout
- Added single vowel layout
- Improved paste key in cheonjiin and naratgeul
- Fix bug with vowels getting stuck in naratgeul
- Move to the same code base for naratgeul and cheonjiin handlers
- Improved symbols layout in cheonjiin and naratgeul

* Sun Oct 15 2017 Shinjo Park <me@peremen.name> 0.4-2
- Revise keys of Naratgeul layout

* Fri Sep 29 2017 Topias Vainio <toxip@disroot.org> 0.4
- Added cheonjiin layout

* Sun Sep 10 2017 Shinjo Park <me@peremen.name> 0.3-2
- Fix bug on Naratgeul handler

* Sun May 10 2015 Park Shinjo <me@peremen.name> 0.3
- Implement keyboard split.
- Fix Naratgeul problem for 1.1.4.29.
- Add paste key on 2-beolsik keyboard.

* Sat Oct 25 2014 Park Shinjo <me@peremen.name> 0.2
- Fix layout switching bug.

* Wed Feb 19 2014 Park Shinjo <me@peremen.name> 0.1
- Added Naratgeul layout.
- Bumped version number and changed name.
- Fixed bug on trailing syllables in 2-set layout.

* Tue Jan 14 2014 Park Shinjo <me@peremen.name> 0.02
- Rewrite to use ohi instead of libhangul.
- Removes usage of any native code.

* Mon Jan 13 2014 Park Shinjo <me@peremen.name> 0.01
- Initial release based on libhangul.
