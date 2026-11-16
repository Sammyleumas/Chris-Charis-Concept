import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ProjectFamily } from "@/content/types";
import { getProjectFamilies } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { ContentNote } from "@/components/ui/ContentNote";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectGallery } from "./ProjectGallery";
import { MaybeCount } from "@/components/home/CountUp";

/**
 * Shared template for every project family page (brief §5.3):
 * header band · external link bar · about · editions/outputs (passed in, so
 * each family can lay them out its own way) · results · gallery · partners ·
 * call to action · related projects.
 */
export async function ProjectPage({ family, editions }: { family: ProjectFamily; editions: ReactNode }) {
  const all = await getProjectFamilies();
  const related = all.filter((f) => family.related.includes(f.slug));
  const liveLinks = family.externalLinks.filter((l) => l.url);
  const missingLinks = family.externalLinks.filter((l) => !l.url);
  const ctaLive = family.cta.actions.filter((a) => a.url);
  const accent = family.accent ? { ["--project-accent" as string]: family.accent } : undefined;

  return (
    <div style={accent}>
      {/* Header band */}
      <section className="edge-slant relative isolate overflow-hidden bg-ink [--slant:3.5vw]">
        <div className="absolute inset-0 -z-10 lg:left-[38%]">
          <Photo image={family.image} tone="dark" priority notePosition="top-right" sizes="(min-width: 1024px) 62vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/10" />
        </div>
        <div className="container-site pt-32 pb-24 md:pt-40 lg:pb-32">
          <Breadcrumbs items={[{ label: "Our Work", href: "/our-work" }, { label: family.name }]} />
          <div className="mt-10 flex items-center gap-4">
            <span className="font-display text-5xl font-bold text-[var(--project-accent,var(--color-brand))] tabular-nums sm:text-6xl">
              {family.year}
            </span>
            <span className="h-px w-10 bg-white/30" aria-hidden="true" />
            <span className="eyebrow text-white/70">A Chris Charis Concept initiative</span>
          </div>
          <h1 className="mt-6 max-w-3xl text-h1 font-bold text-white!">{family.name}</h1>
          <p className="mt-6 max-w-xl text-lead text-white/80">{family.intro}</p>
        </div>
      </section>

      {/* External link bar */}
      <div className="border-b border-line bg-white">
        <div className="container-site flex flex-wrap items-center gap-x-6 gap-y-3 py-5">
          <span className="text-xs font-semibold tracking-[0.14em] text-slate-ink uppercase">Find the project</span>
          {liveLinks.map((l) => (
            <a
              key={l.label}
              href={l.url!}
              target="_blank"
              rel="noopener noreferrer"
              data-track="project_link_click"
              data-track-label={`${family.shortName}: ${l.label}`}
              className="hit-y inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink hover:text-brand-deep"
            >
              {l.label} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
          {missingLinks.length > 0 && (
            <ContentNote className="py-1.5 text-xs">
              {missingLinks.map((l) => l.label).join(", ")} and project social handles (brief §7).
            </ContentNote>
          )}
        </div>
      </div>

      {/* Editions / outputs (family-specific layout) */}
      {editions}

      {/* Results */}
      <section aria-labelledby="results-title" className="bg-ink py-20 text-white lg:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-mist">Results</p>
            <h2 id="results-title" className="mt-3 text-h2 font-semibold text-white!">What it has achieved</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {family.results.length > 0 ? (
              <dl className="grid gap-8 sm:grid-cols-2">
                {family.results.map((r) => (
                  <div key={r.label} className="border-t border-white/20 pt-5">
                    <dt className="sr-only">{r.label}</dt>
                    <dd className="font-display text-6xl leading-none font-bold"><MaybeCount display={r.value} /></dd>
                    <dd className="mt-3 font-semibold">{r.label}</dd>
                    <dd className="mt-1 text-xs text-white/55">Source: {r.source}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <ContentNote className="mt-8 border-white/25 bg-white/5 text-white/80 [&_span]:text-mist">
              Further verified results for {family.shortName} from the M&amp;E tracker, each with its source.
            </ContentNote>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-title" className="py-20 lg:py-28">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="gallery-title" className="text-h2 font-semibold">In pictures</h2>
            <Link href="/media/gallery" className="hit-y group inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
              Full gallery <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ProjectGallery images={family.gallery} familyName={family.shortName} />
        </div>
      </section>

      {/* Partners */}
      <section aria-labelledby="project-partners-title" className="border-t border-line py-14">
        <div className="container-site flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 id="project-partners-title" className="eyebrow text-slate-ink">{family.shortName} partners</h2>
          <ContentNote className="max-w-xl">Partner logos for this project, with permission to display.</ContentNote>
        </div>
      </section>

      {/* Call to action */}
      <section aria-labelledby="cta-title" className="bg-mist py-20 lg:py-24">
        <div className="container-site grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 id="cta-title" className="text-h2 font-semibold">{family.cta.title}</h2>
            <p className="mt-4 max-w-xl text-lead text-slate-ink">{family.cta.text}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {ctaLive.map((a, i) => (
              <ButtonLink key={a.label} href={a.url!} external={a.external} variant={i === 0 ? "primary" : "outline"}>
                {a.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section aria-labelledby="related-title" className="py-20 lg:py-28">
        <div className="container-site">
          <p className="eyebrow text-brand-ink">On the pathway</p>
          <h2 id="related-title" className="mt-3 text-h2 font-semibold">Related projects</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {related.map((r, i) => (
              <Reveal as="li" key={r.slug} delay={i * 0.08}>
                <Link href={`/our-work/${r.slug}`} className="group grid gap-5 sm:grid-cols-[12rem_1fr] sm:items-center">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-mist">
                    <Photo image={r.image} sizes="(min-width: 640px) 192px, 100vw" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-ink tabular-nums">{r.year}</p>
                    <h3 className="mt-1 text-h3 font-semibold group-hover:text-brand-ink">{r.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-ink">{r.line}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
