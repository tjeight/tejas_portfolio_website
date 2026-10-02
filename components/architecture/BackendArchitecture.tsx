"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { BackendArchitectureData, BackendComponent } from "@/types/portfolio";

interface BackendArchitectureProps {
  architectureData: BackendArchitectureData;
}

export default function BackendArchitecture({
  architectureData,
}: BackendArchitectureProps) {
  const [selectedCompId, setSelectedCompId] = useState<string>("fastapi");

  const selectedComponent: BackendComponent =
    architectureData.components.find((c) => c.id === selectedCompId) ||
    architectureData.components[2];

  return (
    <section id="architecture" className="py-24 relative overflow-hidden bg-slate-950/90">
      {/* Background cyber radial glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={architectureData.sectionTag}
          title={architectureData.heading}
          subtitle={architectureData.subheading}
        />

        {/* System Flow Diagram */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-cyan-500/30 backdrop-blur-md mb-10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              INTERACTIVE DISTRIBUTED REQUEST CONDUIT
            </span>
            <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
              SELECT ANY NODE TO INSPECT SUBSYSTEM
            </span>
          </div>

          {/* 8-Node Flow Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 relative">
            {architectureData.components.map((comp, idx) => {
              const isSelected = comp.id === selectedCompId;

              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`relative p-3 rounded-xl text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] scale-105 z-10"
                      : "bg-slate-950/60 border border-white/[0.08] hover:border-cyan-500/40 text-slate-400 hover:text-white"
                  }`}
                  data-cursor="INSPECT"
                >
                  {/* Step counter */}
                  <span className="font-mono text-[9px] text-cyan-400/80 block mb-1">
                    LAYER 0{idx + 1}
                  </span>

                  <span className="font-mono font-bold text-xs text-white block truncate">
                    {comp.name.split(" ")[0]}
                  </span>

                  <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                    {comp.tech.split(",")[0]}
                  </span>

                  {/* Connecting conduit arrow */}
                  {idx < architectureData.components.length - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-cyan-500 text-xs font-mono">
                      →
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Animated data packet line simulation */}
          <div className="mt-8 relative h-3 bg-slate-950 rounded-full overflow-hidden border border-white/[0.08] flex items-center px-2">
            <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-500 px-1 pointer-events-none">
              <span>CLIENT REQUEST</span>
              <span>TLS / NGINX</span>
              <span>FASTAPI ASYNC</span>
              <span>CACHE / DB</span>
              <span>CELERY WORKERS</span>
              <span>AWS CLOUD</span>
            </div>
            {/* Travelling pulse */}
            <motion.div
              className="absolute h-1.5 w-12 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]"
              animate={{
                left: ["0%", "95%"],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </div>

        {/* Selected Component Deep Dive Spec */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedComponent.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard glow="cyan" className="p-6 sm:p-8 bg-slate-900/80 border-cyan-400/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] uppercase border border-cyan-500/30">
                      SUBSYSTEM SPEC
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {selectedComponent.subtitle}
                    </span>
                  </div>
                  <h3 className="font-mono font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {selectedComponent.name}
                  </h3>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 font-mono text-xs text-cyan-300">
                  {selectedComponent.tech}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    ARCHITECTURAL ROLE & OPERATION:
                  </h4>
                  <p className="text-slate-200 text-sm sm:text-base font-sans leading-relaxed">
                    {selectedComponent.description}
                  </p>
                </div>

                <div className="lg:col-span-5 p-5 rounded-xl bg-slate-950 border border-white/[0.08]">
                  <h4 className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    KEY RESPONSIBILITIES:
                  </h4>
                  <ul className="space-y-2">
                    {selectedComponent.responsibilities.map((resp, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400 font-mono">›</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
