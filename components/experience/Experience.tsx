"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Award, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { ExperienceData } from "@/types/portfolio";

interface ExperienceProps {
  experienceData: ExperienceData;
}

export default function Experience({ experienceData }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-950/90">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={experienceData.sectionTag}
          title={experienceData.heading}
          subtitle={experienceData.subheading}
        />

        {/* Futuristic Timeline Container */}
        <div className="relative mt-12 pl-6 sm:pl-10 border-l-2 border-cyan-500/30 space-y-12">
          {experienceData.timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Cyber Node on the axis */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.6)] group-hover:scale-125 transition-transform duration-200">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping-slow" />
                </div>
              </div>

              {/* Glass Card for Experience Details */}
              <GlassCard
                glow="cyan"
                className="p-6 sm:p-8 bg-slate-900/60 border-white/[0.08] hover:border-cyan-400/40"
              >
                {/* Header: Period, Company, Role */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        {item.company}
                      </span>
                      <span className="text-slate-600 font-mono">•</span>
                      <span className="text-slate-400 text-xs font-mono flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {item.location}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-mono text-[10px] uppercase">
                        {item.type}
                      </span>
                    </div>

                    <h3 className="font-mono font-bold text-xl sm:text-2xl text-white tracking-tight">
                      {item.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 font-mono text-xs text-cyan-300 shrink-0 self-start lg:self-center">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-6">
                  {item.summary}
                </p>

                {/* Responsibilities */}
                <div className="space-y-2.5 mb-6">
                  <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    KEY ENGINEERING RESPONSIBILITIES:
                  </span>
                  {item.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="font-sans leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Verified Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="mb-6 p-4 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
                    <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Award className="w-4 h-4 text-cyan-400" />
                      ENGINEERING IMPACT & BENCHMARKS:
                    </span>
                    <ul className="space-y-1.5">
                      {item.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2 font-sans">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technology Pills */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider mr-2">
                    STACK:
                  </span>
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-white/10 text-xs font-mono text-slate-300 group-hover:border-cyan-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
