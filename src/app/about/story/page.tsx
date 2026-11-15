import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Our Story",
  description: "From August 2020 to today: the projects that shaped us.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Our Story"
        subtitle="From August 2020 to today: the projects that shaped us."
        crumbs={[{"label": "About", "href": "/about"}, {"label": "Our Story"}]}
      />
      <PlannedSection phase="Phase 5 (About)" />
    </>
  );
}
