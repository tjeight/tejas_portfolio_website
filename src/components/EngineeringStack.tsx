"use client";

import { useState } from "react";
import { playSubtleClick } from "@/components/SoundEffects";

export function EngineeringStack() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const categories = [
    {
      num: "01",
      category: "BACKEND",
      technologies: ["Python", "FastAPI", "Django", "SQLAlchemy"],
      role: "Core asynchronous runtimes, APIs, and service orchestration",
    },
    {
      num: "02",
      category: "AI & AGENTS",
      technologies: ["LangGraph", "LangChain", "LLM APIs"],
      role: "Cyclic state graphs, tool execution, and deterministic checkpoints",
    },
    {
      num: "03",
      category: "DATA & PERSISTENCE",
      technologies: ["PostgreSQL", "Redis", "Supabase"],
      role: "ACID transactions, spatial geofences, and in-memory streams",
    },
    {
      num: "04",
      category: "INFRASTRUCTURE",
      technologies: ["Docker", "AWS", "Nginx", "CI/CD"],
      role: "Containerized environments, cloud hosting, and automated pipelines",
    },
    {
      num: "05",
      category: "FRONTEND",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      role: "Server-rendered clinician interfaces and client dashboard state",
    },
  ];

  return (
    <section id="stack" className="relative py-28 lg:py-36 bg-[#fbfbf9] text-[#121215] border-b border-[#e6e4df]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#ff4d00] uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
          <span>06 // TECHNICAL ECOSYSTEM</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#121215] uppercase leading-[1.02]">
              Engineering{" "}
              <span className="font-serif-italic font-normal lowercase tracking-normal text-[#121215]">
                Stack<span className="text-[#ff4d00] font-sans">.</span>
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#121215]/60 font-light leading-relaxed">
            Technologies I rely on for backend systems, AI workflows, and reliable product execution.
          </p>
        </div>

        {/* Typographic Technical Categories */}
        <div className="divide-y divide-[#e6e4df] border-t border-b border-[#e6e4df]">
          {categories.map((cat) => (
            <div
              key={cat.num}
              className="py-7 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline group hover:bg-[#faf9f5] transition-colors duration-200 -mx-5 px-5 sm:-mx-8 sm:px-8"
            >
              {/* Category Col (4 Cols) */}
              <div className="lg:col-span-4 flex items-baseline gap-4 sm:gap-6">
                <span className="font-mono text-xs font-bold text-[#ff4d00]">
                  {cat.num}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#121215] uppercase">
                    {cat.category}
                  </h3>
                  <div className="font-mono text-[11px] text-[#121215]/45 mt-1">
                    {cat.role}
                  </div>
                </div>
              </div>

              {/* Technologies Typographic String (8 Cols) */}
              <div className="lg:col-span-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-base sm:text-xl lg:text-2xl text-[#121215]">
                {cat.technologies.map((tech, index) => {
                  const isHovered = hoveredTech === tech;

                  return (
                    <span key={tech} className="inline-flex items-center gap-4">
                      <span
                        onMouseEnter={() => {
                          playSubtleClick();
                          setHoveredTech(tech);
                        }}
                        onMouseLeave={() => setHoveredTech(null)}
                        className={`cursor-pointer transition-all duration-200 font-medium ${
                          isHovered
                            ? "text-[#ff4d00] scale-105"
                            : "text-[#121215]/85 hover:text-[#121215]"
                        }`}
                      >
                        {tech}
                      </span>
                      {index < cat.technologies.length - 1 && (
                        <span className="text-[#121215]/25 text-base sm:text-lg">
                          ·
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
