"use client";

import { useEffect, useRef } from "react";

/** Elements the ring grows over. */
const INTERACTIVE = 'a[href], button:not(:disabled), [role="button"], [role="switch"], label, summary, select';
/** Fields where the ring steps aside so it never covers typing. */
const TEXT_FIELD = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]';

/**
 * A soft ring that glides after the mouse. It grows over links and
 * buttons, shrinks while pressed, hides over text fields, and turns into a
 * labelled bubble over elements marked `data-cursor="View"` (photos,
 * carousel cards). The real pointer stays visible, so precision is never
 * affected. Mouse and trackpad only, and off for reduced motion.
 */
export function CursorFollower() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let x = -100, y = -100; // pointer
    let cx = -100, cy = -100; // ring
    let frame = 0;
    let shown = false;

    const tick = () => {
      // Ease towards the pointer; frame-rate independent enough at 60–120 Hz.
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(tick) : 0;
    };

    const setState = (target: Element | null) => {
      const tagged = target?.closest<HTMLElement>("[data-cursor]");
      const state = tagged ? "label" : target?.closest(TEXT_FIELD) ? "text" : target?.closest(INTERACTIVE) ? "hover" : "idle";
      el.dataset.state = state;
      if (label.current) label.current.textContent = tagged?.dataset.cursor ?? "";
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        cx = x;
        cy = y;
        el.dataset.visible = "";
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onOver = (e: PointerEvent) => e.pointerType === "mouse" && setState(e.target as Element);
    const onDown = () => (el.dataset.pressed = "");
    const onUp = () => delete el.dataset.pressed;
    const onLeave = () => {
      shown = false;
      delete el.dataset.visible;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="cursor-follower" data-state="idle">
      <span className="cursor-ring" />
      <span ref={label} className="cursor-label" />
    </div>
  );
}
