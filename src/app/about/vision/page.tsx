import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Vision, Mission & Values",
  description: "What we believe and where we are going.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Vision, Mission & Values"
        subtitle="What we believe and where we are going."
        crumbs={[{"label": "About", "href": "/about"}, {"label": "Vision, Mission & Values"}]}
      />
      <PlannedSection phase="Phase 5 (About)" />
    </>
  );
}
