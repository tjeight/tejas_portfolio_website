"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Terminal, AlertCircle, CheckCircle, Cpu, GitFork, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Project } from "@/types/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-slate-950/80 backdrop-blur-xl overflow-y-auto">
        {/* Backdrop click */}
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/40 bg-slate-950 shadow-[0_0_50px_rgba(0,240,255,0.2)] p-6 sm:p-10 text-white"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-white/10 text-slate-400 font-mono text-xs">
                  {project.status}
                </span>
              </div>
              <h2 className="font-mono font-black text-2xl sm:text-4xl text-white tracking-tight">
                {project.name}
              </h2>
              <p className="text-cyan-300 font-mono text-sm sm:text-base mt-1">
                {project.tagline}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-8 font-sans">
            {/* Overview / Description */}
            <div>
              <h3 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                SYSTEM OVERVIEW
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/20">
                <h4 className="font-mono text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  THE PROBLEM
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                <h4 className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  THE ENGINEERING SOLUTION
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Architecture Pipeline if available */}
            {project.architectureNodes && project.architectureNodes.length > 0 && (
              <div className="p-5 rounded-xl bg-slate-900/60 border border-cyan-500/20">
                <h4 className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <GitFork className="w-4 h-4" />
                  SYSTEM ARCHITECTURE PIPELINE
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.architectureNodes.map((n, i) => (
                    <div
                      key={n.id}
                      className="p-3 rounded-lg bg-slate-950 border border-white/[0.08]"
                    >
                      <span className="font-mono text-[10px] text-cyan-400 block mb-1">
                        STEP 0{i + 1}
                      </span>
                      <span className="font-mono text-xs font-bold text-white block">
                        {n.label}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        {n.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Implementation Decisions */}
            {project.implementation && project.implementation.length > 0 && (
              <div>
                <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-violet-400" />
                  CORE IMPLEMENTATION DECISIONS
                </h4>
                <ul className="space-y-2">
                  {project.implementation.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="text-cyan-400 font-mono font-bold">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Real Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div>
                <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  TECHNICAL CHALLENGES OVERCOME
                </h4>
                <ul className="space-y-2">
                  {project.challenges.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="text-amber-400 font-mono font-bold">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Documented Results / Metrics */}
            {project.results && project.results.length > 0 && (
              <div className="p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                <h4 className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest mb-3">
                  DOCUMENTED PERFORMANCE & RESULTS
                </h4>
                <ul className="space-y-2">
                  {project.results.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-200">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="pt-4 border-t border-white/10">
              <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                TECHNOLOGY STACK:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded bg-slate-900 border border-white/10 text-xs font-mono text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
              {project.github && (
                <MagneticButton
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </MagneticButton>
              )}

              {project.live && (
                <MagneticButton
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo / Documentation</span>
                </MagneticButton>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
