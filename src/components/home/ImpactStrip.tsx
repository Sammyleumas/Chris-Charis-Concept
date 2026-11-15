import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ImpactStat } from "@/content/types";
import { CountUp } from "./CountUp";

/** Verified headline figures (brief §5.1). Each links to its evidence. */
export function ImpactStrip({ stats }: { stats: ImpactStat[] }) {
  return (
    <section aria-labelledby="impact-strip-title" className="relative z-10 -mt-[5vw]">
      <div className="container-site">
        <h2 id="impact-strip-title" className="sr-only">Our impact at a glance</h2>
        <ul className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-30px_rgba(23,24,28,0.35)] ring-1 ring-ink/5 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((s, i) => (
            <li
              key={s.id}
              className={[
                "border-line",
                i % 2 === 1 ? "border-l" : "",
                i >= 2 ? "border-t" : "",
                "md:border-t-0 md:border-l md:[&:nth-child(3n+1)]:border-l-0 md:[&:nth-child(n+4)]:border-t",
                "lg:[&:nth-child(n)]:border-t-0 lg:[&:nth-child(n)]:border-l lg:first:border-l-0",
                i === stats.length - 1 ? "col-span-2 md:col-span-1" : "",
              ].join(" ")}
            >
              <Link href={s.href} className="group flex h-full flex-col p-6 transition-colors hover:bg-mist/60 lg:p-8">
                <span className="font-display text-[clamp(2.25rem,1.6rem+2vw,3.25rem)] leading-none font-bold tracking-tight text-ink">
                  {s.value !== null ? <CountUp value={s.value} display={s.display} /> : s.display}
                </span>
                <span className="mt-3 text-sm font-semibold text-charcoal">{s.label}</span>
                <span className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-ink">
                  {s.detail}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-brand-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
