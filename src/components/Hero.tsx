"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ArchitecturalHeroVisual } from "./ArchitecturalHeroVisual";
import { playSubtleClick } from "@/components/SoundEffects";

export function Hero() {
  const handleScrollTo = (id: string) => {
    playSubtleClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const featurePillars = [
    "AI AGENTS",
    "SCALABLE BACKENDS",
    "DISTRIBUTED SYSTEMS",
    "CLEAN ARCHITECTURE",
    "REAL PRODUCTS",
  ];

  return (
    <section className="relative min-h-[94vh] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-24 bg-[#fbfbf9] text-[#121215] overflow-hidden editorial-grid border-b border-[#e6e4df]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          {/* Left Column: Headline, CTAs, and Pillars (7 Cols ~ 58%) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small Eyebrow with Orange Dot */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#ff4d00]" />
              <span className="font-mono text-xs tracking-widest text-[#121215]/70 uppercase font-medium">
                BACKEND &amp; AI ENGINEER
              </span>
            </motion.div>

            {/* Headline and Pillar List Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
              {/* Giant Editorial Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#121215] leading-[0.96]"
              >
                <span className="block">Building</span>
                <span className="block">systems</span>
                <span className="block">
                  that{" "}
                  <span className="font-serif-italic font-normal lowercase tracking-normal text-[#121215]">
                    think<span className="text-[#ff4d00] font-sans font-bold">.</span>
                  </span>
                </span>
              </motion.h1>

              {/* Sub-Pillar List with Orange Dash (Matching Reference) */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="hidden sm:flex flex-col font-mono text-[10px] tracking-widest text-[#121215]/50 space-y-1.5 pt-3"
              >
                <div className="flex items-center gap-2 text-[#ff4d00]">
                  <span className="w-3 h-[1.5px] bg-[#ff4d00]" />
                  <span>AI AGENTS</span>
                </div>
                {featurePillars.slice(1).map((pillar) => (
                  <div key={pillar} className="pl-5">
                    {pillar}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Supporting Concise Statement */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[#121215]/75 font-normal leading-relaxed max-w-xl mb-10"
            >
              I build scalable backend systems, AI agents, and products that turn complex ideas into working software.
            </motion.p>

            {/* CTAs & Availability Card Cluster (Exact Reference Match) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => handleScrollTo("projects")}
                data-cursor="VIEW"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#0c0c0e] text-white hover:bg-[#ff4d00] font-mono text-xs font-semibold tracking-wider rounded-full transition-all duration-200 shadow-sm uppercase"
              >
                <span>VIEW SELECTED WORK</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleScrollTo("contact")}
                data-cursor="TALK"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-black/[0.04] text-[#121215] border border-[#e6e4df] hover:border-[#121215]/40 font-mono text-xs font-medium tracking-wider rounded-full transition-all duration-200 shadow-sm uppercase"
              >
                <span>LET&apos;S TALK</span>
                <ArrowUpRight size={13} className="text-[#ff4d00]" />
              </button>

              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-[#e6e4df] shadow-sm font-mono text-[10px] tracking-wider uppercase text-[#121215] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>AVAILABLE FOR OPPORTUNITIES</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Architectural Hero Visual (5 Cols ~ 42%) */}
          <div className="lg:col-span-5 relative">
            <ArchitecturalHeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
