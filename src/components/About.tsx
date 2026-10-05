"use client";

import { useEffect, useState } from "react";
import { Globe, MapPin } from "lucide-react";

export function About() {
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST (UTC+5:30)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setIstTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const coreFocusAreas = [
    {
      title: "Backend Engineering & Concurrency",
      description: "Writing clean, asynchronous Python 3.12 and FastAPI services that handle heavy concurrent workloads with predictable low latency."
    },
    {
      title: "Stateful AI & Agent Graphs",
      description: "Building autonomous multi-agent pipelines with LangGraph, deterministic state checkpoints, tool calling, and guardrails against hallucination."
    },
    {
      title: "Databases & In-Memory Systems",
      description: "Designing relational schemas in PostgreSQL, optimizing complex queries, and leveraging Redis for high-speed distributed locking and streams."
    },
    {
      title: "Product Thinking & Pragmatism",
      description: "Translating ambiguous product requirements into disciplined technical architectures without unnecessary bloat or premature complexity."
    }
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#ff4800] uppercase tracking-wider mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4800]" />
          <span>03 // Engineering Profile</span>
        </div>

        {/* Big Editorial Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            I like turning complex systems into simple products<span className="text-[#ff4800]">.</span>
          </h2>
        </div>

        {/* Editorial Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Narrative Story (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-white/70 font-light leading-relaxed">
            <p>
              I am a Backend and AI Engineer who builds software at the intersection of robust backend infrastructure and autonomous intelligence. My focus is on scalable backend systems, stateful AI agents, and intelligent products that survive the realities of production.
            </p>

            <p>
              Rather than treating AI as a black-box wrapper, I approach agent systems through an engineering lens: deterministic state transitions, cyclic graph topologies with LangGraph, transparent trace telemetry, and reliable recovery checkpoints saved directly to relational persistence.
            </p>

            <p>
              My backend work centers on asynchronous Python runtimes, resilient API contracts, database schema optimization in PostgreSQL, and low-latency caching architectures using Redis. I care deeply about clean boundaries, predictable error handling, and architectures that are simple to reason about at 2:00 AM.
            </p>

            <div className="pt-6 border-t border-white/[0.08]">
              <h3 className="font-mono text-xs uppercase tracking-wider text-white/40 mb-6">
                Core Engineering Competencies
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {coreFocusAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-white/20 transition-colors"
                  >
                    <div className="font-mono text-xs text-[#ff4800] font-bold mb-2">
                      0{idx + 1}
                    </div>
                    <div className="font-semibold text-sm text-white mb-1.5">
                      {area.title}
                    </div>
                    <div className="text-xs text-white/60 leading-relaxed font-light">
                      {area.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Passport / Spec Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/15 bg-[#0e0e13] p-7 shadow-2xl space-y-6 overflow-hidden">
              {/* Corner crosshairs */}
              <span className="absolute top-2 left-2 font-mono text-[9px] text-white/20">+</span>
              <span className="absolute top-2 right-2 font-mono text-[9px] text-white/20">+</span>
              <span className="absolute bottom-2 left-2 font-mono text-[9px] text-white/20">+</span>
              <span className="absolute bottom-2 right-2 font-mono text-[9px] text-white/20">+</span>

              {/* Passport Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ff4800]/15 border border-[#ff4800]/40 flex items-center justify-center font-bold font-mono text-sm text-[#ff4800]">
                    TJ
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white tracking-wide">
                      TEJAS JAGDALE
                    </div>
                    <div className="text-[11px] font-mono text-white/40">
                      SYS.ENGINEER // ID_8829
                    </div>
                  </div>
                </div>

                <div className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  AVAILABLE
                </div>
              </div>

              {/* Live Location & Clock */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-white/40 flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#ff4800]" /> Location
                  </span>
                  <span className="text-white/80">India (Lat 18.52° N)</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-white/40 flex items-center gap-1.5">
                    <Globe size={13} className="text-[#ff4800]" /> Timezone
                  </span>
                  <span className="text-white/80">IST (UTC+5:30)</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-white/40">Local Time</span>
                  <span className="text-emerald-400 font-bold tracking-wider">
                    {istTime || "18:33:05"} IST
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-white/40">Core Specialization</span>
                  <span className="text-white/80">Backend · AI Agents · APIs</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-white/40">Primary Language</span>
                  <span className="text-[#ff4800]">Python 3.12 (AsyncIO)</span>
                </div>
              </div>

              {/* Quotation / Philosophy micro-block */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-white/70 italic">
                &ldquo;Clean architecture is not about writing dogmatic boilerplate. It is about making change trivial and failure predictable.&rdquo;
              </div>

              <div className="pt-2 text-center">
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-white/[0.05] hover:bg-[#ff4800] text-white hover:text-black font-mono text-xs font-medium tracking-wider uppercase transition-all duration-200 border border-white/10 hover:border-transparent"
                >
                  Initiate Direct Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
