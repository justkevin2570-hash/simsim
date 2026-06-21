'use client';

import { useFairPlanStore } from '@/lib/store/fairPlanStore';

export function Step6Lecture() {
  const { step6, updateStep } = useFairPlanStore();

  const addGrade1Session = () => {
    const newSession = {
      id: `s${Date.now()}`,
      session: `${step6.grade1Sessions.length + 1}차시`,
      title: '',
      content: '',
    };
    updateStep('step6', { grade1Sessions: [...step6.grade1Sessions, newSession] });
  };

  const removeGrade1Session = (id: string) => {
    updateStep('step6', { grade1Sessions: step6.grade1Sessions.filter((s) => s.id !== id) });
  };

  const updateGrade1Session = (id: string, field: string, value: string) => {
    updateStep('step6', {
      grade1Sessions: step6.grade1Sessions.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    });
  };

  const addGrade2Lecture = () => {
    const newLecture = {
      id: `l${Date.now()}`,
      number: step6.grade2Lectures.length + 1,
      department: '',
      topic: '',
      instructor: '',
      university: '',
    };
    updateStep('step6', { grade2Lectures: [...step6.grade2Lectures, newLecture] });
  };

  const removeGrade2Lecture = (id: string) => {
    updateStep('step6', { grade2Lectures: step6.grade2Lectures.filter((l) => l.id !== id) });
  };

  const updateGrade2Lecture = (id: string, field: string, value: string | number) => {
    updateStep('step6', {
      grade2Lectures: step6.grade2Lectures.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <h2 className="text-lg font-bold text-gray-800">6단계: 고교학점제 이해 교육 & 특강</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-bold text-blue-700 mb-2">1학년 대상: 고교학점제 이해 프로그램</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-20">차시</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-40">제목</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">학교수습내용</th>
                  <th className="border border-gray-200 px-3 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {step6.grade1Sessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2">
                      <input
                        type="text"
                        value={session.session}
                        onChange={(e) => updateGrade1Session(session.id, 'session', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      <input
                        type="text"
                        value={session.title}
                        onChange={(e) => updateGrade1Session(session.id, 'title', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="세션 제목"
                      />
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      <input
                        type="text"
                        value={session.content}
                        onChange={(e) => updateGrade1Session(session.id, 'content', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="학습 내용"
                      />
                    </td>
                    <td className="border border-gray-200 px-3 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeGrade1Session(session.id)}
                        className="text-gray-400 hover:text-red-500 text-sm"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={addGrade1Session}
              className="mt-2 text-sm text-blue-600 hover:underline font-medium"
            >
              + 차시 추가
            </button>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-bold text-blue-700 mb-2">2학년 대상: 외부 강사 특강</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-12">번호</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-28">학과</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">강의 주제</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-28">강사명</th>
                  <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600 w-32">학교/소속</th>
                  <th className="border border-gray-200 px-3 py-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {step6.grade2Lectures.map((lecture) => (
                  <tr key={lecture.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2 text-center">{lecture.number}</td>
                    <td className="border border-gray-200 px-3 py-2">
                      <input
                        type="text"
                        value={lecture.department}
                        onChange={(e) => updateGrade2Lecture(lecture.id, 'department', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="학과"
                      />
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      <input
                        type="text"
                        value={lecture.topic}
                        onChange={(e) => updateGrade2Lecture(lecture.id, 'topic', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="강의 주제"
                      />
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      <input
                        type="text"
                        value={lecture.instructor}
                        onChange={(e) => updateGrade2Lecture(lecture.id, 'instructor', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="강사명"
                      />
                    </td>
                    <td className="border border-gray-200 px-3 py-2">
                      <input
                        type="text"
                        value={lecture.university}
                        onChange={(e) => updateGrade2Lecture(lecture.id, 'university', e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="학교명"
                      />
                    </td>
                    <td className="border border-gray-200 px-3 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeGrade2Lecture(lecture.id)}
                        className="text-gray-400 hover:text-red-500 text-sm"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={addGrade2Lecture}
              className="mt-2 text-sm text-blue-600 hover:underline font-medium"
            >
              + 강연 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
