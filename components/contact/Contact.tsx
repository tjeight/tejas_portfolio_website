"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Send, Terminal, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";
import SectionTitle from "@/components/ui/SectionTitle";
import CanvasContainer from "@/components/3d/CanvasContainer";
import DigitalPlanet from "@/components/3d/DigitalPlanet";
import MagneticButton from "@/components/ui/MagneticButton";
import GlassCard from "@/components/ui/GlassCard";
import { Personal, SocialLink } from "@/types/portfolio";

interface ContactProps {
  personal: Personal;
  socials: SocialLink[];
}

export default function Contact({ personal, socials }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful submission
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          tag="09 // SECURE CHANNEL"
          title="LET'S BUILD SOMETHING."
          subtitle="Have a backend, AI, or infrastructure problem worth solving?"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Direct Links & 3D Digital Planet */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* 3D Planet Canvas */}
            <div className="w-full h-[360px] sm:h-[420px] rounded-2xl border border-white/[0.08] bg-slate-950/60 overflow-hidden relative mb-6">
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-[10px] text-cyan-300 font-bold tracking-widest uppercase">
                  GLOBAL NETWORK // PUNE NODE
                </span>
              </div>

              <CanvasContainer camera={{ position: [0, 0, 5], fov: 48 }}>
                <DigitalPlanet />
              </CanvasContainer>

              <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono text-slate-500 pointer-events-none">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  {personal.location}
                </span>
                <span className="text-emerald-400">LATENCY: OPTIMAL</span>
              </div>
            </div>

            {/* Quick Copy Email Strip */}
            <div className="w-full p-4 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-white truncate">
                  {personal.email}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-white/10 text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "COPIED" : "COPY"}</span>
              </button>
            </div>

            {/* Social Buttons */}
            <div className="w-full mt-4 flex flex-wrap items-center gap-3">
              {personal.github && (
                <MagneticButton
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                  className="flex-1"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </MagneticButton>
              )}

              {personal.linkedin && (
                <MagneticButton
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                  className="flex-1"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </MagneticButton>
              )}

              {personal.twitter && (
                <MagneticButton
                  href={personal.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                  className="flex-1"
                >
                  <TwitterIcon className="w-4 h-4" />
                  <span>Twitter / X</span>
                </MagneticButton>
              )}

              <MagneticButton
                href={`mailto:${personal.email}`}
                variant="primary"
                size="md"
                className="flex-1"
              >
                <Mail className="w-4 h-4" />
                <span>Email Me</span>
              </MagneticButton>
            </div>

            {/* Additional Social Handles from JSON */}
            {socials && socials.length > 0 && (
              <div className="w-full mt-3 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-slate-500">
                {socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {s.name}: {s.handle}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Interactive Dispatch Message Box */}
          <div className="lg:col-span-6">
            <GlassCard glow="cyan" className="p-6 sm:p-8 bg-slate-900/80 border-cyan-500/20">
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/10">
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  DIRECT TRANSMISSION FORM
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  END-TO-END ENCRYPTED
                </span>
              </div>

              {formSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-mono font-bold text-lg text-white">
                    TRANSMISSION RECEIVED
                  </h4>
                  <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto">
                    Thank you for reaching out. Your message packet has been logged, and I will respond to your coordinates within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-1.5">
                      YOUR IDENTIFIER / NAME:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-1.5">
                      TRANSMISSION EMAIL:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-1.5">
                      SYSTEM SPEC / MESSAGE:
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe the backend, AI agent, or distributed system challenge..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
                    data-cursor="TRANSMIT"
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT DISPATCH</span>
                  </button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>

        {/* System Footer */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>TEJAS JAGDALE // PRODUCTION PORTFOLIO v2.6</span>
          </div>

          <div className="flex items-center gap-4">
            <span>PUNE, INDIA</span>
            <span>•</span>
            <span>NEXT.JS × THREE.JS × TAILWIND</span>
            <span>•</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
