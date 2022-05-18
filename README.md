# 프로젝트 제목

테이터 테이블 및 상세화면 구현

# 프로젝트 실행 방법

- npm install
- npm start

위 프로젝트는 create-react-app, typescript을 사용하여 작업했습니다.

# 프로젝트 요구사항 외 라이브러리

- axios / API통신을 위해 설치
- styled-components / CSS Theme 구성과 구현을 위해 설치
- styled-normalize / 모든 브라우저에서 CSS 초기화를 위해 설치

# 프로젝트 폴더 및 구성

## 최대한 비지니스 로직과 UI를 구분하여 작업하였습니다.

- App안에 currencyProvider를 구현하여 currency가 가상자산 시세목록, 북마크 시세목록, 코인 상세 컴포넌트에 공유 되고 수정 할 수 있게 구현했습니다.
- Market list를 조회하는 로직을 커스텀 훅으로 구현하여 MarketPage에서 불러와 작업을 했습니다.
- Bookmark list는 local storage에 데이터를 저장하여 사용하였습니다.
- 코인 상세 컴포넌트는 Market, Bookmark에서 공통으로 사용 할수 있을거라 생각하여 features 컴포넌트로 나눴고 coinId를 props로 넘겨주면 CoinDetailFeature 컴포넌트에서 통신 후 데이터를 반영합니다.
- 통신에 대한 Error는 유저의 행동을 막지 않게 alert로 명시했습니다.

## 아토믹 디자인 패턴에서 착안하여 폳더를 구성하였습니다.

- src 폴더 안에 components, core, utiles, styles로 기능별로 나눴습니다.
- components안에는 pages, features, UI (organisms, molecules, atoms)로 구성하여 각각 기능별로 처리하였습니다.
- page는 라우터 기능과 비지니스 로직으로 구현했습니다.
- feature는 page안에 많은 비지니스 로직으로 복잡 할 때 따로 비지니스 로직을 떼어 구성하거나 모달을 구현해 놓았습니다.
- UI안에 organism은 molecule, atom을 조합하여 구현하였고 고정 텍스트가 들어 갈 수 있습니다.
- UI안에 molecule는 atom을 조합하여 구현하였고 되도록 고정 텍스트 및 state가 존재 하지 않아 props로 데이터를 받아 작동합니다.
- UI안에 atom은 컴포넌트의 제일 작은 단위로 구현하였습니다.

- core 폴더 안에 models, providers로 기능별로 나눴습니다.
- models는 공통 타입을 지정했습니다.
- providers는 Context를 구현해 놓았습니다.

- utiles 폴더 안에 hooks, util로 기능별로 나눴습니다.
- hooks은 자주 사용하는 비지니스로직으로 구현해 놓았습니다.
- util은 자주 사용하는 함수로 구현해 놓았습니다.
