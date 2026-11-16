import { SectionTabs } from "@/components/ui/SectionTabs";

const items = [
  { label: "Overview", href: "/media" },
  { label: "Films", href: "/media/films" },
  { label: "Gallery", href: "/media/gallery" },
  { label: "News & Blog", href: "/news" },
  { label: "Press Kit", href: "/media/press" },
];

export function MediaNav({ current }: { current: string }) {
  return <SectionTabs label="Media pages" items={items} current={current} />;
}
