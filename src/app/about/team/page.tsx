import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Our Team",
  description: "The people behind the work.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Our Team"
        subtitle="The people behind the work."
        crumbs={[{"label": "About", "href": "/about"}, {"label": "Our Team"}]}
      />
      <PlannedSection phase="Phase 5 (About)" />
    </>
  );
}
