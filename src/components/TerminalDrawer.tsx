"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";
import { playActionPing, playSubtleClick } from "@/components/SoundEffects";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<Array<{ text: string; type: "cmd" | "res" | "err" }>>([
    { text: "TEJAS JAGDALE // SYSTEM TELEMETRY SHELL v2.4", type: "res" },
    { text: "Type 'help' for available diagnostic commands. Press ESC to close.", type: "res" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playActionPing();
    const newHistory = [...history, { text: `$ ${inputVal}`, type: "cmd" as const }];

    switch (cmd) {
      case "help":
        newHistory.push(
          { text: "Available commands:", type: "res" },
          { text: "  stack         - List primary backend & AI technologies", type: "res" },
          { text: "  projects      - List selected production case studies", type: "res" },
          { text: "  status        - View system health & availability", type: "res" },
          { text: "  contact       - Get direct contact channels", type: "res" },
          { text: "  benchmarks    - View p99 latencies and microservice metrics", type: "res" },
          { text: "  clear         - Clear terminal screen", type: "res" },
          { text: "  exit          - Close this telemetry terminal", type: "res" }
        );
        break;
      case "stack":
        newHistory.push(
          { text: "CORE TECH STACK:", type: "res" },
          { text: "  Backend:    Python 3.12, FastAPI, SQLAlchemy, Django", type: "res" },
          { text: "  AI/Agents:  LangGraph, LangChain, Anthropic & OpenAI APIs", type: "res" },
          { text: "  Databases:  PostgreSQL, Redis, Supabase, pgvector", type: "res" },
          { text: "  DevOps:     Docker, AWS, Nginx, CI/CD Actions", type: "res" }
        );
        break;
      case "projects":
        newHistory.push(
          { text: "SELECTED PRODUCTION PROJECTS:", type: "res" },
          { text: "  01. InfraMind                 [AI Backend Orchestration / LangGraph]", type: "res" },
          { text: "  02. RedNet                    [Blood Bank SaaS / Next.js / Supabase]", type: "res" },
          { text: "  03. AI Market Analytics Agent [Autonomous Research Agent DAG]", type: "res" },
          { text: "  04. AuthX                     [High-Throughput RS256 Auth Microservice]", type: "res" }
        );
        break;
      case "status":
        newHistory.push(
          { text: "ENGINEERING RUNTIME STATUS:", type: "res" },
          { text: "  Location:      Pune, India (UTC+5:30)", type: "res" },
          { text: "  Availability:  OPEN for select Backend & AI engineering roles", type: "res" },
          { text: "  Current Focus: Distributed backend architectures & LangGraph state machines", type: "res" }
        );
        break;
      case "benchmarks":
        newHistory.push(
          { text: "SYSTEM TELEMETRY BENCHMARKS:", type: "res" },
          { text: "  FastAPI p95 Latency:        < 18ms", type: "res" },
          { text: "  Redis Cache Lookup:         sub-2ms O(1)", type: "res" },
          { text: "  AuthX Microservice:         2,400+ auth req/s", type: "res" },
          { text: "  State Checkpoint Replay:    0 data loss guaranteed", type: "res" }
        );
        break;
      case "contact":
        newHistory.push(
          { text: "DIRECT CHANNELS:", type: "res" },
          { text: "  Email:     tejasjagdale.dev@gmail.com", type: "res" },
          { text: "  GitHub:    github.com/tejas-jagdale", type: "res" },
          { text: "  LinkedIn:  linkedin.com/in/tejas-jagdale", type: "res" }
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      case "exit":
        onClose();
        return;
      default:
        newHistory.push({
          text: `Command not recognized: '${cmd}'. Type 'help' for diagnostics.`,
          type: "err"
        });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSubtleClick();
            onClose();
          }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-[#09090c] border border-white/20 rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col h-[500px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111116] border-b border-white/10 font-mono text-xs text-white/70">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-[#ff4800]" />
              <span>tejas@system-telemetry: ~ (interactive shell)</span>
            </div>
            <button
              onClick={() => {
                playSubtleClick();
                onClose();
              }}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Console Log Area */}
          <div
            ref={scrollRef}
            className="flex-1 p-5 font-mono text-xs overflow-y-auto space-y-2 selection:bg-white/20"
          >
            {history.map((line, i) => (
              <div
                key={i}
                className={`${
                  line.type === "cmd"
                    ? "text-[#ff4800] font-bold"
                    : line.type === "err"
                    ? "text-red-400"
                    : "text-white/75"
                } leading-relaxed`}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Input Prompt */}
          <form
            onSubmit={handleCommand}
            className="flex items-center gap-2 px-4 py-3 bg-[#0d0d12] border-t border-white/10 font-mono text-xs"
          >
            <span className="text-[#ff4800]">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help', 'stack', 'benchmarks', 'clear'..."
              className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none"
            />
            <span className="text-white/30 text-[10px]">ENTER ↵</span>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
