"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function SystemPulse() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const pulseTop = useTransform(
    smoothProgress,
    (v: number) => `${Math.min(94, Math.max(0, v * 100))}%`
  );

  const [phase, setPhase] = useState("IDEA");

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) {
        setPhase("IDEA");
      } else if (latest < 0.7) {
        setPhase("SYSTEM");
      } else {
        setPhase("EXECUTION");
      }
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Top micro progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#ff4d00] origin-left z-50 pointer-events-none"
        style={{ scaleX: smoothProgress }}
      />

      {/* Left Vertical Spine Guide Line (Desktop Signature Motif) */}
      <div className="fixed left-6 xl:left-10 top-0 bottom-0 z-30 pointer-events-none hidden xl:flex flex-col items-center justify-between py-24">
        {/* Top Node */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] ring-4 ring-[#ff4d00]/20" />
          <span className="font-mono text-[8px] tracking-widest text-[#121215]/30 uppercase [writing-mode:vertical-lr] rotate-180">
            PULSE
          </span>
        </div>

        {/* Vertical Rail Line with Traveling Indicator */}
        <div className="relative flex-1 w-[1px] bg-gradient-to-b from-[#121215]/10 via-[#121215]/15 to-[#121215]/10 my-4">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] bg-[#ff4d00] rounded-full shadow-[0_0_8px_#ff4d00]"
            style={{
              height: "24px",
              top: pulseTop,
            }}
          />
        </div>

        {/* Bottom Current Phase Badge */}
        <div className="flex flex-col items-center gap-2">
          <div className="font-mono text-[9px] font-bold text-[#ff4d00] tracking-widest [writing-mode:vertical-lr] rotate-180 transition-all duration-300">
            {phase}
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]/40" />
        </div>
      </div>
    </>
  );
}
