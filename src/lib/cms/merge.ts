/**
 * Overlays CMS values on local content: any field the CMS leaves empty
 * (null, undefined, "" or an empty list) keeps its local value. Images
 * without an uploaded file also keep the local placeholder.
 */
export function overlay<T extends object>(local: T, cms: Partial<Record<keyof T, unknown>> | null | undefined): T {
  if (!cms) return local;
  const out = { ...local } as Record<string, unknown>;
  for (const [k, v] of Object.entries(cms)) {
    if (v === null || v === undefined || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    if (typeof v === "object" && !Array.isArray(v) && "src" in (v as object) && !(v as { src?: unknown }).src) continue;
    out[k] = v;
  }
  return out as T;
}

/** Uses the CMS list when it has entries, otherwise the local list. */
export function listOr<T>(cms: T[] | null | undefined, local: T[]): T[] {
  return cms && cms.length > 0 ? cms : local;
}
