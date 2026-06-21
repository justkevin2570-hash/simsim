// lib/templates/fairPlan.ts

import type { Step1BasicInfo, Step2Purpose, Step3Timetable, Step4Booths, Step5Clubs, Step6Lecture, Step7Budget, Step8Expectation, Step9Attachments } from '@/lib/types/fairPlan';

export type RhwpParagraph = {
  text: string;
  isHeading?: boolean;
  indent?: number;
};

export type FairPlanInput = {
  name: string;
  date: string;
  place: string;
  purposes: string[];
  boothCount: number;
  boothTypes: string[];
};

export function generateFairPlanText(data: FairPlanInput): string {
  const formatList = (items: string[]) => {
    if (items.length === 0) return "    가. (내용을 입력해주세요)";
    const prefixes = ["가", "나", "다", "라", "마", "바", "사"];
    return items
      .map((item, index) => `    ${prefixes[index] || index + 1}. ${item}`)
      .join("\n");
  };

  const purposeLines = formatList(data.purposes);
  const boothLines = formatList(data.boothTypes);

  return `${data.name} 운영 계획

1. 목적
${purposeLines}

2. 운영 개요
    가. 일 시: ${data.date}
    나. 장 소: ${data.place}
    다. 대 상: 전교생 및 학부모
    라. 규 모: 총 ${data.boothCount}개 부스 운영

3. 운영 부스 구성
${boothLines}

4. 세부 일정
    (세부 시간표 별첨)

5. 소요 예산
    (별도 품의 후 집행)

6. 기대 효과
    가. 학생의 진로 및 적성에 맞는 과목 선택 역량 강화
    나. 고교학점제에 대한 학생 및 학부모의 이해도 제고
`;
}

export type AdvancedFairPlanInput = {
  name: string;
  date: string;
  grade: string;
  programs: string[];
  policies: string[];
  timetableDetails: string[];
  includeSubjects: boolean;
  includeClubs: boolean;
};

export function generateAdvancedFairPlanText(data: AdvancedFairPlanInput): string {
  const numToPrefix = (i: number) => `    ${["가", "나", "다", "라", "마", "바", "사"][i] || i + 1}. `;

  const programLines = data.programs.map((p, i) => `${numToPrefix(i)}${p}`).join("\n");
  const policyLines = data.policies.map((p, i) => `${numToPrefix(i)}${p}`).join("\n");
  const timetableLines = data.timetableDetails.map((t) => `    ${t}`).join("\n");

  let boothSection = "";
  if (data.includeSubjects || data.includeClubs) {
    boothSection = "\n4. 세부 부스 운영 현황\n";
    if (data.includeSubjects) {
      boothSection += "  A. 교과(군) 선택 과목 및 진로 안내 부스\n    - 국어, 영어, 수학, 사회, 과학, 생활·교양, 진로진학상담 총 7개 부스 운영\n";
    }
    if (data.includeClubs) {
      boothSection += "  B. 학생 주도 진로 연계 주제 탐구 체험 부스\n    - 애교(교육), 시냅스(의료/3D), 퓨처랩(공학/AI), 케미셀(화학), 글로벌 링크(국제교류) 동아리 부스 운영\n";
    }
  }

  return `${data.name} 운영 계획

1. 운영 개요
    가. 일 시: ${data.date}
    나. 대 상: ${data.grade}
    다. 장 소: 본교 체육관(3층) 및 각 학급 교실

2. 주요 프로그램
${programLines}

3. 운영 목적 및 방침
${policyLines}

5. 당일 세부 시간표
${timetableLines}
${boothSection}
6. 행정사항 및 유의사항
    가. 학생들은 안전 수칙을 준수하고 이동 시 질서를 유지함.
    나. 박람회 적극 참여 유도를 위해 부스 참여 확인 스탬프(4개 이상) 날인 확인.
    다. 행사 종료 후 7교시에 리로스쿨을 통해 활동 보고서 제출 및 후기 작성 등록 안내.
`;
}

export function generateRhwpPlanData(data: AdvancedFairPlanInput): RhwpParagraph[] {
  const paragraphs: RhwpParagraph[] = [];

  paragraphs.push({ text: data.name, isHeading: true });
  paragraphs.push({ text: "" });

  paragraphs.push({ text: "1. 운영 개요", isHeading: true });
  paragraphs.push({ text: `가. 일 시: ${data.date}`, indent: 1 });
  paragraphs.push({ text: `나. 대 상: ${data.grade}`, indent: 1 });
  paragraphs.push({ text: "다. 장 소: 본교 체육관(3층) 및 각 학급 교실", indent: 1 });
  paragraphs.push({ text: "" });

  paragraphs.push({ text: "2. 주요 프로그램", isHeading: true });
  const prefixes = ["가", "나", "다", "라", "마", "바"];
  data.programs.forEach((p, i) => {
    paragraphs.push({ text: `${prefixes[i] || i + 1}. ${p}`, indent: 1 });
  });
  paragraphs.push({ text: "" });

  paragraphs.push({ text: "3. 운영 목적 및 방침", isHeading: true });
  data.policies.forEach((p, i) => {
    paragraphs.push({ text: `${prefixes[i] || i + 1}. ${p}`, indent: 1 });
  });
  paragraphs.push({ text: "" });

  paragraphs.push({ text: "4. 당일 세부 시간표", isHeading: true });
  data.timetableDetails.forEach((t) => {
    paragraphs.push({ text: `• ${t}`, indent: 1 });
  });

  if (data.includeSubjects || data.includeClubs) {
    paragraphs.push({ text: "" });
    paragraphs.push({ text: "5. 세부 부스 운영 현황", isHeading: true });
    if (data.includeSubjects) {
      paragraphs.push({ text: "A. 교과(군) 선택 과목 및 진로 안내 부스", indent: 1 });
      paragraphs.push({ text: "- 국어, 영어, 수학, 사회, 과학, 생활·교양, 진로진학상담 총 7개 부스 운영", indent: 2 });
    }
    if (data.includeClubs) {
      paragraphs.push({ text: "B. 학생 주도 진로 연계 주제 탐구 체험 부스", indent: 1 });
      paragraphs.push({ text: "- 애교(교육), 시냅스(의료/3D), 퓨처랩(공학/AI), 케미셀(화학), 글로벌 링크(국제교류) 동아리 부스 운영", indent: 2 });
    }
  }

  return paragraphs;
}

// 9단계 마법사 종합 텍스트 생성

type FullPlanInput = {
  step1: Step1BasicInfo;
  step2: Step2Purpose;
  step3: Step3Timetable;
  step4: Step4Booths;
  step5: Step5Clubs;
  step6: Step6Lecture;
  step7: Step7Budget;
  step8: Step8Expectation;
  step9: Step9Attachments;
};

export function generateFullPlanText(data: FullPlanInput, skippedSections: string[] = []): string {
  const { step1, step2, step3, step4, step5, step6, step7, step8, step9 } = data;
  const prefixes = ['가', '나', '다', '라', '마', '바', '사', '아'];

  const allPrograms = [...step1.selectedPrograms, ...step1.customPrograms.filter((p) => p.trim() !== '')];
  const programLines = allPrograms.map((p, i) => `    ${prefixes[i]}. ${p}`).join('\n');


  const boothRows = step4.booths.map((b) => `    ${b.boothNumber}번 (${b.subjectGroup}): ${b.content} / 담당: ${b.teacher}`).join('\n');

  const clubRows = step5.clubs.map((c) => `    ${c.clubName}: ${c.activity} / 담당: ${c.teacher}`).join('\n');

  const grade1Rows = step6.grade1Sessions.map((s) => `    ${s.session}: ${s.title} - ${s.content}`).join('\n');

  const grade2Rows = step6.grade2Lectures.map((l) => `    ${l.number}. ${l.department} - ${l.topic} (${l.instructor} ${l.university})`).join('\n');

  const formatCurrency = (amount: number) => new Intl.NumberFormat('ko-KR').format(amount);

  const budgetRows = step7.rows.map((r) => {
    const total = r.unitPrice * r.quantity * r.frequency;
    return `    ${r.category} | ${r.item} | 단가: ${formatCurrency(r.unitPrice)}원 × ${r.quantity}인원 × ${r.frequency}회 = ${formatCurrency(total)}원`;
  }).join('\n');

  const grandTotal = step7.rows.reduce((sum, r) => sum + r.unitPrice * r.quantity * r.frequency, 0);

  let attachmentsSection = '';
  if (step9.includeFamilyLetter) attachmentsSection += '\n  별첨 2: 가정통신문 안내장\n';
  if (step9.includeRoadmap) attachmentsSection += '  별첨 3: 진로 로드맵 양식\n';
  if (step9.includeReport) attachmentsSection += '  별첨 4: 학과 탐색 활동 보고서\n';
  if (step9.includeChecklist) attachmentsSection += '  별첨 5: 선택과목 체크리스트\n';

  const sectionParts: string[] = [];

  if (!skippedSections.includes('overview')) {
    sectionParts.push(`1. 운영 개요
    가. 일시: ${step1.date} (${step1.dayOfWeek})
    나. 대상: ${step1.targetGrades.join(', ')}
    다. 장소: 본교 체육관 및 각 학급 교실`);
  }

  if (!skippedSections.includes('programs') && allPrograms.length > 0) {
    sectionParts.push(`2. 주요 프로그램
${programLines}`);
  }

  if (!skippedSections.includes('purposes')) {
    sectionParts.push(`3. 목적
${step2.purposes.map((p, i) => `    ${prefixes[i]}. ${p}`).join('\n')}`);
  }

  if (!skippedSections.includes('policies')) {
    sectionParts.push(`4. 운영 방침
${step2.policies.map((p, i) => `    ${prefixes[i]}. ${p}`).join('\n')}
${step2.safetyEducation ? '    - 행사 전 사전 안전 교육 실시' : ''}
${step2.studentOperators ? '    - 학생 운영진 (동아리) 활용' : ''}
${step2.teacherAssignment ? '    - 각 부스 지도교사 위촉' : ''}
${step2.stampRally ? `    - 스탬프 랠리 운영 (${step2.stampCount}개 이상 날인 시 확인)` : ''}`);
  }

  if (!skippedSections.includes('timetable') && step3.cells.length > 0) {
    const grades = [...new Set(step3.cells.map((c) => c.grade))];
    let timetableText = '세부 시간표\n';
    grades.forEach((grade) => {
      const gradeCells = step3.cells
        .filter((c) => c.grade === grade)
        .sort((a, b) => a.period - b.period)
        .map((c) => `    ${c.period}교시 | ${c.content} | ${c.location}`)
        .join('\n');
      timetableText += `\n  [${grade}]\n    교시 | 내용 | 장소\n${gradeCells}\n`;
    });
    sectionParts.push(`5. ${timetableText.trim()}`);
  }

  if (!skippedSections.includes('booths') && step4.booths.length > 0) {
    sectionParts.push(`6. 교과 부스 운영 현황
${boothRows}

    운영 유의사항:
${step4.rules.map((r, i) => `    ${prefixes[i]}. ${r}`).join('\n')}`);
  }

  if (!skippedSections.includes('clubs') && step5.clubs.length > 0) {
    sectionParts.push(`7. 동아리 부스 운영
${clubRows}
${step5.briefingDate ? `\n    사전 설명회: ${step5.briefingDate} @ ${step5.briefingLocation}` : ''}`);
  }

  if (!skippedSections.includes('lectures') && (step6.grade1Sessions.length > 0 || step6.grade2Lectures.length > 0)) {
    sectionParts.push(`8. 고교학점제 이해 교육 및 특강
    [1학년 프로그램]
${grade1Rows}

    [2학년 대학교수 초청 강연]
${grade2Rows}`);
  }

  if (!skippedSections.includes('budget') && step7.rows.length > 0) {
    sectionParts.push(`9. 예산 계획
${budgetRows}

    총 합계: ${formatCurrency(grandTotal)}원`);
  }

  if (!skippedSections.includes('expectations')) {
    sectionParts.push(`10. 기대 효과
${step8.effects.map((e, i) => `    ${prefixes[i]}. ${e}`).join('\n')}`);
  }

  const renumbered = sectionParts.map((part, idx) => {
    const lines = part.split('\n');
    lines[0] = lines[0].replace(/^\d+\./, `${idx + 1}.`);
    return lines.join('\n');
  });

  return `${step1.eventName}

${step1.schoolName} ${step1.department}

${renumbered.join('\n\n')}

11. 별첨 서식
${attachmentsSection || '    없음'}
`;
}

type FamilyLetterInput = {
  step1: Step1BasicInfo;
  step5: Step5Clubs;
  step9: Step9Attachments;
};

export function generateFamilyLetter(data: FamilyLetterInput): string {
  const { step1, step5, step9 } = data;
  const { first, second, final: finalDate } = step9.applicationSchedule;

  return `가정통신문

학부모님께

평소 학교 교육에 깊은 관심을 가져주심에 감사드립니다.

본교에서는 학생들의 진로 탐색과 과목 선택 역량 강화를 위해
'${step1.eventName}'을(를) 다음과 같이 운영하고자 합니다.

1. 일시: ${step1.date} (${step1.dayOfWeek})
2. 대상: ${step1.targetGrades.join(', ')}
3. 장소: 본교 체육관 및 각 학급 교실

4. 수강신청 일정
    가. 1차 신청: ${first}
    나. 2차 신청: ${second}
    다. 최종 확정: ${finalDate}

5. 개설/폐강 기준: 신청 인원이 정원의 ${step9.openCloseThreshold}% 미만일 경우 폐강될 수 있습니다.

6. 사전 설명회
    - 일시: ${step5.briefingDate || '미정'}
    - 장소: ${step5.briefingLocation || '미정'}

학생들이 의미 있는 진로 탐색 활동을 할 수 있도록 학부모님의 관심과 협조를 부탁드립니다.

${step1.schoolName} 교육과정운영부
`;
}

export function generateRoadmap(): string {
  return `진로 로드맵 양식 (학생 배포용)

이름: (                )    학년: (    )반 (    )번

1. 나의 관심 분야
   - 관심 있는 교과: (                    )
   - 좋아하는 활동: (                    )

2. 희망 진로
   - 희망 직업/학과: (                    )
   - 그 이유: (                    )

3. 과목 선택 계획
   - 1학기 선택 과목: (                    )
   - 2학기 선택 과목: (                    )

4. 활동 목표
   - 참여하고 싶은 동아리: (                    )
   - 도전하고 싶은 활동: (                    )

5. 소감 및 반성
   (                    )
`;
}

type ReportInput = {
  step1: Step1BasicInfo;
  step6: Step6Lecture;
};

export function generateReport(data: ReportInput): string {
  const { step1, step6 } = data;

  return `학과 탐색 활동 보고서 (2학년)

이름: (                )    학년: (    )반 (    )번

1. 참여 일시: ${step1.date} (${step1.dayOfWeek})

2. 참여 강연 목록
${step6.grade2Lectures.map((l) => `   - ${l.number}. ${l.department}: ${l.topic} (${l.instructor})`).join('\n')}

3. 가장 인상 깊었던 강연
   - 강연명: (                    )
   - 강사: (                    )
   - 인상 깊었던 이유: (                    )

4. 진로 변화 여부
   - 기존 희망 진로: (                    )
   - 변경된 희망 진로: (                    )
   - 변경 이유: (                    )

5. 향후 계획
   (                    )
`;
}

type ChecklistInput = {
  step4: Step4Booths;
};

export function generateChecklist(data: ChecklistInput): string {
  const { step4 } = data;

  return `학교 맞춤형 선택과목 체크리스트

[지정 과목]
${step4.booths.map((b) => `   □ ${b.subjectGroup} - ${b.content}`).join('\n')}

[선택 과목]
   □ 제2외국어 (독일어, 프랑스어, 스페인어 등)
   □ 한문
   □ 전문교과 (정보, 농업, 공업, 상업 등)
   □ 기타: (                    )

[확인 사항]
   □ 희망 과목의 개설 여부 확인
   □ 수강 신청 일정 확인
   □ 진로 교사 상담 예약

담임 교사 확인: (                    )
`;
}
