import type { Metadata } from "next";
import { site } from "@/config/site";

/** Absolute base URL: the confirmed domain, else the Vercel URL, else localhost. */
export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` };

/** Per-page metadata with canonical URL and matching Open Graph / X tags. */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    // Page-level openGraph replaces the inherited one, so name the image explicitly.
    openGraph: { title: fullTitle, description, url: path, type, siteName: site.name, locale: "en_NG", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}
