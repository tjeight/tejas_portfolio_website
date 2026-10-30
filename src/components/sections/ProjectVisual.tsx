import type { Project, Projects } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectVisualProps {
  project: Project;
  labels: Projects["labels"];
  className?: string;
}

export function ProjectVisual({ project, labels, className }: ProjectVisualProps) {
  const { visual } = project;
  const isNetwork = visual.kind === "network";

  const nodePositions = visual.labels.map((label, index) => {
    if (isNetwork) {
      const angle = (index / visual.labels.length) * Math.PI * 2 - Math.PI / 2;
      return {
        label,
        x: 320 + Math.cos(angle) * 172,
        y: 258 + Math.sin(angle) * 154,
        anchor:
          Math.cos(angle) > 0.25
            ? "start"
            : Math.cos(angle) < -0.25
              ? "end"
              : "middle",
      } as const;
    }

    return {
      label,
      x: 88 + index * 116,
      y: 282 + Math.sin(index * 1.25) * 46,
      anchor: "middle" as const,
    };
  });

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-ink text-bone",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-faint">
        <span>{visual.figure} · {labels.figureLabel}</span>
        <span>{isNetwork ? labels.topologyLabel : labels.pipelineLabel}</span>
      </div>

      <div className="relative">
        <svg
          viewBox="0 0 640 520"
          role="presentation"
          aria-hidden="true"
          className="h-auto w-full"
        >
          <defs>
            <pattern
              id={`grid-${project.id}`}
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="rgba(241,239,230,0.05)"
                strokeWidth="0.6"
              />
            </pattern>
            <radialGradient id={`glow-${project.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c8f75a" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#c8f75a" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="640" height="520" fill={`url(#grid-${project.id})`} />
          <circle cx="320" cy="258" r="220" fill={`url(#glow-${project.id})`} />

          <g
            stroke="rgba(241,239,230,0.16)"
            strokeWidth="0.7"
            fill="none"
            aria-hidden="true"
          >
            <path d="M22 22h34M22 22v34" />
            <path d="M618 22h-34M618 22v34" />
            <path d="M22 498h34M22 498v-34" />
            <path d="M618 498h-34M618 498v-34" />
          </g>

          {isNetwork ? (
            <g>
              <circle
                cx="320"
                cy="258"
                r="188"
                fill="none"
                stroke="rgba(200,247,90,0.16)"
                strokeDasharray="2 10"
              />
              <circle
                cx="320"
                cy="258"
                r="130"
                fill="none"
                stroke="rgba(241,239,230,0.08)"
              />

              {nodePositions.map((node) => (
                <line
                  key={`${node.label}-line`}
                  x1="320"
                  y1="258"
                  x2={node.x}
                  y2={node.y}
                  stroke="rgba(200,247,90,0.32)"
                  strokeWidth="0.8"
                  className="flow-line"
                  style={{ strokeDasharray: "3 8" }}
                />
              ))}

              <circle
                cx="320"
                cy="258"
                r="62"
                fill="rgba(15,19,14,0.94)"
                stroke="rgba(200,247,90,0.48)"
                strokeWidth="0.8"
              />
              <polygon
                points="320,220 356,239 356,277 320,296 284,277 284,239"
                fill="none"
                stroke="rgba(241,239,230,0.22)"
                strokeWidth="0.7"
              />
              <circle cx="320" cy="258" r="5" fill="#c8f75a" />
              <text
                x="320"
                y="316"
                textAnchor="middle"
                fill="rgba(241,239,230,0.68)"
                fontSize="8"
                letterSpacing="1.8"
                fontFamily="var(--font-jetbrains), monospace"
              >
                {visual.center.toUpperCase()}
              </text>

              {nodePositions.map((node) => (
                <g key={node.label}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="13"
                    fill="rgba(200,247,90,0.06)"
                  />
                  <circle cx={node.x} cy={node.y} r="3.5" fill="#c8f75a" />
                  <text
                    x={node.anchor === "start" ? node.x + 13 : node.anchor === "end" ? node.x - 13 : node.x}
                    y={node.y + (node.anchor === "middle" ? -18 : 3)}
                    textAnchor={node.anchor}
                    fill="rgba(241,239,230,0.6)"
                    fontSize="8.5"
                    letterSpacing="0.8"
                    fontFamily="var(--font-jetbrains), monospace"
                  >
                    {node.label.toUpperCase()}
                  </text>
                </g>
              ))}
            </g>
          ) : (
            <g>
              <path
                d={nodePositions
                  .map((node, index) =>
                    index === 0
                      ? `M ${node.x} ${node.y}`
                      : `Q ${(nodePositions[index - 1].x + node.x) / 2} ${
                          nodePositions[index - 1].y
                        } ${node.x} ${node.y}`,
                  )
                  .join(" ")}
                fill="none"
                stroke="rgba(200,247,90,0.38)"
                strokeWidth="0.9"
                className="flow-line-slow"
              />

              <text
                x="320"
                y="104"
                textAnchor="middle"
                fill="rgba(241,239,230,0.45)"
                fontSize="7"
                letterSpacing="2"
                fontFamily="var(--font-jetbrains), monospace"
              >
                {visual.center.toUpperCase()} / {labels.orchestrationLabel.toUpperCase()}
              </text>
              <line
                x1="230"
                y1="120"
                x2="410"
                y2="120"
                stroke="rgba(241,239,230,0.12)"
                strokeWidth="0.7"
              />

              {nodePositions.map((node, index) => (
                <g key={node.label}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="28"
                    fill="rgba(15,19,14,0.92)"
                    stroke="rgba(200,247,90,0.34)"
                    strokeWidth="0.8"
                  />
                  <circle cx={node.x} cy={node.y} r="3.5" fill="#c8f75a" />
                  <text
                    x={node.x}
                    y={node.y + 48}
                    textAnchor="middle"
                    fill="rgba(241,239,230,0.62)"
                    fontSize="8"
                    letterSpacing="0.8"
                    fontFamily="var(--font-jetbrains), monospace"
                  >
                    {node.label.toUpperCase()}
                  </text>
                  <text
                    x={node.x}
                    y={node.y - 38}
                    textAnchor="middle"
                    fill="rgba(241,239,230,0.28)"
                    fontSize="6"
                    letterSpacing="1"
                    fontFamily="var(--font-jetbrains), monospace"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </text>
                </g>
              ))}

              <text
                x="320"
                y="426"
                textAnchor="middle"
                fill="rgba(241,239,230,0.26)"
                fontSize="6.5"
                letterSpacing="1.6"
                fontFamily="var(--font-jetbrains), monospace"
              >
                {labels.pipelineFooter.toUpperCase()}
              </text>
            </g>
          )}

          <g
            stroke="rgba(241,239,230,0.18)"
            strokeWidth="0.6"
            fontFamily="var(--font-jetbrains), monospace"
            fill="rgba(241,239,230,0.32)"
            fontSize="6"
          >
            <text x="22" y="488" stroke="none">
              {visual.figure.toUpperCase()}
            </text>
            <text x="618" y="488" textAnchor="end" stroke="none">
              {project.title.toUpperCase()}
            </text>
          </g>
        </svg>
      </div>

      <div className="border-t border-line px-5 py-4">
        <p className="text-pretty text-[0.72rem] leading-relaxed text-muted">
          {visual.caption}
        </p>
      </div>
    </div>
  );
}
