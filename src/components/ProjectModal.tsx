"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/portfolio";
import { X, ExternalLink, CheckCircle2, Terminal, Layers, ArrowRight, Copy, Check } from "lucide-react";
import { GithubIcon } from "./Icons";
import { playActionPing, playSubtleClick } from "@/components/SoundEffects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "code" | "decisions">("overview");
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopiedCode(true);
    playActionPing();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSubtleClick();
            onClose();
          }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0c11] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#09090d]">
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: project.visualTheme.accentHex }}
              />
              <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                CASE STUDY // {project.category}
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] text-white/30 border border-white/10 px-2 py-0.5 rounded">
                {project.year}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSubtleClick()}
                className="p-1.5 text-white/50 hover:text-white border border-white/10 rounded transition-colors"
                title="View Source on GitHub"
              >
                <GithubIcon size={16} />
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSubtleClick()}
                  className="p-1.5 text-white/50 hover:text-white border border-white/10 rounded transition-colors"
                  title="View Live / Repository"
                >
                  <ExternalLink size={16} />
                </a>
              )}

              <button
                onClick={() => {
                  playSubtleClick();
                  onClose();
                }}
                className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors ml-2"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-white/10 px-6 bg-[#0c0c11] font-mono text-xs overflow-x-auto">
            <button
              onClick={() => {
                playSubtleClick();
                setActiveTab("overview");
              }}
              className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === "overview"
                  ? "border-[#ff4800] text-white"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              01. Executive Overview
            </button>
            <button
              onClick={() => {
                playSubtleClick();
                setActiveTab("architecture");
              }}
              className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === "architecture"
                  ? "border-[#ff4800] text-white"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              02. System Architecture
            </button>
            <button
              onClick={() => {
                playSubtleClick();
                setActiveTab("code");
              }}
              className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === "code"
                  ? "border-[#ff4800] text-white"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              03. Implementation Code
            </button>
            <button
              onClick={() => {
                playSubtleClick();
                setActiveTab("decisions");
              }}
              className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === "decisions"
                  ? "border-[#ff4800] text-white"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              04. Technical Trade-offs
            </button>
          </div>

          {/* Content Scroll Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {/* Header Title & Tagline */}
            <div>
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                {project.title}
              </div>
              <p className="text-lg text-white/70 font-light leading-relaxed">
                {project.tagline}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* TAB: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Problem */}
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-red-500/20 space-y-2">
                    <div className="font-mono text-xs text-red-400 font-semibold tracking-wider uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      The Engineering Problem
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      {project.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-emerald-500/20 space-y-2">
                    <div className="font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      The Technical Solution
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Impact Statement */}
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="font-mono text-xs text-[#ff4800] font-semibold tracking-wider uppercase">
                    Production Impact &amp; Reliability
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed font-normal">
                    {project.impact}
                  </p>
                </div>

                {/* Key Highlights */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-3">
                    Key Implementation Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-white/70"
                      >
                        <CheckCircle2 size={15} className="text-[#ff4800] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ARCHITECTURE */}
            {activeTab === "architecture" && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-3">
                    Pipeline Architecture Steps
                  </h4>
                  <div className="space-y-3">
                    {project.architecture.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10"
                      >
                        <span className="font-mono text-xs font-bold text-[#ff4800] px-2 py-1 rounded bg-[#ff4800]/10 border border-[#ff4800]/30 shrink-0">
                          STAGE 0{idx + 1}
                        </span>
                        <div className="text-sm text-white/85 leading-relaxed font-light">
                          {step}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-black/50 border border-white/10 space-y-3 font-mono text-xs">
                  <div className="text-white/40 flex items-center gap-2">
                    <Layers size={14} className="text-[#ff4800]" />
                    <span>SYSTEM TOPOLOGY &amp; PERSISTENCE STRATEGY</span>
                  </div>
                  <p className="text-white/70 leading-relaxed font-sans text-sm">
                    State transitions are executed in atomic transactions. In the event of process restarts or transient network partitions, workers hydrate execution state from the PostgreSQL checkpointer using the task ID, re-acquiring the distributed Redis lock with zero side-effects.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: CODE */}
            {activeTab === "code" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs text-white/60 flex items-center gap-2">
                    <Terminal size={14} className="text-[#ff4800]" />
                    <span>{project.codeSnippet.filename}</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-white/80 transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/15 bg-black">
                  <div className="px-4 py-2 bg-[#121218] border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>Language: {project.codeSnippet.language.toUpperCase()}</span>
                    <span>UTF-8 // Production Code</span>
                  </div>
                  <pre className="p-5 overflow-x-auto font-mono text-xs leading-relaxed text-emerald-400/90 selection:bg-white/20">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* TAB: DECISIONS / TRADE-OFFS */}
            {activeTab === "decisions" && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
                    Architectural Rationale
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Why deterministic state checkpoints matter over fire-and-forget queues
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed font-light">
                    When orchestrating LLM agents with multi-turn tool calling, failures occur non-deterministically (rate limits, upstream schema drifts, timeouts). Simple message queues (like RabbitMQ) require re-running the entire prompt chain from scratch, wasting tokens and losing intermediate reasoning. By persisting atomic graph checkpoints, we resume exactly from the interrupted node.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
                    Distributed Concurrency Control
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Sliding window rate limiting with Redis Sorted Sets
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed font-light">
                    Standard fixed-window rate limiters permit double the burst limit at window boundaries. Using Redis Sorted Sets (`ZADD` with millisecond timestamps and `ZREMRANGEBYSCORE`), we maintain an exact, rolling sliding window per IP without race conditions, executed in a single atomic Redis pipeline.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#09090d] text-xs font-mono">
            <div className="text-white/40">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70 text-[10px]">ESC</kbd> to close
            </div>
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSubtleClick()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-white text-black font-semibold hover:bg-[#ff4800] hover:text-white transition-all duration-200"
              >
                <span>View on GitHub</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
