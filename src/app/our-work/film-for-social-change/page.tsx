import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Film for Social Change",
  description: "Film and storytelling that start conversations.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Work \u00b7 2020"
        title="Film for Social Change"
        subtitle="Film and storytelling that start conversations."
        crumbs={[{"label": "Our Work", "href": "/our-work"}, {"label": "Film for Social Change"}]}
      />
      <PlannedSection phase="Phase 6 (Our Work)" />
    </>
  );
}
