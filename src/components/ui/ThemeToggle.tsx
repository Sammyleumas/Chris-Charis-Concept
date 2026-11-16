"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

/**
 * Light/dark switch (iOS-style pill). The label and icon are driven by CSS
 * from `data-theme`, so they are right on first paint; the word rolls
 * between "Light" and "Dark" as the theme changes. The choice is saved;
 * until then the site follows the device setting.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, read, () => null);

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next: Theme = read() === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
    };
    try {
      localStorage.setItem("cc-theme", next);
    } catch {}
    // The page crossfades in one composited step; the switch sits in its own
    // layer so its icon and rolling word keep animating live.
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return apply();
    const btn = e.currentTarget;
    btn.style.viewTransitionName = "theme-switch";
    document.startViewTransition(apply).finished.finally(() => {
      btn.style.viewTransitionName = "";
    });
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === null ? undefined : theme === "dark"}
      aria-label="Dark mode"
      onClick={toggle}
      className={cn("theme-switch tap", className)}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-switch-icon">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
      </svg>
      <span aria-hidden="true" className="inline-flex items-center gap-[0.3em]">
        <span className="theme-switch-word">
          <span>Light</span>
          <span>Dark</span>
        </span>
        Mode
      </span>
    </button>
  );
}
