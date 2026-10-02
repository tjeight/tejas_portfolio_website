"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCw, Bot, Terminal } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { AIWorkflowData } from "@/types/portfolio";

interface AgentWorkflowProps {
  workflowData: AIWorkflowData;
}

export default function AgentWorkflow({ workflowData }: AgentWorkflowProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Auto-step through the cyclic agent execution graph
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % workflowData.steps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, workflowData.steps.length]);

  const currentStep = workflowData.steps[activeStepIndex];

  return (
    <section id="ai" className="py-24 relative overflow-hidden bg-slate-950 cyber-grid-dense">
      {/* Background violet/cyan glows */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={workflowData.sectionTag}
          title={workflowData.heading}
          subtitle={workflowData.subheading}
        />

        {/* Section Intro Philosophy Box */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-violet-500/30 backdrop-blur-md mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Bot className="w-6 h-6 text-violet-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-mono font-bold text-sm text-violet-300 uppercase tracking-wider">
                  DETERMINISTIC AGENTIC STATE ENGINE
                </h4>
                <p className="text-sm text-slate-300 font-sans mt-1 max-w-3xl leading-relaxed">
                  {workflowData.description}
                </p>
              </div>
            </div>

            {/* Play/Pause Simulator Control */}
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-violet-500/40 text-violet-300 hover:text-white font-mono text-xs transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "PAUSE PIPELINE" : "RUN PIPELINE"}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveStepIndex(0)}
                className="p-1.5 rounded-lg bg-slate-950 border border-white/10 text-slate-400 hover:text-white transition-colors"
                title="Reset simulation to step 1"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Pipeline Graph Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
          {workflowData.steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setActiveStepIndex(idx);
                  setIsPlaying(false);
                }}
                className={`relative p-3.5 rounded-xl text-left transition-all duration-300 ${
                  isActive
                    ? "bg-violet-950/70 border-2 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.35)] scale-105 z-10"
                    : isCompleted
                    ? "bg-slate-900/80 border border-violet-500/30 text-slate-300 hover:border-violet-400"
                    : "bg-slate-950/50 border border-white/[0.08] text-slate-400 hover:text-slate-200"
                }`}
                data-cursor="STEP"
              >
                {/* Active pulse dot */}
                {isActive && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] text-violet-400 font-bold">
                    {step.index}
                  </span>
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.2 rounded uppercase ${
                      isActive
                        ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                        : "bg-slate-950 text-slate-500"
                    }`}
                  >
                    {step.state}
                  </span>
                </div>

                <div className="font-mono font-bold text-xs text-white tracking-wider block truncate">
                  {step.label}
                </div>

                <span className="text-[10px] text-slate-400 block mt-1 truncate">
                  {step.role}
                </span>

                {/* Arrow to next item */}
                {idx < workflowData.steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <span className="text-violet-500 text-[10px]">›</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed High-Level State Inspector Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard
              glow="violet"
              className="p-6 sm:p-8 bg-slate-900/80 border-violet-500/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-950/80 border border-violet-500/50 flex items-center justify-center font-mono font-bold text-violet-300">
                    {currentStep.index}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-violet-400 tracking-widest uppercase block">
                      ACTIVE EXECUTION STATE: {currentStep.state}
                    </span>
                    <h3 className="font-mono font-black text-xl sm:text-2xl text-white tracking-tight">
                      {currentStep.title} — {currentStep.role}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-slate-950 border border-white/10 font-mono text-xs text-slate-400">
                    HIGH-LEVEL STATE
                  </span>
                  <span className="px-2.5 py-1 rounded bg-violet-950 text-violet-300 border border-violet-500/40 font-mono text-xs">
                    VERIFIED LOOP
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    NODE RESPONSIBILITY:
                  </h4>
                  <p className="text-slate-200 font-sans leading-relaxed">
                    {currentStep.desc}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 border border-white/[0.08]">
                  <h4 className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    EXECUTION MECHANISM:
                  </h4>
                  <p className="text-slate-300 font-mono text-xs leading-relaxed">
                    {currentStep.details}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
