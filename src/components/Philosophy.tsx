"use client";

import { PHILOSOPHY_PRINCIPLES } from "@/data/portfolioData";

export function Philosophy() {
  return (
    <section className="relative py-24 lg:py-32 border-b border-white/[0.06] bg-[#070709]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#ff4800] uppercase tracking-wider mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4800]" />
          <span>06 // Engineering Principles</span>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[1.08]">
            How I Think <br />
            About Systems<span className="text-[#ff4800]">.</span>
          </h2>
          <p className="mt-4 font-mono text-xs text-white/50 leading-relaxed">
            Architectural convictions forged through building, testing, and debugging production software.
          </p>
        </div>

        {/* Grid of Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PHILOSOPHY_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-sm text-[#ff4800] font-bold mb-4">
                  PRINCIPLE // {principle.number}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#ff4800] transition-colors mb-2">
                  {principle.title}
                </h3>

                <div className="font-mono text-xs text-white/80 font-medium mb-6">
                  {principle.thesis}
                </div>

                <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
                  {principle.elaboration}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-white/30">
                <span>DISCIPLINE OVER CLEVERNESS</span>
                <span className="group-hover:text-white/60 transition-colors">SYS_PRINCIPLE_{principle.number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
