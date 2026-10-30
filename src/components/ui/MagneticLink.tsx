"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticLink({
  href,
  children,
  className,
  strength = 0.16,
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 22, mass: 0.4 });

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      className={cn("btn btn-primary group", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onBlur={handlePointerLeave}
    >
      {children}
    </motion.a>
  );
}
