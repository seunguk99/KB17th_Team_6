# 💰 가계부 프로젝트

KB IT's Your Life 6기 프론트엔드 스켈레톤 프로젝트로 진행하였습니다.

Vue.js 기반의 SPA 가계부 애플리케이션입니다. 사용자 선택, 거래 내역 관리, 필터링 및 프로필 수정 기능 등을 포함하며, 팀 협업 구조로 개발되었습니다.

---

## 📌 주요 기능

- 사용자 선택 및 로그인 상태 유지 (Pinia + sessionStorage)
- 월/주/일/카테고리별 거래 내역 필터링
- 수입/지출 및 순이익 요약
- 거래 등록, 상세 보기, 수정 기능
- 사용자 프로필 조회 및 정보 수정
- JSON Server를 통한 로컬 API 서버 구축

---

## 🛠️ 사용 기술 스택

| 구분          | 기술                    |
| ------------- | ----------------------- |
| 프레임워크    | Vue 3 (Composition API) |
| 상태 관리     | Pinia                   |
| 라우팅        | Vue Router              |
| UI 프레임워크 | Bootstrap 5             |
| 아이콘        | Font Awesome            |
| API 통신      | Axios                   |
| 목서버        | JSON Server             |
| 협업 도구     | Git / GitHub            |

---

## 📁 프로젝트 구조

```
src/
├── assets/
│   └── main.css
├── Chart/
│   └── chart.js
├── components/
│   ├── layout/
│   │   ├── DefaultLayout.vue
│   │   ├── Header.vue
│   │   └── Footer.vue
│   ├── nav/
│   │   ├── NavBar.vue
│   │   ├── MenuGroup.vue
│   │   └── MenuItem.vue
│   └── transaction/
│       ├── QuickAdd.vue
│       ├── SelectedDayList.vue
│       ├── TransactionList.vue
│       ├── TransactionGroup.vue
│       └── TransactionItem.vue
├── pages/
│   ├── UserSelection.vue
│   ├── HomePage.vue
│   ├── TransactionHistory.vue
│   ├── TransactionWritePage.vue
│   ├── TransactionEditPage.vue
│   ├── DetailTransactionPage.vue
│   ├── ProfilePage.vue
│   └── EditProfilePage.vue
├── router/
│   └── index.js
├── stores/
│   ├── userStore.js
│   └── transactionStore.js
└── App.vue
└── main.js
```

## ⚙️ 설치 및 실행

```bash
# 1. 패키지 설치
npm install

# 2. JSON Server 설치
npm install -g json-server@0.17.3

# 3. JSON Server 실행
json-server db.json

# 4. Vite 개발 서버 실행
npm run dev
```

## 👥 팀원

| 이름   | GitHub                                           |
| ------ | ------------------------------------------------ |
| 김승욱 | [@seunguk99](https://github.com/seunguk99)       |
| 박주용 | [@ju1645](https://github.com/ju1645)             |
| 양민영 | [@Minyoung06](https://github.com/Minyoung06)     |
| 윤예림 | [@StarWhale0w0](https://github.com/StarWhale0w0) |
| 이유미 | [@ll-04](https://github.com/ll-04)               |
