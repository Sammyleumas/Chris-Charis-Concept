import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContentNote } from "@/components/ui/ContentNote";
import { ButtonLink } from "@/components/ui/Button";
import { ImpactNav } from "@/components/impact/ImpactNav";
import { StoriesBrowser } from "@/components/impact/StoriesBrowser";
import { getImpactStories, getProjectFamilies } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Impact Stories",
  description: "Stories of change from Chris Charis Concept projects, shared with the consent of the people in them.",
  path: "/impact/stories",
});

export default async function StoriesPage() {
  const [stories, families] = await Promise.all([getImpactStories(), getProjectFamilies()]);
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Impact Stories"
        subtitle="Stories of change, told with the people who lived them."
        crumbs={[{ label: "Impact", href: "/impact" }, { label: "Stories" }]}
      />
      <ImpactNav current="/impact/stories" />

      <section aria-label="Stories" className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          {stories.length > 0 ? (
            <StoriesBrowser stories={stories} families={families.map((f) => ({ slug: f.slug, name: f.shortName }))} />
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-h2 font-semibold">Stories are on their way.</h2>
              <p className="mt-4 text-lead text-slate-ink">
                We are gathering stories from participants across our projects, with their permission.
              </p>
              <ContentNote className="mt-8 text-left">
                Beneficiary stories: title, project, date, photo and a verified outcome, each with recorded consent. Stories are only published when consent is marked as granted.
              </ContentNote>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="consent-title" className="py-20">
        <div className="container-site grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <ShieldCheck aria-hidden="true" className="h-10 w-10 text-brand-ink" />
          <div>
            <h2 id="consent-title" className="text-h3 font-semibold">How we share stories</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-slate-ink">
              We only publish a person’s story or image with their recorded consent, in line with the Nigeria Data Protection Act 2023.
            </p>
          </div>
          <ButtonLink href="/safeguarding" variant="outline">Safeguarding statement</ButtonLink>
        </div>
      </section>
    </>
  );
}
