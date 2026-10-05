"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { playActionPing, playSubtleClick } from "@/components/SoundEffects";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Backend Infrastructure",
    message: ""
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    playActionPing();
    setTimeout(() => setCopied(false), 2400);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    playActionPing();
    setFormSent(true);
  };

  return (
    <section id="contact" className="relative py-28 lg:py-36 border-b border-white/[0.06] overflow-hidden">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>CURRENT STATUS: AVAILABLE FOR SELECT OPPORTUNITIES</span>
        </div>

        {/* Huge Bold Headline */}
        <div className="max-w-4xl mb-12">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.03]">
            Have a system <br />
            worth building<span className="text-[#ff4800]">?</span>
          </h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-white/50 font-light mt-4">
            Let&apos;s build it<span className="text-[#ff4800]">.</span>
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Direct Channels (6 Cols) */}
          <div className="lg:col-span-6 space-y-8">
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
              Whether you are scaling a mission-critical backend, engineering an autonomous multi-agent pipeline, or designing a high-throughput API from scratch — my inbox is open.
            </p>

            {/* Email Action Block */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
                Direct Communication Channel
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onClick={() => playSubtleClick()}
                  className="text-lg sm:text-xl font-mono font-medium text-white hover:text-[#ff4800] transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-[#ff4800] text-white hover:text-black font-mono text-xs font-medium tracking-wider uppercase transition-all duration-200 border border-white/10 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSubtleClick()}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#ff4800]/50 text-xs font-mono font-medium tracking-wider uppercase transition-all"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
                <ArrowUpRight size={13} className="text-[#ff4800]" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSubtleClick()}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 hover:border-[#ff4800]/50 text-xs font-mono font-medium tracking-wider uppercase transition-all"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} className="text-[#ff4800]" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onClick={() => playSubtleClick()}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#ff4800] text-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-white transition-all shadow-lg shadow-[#ff4800]/25"
              >
                <Mail size={16} />
                <span>Email Me</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Quick Message Dispatch Form (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-white/15 bg-[#0e0e13] p-7 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6 font-mono text-xs">
                <span className="text-white/60">SYS.DISPATCH // QUICK INQUIRY</span>
                <span className="text-[#ff4800]">FAST RESPONSE</span>
              </div>

              {formSent ? (
                <div className="py-12 text-center space-y-3 font-mono">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                    <Check size={24} />
                  </div>
                  <div className="text-lg font-bold text-white">
                    Transmission Dispatched
                  </div>
                  <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                    Thank you. Your message has been received. I will review your requirements and respond promptly.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="mt-4 px-4 py-2 rounded bg-white/10 text-white text-xs hover:bg-white/20 transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-white/50 text-[11px] mb-1.5 uppercase">
                      Your Name / Organization
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance, Horizon Labs"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white placeholder-white/25 focus:border-[#ff4800] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-[11px] mb-1.5 uppercase">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white placeholder-white/25 focus:border-[#ff4800] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-[11px] mb-1.5 uppercase">
                      System Architecture Focus
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white focus:border-[#ff4800] focus:outline-none transition-colors"
                    >
                      <option value="Backend Infrastructure">Backend Architecture &amp; APIs</option>
                      <option value="Autonomous AI Agents">Autonomous AI Agent Workflows (LangGraph)</option>
                      <option value="Database & Caching">Database Optimization &amp; Caching (PostgreSQL/Redis)</option>
                      <option value="Full-Stack Engineering">Full-Stack SaaS (Next.js + Python)</option>
                      <option value="Engineering Consultation">Technical Consultation &amp; Audit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/50 text-[11px] mb-1.5 uppercase">
                      Project Scope &amp; Architecture Notes
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Briefly outline system scale, concurrency requirements, or target timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/10 text-white placeholder-white/25 focus:border-[#ff4800] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#ff4800] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Transmit Message</span>
                    <Send size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
