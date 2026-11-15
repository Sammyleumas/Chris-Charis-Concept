"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Renders the final value in the HTML (visible without JavaScript and to
 * search engines), then counts up once when scrolled into view.
 */
export function CountUp({ value, display }: { value: number; display: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const el = ref.current;
    const suffix = display.replace(/[\d,]/g, "");
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-GB") + suffix;
      },
      onComplete: () => {
        el.textContent = display;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, display]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
