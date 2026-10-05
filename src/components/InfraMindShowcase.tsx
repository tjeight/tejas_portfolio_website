"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Circle, Clock, Activity } from "lucide-react";
import { GithubIcon } from "./Icons";
import { playSubtleClick } from "@/components/SoundEffects";

interface InfraMindShowcaseProps {
  onOpenModal?: () => void;
  standalone?: boolean;
}

export function InfraMindShowcase({ onOpenModal, standalone = false }: InfraMindShowcaseProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleOpen = () => {
    playSubtleClick();
    if (onOpenModal) onOpenModal();
  };

  return (
    <div className="w-full relative rounded-2xl bg-[#0c0c0e] border border-white/10 overflow-hidden shadow-2xl text-white select-none">
      {/* Engineering Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="inframind-arch-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" />
              <circle cx="32" cy="32" r="0.6" fill="#ffffff" fillOpacity="0.12" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#inframind-arch-grid)" />
        </svg>
      </div>

      {/* Top Subtle Window Status Strip */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-6 py-3 border-b border-white/[0.08] bg-[#09090b]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
            inframind // stateful.orchestration.v2
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[10px] text-white/50">
          <span className="hidden sm:inline-block text-white/30">CLUSTER: us-east-1a</span>
          <span className="hidden sm:inline-block">LATENCY: 184ms</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PIPELINE HEALTHY</span>
          </div>
        </div>
      </div>

      {/* 16:9 Editorial Showcase Body */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[620px]">
        {/* ========================================================
            LEFT SIDE: Editorial Typography, Technical Copy, Logs
            ======================================================== */}
        <div className="lg:col-span-4 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#0c0c10]/60 backdrop-blur-sm">
          <div>
            {/* Small Orange Monospace Label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
              <span className="font-mono text-[11px] text-[#ff4d00] font-semibold tracking-widest uppercase">
                01 / AI ORCHESTRATION
              </span>
            </div>

            {/* Large Typography: INFRAMIND */}
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[0.95]">
              INFRAMIND
            </h3>

            {/* Italic Serif Subtitle */}
            <p className="font-serif-italic text-xl sm:text-2xl text-white/85 font-normal mt-2 tracking-normal">
              AI workflow orchestrator<span className="text-[#ff4d00] font-sans font-bold">.</span>
            </p>

            {/* Short Technical Description */}
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mt-5 max-w-sm">
              Stateful execution infrastructure for coordinating AI agents, tools and long-running workflows.
            </p>

            {/* Small Technology Labels */}
            <div className="font-mono text-[11px] text-white/50 tracking-wide mt-6 pt-4 border-t border-white/[0.08]">
              FastAPI · PostgreSQL · Redis · LangGraph · Docker · AWS
            </div>
          </div>

          {/* Authentic Real-Time Log Snippet */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-4">
            <div className="p-3.5 rounded-xl bg-[#08080a] border border-white/[0.08] font-mono text-[11px] space-y-1.5 shadow-inner">
              <div className="flex items-center justify-between text-white/40 text-[9px] uppercase tracking-wider pb-1 border-b border-white/[0.06]">
                <span>ORCHESTRATOR TELEMETRY</span>
                <span className="text-[#ff4d00]">LIVE</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-white/40">WORKFLOW_ID</span>
                <span className="text-white font-semibold">wf_8a21</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">STATE</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CHECKPOINTED
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">AGENTS</span>
                <span className="text-white">04 ACTIVE (1 EXEC)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">LATENCY</span>
                <span className="text-white/80">184ms</span>
              </div>
              <div className="flex justify-between text-[10px] text-white/40 pt-1 border-t border-white/[0.04]">
                <span>CHECKPOINT</span>
                <span className="text-white/60">chk_4812 · 14:02:18.420</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleOpen}
                data-cursor="VIEW"
                className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#ff4d00] hover:text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>

              <a
                href="https://github.com/tejas-jagdale"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSubtleClick()}
                data-cursor="GITHUB"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 hover:border-white/40 text-white/70 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <GithubIcon size={14} />
                <span>CODE</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT SIDE: Impressive Living System-Flow Diagram (65%)
            ======================================================== */}
        <div className="lg:col-span-8 p-4 sm:p-6 lg:p-8 flex flex-col justify-between relative bg-radial from-[#121218] via-[#0c0c0e] to-[#0a0a0d]">
          {/* Subtle Top Indicator for Diagram */}
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
              <span>DISTRIBUTED EXECUTION GRAPH</span>
            </div>
            <div className="font-mono text-[10px] text-white/30 tracking-wider">
              ENDPOINT: /api/v1/workflows/run
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative w-full aspect-[620/410] max-h-[460px]">
            <svg viewBox="0 0 620 410" className="w-full h-full overflow-visible">
              <defs>
                {/* Thin Glowing Orange Filter */}
                <filter id="infra-orange-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Subdued Marker Chevron */}
                <marker
                  id="arrow-down"
                  viewBox="0 0 6 6"
                  refX="3"
                  refY="3"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 6 3 L 0 6 z" fill="#ffffff" fillOpacity="0.3" />
                </marker>

                <marker
                  id="arrow-orange"
                  viewBox="0 0 6 6"
                  refX="3"
                  refY="3"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 6 3 L 0 6 z" fill="#ff4d00" />
                </marker>
              </defs>

              {/* ---------------- CONNECTING CIRCUIT BUS LINES ---------------- */}

              {/* 1. Client to API Gateway */}
              <line
                x1="310"
                y1="38"
                x2="310"
                y2="70"
                stroke="#ff4d00"
                strokeWidth="1.2"
                strokeDasharray="3,3"
                filter="url(#infra-orange-glow)"
              />

              {/* 2. API Gateway to Orchestrator */}
              <line
                x1="310"
                y1="102"
                x2="310"
                y2="136"
                stroke="#ff4d00"
                strokeWidth="1.5"
                filter="url(#infra-orange-glow)"
              />

              {/* 3. Orchestrator <-> PostgreSQL (Persistent State) */}
              <path
                d="M 215 155 L 140 155 L 140 125"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.25"
                strokeWidth="1"
              />

              {/* 4. Orchestrator <-> Redis (Cache / Task Queue) */}
              <path
                d="M 215 168 L 140 168 L 140 195"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.25"
                strokeWidth="1"
              />

              {/* 5. Orchestrator <-> Checkpoint Store (Active Recovery Path) */}
              <path
                d="M 405 155 L 480 155 L 480 125"
                fill="none"
                stroke="#ff4d00"
                strokeWidth="1.25"
                filter="url(#infra-orange-glow)"
              />

              {/* 6. Orchestrator <-> External Tools / APIs */}
              <path
                d="M 405 168 L 480 168 L 480 195"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.25"
                strokeWidth="1"
              />

              {/* 7. Orchestrator down to Agent Horizontal Bus */}
              <line
                x1="310"
                y1="184"
                x2="310"
                y2="216"
                stroke="#ffffff"
                strokeOpacity="0.3"
                strokeWidth="1"
              />

              {/* Agent Distribution Bus (Horizontal) */}
              <path
                d="M 95 216 L 525 216"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.25"
                strokeWidth="1"
              />

              {/* 8. Agent Drop Lines */}
              {/* Agent 1: Research Agent */}
              <line x1="95" y1="216" x2="95" y2="242" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
              {/* Agent 2: Analysis Agent */}
              <line x1="238" y1="216" x2="238" y2="242" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
              {/* Agent 3: Execution Agent (ACTIVE ORANGE PATH) */}
              <line x1="382" y1="216" x2="382" y2="242" stroke="#ff4d00" strokeWidth="1.5" filter="url(#infra-orange-glow)" />
              {/* Agent 4: Validation Agent */}
              <line x1="525" y1="216" x2="525" y2="242" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2,2" />

              {/* Animated Glowing Orange Pulse on Active Path */}
              <circle r="3" fill="#ff4d00" filter="url(#infra-orange-glow)">
                <animateMotion
                  path="M 310 20 L 310 86 L 310 160 L 405 155 L 480 155 L 480 125"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="#ff4d00" filter="url(#infra-orange-glow)">
                <animateMotion
                  path="M 310 184 L 310 216 L 382 216 L 382 250 L 382 320"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* ---------------- ARCHITECTURE NODES ---------------- */}

              {/* 1. CLIENT NODE */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("client")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x="235"
                  y="12"
                  width="150"
                  height="26"
                  rx="5"
                  fill="#14141c"
                  stroke="#ffffff"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                />
                <circle cx="247" cy="25" r="3.5" fill="#ffffff" fillOpacity="0.7" />
                <text x="258" y="26" dominantBaseline="central" className="font-mono text-[10px] font-bold fill-white">
                  CLIENT
                </text>
                <text x="320" y="26" dominantBaseline="central" className="font-mono text-[8px] fill-white/40">
                  req_9c104
                </text>
              </g>

              {/* Label beside request line: POST /workflows/run */}
              <text x="318" y="56" className="font-mono text-[8px] fill-[#ff4d00] font-semibold">
                POST /workflows/run
              </text>

              {/* 2. API GATEWAY NODE */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("gateway")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x="220"
                  y="70"
                  width="180"
                  height="32"
                  rx="6"
                  fill="#12121a"
                  stroke="#ffffff"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                />
                <circle cx="236" cy="86" r="3.5" fill="#ff4d00" />
                <text x="248" y="81" className="font-mono text-[10px] font-bold fill-white">
                  API GATEWAY
                </text>
                <text x="248" y="93" className="font-mono text-[8px] fill-white/40">
                  FastAPI · Non-blocking Ingress
                </text>
                <rect x="345" y="78" width="45" height="15" rx="3" fill="#ffffff" fillOpacity="0.06" />
                <text x="367" y="89" dominantBaseline="central" textAnchor="middle" className="font-mono text-[8px] fill-emerald-400 font-semibold">
                  200 OK
                </text>
              </g>

              {/* 3. CENTRAL HUB: INFRAMIND CORE / ORCHESTRATOR */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("orchestrator")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x="200"
                  y="136"
                  width="220"
                  height="48"
                  rx="8"
                  fill="#161622"
                  stroke="#ff4d00"
                  strokeWidth="1.2"
                  className="shadow-xl"
                  filter="url(#infra-orange-glow)"
                />
                <circle cx="218" cy="154" r="5" fill="#ff4d00" className="animate-pulse" />
                <text x="232" y="152" className="font-mono text-[11px] font-black fill-white tracking-wider">
                  INFRAMIND CORE
                </text>
                <text x="232" y="167" className="font-mono text-[8.5px] fill-white/60">
                  LangGraph Orchestrator · State Machine
                </text>
                {/* State Indicator Pill: RUNNING */}
                <rect x="352" y="148" width="56" height="18" rx="4" fill="#ff4d00" fillOpacity="0.18" stroke="#ff4d00" strokeWidth="0.8" />
                <text x="380" y="160" dominantBaseline="central" textAnchor="middle" className="font-mono text-[8.5px] font-bold fill-[#ff4d00] tracking-wider">
                  RUNNING
                </text>
              </g>

              {/* 4. POSTGRESQL (Persistent State) - Left Side */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("postgres")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x="70"
                  y="102"
                  width="140"
                  height="34"
                  rx="5"
                  fill="#0e0e14"
                  stroke="#ffffff"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />
                <text x="80" y="117" className="font-mono text-[9.5px] font-bold fill-white">
                  POSTGRESQL
                </text>
                <text x="80" y="128" className="font-mono text-[7.5px] fill-white/45">
                  Persistent State · WAL
                </text>
                <circle cx="196" cy="119" r="2.5" fill="#34d399" />
              </g>

              {/* 5. REDIS (Cache / Queue) - Left Side */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("redis")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x="70"
                  y="180"
                  width="140"
                  height="34"
                  rx="5"
                  fill="#0e0e14"
                  stroke="#ffffff"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />
                <text x="80" y="195" className="font-mono text-[9.5px] font-bold fill-white">
                  REDIS
                </text>
                <text x="80" y="206" className="font-mono text-[7.5px] fill-white/45">
                  Cache / Queue · Locks
                </text>
                <circle cx="196" cy="197" r="2.5" fill="#38bdf8" />
              </g>

              {/* 6. CHECKPOINT STORE (Workflow Recovery) - Right Side */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("checkpoint")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x="410"
                  y="102"
                  width="145"
                  height="34"
                  rx="5"
                  fill="#0e0e14"
                  stroke="#ff4d00"
                  strokeOpacity="0.4"
                  strokeWidth="1"
                />
                <text x="420" y="116" className="font-mono text-[9.5px] font-bold fill-white">
                  CHECKPOINT STORE
                </text>
                <text x="420" y="128" className="font-mono text-[7.5px] fill-white/50">
                  Recovery · Snapshots
                </text>
                {/* State: CHECKPOINTED */}
                <rect x="502" y="110" width="46" height="14" rx="3" fill="#10b981" fillOpacity="0.15" />
                <text x="525" y="119" dominantBaseline="central" textAnchor="middle" className="font-mono text-[7px] font-bold fill-emerald-400">
                  SAVED
                </text>
              </g>

              {/* 7. EXTERNAL TOOLS / APIS - Right Side */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("tools")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x="410"
                  y="180"
                  width="145"
                  height="34"
                  rx="5"
                  fill="#0e0e14"
                  stroke="#ffffff"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />
                <text x="420" y="195" className="font-mono text-[9.5px] font-bold fill-white">
                  EXTERNAL TOOLS
                </text>
                <text x="420" y="206" className="font-mono text-[7.5px] fill-white/45">
                  Vector DB · Web · APIs
                </text>
                <circle cx="538" cy="197" r="2.5" fill="#a78bfa" />
              </g>

              {/* ---------------- 4 AI AGENTS ROW ---------------- */}

              {/* Agent 1: Research Agent */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("agent1")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x="30"
                  y="242"
                  width="130"
                  height="54"
                  rx="6"
                  fill="#0e0e14"
                  stroke="#ffffff"
                  strokeOpacity="0.16"
                  strokeWidth="1"
                />
                <text x="40" y="259" className="font-mono text-[9.5px] font-bold fill-white">
                  Research Agent
                </text>
                <text x="40" y="271" className="font-mono text-[7.5px] fill-white/45">
                  Corpus &amp; Vector Search
                </text>
                {/* State: COMPLETED */}
                <rect x="40" y="278" width="56" height="12" rx="2.5" fill="#ffffff" fillOpacity="0.07" />
                <text x="68" y="285" dominantBaseline="central" textAnchor="middle" className="font-mono text-[7px] font-bold fill-white/70">
                  COMPLETED
                </text>
              </g>

              {/* Agent 2: Analysis Agent */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("agent2")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x="173"
                  y="242"
                  width="130"
                  height="54"
                  rx="6"
                  fill="#0e0e14"
                  stroke="#ffffff"
                  strokeOpacity="0.16"
                  strokeWidth="1"
                />
                <text x="183" y="259" className="font-mono text-[9.5px] font-bold fill-white">
                  Analysis Agent
                </text>
                <text x="183" y="271" className="font-mono text-[7.5px] fill-white/45">
                  Context Synthesizer
                </text>
                {/* State: COMPLETED */}
                <rect x="183" y="278" width="56" height="12" rx="2.5" fill="#ffffff" fillOpacity="0.07" />
                <text x="211" y="285" dominantBaseline="central" textAnchor="middle" className="font-mono text-[7px] font-bold fill-white/70">
                  COMPLETED
                </text>
              </g>

              {/* Agent 3: Execution Agent (ACTIVE STAGE) */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("agent3")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x="317"
                  y="242"
                  width="130"
                  height="54"
                  rx="6"
                  fill="#151520"
                  stroke="#ff4d00"
                  strokeWidth="1.2"
                  filter="url(#infra-orange-glow)"
                />
                <text x="327" y="259" className="font-mono text-[9.5px] font-bold fill-white">
                  Execution Agent
                </text>
                <text x="327" y="271" className="font-mono text-[7.5px] fill-white/60">
                  Tool &amp; Code Sandbox
                </text>
                {/* State: RUNNING */}
                <rect x="327" y="278" width="50" height="12" rx="2.5" fill="#ff4d00" fillOpacity="0.2" stroke="#ff4d00" strokeWidth="0.6" />
                <text x="352" y="285" dominantBaseline="central" textAnchor="middle" className="font-mono text-[7px] font-bold fill-[#ff4d00] tracking-wider">
                  RUNNING
                </text>
              </g>

              {/* Agent 4: Validation Agent */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode("agent4")}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <rect
                  x="460"
                  y="242"
                  width="130"
                  height="54"
                  rx="6"
                  fill="#0e0e14"
                  stroke="#ffffff"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                />
                <text x="470" y="259" className="font-mono text-[9.5px] font-bold fill-white/60">
                  Validation Agent
                </text>
                <text x="470" y="271" className="font-mono text-[7.5px] fill-white/35">
                  Output Guardrails
                </text>
                {/* State: WAITING */}
                <rect x="470" y="278" width="46" height="12" rx="2.5" fill="#ffffff" fillOpacity="0.04" />
                <text x="493" y="285" dominantBaseline="central" textAnchor="middle" className="font-mono text-[7px] font-bold fill-white/35">
                  WAITING
                </text>
              </g>

              {/* Connector from Execution Agent to Timeline */}
              <line
                x1="382"
                y1="296"
                x2="382"
                y2="340"
                stroke="#ff4d00"
                strokeWidth="1.2"
                strokeDasharray="2,2"
                filter="url(#infra-orange-glow)"
              />

              {/* ---------------- 5-STAGE EXECUTION TIMELINE ---------------- */}

              {/* Timeline Horizontal Rail */}
              <line x1="45" y1="365" x2="575" y2="365" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
              {/* Active Completed Segment */}
              <line x1="45" y1="365" x2="382" y2="365" stroke="#ff4d00" strokeWidth="1.5" filter="url(#infra-orange-glow)" />

              {/* Stage 01: INGEST */}
              <g>
                <circle cx="70" cy="365" r="4" fill="#ffffff" />
                <text x="70" y="382" textAnchor="middle" className="font-mono text-[8px] fill-white/60 font-semibold">
                  01 INGEST
                </text>
              </g>

              {/* Stage 02: PLAN */}
              <g>
                <circle cx="174" cy="365" r="4" fill="#ffffff" />
                <text x="174" y="382" textAnchor="middle" className="font-mono text-[8px] fill-white/60 font-semibold">
                  02 PLAN
                </text>
              </g>

              {/* Stage 03: CHECKPOINT */}
              <g>
                <circle cx="278" cy="365" r="4" fill="#ffffff" />
                <text x="278" y="382" textAnchor="middle" className="font-mono text-[8px] fill-white/60 font-semibold">
                  03 CHECKPOINT
                </text>
              </g>

              {/* Stage 04: EXECUTE (HIGHLIGHTED ACTIVE STAGE) */}
              <g>
                <circle cx="382" cy="365" r="8" fill="none" stroke="#ff4d00" strokeWidth="1" opacity="0.6" className="animate-pulse" />
                <circle cx="382" cy="365" r="5" fill="#ff4d00" filter="url(#infra-orange-glow)" />
                <text x="382" y="383" textAnchor="middle" className="font-mono text-[8.5px] fill-[#ff4d00] font-black tracking-wider">
                  04 EXECUTE
                </text>
                <text x="382" y="394" textAnchor="middle" className="font-mono text-[7px] fill-[#ff4d00] font-semibold">
                  ACTIVE // 184ms
                </text>
              </g>

              {/* Stage 05: VERIFY */}
              <g>
                <circle cx="510" cy="365" r="3.5" fill="#202028" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="0.8" />
                <text x="510" y="382" textAnchor="middle" className="font-mono text-[8px] fill-white/30 font-semibold">
                  05 VERIFY
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Micro Detail Readout Bar */}
          <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
              <span className="text-white/80">
                {hoveredNode === "orchestrator" && "LANGGRAPH RUNTIME: Cyclic execution with stateful resume"}
                {hoveredNode === "postgres" && "POSTGRESQL: Atomic state snapshots with versioned WAL"}
                {hoveredNode === "redis" && "REDIS: Sub-millisecond distributed lock & message buffer"}
                {hoveredNode === "checkpoint" && "CHECKPOINT ENGINE: Deterministic recovery of wf_8a21"}
                {hoveredNode === "agent3" && "EXECUTION AGENT: Active tool dispatch in sandbox container"}
                {!hoveredNode && "TOPOLOGY: FAULT-TOLERANT AI ORCHESTRATION PIPELINE"}
              </span>
            </div>
            <div className="text-[9px] uppercase tracking-wider text-white/30 hidden sm:inline">
              100% DETERMINISTIC RECOVERY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
