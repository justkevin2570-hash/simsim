'use client';

import { useState } from 'react';
import Link from 'next/link';

type Tab = 'view' | 'build' | 'admin';

export function AppShell({ children }: { children: React.ReactNode }) {
  // Tab state is managed by the parent; we just render nav
  return <>{children}</>;
}

type TabNavProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'view', label: '업무 검색 및 조회', icon: '🔍' },
    { key: 'build', label: '선생님용 업무 제작기', icon: '🛠' },
    { key: 'admin', label: '관리자 간편 반영기', icon: '🔐' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 sticky top-0 z-50 shadow-xs">
      <div className="flex items-center space-x-3 shrink-0">
        <Link
          href="https://simsim-five.vercel.app/work.html"
          className="text-slate-400 hover:text-slate-600 transition-colors text-sm mr-1"
        >
          ←
        </Link>
        <div className="bg-blue-600 text-white w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg shadow-md shadow-blue-200 select-none">
          🏫
        </div>
        <div>
          <h1 className="text-sm md:text-base font-bold tracking-tight text-slate-900">
            스마트 스쿨 행정 아키텍트
          </h1>
          <p className="text-[10px] md:text-xs text-slate-500 hidden sm:block">
            선생님들의 집단지성으로 만드는 행정 백과사전
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="bg-slate-100 p-1 rounded-xl flex space-x-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.slice(0, 4)}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
