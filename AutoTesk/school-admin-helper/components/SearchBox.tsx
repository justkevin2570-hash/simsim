'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { searchGroups } from '@/lib/search';
import { getTasksByGroup } from '@/lib/tasks';

// 교사들이 가장 빈번하게 찾거나 헤매는 대표 키워드 숏컷 설정
const POPULAR_KEYWORDS = ['박람회', '품의서', '계획서', '만족도'];

export function SearchBox() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. 디바운싱 효과
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 100);
    return () => clearTimeout(handler);
  }, [query]);

  // 2. 검색 엔진 호출 (업무 그룹 단위)
  const results = useMemo(() => searchGroups(debouncedQuery), [debouncedQuery]);

  // 검색 결과가 바뀔 때마다 키보드 포커스 인덱스를 0번으로 초기화
  useEffect(() => {
    setActiveIdx(0);
  }, [results]);

  // 외부 영역 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 3. 고급 키보드 네비게이션 제어
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length > 0) {
        setActiveIdx((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        setActiveIdx((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0 && results[activeIdx]) {
        const targetPath = results[activeIdx].item.path;
        router.push(targetPath);
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // 4. 검색어 일치 텍스트 하이라이팅 유틸리티
  const renderHighlightedTitle = (title: string, searchStr: string) => {
    if (!searchStr.trim()) return <span>{title}</span>;

    const index = title.toLowerCase().indexOf(searchStr.toLowerCase());
    if (index < 0) return <span>{title}</span>;

    return (
      <span>
        {title.slice(0, index)}
        <strong className="text-blue-600 font-semibold">
          {title.slice(index, index + searchStr.length)}
        </strong>
        {title.slice(index + searchStr.length)}
      </span>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      {/* 검색 입력창 필드 */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="어떤 행정 업무를 찾고계신가요?"
          className="w-full px-6 py-4 text-base md:text-lg border-2 border-gray-200
                     rounded-full focus:border-blue-500 focus:outline-none
                     shadow-sm transition-all bg-white text-gray-900 pr-14"
        />
        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl pointer-events-none select-none">
          🔍
        </span>
      </div>

      {/* 실시간 자동완성 검색결과 레이어 드롭다운 */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white
                     border border-gray-200 rounded-2xl shadow-xl
                     overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200"
        >
          {query.trim() === '' ? (
            /* Case A: 검색어가 없을 때 */
            <div className="p-5">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                🔥 많이 찾는 추천 업무 키워드
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_KEYWORDS.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => {
                      setQuery(keyword);
                      inputRef.current?.focus();
                    }}
                    className="px-3.5 py-1.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600
                               rounded-full text-sm text-gray-600 transition-colors border border-gray-100"
                  >
                    #{keyword}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            /* Case B: 검색 결과 없음 */
            <div className="p-8 text-center text-gray-500 text-sm">
              <div className="text-2xl mb-2">😢</div>
              일치하는 행정 업무 항목이 없습니다.<br />
              <span className="text-xs text-gray-400 mt-1 block">단어의 초성이나 별칭을 입력해 보세요.</span>
            </div>
          ) : (
            /* Case C: 업무 그룹 검색 결과 */
            <ul className="max-h-[380px] overflow-y-auto divide-y divide-gray-50">
              {results.map((res, i) => {
                const group = res.item;
                const groupTasks = getTasksByGroup(group.id);
                const isSelected = activeIdx === i;

                return (
                  <li
                    key={group.id}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => {
                      router.push(group.path);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors
                                ${isSelected ? 'bg-blue-50/80' : 'bg-white'}`}
                  >
                    <span className="text-2xl select-none">{group.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm md:text-base">
                        {renderHighlightedTitle(group.title, query)}
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-xs text-blue-500 font-mono bg-blue-100/50 px-2 py-0.5 rounded select-none hidden md:inline">
                        Enter↵
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
