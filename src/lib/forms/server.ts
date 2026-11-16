import "server-only";
import type { z } from "zod";
import type { FormState } from "./types";

/** Reads every string field from FormData into a plain object. */
export function formValues(formData: FormData) {
  const out: Record<string, string> = {};
  for (const [k, v] of formData.entries()) if (typeof v === "string") out[k] = v.trim();
  return out;
}

/** Validates with Zod and returns field-level errors in FormState shape. */
export function validate<T extends z.ZodType>(schema: T, values: Record<string, string>) {
  const parsed = schema.safeParse(values);
  if (parsed.success) return { ok: true as const, data: parsed.data as z.infer<T> };
  const fieldErrors: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "form");
    fieldErrors[key] ??= issue.message;
  }
  const { company: _hp, ...safeValues } = values;
  void _hp;
  const state: FormState = {
    status: "error",
    message: "Please check the highlighted fields.",
    fieldErrors,
    values: safeValues,
  };
  return { ok: false as const, state };
}

/** Simple in-memory rate limit per key (per server instance). Phase 11 moves this to a shared store. */
const hits = new Map<string, number[]>();
export function rateLimited(key: string, max = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  return list.length > max;
}
