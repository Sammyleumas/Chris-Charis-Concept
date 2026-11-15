import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "The Social Enterprise",
  description: "Chris Charis Social Enterprise for Art and Tech LTD/GTE.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Organisations"
        title="The Social Enterprise"
        subtitle="Chris Charis Social Enterprise for Art and Tech LTD/GTE."
        crumbs={[{"label": "Our Organisations", "href": "/organisations"}, {"label": "The Social Enterprise"}]}
      />
      <PlannedSection phase="Phase 7 (Organisations)" />
    </>
  );
}
