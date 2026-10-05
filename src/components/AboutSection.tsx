"use client";

import { useState } from "react";
import { Shuffle, Layers } from "lucide-react";
import { playSubtleClick } from "@/components/SoundEffects";

export function AboutSection() {
  const [isSimpleMode, setIsSimpleMode] = useState(true);

  const toggleComplexity = () => {
    playSubtleClick();
    setIsSimpleMode((prev) => !prev);
  };

  const coreFocus = [
    "Backend Engineering",
    "AI Agents",
    "Distributed Systems",
    "Data Infrastructure",
  ];

  return (
    <section id="about" className="relative py-28 lg:py-36 bg-[#fbfbf9] text-[#121215] border-b border-[#e6e4df]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#ff4d00] uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
          <span>04 // ABOUT</span>
        </div>

        {/* Large Editorial Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#121215] leading-[1.02]">
            I turn complex systems into{" "}
            <span className="font-serif-italic font-normal lowercase tracking-normal text-[#121215]">
              simple products<span className="text-[#ff4d00] font-sans">.</span>
            </span>
          </h2>
        </div>

        {/* 2-Column Grid: Copy (7 Cols) + Interactive Visual (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#121215]/80 font-normal leading-relaxed">
            <p>
              I&apos;m a Backend &amp; AI Engineer focused on building reliable software, from high-performance APIs and data systems to AI-powered workflows.
            </p>

            <p>
              I enjoy working where backend engineering, system architecture, and intelligent products meet.
            </p>

            {/* Core Focus Block (Clean & readable to recruiters, founders, engineers) */}
            <div className="pt-6 border-t border-[#e6e4df]">
              <div className="font-mono text-xs text-[#ff4d00] uppercase tracking-widest mb-4 font-semibold">
                CORE FOCUS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-[#121215]">
                {coreFocus.map((focus) => (
                  <div key={focus} className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-[#e6e4df] shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
                    <span className="font-medium">{focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Interactive Complex -> Simple System Transformation Visual */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#e6e4df] bg-white p-7 shadow-sm space-y-6 relative overflow-hidden select-none">
              {/* Header with Switcher Button */}
              <div className="flex items-center justify-between pb-4 border-b border-[#e6e4df]">
                <div>
                  <div className="text-xs font-bold text-[#121215] font-mono tracking-wider">
                    SYSTEM ARCHITECTURE
                  </div>
                  <div className="text-[10px] text-[#121215]/40 font-mono">
                    {isSimpleMode ? "CLEAN & INTENTIONAL" : "UNCHECKED COMPLEXITY"}
                  </div>
                </div>

                <button
                  onClick={toggleComplexity}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121215] text-white hover:bg-[#ff4d00] font-mono text-[10px] uppercase tracking-wider transition-colors"
                >
                  {isSimpleMode ? <Shuffle size={11} /> : <Layers size={11} />}
                  <span>{isSimpleMode ? "MAKE COMPLEX" : "SIMPLIFY"}</span>
                </button>
              </div>

              {/* Dynamic SVG Canvas demonstrating transformation */}
              <div className="h-56 w-full rounded-xl bg-[#0c0c0e] p-4 flex items-center justify-center relative overflow-hidden">
                <svg viewBox="0 0 320 200" className="w-full h-full">
                  {isSimpleMode ? (
                    /* Simple Mode: Aligned, Linear, Layered Architecture */
                    <g className="transition-all duration-500">
                      {/* 3 Clean Horizontal Rails */}
                      <line x1="40" y1="50" x2="280" y2="50" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
                      <line x1="40" y1="100" x2="280" y2="100" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
                      <line x1="40" y1="150" x2="280" y2="150" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />

                      {/* Clean Downward Pulse Flow */}
                      <line x1="160" y1="50" x2="160" y2="150" stroke="#ff4d00" strokeWidth="1.5" strokeDasharray="4 4" />

                      {/* Aligned Nodes */}
                      <circle cx="80" cy="50" r="5" fill="#ffffff" />
                      <circle cx="160" cy="50" r="6" fill="#ff4d00" />
                      <circle cx="240" cy="50" r="5" fill="#ffffff" />

                      <rect x="135" y="88" width="50" height="24" rx="4" fill="#ff4d00" fillOpacity="0.2" stroke="#ff4d00" strokeWidth="1" />
                      <text x="160" y="104" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">
                        RUNTIME
                      </text>

                      <circle cx="100" cy="150" r="5" fill="#ffffff" />
                      <circle cx="160" cy="150" r="6" fill="#ff4d00" />
                      <circle cx="220" cy="150" r="5" fill="#ffffff" />

                      <text x="160" y="180" fill="#ff4d00" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                        ORDER // CALM EXECUTION
                      </text>
                    </g>
                  ) : (
                    /* Complex Mode: Tangled, Entangled Distributed Cluster */
                    <g className="transition-all duration-500">
                      <line x1="50" y1="40" x2="220" y2="160" stroke="#ff4d00" strokeWidth="0.75" strokeOpacity="0.6" strokeDasharray="3 3" />
                      <line x1="220" y1="40" x2="70" y2="150" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.3" />
                      <line x1="160" y1="30" x2="140" y2="170" stroke="#ff4d00" strokeWidth="0.75" strokeOpacity="0.6" />
                      <line x1="40" y1="120" x2="270" y2="80" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.3" />
                      <line x1="90" y1="60" x2="240" y2="130" stroke="#ff4d00" strokeWidth="0.75" strokeOpacity="0.4" />

                      <circle cx="50" cy="40" r="4" fill="#ff4d00" />
                      <circle cx="160" cy="30" r="5" fill="#ffffff" />
                      <circle cx="220" cy="40" r="4" fill="#ff4d00" />
                      <circle cx="40" cy="120" r="5" fill="#ffffff" />
                      <circle cx="140" cy="110" r="6" fill="#ff4d00" />
                      <circle cx="270" cy="80" r="4" fill="#ffffff" />
                      <circle cx="70" cy="150" r="5" fill="#ffffff" />
                      <circle cx="140" cy="170" r="4" fill="#ff4d00" />
                      <circle cx="220" cy="160" r="5" fill="#ffffff" />

                      <text x="160" y="190" fill="#ffffff" fillOpacity="0.5" fontSize="10" fontFamily="monospace" textAnchor="middle">
                        CHAOS // ACCIDENTAL COMPLEXITY
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Caption */}
              <div className="text-xs font-mono text-[#121215]/70 italic leading-relaxed">
                {isSimpleMode
                  ? "Disciplined design turns complex systems into calm, intuitive products."
                  : "Unchecked complexity creates fragile connections and obscure failure modes."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
