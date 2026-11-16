import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";
import { images } from "@/content/images";
import { getOrganisations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Organisations",
  description:
    "The social enterprise, Fusion Connect Academy, Fusion Solutions Hub, the Chris Charis Brand and SOUL: the organisations of the Chris Charis Concept family.",
};

export default async function OrganisationsPage() {
  const orgs = await getOrganisations();
  const [parent, ...arms] = orgs;

  return (
    <>
      <PageHero
        eyebrow="Our Organisations"
        title="Our Organisations"
        subtitle="Building capacity. Expanding impact."
        image={images.orgSocialEnterprise}
        crumbs={[{ label: "Our Organisations" }]}
      />

      {/* Structure: one master brand, distinct arms */}
      <section aria-labelledby="structure-title" className="py-20 lg:py-28">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-ink">How we are organised</p>
            <h2 id="structure-title" className="mt-3 text-h2 font-semibold">One master brand. Five organisations.</h2>
            <p className="mt-4 text-lead text-slate-ink">
              Chris Charis Concept is the master brand. Each organisation keeps its own name and audience, and every success builds the whole family.
            </p>
          </div>

          <div className="mt-14">
            <Link
              href={`/organisations/${parent.slug}`}
              className="group mx-auto block max-w-xl rounded-2xl bg-ink p-7 text-center text-white transition-colors hover:bg-brand-deep"
            >
              <p className="eyebrow text-mist">Parent organisation</p>
              <p className="mt-3 font-display text-2xl font-semibold">{site.name}</p>
              <p className="mt-2 text-sm text-white/70">{site.legalName} · {site.registrationNumber}</p>
            </Link>
            <div aria-hidden="true" className="mx-auto h-10 w-px bg-line" />
            <div aria-hidden="true" className="mx-auto hidden h-px w-3/4 bg-line md:block" />
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:pt-10">
              {arms.map((o) => (
                <li key={o.slug} className="relative">
                  <span aria-hidden="true" className="absolute -top-10 left-1/2 hidden h-10 w-px bg-line md:block" />
                  <Link
                    href={`/organisations/${o.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line p-6 transition-colors hover:border-brand/50 hover:bg-mist/50"
                  >
                    <span className="font-display text-lg font-semibold text-ink group-hover:text-brand-ink">{o.name}</span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-ink">{o.line}</span>
                    <ArrowRight aria-hidden="true" className="mt-4 h-4 w-4 text-brand-ink transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Editorial list, as in the approved mock-up */}
      <section aria-label="All organisations" className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          <ul className="divide-y divide-line border-y border-line">
            {orgs.map((o, i) => (
              <Reveal as="li" key={o.slug} delay={i * 0.04}>
                <Link href={`/organisations/${o.slug}`} className="group grid items-center gap-6 py-8 sm:grid-cols-[14rem_1fr_auto] sm:gap-10">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-mist">
                    <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]">
                      <Photo image={o.image} sizes="(min-width: 640px) 224px, 100vw" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-h3 font-semibold group-hover:text-brand-ink">{o.name}</h2>
                    <p className="mt-2 max-w-xl text-slate-ink">{o.line}</p>
                    <p className="mt-3 text-sm text-slate-ink/90">{o.relationship}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
                    Learn more <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    <span className="sr-only">about {o.name}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
