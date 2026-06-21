import type { WrapupData, SurveyArea } from '@/lib/types/wrapup';

const prefixes = ['가', '나', '다', '라', '마', '바', '사', '아'];

export function generateSurveyText(data: WrapupData): string {
  const { eventName, schoolName, department, date, target, surveyAreas } = data;

  const totalQuestions = surveyAreas.reduce((sum, a) => sum + a.questions.length, 0);

  const areaSections = surveyAreas
    .map((area, ai) => {
      const questions = area.questions
        .map((q, qi) => `    ${prefixes[qi] || (qi + 1)}. ${q}
        ① 매우 그렇다  ② 그렇다  ③ 보통이다  ④ 아니다  ⑤ 매우 아니다`)
        .join('\n\n');
      return `  [영역 ${ai + 1}] ${area.label}
${questions}`;
    })
    .join('\n\n');

  return `만족도 조사

${schoolName} ${department}

${eventName}과 관련하여 다음과 같이 만족도 조사를 실시하오니,
해당하는 번호에 ○표를 하여 주시기 바랍니다.

■ 행사 개요
  가. 행사명: ${eventName}
  나. 일시: ${date}
  다. 대상: ${target}

■ 응답 방법: 각 문항을 읽고 해당하는 번호에 ○표 하시오.
  (① 매우 그렇다  ② 그렇다  ③ 보통이다  ④ 아니다  ⑤ 매우 아니다)

■ 조사 문항 (총 ${totalQuestions}문항)

${areaSections}

※ 기타 의견이 있으시면 자유롭게 작성해 주세요.
________________________________________________________________
________________________________________________________________
________________________________________________________________

${schoolName} ${department}
`;
}

export function generateReportText(data: WrapupData): string {
  const { eventName, schoolName, department, date, target, participantCount, summary, achievements, improvements, attachments } = data;

  const achievementLines = achievements
    .filter((a) => a.trim() !== '')
    .map((a, i) => `    ${prefixes[i] || (i + 1)}. ${a}`)
    .join('\n');

  const improvementLines = improvements
    .filter((a) => a.trim() !== '')
    .map((a, i) => `    ${prefixes[i] || (i + 1)}. ${a}`)
    .join('\n');

  const attachmentText = attachments || '없음';

  return `결과보고서

${schoolName} ${department}

${eventName}을(를) 다음과 같이 운영하고 그 결과를 보고합니다.

1. 운영 개요
    가. 행사명: ${eventName}
    나. 일시: ${date}
    다. 대상: ${target}
    라. 참여 인원: ${participantCount.toLocaleString()}명

2. 운영 결과
    가. ${summary || '교육과정 박람회를 성황리에 마무리하였으며, 학생과 교사 모두 높은 만족도를 보였음.'}

3. 주요 성과
${achievementLines || '    가. 학생들의 진로 탐색 및 과목 선택 역량이 향상됨.\n    나. 고교학점제에 대한 이해도가 높아짐.'}

4. 향후 개선 사항
${improvementLines || '    가. 부스 운영 시간을 확대하여 더 많은 학생이 참여할 수 있도록 함.\n    나. 다양한 주제의 강연을 추가로 구성함.'}

붙임  ${attachmentText}  1부.  끝.

${schoolName} ${department}
`;
}
