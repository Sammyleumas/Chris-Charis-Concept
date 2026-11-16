import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteUrl } from "@/lib/seo/meta";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href && { item: `${siteUrl()}${c.href === "/" ? "" : c.href}` }),
    })),
  };
  return (
    <nav aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/65">
        {all.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden="true" className="h-3 w-3" />}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="hover:text-white">{c.label}</Link>
            ) : (
              <span aria-current="page" className="text-white/90">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
