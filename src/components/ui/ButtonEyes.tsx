"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* One shared tracker for every pair of eyes on the page.              */
/* ------------------------------------------------------------------ */

const pupils = new Set<HTMLElement>();
const visible = new Set<HTMLElement>();
let pointer: { x: number; y: number } | null = null;
let frame = 0;
let started = false;
let observer: IntersectionObserver | null = null;

function update() {
  frame = 0;
  if (!pointer) return;
  for (const pupil of visible) {
    const eye = pupil.parentElement;
    if (!eye) continue;
    const r = eye.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = pointer.x - cx;
    const dy = pointer.y - cy;
    const dist = Math.hypot(dx, dy) || 1;
    // How far the pupil may travel inside the eye, eased in near the eye.
    const reach = (r.width - pupil.offsetWidth) / 2 - 1;
    const pull = Math.min(dist / 120, 1) * reach;
    pupil.style.transform = `translate(${(dx / dist) * pull}px, ${(dy / dist) * pull}px)`;
  }
}

function onPointer(e: PointerEvent) {
  pointer = { x: e.clientX, y: e.clientY };
  if (!frame) frame = requestAnimationFrame(update);
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  observer = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const p = en.target as HTMLElement;
      if (en.isIntersecting) visible.add(p);
      else visible.delete(p);
    }
  });
  for (const p of pupils) observer.observe(p);
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("pointerdown", onPointer, { passive: true });
  window.addEventListener("scroll", () => !frame && (frame = requestAnimationFrame(update)), { passive: true });
}

/** A stable 0–6 s blink offset from the component's id, the same on server and client. */
function blinkDelay(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return `${((h % 60) / 10).toFixed(1)}s`;
}

/**
 * A pair of eyes for pill buttons whose pupils follow the pointer (on
 * touch screens they glance towards the last tap). They blink now and
 * then, and roll around while `busy` (a form is sending). Purely
 * decorative: hidden from assistive technology, and still for people who
 * prefer reduced motion.
 */
export function ButtonEyes({ busy = false, size = "md", className }: { busy?: boolean; size?: "md" | "lg"; className?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const delay = blinkDelay(useId());

  useEffect(() => {
    const els = [...(root.current?.querySelectorAll<HTMLElement>(".btn-pupil") ?? [])];
    for (const el of els) {
      pupils.add(el);
      observer?.observe(el);
    }
    start();
    return () => {
      for (const el of els) {
        pupils.delete(el);
        visible.delete(el);
        observer?.unobserve(el);
      }
    };
  }, []);

  return (
    <span ref={root} aria-hidden="true" className={cn("btn-eyes", size === "lg" && "btn-eyes-lg", busy && "is-busy", className)}>
      <span className="btn-eye" style={{ animationDelay: delay }}>
        <span className="btn-pupil" />
      </span>
      <span className="btn-eye" style={{ animationDelay: delay }}>
        <span className="btn-pupil" />
      </span>
    </span>
  );
}
