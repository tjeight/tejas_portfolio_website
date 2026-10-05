"use client";

import { CheckCircle2 } from "lucide-react";

export function ExperienceTimeline() {
  const responsibilities = [
    "Architecting and developing asynchronous RESTful APIs using FastAPI and Python.",
    "Designing normalized PostgreSQL schemas, migrations with Alembic, and connection pooling.",
    "Implementing in-memory caching layers, session stores, and rate limiters with Redis.",
    "Integrating LangGraph cyclic agent workflows and background task workers into production services.",
  ];

  return (
    <section id="experience" className="relative py-28 lg:py-36 bg-[#fbfbf9] text-[#121215] border-b border-[#e6e4df]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#ff4d00] uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
          <span>07 // EXPERIENCE</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#121215] uppercase leading-[1.02]">
              Work{" "}
              <span className="font-serif-italic font-normal lowercase tracking-normal text-[#121215]">
                History<span className="text-[#ff4d00] font-sans">.</span>
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#121215]/60 font-light leading-relaxed">
            Real production backend engineering experience building resilient services and database pipelines.
          </p>
        </div>

        {/* Minimal Clean Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l border-[#121215]/20 max-w-3xl space-y-6">
          {/* Timeline Node */}
          <div className="relative">
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-[#ff4d00] ring-4 ring-[#fbfbf9]" />

            <div className="space-y-4">
              <div className="font-mono text-xs font-semibold text-[#ff4d00] tracking-wider uppercase">
                2023 – PRESENT
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121215] uppercase">
                  Backend Developer
                </h3>
                <div className="text-base sm:text-lg text-[#121215]/70 font-normal mt-0.5">
                  Andro Buddy Technologies
                </div>
              </div>

              {/* 3-4 Real Responsibilities (Zero fake metrics) */}
              <div className="pt-2 space-y-2.5">
                {responsibilities.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#121215]/80 font-normal leading-relaxed">
                    <CheckCircle2 size={14} className="text-[#ff4d00] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
