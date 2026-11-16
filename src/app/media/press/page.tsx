import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { MediaNav } from "@/components/media/MediaNav";
import { site } from "@/config/site";
import { getImpactStats, getPressAssets, getProjectFamilies } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Press Kit",
  description: "Fact sheet, logos and approved materials about Chris Charis Concept for journalists and partners.",
  path: "/media/press",
});

export default async function PressPage() {
  const [assets, stats, families] = await Promise.all([getPressAssets(), getImpactStats(), getProjectFamilies()]);
  const facts: [string, string][] = [
    ["Name", site.name],
    ["Registered name", `${site.legalName} (${site.registrationNumber})`],
    ["Type", site.organisationType],
    ["Based in", `${site.location.city}, ${site.location.state}, ${site.location.country}`],
    ["Founded", site.foundedLabel],
    ["Project families", families.map((f) => `${f.name} (${f.year})`).join(" · ")],
    ["Key figures", stats.map((s) => `${s.display}: ${s.label}`).join(" · ")],
  ];

  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Press Kit"
        subtitle="Facts, logos and approved materials for journalists and partners."
        crumbs={[{ label: "Media", href: "/media" }, { label: "Press Kit" }]}
      />
      <MediaNav current="/media/press" />

      <section aria-labelledby="facts-title" className="py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-brand-ink">Fact sheet</p>
            <h2 id="facts-title" className="mt-3 text-h2 font-semibold">At a glance</h2>
            <p className="mt-4 leading-relaxed text-slate-ink">Verified facts you can quote. Figures as of October 2026.</p>
          </div>
          <div className="lg:col-span-8">
            <dl className="divide-y divide-line border-y border-line">
              {facts.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-sm text-slate-ink">{k}</dt>
                  <dd className="font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <h3 className="mt-10 text-lg font-semibold">Boilerplate</h3>
            <blockquote className="mt-3 border-l-2 border-brand pl-5 leading-relaxed text-charcoal">{site.shortDescription}</blockquote>
          </div>
        </div>
      </section>

      <section aria-labelledby="downloads-title" className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          <h2 id="downloads-title" className="text-h2 font-semibold">Downloads</h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {assets.map((a) => (
              <li key={a.label} className="flex items-start gap-5 rounded-2xl bg-white p-6 ring-1 ring-line">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist text-brand-ink">
                  <FileText aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-ink">{a.label}</h3>
                  <p className="mt-1 text-sm text-slate-ink">{a.description}</p>
                  {a.fileUrl ? (
                    <a href={a.fileUrl} download className="hit-y mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink hover:text-brand-deep">
                      <Download aria-hidden="true" className="h-4 w-4" /> Download{a.format && ` ${a.format}`}
                    </a>
                  ) : (
                    <p className="mt-4 text-xs font-medium text-slate-ink">Available on request while files are prepared</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="press-contact-title" className="py-20">
        <div className="container-site grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 id="press-contact-title" className="text-h2 font-semibold">Media enquiries</h2>
            <p className="mt-4 max-w-xl text-lead text-slate-ink">For interviews, filming requests or materials not listed here, get in touch.</p>
          </div>
          <ButtonLink href="/contact" className="justify-self-start lg:justify-self-end">Contact us</ButtonLink>
        </div>
      </section>
    </>
  );
}
