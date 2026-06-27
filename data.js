// 학습용 웹앱 통합 포털 (Edu-Portal) 더미 데이터베이스
export const mockAppList = [
  {
    id: "app-voca-master",
    title: "Voca Master",
    summary: "AI 기반 맞춤형 영어 단어 암기 및 실시간 학습 퀴즈 서비스",
    description: "학습자의 수준과 목표에 맞추어 AI가 최적의 단어 암기 경로를 제시합니다. 모르는 단어만 모아서 복습할 수 있는 스마트 단어장 기능과 실시간 퀴즈 배틀 모드를 지원합니다.",
    category: "어학",
    rating: 4.8,
    reviews: 142,
    tags: ["#영어", "#단어암기", "#AI학습"],
    iconUrl: "fa-solid fa-language",
    appUrl: "https://example.com/voca-master",
    screenshotUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "app-math-solver",
    title: "Math Solver",
    summary: "수식 입력 및 단계별 풀이 과정을 시각적으로 제공하는 수학 도구",
    description: "복잡한 방정식과 미적분 수식까지 정확하게 분석하여 친절한 단계별 해설을 제공합니다. 수식을 카메라로 스캔하거나 타이핑하여 빠르게 풀이를 얻고 개념을 이해할 수 있습니다.",
    category: "수학",
    rating: 4.9,
    reviews: 310,
    tags: ["#수학", "#단계별풀이", "#수식검색"],
    iconUrl: "fa-solid fa-calculator",
    appUrl: "https://example.com/math-solver",
    screenshotUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "app-science-lab",
    title: "Virtual Science Lab",
    summary: "웹에서 물리, 화학, 생명과학 실험을 안전하게 시뮬레이션하는 가상 실험실",
    description: "위험하고 복잡한 과학 실험을 웹 화면에서 안전하게 수행해볼 수 있는 시뮬레이션 도구입니다. 온도, 질량, 속도 등의 물리량을 조절하며 실시간 상태 변화를 그래프로 관찰할 수 있습니다.",
    category: "과학",
    rating: 4.7,
    reviews: 89,
    tags: ["#과학", "#실험시뮬레이션", "#시각화"],
    iconUrl: "fa-solid fa-flask",
    appUrl: "https://example.com/science-lab",
    screenshotUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "app-focus-timer",
    title: "Focus Matrix",
    summary: "뽀모도로 기법과 대시보드 통계를 결합한 학업 생산성 타이머",
    description: "25분 집중과 5분 휴식의 뽀모도로 사이클을 관리하며 나의 일일 학습 패턴을 대시보드로 시각화해 줍니다. 집중 백색소음 기능과 할 일 관리 기능을 결합하여 학업 몰입도를 극대화합니다.",
    category: "생산성",
    rating: 4.6,
    reviews: 215,
    tags: ["#뽀모도로", "#시간관리", "#생산성"],
    iconUrl: "fa-solid fa-stopwatch",
    appUrl: "https://example.com/focus-matrix",
    screenshotUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "app-grammar-bot",
    title: "Grammar AI Guard",
    summary: "영어 에세이 및 작문 오류를 정밀 분석하는 문법 교정 도구",
    description: "작성한 글을 입력하면 즉시 철자 오류, 어색한 문장 구조, 문맥에 어울리는 추천 어휘 등을 분석하여 교정해 주는 영어 작문 첨삭 비서입니다. 학습 윤리를 준수하기 위해 AI의 개입 수준을 조절할 수 있습니다.",
    category: "어학",
    rating: 4.5,
    reviews: 95,
    tags: ["#영작문", "#문법교정", "#AI첨삭"],
    iconUrl: "fa-solid fa-spell-check",
    appUrl: "https://example.com/grammar-bot",
    screenshotUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "app-geometry-3d",
    title: "Geometry 3D Playground",
    summary: "입체도형을 회전하고 단면을 잘라보며 직관을 키우는 3D 기하학 도구",
    description: "구, 원기둥, 사각뿔 등 다양한 입체도형을 360도 회전시켜 보고 평면으로 잘라 단면을 확인할 수 있는 기하학 도구입니다. 공간지각력을 키우고 도형 공식의 원리를 시각적으로 습득합니다.",
    category: "수학",
    rating: 4.8,
    reviews: 112,
    tags: ["#기하학", "#3D도형", "#공간지각"],
    iconUrl: "fa-solid fa-shapes",
    appUrl: "https://example.com/geometry-3d",
    screenshotUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "app-periodic-table",
    title: "Interactive Elements Table",
    summary: "원소별 속성 및 분자 결합 상태를 탐구하는 동적 주기율표",
    description: "각 원소의 전자 배치, 녹는점, 발견 역사 등 다양한 정보를 인포그래픽으로 감상하고 원소들을 조합해 가상으로 화학 결합을 유도해 볼 수 있는 인터랙티브 원소 백과사전입니다.",
    category: "과학",
    rating: 4.9,
    reviews: 180,
    tags: ["#화학", "#주기율표", "#원소탐구"],
    iconUrl: "fa-solid fa-atom",
    appUrl: "https://example.com/periodic-table",
    screenshotUrl: "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: "app-mind-mapper",
    title: "MindFlow Planner",
    summary: "아이디어 브레인스토밍과 학습 목차를 체계화하는 마인드맵 앱",
    description: "머릿속 생각을 시각적인 마인드맵 노드로 구조화하고 실시간 학습 계획표로 전환해 주는 마인드 매핑 도구입니다. 다양한 컬러 테마와 가지 뻗기, 텍스트 스타일링을 통해 학습 능률을 높여줍니다.",
    category: "생산성",
    rating: 4.7,
    reviews: 167,
    tags: ["#마인드맵", "#브레인스토밍", "#계획표"],
    iconUrl: "fa-solid fa-diagram-project",
    appUrl: "https://homework-qk7y.vercel.app/",
    protected: true,  // 포털을 통해서만 접근 가능 (Daily Token 인증)
    screenshotUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60"
  }
];
