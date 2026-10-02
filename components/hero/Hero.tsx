"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Mail, Terminal, Activity, Layers } from "lucide-react";
import CanvasContainer from "@/components/3d/CanvasContainer";
import DeveloperCore from "@/components/3d/DeveloperCore";
import MagneticButton from "@/components/ui/MagneticButton";
import { HeroData, Personal, CoreTechNode } from "@/types/portfolio";

interface HeroProps {
  heroData: HeroData;
  personal: Personal;
}

export default function Hero({ heroData, personal }: HeroProps) {
  const [hoveredNode, setHoveredNode] = useState<CoreTechNode | null>(null);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden cyber-grid"
    >
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-6 z-10">
            {/* Small Label / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono text-xs tracking-wider uppercase mb-6 backdrop-blur-md"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>{heroData.badge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </motion.div>

            {/* Large Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase font-mono tracking-tight text-white leading-[1.08]"
            >
              <span className="block text-white">I BUILD</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent glow-cyan">
                INTELLIGENT
              </span>
              <span className="block text-white">BACKEND SYSTEMS.</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 font-sans leading-relaxed max-w-xl"
            >
              <span className="text-cyan-300 font-medium">Fast APIs.</span>{" "}
              <span className="text-violet-300 font-medium">AI agents.</span>{" "}
              <span className="text-sky-300 font-medium">Scalable infrastructure.</span>{" "}
              <span className="text-white font-medium">Production systems.</span>
            </motion.p>

            {/* System Status Metrics HUD strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 px-4 rounded-lg bg-slate-950/60 border border-white/[0.08] backdrop-blur-sm max-w-xl"
            >
              {personal.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-slate-400 text-[10px] font-mono uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span className="text-cyan-400 font-mono font-bold text-sm sm:text-base">
                    {stat.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <MagneticButton
                href="#projects"
                variant="primary"
                size="md"
                dataCursor="PROJECTS"
              >
                <span>{heroData.ctaProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                variant="secondary"
                size="md"
                dataCursor="CONTACT"
              >
                <Mail className="w-4 h-4" />
                <span>{heroData.ctaContact}</span>
              </MagneticButton>

              <MagneticButton
                href={personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="md"
                dataCursor="RESUME"
              >
                <Download className="w-4 h-4" />
                <span>{heroData.ctaResume}</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: 3D Developer Core */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            {/* 3D Canvas Box */}
            <div className="w-full h-[400px] sm:h-[480px] lg:h-[580px] relative rounded-2xl overflow-hidden border border-cyan-500/10 bg-slate-950/40 backdrop-blur-sm">
              {/* Corner HUD markers */}
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-[10px] text-cyan-400/80 tracking-widest uppercase">
                  SYSTEM CORE // 3D RUNTIME
                </span>
              </div>

              <div className="absolute top-3 right-3 z-10 pointer-events-none">
                <span className="font-mono text-[10px] text-slate-500 tracking-wider">
                  MOUSE INTERACTIVE
                </span>
              </div>

              <CanvasContainer camera={{ position: [0, 0, 5], fov: 48 }}>
                <DeveloperCore
                  nodes={heroData.coreTechNodes}
                  onHoverNode={setHoveredNode}
                  hoveredNodeName={hoveredNode?.name}
                />
              </CanvasContainer>

              {/* Dynamic HUD Node Card overlay when hovering 3D node */}
              <AnimatePresence>
                {hoveredNode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-lg bg-slate-950/90 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.25)] backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: hoveredNode.color }}
                        />
                        <span className="font-mono font-bold text-sm tracking-wider text-white">
                          {hoveredNode.name.toUpperCase()}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-300 border border-cyan-500/30">
                        {hoveredNode.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {hoveredNode.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom mini guide below 3D */}
            <div className="w-full mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 px-2">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>10 ORBITING NODES</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-violet-400" />
                <span>ACTIVE MESH PROTOCOL</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
