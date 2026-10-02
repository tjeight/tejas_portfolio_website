"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

function subscribeTouch(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getTouchSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
}

function getTouchServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "interactive">("default");
  const [isVisible, setIsVisible] = useState(false);

  const isTouch = useSyncExternalStore(subscribeTouch, getTouchSnapshot, getTouchServerSnapshot);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("[data-cursor]");
      const clickable = target.closest("a, button, [role='button'], input, textarea, select");

      if (interactive) {
        const text = interactive.getAttribute("data-cursor") || "EXPLORE";
        setCursorText(text);
        setCursorVariant("interactive");
      } else if (clickable) {
        setCursorText("");
        setCursorVariant("hover");
      } else {
        setCursorText("");
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleElementHover);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouch, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer follow ring / badge */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "interactive" ? 80 : cursorVariant === "hover" ? 44 : 24,
          height: cursorVariant === "interactive" ? 80 : cursorVariant === "hover" ? 44 : 24,
          backgroundColor:
            cursorVariant === "interactive"
              ? "rgba(0, 240, 255, 0.15)"
              : cursorVariant === "hover"
              ? "rgba(139, 92, 246, 0.15)"
              : "rgba(0, 240, 255, 0.05)",
          borderColor:
            cursorVariant === "interactive"
              ? "rgba(0, 240, 255, 0.6)"
              : cursorVariant === "hover"
              ? "rgba(139, 92, 246, 0.5)"
              : "rgba(0, 240, 255, 0.3)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
        className="rounded-full border backdrop-blur-[1px] flex items-center justify-center transition-colors duration-200"
      >
        {cursorText && (
          <span className="font-mono text-[9px] tracking-widest uppercase text-cyan-300 font-semibold select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center pinpoint */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
      />
    </div>
  );
}
