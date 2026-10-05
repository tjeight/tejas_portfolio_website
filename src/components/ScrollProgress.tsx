"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff4800] via-[#ff7733] to-[#ff4800] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />
      <div className="fixed top-2.5 right-4 z-40 hidden lg:flex items-center gap-1.5 font-mono text-[10px] text-white/40 tracking-wider pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff4800]/70" />
        <span>SYS.PROGRESS</span>
        <span className="text-white/80">{String(percentage).padStart(2, "0")}%</span>
      </div>
    </>
  );
}
