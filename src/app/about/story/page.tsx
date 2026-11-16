import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { AboutNav } from "@/components/about/AboutNav";
import { StoryTimeline } from "@/components/about/StoryTimeline";
import { images } from "@/content/images";
import { getTimeline } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Our Story",
  description: "The Chris Charis Concept story from August 2020 to November 2026, project by project.",
  path: "/about/story",
});

export default async function StoryPage() {
  const entries = await getTimeline();
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Our Story"
        subtitle="From one advocacy film in August 2020 to five project families today."
        image={images.storyHero}
        crumbs={[{ label: "About", href: "/about" }, { label: "Our Story" }]}
      />
      <AboutNav current="/about/story" />
      <section aria-labelledby="timeline-title" className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand-ink">Timeline</p>
            <h2 id="timeline-title" className="mt-4 text-h2 font-semibold">2020 – 2026</h2>
            <p className="mt-4 text-lead text-slate-ink">
              Each milestone links to the project it started. Filter by year to focus on one chapter.
            </p>
          </div>
          <div className="mt-12">
            <StoryTimeline entries={entries} />
          </div>
        </div>
      </section>
      <section className="py-20 text-center">
        <div className="container-site">
          <h2 className="text-h2 font-semibold">The next chapter is being written.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/our-work">Explore Our Work</ButtonLink>
            <ButtonLink href="/get-involved" variant="outline">Get Involved</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
