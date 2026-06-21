# 메인페이지 — "수학 교사는 심심했다." (v2)

> **Goal:** 기존 `index.html`을 새 메인페이지로 교체. "수학" 버튼은 별도 페이지로 이동.

**Architecture:** 싱글 HTML 2개 (`index.html` + `math.html`). CSS/JS 모두 인라인.

---

## Tasks

### Task 1: 메인페이지 작성 (`index.html`)

**Objective:** 화면 중앙에 제목 + 버튼 3개

**Files:**
- Overwrite: `/mnt/c/Users/evayo/OneDrive/Desktop/Math/index.html`

**레이아웃:**
```
┌────────────────────────────────────┐
│                                    │
│       📐 수학 교사는 심심했다.      │
│        Math Teacher was Bored      │
│                                    │
│       ┌────────────────────┐       │
│       │  🔧 업무 자동화     │  → 새 탭: https://auto-tesk.vercel.app/
│       └────────────────────┘       │
│                                    │
│       ┌────────────────────┐       │
│       │  📊 수학            │  → 같은 탭: math.html
│       └────────────────────┘       │
│                                    │
│       ┌────────────────────┐       │
│       │  👥 동료교사 사이트  │  → 준비중 (비활성)
│       └────────────────────┘       │
│                                    │
│       © 2026 수학 교사             │
└────────────────────────────────────┘
```

**디자인 상세:**
- 배경: dark gradient (`#0f0c29` → `#302b63` → `#24243e`) — 기존 유지
- 제목: `h1` 2.5rem, 흰색, 중앙
- 부제: 0.9rem, rgba(255,255,255,0.45)
- 버튼 컨테이너: flexbox column, 중앙 정렬
- 버튼 스타일:
  - width: 320px, padding: 18px 24px
  - border-radius: 14px
  - background: rgba(255,255,255,0.07)
  - border: 1px solid rgba(255,255,255,0.1)
  - color: white, font-size: 1.1rem, font-weight: 600
  - transition: 0.25s ease (transform, background, border)
  - hover: translateY(-3px), background rgba(255,255,255,0.13), border rgba(255,255,255,0.25)
  - cursor: pointer

**버튼별 동작:**
1. **업무 자동화**
   - `<a href="https://auto-tesk.vercel.app/" target="_blank" rel="noopener noreferrer">`
   - 아이콘: 🔧

2. **수학**
   - `<a href="math.html">` (같은 탭 이동)
   - 아이콘: 📊

3. **동료교사 사이트**
   - `<span>` 또는 `<button disabled>` — 클릭 무시
   - opacity: 0.35, cursor: not-allowed
   - hover 효과 없음
   - 아이콘: 👥

**기존 컨텐츠 백업:** `function_graph/`, `수열/` 폴더는 그대로 유지. 기존 `index.html`은 덮어쓰므로 사라짐.

---

### Task 2: 수학 페이지 작성 (`math.html`)

**Objective:** "수학" 버튼 클릭 시 이동할 페이지. "지수함수와 로그함수", "수열" 버튼 2개 배치.

**Files:**
- Create: `/mnt/c/Users/evayo/OneDrive/Desktop/Math/math.html`

**레이아웃:**
```
┌────────────────────────────────────┐
│  ← 뒤로가기 (index.html)          │
│                                    │
│            📊 수학                  │
│         (같은 스타일 유지)          │
│                                    │
│       ┌────────────────────┐       │
│       │  지수함수와 로그함수  │  → 추후 연결 (placeholder)
│       └────────────────────┘       │
│                                    │
│       ┌────────────────────┐       │
│       │      수열           │  → 추후 연결 (placeholder)
│       └────────────────────┘       │
│                                    │
└────────────────────────────────────┘
```

**디자인:**
- 메인페이지와 동일한 dark gradient 배경, 폰트
- 좌측 상단: "← 수학 교사는 심심했다" (index.html로 돌아가는 링크) — 작고 반투명
- 제목: "📊 수학" (1.8rem)
- 버튼 2개: 메인페이지와 동일한 스타일
  - "지수함수와 로그함수" — 일단 placeholder (`#` 또는 클릭 무시)
  - "수열" — 일단 placeholder (`#` 또는 클릭 무시)
- 나중에 링크 연결할 수 있도록 확장 가능 구조

---

### Task 3: 검증

**Files:**
- Read: `/mnt/c/Users/evayo/OneDrive/Desktop/Math/index.html`
- Read: `/mnt/c/Users/evayo/OneDrive/Desktop/Math/math.html`

**검증 항목:**
1. `index.html` 열었을 때 제목 + 3버튼 정상 출력
2. "업무 자동화" 클릭 → 새 탭 auto-tesk.vercel.app
3. "수학" 클릭 → math.html로 이동
4. "동료교사 사이트" 클릭 → 반응 없음
5. `math.html`에서 "← 수학 교사는 심심했다" 클릭 → index.html로 돌아옴
6. 두 페이지 모두 다크 그라데이션 배경 일관성 유지
7. 기존 `function_graph/`, `수열/` 폴더 영향 없음

---

## Risks & 고려사항

- 기존 `index.html` 덮어씀 (원본 백업 필요시 사전 복사 가능)
- `math.html`의 "지수함수와 로그함수", "수열" 버튼은 아직 미연결 — 추후 각각 `exp_log/`, `sequence/` 페이지 만들거나 기존 `수열/` 폴더 연결 가능
- "수열" 버튼을 기존 `수열/` 폴더 index에 연결할지 여부는 추후 결정

## Verification

Windows에서 `/mnt/c/Users/evayo/OneDrive/Desktop/Math/index.html` 더블클릭 → 브라우저 확인
