돛단배 키보드
==============

## 소개
돛단배 키보드는 Sailfish OS용 한글 입력기입니다. Sailfish OS에 키보드를 추가하는
방법은 [일본어 입력기](https://github.com/BeholdMyGlory/jolla-anthy-jp)를 기반으로
하며, 두벌식 키보드 오토마타는 [온라인 한글 입력기](http://ohi.kr/)를 기반으로
합니다. 천지인 키보드는 자모를 조합하기 위해서 [Hangul.js](https://github.com/e-/Hangul.js)를
이용합니다. 현재 한글 두벌식, 단모음, 나랏글, 천지인, SKY(VEGA) 자판을 지원합니다.

## 지원하는 입력 방식
* 한글 두벌식, 단모음
* 나랏글
* 천지인
* SKY(VEGA) 한글 입력기

## 빌드 및 설치
네이티브 코드가 없기 때문에 별도의 라이브러리 없이 빌드가 가능합니다. Jolla 및
Sailfish OS 장치에 설치하려면 RPM 파일을 설치하십시오. 본 프로그램은
OpenRepos에서도 배포 중입니다.

Sailfish OS 1.0.3.8 이상을 필요로 합니다.

## 할 일
* 단어 자동 완성 지원
* Sailfish OS 키보드 API 변경 따라가기

## 라이선스
본 프로그램은 GNU General Public License 버전 3.0 및 그 이후 버전의 조건에
따라서 배포 및 2차 창작을 허용합니다. 본 프로그램에서 사용한 외부 구성 요소는
다음 조건에 따라서 배포됩니다.

* Sailfish 키보드 레이아웃 코드: Modified BSD License
* 두벌식 입력기 오토마타 코드: GNU General Public License 버전 2.0 및 그 이후
* Hangul.js: MIT
