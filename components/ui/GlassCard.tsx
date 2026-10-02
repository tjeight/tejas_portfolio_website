"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "violet" | "none";
  hudCorners?: boolean;
}

export default function GlassCard({
  children,
  className,
  glow = "none",
  hudCorners = true,
  ...props
}: GlassCardProps) {
  const glowStyles = {
    cyan: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.2)]",
    violet: "hover:border-violet-500/50 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.2)]",
    none: "hover:border-white/20",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl border border-white/[0.08] bg-slate-950/60 backdrop-blur-md p-6 transition-all duration-300",
        glowStyles[glow],
        hudCorners && "hud-border",
        className
      )}
      {...props}
    >
      {/* Corner bracket aesthetics */}
      {hudCorners && (
        <>
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-400/80 pointer-events-none" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cyan-400/80 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-cyan-400/80 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-400/80 pointer-events-none" />
        </>
      )}

      {children}
    </div>
  );
}
