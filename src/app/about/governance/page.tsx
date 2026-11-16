import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContentNote } from "@/components/ui/ContentNote";
import { AboutNav } from "@/components/about/AboutNav";
import { legalNav } from "@/config/navigation";
import { site } from "@/config/site";
import { images } from "@/content/images";
import { getLegalEntities } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Legal & Governance",
  description: `Registered details of ${site.legalName} (${site.registrationNumber}), trading as Chris Charis Concept, with policies and reports.`,
  path: "/about/governance",
});

export default async function GovernancePage() {
  const entities = await getLegalEntities();
  const facts = [
    ["Trading name", site.name],
    ["Registered name", site.legalName],
    ["Registration number", site.registrationNumber],
    ["Type", `${site.organisationType}, company limited by guarantee`],
    ["Registered in", site.location.country],
    ["Based in", `${site.location.city}, ${site.location.state}`],
  ];

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Legal & Governance"
        subtitle="Who we are on paper, and how we are accountable."
        image={images.governanceHero}
        crumbs={[{ label: "About", href: "/about" }, { label: "Legal & Governance" }]}
      />
      <AboutNav current="/about/governance" />

      <section aria-labelledby="registration-title" className="py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-brand-ink">Registration</p>
            <h2 id="registration-title" className="mt-4 text-h2 font-semibold">One registered entity, one trading name.</h2>
            <p className="mt-5 leading-relaxed text-slate-ink">
              “Chris Charis Concept” is the name we work under. The legal entity is {site.legalName}, which applies all
              income and property solely to its stated objects.
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {facts.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="text-sm text-slate-ink">{k}</dt>
                <dd className="font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="entities-title" className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          <h2 id="entities-title" className="text-h2 font-semibold">Our entities</h2>
          <div className="mt-10 overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-ink text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Entity</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Registered name</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Number</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {entities.map((e) => (
                  <tr key={e.name}>
                    <th scope="row" className="px-6 py-5 font-semibold text-ink">{e.name}</th>
                    <td className="px-6 py-5">{e.registeredName ?? <span className="text-slate-ink">To be confirmed</span>}</td>
                    <td className="px-6 py-5 tabular-nums">{e.registrationNumber ?? <span className="text-slate-ink">To be confirmed</span>}</td>
                    <td className="px-6 py-5 text-slate-ink">{e.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ContentNote className="mt-6 max-w-2xl">
            Registered names and numbers for Fusion Connect Academy Ltd and any other entities, checked against CAC records.
          </ContentNote>
        </div>
      </section>

      <section aria-label="Board, policies and reports" className="py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-3">
          <div>
            <h2 className="text-h3 font-semibold">Board</h2>
            <p className="mt-3 leading-relaxed text-slate-ink">Board members will be listed here once the board is constituted.</p>
          </div>
          <div>
            <h2 className="text-h3 font-semibold">Policies</h2>
            <ul className="mt-4 space-y-3">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hit-y group inline-flex items-center gap-2 font-medium text-brand-ink hover:text-brand-deep">
                    <FileText aria-hidden="true" className="h-4 w-4" /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h3 font-semibold">Annual reports</h2>
            <p className="mt-3 leading-relaxed text-slate-ink">The FY2026/27 annual report will be published here once it is available.</p>
            <Link href="/impact/reports" className="hit-y group mt-4 inline-flex items-center gap-2 font-semibold text-brand-ink">
              Reports library <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
