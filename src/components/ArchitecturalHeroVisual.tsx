"use client";

import { useState, useRef, MouseEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { playSubtleClick } from "@/components/SoundEffects";

interface NodeData {
  id: string;
  name: string;
  category: string;
  role: string;
  x: number;
  y: number;
  pathDescription: string;
}

const NODES: Record<string, NodeData> = {
  client: {
    id: "client",
    name: "CLIENT",
    category: "INGRESS",
    role: "HTTP/2, WebSocket stream & TLS 1.3 ingress",
    x: 230,
    y: 52,
    pathDescription: "CLIENT → FASTAPI",
  },
  fastapi: {
    id: "fastapi",
    name: "FASTAPI",
    category: "ASYNC GATEWAY",
    role: "Async API layer, non-blocking routing & Pydantic v2 validation",
    x: 230,
    y: 138,
    pathDescription: "CLIENT → FASTAPI → APPLICATION",
  },
  application: {
    id: "application",
    name: "APPLICATION",
    category: "CORE RUNTIME",
    role: "Domain orchestrator, event bus dispatch & worker supervisor",
    x: 230,
    y: 216,
    pathDescription: "APPLICATION → [REDIS + POSTGRESQL]",
  },
  redis: {
    id: "redis",
    name: "REDIS",
    category: "STATE CACHE",
    role: "In-memory cache, distributed session state & rate limiting",
    x: 126,
    y: 304,
    pathDescription: "APPLICATION → REDIS → LANGGRAPH",
  },
  postgres: {
    id: "postgres",
    name: "POSTGRESQL",
    category: "PERSISTENCE",
    role: "Relational persistence, ACID transactions & pgvector indices",
    x: 334,
    y: 304,
    pathDescription: "APPLICATION → POSTGRESQL → LANGGRAPH",
  },
  langgraph: {
    id: "langgraph",
    name: "LANGGRAPH",
    category: "AI AGENTS",
    role: "Stateful agent workflow graph, cyclic loops & tool dispatch",
    x: 230,
    y: 418,
    pathDescription: "[DATA TIER] → LANGGRAPH → RESPONSE",
  },
};

export function ArchitecturalHeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [simulationStatus, setSimulationStatus] = useState<"idle" | "running" | "complete">("idle");

  // Subtle 3D perspective response on mouse move
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8; // -4 to +4 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8; // -4 to +4 deg
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setHoveredNode(null);
  };

  // Active Request Simulation Workflow
  const handleSimulateRequest = () => {
    if (isSimulating) return;
    playSubtleClick();
    setIsSimulating(true);
    setSimulationStatus("running");
    setSimulationStep(0); // Client

    const steps = [
      { step: 1, delay: 350 },  // FastAPI
      { step: 2, delay: 700 },  // Application
      { step: 3, delay: 1100 }, // Redis & Postgres
      { step: 4, delay: 1550 }, // LangGraph AI
      { step: 5, delay: 1950 }, // Output Sink / Complete
    ];

    steps.forEach(({ step, delay }) => {
      setTimeout(() => {
        setSimulationStep(step);
      }, delay);
    });

    setTimeout(() => {
      setSimulationStatus("complete");
      setIsSimulating(false);
    }, 2300);

    setTimeout(() => {
      setSimulationStatus("idle");
      setSimulationStep(-1);
    }, 4200);
  };

  // Connection highlighting logic
  const isPathActive = (from: string, to: string) => {
    if (isSimulating) {
      if (simulationStep === 0 && from === "client" && to === "fastapi") return true;
      if (simulationStep === 1 && ((from === "client" && to === "fastapi") || (from === "fastapi" && to === "application"))) return true;
      if (simulationStep === 2 && (from === "fastapi" || from === "application")) return true;
      if (simulationStep === 3 && (from === "application" || to === "redis" || to === "postgres" || from === "redis" || from === "postgres")) return true;
      if (simulationStep === 4 && (from === "redis" || from === "postgres" || to === "langgraph" || from === "langgraph")) return true;
      if (simulationStep === 5) return true;
    }

    if (!hoveredNode) return false;
    if (hoveredNode === "client" && from === "client" && to === "fastapi") return true;
    if (hoveredNode === "fastapi" && ((from === "client" && to === "fastapi") || (from === "fastapi" && to === "application"))) return true;
    if (hoveredNode === "application" && (from === "fastapi" || from === "application")) return true;
    if (hoveredNode === "redis" && (to === "redis" || from === "redis")) return true;
    if (hoveredNode === "postgres" && (to === "postgres" || from === "postgres")) return true;
    if (hoveredNode === "langgraph" && (to === "langgraph" || from === "langgraph")) return true;
    return false;
  };

  const isNodeActive = (nodeId: string) => {
    if (isSimulating) {
      if (simulationStep === 0 && nodeId === "client") return true;
      if (simulationStep === 1 && nodeId === "fastapi") return true;
      if (simulationStep === 2 && nodeId === "application") return true;
      if (simulationStep === 3 && (nodeId === "redis" || nodeId === "postgres")) return true;
      if (simulationStep === 4 && nodeId === "langgraph") return true;
      if (simulationStep === 5) return true;
    }
    if (hoveredNode === nodeId) return true;
    return false;
  };

  // Current highlighted metadata for bottom status strip
  const activeMeta = hoveredNode ? NODES[hoveredNode] : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[430px] mx-auto lg:mr-0 select-none"
    >
      {/* Visual Container Card: Warm white, refined hairline border, subtle shadow */}
      <div
        className="relative bg-[#ffffff]/90 backdrop-blur-md border border-[#e4e2dc] rounded-2xl p-5 sm:p-6 shadow-[0_16px_36px_-16px_rgba(18,18,21,0.06)] transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mouseTilt.x}deg) rotateX(${mouseTilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top Header Strip: Status Indicator & Simulate CTA */}
        <div className="flex items-center justify-between pb-4 mb-2 border-b border-[#eceae4]">
          {/* Status Indicator: Tiny inline status, no big terminal */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isSimulating
                  ? "bg-[#ff4d00] animate-ping"
                  : simulationStatus === "complete"
                  ? "bg-emerald-500"
                  : "bg-[#ff4d00] animate-pulse"
              }`}
            />
            <span className="font-mono text-[10px] tracking-wider uppercase font-medium text-[#121215]/70">
              {isSimulating
                ? "ROUTING PACKET..."
                : simulationStatus === "complete"
                ? "REQUEST COMPLETE ✓"
                : "/ system.ready"}
            </span>
          </div>

          {/* Interactive Trigger: SIMULATE REQUEST ↗ */}
          <button
            onClick={handleSimulateRequest}
            disabled={isSimulating}
            className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] font-semibold tracking-wider uppercase transition-all duration-200 ${
              isSimulating
                ? "bg-[#121215]/5 text-[#121215]/40 cursor-not-allowed"
                : "bg-[#121215] text-white hover:bg-[#ff4d00] shadow-xs active:scale-95"
            }`}
          >
            <span>{isSimulating ? "PROCESSING" : "SIMULATE REQUEST"}</span>
            <ArrowUpRight
              size={11}
              className="text-[#ff4d00] group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>

        {/* System Architecture Canvas (SVG) */}
        <div className="relative w-full aspect-[430/490]">
          <svg viewBox="0 0 460 500" className="w-full h-full overflow-visible">
            <defs>
              {/* Subtle Precision Grid Background */}
              <pattern id="arch-subtle-grid" width="23" height="23" patternUnits="userSpaceOnUse">
                <path d="M 23 0 L 0 0 0 23" fill="none" stroke="#ebe8e1" strokeWidth="0.5" />
                <circle cx="23" cy="23" r="0.6" fill="#d2cfc7" />
              </pattern>

              {/* Radiant Glow for Active Orange Path */}
              <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Grid */}
            <rect width="100%" height="100%" fill="url(#arch-subtle-grid)" rx="8" />

            {/* ---------------- PATH NETWORK (Thin technical lines) ---------------- */}

            {/* 1. Client to FastAPI */}
            <line
              x1="230"
              y1="64"
              x2="230"
              y2="126"
              stroke={isPathActive("client", "fastapi") ? "#ff4d00" : "#d8d6cf"}
              strokeWidth={isPathActive("client", "fastapi") ? "1.75" : "1"}
              strokeDasharray={isPathActive("client", "fastapi") ? "none" : "3,3"}
              className="transition-colors duration-300"
            />

            {/* 2. FastAPI to Application */}
            <line
              x1="230"
              y1="150"
              x2="230"
              y2="204"
              stroke={isPathActive("fastapi", "application") ? "#ff4d00" : "#d8d6cf"}
              strokeWidth={isPathActive("fastapi", "application") ? "1.75" : "1"}
              className="transition-colors duration-300"
            />

            {/* 3. Application Forking to Redis (Left) */}
            <path
              d="M 230 228 L 230 252 L 126 252 L 126 292"
              fill="none"
              stroke={isPathActive("application", "redis") ? "#ff4d00" : "#d8d6cf"}
              strokeWidth={isPathActive("application", "redis") ? "1.75" : "1"}
              className="transition-colors duration-300"
            />

            {/* 4. Application Forking to PostgreSQL (Right) */}
            <path
              d="M 230 228 L 230 252 L 334 252 L 334 292"
              fill="none"
              stroke={isPathActive("application", "postgres") ? "#ff4d00" : "#d8d6cf"}
              strokeWidth={isPathActive("application", "postgres") ? "1.75" : "1"}
              className="transition-colors duration-300"
            />

            {/* 5. Redis Converging to LangGraph */}
            <path
              d="M 126 316 L 126 368 L 230 368 L 230 406"
              fill="none"
              stroke={isPathActive("redis", "langgraph") ? "#ff4d00" : "#d8d6cf"}
              strokeWidth={isPathActive("redis", "langgraph") ? "1.75" : "1"}
              className="transition-colors duration-300"
            />

            {/* 6. PostgreSQL Converging to LangGraph */}
            <path
              d="M 334 316 L 334 368 L 230 368 L 230 406"
              fill="none"
              stroke={isPathActive("postgres", "langgraph") ? "#ff4d00" : "#d8d6cf"}
              strokeWidth={isPathActive("postgres", "langgraph") ? "1.75" : "1"}
              className="transition-colors duration-300"
            />

            {/* 7. LangGraph to Response Sink */}
            <line
              x1="230"
              y1="430"
              x2="230"
              y2="470"
              stroke={simulationStep >= 4 ? "#ff4d00" : "#d8d6cf"}
              strokeWidth={simulationStep >= 4 ? "1.75" : "1"}
              strokeDasharray="2,2"
              className="transition-colors duration-300"
            />

            {/* ---------------- ACTIVE DATA PACKET ANIMATION ---------------- */}

            {/* Continuous subtle ambient pulse traveling through when idle */}
            {!isSimulating && (
              <circle r="2.5" fill="#ff4d00" opacity="0.85">
                <animateMotion
                  path="M 230 64 L 230 126 L 230 150 L 230 204 L 230 252 L 334 252 L 334 368 L 230 368 L 230 430"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Interactive Simulation Packet: Travels step by step on button click */}
            {isSimulating && (
              <>
                {/* Main Packet */}
                <motion.circle
                  r="4.5"
                  fill="#ff4d00"
                  filter="url(#orange-glow)"
                  animate={{
                    cx:
                      simulationStep === 0
                        ? 230
                        : simulationStep === 1
                        ? 230
                        : simulationStep === 2
                        ? 230
                        : simulationStep === 3
                        ? 126
                        : simulationStep === 4
                        ? 230
                        : 230,
                    cy:
                      simulationStep === 0
                        ? 52
                        : simulationStep === 1
                        ? 138
                        : simulationStep === 2
                        ? 216
                        : simulationStep === 3
                        ? 304
                        : simulationStep === 4
                        ? 418
                        : 476,
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                />

                {/* Twin Parallel Packet during Data Tier Step */}
                {simulationStep === 3 && (
                  <motion.circle
                    r="4.5"
                    fill="#ff4d00"
                    filter="url(#orange-glow)"
                    initial={{ cx: 230, cy: 252 }}
                    animate={{ cx: 334, cy: 304 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  />
                )}
              </>
            )}

            {/* ---------------- INTERACTIVE NODES ---------------- */}

            {/* NODE 1: CLIENT */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredNode("client")}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect x="180" y="38" width="100" height="28" fill="transparent" />
              <circle
                cx="230"
                cy="52"
                r={isNodeActive("client") ? "6" : "4.5"}
                fill={isNodeActive("client") ? "#ff4d00" : "#121215"}
                className="transition-all duration-200"
              />
              <circle
                cx="230"
                cy="52"
                r="10"
                fill="none"
                stroke={isNodeActive("client") ? "#ff4d00" : "#d8d6cf"}
                strokeWidth="0.75"
                className="transition-colors duration-200"
              />
              <text
                x="248"
                y="52"
                dominantBaseline="central"
                className="font-mono text-[11px] font-bold tracking-wider fill-[#121215]"
              >
                CLIENT
              </text>
              <text
                x="248"
                y="63"
                dominantBaseline="central"
                className="font-mono text-[8px] tracking-widest fill-[#121215]/50 uppercase"
              >
                INGRESS
              </text>
            </g>

            {/* NODE 2: FASTAPI */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredNode("fastapi")}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect x="180" y="124" width="140" height="30" fill="transparent" />
              {/* Diamond Node */}
              <polygon
                points="230,131 237,138 230,145 223,138"
                fill={isNodeActive("fastapi") ? "#ff4d00" : "#121215"}
                className="transition-colors duration-200"
              />
              <polygon
                points="230,127 241,138 230,149 219,138"
                fill="none"
                stroke={isNodeActive("fastapi") ? "#ff4d00" : "#d8d6cf"}
                strokeWidth="0.75"
                className="transition-colors duration-200"
              />
              <text
                x="250"
                y="138"
                dominantBaseline="central"
                className="font-mono text-[11px] font-bold tracking-wider fill-[#121215]"
              >
                FASTAPI
              </text>
              <text
                x="250"
                y="149"
                dominantBaseline="central"
                className="font-mono text-[8px] tracking-widest fill-[#121215]/50 uppercase"
              >
                ASYNC GATEWAY
              </text>
            </g>

            {/* NODE 3: APPLICATION */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredNode("application")}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect x="170" y="202" width="160" height="30" fill="transparent" />
              {/* Precision Crosshair Core */}
              <rect
                x="226"
                y="212"
                width="8"
                height="8"
                fill={isNodeActive("application") ? "#ff4d00" : "#121215"}
                className="transition-colors duration-200"
              />
              <rect
                x="222"
                y="208"
                width="16"
                height="16"
                fill="none"
                stroke={isNodeActive("application") ? "#ff4d00" : "#d8d6cf"}
                strokeWidth="0.75"
                className="transition-colors duration-200"
              />
              <text
                x="250"
                y="216"
                dominantBaseline="central"
                className="font-mono text-[11px] font-bold tracking-wider fill-[#121215]"
              >
                APPLICATION
              </text>
              <text
                x="250"
                y="227"
                dominantBaseline="central"
                className="font-mono text-[8px] tracking-widest fill-[#121215]/50 uppercase"
              >
                DOMAIN LOGIC
              </text>
            </g>

            {/* NODE 4: REDIS (Left Data Node) */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredNode("redis")}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect x="60" y="290" width="130" height="34" fill="transparent" />
              <circle
                cx="126"
                cy="304"
                r={isNodeActive("redis") ? "5.5" : "4"}
                fill={isNodeActive("redis") ? "#ff4d00" : "#121215"}
                className="transition-all duration-200"
              />
              <circle
                cx="126"
                cy="304"
                r="9"
                fill="none"
                stroke={isNodeActive("redis") ? "#ff4d00" : "#d8d6cf"}
                strokeWidth="0.75"
                className="transition-colors duration-200"
              />
              <text
                x="126"
                y="325"
                textAnchor="middle"
                className="font-mono text-[10px] font-bold tracking-wider fill-[#121215]"
              >
                REDIS
              </text>
              <text
                x="126"
                y="336"
                textAnchor="middle"
                className="font-mono text-[8px] tracking-wider fill-[#121215]/50 uppercase"
              >
                STATE CACHE
              </text>
            </g>

            {/* NODE 5: POSTGRESQL (Right Data Node) */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredNode("postgres")}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect x="270" y="290" width="130" height="34" fill="transparent" />
              <circle
                cx="334"
                cy="304"
                r={isNodeActive("postgres") ? "5.5" : "4"}
                fill={isNodeActive("postgres") ? "#ff4d00" : "#121215"}
                className="transition-all duration-200"
              />
              <circle
                cx="334"
                cy="304"
                r="9"
                fill="none"
                stroke={isNodeActive("postgres") ? "#ff4d00" : "#d8d6cf"}
                strokeWidth="0.75"
                className="transition-colors duration-200"
              />
              <text
                x="334"
                y="325"
                textAnchor="middle"
                className="font-mono text-[10px] font-bold tracking-wider fill-[#121215]"
              >
                POSTGRESQL
              </text>
              <text
                x="334"
                y="336"
                textAnchor="middle"
                className="font-mono text-[8px] tracking-wider fill-[#121215]/50 uppercase"
              >
                PERSISTENCE
              </text>
            </g>

            {/* NODE 6: LANGGRAPH / AI (Intelligent Core - The Primary Orange Active Node) */}
            <g
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredNode("langgraph")}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <rect x="160" y="402" width="180" height="36" fill="transparent" />

              {/* Pulsing Active Orange Halo */}
              <circle
                cx="230"
                cy="418"
                r="16"
                fill="none"
                stroke="#ff4d00"
                strokeWidth="0.75"
                opacity="0.35"
                className="animate-pulse"
              />
              <circle
                cx="230"
                cy="418"
                r="11"
                fill="none"
                stroke="#ff4d00"
                strokeWidth="1"
                opacity="0.75"
              />

              {/* Central Glowing Node Core */}
              <circle
                cx="230"
                cy="418"
                r="5"
                fill="#ff4d00"
                filter="url(#orange-glow)"
              />

              <text
                x="254"
                y="418"
                dominantBaseline="central"
                className="font-mono text-[11px] font-bold tracking-wider fill-[#121215]"
              >
                LANGGRAPH
              </text>
              <text
                x="254"
                y="429"
                dominantBaseline="central"
                className="font-mono text-[8px] tracking-widest fill-[#ff4d00] font-semibold uppercase"
              >
                AI AGENT ENGINE
              </text>
            </g>

            {/* OUTPUT SINK: RESPONSE */}
            <g opacity={simulationStep >= 4 || simulationStatus === "complete" ? 1 : 0.45} className="transition-opacity duration-300">
              <line x1="218" y1="476" x2="242" y2="476" stroke="#121215" strokeWidth="1" />
              <line x1="230" y1="470" x2="230" y2="476" stroke="#121215" strokeWidth="1" />
              <text
                x="230"
                y="490"
                textAnchor="middle"
                className="font-mono text-[9px] tracking-widest fill-[#121215]/70 uppercase font-semibold"
              >
                {simulationStatus === "complete" ? "200 OK · STREAM RESPONSE" : "RESPONSE SINK"}
              </text>
            </g>
          </svg>
        </div>

        {/* Bottom Technical Readout (Replaces huge terminal window with subtle line) */}
        <div className="mt-3 pt-3 border-t border-[#eceae4] flex flex-col gap-1 min-h-[38px] justify-center">
          <AnimatePresence mode="wait">
            {activeMeta ? (
              <motion.div
                key={activeMeta.id}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-between text-[10px] font-mono"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[#ff4d00] font-semibold">[{activeMeta.name}]</span>
                  <span className="text-[#121215]/75 truncate">{activeMeta.role}</span>
                </div>
                <span className="text-[#121215]/40 text-[9px] uppercase hidden sm:inline tracking-wider">
                  {activeMeta.pathDescription}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="idle-status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-between text-[10px] font-mono text-[#121215]/50"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#121215]/30" />
                  <span>INTERACTIVE ARCHITECTURE · HOVER NODES</span>
                </div>
                <span className="tracking-wider uppercase text-[9px] text-[#121215]/40">
                  SYSTEM BUS · 60FPS
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
