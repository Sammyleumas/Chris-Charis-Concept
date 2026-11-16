import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social sharing image, generated from brand tokens. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#24252B", padding: 72, color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <path d="M5 9.5 11.5 18 20 6.5 28.5 18 35 9.5" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M28.6 30.2a10 10 0 1 1 0-4.4" fill="none" stroke="#2B7FB8" strokeWidth="3.4" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 26, letterSpacing: 2 }}>
            <span style={{ fontWeight: 700 }}>CHRIS CHARIS</span>
            <span style={{ fontSize: 18, letterSpacing: 8, opacity: 0.8 }}>CONCEPT</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Transforming Communities</div>
          <div style={{ fontSize: 72, lineHeight: 1.05, letterSpacing: -2, opacity: 0.85 }}>Through Creative Expressions</div>
          <div style={{ width: 72, height: 5, background: "#2B7FB8", marginTop: 36 }} />
        </div>
        <div style={{ display: "flex", fontSize: 24, opacity: 0.7 }}>
          {site.location.city}, {site.location.state}, {site.location.country} · {site.registrationNumber}
        </div>
      </div>
    ),
    size,
  );
}
