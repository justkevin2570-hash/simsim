# AutoTesk - 프로젝트 진행 기록

## 프로젝트 개요

- **이름**: AutoTesk (학교 행정업무 도우미)
- **URL**: https://auto-tesk.vercel.app/
- **저장소**: https://github.com/justkevin2570-hash/AutoTesk
- **루트 디렉터리**: `school-admin-helper/` (Vercel 배포 시 Root Directory 설정 필요)

---

## 기술 스택

| 영역 | 선택 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript (strict) |
| 스타일 | Tailwind CSS |
| 검색 | Fuse.js + 한글 초성 검색 |
| 상태관리 | Zustand |
| 폼 | react-hook-form + zod |
| 배포 | Vercel (GitHub 연동 자동 배포) |

---

## 폴더 구조

```
school-admin-helper/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # 메인 검색 화면
│   └── fair/
│       ├── page.tsx                # 교육과정 박람회 업무 흐름
│       ├── plan/page.tsx           # 운영계획서 마법사
│       ├── purchase/page.tsx       # 품의서 유형 선택
│       └── wrapup/page.tsx         # 마무리 유형 선택
├── components/
│   ├── SearchBox.tsx               # 검색 자동완성 (그룹 단위)
│   └── ResultView.tsx              # 결과 텍스트 + 복사 UI
├── lib/
│   ├── tasks.ts                    # 업무 그룹 + 업무 마스터 데이터
│   ├── hangul.ts                   # 한글 초성 추출 유틸
│   ├── search.ts                   # Fuse.js 그룹 검색 로직
│   ├── options.ts                  # 마법사 선택지 데이터
│   ├── store.ts                    # Zustand 상태 관리
│   └── templates/
│       └── fairPlan.ts             # 운영계획서 텍스트 생성
├── CLAUDE.md                       # AI 개발 지침서
├── PROGRESS.md                     # 이 파일 (진행 기록)
└── package.json
```

---

## 핵심 아키텍처

### 1. 업무 그룹(BusinessGroup) + 업무(Task) 계층 구조

```
검색 → 업무 그룹 노출 → 그룹 클릭 → 업무 흐름 페이지 → 개별 업무 클릭 → 마법사
```

- `lib/tasks.ts`에 `businessGroups[]`와 `tasks[]` 분리
- 검색은 그룹 단위(`searchGroups`), 흐름은 Task 단위(`getTasksByGroup`)

### 2. 사용자 흐름

```
[메인: 검색창]
    ↓ "박람회" 검색 → 🎪 교육과정 박람회 (그룹)
[업무 흐름 페이지 /fair/]
    ├── 1단계 계획:  📋 운영계획서 작성
    ├── 2단계 품의:  🍪 학생 간식 / 💰 강사 수당 / 📦 운영 물품
    └── 3단계 마무리: 📊 만족도 조사 / 📝 결과보고서
[각 마법사 페이지]
    ↓ 단계별 입력
[ResultView: 텍스트 프리뷰 + 복사 버튼]
```

---

## 구현 현황

### ✅ 완료

| 항목 | 파일 | 상태 |
|------|------|------|
| 프로젝트 셋업 | 전체 | ✅ |
| 업무 그룹 + Task 데이터 | `lib/tasks.ts` | ✅ |
| 한글 초성 유틸 | `lib/hangul.ts` | ✅ |
| 그룹 단위 검색 | `lib/search.ts` | ✅ |
| 검색 UI (디바운싱, 키보드 조작) | `components/SearchBox.tsx` | ✅ |
| 메인 검색 화면 | `app/page.tsx` | ✅ |
| 업무 흐름 페이지 | `app/fair/page.tsx` | ✅ |
| 운영계획서 마법사 (3단계) | `app/fair/plan/page.tsx` | ✅ |
| 운영계획서 텍스트 생성 | `lib/templates/fairPlan.ts` | ✅ |
| 결과 뷰 공통 컴포넌트 | `components/ResultView.tsx` | ✅ |
| 품의서 유형 선택 페이지 | `app/fair/purchase/page.tsx` | ✅ (플레이스홀더) |
| 마무리 유형 선택 페이지 | `app/fair/wrapup/page.tsx` | ✅ (플레이스홀더) |

### 🚧 미구현 (플레이스홀더만 있음)

| 항목 | 파일 | 비고 |
|------|------|------|
| 학생 간식 품의 마법사 | `app/fair/purchase?type=snack` | TODO |
| 강사 수당 품의 마법사 | `app/fair/purchase?type=fee` | TODO |
| 운영 물품 품의 마법사 | `app/fair/purchase?type=goods` | TODO |
| 만족도 조사 마법사 | `app/fair/wrapup?type=survey` | TODO |
| 결과보고서 마법사 | `app/fair/wrapup?type=report` | TODO |

---

## 주요 변경 이력

| 순서 | 변경 내용 | 관련 파일 |
|------|-----------|-----------|
| 1 | Next.js 프로젝트 생성 + 라이브러리 설치 | 전체 |
| 2 | 업무 마스터 데이터 (`tasks.ts`) | `lib/tasks.ts` |
| 3 | 한글 초성 추출 (`hangul.ts`) | `lib/hangul.ts` |
| 4 | Fuse.js 검색 통합 (`search.ts`) | `lib/search.ts` |
| 5 | 검색 UI 컴포넌트 (`SearchBox.tsx`) | `components/SearchBox.tsx` |
| 6 | 메인 검색 화면 | `app/page.tsx` |
| 7 | 운영계획서 텍스트 생성 | `lib/templates/fairPlan.ts` |
| 8 | 운영계획서 마법사 | `app/fair/plan/page.tsx` |
| 9 | ResultView 공통 컴포넌트 분리 | `components/ResultView.tsx` |
| 10 | **버그 수정**: SearchBox onChange에 setQuery 누락 | `components/SearchBox.tsx` |
| 11 | **구조 변경**: 업무 그룹 기반 검색으로 전환 | `lib/tasks.ts`, `lib/search.ts`, `components/SearchBox.tsx` |
| 12 | **신규**: 업무 흐름 페이지 | `app/fair/page.tsx` |
| 13 | **신규**: 품의서/마무리 유형 선택 페이지 | `app/fair/purchase/page.tsx`, `app/fair/wrapup/page.tsx` |
| 14 | **버그 수정**: useSearchParams Suspense wrapping | `app/fair/purchase/page.tsx`, `app/fair/wrapup/page.tsx` |
| 15 | **UI 정리**: 부가 설명 제거 (검색 결과, 업무 카드) | 여러 파일 |
| 16 | **UI 개선**: 단계 라벨 알약형 + 화살표 제거 | `app/fair/page.tsx` |

---

## 배포

- **Vercel**: GitHub 푸시 시 자동 배포
- **설정**: Root Directory → `school-admin-helper`
- **URL**: https://auto-tesk.vercel.app/

### 배포 명령어 (수동)
```bash
cd school-admin-helper
git add . && git commit -m "message" && git push
```

---

## 향후 작업

1. **품의서 마법사 3종** 구현 (간식 / 강사수당 / 운영물품)
2. **만족도 조사** 마법사 구현
3. **결과보고서** 마법사 구현
4. localStorage 학교 정보 저장 기능
5. 작성 이력 관리 기능
6. 새 업무 그룹 추가 (예: 현장체험학습, 방과후학교 등)

---

## 새 업무 그룹 추가 방법

1. `lib/tasks.ts`에 `businessGroups[]`에 그룹 추가
2. 같은 파일 `tasks[]`에 업무 추가 (group, order 설정)
3. `lib/options.ts`에 선택지 추가
4. `lib/templates/`에 텍스트 생성 함수 추가
5. `app/<그룹ID>/page.tsx`에 업무 흐름 페이지 생성
6. `app/<그룹ID>/<업무>/page.tsx`에 마법사 페이지 생성

---

마지막 업데이트: 2026-05-25
