"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("typing"); 
  const fullText = t('greeting');

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    setPhase("typing");

    const timer = setInterval(() => {
      setDisplayText(fullText.substring(0, i + 1));
      i++;

      if (i >= fullText.length) {
        clearInterval(timer);
        setTimeout(() => setPhase("content"), 500);
      }
    }, 120);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* 커서 깜빡임을 위한 스타일 주입 */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>

      <div className="container mx-auto max-w-4xl flex flex-col items-center">
        
        {/* [Step 1] 인사말 */}
        <motion.div
          animate={{ y: phase === "typing" ? 0 : -20 }} // 이동 거리도 줄여서 자연스럽게
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="mb-2" 
        >
          <h2 className="text-[rgb(var(--primary))] font-bold text-xl md:text-2xl flex items-center justify-center min-h-[40px]">
            {displayText}
            {phase === "typing" && (
              <span className="cursor-blink inline-block w-[2px] h-[0.9em] bg-[rgb(var(--primary))] ml-1 shadow-[0_0_8px_rgb(var(--primary))]" />
            )}
          </h2>
        </motion.div>

        {/* [Step 2] 나머지 콘텐츠 */}
        <AnimatePresence>
          {phase === "content" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
              className="flex flex-col items-center text-center"
            >
              <motion.p variants={itemFadeUp} className="text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400 mb-4">
                {t('iAm')}
              </motion.p>

              <motion.h1 variants={itemFadeUp} className="text-5xl md:text-7xl font-black text-[rgb(var(--foreground))] tracking-tight leading-[1.1] mb-6">                
                <span className="gradient-text">{t('webDeveloper')}</span>
              </motion.h1>

              <motion.p variants={itemFadeUp} className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-[500px] leading-relaxed">                
                {t('heroDescription')}
              </motion.p>

              <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row gap-4">
                <a href="#projects" className="px-7 py-3.5 bg-[rgb(var(--primary))] text-white rounded-xl font-bold shadow-md hover:scale-105 transition-all text-sm">
                  {t('viewProjects')}
                </a>
                <a href="#contact" className="px-7 py-3.5 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] rounded-xl font-bold hover:bg-[rgb(var(--primary))] hover:text-white transition-all text-sm">
                  {t('contactMe')}
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};