import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import Link from "next/link";
import { ArrowRight, FileText, Quote } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ContentNote } from "@/components/ui/ContentNote";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/home/CountUp";
import { ImpactNav } from "@/components/impact/ImpactNav";
import { images } from "@/content/images";
import { getImpactStats, getImpactStories, getPathway, getReports } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Our Impact",
  description: "Chris Charis Concept's impact since 2020: 26 projects, 6 films, 4 HHCP editions, 1,200+ young people reached and a Dakar 2025 delegation.",
  path: "/impact",
});

export default async function ImpactPage() {
  const [stats, pathway, stories, reports] = await Promise.all([
    getImpactStats(),
    getPathway(),
    getImpactStories(),
    getReports(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Our Impact"
        subtitle="Real change. Lasting difference."
        image={images.impactHero}
        crumbs={[{ label: "Impact" }]}
      />
      <ImpactNav current="/impact" />

      {/* Headline figures as an evidence register */}
      <section aria-labelledby="figures-title" className="py-20 lg:py-28">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand-ink">Headline figures</p>
              <h2 id="figures-title" className="mt-3 text-h2 font-semibold">What six years of work adds up to.</h2>
            </div>
            <p className="max-w-xs text-sm text-slate-ink">
              Figures come from our monitoring and evaluation records and are reviewed every quarter.
            </p>
          </div>

          <ul className="mt-14 border-t-2 border-ink">
            {stats.map((s, i) => {
              const evidence = !s.href.startsWith("/impact");
              return (
                <Reveal as="li" key={s.id} delay={i * 0.05} className="border-b border-line">
                  <div id={s.id === "dakar" ? "dakar-2025" : undefined} className="grid scroll-mt-28 gap-4 py-8 md:grid-cols-[minmax(12rem,1fr)_2fr_auto] md:items-center md:gap-10">
                    <p className="font-display text-[clamp(3rem,2rem+3vw,4.75rem)] leading-none font-bold tracking-tight text-ink">
                      {s.value !== null ? <CountUp value={s.value} display={s.display} /> : s.display}
                    </p>
                    <div>
                      <p className="text-lg font-semibold text-ink">{s.label}</p>
                      <p className="mt-1 text-slate-ink">{s.detail}</p>
                      <p className="mt-2 text-xs text-slate-ink">Source: {s.source} · as of {s.asOf}</p>
                    </div>
                    {evidence ? (
                      <Link href={s.href} className="hit-y group inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
                        See the evidence <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        <span className="sr-only">for {s.label}</span>
                      </Link>
                    ) : (
                      <span className="text-xs text-slate-ink md:max-w-40">Evidence document to be linked</span>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </ul>
          <ContentNote className="mt-8 max-w-2xl">
            The M&amp;E tracker summary behind 1,200+ young people reached, and photos, dates and outcomes of the Dakar 2025 delegation.
          </ContentNote>
        </div>
      </section>

      {/* Impact along the pathway */}
      <section aria-labelledby="pathway-impact-title" className="bg-ink py-20 text-white lg:py-28">
        <div className="container-site">
          <p className="eyebrow text-mist">How change happens</p>
          <h2 id="pathway-impact-title" className="mt-3 max-w-2xl text-h2 font-semibold text-white!">
            Every result sits on one pathway.
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {pathway.map((p, i) => (
              <li key={p.key} className="flex flex-col bg-ink p-8">
                <p className="text-xs font-semibold tracking-[0.2em] text-white/50">0{i + 1}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white!">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{p.text}</p>
                <Link href={p.href} className="hit-y group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mist hover:text-white">
                  {p.linkLabel} <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stories and reports */}
      <section aria-label="Stories and reports" className="py-20 lg:py-28">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <article className="flex flex-col rounded-2xl bg-paper p-8 sm:p-10">
            <Quote aria-hidden="true" className="h-8 w-8 text-brand" />
            <h2 className="mt-6 text-h3 font-semibold">Impact stories</h2>
            <p className="mt-3 flex-1 leading-relaxed text-slate-ink">
              {stories.length > 0
                ? `${stories.length} ${stories.length === 1 ? "story" : "stories"} of change from our projects, shared with consent.`
                : "Stories of change from the people our projects reach, shared only with their consent."}
            </p>
            <Link href="/impact/stories" className="hit-y group mt-6 inline-flex items-center gap-2 font-semibold text-brand-ink">
              Read the stories <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </article>
          <article className="flex flex-col rounded-2xl bg-paper p-8 sm:p-10">
            <FileText aria-hidden="true" className="h-8 w-8 text-brand" />
            <h2 className="mt-6 text-h3 font-semibold">Annual reports</h2>
            <p className="mt-3 flex-1 leading-relaxed text-slate-ink">
              {reports.length > 0
                ? `Latest: ${reports[0].title} (${reports[0].period}).`
                : "Our reports library. The FY2026/27 annual report will be published here once it is available."}
            </p>
            <Link href="/impact/reports" className="hit-y group mt-6 inline-flex items-center gap-2 font-semibold text-brand-ink">
              Reports library <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </article>
        </div>
      </section>

      <section aria-labelledby="impact-cta-title" className="bg-mist py-20">
        <div className="container-site grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 id="impact-cta-title" className="text-h2 font-semibold">Help us reach the next 1,200.</h2>
            <p className="mt-4 max-w-xl text-lead text-slate-ink">Every gift and partnership funds more films, outreaches and training.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink href="/donate" arrow={false}>Donate</ButtonLink>
            <ButtonLink href="/get-involved/partner" variant="outline">Partner with us</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
