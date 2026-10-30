import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/data";

export const alt = site.seo.ogAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070908",
          color: "#f1efe6",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, rgba(241,239,230,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(241,239,230,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 999,
                border: "1px solid rgba(241,239,230,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                letterSpacing: 2,
              }}
            >
              {site.initials}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontSize: 22, fontWeight: 600 }}>{site.name}</span>
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#a5a99c",
                }}
              >
                {site.title} / {site.subtitle}
              </span>
            </div>
          </div>
          <span
            style={{
              fontSize: 12,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#c8f75a",
            }}
          >
            {hero.eyebrow}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 26,
            position: "relative",
            maxWidth: 900,
          }}
        >
          <span
            style={{
              fontSize: 78,
              fontWeight: 500,
              letterSpacing: -4,
              lineHeight: 0.98,
            }}
          >
            {site.seo.title}
          </span>
          <span
            style={{
              fontSize: 22,
              lineHeight: 1.45,
              color: "#a5a99c",
              maxWidth: 760,
            }}
          >
            {site.seo.description}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid rgba(241,239,230,0.15)",
            paddingTop: 20,
            fontSize: 14,
            letterSpacing: 1.8,
            textTransform: "uppercase",
            color: "#a5a99c",
          }}
        >
          <span>{site.location.label}</span>
          <span style={{ color: "#c8f75a" }}>{site.website.replace("https://", "")}</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
