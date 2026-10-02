"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  dataCursor?: string;
}

export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  target,
  rel,
  download,
  dataCursor,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] border border-cyan-400/50 hover:brightness-110",
    secondary:
      "bg-slate-900/90 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-800/90 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]",
    outline:
      "border border-white/20 text-slate-200 hover:border-cyan-400 hover:text-white bg-slate-950/40 backdrop-blur-sm",
    ghost:
      "text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/20 border border-transparent",
  };

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs font-mono tracking-wider",
    md: "px-5 py-2.5 text-sm font-mono tracking-wider",
    lg: "px-7 py-3.5 text-base font-mono tracking-wider",
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-lg cursor-pointer transition-all duration-200 select-none overflow-hidden group",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      data-cursor={dataCursor}
    >
      {/* Subtle shine sweep */}
      <span className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        onClick={onClick}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block border-none bg-transparent p-0">
      {content}
    </button>
  );
}
