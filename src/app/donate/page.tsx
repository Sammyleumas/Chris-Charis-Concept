import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support creative work that changes communities.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Donate"
        subtitle="Support creative work that changes communities."
        crumbs={[{"label": "Get Involved", "href": "/get-involved"}, {"label": "Donate"}]}
      />
      <PlannedSection phase="Phase 10 (Get Involved & Contact), with Paystack connected in Phase 11" />
    </>
  );
}
