import { SectionTabs } from "@/components/ui/SectionTabs";

const items = [
  { label: "Overview", href: "/get-involved" },
  { label: "Volunteer", href: "/get-involved/volunteer" },
  { label: "Partner & Sponsor", href: "/get-involved/partner" },
  { label: "Careers & Facilitators", href: "/get-involved/careers" },
  { label: "Donate", href: "/donate" },
];

export function InvolveNav({ current }: { current: string }) {
  return <SectionTabs label="Get Involved pages" items={items} current={current} />;
}
