import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProjectFamily } from "@/content/types";

type MenuFamily = Pick<ProjectFamily, "slug" | "name" | "year" | "line">;

export function MegaMenu({ id, families }: { id: string; families: MenuFamily[] }) {
  return (
    <div id={id} className="anim-menu fixed inset-x-0 top-20 px-6 pt-1">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_2.6fr] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-ink/5">
        <div className="flex flex-col justify-between bg-ink p-8 text-white">
          <div>
            <p className="eyebrow text-mist">Our Work</p>
            <p className="mt-3 font-display text-2xl leading-tight font-semibold">
              Five project families, one pathway.
            </p>
            <p className="mt-3 text-sm text-white/65">Tell → Reach → Build → Earn &amp; Lead</p>
          </div>
          <Link
            href="/our-work"
            className="hit-y mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-mist"
          >
            Explore all our work <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-1 p-4">
          {families.map((f) => (
            <li key={f.slug}>
              <Link
                href={`/our-work/${f.slug}`}
                className="group flex h-full gap-4 rounded-xl p-4 transition-colors hover:bg-mist"
              >
                <span className="font-display text-sm font-semibold text-brand-ink tabular-nums">{f.year}</span>
                <span>
                  <span className="block font-display text-[0.95rem] font-semibold text-ink group-hover:text-brand-ink">
                    {f.name}
                  </span>
                  <span className="mt-1 block text-[0.82rem] leading-relaxed text-slate-ink">{f.line}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
