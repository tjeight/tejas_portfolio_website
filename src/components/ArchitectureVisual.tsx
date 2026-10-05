"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Laptop, ShieldAlert, Server, Database, 
  GitMerge, Cloud, Play, RefreshCw, Terminal, 
  Zap, Activity
} from "lucide-react";
import { playActionPing, playSubtleClick } from "@/components/SoundEffects";

type ScenarioType = "agent" | "cache" | "async";

interface ArchitectureStep {
  nodeId: string;
  name: string;
  log: string;
  latencyMs: number;
  statusCode?: number;
}

const SCENARIOS: Record<ScenarioType, {
  title: string;
  description: string;
  steps: ArchitectureStep[];
}> = {
  agent: {
    title: "Agentic Loop & Checkpoint Recovery",
    description: "Asynchronous ingress triggers cyclic LangGraph agent with tool validation and atomic Postgres checkpointing.",
    steps: [
      { nodeId: "client", name: "Client", log: "POST /v1/agent/orchestrate (payload: 1.2KB)", latencyMs: 2 },
      { nodeId: "gateway", name: "API Gateway", log: "Rate limit: OK (3/60 consumed) | TLS Handshake verified", latencyMs: 4 },
      { nodeId: "fastapi", name: "FastAPI", log: "Parsed Pydantic v2 schema | Dispatched to LangGraph runtime", latencyMs: 8 },
      { nodeId: "redis", name: "Redis & Postgres", log: "Redis distributed lock acquired | Checkpoint initialized", latencyMs: 14 },
      { nodeId: "langgraph", name: "LangGraph", log: "Cyclic state machine node: `research_agent` executing tool loop", latencyMs: 45 },
      { nodeId: "external", name: "LLM Provider", log: "Streaming response received from Anthropic API (Claude 3.5)", latencyMs: 65 },
      { nodeId: "redis", name: "PostgreSQL Saver", log: "State transition checkpoint persisted with zero data loss", latencyMs: 18 },
      { nodeId: "client", name: "Client Ingress", log: "200 OK | Stream completed in 156ms | 0 errors", latencyMs: 2, statusCode: 200 },
    ]
  },
  cache: {
    title: "High-Throughput In-Memory Cache Hit",
    description: "Sub-10ms cache retrieval bypassing database and agent execution via distributed Redis cluster.",
    steps: [
      { nodeId: "client", name: "Client", log: "GET /v1/analytics/snapshot/2026-q1", latencyMs: 1 },
      { nodeId: "gateway", name: "API Gateway", log: "Nginx reverse proxy routed to FastAPI worker #03", latencyMs: 2 },
      { nodeId: "fastapi", name: "FastAPI", log: "Auth validated via RS256 JWKS | Checking Redis key `cache:snap:q1`", latencyMs: 3 },
      { nodeId: "redis", name: "Redis Cache", log: "CACHE HIT [O(1) lookup] | Serialized binary buffer returned", latencyMs: 2 },
      { nodeId: "client", name: "Client Ingress", log: "200 OK | Latency: 8ms | Size: 4.8KB (Brotli compressed)", latencyMs: 1, statusCode: 200 },
    ]
  },
  async: {
    title: "Async Task Offloading & Event Stream",
    description: "Immediate 202 Accepted response with background Celery / Redis Stream processing.",
    steps: [
      { nodeId: "client", name: "Client", log: "POST /v1/ingest/sec-filing (multi-part doc)", latencyMs: 5 },
      { nodeId: "gateway", name: "API Gateway", log: "Payload size verified (8.4MB) | Auth verified", latencyMs: 4 },
      { nodeId: "fastapi", name: "FastAPI", log: "Generated Task UUID `tsk_88ab4e` | Emitted to Redis Stream", latencyMs: 7 },
      { nodeId: "redis", name: "Redis Streams", log: "Event published to stream `stream:filings:parse`", latencyMs: 3 },
      { nodeId: "client", name: "Client Ingress", log: "202 Accepted | Task enqueued for background worker pool", latencyMs: 1, statusCode: 202 },
    ]
  }
};

export function ArchitectureVisual() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>("agent");
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<string>("fastapi");
  const terminalRef = useRef<HTMLDivElement>(null);

  const currentScenario = SCENARIOS[activeScenario];

  const runSimulationFor = useCallback((scenarioKey: ScenarioType) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCurrentStepIndex(0);
    setLogs([]);
    playActionPing();

    const selectedScenario = SCENARIOS[scenarioKey];
    let step = 0;
    const totalSteps = selectedScenario.steps.length;

    const executeNextStep = () => {
      if (step < totalSteps) {
        const item = selectedScenario.steps[step];
        setCurrentStepIndex(step);
        const timestamp = new Date().toISOString().split("T")[1].slice(0, 12);
        setLogs((prev) => [
          ...prev,
          `[${timestamp}] [${item.name.toUpperCase()}] ${item.log} (+${item.latencyMs}ms)`
        ]);

        step++;
        setTimeout(executeNextStep, 450);
      } else {
        setIsSimulating(false);
      }
    };

    setTimeout(executeNextStep, 200);
  }, [isSimulating]);

  const runSimulation = () => {
    runSimulationFor(activeScenario);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const nodes = [
    {
      id: "client",
      title: "Client Layer",
      subtitle: "Web / Mobile / Ingress",
      icon: Laptop,
      tech: "HTTP/2 · WebSockets · SSE",
      details: "Client interfaces sending authenticated requests, receiving SSE streaming tokens from AI agents, or querying cached snapshots."
    },
    {
      id: "gateway",
      title: "API Gateway",
      subtitle: "Reverse Proxy & Shield",
      icon: ShieldAlert,
      tech: "Nginx · Sliding Window Rate Limiting",
      details: "Enforces TLS termination, CORS validation, DDoS defense, and rolling-window rate limiting before hitting backend services."
    },
    {
      id: "fastapi",
      title: "FastAPI Core",
      subtitle: "Async Application Runtime",
      icon: Server,
      tech: "Python 3.12 · AsyncIO · Pydantic v2",
      details: "High-throughput asynchronous application engine with strict schema serialization, dependency-injected database sessions, and JWKS token verification."
    },
    {
      id: "redis",
      title: "Cache & Persistence",
      subtitle: "In-Memory & Relational",
      icon: Database,
      tech: "Redis Cluster · PostgreSQL + pgvector",
      details: "Redis handles distributed locks, pub/sub streams, and token blacklists. PostgreSQL handles transactional data and vector similarity indexing."
    },
    {
      id: "langgraph",
      title: "AI Agent Engine",
      subtitle: "Cyclic State Orchestration",
      icon: GitMerge,
      tech: "LangGraph · Cyclic DAGs · State Checkpointing",
      details: "Cyclic agent graphs supporting multi-turn tool calling, reflection loops, human-in-the-loop gates, and deterministic replay upon restart."
    },
    {
      id: "external",
      title: "External Services",
      subtitle: "LLM APIs & Cloud Webhooks",
      icon: Cloud,
      tech: "OpenAI · Anthropic · AWS S3",
      details: "Model inference providers with circuit-breaker fallbacks, streaming chunk parsers, and exponential backoff retry policies."
    },
  ];

  const isNodeActive = (id: string) => {
    if (!isSimulating || currentStepIndex === -1) return false;
    const currentStep = currentScenario.steps[currentStepIndex];
    return currentStep?.nodeId === id;
  };

  const selectedNodeData = nodes.find((n) => n.id === selectedNode) || nodes[2];

  return (
    <section id="architecture" className="relative py-24 lg:py-32 border-b border-white/[0.06] bg-[#070709]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#ff4800] uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4800]" />
              <span>02 // Systems Architecture</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              Production <br className="hidden sm:block" />
              Data Pipeline<span className="text-[#ff4800]">.</span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-white/50 leading-relaxed">
            Live interactive representation of the backend dataflow, cyclic agent loops, and persistence checkpoints engineered for fault-tolerant operation.
          </div>
        </div>

        {/* Interactive Scenario Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#0d0d12] p-2.5 rounded-xl border border-white/10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-white/40 px-2 uppercase text-[10px] hidden sm:inline">
              SELECT SCENARIO:
            </span>
            {(["agent", "cache", "async"] as ScenarioType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  playSubtleClick();
                  setActiveScenario(type);
                  runSimulationFor(type);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeScenario === type
                    ? "bg-[#ff4800] text-black font-semibold shadow-md shadow-[#ff4800]/25"
                    : "text-white/60 hover:text-white bg-white/[0.02] hover:bg-white/[0.05]"
                }`}
              >
                {type === "agent" && "01. AI Agent Loop & Checkpoints"}
                {type === "cache" && "02. Redis Sub-10ms Cache Hit"}
                {type === "async" && "03. Async Task Offloading"}
              </button>
            ))}
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-5 py-2 font-mono text-xs rounded-lg uppercase tracking-wider transition-all ${
              isSimulating
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-white text-black font-semibold hover:bg-white/90 shadow-md"
            }`}
          >
            {isSimulating ? (
              <>
                <RefreshCw size={13} className="animate-spin text-[#ff4800]" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play size={13} fill="currentColor" />
                <span>Trigger Request</span>
              </>
            )}
          </button>
        </div>

        {/* Scenario description */}
        <div className="mb-8 font-mono text-xs text-white/60 flex items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#ff4800]">
            ACTIVE PIPELINE
          </span>
          <span>{currentScenario.description}</span>
        </div>

        {/* System Diagram Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const active = isNodeActive(node.id);
            const isSelected = selectedNode === node.id;

            return (
              <motion.div
                key={node.id}
                onClick={() => {
                  playSubtleClick();
                  setSelectedNode(node.id);
                }}
                className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden group ${
                  active
                    ? "bg-[#ff4800]/15 border-[#ff4800] ring-2 ring-[#ff4800]/40 shadow-2xl shadow-[#ff4800]/25 scale-[1.02]"
                    : isSelected
                    ? "bg-[#14141c] border-white/30"
                    : "bg-[#0d0d12] border-white/10 hover:border-white/20 hover:bg-[#111118]"
                }`}
              >
                {/* Node order number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-lg border transition-colors ${
                        active
                          ? "bg-[#ff4800] text-black border-[#ff4800]"
                          : "bg-white/[0.04] text-white/70 border-white/10 group-hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white group-hover:text-[#ff4800] transition-colors">
                        {node.title}
                      </div>
                      <div className="text-[11px] text-white/40 font-mono">
                        {node.subtitle}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-white/20 group-hover:text-white/40">
                    0{index + 1}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white/50">{node.tech}</span>
                  {active && (
                    <span className="flex items-center gap-1 text-[#ff4800] font-bold animate-pulse">
                      <Zap size={12} />
                      PACKET PASSING
                    </span>
                  )}
                </div>

                {/* Packet animation indicator bar */}
                {active && (
                  <motion.div
                    layoutId="active-bar"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#ff4800]"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Split Details: Live Console + Node Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Live Telemetry Terminal (7 Cols) */}
          <div className="lg:col-span-7 bg-black rounded-xl border border-white/10 p-5 font-mono text-xs flex flex-col h-[280px]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-white/40 text-[11px]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#ff4800]" />
                <span>LIVE DISPATCH TELEMETRY // STDOUT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400">STREAMING</span>
              </div>
            </div>

            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto space-y-2 pr-2 text-white/70 text-[11px] leading-relaxed scrollbar-thin"
            >
              {logs.length === 0 ? (
                <div className="text-white/30 italic">Click &quot;Trigger Request&quot; above to simulate dataflow...</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#ff4800] shrink-0">&gt;</span>
                    <span className={i === logs.length - 1 ? "text-white font-medium" : "text-white/60"}>
                      {log}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-white/10 mt-2 flex items-center justify-between text-[10px] text-white/40">
              <span>PROTOCOL: HTTP/2 + SSE + TLS 1.3</span>
              <span>BUFFER: DETERMINISTIC CHECKPOINT</span>
            </div>
          </div>

          {/* Node Spec Inspector (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0d0d12] rounded-xl border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] text-[#ff4800] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Activity size={12} />
                <span>NODE SPECIFICATION &amp; DECISION</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-1">
                {selectedNodeData.title}
              </h4>
              <div className="font-mono text-xs text-white/40 mb-4">
                {selectedNodeData.tech}
              </div>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                {selectedNodeData.details}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] space-y-2 font-mono text-xs">
              <div className="text-white/40 text-[10px] uppercase">
                ENGINEERING GUARANTEES
              </div>
              <div className="flex items-center justify-between text-white/80 text-[11px]">
                <span>State Consistency</span>
                <span className="text-emerald-400">Strict ACID / Snapshot</span>
              </div>
              <div className="flex items-center justify-between text-white/80 text-[11px]">
                <span>Idempotency Key</span>
                <span className="text-[#ff4800]">X-Request-Id Checked</span>
              </div>
              <div className="flex items-center justify-between text-white/80 text-[11px]">
                <span>Recovery Strategy</span>
                <span className="text-white/60">Postgres Replay Checkpointer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
