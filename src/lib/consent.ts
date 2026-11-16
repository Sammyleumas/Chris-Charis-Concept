/**
 * Visitor consent, stored in the browser (localStorage). Read by the cookie
 * banner and, from Phase 12, by the analytics loader.
 */
const KEY = "cc-consent";
const EVENT = "cc:consent-change";

export type Consent = { analytics: boolean; at: string };

let cached: string | null | undefined;
let cachedValue: Consent | null = null;

export function getConsent(): Consent | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (raw === cached) return cachedValue;
  cached = raw;
  try {
    cachedValue = raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    cachedValue = null;
  }
  return cachedValue;
}

export function setConsent(c: { analytics: boolean }) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...c, at: new Date().toISOString() }));
  } catch {
    /* storage blocked: the banner will ask again next visit */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
