import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "The Chris Charis Brand",
  description: "Content and community with purpose.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Work \u00b7 2025"
        title="The Chris Charis Brand"
        subtitle="Content and community with purpose."
        crumbs={[{"label": "Our Work", "href": "/our-work"}, {"label": "The Chris Charis Brand"}]}
      />
      <PlannedSection phase="Phase 6 (Our Work)" />
    </>
  );
}
