import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { Coverflow } from "@/components/media/Coverflow";
import { images } from "@/content/images";
import { getPathway, getProjectFamilies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Five project families since 2020: Film for Social Change, Healthy Heart, Learn To Lead → SOUL, Fusion Creative Project and the Chris Charis Brand.",
};

export default async function OurWorkPage() {
  const [families, pathway] = await Promise.all([getProjectFamilies(), getPathway()]);
  const stageFor: Record<string, string> = Object.fromEntries(
    pathway.map((p) => [p.href.replace("/our-work/", ""), p.title]),
  );

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Our Work"
        subtitle="Creative projects. Real impact."
        image={images.fusion}
        crumbs={[{ label: "Our Work" }]}
      />

      {/* Coverflow (mock-up: Our Work page) */}
      <section aria-labelledby="families-title" className="overflow-hidden py-20 lg:py-24">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-brand-ink">Our projects</p>
              <h2 id="families-title" className="mt-3 text-h2 font-semibold">Five project families since 2020</h2>
            </div>
            <p className="max-w-sm text-sm text-slate-ink">Drag, swipe or use the arrows. Select the centre card to open a project.</p>
          </div>
        </div>
        <div className="mt-12">
          <Coverflow
            label="Project families"
            initial={3}
            items={families.map((f) => ({
              id: f.slug,
              title: f.name,
              eyebrow: String(f.year),
              caption: f.line,
              image: f.image,
              href: `/our-work/${f.slug}`,
            }))}
          />
        </div>
      </section>

      {/* Editorial index of every family */}
      <section aria-label="All project families" className="bg-paper py-20 lg:py-28">
        <div className="container-site space-y-20 lg:space-y-28">
          {families.map((f, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={f.slug}>
                <article className="grid items-center gap-10 lg:grid-cols-12">
                  <Link
                    href={`/our-work/${f.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    className={`group relative block aspect-[16/11] overflow-hidden rounded-sm lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}
                  >
                    <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]">
                      <Photo image={f.image} sizes="(min-width: 1024px) 58vw, 100vw" />
                    </div>
                  </Link>
                  <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}>
                    <p className="flex items-center gap-3 text-sm font-semibold text-brand-ink">
                      <span className="tabular-nums">{f.year}</span>
                      {stageFor[f.slug] && (
                        <span className="rounded-full bg-mist px-2.5 py-0.5 text-xs">{stageFor[f.slug]}</span>
                      )}
                    </p>
                    <h2 className="mt-3 text-h2 font-semibold">
                      <Link href={`/our-work/${f.slug}`} className="hover:text-brand-ink">{f.name}</Link>
                    </h2>
                    <p className="mt-4 leading-relaxed text-slate-ink">{f.intro}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {f.items.slice(0, 6).map((item) => (
                        <li key={item.name} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-charcoal ring-1 ring-line">
                          {item.name}
                        </li>
                      ))}
                      {f.items.length > 6 && (
                        <li className="px-1 py-1 text-xs text-slate-ink">+{f.items.length - 6} more</li>
                      )}
                    </ul>
                    <Link
                      href={`/our-work/${f.slug}`}
                      className="group mt-8 inline-flex items-center gap-2 font-semibold text-brand-ink"
                    >
                      Explore {f.shortName}
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
