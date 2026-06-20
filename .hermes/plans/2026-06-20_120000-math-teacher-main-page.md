# 메인페이지 — "수학 교사는 심심했다."

> **Goal:** 기존 `index.html`을 새 메인페이지로 교체. 싱글 HTML 파일로 버튼 3개 + 서브메뉴 구현.

**Architecture:** 단일 HTML 파일 (CSS + JS 내장). 별도 프레임워크 없음. 버튼 클릭 시 외부 링크 이동 또는 서브메뉴 토글.

**Tech Stack:** HTML5, CSS3 (flexbox, transitions), Vanilla JS (DOM 조작)

---

## Tasks

### Task 1: 메인페이지 HTML 작성

**Objective:** `index.html`을 아래 구조로 전면 교체

**Files:**
- Overwrite: `/mnt/c/Users/evayo/OneDrive/Desktop/Math/index.html`

**구조:**
```
┌─────────────────────────────────┐
│                                 │
│     📐 수학 교사는 심심했다.     │  ← 제목 (큰 글씨, 중앙)
│        Math Teacher was Bored   │  ← 작은 부제
│                                 │
│      ┌─────────────────┐        │
│      │   업무 자동화    │        │  ← 버튼 1 (링크: auto-tesk.vercel.app)
│      └─────────────────┘        │
│      ┌─────────────────┐        │
│      │     수학         │        │  ← 버튼 2 (클릭 시 서브메뉴 확장)
│      └─────────────────┘        │
│         ┌─────────────┐         │
│         │지수함수와     │         │  ← 서브메뉴 (애니메이션 등장)
│         │로그함수      │         │
│         ├─────────────┤         │
│         │   수열       │         │  ← 서브메뉴 (애니메이션 등장)
│         └─────────────┘         │
│      ┌─────────────────┐        │
│      │  동료교사 사이트  │        │  ← 버튼 3 (준비중, 비활성)
│      └─────────────────┘        │
│                                 │
└─────────────────────────────────┘
```

**디자인 포인트:**
- 다크 그라데이션 배경 (기존 스타일 유지하면서 발전)
- 버튼: 둥근 모서리, 호버 시 살짝 떠오르는 효과
- "수학" 버튼 클릭 시 서브메뉴가 아래로 부드럽게 슬라이드 등장 (max-height transition)
- "업무 자동화"는 `<a>` 태그로 external link
- "동료교사 사이트"는 비활성화 (opacity 낮춤, cursor: not-allowed, tooltip "준비중")

**상세 스펙:**

1. **헤더:**
   - `h1`: "📐 수학 교사는 심심했다." (2.5rem, white)
   - `p.subtitle`: "Math Teacher was Bored" (작게, 흰색 반투명)

2. **버튼 컨테이너:**
   - `div.buttons`: flexbox, column 방향, gap: 16px
   - 각 버튼: `.btn` 클래스
   - 너비 320px, 패딩 18px 24px, border-radius: 16px
   - 배경: rgba(255,255,255,0.08) → 호버 시 rgba(255,255,255,0.15)
   - border: 1px solid rgba(255,255,255,0.1) → 호버 시 rgba(255,255,255,0.25)
   - 텍스트: white, font-size: 1.15rem, font-weight: 600
   - transition: all 0.25s ease
   - 커서: pointer

3. **"업무 자동화" 버튼:**
   - `<a>` 태그, href: `https://auto-tesk.vercel.app/`
   - target: `_blank`, rel: `noopener noreferrer`

4. **"수학" 버튼 + 서브메뉴:**
   - 클릭 시 `.submenu` 토글
   - 서브메뉴: `.submenu` div, 기본 height: 0, overflow: hidden
   - transition: max-height 0.4s ease, opacity 0.3s ease
   - 열렸을 때: max-height: 200px, opacity: 1
   - 닫혔을 때: max-height: 0, opacity: 0
   - 서브메뉴 아이템: "지수함수와 로그함수", "수열" — 각각 `.sub-btn` 클래스
   - 서브메뉴 아이템 디자인: 버튼보다 작게, 배경 slightly darker, 왼쪽 정렬 느낌

5. **"동료교사 사이트" 버튼:**
   - 비활성화 스타일: opacity: 0.4, cursor: not-allowed
   - 클릭 시 아무 반응 없음 (JS에서 prevent)
   - 마우스 오버 시 툴팁 느낌의 스타일

6. **하단 푸터:**
   - 작은 텍스트로 "© 2026 수학 교사" 등

**CSS 특징:**
- body: min-height 100vh, flexbox 중앙 정렬, dark gradient 배경
- smooth transitions everywhere
- 반응형 (모바일에서도 버튼 너비 유지)

**JavaScript 로직:**
- `toggleMenu()`: 수학 버튼 클릭 시 `.submenu`의 max-height와 opacity 토글
- 외부 링크는 기본 `<a>` 동작 사용
- "동료교사 사이트"는 onclick="return false" 또는 이벤트 핸들러로 클릭 차단

### Task 2: 검증

**Objective:** 파일 생성 확인 및 브라우저에서 열어볼 수 있도록 안내

**Files:**
- Read: `/mnt/c/Users/evayo/OneDrive/Desktop/Math/index.html`

**검증 항목:**
1. HTML 문법 오류 없음
2. 버튼 3개 정상 렌더링
3. "업무 자동화" 클릭 시 auto-tesk.vercel.app 새 탭 열림
4. "수학" 클릭 시 서브메뉴 애니메이션 등장
5. "동료교사 사이트" 클릭 무시 + 비활성 스타일
6. `수열` 폴더와 `function_graph` 폴더는 그대로 유지 (기존 컨텐츠 보존)

---

## Risks & 고려사항

- 기존 `index.html`이 있었으므로 백업 불필요 (Git 없음) — 하지만 기존 파일 덮어쓰므로 내용 확인 필요
- 서브메뉴 "지수함수와 로그함수", "수열"은 아직 링크가 걸리지 않은 상태 — 일단 placeholders로 두고 클릭 시 아무 일 안 일어나거나 추후 연결 예정 표시
- `function_graph/` 하위 컨텐츠는 유지됨

## Verification

- Windows 사용자: `index.html`을 더블클릭하여 브라우저에서 확인 가능
- 버튼 클릭 및 서브메뉴 동작 수동 테스트
