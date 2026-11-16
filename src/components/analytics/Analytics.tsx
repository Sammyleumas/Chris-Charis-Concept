"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { getConsent, subscribeConsent } from "@/lib/consent";
import { track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Loads GA4 only after consent, sends page views on navigation, and turns
 * any <a data-track="event" data-track-label="..."> click into an event.
 */
export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);
  const pathname = usePathname();
  const loaded = useRef(false);
  const allowed = Boolean(GA_ID && consent?.analytics);

  useEffect(() => {
    if (!GA_ID) return;
    // Respect withdrawal of consent immediately.
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !allowed;
    if (!allowed || loaded.current) return;
    loaded.current = true;
    const w = window as unknown as { dataLayer: unknown[] };
    w.dataLayer = w.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true, send_page_view: false });
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
  }, [allowed]);

  useEffect(() => {
    if (allowed) track("page_view", { page_path: pathname });
  }, [pathname, allowed]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (el) track(el.dataset.track!, { label: el.dataset.trackLabel, link_url: (el as HTMLAnchorElement).href });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
