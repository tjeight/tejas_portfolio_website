"use client";

import React, { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";

interface CanvasContainerProps {
  children: React.ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  fallback?: React.ReactNode;
}

// Error Boundary for WebGL context loss or unsupported hardware
class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("WebGL Canvas failed gracefully:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full flex items-center justify-center bg-slate-950/40 border border-cyan-500/10 rounded-xl p-4 text-center">
            <span className="font-mono text-xs text-cyan-400/60 uppercase tracking-wider">
              [3D System Active — WebGL Static Mode]
            </span>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

const emptySubscribe = () => () => {};

export default function CanvasContainer({
  children,
  className = "w-full h-full",
  camera = { position: [0, 0, 5], fov: 50 },
  fallback,
}: CanvasContainerProps) {
  // Use React 19 idiomatic useSyncExternalStore for hydration and client-mount
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const dprMax = useSyncExternalStore(
    emptySubscribe,
    () => Math.min(window.devicePixelRatio || 1, 1.5),
    () => 1
  );

  if (!mounted) {
    return (
      <div className={`relative ${className} flex items-center justify-center`}>
        <div className="w-8 h-8 rounded-full border border-cyan-500/30 border-t-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <WebGLErrorBoundary fallback={fallback}>
      <div className={`relative ${className}`}>
        <Canvas
          dpr={[1, dprMax]}
          camera={camera}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
            stencil: false,
            depth: true,
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
