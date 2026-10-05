"use client";

import { 
  Zap, Database, Layers, Cloud, 
  GitMerge, Server, Box, Terminal
} from "lucide-react";

export function TechnologyStrip() {
  const technologies = [
    { name: "Python", icon: Terminal },
    { name: "FastAPI", icon: Zap },
    { name: "PostgreSQL", icon: Database },
    { name: "Redis", icon: Layers },
    { name: "AWS", icon: Cloud },
    { name: "LangGraph", icon: GitMerge },
    { name: "Next.js", icon: Server },
    { name: "Docker", icon: Box },
  ];

  return (
    <section className="relative py-6 bg-[#f5f4ef] border-b border-[#e6e4df] select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Label */}
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#121215]/50 uppercase shrink-0">
          <span>TECHNOLOGIES I WORK WITH</span>
        </div>

        {/* Center Icons Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-mono text-xs text-[#121215]/80">
          {technologies.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.name}
                className="flex items-center gap-2 hover:text-[#ff4d00] transition-colors"
              >
                <Icon size={14} className="text-[#121215]/50" />
                <span className="font-medium">{t.name}</span>
              </div>
            );
          })}
        </div>

        {/* Right Tag */}
        <div className="hidden xl:flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#121215]/50 uppercase shrink-0">
          <span>FROM IDEAS TO IMPACT</span>
          <span className="text-[#ff4d00] text-xs">◆</span>
        </div>
      </div>
    </section>
  );
}
