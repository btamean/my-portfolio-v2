'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Page {
  id: string;
  label: string;
}

const PAGES: Page[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function FolderPortfolio() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const folderColor = "#A2DFF7"; 

  const navigatePage = (direction: 'next' | 'back') => {
  if (!selectedPage) return;

  const currentIndex = PAGES.findIndex(p => p.id === selectedPage.id);
  let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

  if (nextIndex < 0 || nextIndex >= PAGES.length) return;

  // 1. 현재 페이지를 폴더로 돌려보냄
  setSelectedPage(null);

  // 2. 잠시 후, 다음(혹은 이전) 페이지의 탭을 '호버' 상태로 만듦
  setTimeout(() => {
    setHoveredIndex(nextIndex); // 👈 여기서 실제로 마우스를 올린 것처럼 탭이 쑥 올라옵니다.
  }, 400); // 종이가 들어가는 시간에 맞춰 조절

  // 3. 호버된 상태를 눈으로 확인시켜준 뒤, 해당 페이지를 전체화면으로 뽑아 올림
  setTimeout(() => {
    setSelectedPage(PAGES[nextIndex]);
    setHoveredIndex(null); // 페이지가 열리면 호버 상태 해제
  }, 900); // 호버 효과를 감상할 시간을 줍니다 (0.5초 정도)
};
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#f5f5f7] overflow-hidden" style={{ perspective: '1500px' }}>
      
      <AnimatePresence>
        {selectedPage && (
          <motion.div
            key={selectedPage.id}
            // 종이가 폴더 안(아래쪽)에서 뽑혀 나오는 설정
            initial={{ y: 600, scale: 0.4, opacity: 0, rotateX: -30 }}
            animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
            // 다시 폴더 안(아래쪽)으로 들어가는 설정
            exit={{ y: 600, scale: 0.4, opacity: 0, rotateX: -30 }}
            transition={{ 
              type: 'spring', 
              stiffness: 120, 
              damping: 22,
              duration: 0.5 
            }}
            className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center shadow-2xl origin-bottom"
          >
            {/* 왼쪽 Back 버튼: Home(0번 인덱스)이 아닐 때만 노출 */}
            {PAGES.findIndex(p => p.id === selectedPage.id) > 0 && (
              <button 
                onClick={() => navigatePage('back')}
                className="absolute left-10 top-1/2 -translate-y-1/2 p-6 hover:bg-gray-100 rounded-full transition-all group"
              >
                <span className="text-4xl group-hover:-translate-x-2 transition-transform block">←</span>
                <span className="text-xs font-bold text-gray-400 mt-2 block uppercase tracking-widest">Prev</span>
              </button>
            )}

            {/* 중앙 내용 영역 */}
            <div className="flex flex-col items-center">
              <span className="text-blue-500 font-mono mb-4">0{PAGES.findIndex(p => p.id === selectedPage.id) + 1} / 0{PAGES.length}</span>
              <h1 className="text-8xl font-black text-gray-900">{selectedPage.label}</h1>
            </div>

            {/* 오른쪽 Next 버튼: 마지막 페이지가 아닐 때만 노출 */}
            {PAGES.findIndex(p => p.id === selectedPage.id) < PAGES.length - 1 && (
              <button 
                onClick={() => navigatePage('next')}
                className="absolute right-10 top-1/2 -translate-y-1/2 p-6 hover:bg-gray-100 rounded-full transition-all group"
              >
                <span className="text-4xl group-hover:translate-x-2 transition-transform block">→</span>
                <span className="text-xs font-bold text-gray-400 mt-2 block uppercase tracking-widest">Next</span>
              </button>
            )}

            {/* 우측 상단 Close 버튼 */}
            <button 
              onClick={() => setSelectedPage(null)}
              className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">✕</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        onClick={() => !selectedPage && setIsOpen(!isOpen)}
        className="relative w-[540px] h-[360px] cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: isOpen ? 5 : 10, // 왼쪽에서 오른쪽 대각선 방향을 바라보는 각도
          rotateX: isOpen ? 0 : 0, // 살짝 위에서 내려다보는 각도
          scale: isOpen ? 1 : 1,   // 열릴 때 공간 확보를 위해 살짝 축소
        }}
      >
        {/* 폴더 뒷면 */}
        <div className="absolute inset-0 rounded-2xl" style={{ backgroundColor: folderColor, transform: 'translateZ(-20px)' }}>
          <div className="absolute -top-4 left-8 w-36 h-12 rounded-t-2xl" style={{ backgroundColor: folderColor }} />
        </div>

        {/* 종이 레이어들 */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center h-full" style={{ transformStyle: 'preserve-3d' }}>
          {PAGES.map((page, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const isFrontOfHovered = isAnyHovered && index > (hoveredIndex ?? 0);

            const tabWidth = 85;
            const tabLeft = 30 + (index * (tabWidth + 2));

            return (
              <motion.div
                key={page.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(e) => { e.stopPropagation(); if (isOpen) setSelectedPage(page); }}
                style={{ 
                  left: '3%', 
                  cursor: isOpen ? 'pointer' : 'default',
                  zIndex: isHovered ? 50 : index + 10, 
                }}
                animate={{
                  // 모든 제목이 보이도록 동일한 y값 유지
                  y: isOpen ? (isHovered ? -45 : -20) : 50,
                  z: isOpen ? index * 15 : 0,
                  
                  // 앞쪽 종이 기울기
                  rotateX: isOpen 
                    ? (isHovered 
                        ? -10 
                        : (isFrontOfHovered 
                            ? -60 
                            : -10 
                          )
                      ) 
                    : 0,
                  
                  // ✅ 투명도 수정: 0.3에서 0.6으로 높여서 종이의 존재감을 살림
                  opacity: isOpen 
                    ? (isFrontOfHovered ? 0.9 : 1) 
                    : 0,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                className="absolute w-[94%] h-[300px] bg-white border border-gray-200 rounded-xl shadow-sm origin-bottom"
              >
                {/* 인덱스 라벨 탭 */}
                <div 
                  className="absolute -top-8 h-8 border-t border-x border-gray-200 rounded-t-xl flex items-center justify-center transition-all"
                  style={{ 
                    left: `${tabLeft}px`, 
                    width: `${tabWidth}px`,
                    backgroundColor: isHovered ? '#fff' : '#f8f8f8',
                  }}
                >
                  <span className={`text-[11px] font-bold tracking-tight ${isHovered ? 'text-blue-600' : 'text-gray-400'}`}>
                    {page.label}
                  </span>
                </div>

                <div className="p-10 select-none">
                  <div className="w-12 h-1.5 bg-gray-100 rounded-full mb-6" />
                  <h2 className="text-3xl font-bold text-gray-100/50">{page.label}</h2>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 폴더 앞면 */}
        <motion.div
  animate={{ 
    // ✅ 'isOpen'일 때는 시원하게 열리도록 각도를 주되 (-35~-45 정도가 적당합니다)
    // 호버 상태(hoveredIndex)에 따른 조건문을 삭제해서 '덜컥'거림을 방지합니다.
    rotateX: isOpen ? -40 : 0, 
    
    // 열렸을 때 앞면이 앞으로 나오는 위치도 고정값으로 설정합니다.
    z: isOpen ? 180 : 50 
  }}
  transition={{ 
    type: 'spring', 
    stiffness: 120, // 조금 더 묵직하게 열리도록 stiffness 조절
    damping: 20 
  }}
  className="absolute inset-x-0 bottom-0 h-[300px] rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden"
  style={{ 
    transformOrigin: 'bottom center',
    backgroundColor: folderColor,
    zIndex: 100 
  }}
>
  {/* 빛 반사 효과 */}
  <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-black/10 opacity-50" />
  
  {/* PORTFOLIO 글자 (항상 표시) */}
  <span 
    className="text-xl font-black text-gray-800/40 tracking-[0.2em] select-none" 
    style={{ transform: 'translateZ(30px)', opacity: isOpen ? 0.8 : 1 }}
  >
    PORTFOLIO
  </span>
</motion.div>
      </motion.div>
    </div>
  );
}