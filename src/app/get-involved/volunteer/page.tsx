import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Share your time and skills.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Volunteer"
        subtitle="Share your time and skills."
        crumbs={[{"label": "Get Involved", "href": "/get-involved"}, {"label": "Volunteer"}]}
      />
      <PlannedSection phase="Phase 10 (Get Involved & Contact)" />
    </>
  );
}
