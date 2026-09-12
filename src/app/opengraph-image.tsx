import { ImageResponse } from "next/og";

// Runtime edge: el runtime node de @vercel/og falla al resolver rutas de
// fuentes en Windows (ERR_INVALID_URL). Edge funciona en local y en Vercel.
export const runtime = "edge";
export const alt =
  "MYCodeOficial — Desarrollo web y móvil que funciona y vende";
export const size = { width: 1200, height: 630 };
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
          alignItems: "center",
          justifyContent: "center",
          background: "#030308",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(59,130,246,0.18), transparent 65%), radial-gradient(ellipse 80% 60% at 50% 45%, rgba(124,58,237,0.12), transparent 70%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ color: "#ffffff" }}>MY</span>
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, #8b5cf6, #3b82f6, #22d3ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Code
          </span>
          <span style={{ color: "#ffffff" }}>Oficial</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Desarrollo web y móvil que funciona y vende
        </div>
        <div
          style={{
            marginTop: 48,
            width: 280,
            height: 2,
            backgroundImage:
              "linear-gradient(90deg, transparent, #8b5cf6, #3b82f6, #22d3ee, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
