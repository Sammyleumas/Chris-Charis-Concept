import "server-only";
import { createClient } from "@sanity/client";
import { cacheLife, cacheTag } from "next/cache";

/**
 * Sanity CMS connection. Enabled when NEXT_PUBLIC_SANITY_PROJECT_ID is set.
 * Reads published content only, through Sanity's CDN. Results are cached
 * under the "cms" tag and refreshed by the /api/revalidate webhook.
 */
export const cmsConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
};

export function isCmsConfigured() {
  return Boolean(cmsConfig.projectId);
}

const client = isCmsConfigured()
  ? createClient({ ...cmsConfig, useCdn: true, perspective: "published" })
  : null;

/** Cached GROQ query. Returns null when the CMS is off or unreachable. */
export async function cmsFetch<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  "use cache";
  cacheTag("cms");
  cacheLife("hours");
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params);
  } catch (err) {
    console.error("[cms] query failed; using local content", err);
    return null;
  }
}
