"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Next.js와 Stripe를 활용한 풀스택 전자상거래 플랫폼.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    image: "🛒",
    link: "#",
    github: "#",
  },
  {
    title: "Real-time Chat App",
    description: "WebSocket을 활용한 실시간 채팅 애플리케이션.",
    tags: ["React", "Node.js", "Socket.io"],
    image: "💬",
    link: "#",
    github: "#",
  },
  {
    title: "AI Image Generator",
    description: "AI를 활용한 이미지 생성 웹 앱.",
    tags: ["Next.js", "OpenAI", "Tailwind"],
    image: "🎨",
    link: "#",
    github: "#",
  },
  {
    title: "Task Management Tool",
    description: "드래그 앤 드롭 기반 칸반 보드.",
    tags: ["React", "Firebase", "TypeScript"],
    image: "📋",
    link: "#",
    github: "#",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      className="min-h-screen w-full pt-32 pb-20 px-6" 
      ref={ref}
    >
      <div className="container mx-auto max-w-6xl">
        
        {/* 제목 - 고정 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex-shrink-0"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[rgb(var(--foreground))]">
            Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]"></div>
        </motion.div>

        {/* 스크롤 가능한 프로젝트 리스트 */}
        <div 
          className="overflow-y-auto pr-2 bg-[rgb(var(--muted))] rounded-2xl p-6 custom-scrollbar"
          style={{ maxHeight: 'calc(100vh - 20rem)' }}
          onWheel={(e) => {
            e.stopPropagation();
          }}
        >          
          <div className="flex flex-col gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-[rgb(var(--border))] hover:shadow-lg transition-all hover:bg-white"
              >
                {/* 이미지 */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 bg-gradient-to-br from-[rgb(var(--primary))]/10 to-[rgb(var(--accent))]/10 rounded-xl flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                  {project.image}
                </div>

                {/* 내용 */}
                <div className="flex-grow w-full">
                  <div className="flex flex-row items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-[rgb(var(--foreground))] group-hover:text-[rgb(var(--primary))] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-3">
                      <a href={project.link} className="text-xs font-bold text-[rgb(var(--primary))] uppercase tracking-wider hover:underline">Live</a>
                      <a href={project.github} className="text-xs font-bold text-gray-400 uppercase tracking-wider hover:text-black transition-colors">Code</a>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-medium bg-[rgb(var(--muted))] text-[rgb(var(--primary))] rounded-md border border-[rgb(var(--border))]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}