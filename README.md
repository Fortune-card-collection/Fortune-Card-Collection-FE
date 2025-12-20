# Fortune Card Collection – Frontend

운세 카드 선택 기반의 운세 웹 프론트엔드 레포지토리입니다.  
React와 Tailwind CSS를 기반으로 디자인 토큰을 적용해 일관된 UI를 유지했으며, 사용자 행동에 즉각적으로 반응하는 인터랙션 중심의 화면을 구현했습니다.


## 배포링크

- 배포 URL: https://fortune-card-collection.web.app


## 기술 스택

- React: 상태 기반 UI 관리 및 컴포넌트 구조 설계
- Tailwind CSS: 디자인 토큰 기반의 일관된 UI 스타일링
- Axios: API 통신
- Firebase: 프론트엔드 배포 및 호스팅


## 설치 및 실행

```bash
# Fortune-Card-Collection-FE 파일에서 fortine-card-collection 파일로 진입
cd fortune-card-collection

# 패키지 설치
npm install

# 실행
npm start
```


## 프로젝트 구조

```
Fortune-Card-Collection-FE/
├─ fortune-card-collection/
│ ├─ package.json # 프로젝트 설정 및 의존성
│ ├─ tailwind.config.js # 디자인 토큰 정의
│ ├─ src/
│ │ ├─ assets/ # 이미지 리소스
│ │ ├─ components/ # UI 컴포넌트
│ │ │ ├─ Layout/ # 주요 화면 레이아웃
│ │ │ ├─ Login/ # 로그인 컴포넌트
│ │ │ └─ Header.js # 공통 헤더
│ │ └─ App.js # 웹 엔트리 컴포넌트
└─ README.md
```