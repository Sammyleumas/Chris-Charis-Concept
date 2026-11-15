import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "The Chris Charis Brand",
  description: "Founder-led media and community.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Organisations"
        title="The Chris Charis Brand"
        subtitle="Founder-led media and community."
        crumbs={[{"label": "Our Organisations", "href": "/organisations"}, {"label": "The Chris Charis Brand"}]}
      />
      <PlannedSection phase="Phase 7 (Organisations)" />
    </>
  );
}
