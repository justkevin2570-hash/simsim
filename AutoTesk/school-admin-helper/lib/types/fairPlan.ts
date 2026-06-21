export type Step1BasicInfo = {
  eventName: string;
  schoolName: string;
  department: string;
  date: string;
  dayOfWeek: string;
  targetGrades: string[];
  selectedPrograms: string[];
  customPrograms: string[];
};

export type TimetableCell = {
  period: number;
  grade: string;
  content: string;
  location: string;
};

export type Step2Purpose = {
  purposes: string[];
  policies: string[];
  safetyEducation: boolean;
  studentOperators: boolean;
  teacherAssignment: boolean;
  stampRally: boolean;
  stampCount: number;
};

export type Step3Timetable = {
  usePreset: boolean;
  cells: TimetableCell[];
};

export type BoothRow = {
  id: string;
  boothNumber: string;
  subjectGroup: string;
  content: string;
  teacher: string;
};

export type Step4Booths = {
  booths: BoothRow[];
  rules: string[];
};

export type ClubRow = {
  id: string;
  clubName: string;
  activity: string;
  teacher: string;
};

export type Step5Clubs = {
  clubs: ClubRow[];
  briefingDate: string;
  briefingLocation: string;
};

export type Lecture1stGrade = {
  id: string;
  session: string;
  title: string;
  content: string;
};

export type Lecture2ndGrade = {
  id: string;
  number: number;
  department: string;
  topic: string;
  instructor: string;
  university: string;
};

export type Step6Lecture = {
  grade1Sessions: Lecture1stGrade[];
  grade2Lectures: Lecture2ndGrade[];
};

export type BudgetRow = {
  id: string;
  category: string;
  item: string;
  unitPrice: number;
  quantity: number;
  frequency: number;
};

export type Step7Budget = {
  rows: BudgetRow[];
};

export type Step8Expectation = {
  effects: string[];
  gymImage: string | null;
};

export type Step9Attachments = {
  includeFamilyLetter: boolean;
  includeRoadmap: boolean;
  includeReport: boolean;
  includeChecklist: boolean;
  applicationSchedule: {
    first: string;
    second: string;
    final: string;
  };
  openCloseThreshold: number;
};

export type FairPlanData = {
  step1: Step1BasicInfo;
  step2: Step2Purpose;
  step3: Step3Timetable;
  step4: Step4Booths;
  step5: Step5Clubs;
  step6: Step6Lecture;
  step7: Step7Budget;
  step8: Step8Expectation;
  step9: Step9Attachments;
  currentStep: number;
  skippedSections: string[];
};
