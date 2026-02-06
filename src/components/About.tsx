"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    /* 핵심: items-center를 제거하고 상단 패딩(pt-32)을 명시적으로 줍니다. 
       이렇게 해야 프로젝트 페이지와 제목 위치가 "칼같이" 맞습니다. */
    <div 
      className="min-h-screen w-full bg-[rgb(var(--muted))] pt-32 pb-20 px-6" 
      ref={ref}
    >
      <div className="container mx-auto max-w-6xl">
        {/* 제목 섹션: 이제 어떤 섹션에서도 이 위치에 고정됩니다 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            {t('aboutMe')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))] mb-12"></div>
        </motion.div>

        {/* 그리드 영역: items-start를 써서 상단부터 배치되게 합니다. */}
        <div className="grid md:grid-cols-2 gap items-start">
          {/* 왼쪽: 프로필 이미지 영역 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* md:aspect-square를 써서 너무 커지지 않게 조절 */}
            <div className="aspect-square max-w-[300px] card overflow-hidden relative group mx-auto md:mx-0">
              <div className="w-full h-full bg-gradient-to-br from-[rgb(var(--primary))]/10 to-[rgb(var(--secondary))]/10 flex items-center justify-center">
                <span className="text-8xl">👨‍💻</span>
              </div>
            </div>
          </motion.div>

          {/* 오른쪽: 소개 텍스트 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('aboutDescription1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('aboutDescription2')}
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="card p-6 text-center bg-white/50 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-[rgb(var(--primary))] mb-2">3+</h3>
                <p className="text-sm text-gray-600">{t('yearsExperience')}</p>
              </div>
              <div className="card p-6 text-center bg-white/50 backdrop-blur-sm">
                <h3 className="text-3xl font-bold text-[rgb(var(--secondary))] mb-2">20+</h3>
                <p className="text-sm text-gray-600">{t('projectsCompleted')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}