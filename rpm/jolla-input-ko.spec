Name: jolla-input-ko
Version: 0.03
Release: 1%{?dist}
Summary: Korean layout and input method for Sailfish OS
License: LGPLv2
Source: %{name}-%{version}.tar.gz
BuildArch: noarch
URL:    https://github.com/peremen/jolla-input-ko
Requires:   jolla-keyboard
#Requires:   jolla-xt9

%description
Korean keyboard layout for Sailfish OS.

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

%clean
rm -rf %{buildroot}

%files
/usr/share/maliit/plugins/com/jolla/layouts/ko_2set.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_naratgeul.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko.conf
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/KoInputHandler.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/KoNaratgeulInputHandler.qml
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/2set_handler.js
/usr/share/maliit/plugins/com/jolla/layouts/ko_common/naratgeul_handler.js
