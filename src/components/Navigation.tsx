"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationProps {
  scrollToSection: (index: number) => void;
  currentSection: number;
}

export default function Navigation({ scrollToSection, currentSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t('home'), href: "#home" },
    { name: t('about'), href: "#about" },
    { name: t('skills'), href: "#skills" },
    { name: t('projects'), href: "#projects" },
    { name: t('contact'), href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || currentSection > 0
          ? "bg-white/90 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        {/* justify-between은 유지하되, 내부 요소들이 공간을 나눠 갖게 합니다 */}
        <div className="flex items-center justify-between"> 
          
          {/* 1. 왼쪽 빈 공간 (로고 대신 공간 차지) */}
          <div className="hidden md:flex flex-1"></div>

          {/* 2. 네비게이션 메뉴 (중앙) */}
          <ul className="hidden md:flex space-x-8 items-center justify-center shrink-0">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(index)}
                  className={`text-sm font-medium transition-colors relative group ${
                    currentSection === index 
                      ? "text-[rgb(var(--primary))] dark:text-[rgb(var(--accent))]" 
                      : "text-gray-700 dark:text-gray-300 hover:text-[rgb(var(--primary))] dark:hover:text-[rgb(var(--accent))]"
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[rgb(var(--primary))] transition-all ${
                    currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </button>
              </motion.li>
            ))}
          </ul>

          {/* 3. 오른쪽 버튼 영역 (flex-1을 주어 1번과 대칭을 맞춤) */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-3">
            {/* 다크모드 토글 버튼 */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800/50 
                         hover:bg-gray-50 dark:hover:bg-gray-700 
                         transition-all shadow-sm text-gray-700 dark:text-gray-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* 언어 토글 버튼 */}
            <button
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800/50 
                         hover:border-[rgb(var(--primary))] dark:hover:border-[rgb(var(--primary))]
                         transition-all shadow-sm text-gray-700 dark:text-gray-200"
            >
              {language === 'ko' ? 'EN' : 'KO'}
            </button>
          </div>

          {/* 모바일 메뉴 버튼 (모바일에서만 우측 끝 정렬) */}
          <div className="md:hidden flex flex-1 justify-end">
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}