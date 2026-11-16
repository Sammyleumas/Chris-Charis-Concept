"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, Shrink } from "lucide-react";
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

/*
 * Geometry (classic cover flow, per the approved reference):
 * the centre card faces forward; side cards turn ~62° and stack closely,
 * so many are visible at once. Positions are continuous in `offset`, so
 * dragging moves every card smoothly along the same path.
 */
const ROTATE = 62; // degrees for side cards
const FIRST_GAP = 0.66; // × card width: distance from centre to first side card
const STACK_GAP = 0.2; // × card width: spacing between stacked side cards
const DEPTH = 0.55; // × card width: how far side cards sit back
const MAX_VISIBLE = 7; // cards rendered each side

function place(offset: number, reduce: boolean | null) {
  const a = Math.abs(offset);
  const s = Math.sign(offset);
  const near = Math.min(a, 1);
  const x = a <= 1 ? offset * FIRST_GAP : s * (FIRST_GAP + (a - 1) * STACK_GAP);
  const rot = -s * near * ROTATE;
  const z = -near * DEPTH;
  const scale = 1 - near * 0.06;
  return {
    transform: `translate(-50%, -50%) translateX(calc(var(--cf-card) * ${x.toFixed(4)})) translateZ(calc(var(--cf-card) * ${z.toFixed(4)})) rotateY(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
    zIndex: 200 - Math.round(a * 10),
    opacity: a > MAX_VISIBLE ? 0 : 1 - Math.max(0, a - (MAX_VISIBLE - 1.5)) * 0.6,
    filter: a > 0.5 && !reduce ? `brightness(${(1 - Math.min(a, 3) * 0.12).toFixed(2)})` : undefined,
  };
}

/**
 * Cinematic 3D cover flow with mirror reflections on a dark stage.
 * Navigate with arrows, dots, arrow keys, drag or swipe, or click a side
 * card. The centred card opens its link, or `onOpen` (e.g. a lightbox).
 */
export function Coverflow({
  items,
  label,
  onOpen,
  initial = 0,
  toolbar,
  allowFullscreen = false,
}: {
  items: CoverflowItem[];
  label: string;
  onOpen?: (index: number) => void;
  initial?: number;
  /** Rendered at the top of the stage, e.g. category tabs. */
  toolbar?: ReactNode;
  allowFullscreen?: boolean;
}) {
  const [active, setActive] = useState(Math.min(initial, Math.max(0, items.length - 1)));
  const [drag, setDrag] = useState(0);
  const [cardPx, setCardPx] = useState(240);
  const [isFull, setIsFull] = useState(false);
  const start = useRef<number | null>(null);
  const moved = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const id = useId();
  const count = items.length;

  const go = useCallback((to: number) => setActive(Math.max(0, Math.min(count - 1, to))), [count]);

  useEffect(() => {
    const onFs = () => setIsFull(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
    if (e.key === "Home") { e.preventDefault(); go(0); }
    if (e.key === "End") { e.preventDefault(); go(count - 1); }
  };

  const onDown = (e: PointerEvent) => {
    const card = (e.currentTarget as HTMLElement).querySelector<HTMLElement>("[aria-roledescription=slide]");
    setCardPx(card?.offsetWidth ?? 240);
    start.current = e.clientX;
    moved.current = false;
  };
  const onMove = (e: PointerEvent) => {
    if (start.current === null) return;
    let dx = e.clientX - start.current;
    if (Math.abs(dx) > 6) moved.current = true;
    if ((active === 0 && dx > 0) || (active === count - 1 && dx < 0)) dx *= 0.3; // rubber band
    setDrag(dx);
  };
  const onUp = () => {
    if (start.current === null) return;
    // One card per ~third of a card width dragged, so a swipe crosses several stacked cards.
    const steps = Math.round(-drag / (cardPx * 0.34));
    if (steps !== 0) go(active + steps);
    start.current = null;
    setDrag(0);
  };

  const toggleFullscreen = () => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  const current = items[active];
  const dragOffset = drag / (cardPx * 0.34);

  return (
    <div
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-[#141518] text-white select-none",
        isFull ? "h-full justify-center" : "rounded-2xl",
      )}
    >
      {/* Soft stage light so the centre reads first (staging) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_42%,rgba(255,255,255,0.07),transparent_70%)]" />

      {!toolbar && !allowFullscreen && <div aria-hidden="true" className="h-8 sm:h-10" />}
      {(toolbar || allowFullscreen) && (
        <div className="relative flex min-h-14 items-center justify-center px-14 pt-4">
          {toolbar}
          {allowFullscreen && (
            <button
              type="button"
              onClick={toggleFullscreen}
              className="tap absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
            >
              {isFull ? <Shrink aria-hidden="true" className="h-4 w-4" /> : <Expand aria-hidden="true" className="h-4 w-4" />}
              <span className="sr-only">{isFull ? "Exit full screen" : "View full screen"}</span>
            </button>
          )}
        </div>
      )}

      <div
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
        aria-describedby={`${id}-help`}
        className={cn(
          "relative mx-auto w-full touch-pan-y outline-offset-[-4px] [perspective:1100px] [perspective-origin:50%_45%]",
          isFull
            ? "h-[70vh] [--cf-card:clamp(180px,24vw,340px)]"
            : "h-[19rem] [--cf-card:clamp(132px,36vw,170px)] sm:h-[22rem] sm:[--cf-card:200px] lg:h-[25rem] lg:[--cf-card:230px]",
        )}
      >
        <p id={`${id}-help`} className="sr-only">Use the left and right arrow keys to move between items.</p>
        {items.map((item, i) => {
          const offset = i - active + dragOffset;
          const abs = Math.abs(offset);
          const centred = i === active;
          const style = {
            ...place(offset, reduce),
            // Far cards stay in the page (hidden) so movement never reveals gaps.
            visibility: abs > MAX_VISIBLE + 1 ? ("hidden" as const) : undefined,
            transition:
              drag || reduce
                ? "none"
                : "transform 560ms cubic-bezier(.25,1.08,.4,1), opacity 300ms var(--ease-out-soft), filter 400ms var(--ease-out-soft)",
          };

          const a11y = {
            role: "group" as const,
            "aria-roledescription": "slide",
            "aria-label": `${i + 1} of ${count}: ${item.title}`,
            tabIndex: centred ? 0 : -1,
            "data-title": item.title,
            "data-sub": [item.eyebrow, item.caption].filter(Boolean).join(" · "),
            "data-href": item.href,
          };
          const shared = cn(
            "group absolute top-[46%] left-1/2 block aspect-[3/4] w-[var(--cf-card)] [backface-visibility:hidden]",
            // Mirror reflection on the floor (Chromium and Safari; others show no reflection).
            "[-webkit-box-reflect:below_3px_linear-gradient(transparent_62%,rgba(255,255,255,0.22))]",
          );
          const face = (
            <span className="absolute inset-0 block overflow-hidden rounded-[3px] bg-night shadow-[0_24px_40px_-24px_rgba(0,0,0,0.9)] transition-transform duration-150 ease-out group-active:scale-[0.97]">
              <Photo image={item.image} tone="dark" variant={i} note="icon" notePosition="top-left" sizes="(min-width: 1024px) 240px, 40vw" />
            </span>
          );

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
                {face}
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
              {face}
            </button>
          );
        })}
      </div>

      {/* Pagination and caption */}
      <div className="relative z-10 px-4 pb-6 text-center">
        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            className="tap grid h-10 w-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-25"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </button>
          {/* Many items on a phone: a counter instead of a second row of dots. */}
          {count > 9 && (
            <p className="min-w-16 text-sm font-semibold tabular-nums sm:hidden">
              {String(active + 1).padStart(2, "0")} <span className="text-white/50">/ {String(count).padStart(2, "0")}</span>
            </p>
          )}
          <ol className={cn("flex max-w-[70vw] flex-wrap items-center justify-center", count > 9 && "max-sm:hidden")} aria-label="Choose an item">
            {items.map((it, i) => (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === active ? "true" : undefined}
                  className="group grid h-6 w-6 place-items-center"
                >
                  <span
                    className={cn(
                      "block h-1.5 w-1.5 rounded-full transition-[background-color,box-shadow,transform] duration-150",
                      i === active ? "scale-125 bg-transparent ring-[1.5px] ring-white" : "bg-white/80 group-hover:bg-white",
                    )}
                  />
                  <span className="sr-only">Show {i + 1}: {it.title}</span>
                </button>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === count - 1}
            className="tap grid h-10 w-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-25"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </button>
        </div>

        <div key={current?.id} className="anim-rise mx-auto mt-2 max-w-xl" aria-live="polite">
          <p className="text-sm font-semibold text-white">
            {current?.title}
            <span className="sr-only"> ({active + 1} of {count})</span>
          </p>
          {(current?.eyebrow || current?.caption) && (
            <p className="mt-1 text-xs text-white/60 italic">
              {[current.eyebrow, current.caption].filter(Boolean).join(" · ")}
            </p>
          )}
          {current?.href && !onOpen && (
            <Link href={current.href} className="hit-y group mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-mist hover:text-white">
              Open project <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
