import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Our Partners",
  description: "The organisations we work alongside.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Our Partners"
        subtitle="The organisations we work alongside."
        crumbs={[{"label": "About", "href": "/about"}, {"label": "Our Partners"}]}
      />
      <PlannedSection phase="Phase 5 (About)" />
    </>
  );
}
