import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from our projects.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Gallery"
        subtitle="Moments from our projects."
        crumbs={[{"label": "Media", "href": "/media"}, {"label": "Gallery"}]}
      />
      <PlannedSection phase="Phase 9 (Media)" />
    </>
  );
}
