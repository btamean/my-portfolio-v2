"use client";

import FolderPortfolio from '@/components/FolderPortfolio';
import { LanguageProvider } from '@/contexts/LanguageContext'; // 경로를 확인하세요!

export default function Home() {
  return (
    <LanguageProvider>
      <main>
        <FolderPortfolio />
      </main>
    </LanguageProvider>
  );
}