export type WrapupType = 'survey' | 'report';

export type SurveyArea = {
  id: string;
  label: string;
  questions: string[];
};

export type WrapupData = {
  wrapupType: WrapupType;
  eventName: string;
  schoolName: string;
  department: string;
  date: string;
  target: string;
  participantCount: number;

  // Survey specific
  surveyAreas: SurveyArea[];

  // Report specific
  summary: string;
  achievements: string[];
  improvements: string[];
  attachments: string;

  currentStep: number;
};

export const DEFAULT_SURVEY_AREAS: SurveyArea[] = [
  {
    id: 'a1',
    label: '운영 만족도',
    questions: [
      '행사 일정 및 시간 구성에 만족하십니까?',
      '행사 장소 및 시설에 만족하십니까?',
      '전반적인 행사 운영에 만족하십니까?',
    ],
  },
  {
    id: 'a2',
    label: '프로그램 만족도',
    questions: [
      '부스 체험 활동의 내용에 만족하십니까?',
      '강연 및 특강의 유익성에 만족하십니까?',
      '프로그램의 다양성에 만족하십니까?',
    ],
  },
  {
    id: 'a3',
    label: '진로 탐색 효과',
    questions: [
      '이번 행사가 진로 탐색에 도움이 되었습니까?',
      '과목 선택에 대한 이해도가 향상되었습니까?',
      '고교학점제에 대한 이해도가 향상되었습니까?',
    ],
  },
];
