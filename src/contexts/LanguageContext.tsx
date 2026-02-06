"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ko: {
    // Navigation
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    
    // Hero
    greeting: "안녕하세요.",
    iAm: "기술과 디자인의 조화를 추구하는",
    webDeveloper: "풀스택 웹 개발자",
    iAmSuffix: "허대범 입니다",
    heroDescription: "탄탄한 서버 설계부터 감각적인 UI 구현까지, 서비스의 전 과정을 아우르는 개발자입니다.",
    viewProjects: "프로젝트 보기",
    contactMe: "연락하기",
    scrollDown: "Scroll Down",
    
    // About
    aboutMe: "About Me",
    aboutDescription1: "안녕하세요! 사용자 중심의 웹 경험을 만드는 것에 열정을 가진 풀스택 웹 개발자입니다.",
    aboutDescription2: "최신 웹 기술을 활용하여 성능과 사용성을 모두 갖춘 현대적인 웹 애플리케이션을 개발합니다. 클린 코드와 우아한 솔루션을 추구하며, 지속적인 학습과 성장을 중요하게 생각합니다.",
    yearsExperience: "Years Experience",
    projectsCompleted: "Projects Completed",
    
    // Contact
    getInTouch: "Get In Touch",
    letsWork: "Let's Work Together",
    contactDescription: "새로운 프로젝트나 협업 기회에 대해 이야기 나누고 싶으시다면 언제든 연락주세요. 함께 멋진 것을 만들어봅시다!",
    connectWith: "Connect With Me",
    name: "Name",
    email: "Email",
    message: "Message",
    sendMessage: "Send Message",
    messageSent: "메시지가 전송되었습니다!",
    yourName: "Your name",
    yourEmail: "your.email@example.com",
    yourMessage: "Your message...",
    
    // Footer
    builtWith: "Built with Next.js & Tailwind CSS",
  },
  en: {
    // Navigation
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    
    // Hero
    greeting: "Hello 👋",
    iAm: "I'm a",
    webDeveloper: "Web Developer",
    iAmSuffix: "",
    heroDescription: "Creating innovative and beautiful web services with user experience as the top priority",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    scrollDown: "Scroll Down",
    
    // About
    aboutMe: "About Me",
    aboutDescription1: "Hello! I'm a full-stack web developer passionate about creating user-centered web experiences.",
    aboutDescription2: "I develop modern web applications with both performance and usability using the latest web technologies. I pursue clean code and elegant solutions, valuing continuous learning and growth.",
    yearsExperience: "Years Experience",
    projectsCompleted: "Projects Completed",
    
    // Contact
    getInTouch: "Get In Touch",
    letsWork: "Let's Work Together",
    contactDescription: "Feel free to reach out if you'd like to discuss new projects or collaboration opportunities. Let's create something amazing together!",
    connectWith: "Connect With Me",
    name: "Name",
    email: "Email",
    message: "Message",
    sendMessage: "Send Message",
    messageSent: "Message sent successfully!",
    yourName: "Your name",
    yourEmail: "your.email@example.com",
    yourMessage: "Your message...",
    
    // Footer
    builtWith: "Built with Next.js & Tailwind CSS",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ko] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};