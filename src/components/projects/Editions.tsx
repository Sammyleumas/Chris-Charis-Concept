import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clapperboard, Play } from "lucide-react";
import type { ProjectFamily, ProjectItem } from "@/content/types";
import { ContentNote } from "@/components/ui/ContentNote";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

function Heading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-brand-ink">{eyebrow}</p>
      <h2 className="mt-3 text-h2 font-semibold">{title}</h2>
      {intro && <p className="mt-4 text-lead text-slate-ink">{intro}</p>}
    </div>
  );
}

function ItemLink({ item, children, className }: { item: ProjectItem; children: React.ReactNode; className?: string }) {
  if (!item.href) return <div className={className}>{children}</div>;
  const external = item.href.startsWith("http");
  return external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cn("group", className)}>{children}</a>
  ) : (
    <Link href={item.href} className={cn("group", className)}>{children}</Link>
  );
}

/** Film for Social Change: a numbered film list, like a programme of screenings. */
export function FilmEditions({ family }: { family: ProjectFamily }) {
  return (
    <section aria-label="Films and productions" className="py-20 lg:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Heading eyebrow="Films & productions" title="Stories that start conversations." />
          <p className="mt-6 text-sm text-slate-ink">
            Films will be playable here once their YouTube links are supplied.
          </p>
        </div>
        <ol className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
          {family.items.map((f, i) => (
            <Reveal as="li" key={f.name} delay={i * 0.04} className="flex items-center gap-6 py-6">
              <span className="w-8 font-display text-sm font-semibold text-slate-ink tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">
                <span className="block font-display text-xl font-semibold text-ink">{f.name}</span>
                {f.summary && <span className="mt-1 block text-sm text-slate-ink">{f.summary}</span>}
              </span>
              {f.youtubeUrl ? (
                <a href={f.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep">
                  <Play aria-hidden="true" className="h-3.5 w-3.5 fill-current" /> Watch<span className="sr-only"> {f.name} (opens in a new tab)</span>
                </a>
              ) : (
                <Clapperboard aria-hidden="true" className="h-5 w-5 text-slate" />
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Healthy Heart: numbered editions as a strip, followed by related campaigns and events. */
export function HeartEditions({ family }: { family: ProjectFamily }) {
  const editions = family.items.filter((i) => i.name.startsWith("HHCP"));
  const others = family.items.filter((i) => !i.name.startsWith("HHCP"));
  return (
    <section aria-label="Editions and campaigns" className="py-20 lg:py-28">
      <div className="container-site">
        <Heading eyebrow="Editions" title="Four completed editions." intro="Each Healthy Heart edition takes the conversation about health and well-being further into the community." />
        <ol className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-4">
          {editions.map((e, i) => (
            <Reveal as="li" key={e.name} delay={i * 0.06} className="bg-white p-8">
              <p className="font-display text-5xl font-bold text-brand-ink">{e.name.replace("HHCP ", "")}</p>
              <p className="mt-3 text-sm font-semibold text-ink">{e.name}</p>
            </Reveal>
          ))}
        </ol>
        <ContentNote className="mt-6 max-w-2xl">Dates, venues and outcomes for each HHCP edition; confirm whether HHCP 5.0 has taken place.</ContentNote>

        <h3 className="mt-20 text-h3 font-semibold">Campaigns and events</h3>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {others.map((o) => (
            <li key={o.name} className="rounded-2xl border border-line p-7">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-display text-xl font-semibold text-ink">{o.name}</p>
                {o.date && <p className="text-sm font-semibold text-brand-ink tabular-nums">{o.date}</p>}
              </div>
              {o.summary && <p className="mt-2 text-sm leading-relaxed text-slate-ink">{o.summary}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Learn To Lead → SOUL: a three-step progression. */
export function LeadEditions({ family }: { family: ProjectFamily }) {
  return (
    <section aria-label="Programme journey" className="py-20 lg:py-28">
      <div className="container-site">
        <Heading eyebrow="The journey" title="From two editions to a school of leadership." />
        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {family.items.map((s, i) => {
            const last = i === family.items.length - 1;
            return (
              <Reveal as="li" key={s.name} delay={i * 0.1}>
                <ItemLink
                  item={s}
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl p-8",
                    last ? "bg-ink text-white" : "border border-line bg-white",
                  )}
                >
                  <p className={cn("text-xs font-semibold tracking-[0.2em]", last ? "text-mist" : "text-slate-ink")}>STEP {i + 1}</p>
                  <p className={cn("mt-6 font-display text-3xl font-bold", last ? "text-white" : "text-ink")}>{s.name}</p>
                  {s.summary && <p className={cn("mt-3 text-sm leading-relaxed", last ? "text-white/75" : "text-slate-ink")}>{s.summary}</p>}
                  {s.href && (
                    <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-mist">
                      About SOUL <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  )}
                </ItemLink>
              </Reveal>
            );
          })}
        </ol>
        <ContentNote className="mt-6 max-w-2xl">Names and descriptions of SOUL’s seven faculties, and Learn To Lead edition details.</ContentNote>
      </div>
    </section>
  );
}

/** Fusion: grouped by programmes, editions and the enterprises it created. */
export function FusionEditions({ family }: { family: ProjectFamily }) {
  const groups = ["Programmes", "Editions", "Enterprises"];
  return (
    <section aria-label="Fusion programmes and enterprises" className="py-20 lg:py-28">
      <div className="container-site">
        <Heading eyebrow="Inside Fusion" title="Programmes, editions and enterprises." />
        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {groups.map((g) => (
            <div key={g}>
              <h3 className="border-b-2 border-ink pb-3 font-display text-lg font-semibold">{g}</h3>
              <ul className="divide-y divide-line">
                {family.items.filter((i) => i.group === g).map((item) => (
                  <li key={item.name}>
                    <ItemLink item={item} className="flex items-start justify-between gap-4 py-5">
                      <span>
                        <span className="block font-semibold text-ink group-hover:text-brand-ink">{item.name}</span>
                        {item.date && <span className="mt-0.5 block text-sm font-semibold text-brand-ink">{item.date}</span>}
                        {item.summary && <span className="mt-1 block text-sm leading-relaxed text-slate-ink">{item.summary}</span>}
                      </span>
                      {item.href && (item.href.startsWith("http") ? (
                        <ArrowUpRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand-ink" />
                      ) : (
                        <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand-ink transition-transform group-hover:translate-x-0.5" />
                      ))}
                    </ItemLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ContentNote className="mt-10 max-w-2xl">Dates and highlights for FUSION 1.0–3.0, the School Tour, the Africa Tour and the Fusion Art and Tech Awards.</ContentNote>
      </div>
    </section>
  );
}

/** Chris Charis Brand: three editorial project cards. */
export function BrandEditions({ family }: { family: ProjectFamily }) {
  return (
    <section aria-label="Brand projects" className="bg-paper py-20 lg:py-28">
      <div className="container-site">
        <Heading eyebrow="Projects" title="Content and community with purpose." />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {family.items.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 0.08} className="flex flex-col rounded-2xl bg-white p-8 ring-1 ring-line">
              <p className="font-display text-sm font-semibold text-brand-ink tabular-nums">0{i + 1}</p>
              <h3 className="mt-10 text-h3 font-semibold">{p.name}</h3>
              {p.summary && <p className="mt-3 text-sm text-slate-ink">{p.summary}</p>}
            </Reveal>
          ))}
        </ul>
        <ContentNote className="mt-6 max-w-2xl">Descriptions and links for the MayBe Challenge, the Chris Charis Community and the Book Project.</ContentNote>
      </div>
    </section>
  );
}
