import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "News & Blog",
  description: "Updates from across our projects.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="News & Blog"
        subtitle="Updates from across our projects."
        crumbs={[{"label": "Media", "href": "/media"}, {"label": "News & Blog"}]}
      />
      <PlannedSection phase="Phase 9 (Media)" />
    </>
  );
}
