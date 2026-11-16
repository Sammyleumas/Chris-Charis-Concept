import Link from "next/link";
import { cn } from "@/lib/cn";

/** Horizontal tab bar linking the pages of one section (About, Impact, Media…). */
export function SectionTabs({
  label,
  items,
  current,
}: {
  label: string;
  items: { label: string; href: string }[];
  current: string;
}) {
  return (
    <nav aria-label={label} className="border-b border-line bg-white">
      <div className="container-site">
        <ul className="-mb-px flex gap-7 overflow-x-auto [scrollbar-width:none]">
          {items.map((item) => {
            const active = item.href === current;
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block border-b-2 py-5 text-sm font-medium transition-colors",
                    active ? "border-brand text-ink" : "border-transparent text-slate-ink hover:border-line hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
