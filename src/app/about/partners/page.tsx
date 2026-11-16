import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { ContentNote } from "@/components/ui/ContentNote";
import { ButtonLink } from "@/components/ui/Button";
import { AboutNav } from "@/components/about/AboutNav";
import { getPartners } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Our Partners",
  description: "The organisations Chris Charis Concept works alongside, and what we have done together.",
  path: "/about/partners",
});

export default async function PartnersPage() {
  const partners = await getPartners();
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Our Partners"
        subtitle="Governments, NGOs, schools, businesses and development partners we work alongside."
        crumbs={[{ label: "About", href: "/about" }, { label: "Partners" }]}
      />
      <AboutNav current="/about/partners" />
      <section aria-label="Partner list" className="py-20 lg:py-28">
        <div className="container-site">
          {partners.length > 0 ? (
            <ul className="grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((p) => (
                <li key={p.name} className="flex flex-col bg-white p-8">
                  <div className="relative h-16 w-40">
                    {p.logo.src && <Image src={p.logo.src} alt={`${p.name} logo`} fill sizes="160px" className="object-contain object-left" />}
                  </div>
                  <h2 className="mt-6 text-lg font-semibold">{p.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-ink">{p.collaboration}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ContentNote className="max-w-2xl">
              Partner logos, one line per partner on what was done together, and permission to display each logo.
              Arts in Medicine Projects (NAHCON, May 2021) can be listed once the partnership is confirmed.
            </ContentNote>
          )}
        </div>
      </section>
      <section className="bg-mist py-20">
        <div className="container-site grid items-center gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="text-h2 font-semibold">Partner with us.</h2>
            <p className="mt-4 max-w-xl text-lead text-slate-ink">
              Sponsor a programme, co-produce a film or bring Fusion to your school or community.
            </p>
          </div>
          <ButtonLink href="/get-involved/partner" className="justify-self-start lg:justify-self-end">Start a conversation</ButtonLink>
        </div>
      </section>
    </>
  );
}
