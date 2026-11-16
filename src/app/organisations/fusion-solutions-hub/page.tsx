import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { notFound } from "next/navigation";
import { OrgPage } from "@/components/organisations/OrgPage";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import { getOrganisation } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const org = await getOrganisation("fusion-solutions-hub");
  return pageMeta({ title: org?.name ?? "", description: "Fusion Solutions Hub: innovative, sustainable solutions for individuals and businesses. Request a quote.", path: "/organisations/fusion-solutions-hub" });
}

export default async function Page() {
  const org = await getOrganisation("fusion-solutions-hub");
  if (!org) notFound();
  return (
    <OrgPage org={org} heroAction={{ label: "Request a quote", href: "#quote" }}>
      <section id="quote" aria-labelledby="quote-title" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-brand-ink">Request a quote</p>
            <h2 id="quote-title" className="mt-3 text-h2 font-semibold">Tell us what you need.</h2>
            <p className="mt-5 leading-relaxed text-slate-ink">
              Share a few details and the Fusion Solutions Hub team will reply by email. Fields marked * are required.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <QuoteRequestForm />
          </div>
        </div>
      </section>
    </OrgPage>
  );
}
