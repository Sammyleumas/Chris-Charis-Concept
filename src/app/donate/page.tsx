import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { InvolveNav } from "@/components/involve/InvolveNav";
import { DonateForm } from "@/components/forms/DonateForm";
import { site } from "@/config/site";

export const metadata: Metadata = pageMeta({
  title: "Donate",
  description: "Support Chris Charis Concept with a one-off or monthly gift to fund films, outreaches and training in Nigeria.",
  path: "/donate",
});

const funds = [
  "Advocacy films that start conversations in communities",
  "Health and well-being outreaches through Healthy Heart",
  "Leadership training for young people through SOUL",
  "Creative and technology skills through Fusion",
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Donate"
        subtitle="Support creative work that changes communities."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Donate" }]}
      />
      <InvolveNav current="/donate" />
      <section aria-label="Make a donation" className="py-20 lg:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-h2 font-semibold">Your gift at work</h2>
            <p className="mt-5 text-lead text-slate-ink">
              Since 2020, Chris Charis Concept has delivered 26 projects and reached more than 1,200 young people. Your gift funds:
            </p>
            <ul className="mt-8 space-y-4">
              {funds.map((f) => (
                <li key={f} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink" />
                  <span className="text-charcoal">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl bg-paper p-6 text-sm leading-relaxed text-slate-ink">
              <p className="font-semibold text-ink">Accountability</p>
              <p className="mt-2">
                {site.legalName} ({site.registrationNumber}) is a not-for-profit. All income and property are applied solely to its stated objects.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-mist p-6 sm:p-10 lg:col-span-6 lg:col-start-7">
            <DonateForm />
          </div>
        </div>
      </section>
    </>
  );
}
