import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social sharing image, generated from brand tokens. */
export default async function OpengraphImage() {
  // The supplied logo (white-lettering version for the dark card).
  const logo = await readFile(join(process.cwd(), "public/brand/logo-horizontal-light.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#24252B", padding: 72, color: "white" }}>
        <img src={logoSrc} alt="" width={234} height={110} />
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
