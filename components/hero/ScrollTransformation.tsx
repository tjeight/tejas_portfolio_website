"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { GitBranch, Cpu, Database, Bot, Box } from "lucide-react";

const STAGES = [
  { id: "core", label: "01 // CORE ECOSYSTEM", icon: Cpu, desc: "Developer Core", anchor: "#hero" },
  { id: "arch", label: "02 // STACK UNIVERSE", icon: GitBranch, desc: "Spatial Domain Graph", anchor: "#stack" },
  { id: "systems", label: "03 // BACKEND ARCHITECTURE", icon: Database, desc: "Distributed Engine", anchor: "#architecture" },
  { id: "ai", label: "04 // AGENT WORKFLOW", icon: Bot, desc: "Autonomous Cyclical AI", anchor: "#ai" },
  { id: "projects", label: "05 // PRODUCTION SYSTEMS", icon: Box, desc: "Deployed Systems", anchor: "#projects" },
];

export default function ScrollTransformation() {
  const scrollProgress = useScrollProgress();

  // Determine active stage based on scroll percentage
  const activeIndex = Math.min(
    Math.floor(scrollProgress * STAGES.length),
    STAGES.length - 1
  );

  return (
    <div className="w-full py-6 border-y border-white/[0.08] bg-slate-950/70 backdrop-blur-md relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-bold tracking-wider">SYSTEM EVOLUTION METAMORPHOSIS:</span>
            <span className="text-slate-400">
              {STAGES[activeIndex].label} — {STAGES[activeIndex].desc}
            </span>
          </div>

          {/* Stepper nodes */}
          <div className="flex items-center gap-1 sm:gap-2">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              const isPassed = i <= activeIndex;
              const isCurrent = i === activeIndex;

              return (
                <a
                  key={stage.id}
                  href={stage.anchor}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-all duration-200 ${
                    isCurrent
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.3)] font-bold"
                      : isPassed
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-600 hover:text-slate-400"
                  }`}
                  data-cursor="METAMORPHOSIS"
                >
                  <Icon className={`w-3.5 h-3.5 ${isCurrent ? "text-cyan-400 animate-pulse" : ""}`} />
                  <span className="hidden xl:inline">{stage.desc}</span>
                  {i < STAGES.length - 1 && (
                    <span className="text-slate-600 mx-1 hidden sm:inline">→</span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Continuous progress track line */}
        <div className="mt-3 w-full h-[2px] bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500"
            style={{ width: `${Math.max(scrollProgress * 100, 3)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
