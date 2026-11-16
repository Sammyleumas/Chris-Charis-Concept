import { mainNav } from "@/config/navigation";
import { SectionTabs } from "@/components/ui/SectionTabs";

/** Section tabs shared by every About page. */
export function AboutNav({ current }: { current: string }) {
  const items = mainNav.find((n) => n.href === "/about")?.children ?? [];
  return <SectionTabs label="About pages" items={items} current={current} />;
}
