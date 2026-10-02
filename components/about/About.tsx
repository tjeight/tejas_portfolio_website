"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShieldCheck, MapPin, Activity, Cpu, CheckCircle2 } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { AboutData, Personal } from "@/types/portfolio";

interface AboutProps {
  aboutData: AboutData;
  personal: Personal;
}

export default function About({ aboutData, personal }: AboutProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt physics for the 3D identity card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/80">
      {/* Background glow spot */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={aboutData.sectionTag}
          title={aboutData.heading}
          subtitle="Engineering philosophy, autonomous agents, and systems-level mindset."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio & Core Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 rounded-xl border border-cyan-500/20 bg-slate-900/50 backdrop-blur-md"
            >
              <p className="text-base sm:text-lg text-cyan-200 font-sans font-medium leading-relaxed">
                {aboutData.intro}
              </p>
            </motion.div>

            <div className="space-y-4 text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
              {aboutData.bio.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {aboutData.highlights.map((highlight, i) => (
                <GlassCard key={i} glow="cyan" className="p-4 bg-slate-950/50">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-mono font-bold text-sm text-white">
                        {highlight.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 font-sans">
                        {highlight.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Floating Identity Card */}
          <div className="lg:col-span-5 flex justify-center [perspective:1000px]">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="w-full max-w-md relative select-none cursor-pointer"
              data-cursor="IDENTITY"
            >
              {/* Outer decorative cyber glow */}
              <div
                className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 opacity-30 blur-xl transition-opacity duration-500 ${
                  isHovered ? "opacity-75" : "opacity-30"
                }`}
              />

              <div className="relative rounded-2xl border border-cyan-400/40 bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.6)] [transform:translateZ(40px)]">
                {/* Card Top Header */}
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Cpu className="w-4 h-4 animate-spin-slow" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-cyan-400/80 tracking-widest block">
                        IDENTITY PROTOCOL
                      </span>
                      <span className="font-mono text-xs font-bold text-white tracking-wider">
                        {aboutData.identityCard.identifier}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{aboutData.identityCard.status}</span>
                  </div>
                </div>

                {/* Developer Name & Role */}
                <div className="mb-6">
                  <span className="font-mono text-[11px] text-slate-400 tracking-widest uppercase block mb-1">
                    ENGINEER PROFILE
                  </span>
                  <h3 className="font-mono font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {aboutData.identityCard.name}
                  </h3>
                  <p className="font-mono text-xs font-semibold text-cyan-400 tracking-wider mt-1">
                    {aboutData.identityCard.role}
                  </p>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-3.5 border-t border-white/[0.08] pt-4 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      LOCATION:
                    </span>
                    <span className="text-white font-semibold">
                      {aboutData.identityCard.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                      CLEARANCE:
                    </span>
                    <span className="text-cyan-300 font-semibold">
                      {aboutData.identityCard.clearance}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-sky-400" />
                      EXPERIENCE:
                    </span>
                    <span className="text-white font-semibold">
                      {personal.experienceYears} Years Production
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] text-slate-400 block mb-1">
                      CORE RUNTIME:
                    </span>
                    <div className="p-2 rounded bg-slate-950 border border-white/[0.06] text-[11px] text-cyan-300 break-all font-mono">
                      {aboutData.identityCard.runtime}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">
                      SYSTEM DOMAIN:
                    </span>
                    <div className="p-2 rounded bg-slate-950 border border-white/[0.06] text-[11px] text-slate-300 font-mono">
                      {aboutData.identityCard.architecture}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>3D TILT ENABLED</span>
                  <span className="text-cyan-400">SECURE // ENCRYPTED</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
