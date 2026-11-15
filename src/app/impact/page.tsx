import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "Real change. Lasting difference.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Our Impact"
        subtitle="Real change. Lasting difference."
        crumbs={[{"label": "Our Impact"}]}
      />
      <PlannedSection phase="Phase 8 (Impact)" />
    </>
  );
}
