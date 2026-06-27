import { mockAppList } from './data.js';

// ==========================================
// 1. 상태 정의 (State)
// ==========================================
const state = {
  userSession: null, // { studentId, name }
  bookmarks: [],     // 즐겨찾기 된 앱 ID 리스트
  currentCategory: 'all',
  searchKeyword: ''
};

// ==========================================
// 2. DOM 요소 참조
// ==========================================
// 화면 영역
const gatewayScreen = document.getElementById('gateway-screen');
const mainDashboardScreen = document.getElementById('main-dashboard-screen');

// 온보딩 관련
const loginForm = document.getElementById('login-form');
const studentIdInput = document.getElementById('student-id');
const studentNameInput = document.getElementById('student-name');
const studentPwInput = document.getElementById('student-pw');
const btnEnter = document.getElementById('btn-enter');
const ethicsCards = document.querySelectorAll('.ethics-card');

// GNB & 검색
const searchInput = document.getElementById('search-input');
const userAvatar = document.getElementById('user-avatar');
const userNameDisplay = document.getElementById('user-name');
const userIdDisplay = document.getElementById('user-id');

// 필터 및 앱 그리드
const tabButtons = document.querySelectorAll('.tab-btn');
const appGrid = document.getElementById('app-grid');
const resultsCount = document.getElementById('results-count');
const emptyState = document.getElementById('empty-state');

// 사이드바
const bookmarkListContainer = document.getElementById('bookmark-list');

// 상세 정보 모달 (Dialog)
const appDetailModal = document.getElementById('app-detail-modal');
const modalImg = document.getElementById('modal-img');
const modalCat = document.getElementById('modal-cat');
const modalRating = document.getElementById('modal-rating');
const modalTitle = document.getElementById('modal-title');
const modalTags = document.getElementById('modal-tags');
const modalDesc = document.getElementById('modal-desc');
const modalBtnLaunch = document.getElementById('modal-btn-launch');
const modalBtnCloseTop = document.getElementById('modal-btn-close-top');
const modalBtnCloseBottom = document.getElementById('modal-btn-close-bottom');

// 이용약관 & 개인정보처리방침 모달 (Dialog)
const termsModal = document.getElementById('terms-modal');
const privacyModal = document.getElementById('privacy-modal');
const btnCloseTerms = document.getElementById('btn-close-terms');
const btnClosePrivacy = document.getElementById('btn-close-privacy');



// ==========================================
// 3. 비즈니스 로직 & 모킹 서비스 (Service Layer)
// ==========================================
const authService = {
  // 로그인 및 윤리 서약 데이터 등록
  loginAndAttest: (studentId, name) => {
    const session = { studentId, name, loginTime: Date.now() };
    localStorage.setItem('user_session', JSON.stringify(session));
    state.userSession = session;
    return { success: true };
  },
  
  // 세션 정보 확인
  checkSession: () => {
    const saved = localStorage.getItem('user_session');
    if (saved) {
      try {
        state.userSession = JSON.parse(saved);
        return true;
      } catch (e) {
        localStorage.removeItem('user_session');
      }
    }
    return false;
  }
};

const bookmarkService = {
  // 즐겨찾기 로드
  load: () => {
    const saved = localStorage.getItem('user_bookmarks');
    state.bookmarks = saved ? JSON.parse(saved) : [];
  },
  
  // 즐겨찾기 토글
  toggle: (appId) => {
    const idx = state.bookmarks.indexOf(appId);
    if (idx === -1) {
      state.bookmarks.push(appId);
    } else {
      state.bookmarks.splice(idx, 1);
    }
    localStorage.setItem('user_bookmarks', JSON.stringify(state.bookmarks));
    renderBookmarks();
    renderApps();
  }
};


// ==========================================
// 4. UI 렌더링 & 제어 (Presentation Layer)
// ==========================================

// 온보딩 화면 유효성 검사 (입력필드 + 6개 체크박스 전체)
function validateOnboarding() {
  const isIdValid = studentIdInput.value.length === 5 && !isNaN(studentIdInput.value);
  const isNameValid = studentNameInput.value.trim().length > 0;
  const isPwValid = studentPwInput.value.length >= 4;
  
  // 6개 체크박스 모두 서약되었는지 확인
  const allChecked = Array.from(ethicsCards).every(card => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    return checkbox && checkbox.checked;
  });
  
  if (isIdValid && isNameValid && isPwValid && allChecked) {
    btnEnter.disabled = false;
  } else {
    btnEnter.disabled = true;
  }
}

// 온보딩 이벤트 초기화
function initOnboardingEvents() {
  // 입력 필드 입력 감지
  [studentIdInput, studentNameInput, studentPwInput].forEach(input => {
    input.addEventListener('input', validateOnboarding);
  });
  
  // 윤리 강령 카드 클릭/체크 감지
  ethicsCards.forEach(card => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    
    // 카드 자체를 클릭해도 체크박스가 토글되도록 처리
    card.addEventListener('click', (e) => {
      // 체크박스 클릭 혹은 체크박스 레이블 자체 클릭 시에는 중복 토글 방지
      if (e.target !== checkbox && !checkbox.contains(e.target) && e.target.tagName !== 'LABEL') {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
      }
    });
    
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        card.classList.add('checked');
      } else {
        card.classList.remove('checked');
      }
      validateOnboarding();
    });
  });
  
  // 입장 버튼 클릭
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (btnEnter.disabled) return;
    
    const studentId = studentIdInput.value.trim();
    const name = studentNameInput.value.trim();
    
    authService.loginAndAttest(studentId, name);
    enterDashboard();
  });
}

// 대시보드 진입 뷰 전환
function enterDashboard() {
  gatewayScreen.style.display = 'none';
  mainDashboardScreen.style.display = 'flex';
  
  // 프로필 데이터 설정
  const { studentId, name } = state.userSession;
  userNameDisplay.textContent = name;
  userIdDisplay.textContent = `학번: ${studentId}`;
  userAvatar.textContent = name.substring(0, 1);
  
  // 초기 렌더링
  bookmarkService.load();
  renderBookmarks();
  renderApps();
}

// 앱 카드 렌더링
function renderApps() {
  // 필터링 적용
  const filtered = mockAppList.filter(app => {
    const categoryMatch = state.currentCategory === 'all' || app.category === state.currentCategory;
    const searchMatch = app.title.toLowerCase().includes(state.searchKeyword.toLowerCase()) ||
                        app.summary.toLowerCase().includes(state.searchKeyword.toLowerCase()) ||
                        app.tags.some(tag => tag.toLowerCase().includes(state.searchKeyword.toLowerCase()));
    return categoryMatch && searchMatch;
  });
  
  // 결과 개수 표기
  resultsCount.textContent = `검색 결과 ${filtered.length}개`;
  
  // 그리드 비우기
  appGrid.innerHTML = '';
  
  // 빈 상태(Empty State) 처리
  if (filtered.length === 0) {
    appGrid.style.display = 'none';
    emptyState.style.display = 'flex';
    return;
  }
  
  appGrid.style.display = 'grid';
  emptyState.style.display = 'none';
  
  // 카드 HTML 구조 생성 및 렌더링
  filtered.forEach(app => {
    const isBookmarked = state.bookmarks.includes(app.id);
    const card = document.createElement('article');
    card.className = 'app-card';
    card.setAttribute('data-id', app.id);
    
    card.innerHTML = `
      <button class="btn-bookmark ${isBookmarked ? 'active' : ''}" aria-label="즐겨찾기 토글" data-app-id="${app.id}">
        <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-star"></i>
      </button>
      
      <div class="app-card-header">
        <div class="app-card-icon"><i class="${app.iconUrl}"></i></div>
        <div class="app-card-info">
          <h3 class="app-card-name">${app.title}</h3>
          <span class="app-card-cat">${app.category}</span>
        </div>
      </div>
      
      <p class="app-card-desc">${app.summary}</p>
      
      <div class="app-card-meta">
        <i class="fa-solid fa-star rating-star"></i>
        <span>${app.rating.toFixed(1)}</span>
        <span>(${app.reviews})</span>
      </div>
      
      <div class="app-card-tags">
        ${app.tags.map(tag => `<span class="app-tag">${tag}</span>`).join('')}
      </div>
      
      <div class="app-card-actions">
        <button class="btn-detail" data-app-id="${app.id}">상세 정보</button>
        <a class="btn-launch" href="${app.appUrl}" target="_blank" rel="noopener noreferrer">
          <i class="fa-solid fa-up-right-from-square"></i> 바로가기
        </a>
      </div>
    `;
    
    // 이벤트 바인딩
    // 즐겨찾기 버튼
    card.querySelector('.btn-bookmark').addEventListener('click', (e) => {
      e.stopPropagation();
      bookmarkService.toggle(app.id);
    });
    
    // 상세 정보 버튼
    card.querySelector('.btn-detail').addEventListener('click', () => {
      openDetailModal(app);
    });
    
    appGrid.appendChild(card);
  });
}

// 사이드바 즐겨찾기 위젯 렌더링
function renderBookmarks() {
  bookmarkListContainer.innerHTML = '';
  
  if (state.bookmarks.length === 0) {
    bookmarkListContainer.innerHTML = `
      <div style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 1.5rem 0;">
        즐겨찾기한 앱이 없습니다.
      </div>
    `;
    return;
  }
  
  state.bookmarks.forEach(appId => {
    const app = mockAppList.find(a => a.id === appId);
    if (!app) return;
    
    const item = document.createElement('div');
    item.className = 'bookmark-item';
    
    item.innerHTML = `
      <div class="bookmark-info">
        <i class="${app.iconUrl} bookmark-icon"></i>
        <span class="bookmark-name">${app.title}</span>
      </div>
      <button class="btn-remove-bookmark" aria-label="즐겨찾기 삭제" data-app-id="${app.id}">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;
    
    // 제거 이벤트 바인딩
    item.querySelector('.btn-remove-bookmark').addEventListener('click', () => {
      bookmarkService.toggle(app.id);
    });
    
    bookmarkListContainer.appendChild(item);
  });
}

// 상세 정보 모달 열기
function openDetailModal(app) {
  modalImg.src = app.screenshotUrl;
  modalImg.alt = `${app.title} 스크린샷`;
  modalCat.textContent = app.category;
  modalRating.textContent = app.rating.toFixed(1);
  modalTitle.textContent = app.title;
  modalDesc.textContent = app.description;
  modalBtnLaunch.href = app.appUrl;
  
  // 태그 렌더링
  modalTags.innerHTML = app.tags.map(tag => `<span class="app-tag">${tag}</span>`).join('');
  
  // dialog 오픈
  appDetailModal.showModal();
}

// 모달 닫기
function closeDetailModal() {
  appDetailModal.close();
}

// ==========================================
// 5. 모달 Light Dismiss (클릭 외 영역 닫기) 폴백 및 초기화
// ==========================================
function initModalDismiss() {
  // 모달 닫기 버튼들 이벤트 등록
  [modalBtnCloseTop, modalBtnCloseBottom].forEach(btn => {
    btn.addEventListener('click', closeDetailModal);
  });

  // 이용약관 & 개인정보처리방침 트리거 및 닫기 이벤트 등록
  document.querySelectorAll('.btn-terms-trigger').forEach(btn => {
    btn.addEventListener('click', () => termsModal.showModal());
  });
  document.querySelectorAll('.btn-privacy-trigger').forEach(btn => {
    btn.addEventListener('click', () => privacyModal.showModal());
  });
  btnCloseTerms.addEventListener('click', () => termsModal.close());
  btnClosePrivacy.addEventListener('click', () => privacyModal.close());

  // closedby="any" 미지원 브라우저(대표적으로 Safari) 대응용 폴백 구현
  const setupLightDismiss = (dialogEl) => {
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialogEl.addEventListener('click', (event) => {
        if (event.target !== dialogEl) return;

        const rect = dialogEl.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );

        if (!isDialogContent) {
          dialogEl.close();
        }
      });
    }
  };

  setupLightDismiss(appDetailModal);
  setupLightDismiss(termsModal);
  setupLightDismiss(privacyModal);
}

// GNB 검색 및 카테고리 필터링 초기화
function initFilterEvents() {
  // 키워드 실시간 검색
  searchInput.addEventListener('input', (e) => {
    state.searchKeyword = e.target.value;
    renderApps();
  });
  
  // 카테고리 탭 클릭
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 액티브 스타일 이동
      tabButtons.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      
      state.currentCategory = btn.getAttribute('data-category');
      renderApps();
    });
  });
}


// ==========================================
// 6. 애플리케이션 진입점 (Bootstrap)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 이벤트 바인딩
  initOnboardingEvents();
  initFilterEvents();
  initModalDismiss();
  
  // 자동 로그인 확인
  if (authService.checkSession()) {
    enterDashboard();
  } else {
    gatewayScreen.style.display = 'flex';
    mainDashboardScreen.style.display = 'none';
  }
});
