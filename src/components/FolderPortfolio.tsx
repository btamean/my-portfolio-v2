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

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#f5f5f7] overflow-hidden" style={{ perspective: '1500px' }}>
      
      <AnimatePresence>
        {selectedPage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center"
          >
            <button onClick={() => { setSelectedPage(null); setIsOpen(false); }} className="absolute top-10 left-10 px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-all text-sm">
              ← Back
            </button>
            <h1 className="text-5xl font-bold text-gray-800">{selectedPage.label}</h1>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        onClick={() => !selectedPage && setIsOpen(!isOpen)}
        className="relative w-[540px] h-[360px] cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
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
                    ? (isFrontOfHovered ? 0.6 : 1) 
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
            rotateX: isOpen ? (hoveredIndex !== null && hoveredIndex < 3 ? -70 : -45) : 0, 
            z: isOpen ? 120 : 30 
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          className="absolute inset-x-0 bottom-0 h-[300px] rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden"
          style={{ 
            transformOrigin: 'bottom center',
            backgroundColor: folderColor,
            border: '1px solid rgba(0,0,0,0.1)',
            zIndex: 60
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
          {!isOpen && <span className="text-lg font-extrabold text-gray-800/60 tracking-widest">PORTFOLIO</span>}
        </motion.div>
      </motion.div>
    </div>
  );
}