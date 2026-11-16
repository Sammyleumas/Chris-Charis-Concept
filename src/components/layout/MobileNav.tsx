"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import type { ProjectFamily } from "@/content/types";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";

type MenuFamily = Pick<ProjectFamily, "slug" | "name" | "year" | "line">;

export function MobileNav({
  open,
  onClose,
  families,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  families: MenuFamily[];
  pathname: string;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Lock scroll, focus the panel, trap Tab, close on Escape, restore focus.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("button, a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  const sub = (label: string, mega?: boolean) => {
    if (mega) return families.map((f) => ({ label: f.name, href: `/our-work/${f.slug}`, year: f.year }));
    return mainNav.find((n) => n.label === label)?.children ?? [];
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : duration.base }}
        >
          <div className="absolute inset-0 bg-night/60" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ink text-white"
            initial={{ x: reduce ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduce ? 0 : "100%", transition: { duration: reduce ? 0 : duration.base, ease: ease.in } }}
            transition={{ duration: reduce ? 0 : 0.3, ease: ease.out }}
          >
            <div className="flex h-[4.5rem] items-center justify-between px-5">
              <Link href="/" onClick={onClose} aria-label="Chris Charis Concept, home">
                <Logo tone="light" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="tap grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"
              >
                <X aria-hidden="true" className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-6">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                <li>
                  <Link href="/" onClick={onClose} className="block py-4 font-display text-lg font-semibold">
                    Home
                  </Link>
                </li>
                {mainNav.map((item) => {
                  const children = item.mega || item.children ? sub(item.label, item.mega) : [];
                  const isOpen = expanded === item.label;
                  const active = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <li key={item.label}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={pathname === item.href ? "page" : undefined}
                          className={cn(
                            "flex-1 py-4 font-display text-lg font-semibold",
                            active && "text-mist",
                          )}
                        >
                          {item.label}
                        </Link>
                        {children.length > 0 && (
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-label={`Show ${item.label} pages`}
                            onClick={() => setExpanded(isOpen ? null : item.label)}
                            className="tap grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"
                          >
                            <ChevronDown
                              aria-hidden="true"
                              className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")}
                            />
                          </button>
                        )}
                      </div>
                      {isOpen && (
                        <ul className="pb-4">
                          {children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={onClose}
                                className="flex items-baseline gap-3 rounded-lg py-2.5 pl-3 text-[0.95rem] text-white/75 hover:text-white"
                              >
                                {"year" in c && (
                                  <span className="text-xs font-semibold text-mist/80 tabular-nums">{c.year as number}</span>
                                )}
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-white/10 p-5">
              <ButtonLink href="/donate" size="lg" className="w-full" onClick={onClose}>
                Donate
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
