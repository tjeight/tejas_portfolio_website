"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { playSubtleClick } from "@/components/SoundEffects";

export function BuiltWithIntent() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const principles = [
    {
      num: "01",
      title: "ARCHITECTURE",
      thesis: "Good systems make complexity understandable.",
    },
    {
      num: "02",
      title: "RELIABILITY",
      thesis: "Predictable failure is better than surprising success.",
    },
    {
      num: "03",
      title: "PRODUCT",
      thesis: "Engineering should solve the user's problem.",
    },
  ];

  return (
    <section className="relative py-28 lg:py-36 bg-[#0c0c0e] text-white border-b border-[#222228] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#ff4d00] uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
          <span>03 // MANIFESTO</span>
        </div>

        {/* Large Typography Statement */}
        <div className="mb-20">
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold tracking-tight uppercase leading-[0.9] text-white">
            NOT JUST <br />
            <span className="font-serif-italic font-normal lowercase tracking-normal text-[#ff4d00]">
              code<span className="text-white font-sans">.</span>
            </span>
          </h2>
        </div>

        {/* 3 Principles (Exact prompt match, zero long paragraphs) */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {principles.map((item, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.num}
                onMouseEnter={() => {
                  playSubtleClick();
                  setHoveredIndex(index);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`py-10 sm:py-12 transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-8 ${
                  isHovered ? "pl-4 bg-white/[0.02]" : ""
                }`}
              >
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span
                    className={`font-mono text-xs sm:text-sm font-bold tracking-wider transition-colors duration-200 ${
                      isHovered ? "text-[#ff4d00]" : "text-white/30"
                    }`}
                  >
                    {item.num}
                  </span>
                  <h3
                    className={`text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase transition-colors duration-200 ${
                      isHovered ? "text-white translate-x-2" : "text-white/70"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                <div className="md:max-w-md font-mono text-sm sm:text-base text-white/60 font-light leading-relaxed flex items-center justify-between gap-4">
                  <p className={isHovered ? "text-white" : ""}>
                    {item.thesis}
                  </p>
                  <ArrowUpRight
                    size={16}
                    className={`text-[#ff4d00] shrink-0 transition-all duration-200 ${
                      isHovered ? "opacity-100 translate-x-1 -translate-y-1" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
