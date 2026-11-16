import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { PageHero } from "@/components/ui/PageHero";
import { ContentNote } from "@/components/ui/ContentNote";
import { ImpactNav } from "@/components/impact/ImpactNav";
import { ReportList } from "@/components/impact/ReportList";
import { site } from "@/config/site";
import { getReports } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Annual Reports",
  description: "Annual reports and accountability documents from Chris Charis Concept.",
  path: "/impact/reports",
});

export default async function ReportsPage() {
  const reports = await getReports();
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Annual Reports"
        subtitle="Accountability for our work, year by year."
        crumbs={[{ label: "Impact", href: "/impact" }, { label: "Annual Reports" }]}
      />
      <ImpactNav current="/impact/reports" />
      <section aria-labelledby="reports-title" className="py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="reports-title" className="text-h2 font-semibold">Reports library</h2>
            <p className="mt-4 leading-relaxed text-slate-ink">
              As a not-for-profit, {site.legalName} applies all income and property solely to its objects. Our reports show how.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {reports.length > 0 ? (
              <ReportList reports={reports} />
            ) : (
              <div className="rounded-2xl border border-dashed border-line p-10 text-center">
                <p className="font-display text-xl font-semibold text-ink">No reports published yet</p>
                <p className="mt-2 text-slate-ink">The FY2026/27 annual report will be published here once it is available.</p>
              </div>
            )}
            <ContentNote className="mt-6">Annual report PDFs (COO / ME&amp;L), each with its period and publication date.</ContentNote>
          </div>
        </div>
      </section>
    </>
  );
}
