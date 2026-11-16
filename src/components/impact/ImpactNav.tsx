import { mainNav } from "@/config/navigation";
import { SectionTabs } from "@/components/ui/SectionTabs";

export function ImpactNav({ current }: { current: string }) {
  const items = mainNav.find((n) => n.href === "/impact")?.children ?? [];
  return <SectionTabs label="Impact pages" items={items} current={current} />;
}
