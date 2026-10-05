"use client";

import { PERSONAL_INFO } from "@/data/portfolioData";
import { playSubtleClick } from "@/components/SoundEffects";

export function Footer() {
  return (
    <footer className="relative py-12 bg-[#060608] text-white border-t border-white/[0.06] select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs">
        {/* Left: Name & Title */}
        <div>
          <div className="font-bold tracking-tight text-white uppercase text-sm">
            TEJAS JAGDALE
          </div>
          <div className="text-white/50 text-[11px] mt-0.5">
            Backend &amp; AI Engineer
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4 text-white/60">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSubtleClick()}
            className="hover:text-[#ff4d00] transition-colors"
          >
            GitHub
          </a>
          <span className="text-white/20">·</span>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSubtleClick()}
            className="hover:text-[#ff4d00] transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-white/20">·</span>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            onClick={() => playSubtleClick()}
            className="hover:text-[#ff4d00] transition-colors"
          >
            Email
          </a>
        </div>

        {/* Right: Year */}
        <div className="text-white/40">
          &copy; 2026
        </div>
      </div>
    </footer>
  );
}
