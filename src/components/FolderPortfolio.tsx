'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

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
      
      <AnimatePresence mode="wait">
        {selectedPage && (
          <motion.div
            key={selectedPage.id}
            initial={{ y: 600, scale: 0.4, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 600, scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 22 }}
            // z-index를 최상단으로 올리고 flex-col로 정렬
            className="absolute inset-0 z-[100] bg-white flex flex-col shadow-2xl origin-bottom overflow-hidden"
          >
            {/* 1. 상단 컨트롤 바 (고정 영역) */}
            <div className="relative w-full h-16 flex items-center justify-between px-6 border-b border-gray-100 flex-shrink-0 bg-white z-[110]">
              <div className="flex items-center gap-4">
                <span className="text-blue-500 font-mono text-sm">0{PAGES.findIndex(p => p.id === selectedPage.id) + 1}</span>
                <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tighter">{selectedPage.label}</h2>
              </div>
              
              <button 
                onClick={() => setSelectedPage(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <span className="text-xl text-gray-500">✕</span>
              </button>
            </div>

            {/* 2. 실제 콘텐츠 영역 (스크롤 가능) */}
            <div className="relative flex-1 overflow-y-auto custom-scrollbar">
              {/* 이동 버튼들을 콘텐츠 영역 위에 띄웁니다 (Fixed가 아닌 Absolute로) */}
              <div className="sticky top-1/2 -translate-y-1/2 w-full flex justify-between px-4 pointer-events-none z-50">
                {/* Back 버튼 */}
                {PAGES.findIndex(p => p.id === selectedPage.id) > 0 ? (
                  <button 
                    onClick={() => navigatePage('back')}
                    className="p-4 bg-white/80 backdrop-blur-sm shadow-md rounded-full pointer-events-auto hover:bg-white transition-all group"
                  >
                    <span className="text-2xl group-hover:-translate-x-1 block transition-transform">←</span>
                  </button>
                ) : <div />}

                {/* Next 버튼 */}
                {PAGES.findIndex(p => p.id === selectedPage.id) < PAGES.length - 1 && (
                  <button 
                    onClick={() => navigatePage('next')}
                    className="p-4 bg-white/80 backdrop-blur-sm shadow-md rounded-full pointer-events-auto hover:bg-white transition-all group"
                  >
                    <span className="text-2xl group-hover:translate-x-1 block transition-transform">→</span>
                  </button>
                )}
              </div>

              {/* 렌더링되는 실제 컴포넌트 */}
              <div className="w-full h-full">
                {selectedPage.id === 'home' && <Hero />}
                {selectedPage.id === 'about' && <About />}
                {selectedPage.id === 'projects' && <Projects />}
                {selectedPage.id === 'skills' && <Skills />}
                {selectedPage.id === 'contact' && <Contact />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        onClick={() => !selectedPage && setIsOpen(!isOpen)}
        className="relative w-[540px] h-[360px] cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: isOpen ? 0 : 0, // 왼쪽에서 오른쪽 대각선 방향을 바라보는 각도
          rotateX: isOpen ? -5 : 0, // 살짝 위에서 내려다보는 각도
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
                // ✅ 수정 1: isOpen이 false일 때도 종이가 살짝 보이도록 y값 조절 (50 -> 0)
                // isOpen일 때 호버하면 위로 더 올라오게(-60), 아니면 기본 위치(-20)
                y: isOpen 
                  ? (isHovered ? -55 : -10) 
                  : 55, // 👈 폴더가 닫혔을 때 탭 윗부분이 살짝 보이게 5px 정도로 설정

                // ✅ 수정 2: isOpen이 false일 때도 투명도를 1로 유지 (0 -> 1)
                opacity: 1, 

                // ✅ 수정 3: z축 간격은 닫혔을 때 촘촘하게, 열렸을 때 넓게
                z: isOpen ? (index * 30 + (isHovered ? 20 : 0)) : (index * 2),

                // isOpen이 아닐 때는 평평하게, 열릴 때만 뒤로 기울어짐
                rotateX: isOpen ? (isHovered ? -5 : (isFrontOfHovered ? -55 : -12)) : 0,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="absolute w-[94%] h-[300px] bg-white border border-gray-100 rounded-xl shadow-md origin-bottom"
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
            z: isOpen ? 180 : 50 ,
            scale: 0.98
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
            zIndex: 100,
            border: '1.5px solid rgba(0, 0, 0, 0.08)', 
            // 안쪽에도 살짝 테두리 느낌을 주려면 box-shadow를 활용할 수 있습니다.
            boxShadow: '0 10px 30px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.2)'
          }}
        >
          {/* 빛 반사 효과 */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-black/10 opacity-50" />
          
          {/* PORTFOLIO 글자 (항상 표시) */}
          <span className="text-xl font-extrabold text-gray-800/40 tracking-[0.2em] select-none" style={{ transform: 'translateZ(30px)', opacity: isOpen ? 0.8 : 1 }}
          >
            허대범의 PORTFOLIO
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}