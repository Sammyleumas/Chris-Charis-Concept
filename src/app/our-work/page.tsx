import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Creative projects. Real impact.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Our Work"
        subtitle="Creative projects. Real impact."
        crumbs={[{"label": "Our Work"}]}
      />
      <PlannedSection phase="Phase 6 (Our Work)" />
    </>
  );
}
