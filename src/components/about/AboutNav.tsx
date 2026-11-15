import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/cn";

/** Section tabs shared by every About page. */
export function AboutNav({ current }: { current: string }) {
  const items = mainNav.find((n) => n.href === "/about")?.children ?? [];
  return (
    <nav aria-label="About pages" className="border-b border-line bg-white">
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
                    active
                      ? "border-brand text-ink"
                      : "border-transparent text-slate-ink hover:border-line hover:text-ink",
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
