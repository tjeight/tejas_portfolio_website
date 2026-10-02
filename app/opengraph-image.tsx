import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Tejas Jagdale — Backend Developer & AI Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(0, 240, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          border: "4px solid rgba(0, 240, 255, 0.4)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              backgroundColor: "#091833",
              border: "2px solid #00f0ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00f0ff",
              fontSize: "26px",
              fontWeight: "900",
              fontFamily: "monospace",
            }}
          >
            TJ
          </div>
          <div
            style={{
              color: "#00f0ff",
              fontSize: "18px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            BACKEND DEVELOPER × AI ENGINEER
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: "900",
              color: "#ffffff",
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}
          >
            Tejas Jagdale
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            I build intelligent backend systems. Fast APIs, multi-agent AI workflows, and scalable distributed infrastructure.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            color: "#38bdf8",
            fontSize: "18px",
            fontFamily: "monospace",
          }}
        >
          <span>PYTHON</span>
          <span>•</span>
          <span>FASTAPI</span>
          <span>•</span>
          <span>LANGGRAPH</span>
          <span>•</span>
          <span>POSTGRESQL</span>
          <span>•</span>
          <span>REDIS</span>
          <span>•</span>
          <span>DOCKER</span>
          <span>•</span>
          <span>AWS</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
