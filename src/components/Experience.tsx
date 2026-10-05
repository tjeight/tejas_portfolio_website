"use client";

import { EXPERIENCE_DATA } from "@/data/portfolioData";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 lg:py-32 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#ff4800] uppercase tracking-wider mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4800]" />
          <span>05 // Career Timeline</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              Production <br className="hidden sm:block" />
              Experience<span className="text-[#ff4800]">.</span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-white/50 leading-relaxed">
            Real production systems, live database migrations, authentication architectures, and scalable API engineering.
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/15 pl-6 sm:pl-10 ml-3 sm:ml-6 space-y-12">
          {EXPERIENCE_DATA.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center">
                <span className="w-3.5 h-3.5 rounded-full bg-[#08080a] border-2 border-[#ff4800] group-hover:scale-125 transition-transform" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div>
                    <div className="font-mono text-xs text-[#ff4800] font-semibold uppercase tracking-wider mb-1">
                      {exp.type}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <div className="text-lg text-white/80 font-medium mt-1">
                      {exp.company}
                    </div>
                  </div>

                  <div className="font-mono text-xs text-white/50 space-y-1 sm:text-right">
                    <div className="flex sm:justify-end items-center gap-1.5 text-white/80">
                      <Calendar size={13} className="text-[#ff4800]" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex sm:justify-end items-center gap-1.5 text-white/40">
                      <MapPin size={13} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="py-6 text-sm sm:text-base text-white/70 font-light leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements List */}
                <div className="space-y-3 pt-2">
                  <div className="font-mono text-xs uppercase tracking-wider text-white/40 mb-3">
                    Key Production Deliverables
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {exp.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs sm:text-sm text-white/80 font-light leading-relaxed"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-[#ff4800] shrink-0 mt-0.5"
                        />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-white/40 mr-2">
                    TECHNOLOGIES:
                  </span>
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
