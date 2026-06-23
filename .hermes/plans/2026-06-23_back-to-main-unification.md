# 뒤로 가기 버튼 통일화 계획 (3개 허브 페이지만)

> **For Hermes:** 메인 index.html에서 연결되는 3개 허브 페이지(수학·업무자동화·동료교사사이트)의 "← 메인으로 돌아가기" 링크를 통일한다.

**Goal:** simsim 메인(index.html)의 3개 메뉴 → 각각의 첫 진입 페이지에서 동일한 텍스트·모양·위치의 뒤로 가기 링크 제공.

**Scope:** 하위 페이지(고등학교 수학, 대수, 수학적귀납법 등)는 제외. 오직 3개 페이지만.

| 메뉴 | 대상 페이지 | 현재 상태 |
|------|-----------|----------|
| 수학 | `Math/select.html` | "← 메인으로" (fixed, top:24/left:24) — 텍스트만 다름 |
| 업무 자동화 | `AutoTesk/school-admin-helper/app/page.tsx` | **없음** — 신규 추가 |
| 동료교사 사이트 | `teachers.html` | "← 메인으로 돌아가기" (absolute, top:28/left:34) — 위치 다름 |

**통일 스펙:**
- 텍스트: `← 메인으로 돌아가기`
- 위치: `position: fixed; top: 24px; left: 24px; z-index: 100;`
- 색상: 다크 배경 → `rgba(255,255,255,0.35)` / hover `0.7`
- AutoTesk는 흰+회색 배경이므로 어두운 색상으로

---

## Task 1: `Math/select.html` — 텍스트만 수정

**파일:** `Math/select.html`

텍스트 "← 메인으로" → "← 메인으로 돌아가기". CSS는 이미 일치하므로 그대로.

```html
<a class="back" href="../index.html">← 메인으로 돌아가기</a>
```

(기존 CSS `.back` 그대로 사용 — 이미 `fixed, top:24, left:24` 임)

---

## Task 2: `AutoTesk/school-admin-helper/app/page.tsx` — 신규 추가

**파일:** `AutoTesk/school-admin-helper/app/page.tsx`

메인 페이지(검색창)에만 추가. `layout.tsx`는 건드리지 않는다 (하위 페이지에 영향 주지 않도록).

배경이 `bg-gray-50`(밝은 회색)이므로 어두운 색상 사용.

**추가 코드** — `<main>` 태그 바로 앞에:

```tsx
{/* 메인으로 돌아가기 (simsim index.html) */}
<a
  href="https://simsim-five.vercel.app"
  className="fixed top-6 left-6 text-gray-400 hover:text-gray-600 text-sm transition-colors z-[100]"
>
  ← 메인으로 돌아가기
</a>
```

> ⚠️ 링크 대상: AutoTesk와 simsim이 별도 Vercel 도메인으로 배포되어 있으므로 절대 URL 사용. 추후 같은 도메인으로 통합 시 상대 경로로 변경.

---

## Task 3: `teachers.html` — position 통일

**파일:** `teachers.html`

CSS `.back-link` → `fixed`, 좌표 `(24,24)`, body의 `position:relative` 제거.

**변경 1:** CSS

```css
.back-to-main {
    position: fixed;
    top: 24px;
    left: 24px;
    color: rgba(255,255,255,0.35);
    font-size: 0.9rem;
    text-decoration: none;
    transition: color 0.2s;
    z-index: 100;
}
.back-to-main:hover { color: rgba(255,255,255,0.7); }
```

**변경 2:** body에서 `position: relative;` 제거

**변경 3:** `<a>` class명만 교체

```html
<a class="back-to-main" href="index.html">← 메인으로 돌아가기</a>
```

---

## Verification

1. `Math/select.html` — 텍스트 "← 메인으로 돌아가기" 확인
2. AutoTesk 메인(`page.tsx`) — 링크 나타나는지, simsim 메인으로 이동하는지
3. `teachers.html` — fixed 위치 통일, 호버 효과 확인
4. 각 페이지에서 클릭 시 모두 `index.html`로 복귀

---

## 통일 후 최종 상태

```
index.html
  ├── [수학]              → Math/select.html      → ← 메인으로 돌아가기 (fixed, 24/24)
  ├── [업무 자동화]        → AutoTesk page.tsx      → ← 메인으로 돌아가기 (fixed, 24/24, dark text)
  └── [동료교사 사이트]     → teachers.html         → ← 메인으로 돌아가기 (fixed, 24/24)
```
