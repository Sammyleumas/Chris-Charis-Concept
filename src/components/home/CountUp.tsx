"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * A number that counts up from zero when it scrolls into view.
 * The final value is in the HTML (visible without JavaScript, to search
 * engines and screen readers); reduced-motion visitors see it unchanged.
 */
export function CountUp({ value, display, duration = 2.2 }: { value: number; display: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const el = ref.current;
    const suffix = display.replace(/[\d,]/g, "");
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-GB") + suffix;
      },
      onComplete: () => {
        el.textContent = display;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, display, duration]);

  return (
    <span ref={ref} className="tabular-nums" data-countup={value} data-display={display}>
      {display}
    </span>
  );
}

/** Renders a display string as a counting number when it is numeric (e.g. "26", "1,200+"). */
export function MaybeCount({ display }: { display: string }) {
  const m = display.match(/^(\d[\d,]*)(\+?)$/);
  if (!m) return <>{display}</>;
  return <CountUp value={Number(m[1].replace(/,/g, ""))} display={display} />;
}
