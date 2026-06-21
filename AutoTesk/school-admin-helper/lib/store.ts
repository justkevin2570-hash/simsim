import { create } from "zustand";
import { persist } from "zustand/middleware";

type SchoolInfo = {
  schoolName: string;
  principalName: string;
  writerName: string;
  writerPosition: string;
};

type HistoryItem = {
  id: string;
  taskId: string;
  title: string;
  createdAt: string;
};

type AppState = {
  schoolInfo: SchoolInfo;
  setSchoolInfo: (info: SchoolInfo) => void;
  history: HistoryItem[];
  addHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      schoolInfo: {
        schoolName: "",
        principalName: "",
        writerName: "",
        writerPosition: "",
      },
      setSchoolInfo: (info) => set({ schoolInfo: info }),
      history: [],
      addHistory: (item) =>
        set((state) => ({ history: [item, ...state.history] })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "school-admin-storage",
    }
  )
);
