"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { TimelineEntry } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Interactive vertical timeline (brief §5.2): filter by year; the spine
 * fills as you scroll. Alternates sides on desktop, single column on mobile.
 */
export function StoryTimeline({ entries }: { entries: TimelineEntry[] }) {
  const years = [...new Set(entries.map((e) => e.year))];
  const [year, setYear] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const shown = year === null ? entries : entries.filter((e) => e.year === year);

  return (
    <div>
      <div role="group" aria-label="Filter by year" className="flex flex-wrap gap-2">
        {[null, ...years].map((y) => {
          const active = year === y;
          return (
            <button
              key={y ?? "all"}
              type="button"
              aria-pressed={active}
              onClick={() => setYear(y)}
              className={cn(
                "h-10 rounded-full px-4 text-sm font-semibold tabular-nums transition-colors",
                active ? "bg-ink text-white" : "bg-white text-charcoal ring-1 ring-line hover:ring-ink/40",
              )}
            >
              {y ?? "All years"}
            </button>
          );
        })}
      </div>

      <div ref={ref} className="relative mt-14">
        {/* Spine */}
        <div aria-hidden="true" className="absolute top-0 bottom-0 left-[0.6875rem] w-0.5 bg-line md:left-1/2 md:-translate-x-1/2">
          {!reduce && (
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-brand" />
          )}
        </div>

        <ol className="space-y-12 md:space-y-4">
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((e, i) => {
              const right = i % 2 === 1;
              return (
                <motion.li
                  key={e.title}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid pl-12 md:grid-cols-2 md:gap-16 md:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 left-0 h-6 w-6 rounded-full border-4 border-white bg-brand shadow-[0_0_0_1px_var(--color-line)] md:left-1/2 md:-translate-x-1/2"
                  />
                  <div className={cn("md:py-6", right ? "md:col-start-2" : "md:text-right")}>
                    <p className="font-display text-sm font-semibold text-brand-ink">
                      <time>{e.date}</time>
                    </p>
                    <h3 className="mt-2 text-h3 font-semibold">{e.title}</h3>
                    <p className={cn("mt-3 max-w-md leading-relaxed text-slate-ink", !right && "md:ml-auto")}>{e.text}</p>
                    {e.href && (
                      <Link
                        href={e.href}
                        className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink hover:text-brand-deep"
                      >
                        View project
                        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        <span className="sr-only">: {e.title}</span>
                      </Link>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
      </div>
    </div>
  );
}
