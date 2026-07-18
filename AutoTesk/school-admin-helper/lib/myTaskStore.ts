/**
 * 내 업무(My Tasks) 스토어
 *
 * 사용자가 자주 사용하는 업무 가이드의 taskId를 localStorage에 저장.
 * 조회탭 → "내 업무에 추가" / "내 업무" 탭 → 목록 보기 및 삭제
 */
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Guide } from '@/lib/guideStore';

export type MyTask = {
  taskId: number;
  addedAt: string;
  note?: string;
};

type MyTaskStore = {
  myTasks: MyTask[];
  addMyTask: (taskId: number) => void;
  removeMyTask: (taskId: number) => void;
  isMyTask: (taskId: number) => boolean;
  /** 전체 guides 배열에서 내 업무에 등록된 것만 필터링 */
  getMyGuides: (guides: Guide[]) => Guide[];
};

export const useMyTaskStore = create<MyTaskStore>()(
  persist(
    (set, get) => ({
      myTasks: [],

      addMyTask: (taskId) =>
        set((s) => {
          if (s.myTasks.some((t) => t.taskId === taskId)) return {};
          return {
            myTasks: [
              ...s.myTasks,
              { taskId, addedAt: new Date().toISOString().split('T')[0] },
            ],
          };
        }),

      removeMyTask: (taskId) =>
        set((s) => ({
          myTasks: s.myTasks.filter((t) => t.taskId !== taskId),
        })),

      isMyTask: (taskId) => get().myTasks.some((t) => t.taskId === taskId),

      getMyGuides: (guides) => {
        const ids = new Set(get().myTasks.map((t) => t.taskId));
        return guides.filter((g) => ids.has(g.taskId));
      },
    }),
    { name: 'autotesk_my_tasks' },
  ),
);
