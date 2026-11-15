import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Learn To Lead \u2192 SOUL",
  description: "Leadership development for young people.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Work \u00b7 2021"
        title="Learn To Lead \u2192 SOUL"
        subtitle="Leadership development for young people."
        crumbs={[{"label": "Our Work", "href": "/our-work"}, {"label": "Learn To Lead \u2192 SOUL"}]}
      />
      <PlannedSection phase="Phase 6 (Our Work)" />
    </>
  );
}
