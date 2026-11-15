import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Impact Stories",
  description: "Stories of change, shared with consent.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Impact Stories"
        subtitle="Stories of change, shared with consent."
        crumbs={[{"label": "Impact", "href": "/impact"}, {"label": "Impact Stories"}]}
      />
      <PlannedSection phase="Phase 8 (Impact)" />
    </>
  );
}
