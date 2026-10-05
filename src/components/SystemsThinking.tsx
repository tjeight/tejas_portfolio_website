"use client";

import { useState } from "react";
import { 
  Laptop, ShieldCheck, Server, Cpu, Database, 
  GitMerge, ArrowDown, Activity
} from "lucide-react";
import { playSubtleClick, playActionPing } from "@/components/SoundEffects";

export function SystemsThinking() {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(2); // Default to Application Layer
  const [isSimulating, setIsSimulating] = useState(false);

  const layers = [
    {
      id: "client",
      title: "Client",
      specName: "CLIENT LAYER",
      technologies: "Next.js · React · WebSockets",
      purpose: "User interface, client-side state synchronization, streaming responses, and optimistic updates.",
      capabilities: [
        "REST & Server-Sent Events (SSE) streaming",
        "Idempotency keys on state-mutating requests",
        "Deterministic error handling and timeouts",
      ],
      dataFlow: "User Action → Client → API Gateway",
      icon: Laptop,
    },
    {
      id: "api",
      title: "API Gateway",
      specName: "API GATEWAY LAYER",
      technologies: "FastAPI · Nginx · Cloudflare",
      purpose: "Reverse proxying, TLS termination, CORS validation, rate limiting, and zero-trust authentication checks.",
      capabilities: [
        "Asymmetric RS256 JWT validation via JWKS",
        "Sliding-window IP rate limiting via Redis",
        "Request body size limits and payload filtering",
      ],
      dataFlow: "Client → API Gateway → Application",
      icon: ShieldCheck,
    },
    {
      id: "app",
      title: "Application",
      specName: "APPLICATION LAYER",
      technologies: "Python · FastAPI · AsyncIO",
      purpose: "Business logic, service orchestration, schema validation, and database access.",
      capabilities: [
        "Asynchronous event loop execution",
        "Strict input validation with Pydantic v2",
        "Dependency injection and scoped database sessions",
      ],
      dataFlow: "API → Application → Cache → Database",
      icon: Server,
    },
    {
      id: "cache",
      title: "Cache",
      specName: "CACHE TIER",
      technologies: "Redis · In-Memory",
      purpose: "In-memory caching, distributed coordination, concurrency control, and rate limiting counters.",
      capabilities: [
        "Sub-millisecond key-value lookups",
        "Distributed lock orchestration (Redlock)",
        "Sliding-window rate limiter sorted sets",
      ],
      dataFlow: "Application → Cache → Database",
      icon: Cpu,
    },
    {
      id: "database",
      title: "Database",
      specName: "PERSISTENCE LAYER",
      technologies: "PostgreSQL · SQLAlchemy · Alembic",
      purpose: "Relational persistence, data integrity, spatial queries, and ACID transactional state.",
      capabilities: [
        "ACID transactions with foreign key guarantees",
        "B-tree and GIN index query optimization",
        "Connection pooling via async sessions",
      ],
      dataFlow: "Application → Database → AI Checkpoint",
      icon: Database,
    },
    {
      id: "ai",
      title: "AI / Agent",
      specName: "AI & AGENT LAYER",
      technologies: "LangGraph · LLM APIs",
      purpose: "Stateful agent execution, cyclic graph routing, tool invocation, and checkpoint persistence.",
      capabilities: [
        "Cyclic graph state machines with conditional edges",
        "Deterministic PostgreSQL checkpointing",
        "Tool invocation with schema validation",
      ],
      dataFlow: "Application → AI Agent → Database Checkpoint",
      icon: GitMerge,
    }
  ];

  const handleSelectLayer = (index: number) => {
    playSubtleClick();
    setSelectedLayerIndex(index);
  };

  const handleSimulateTrace = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    playActionPing();
    setSelectedLayerIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < layers.length) {
        setSelectedLayerIndex(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 450);
  };

  const activeLayer = layers[selectedLayerIndex];

  return (
    <section id="architecture" className="relative py-28 lg:py-36 bg-[#fbfbf9] text-[#121215] border-b border-[#e6e4df]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#ff4d00] uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
              <span>02 // ARCHITECTURE</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#121215] uppercase leading-[1.02]">
              Systems{" "}
              <span className="font-serif-italic font-normal lowercase tracking-normal text-[#121215]">
                architecture<span className="text-[#ff4d00] font-sans">.</span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-md text-sm text-[#121215]/65 font-light leading-relaxed">
              Interactive architectural specification of data flow, state, and persistence boundaries.
            </p>
            <button
              onClick={handleSimulateTrace}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121215] text-white hover:bg-[#ff4d00] font-mono text-xs uppercase tracking-wider transition-colors shrink-0 shadow-sm disabled:opacity-50"
            >
              <Activity size={13} className={isSimulating ? "animate-spin text-[#ff4d00]" : "text-[#ff4d00]"} />
              <span>{isSimulating ? "TRACING PIPELINE..." : "SIMULATE TRACE"}</span>
            </button>
          </div>
        </div>

        {/* Interactive Architecture Specification Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Layer Flow Stack (5 Cols) */}
          <div className="lg:col-span-5 space-y-2 select-none font-mono">
            {layers.map((layer, idx) => {
              const Icon = layer.icon;
              const isSelected = selectedLayerIndex === idx;

              return (
                <div key={layer.id}>
                  <div
                    onClick={() => handleSelectLayer(idx)}
                    data-cursor="SELECT"
                    className={`cursor-pointer px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? "bg-[#0c0c0e] text-white border-[#ff4d00] shadow-xl shadow-[#ff4d00]/10 scale-[1.02]"
                        : "bg-white text-[#121215] border-[#e6e4df] hover:border-[#121215]/30 hover:bg-[#f5f4ef]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-1.5 rounded-lg border ${
                          isSelected
                            ? "bg-[#ff4d00]/20 text-[#ff4d00] border-[#ff4d00]/40"
                            : "bg-[#f5f4ef] text-[#121215]/60 border-[#e6e4df]"
                        }`}
                      >
                        <Icon size={15} />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold tracking-wide truncate">
                          {layer.title}
                        </span>
                        <span
                          className={`text-[10px] tracking-wider truncate mt-0.5 ${
                            isSelected ? "text-[#ff4d00]" : "text-[#121215]/45"
                          }`}
                        >
                          {layer.technologies}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <span className="text-[10px] text-[#ff4d00] font-bold tracking-wider flex items-center gap-1">
                          <span>SPEC</span>
                          <span>◆</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#121215]/30">0{idx + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  {idx < layers.length - 1 && (
                    <div className="flex justify-center py-1 text-[#121215]/20">
                      <ArrowDown size={11} className={isSelected ? "text-[#ff4d00]" : ""} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Architectural Specification Panel (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#e6e4df] shadow-sm relative overflow-hidden space-y-6">
              {/* Layer Title & Tech Specification */}
              <div className="pb-5 border-b border-[#e6e4df]">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121215] uppercase mb-1">
                  {activeLayer.specName}
                </h3>
                <div className="font-mono text-sm text-[#ff4d00] font-semibold">
                  {activeLayer.technologies}
                </div>
              </div>

              {/* Specification Purpose */}
              <div>
                <div className="font-mono text-[10px] text-[#121215]/40 uppercase tracking-widest mb-2 font-bold">
                  PURPOSE
                </div>
                <p className="text-sm sm:text-base text-[#121215]/85 font-normal leading-relaxed">
                  {activeLayer.purpose}
                </p>
              </div>

              {/* Capabilities */}
              <div className="space-y-2 pt-2">
                <div className="font-mono text-[10px] text-[#121215]/40 uppercase tracking-widest mb-2 font-bold">
                  SPECIFICATION DETAILS
                </div>
                {activeLayer.capabilities.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 font-mono text-xs text-[#121215]/75">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Data Flow (Minimal, exact format requested) */}
              <div className="pt-5 border-t border-[#e6e4df]">
                <div className="font-mono text-[10px] text-[#121215]/40 uppercase tracking-widest mb-2 font-bold">
                  DATA FLOW
                </div>
                <div className="p-3 rounded-xl bg-[#f5f4ef] border border-[#e6e4df] font-mono text-xs text-[#121215] font-semibold flex items-center gap-2 flex-wrap">
                  {activeLayer.dataFlow.split(" → ").map((step, i, arr) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className={step.toLowerCase().includes(activeLayer.title.toLowerCase()) ? "text-[#ff4d00] font-bold" : ""}>
                        {step}
                      </span>
                      {i < arr.length - 1 && <span className="text-[#121215]/30">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
