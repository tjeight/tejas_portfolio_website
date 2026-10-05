"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { playActionPing, playSubtleClick } from "@/components/SoundEffects";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    playActionPing();
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact" className="relative pt-32 pb-24 lg:pt-44 lg:pb-36 bg-[#0c0c0e] text-white overflow-hidden technical-grid border-b border-[#222228]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-400 mb-12">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CURRENT STATUS: AVAILABLE FOR OPPORTUNITIES</span>
        </div>

        {/* Large Typography Statement */}
        <div className="max-w-5xl mb-12">
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white uppercase leading-[0.92]">
            HAVE AN IDEA <br />
            WORTH{" "}
            <span className="font-serif-italic font-normal lowercase tracking-normal text-white">
              building<span className="text-[#ff4d00] font-sans">?</span>
            </span>
          </h2>
          <p className="text-2xl sm:text-4xl text-white/50 font-light mt-8">
            Let&apos;s turn it into a system<span className="text-[#ff4d00]">.</span>
          </p>
        </div>

        {/* Action Links: EMAIL ↗, LINKEDIN ↗, GITHUB ↗ */}
        <div className="flex flex-wrap items-center gap-4 pt-4 mb-20">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            onClick={() => playSubtleClick()}
            data-cursor="TALK"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#ff4d00] hover:bg-[#ff621e] text-black font-mono text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-xl shadow-[#ff4d00]/20"
          >
            <span>EMAIL</span>
            <ArrowUpRight size={15} />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSubtleClick()}
            data-cursor="LINK"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/30 font-mono text-xs font-medium tracking-wider uppercase transition-all duration-200"
          >
            <LinkedinIcon size={14} />
            <span>LINKEDIN</span>
            <ArrowUpRight size={14} className="text-[#ff4d00]" />
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSubtleClick()}
            data-cursor="LINK"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/30 font-mono text-xs font-medium tracking-wider uppercase transition-all duration-200"
          >
            <GithubIcon size={14} />
            <span>GITHUB</span>
            <ArrowUpRight size={14} className="text-[#ff4d00]" />
          </a>

          <button
            onClick={handleCopyEmail}
            data-cursor="COPY"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-transparent hover:bg-white/[0.04] text-white/50 hover:text-white border border-white/10 font-mono text-xs tracking-wider transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400 font-semibold">COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>{PERSONAL_INFO.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Terminating System Pulse Motif */}
        <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10 select-none">
          <div className="font-mono text-[9px] tracking-widest text-white/30 uppercase mb-4">
            SYSTEM PULSE // TERMINATION POINT
          </div>
          <div className="w-[1.5px] h-20 bg-gradient-to-b from-[#ff4d00] to-transparent relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ff4d00] ring-4 ring-[#ff4d00]/30 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
