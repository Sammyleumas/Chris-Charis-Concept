"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { getConsent, setConsent, subscribeConsent } from "@/lib/consent";

/**
 * Cookie consent banner. Analytics stay off until the visitor accepts
 * (Phase 12 loads GA4 only when consent.analytics is true). Reopened from
 * the footer's "Cookie settings" button.
 */
export function CookieConsent() {
  const consent = useSyncExternalStore<ReturnType<typeof getConsent> | "unknown">(subscribeConsent, getConsent, () => "unknown");
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener("cc:open-cookie-settings", open);
    return () => window.removeEventListener("cc:open-cookie-settings", open);
  }, []);

  const visible = reopened || consent === null;
  if (!visible || consent === "unknown") return null;

  const choose = (analytics: boolean) => {
    setConsent({ analytics });
    setReopened(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie choices"
      className="fixed inset-x-0 bottom-0 z-[55] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-5"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl bg-ink p-5 text-white shadow-2xl ring-1 ring-white/10 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <p className="flex-1 text-sm leading-relaxed text-white/80">
          We use optional analytics cookies to understand how our site is used. They are off unless you accept.{" "}
          <Link href="/cookies" className="font-semibold text-white underline underline-offset-2">Cookie notice</Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose(false)} className="h-11 rounded-full border border-white/40 px-5 text-sm font-semibold hover:bg-white/10">
            Necessary only
          </button>
          <button type="button" onClick={() => choose(true)} className="h-11 rounded-full bg-white px-5 text-sm font-semibold text-ink hover:bg-mist">
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("cc:open-cookie-settings"))} className={className}>
      Cookie settings
    </button>
  );
}
