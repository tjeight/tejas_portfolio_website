"use client";

import { useState } from "react";
import { Project } from "@/types/portfolio";
import { 
  GitMerge, Server, Database, Activity, 
  ArrowRight, CheckCircle2, Lock, HeartPulse, Search
} from "lucide-react";

interface VisualProps {
  project: Project;
  isHovered: boolean;
}

export function ProjectVisualPreview({ project, isHovered }: VisualProps) {
  // Render bespoke technical diagram based on project ID
  switch (project.id) {
    case "inframind":
      return <InfraMindVisual isHovered={isHovered} />;
    case "rednet":
      return <RedNetVisual isHovered={isHovered} />;
    case "market-analytics-agent":
      return <MarketAgentVisual isHovered={isHovered} />;
    case "authx":
      return <AuthXVisual isHovered={isHovered} />;
    default:
      return <DefaultVisual project={project} isHovered={isHovered} />;
  }
}

function InfraMindVisual({ isHovered }: { isHovered: boolean }) {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className={`w-full h-full min-h-[380px] lg:min-h-[440px] bg-[#0c0c10] border rounded-xl p-6 flex flex-col justify-between overflow-hidden relative group transition-colors duration-300 ${isHovered ? "border-[#ff4800]/40 shadow-2xl" : "border-white/10"}`}>
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="p-1.5 rounded bg-[#ff4800]/15 text-[#ff4800] border border-[#ff4800]/30">
            <GitMerge size={14} />
          </span>
          <span className="text-white/80 font-medium">InfraMind // LangGraph Cyclic Runtime</span>
        </div>
        <div className="font-mono text-[10px] text-white/40 flex items-center gap-2">
          <span>CHECKPOINT: PG_SAVER</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Center Graph Node Representation */}
      <div className="relative z-10 my-auto py-6">
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Node 1: Ingestion */}
          <div
            onMouseEnter={() => setActiveStep(0)}
            className={`p-4 rounded-lg border transition-all duration-300 font-mono text-xs ${
              activeStep === 0
                ? "bg-[#ff4800]/10 border-[#ff4800] text-white shadow-lg shadow-[#ff4800]/20"
                : "bg-white/[0.03] border-white/10 text-white/60"
            }`}
          >
            <div className="text-[10px] text-white/40 mb-1 flex items-center justify-between">
              <span>01 / INGESTION</span>
              <Server size={12} />
            </div>
            <div className="font-bold text-white mb-1">FastAPI Gateway</div>
            <div className="text-[10px] text-white/50">Async Pydantic v2 / Task Dispatch</div>
          </div>

          {/* Node 2: Cyclic Agent Loop */}
          <div
            onMouseEnter={() => setActiveStep(1)}
            className={`p-4 rounded-lg border transition-all duration-300 font-mono text-xs relative ${
              activeStep === 1
                ? "bg-[#ff4800]/15 border-[#ff4800] text-white shadow-xl shadow-[#ff4800]/25 scale-105"
                : "bg-white/[0.03] border-white/10 text-white/60"
            }`}
          >
            <div className="text-[10px] text-[#ff4800] mb-1 flex items-center justify-between">
              <span>02 / CYCLIC DAG</span>
              <Activity size={12} className="animate-spin text-[#ff4800]" />
            </div>
            <div className="font-bold text-white mb-1">LangGraph Engine</div>
            <div className="text-[10px] text-white/50">Cyclic State Machine &amp; Tools</div>
            <div className="mt-2 text-[9px] px-2 py-0.5 bg-[#ff4800]/20 text-[#ff4800] rounded inline-block">
              RETRY &lt;= 3 CYCLES
            </div>
          </div>

          {/* Node 3: Checkpointing */}
          <div
            onMouseEnter={() => setActiveStep(2)}
            className={`p-4 rounded-lg border transition-all duration-300 font-mono text-xs ${
              activeStep === 2
                ? "bg-emerald-500/15 border-emerald-500 text-white shadow-lg"
                : "bg-white/[0.03] border-white/10 text-white/60"
            }`}
          >
            <div className="text-[10px] text-white/40 mb-1 flex items-center justify-between">
              <span>03 / PERSISTENCE</span>
              <Database size={12} />
            </div>
            <div className="font-bold text-white mb-1">Postgres Saver</div>
            <div className="text-[10px] text-white/50">Atomic Checkpoint Serialization</div>
          </div>
        </div>

        {/* Animated Flow Arrow */}
        <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] text-white/40">
          <span>EVENT STREAM</span>
          <span className="text-[#ff4800]">→</span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">
            Redis Lock: `worker_node_04`
          </span>
          <span className="text-[#ff4800]">→</span>
          <span className="text-emerald-400">STATE REPLAY DETERMINISTIC</span>
        </div>
      </div>

      {/* Bottom Code / Terminal snippet */}
      <div className="relative z-10 bg-black/60 rounded-lg p-3.5 border border-white/[0.07] font-mono text-[11px] text-white/70">
        <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
          <span>runtime_checkpoint.log</span>
          <span className="text-emerald-400">STATUS: RECOVERABLE (0 DATA LOSS)</span>
        </div>
        <code className="text-white/60 text-[10px] block">
          &gt; state_graph.compile(checkpointer=PostgresSaver(pool), interrupt_before=[&quot;human_eval&quot;])
        </code>
      </div>
    </div>
  );
}

function RedNetVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`w-full h-full min-h-[380px] lg:min-h-[440px] bg-[#0c0c10] border rounded-xl p-6 flex flex-col justify-between overflow-hidden relative transition-colors duration-300 ${isHovered ? "border-red-500/40 shadow-2xl" : "border-white/10"}`}>
      <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="p-1.5 rounded bg-red-500/15 text-red-400 border border-red-500/30">
            <HeartPulse size={14} />
          </span>
          <span className="text-white/80 font-medium">RedNet // Real-Time Blood Stock &amp; Spatial Matcher</span>
        </div>
        <div className="font-mono text-[10px] text-red-400/80 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
          EMERGENCY DISPATCH
        </div>
      </div>

      {/* Spatial Query Visual */}
      <div className="relative z-10 my-auto py-4 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
          <div className="p-3 rounded border border-white/10 bg-white/[0.02]">
            <div className="text-[10px] text-white/40">BLOOD GROUP</div>
            <div className="text-lg font-bold text-red-400">O-Negative</div>
            <div className="text-[10px] text-emerald-400">Universal Donor</div>
          </div>
          <div className="p-3 rounded border border-white/10 bg-white/[0.02]">
            <div className="text-[10px] text-white/40">GEO-RADIUS</div>
            <div className="text-lg font-bold text-white">8.4 km</div>
            <div className="text-[10px] text-white/40">PostGIS Stored Proc</div>
          </div>
          <div className="p-3 rounded border border-white/10 bg-white/[0.02]">
            <div className="text-[10px] text-white/40">MATCHED DONORS</div>
            <div className="text-lg font-bold text-white">14 Active</div>
            <div className="text-[10px] text-emerald-400">SMS / WS Pinged</div>
          </div>
          <div className="p-3 rounded border border-white/10 bg-white/[0.02]">
            <div className="text-[10px] text-white/40">LATENCY</div>
            <div className="text-lg font-bold text-white">&lt; 380ms</div>
            <div className="text-[10px] text-white/40">Multi-tenant RLS</div>
          </div>
        </div>

        {/* Spatial Radar simulation */}
        <div className="p-4 rounded-lg bg-black/40 border border-white/[0.08] font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-white/60 mb-2">
            <span>SPATIAL CLUSTER DISPATCH PIPELINE</span>
            <span className="text-white/40">EPSG:4326 WGS 84</span>
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between text-white/70">
              <span>HOSPITAL NODE [Apollo Regional Trauma]</span>
              <span className="text-red-400">CRITICAL DEMAND (3 UNITS)</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-[#ff4800] h-full w-4/5 animate-pulse" />
            </div>
            <div className="flex justify-between text-white/40 text-[9px] pt-1">
              <span>Supabase Realtime WebSockets: 14 hospitals connected</span>
              <span className="text-emerald-400">Auditable Cold-Chain Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-black/60 rounded p-3 border border-white/[0.07] font-mono text-[10px] text-white/60 flex items-center justify-between">
        <span>SECURITY: PostgreSQL Row-Level Security isolation per hospital network</span>
        <span className="text-emerald-400 font-bold">100% COMPLIANT</span>
      </div>
    </div>
  );
}

function MarketAgentVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`w-full h-full min-h-[380px] lg:min-h-[440px] bg-[#0c0c10] border rounded-xl p-6 flex flex-col justify-between overflow-hidden relative transition-colors duration-300 ${isHovered ? "border-emerald-500/40 shadow-2xl" : "border-white/10"}`}>
      <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="p-1.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Search size={14} />
          </span>
          <span className="text-white/80 font-medium">Market Analytics // Multi-Agent Pipeline</span>
        </div>
        <div className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          ZERO-HALLUCINATION POLICY
        </div>
      </div>

      {/* Pipeline representation */}
      <div className="relative z-10 my-auto py-4 space-y-3 font-mono">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full p-3 rounded bg-white/[0.03] border border-white/10 text-xs">
            <div className="text-[10px] text-white/40 mb-1">AGENT 01</div>
            <div className="font-bold text-white">Crawler &amp; Ingestion</div>
            <div className="text-[10px] text-white/50">SEC 10-K, News, Transcripts</div>
          </div>
          <ArrowRight size={14} className="text-[#ff4800] hidden sm:block" />
          <div className="flex-1 w-full p-3 rounded bg-white/[0.03] border border-emerald-500/40 text-xs">
            <div className="text-[10px] text-emerald-400 mb-1">AGENT 02</div>
            <div className="font-bold text-white">Fact Validator</div>
            <div className="text-[10px] text-white/50">Cross-Verification &amp; Citations</div>
          </div>
          <ArrowRight size={14} className="text-[#ff4800] hidden sm:block" />
          <div className="flex-1 w-full p-3 rounded bg-white/[0.03] border border-white/10 text-xs">
            <div className="text-[10px] text-white/40 mb-1">AGENT 03</div>
            <div className="font-bold text-white">Report Synthesizer</div>
            <div className="text-[10px] text-white/50">Structured JSON &amp; Markdown</div>
          </div>
        </div>

        {/* Verification metrics table */}
        <div className="p-3.5 rounded bg-black/50 border border-white/[0.07] text-[10px] space-y-2">
          <div className="flex items-center justify-between text-white/50">
            <span>CLAIM VERIFICATION &amp; CONFIDENCE MATRIX</span>
            <span className="text-emerald-400">CONFIDENCE: 94.6%</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02]">
            <span className="text-white/80">&quot;Q3 Operating Margin improved by 420 bps&quot;</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={12} /> CITED (SEC 10-Q p.18)
            </span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02]">
            <span className="text-white/80">&quot;Cloud ARR exceeded $840M target&quot;</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={12} /> CITED (Earnings Call line 142)
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-black/60 rounded p-3 border border-white/[0.07] font-mono text-[10px] text-white/60 flex items-center justify-between">
        <span>SCHEMA: Pydantic Strict JSON Mode + AsyncIO Parallelism</span>
        <span className="text-white/40">Python 3.12 / LangGraph</span>
      </div>
    </div>
  );
}

function AuthXVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className={`w-full h-full min-h-[380px] lg:min-h-[440px] bg-[#0c0c10] border rounded-xl p-6 flex flex-col justify-between overflow-hidden relative transition-colors duration-300 ${isHovered ? "border-blue-500/40 shadow-2xl" : "border-white/10"}`}>
      <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="p-1.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Lock size={14} />
          </span>
          <span className="text-white/80 font-medium">AuthX // Zero-Trust Microservice</span>
        </div>
        <div className="font-mono text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
          2,400+ REQ/SEC BENCHMARK
        </div>
      </div>

      {/* Security Architecture */}
      <div className="relative z-10 my-auto py-4 space-y-3 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded bg-white/[0.03] border border-white/10">
            <div className="text-[10px] text-white/40 mb-1">CRYPTOGRAPHY</div>
            <div className="font-bold text-white">RS256 JWT</div>
            <div className="text-[10px] text-blue-400">Asymmetric Key Pair</div>
          </div>
          <div className="p-3 rounded bg-white/[0.03] border border-white/10">
            <div className="text-[10px] text-white/40 mb-1">REVOCATION</div>
            <div className="font-bold text-white">Redis Blacklist</div>
            <div className="text-[10px] text-emerald-400">Sub-2ms Lookup O(1)</div>
          </div>
          <div className="p-3 rounded bg-white/[0.03] border border-white/10">
            <div className="text-[10px] text-white/40 mb-1">PROTECTION</div>
            <div className="font-bold text-white">Sliding Window</div>
            <div className="text-[10px] text-[#ff4800]">Sorted Set Limiter</div>
          </div>
        </div>

        {/* Live JWKS Verification Box */}
        <div className="p-4 rounded-lg bg-black/50 border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-[10px] text-white/50">
            <span>ZERO-DB DOWNSTREAM VERIFICATION</span>
            <span className="text-emerald-400">/.well-known/jwks.json</span>
          </div>
          <div className="font-mono text-[10px] text-white/70 bg-white/[0.02] p-2.5 rounded border border-white/5">
            <code>
              {`Downstream Service -> Local Public Key Cache -> Verify Signature (0ms Network latency)`}
            </code>
          </div>
          <div className="text-[10px] text-white/40 flex items-center justify-between pt-1">
            <span>Password Hashing: Argon2id (m=65536, t=3, p=4)</span>
            <span className="text-blue-400">Token Rotation Active</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-black/60 rounded p-3 border border-white/[0.07] font-mono text-[10px] text-white/60 flex items-center justify-between">
        <span>FastAPI + Uvicorn + uvloop runtime</span>
        <span className="text-emerald-400 font-bold">PRODUCTION VERIFIED</span>
      </div>
    </div>
  );
}

function DefaultVisual({ project, isHovered }: { project: Project; isHovered: boolean }) {
  return (
    <div className={`w-full h-full min-h-[380px] bg-[#0c0c10] border rounded-xl p-6 flex items-center justify-center font-mono text-sm text-white/60 transition-colors ${isHovered ? "border-white/30" : "border-white/10"}`}>
      {project.title} Architectural Specification
    </div>
  );
}
