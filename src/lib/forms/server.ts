import "server-only";
import type { z } from "zod";
import type { FormState } from "./types";

/** Multi-line fields keep their line breaks. */
const LONG_TEXT = new Set(["message", "details", "experience"]);
/** Link fields accept "www.example.com" and get https:// added. */
const URL_FIELDS = new Set(["portfolio", "website"]);

/**
 * Reads every string field from FormData and normalises it (Postel's law:
 * be liberal in what you accept). Validation afterwards stays strict.
 */
export function formValues(formData: FormData) {
  const out: Record<string, string> = {};
  for (const [k, raw] of formData.entries()) {
    if (typeof raw !== "string") continue;
    let v = raw.trim();
    if (!LONG_TEXT.has(k)) v = v.replace(/\s+/g, " ");
    if (k === "email") v = v.replace(/^mailto:/i, "").toLowerCase();
    if (URL_FIELDS.has(k) && v && !/^[a-z][a-z0-9+.-]*:\/\//i.test(v) && /^[\w-]+(\.[\w-]+)+/.test(v)) v = `https://${v}`;
    if (k === "amount") v = normaliseAmount(v);
    out[k] = v;
  }
  return out;
}

/** "₦25,000", "NGN 25000", "25k" and "25 000" all become "25000". */
export function normaliseAmount(v: string) {
  const s = v.toLowerCase().replace(/ngn|naira|₦|,|\s/g, "");
  const k = s.match(/^(\d+(?:\.\d+)?)k$/);
  if (k) return String(Math.round(Number(k[1]) * 1000));
  return s;
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
