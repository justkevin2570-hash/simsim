/**
 * 교육과정 박람회 프로세스 가이드 데이터
 *
 * 박람회 업무를 5단계 프로세스로 정의하고,
 * 각 단계별 상세 가이드·체크리스트·참고파일·유틸리티 링크 제공
 */
import { registerGuide, type ProcessStep } from '@/lib/processGuides';

const steps: ProcessStep[] = [
  // ─────────────────────────────────────────────
  // STEP 01: 계획서 내부결재
  // ─────────────────────────────────────────────
  {
    order: 1,
    title: '계획서 내부결재',
    stepLabel: 'STEP 01',
    summary: '행사 개최 최소 2주 전, 내부결재를 통해 학교장 승인을 받습니다. 시기·장소·대상·안전대책이 명확히 명시되어야 결재가 빠르게 통과됩니다.',
    contentHtml: `
      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <h3 class="font-bold text-gray-900 mb-2"><i class="text-blue-500 mr-2">📌</i>처리 방법 설명</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          교육과정 박람회 운영계획서를 작성하여 학교장 결재를 득합니다. 
          운영계획서에는 행사 목적, 일시·장소, 대상 학년, 프로그램 구성, 
          예산 규모, 안전관리 계획이 포함되어야 합니다.
          결재 완료 후 품의 단계로 진행할 수 있습니다.
        </p>
      </div>
      <div>
        <h3 class="font-bold text-gray-900 mb-3"><i class="text-emerald-500 mr-2">📋</i>계획서 필수 포함 사항</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">행사 목적 및 배경</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">일시·장소·대상 학년</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">세부 프로그램 구성</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">소요 예산 산출 내역</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">안전관리 및 사고 대책</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">협조 사항 (행정실·각 부서)</span>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-bold text-gray-900 mb-3"><i class="text-emerald-500 mr-2">📄</i>관련 양식 및 예시파일</h3>
        <div class="space-y-2">
          <a href="#" class="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
            <div class="flex items-center space-x-3">
              <span class="text-blue-500 text-xl">📄</span>
              <span class="text-sm font-medium">교육과정 박람회 운영계획서 표준안.hwp</span>
            </div>
            <span class="text-gray-400 text-sm">⬇</span>
          </a>
        </div>
      </div>
    `,
    checklist: [
      '박람회 목적을 구체적으로 작성했는가?',
      '일정이 학교 학사일정과 충돌하지 않는가?',
      '예산 산출 내역이 구체적인가?',
      '안전관리 계획이 포함되었는가?',
    ],
    referenceFiles: [
      { name: '운영계획서 표준안.hwp', icon: '📄', description: '교육과정 박람회 운영계획서 양식' },
    ],
    utilities: [
      { label: '운영계획서 작성 마법사 열기', href: '/fair/plan', icon: '📋', description: '9단계 마법사로 계획서 자동 작성' },
    ],
  },

  // ─────────────────────────────────────────────
  // STEP 02: 에듀파인 품의
  // ─────────────────────────────────────────────
  {
    order: 2,
    title: '에듀파인 품의',
    stepLabel: 'STEP 02',
    summary: '계획서 결재 완료 후 예산 집행을 위해 K-에듀파인 시스템에서 품의서를 작성합니다. 산출내역은 [단가 × 수량 × 횟수] 형식을 준수해야 반려를 피할 수 있습니다.',
    contentHtml: `
      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <h3 class="font-bold text-gray-900 mb-2"><i class="text-blue-500 mr-2">📌</i>에듀파인 시스템 접속 및 기본 절차</h3>
        <ul class="text-sm text-gray-600 space-y-1.5 list-disc pl-4">
          <li>업무포털 로그인 후 <strong class="text-gray-900">K-에듀파인 → 사업관리 → 사업별예산집행</strong>으로 이동합니다.</li>
          <li>산출내역 기재 시 <code class="bg-gray-200 text-red-600 px-1 rounded font-mono text-xs">[단가 × 수량 × 횟수]</code> 형식을 철저히 준수해야 반려를 피할 수 있습니다.</li>
          <li>예산 과목(목)이 정확한지 사전에 확인하세요.</li>
          <li>수의계약 가능 여부를 행정실과 사전 협의하세요.</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold text-gray-900 mb-3"><i class="text-indigo-500 mr-2">✅</i>품의 유형별 안내</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-3 border border-gray-100 rounded-xl bg-gray-50/50 text-center">
            <span class="text-2xl block mb-1">🍪</span>
            <span class="text-sm font-medium">학생 간식 품의</span>
            <span class="text-xs text-gray-500 block mt-1">인원수 × 단가</span>
          </div>
          <div class="p-3 border border-gray-100 rounded-xl bg-gray-50/50 text-center">
            <span class="text-2xl block mb-1">💰</span>
            <span class="text-sm font-medium">강사 수당 품의</span>
            <span class="text-xs text-gray-500 block mt-1">시수 × 단가</span>
          </div>
          <div class="p-3 border border-gray-100 rounded-xl bg-gray-50/50 text-center">
            <span class="text-2xl block mb-1">📦</span>
            <span class="text-sm font-medium">운영 물품 품의</span>
            <span class="text-xs text-gray-500 block mt-1">물품 × 수량</span>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-bold text-gray-900 mb-3"><i class="text-emerald-500 mr-2">📄</i>관련 양식 및 예시파일</h3>
        <div class="space-y-2">
          <a href="#" class="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
            <div class="flex items-center space-x-3">
              <span class="text-green-600 text-xl">📊</span>
              <span class="text-sm font-medium">표준 품의서 서식 및 적요 템플릿.xlsx</span>
            </div>
            <span class="text-gray-400 text-sm">⬇</span>
          </a>
        </div>
      </div>
    `,
    checklist: [
      '예산 과목(목)이 정확하게 매칭되었는가?',
      '산출내역이 [단가×수량×횟수] 형식인가?',
      '조달/수의계약 여부를 사전 확정했는가?',
      '증빙 서류(견적서 등)를 첨부했는가?',
    ],
    referenceFiles: [
      { name: '표준 품의서 서식.xlsx', icon: '📊', description: '적요 템플릿 포함' },
    ],
    utilities: [
      { label: '학생 간식 품의서 작성', href: '/fair/purchase?type=snack', icon: '🍪', description: '인원수와 단가로 간식 품의서 자동 작성' },
      { label: '강사 수당 품의서 작성', href: '/fair/purchase?type=fee', icon: '💰', description: '강사 시수·단가 기반 수당 품의서 작성' },
      { label: '운영 물품 품의서 작성', href: '/fair/purchase?type=goods', icon: '📦', description: '부스 운영 물품 일괄 품의' },
    ],
  },

  // ─────────────────────────────────────────────
  // STEP 03: 계약 및 물품구입
  // ─────────────────────────────────────────────
  {
    order: 3,
    title: '계약 및 물품구입',
    stepLabel: 'STEP 03',
    summary: '품의 승인이 완료되면 행정실에서 조달 계약 또는 수의계약을 진행합니다. 교사는 필요한 규격서 및 과업지시서를 명확히 전달해야 합니다.',
    contentHtml: `
      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <h3 class="font-bold text-gray-900 mb-2"><i class="text-blue-500 mr-2">📌</i>처리 방법 설명</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          품의 승인 완료 후, 행정실에서 계약 절차를 진행합니다.
          500만 원 이상은 조달청 나라장터를 통한 입찰, 
          500만 원 미만은 수의계약이 가능합니다.
          교사는 물품 규격·수량·납품일정을 상세히 전달해야 합니다.
        </p>
      </div>
      <div>
        <h3 class="font-bold text-gray-900 mb-3"><i class="text-orange-500 mr-2">🛠</i>계약 유형별 기준</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-sm font-medium block mb-1"><span class="text-blue-500">•</span> 조달 계약</span>
            <span class="text-xs text-gray-500">500만 원 이상, 나라장터 입찰</span>
          </div>
          <div class="p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-sm font-medium block mb-1"><span class="text-blue-500">•</span> 수의계약</span>
            <span class="text-xs text-gray-500">500만 원 미만, 행정실 자체 계약</span>
          </div>
          <div class="p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-sm font-medium block mb-1"><span class="text-blue-500">•</span> 학교장터(S2B)</span>
            <span class="text-xs text-gray-500">교육용 물품, 학교장터 활용</span>
          </div>
          <div class="p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-sm font-medium block mb-1"><span class="text-blue-500">•</span> 카드 매입</span>
            <span class="text-xs text-gray-500">200만 원 미만 소액, 카드사용</span>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-bold text-gray-900 mb-3"><i class="text-emerald-500 mr-2">📄</i>관련 양식</h3>
        <div class="space-y-2">
          <a href="#" class="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
            <div class="flex items-center space-x-3">
              <span class="text-blue-500 text-xl">📄</span>
              <span class="text-sm font-medium">물품 규격서 및 과업지시서 양식.hwp</span>
            </div>
            <span class="text-gray-400 text-sm">⬇</span>
          </a>
        </div>
      </div>
    `,
    checklist: [
      '물품 규격을 상세히 작성했는가?',
      '납품 일정이 행사 일정에 맞는가?',
      '계약 방법(조달/수의)을 행정실과 협의했는가?',
      '다수 공급자 견적을 비교했는가?',
    ],
    referenceFiles: [
      { name: '과업지시서 양식.hwp', icon: '📄', description: '물품 규격 및 납품 조건 명세' },
    ],
    utilities: [],
  },

  // ─────────────────────────────────────────────
  // STEP 04: 행사 실시 및 안전관리
  // ─────────────────────────────────────────────
  {
    order: 4,
    title: '행사 실시 및 안전관리',
    stepLabel: 'STEP 04',
    summary: '행사 당일 아침 학생 대상 안전교육을 실시하고, 증빙 사진을 남겨야 합니다. 사전에 철저한 안전대책을 수립하여 만일의 사고에 대비합니다.',
    contentHtml: `
      <div class="bg-amber-50 border border-amber-200 p-4 rounded-xl">
        <h3 class="font-bold text-gray-900 mb-2"><span class="text-amber-500 mr-2">⚠️</span>안전관리 핵심 수칙</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          행사 당일 아침 학생 대상 안전교육을 실시하고, 증빙 사진을 남겨야 합니다.
          부스 운영 중 응급상황에 대비한 비상연락망과 대처 매뉴얼을 준비합니다.
          학부모 안내 문자 발송도 병행하면 좋습니다.
        </p>
      </div>
      <div>
        <h3 class="font-bold text-gray-900 mb-3"><span class="text-indigo-500 mr-2">✅</span>당일 체크리스트</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">학생 대상 사전 안전교육 실시</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">비상연락망 배부 및 안내</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">행사 진행 사진 촬영 (증빙용)</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">학부모 안내 문자 발송</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">응급 상황 대비 구급함 비치</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">부스 운영 교사 배치 확인</span>
          </div>
        </div>
      </div>
    `,
    checklist: [
      '안전교육을 실시하고 증빙사진을 남겼는가?',
      '비상연락망을 사전에 배부했는가?',
      '학부모 안내는 완료했는가?',
      '응급상황 대비 물품(구급함 등)을 준비했는가?',
    ],
    referenceFiles: [],
    utilities: [],
  },

  // ─────────────────────────────────────────────
  // STEP 05: 정산 및 결과보고
  // ─────────────────────────────────────────────
  {
    order: 5,
    title: '정산 및 결과보고',
    stepLabel: 'STEP 05',
    summary: '집행된 모든 영수증과 지출 증빙을 모아 지출결의를 행정실에 제출하고, 만족도 조사 결과를 포함한 결과보고 내부결재를 득해야 최종 마무리됩니다.',
    contentHtml: `
      <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl">
        <h3 class="font-bold text-gray-900 mb-2"><span class="text-blue-500 mr-2">📌</span>정산 절차</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          행사 종료 후 7일 이내에 지출결의서를 작성하여 행정실에 제출합니다.
          모든 지출 증빙(영수증·계산서·카드전표)을 첨부해야 합니다.
          만족도 조사 결과와 운영 성과를 포함한 결과보고서를 작성하여
          내부결재를 득함으로써 업무가 최종 완료됩니다.
        </p>
      </div>
      <div>
        <h3 class="font-bold text-gray-900 mb-3"><span class="text-indigo-500 mr-2">✅</span>정산 체크리스트</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">지출 증빙 자료 취합</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">지출결의서 제출 (행정실)</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">만족도 조사 실시 및 분석</span>
          </div>
          <div class="flex items-center space-x-3 p-3 border border-gray-100 rounded-xl bg-gray-50/50">
            <span class="text-blue-500">✅</span><span class="text-sm font-medium">결과보고서 내부결재 완료</span>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-bold text-gray-900 mb-3"><span class="text-emerald-500 mr-2">📄</span>관련 양식</h3>
        <div class="space-y-2">
          <a href="#" class="flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
            <div class="flex items-center space-x-3">
              <span class="text-blue-500 text-xl">📄</span>
              <span class="text-sm font-medium">교육과정 박람회 결과보고서 표준안.hwp</span>
            </div>
            <span class="text-gray-400 text-sm">⬇</span>
          </a>
        </div>
      </div>
    `,
    checklist: [
      '모든 지출 증빙이 누락 없이 취합되었는가?',
      '지출결의서를 행정실에 제출했는가?',
      '만족도 조사를 실시하고 결과를 분석했는가?',
      '결과보고서 내부결재를 완료했는가?',
    ],
    referenceFiles: [
      { name: '결과보고서 표준안.hwp', icon: '📄', description: '교육과정 박람회 결과보고서 양식' },
    ],
    utilities: [
      { label: '만족도 조사 문항 생성', href: '/fair/wrapup?type=survey', icon: '📊', description: '5점 척도 만족도 조사 문항 자동 생성' },
      { label: '결과보고서 작성', href: '/fair/wrapup?type=report', icon: '📝', description: '운영 결과와 만족도 분석 보고서 작성' },
    ],
  },
];

registerGuide({
  domainId: 'fair',
  steps,
});
