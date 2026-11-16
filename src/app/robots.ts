import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/meta";

/** Only production is indexed; preview (staging) deployments are not. */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
