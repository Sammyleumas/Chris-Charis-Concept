"use client";

import Link from "next/link";
import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { ImageAsset } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

export type CoverflowItem = {
  id: string;
  title: string;
  eyebrow?: string;
  caption?: string;
  image: ImageAsset;
  /** Link opened when the centred item is activated. */
  href?: string;
};

/**
 * Cinematic 3D coverflow (CSS transforms, no 3D library). The centre item is
 * dominant; neighbours sit back with perspective. Navigate with the arrow
 * buttons, arrow keys, mouse drag, touch swipe, or by clicking a side item.
 * `onOpen` lets a parent open a lightbox for the centred item instead of a link.
 */
export function Coverflow({
  items,
  label,
  onOpen,
  initial = 0,
}: {
  items: CoverflowItem[];
  label: string;
  onOpen?: (index: number) => void;
  initial?: number;
}) {
  const [active, setActive] = useState(initial);
  const [drag, setDrag] = useState(0);
  const start = useRef<number | null>(null);
  const moved = useRef(false);
  const reduce = useReducedMotion();
  const id = useId();
  const count = items.length;

  const go = useCallback(
    (to: number) => setActive(Math.max(0, Math.min(count - 1, to))),
    [count],
  );

  // Card spacing lives in CSS (--cf-spread) so the first paint is already
  // in place; drag maths reads the rendered card width instead.
  const [spreadPx, setSpreadPx] = useState(300);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    if (e.key === "Home") { e.preventDefault(); go(0); }
    if (e.key === "End") { e.preventDefault(); go(count - 1); }
  };

  const onDown = (e: PointerEvent) => {
    const card = (e.currentTarget as HTMLElement).querySelector<HTMLElement>("[aria-roledescription=slide]");
    setSpreadPx((card?.offsetWidth ?? 375) * 0.8);
    start.current = e.clientX;
    moved.current = false;
  };
  const onMove = (e: PointerEvent) => {
    if (start.current === null) return;
    let dx = e.clientX - start.current;
    if (Math.abs(dx) > 6) moved.current = true;
    // Rubber-band resistance past the first or last card.
    if ((active === 0 && dx > 0) || (active === count - 1 && dx < 0)) dx *= 0.3;
    setDrag(dx);
  };
  const onUp = () => {
    if (start.current === null) return;
    const steps = Math.round(-drag / (spreadPx * 0.6));
    if (steps !== 0) go(active + steps);
    start.current = null;
    setDrag(0);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative select-none"
    >
      <div
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
        aria-describedby={`${id}-help`}
        className="relative mx-auto h-[23rem] touch-pan-y [--cf-spread:52vw] [perspective:1600px] sm:h-[26rem] sm:[--cf-spread:230px] lg:h-[30rem] lg:[--cf-spread:300px]"
      >
        <p id={`${id}-help`} className="sr-only">Use the left and right arrow keys to move between items.</p>
        {items.map((item, i) => {
          const offset = i - active + drag / spreadPx;
          const abs = Math.abs(offset);
          const hidden = abs > 2.6;
          const centred = i === active;
          const style = {
            transform: `translate(-50%, -50%) translateX(calc(var(--cf-spread) * ${offset})) translateZ(${-abs * 160}px) rotateY(${reduce ? 0 : Math.max(-1, Math.min(1, -offset)) * 38}deg) scale(${1 - Math.min(abs, 2) * 0.07})`,
            zIndex: 100 - Math.round(abs * 10),
            opacity: hidden ? 0 : 1 - Math.max(0, abs - 1.6) * 0.8,
            // Depth-consistent shadow: nearer cards cast larger, darker shadows.
            boxShadow: `0 ${Math.max(10, 40 - abs * 12)}px ${Math.max(30, 80 - abs * 20)}px -30px rgba(0,0,0,${Math.max(0.2, 0.55 - abs * 0.15).toFixed(2)})`,
            // Slow in & out with a small overshoot so cards settle rather than stop dead.
            transition: drag || reduce
              ? "none"
              : "transform 520ms cubic-bezier(.25,1.12,.4,1), opacity 300ms var(--ease-out-soft), box-shadow 520ms var(--ease-out-soft)",
          };

          const card = (
            <>
              {/* Anticipation: the centred card dips slightly while pressed, before it opens. */}
              <div className="absolute inset-0 transition-transform duration-150 ease-out group-active:scale-[0.97]">
                <Photo image={item.image} tone="dark" notePosition="top-left" sizes="(min-width: 1024px) 480px, 80vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left sm:p-7">
                {item.eyebrow && <p className="text-xs font-semibold text-mist tabular-nums">{item.eyebrow}</p>}
                <p className="mt-1 font-display text-xl leading-tight font-semibold text-white sm:text-2xl">{item.title}</p>
                {item.caption && centred && (
                  <p className="mt-2 line-clamp-2 max-w-sm text-sm text-white/75">{item.caption}</p>
                )}
                {centred && (item.href || onOpen) && (
                  <span aria-hidden="true" className="mt-4 inline-grid h-10 w-10 place-items-center rounded-full border border-white/50 text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </div>
              {/* Side items dim slightly so the centre reads first */}
              <div className={cn("absolute inset-0 bg-night transition-opacity duration-500", centred ? "opacity-0" : "opacity-35")} />
            </>
          );

          const shared = cn(
            "group absolute top-1/2 left-1/2 block aspect-[4/5] w-[min(78vw,20rem)] overflow-hidden rounded-xl bg-night [backface-visibility:hidden] sm:w-[22rem] lg:w-[24rem]",
            hidden && "pointer-events-none",
          );

          const a11y = {
            role: "group" as const,
            "aria-roledescription": "slide",
            "aria-label": `${i + 1} of ${count}: ${item.title}`,
            "aria-hidden": hidden || undefined,
            tabIndex: centred ? 0 : -1,
          };

          if (centred && item.href && !onOpen) {
            return (
              <Link
                key={item.id}
                href={item.href}
                {...a11y}
                draggable={false}
                onClick={(e) => moved.current && e.preventDefault()}
                className={shared}
                style={style}
              >
                {card}
              </Link>
            );
          }
          return (
            <button
              key={item.id}
              type="button"
              {...a11y}
              onClick={() => {
                if (moved.current) return;
                if (centred) onOpen?.(i);
                else go(i);
              }}
              className={cn(shared, "cursor-pointer")}
              style={style}
            >
              {card}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink tap hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </button>
        <p aria-live="polite" className="min-w-16 text-center text-sm font-semibold text-charcoal tabular-nums">
          {pad(active + 1)} <span className="text-slate-ink">/ {pad(count)}</span>
          <span className="sr-only">: {items[active]?.title}</span>
        </p>
        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === count - 1}
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink tap hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}
