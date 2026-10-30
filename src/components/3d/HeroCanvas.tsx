"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import type { HeroSceneCopy } from "@/lib/types";
import { cn } from "@/lib/utils";

const AgentScene = dynamic(
  () => import("./AgentScene").then((module) => module.AgentScene),
  { ssr: false },
);

type PreviewMode = "loading" | "unsupported" | "error";

interface StaticPreviewProps {
  scene: HeroSceneCopy;
  mode: PreviewMode;
}

function StaticPreview({ scene, mode }: StaticPreviewProps) {
  const nodes = useMemo(() => {
    const count = scene.nodeLabels.length;

    return scene.nodeLabels.map((node, index) => {
      const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
      const x = 210 + Math.cos(angle) * 148;
      const y = 210 + Math.sin(angle) * 148;
      const labelX = 210 + Math.cos(angle) * 182;
      const labelY = 210 + Math.sin(angle) * 182;
      const anchor: "start" | "end" | "middle" =
        Math.cos(angle) > 0.25 ? "start" : Math.cos(angle) < -0.25 ? "end" : "middle";

      return { ...node, x, y, labelX, labelY, anchor };
    });
  }, [scene.nodeLabels]);

  const statusLabel =
    mode === "loading" ? scene.loadingLabel : scene.fallbackTag;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-[8%] rounded-full border border-line/40" />
      <svg
        viewBox="0 0 420 420"
        aria-hidden="true"
        className="h-[96%] w-[96%] max-h-[34rem]"
      >
        <defs>
          <radialGradient id="agent-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c8f75a" stopOpacity="0.16" />
            <stop offset="70%" stopColor="#c8f75a" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#c8f75a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="210" cy="210" r="148" fill="none" stroke="rgba(241,239,230,0.1)" />
        <circle
          cx="210"
          cy="210"
          r="118"
          fill="none"
          stroke="rgba(241,239,230,0.06)"
          strokeDasharray="2 8"
        />
        <circle cx="210" cy="210" r="188" fill="url(#agent-core-glow)" />

        <g className="orbit-fallback">
          <circle
            cx="210"
            cy="210"
            r="148"
            fill="none"
            stroke="#c8f75a"
            strokeOpacity="0.24"
            strokeDasharray="1 9"
          />
          {nodes.map((node) => (
            <circle key={`${node.id}-dot`} cx={node.x} cy={node.y} r="4" fill="#c8f75a" />
          ))}
        </g>

        {nodes.map((node) => (
          <line
            key={`${node.id}-line`}
            x1="210"
            y1="210"
            x2={node.x}
            y2={node.y}
            stroke="#c8f75a"
            strokeOpacity="0.16"
          />
        ))}

        <g>
          <polygon
            points="210,166 248,188 248,232 210,254 172,232 172,188"
            fill="rgba(23,29,21,0.9)"
            stroke="rgba(200,247,90,0.5)"
            strokeWidth="0.8"
          />
          <circle cx="210" cy="210" r="6" fill="#c8f75a" />
          <text
            x="210"
            y="282"
            textAnchor="middle"
            fill="rgba(241,239,230,0.62)"
            fontSize="7"
            letterSpacing="1.6"
            fontFamily="var(--font-jetbrains), monospace"
          >
            {scene.coreLabel.toUpperCase()}
          </text>
        </g>

        {nodes.map((node) => (
          <text
            key={`${node.id}-label`}
            x={node.labelX}
            y={node.labelY}
            textAnchor={node.anchor}
            fill="rgba(241,239,230,0.5)"
            fontSize="6.4"
            letterSpacing="1.2"
            fontFamily="var(--font-jetbrains), monospace"
          >
            {node.label.toUpperCase()}
          </text>
        ))}
      </svg>

      <div
        className={cn(
          "absolute inset-x-6 bottom-7 mx-auto max-w-[17rem] text-center",
          mode === "loading" ? "text-muted" : "text-faint",
        )}
        aria-live={mode === "loading" ? "polite" : undefined}
      >
        <p className="mono-label">{statusLabel}</p>
        {mode !== "loading" ? (
          <p className="mt-2 text-[0.66rem] leading-relaxed">{scene.fallbackNote}</p>
        ) : null}
      </div>
    </div>
  );
}

interface SceneBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError: () => void;
}

class SceneBoundary extends Component<SceneBoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

interface HeroCanvasProps {
  scene: HeroSceneCopy;
}

export function HeroCanvas({ scene }: HeroCanvasProps) {
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [support, setSupport] = useState<"checking" | "ready" | "unsupported">(
    "checking",
  );
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        const context =
          canvas.getContext("webgl2") ?? canvas.getContext("webgl");

        setSupport(context ? "ready" : "unsupported");
      } catch {
        setSupport("unsupported");
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const element = wrapperRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.01 },
    );

    observer.observe(element);

    function handleVisibility() {
      setTabVisible(document.visibilityState === "visible");
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  const handleError = useCallback(() => {
    setSceneFailed(true);
  }, []);

  const fallbackMode: PreviewMode = sceneFailed
    ? "error"
    : support === "checking" || (support === "ready" && !sceneReady)
      ? "loading"
      : "unsupported";

  const fallback = <StaticPreview scene={scene} mode={fallbackMode} />;

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label={scene.ariaLabel}
      className="relative h-full w-full overflow-hidden"
    >
      {support === "ready" ? (
        <SceneBoundary
          fallback={<StaticPreview scene={scene} mode="error" />}
          onError={handleError}
        >
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              sceneReady ? "opacity-100" : "opacity-0",
            )}
          >
            <AgentScene
              scene={scene}
              reducedMotion={Boolean(reduceMotion)}
              active={inView && tabVisible}
              onReady={handleReady}
            />
          </div>
        </SceneBoundary>
      ) : null}

      {(!sceneReady && !sceneFailed) || support !== "ready" ? (
        <div className="absolute inset-0">{fallback}</div>
      ) : null}
    </div>
  );
}
