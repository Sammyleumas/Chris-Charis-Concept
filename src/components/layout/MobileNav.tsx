"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import type { ProjectFamily } from "@/content/types";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";

type MenuFamily = Pick<ProjectFamily, "slug" | "name" | "year" | "line">;
type SubLink = { label: string; href: string; year?: number };
type Section = { key: string; label: string; href: string; children: SubLink[] };

/* Rail geometry, in px from the left of the list. */
const OUTER = 7; // rail beside the main links
const INNER = 25; // rail beside an open section's links
const BEND = 22; // height of each curve
/** Sub-links shown before the list scrolls behind "More below". */
const VISIBLE_SUBS = 5;

type Layout = {
  height: number;
  points: Record<string, number>;
  open: { top: number; bottom: number } | null;
};

/**
 * Phone and tablet menu.
 *
 * A thin rail runs down the left of the links. Where a section is open the
 * rail bends in beside its pages and back out below them. It is drawn dark
 * down to a dot that sits beside the current page, and the dot follows the
 * link being hovered or focused. Long sections scroll behind "More below".
 */
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

  const sections: Section[] = [
    { key: "home", label: "Home", href: "/", children: [] },
    ...mainNav.map((n) => ({
      key: n.href,
      label: n.label,
      href: n.href,
      children: n.mega
        ? families.map((f) => ({ label: f.name, href: `/our-work/${f.slug}`, year: f.year }))
        : (n.children ?? []),
    })),
  ];

  // The current page: the most specific link that matches the address.
  const all = sections.flatMap((s) => [{ href: s.href, section: s.key }, ...s.children.map((c) => ({ href: c.href, section: s.key }))]);
  const current = all
    .filter((l) => (l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(l.href + "/")))
    .sort((a, b) => b.href.length - a.href.length)[0];
  const currentKey = current ? current.href : null;
  const currentSection = current?.section ?? null;

  const currentWithPages = sections.find((x) => x.key === currentSection && x.children.length);

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
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white text-ink"
            initial={{ x: reduce ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduce ? 0 : "100%", transition: { duration: reduce ? 0 : duration.base, ease: ease.in } }}
            transition={{ duration: reduce ? 0 : 0.3, ease: ease.out }}
          >
            <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
              <Link href="/" onClick={onClose} aria-label="Chris Charis Concept, home">
                <Logo tone="dark" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="tap grid h-11 w-11 place-items-center rounded-full text-charcoal hover:bg-mist"
              >
                <X aria-hidden="true" className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pt-7 pb-8">
              <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-slate-ink uppercase">Menu</p>
              <RailList
                sections={sections}
                initialExpanded={currentWithPages ? currentWithPages.key : null}
                currentKey={currentKey}
                onNavigate={onClose}
                reduce={!!reduce}
              />
            </nav>

            <div className="flex items-center gap-3 border-t border-line p-5">
              <ThemeToggle className="h-13 shrink-0" />
              <ButtonLink href="/donate" size="lg" arrow={false} className="flex-1 px-7" onClick={onClose}>
                Donate
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Mounted each time the menu opens, so it starts with the current page's section open. */
function RailList({
  sections,
  initialExpanded,
  currentKey,
  onNavigate,
  reduce,
}: {
  sections: Section[];
  initialExpanded: string | null;
  currentKey: string | null;
  onNavigate: () => void;
  reduce: boolean;
}) {
  const [expanded, setExpanded] = useState<string | null>(initialExpanded);
  const [focusKey, onFocusKey] = useState<string | null>(null);
  const onToggle = (k: string) => setExpanded((e) => (e === k ? null : k));
  const listRef = useRef<HTMLUListElement>(null);
  const [layout, setLayout] = useState<Layout>({ height: 0, points: {}, open: null });

  // Measure link centres and the open section's box, relative to the list.
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const base = list.getBoundingClientRect().top;
    const points: Record<string, number> = {};
    list.querySelectorAll<HTMLElement>("[data-rail]").forEach((el) => {
      if (el.closest("[data-rail-box]:not([data-rail-open])")) return; // inside a closed section
      const r = el.getBoundingClientRect();
      if (r.height) points[el.dataset.rail!] = r.top - base + r.height / 2;
    });
    const box = list.querySelector<HTMLElement>("[data-rail-open]");
    const b = box?.getBoundingClientRect();
    setLayout({
      height: list.scrollHeight,
      points,
      open: b && b.height > 4 ? { top: b.top - base, bottom: b.bottom - base } : null,
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const list = listRef.current;
    if (!list) return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    list.querySelectorAll("[data-rail-box]").forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [measure, expanded]);

  const { height, points, open } = layout;
  const y1 = open ? Math.max(open.top - BEND + 2, 0) : 0;
  const y2 = open ? open.bottom - 4 : 0;
  const path = open
    ? `M${OUTER} 0 V${y1} C${OUTER} ${y1 + BEND / 2} ${INNER} ${y1 + BEND / 2} ${INNER} ${y1 + BEND} V${y2} C${INNER} ${y2 + BEND / 2} ${OUTER} ${y2 + BEND / 2} ${OUTER} ${y2 + BEND} V${height}`
    : `M${OUTER} 0 V${height}`;

  // The current page's dot sits on its section link when that section is open.
  const currentRail = currentKey && points[`sub:${currentKey}`] !== undefined ? `sub:${currentKey}` : currentKey;
  const target = (focusKey && points[focusKey] !== undefined ? focusKey : null) ?? (currentRail && points[currentRail] !== undefined ? currentRail : null);
  const dotY = target ? points[target] : null;
  const dotX = dotY !== null && open && dotY > y1 + BEND && dotY < y2 ? INNER : OUTER;
  const move = reduce ? "none" : "transform 420ms var(--ease-out-soft), height 420ms var(--ease-out-soft)";

  const hover = (key: string) => ({
    onMouseEnter: () => onFocusKey(key),
    onMouseLeave: () => onFocusKey(null),
    onFocus: () => onFocusKey(key),
    onBlur: () => onFocusKey(null),
  });

  return (
    <div className="relative mt-5">
      {height > 0 && (
        <svg aria-hidden="true" className="pointer-events-none absolute top-0 left-0 overflow-visible text-ink" width={INNER + 8} height={height}>
          <defs>
            <clipPath id="rail-progress">
              <rect x="-4" y="0" width={INNER + 16} height={height} style={{ transform: `scaleY(${dotY !== null ? dotY / height : 0})`, transformOrigin: "0 0", transition: move }} />
            </clipPath>
          </defs>
          <path d={path} fill="none" stroke="var(--color-line)" strokeWidth="1.5" strokeLinecap="round" />
          <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" clipPath="url(#rail-progress)" />
          {dotY !== null && (
            <g style={{ transform: `translate(${dotX}px, ${dotY}px)`, transition: move }}>
              <circle r="3.5" fill="currentColor" />
            </g>
          )}
        </svg>
      )}

      <ul ref={listRef} className="relative">
        {sections.map((s) => {
          const isOpen = expanded === s.key;
          const here = currentKey === s.href && !(isOpen && s.children.some((c) => c.href === s.href));
          const lit = focusKey ? focusKey === s.href : here;
          return (
            <li key={s.key}>
              <div className="flex items-center justify-between pl-8">
                <Link
                  href={s.href}
                  onClick={onNavigate}
                  data-rail={s.href}
                  aria-current={here ? "page" : undefined}
                  {...hover(s.href)}
                  className={cn(
                    "flex-1 py-3 font-display text-[1.0625rem] font-semibold transition-colors duration-200",
                    lit ? "text-ink" : "text-slate-ink hover:text-ink",
                  )}
                >
                  {s.label}
                </Link>
                {s.children.length > 0 && (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={`Show ${s.label} pages`}
                    onClick={() => onToggle(s.key)}
                    className="tap grid h-11 w-11 place-items-center rounded-full text-slate-ink hover:bg-mist hover:text-ink"
                  >
                    <ChevronDown aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
                  </button>
                )}
              </div>
              {s.children.length > 0 && (
                <SubList
                  open={isOpen}
                  links={s.children}
                  currentKey={currentKey}
                  focusKey={focusKey}
                  hover={hover}
                  onNavigate={onNavigate}
                  onScroll={measure}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SubList({
  open,
  links,
  currentKey,
  focusKey,
  hover,
  onNavigate,
  onScroll,
}: {
  open: boolean;
  links: SubLink[];
  currentKey: string | null;
  focusKey: string | null;
  hover: (key: string) => Record<string, () => void>;
  onNavigate: () => void;
  onScroll: () => void;
}) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [more, setMore] = useState(false);
  const capped = links.length > VISIBLE_SUBS;

  const check = useCallback(() => {
    const el = scrollRef.current;
    setMore(!!el && el.scrollTop + el.clientHeight < el.scrollHeight - 4);
    onScroll();
  }, [onScroll]);

  useEffect(() => {
    if (open) check();
  }, [open, check]);

  return (
    <div
      data-rail-box
      data-rail-open={open || undefined}
      className={cn("grid transition-[grid-template-rows] duration-300 ease-out-soft", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
    >
      <div className="overflow-hidden" inert={!open}>
        <ul
          ref={scrollRef}
          onScroll={check}
          className={cn("pt-0.5 pb-2 pl-[3.25rem]", capped && "overflow-y-auto [scrollbar-width:none]")}
          style={capped ? { maxHeight: `${VISIBLE_SUBS * 2.375 + 0.625}rem` } : undefined}
        >
          {links.map((c) => {
            const here = currentKey === c.href;
            const lit = focusKey ? focusKey === `sub:${c.href}` : here;
            return (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={onNavigate}
                  data-rail={`sub:${c.href}`}
                  aria-current={here ? "page" : undefined}
                  {...hover(`sub:${c.href}`)}
                  className={cn(
                    "flex min-h-[2.375rem] items-center gap-2.5 text-[0.9375rem] transition-colors duration-200",
                    lit ? "font-medium text-ink" : "text-slate-ink/85 hover:text-ink",
                  )}
                >
                  {c.year !== undefined && <span className="text-xs text-slate-ink/70 tabular-nums">{c.year}</span>}
                  {c.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {capped && (
          <button
            type="button"
            onClick={() => scrollRef.current?.scrollBy({ top: 38 * 3, behavior: "smooth" })}
            aria-hidden={!more || undefined}
            tabIndex={more ? undefined : -1}
            className={cn(
              "mb-2 ml-[3.25rem] inline-flex min-h-8 items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.14em] text-slate-ink uppercase transition-opacity duration-200 hover:text-ink",
              more ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />
            More below
          </button>
        )}
      </div>
    </div>
  );
}
