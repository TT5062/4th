# 시스템 및 UI/UX 설계 정의서 (Design Specification)

## 1. 기술 스택 및 개발 가이드 (Tech Stack)
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework (추천):** Tailwind CSS (유연하고 빠른 UI 컴포넌트 구성을 위해 권장)
- **Icons:** Font Awesome v6.5+ (윤리 강령 아이콘 및 대시보드 UI용)
- **Fonts:** Poppins & Lato (영문/숫자), Pretendard 또는 Noto Sans KR (국문)
- **Architecture:** 컴포넌트 기반 아키텍처 (React, Vue 또는 Vanilla JS의 모듈러 구조 적용)

## 2. 화면 흐름도 및 상태 전이 (Screen Flow & State Transition)

```text
[접속]
│
▼
[로그인 & 윤리 온보딩 화면] ──(입력 폼 작성 및 6개 강령 필수 체크)
│
├─ 유효하지 않거나 체크 미완료시: '대시보드로 입장하기' 버튼 비활성화 (Disabled)
│
▼ (조건 만족 및 버튼 클릭)
[메인 대시보드 화면] ──(컴포넌트 상태에 유저 정보 세팅 및 임시 세션 유지)
│
├── [앱 카드 클릭] ──> [앱 상세 정보 모달 팝업] ──> [앱 실행하기] ──> (새 탭에서 링크 오픈)
└── [즐겨찾기 토글] ──> [대시보드 내 '내 학습방' 영역 실시간 업데이트]
```

## 3. UI/UX 레이아웃 설계 (UI Layout)

### 3.1. 로그인 및 윤리 온보딩 페이지 Layout
- **구조:** 상하 또는 좌우 2분할 레이아웃
- **상단/좌측 영역 (인증 폼):**
  - 카드 타입의 컨테이너 내부에 '학번', '이름', '비밀번호' Input Field 배치
  - 하단에 '대시보드로 입장하기' 큰 Action 버튼 (초기 State: disabled)
- **하단/우측 영역 (AI 윤리 가이드 가리개):**
  - 6개의 독립된 그리드 아이템(그리드 카드) 형태로 윤리 강령 배치
  - 각 카드 내부: 상단에 가독성 높은 아이콘, 중간에 강령 타이틀 및 상세 설명, 하단에 개별 체크박스(`input[type="checkbox"]`) 포함

### 3.2. 메인 대시보드 페이지 Layout
- **Global Navigation Bar (GNB):** `height: 70px`, 고정(Fixed) 상단 바. 좌측 로고, 중앙 검색창, 우측 프로필 정보 위젯.
- **Main Layout:** 2컬럼 구조
  - **Main Content Area (75%):** 히어로 배너(추천 앱), 카테고리 탭 바, 웹앱 카드 그리드 리스트(3열 혹은 4열)
  - **Sidebar Area (25%):** '내 학습방' 섹션. 즐겨찾기 지정된 앱 목록 숏컷, 주간 학습 통계 더미 차트 위젯 배치.

## 4. 데이터 모델 및 프론트엔드 모킹(Mock) 설계

### 4.1. 유저 세션 데이터 구조 (UserState)
```javascript
// 현재 접속 상태를 추적하기 위한 프론트엔드 글로벌 스토어/상태 예시
const initialUserState = {
  studentId: "",      // 입력된 학번 저장
  studentName: "",    // 입력된 이름 저장
  isAuthenticated: false, // 로그인 완료 여부
  ethicsAgreed: {
    purpose: false,   // 1. 명확한 활용 목적
    design: false,    // 2. 주도적 학습 설계
    verify: false,    // 3. 비판적 검증 습관
    expand: false,    // 4. 사고의 확장
    safety: false,    // 5. 안전과 관계 유지
    ethics: false     // 6. 투명성과 윤리
  }
};
```

### 4.2. 학습용 웹앱 데이터 구조 (AppData)
```javascript
// 대시보드에 뿌려질 더미 웹앱 데이터 리스트 배열
const mockAppList = [
  {
    id: "app-001",
    title: "Voca Master",
    summary: "AI 기반 영단어 암기 및 실시간 퀴즈 앱",
    category: "어학",
    rating: 4.8,
    reviews: 124,
    tags: ["#영어", "#암기", "#초중고"],
    iconUrl: "fa-solid fa-language",
    appUrl: "https://example.com/voca"
  },
  {
    id: "app-002",
    title: "Math Solver",
    summary: "수학 수식 입력 및 단계별 풀이 가이드 툴",
    category: "수학",
    rating: 4.9,
    reviews: 310,
    tags: ["#수학", "#문제풀이", "#전연령"],
    iconUrl: "fa-solid fa-calculator",
    appUrl: "https://example.com/math"
  }
  // 추가적인 더미 데이터들 구성...
];
```

### 4.3. 서비스 인터페이스 레이어 (Future DB Connection Point)
```javascript
// 추후 백엔드 API 연동 시 이 함수들의 내부 로직만 fetch/axios로 교체하면 되도록 래핑함
export const authService = {
  loginAndAttest: (studentId, name, password, ethicsState) => {
    // 현재는 로컬 상태 및 LocalStorage에 저장하여 모킹 구현
    localStorage.setItem("user_session", JSON.stringify({ studentId, name, loginTime: Date.now() }));
    return { success: true };
  },
  getAppList: () => {
    return mockAppList; // 추후 return fetch('/api/apps').then(res => res.json()); 로 변경 예정
  }
};
```

## 5. 컴포넌트 명세서 (Component Specification)
1. **`LoginPanel`**: 학번, 이름, 비밀번호 입력 필드 제공 및 Validation 체크 담당.
2. **`EthicsGrid`**: 6개의 윤리 강령 카드를 반복문으로 렌더링하고, 전체 체크 여부를 상위 컴포넌트로 전달(`onChange`).
3. **`AppCardGrid`**: 선택된 카테고리 필터나 검색어에 따라 `mockAppList`를 필터링하여 `AppCard` 컴포넌트의 리스트를 그리드로 배치.
4. **`AppDetailModal`**: 특정 앱 카드를 클릭했을 때 열리는 모달 창으로, 세부 명세 표출 및 외부 앱 URL 실행 트리거 담당.
5. **`MyStudySidebar`**: 즐겨찾기가 등록된 앱 ID 목록을 LocalStorage에서 읽어와 실시간으로 마이페이지용 리스트 생성.
