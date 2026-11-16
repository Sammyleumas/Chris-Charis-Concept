"use client";

import { useState } from "react";
import { Box, LayoutGrid } from "lucide-react";
import type { GalleryItem } from "@/content/types";
import { Coverflow } from "./Coverflow";
import { Lightbox } from "./Lightbox";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

type View = "carousel" | "grid";

/**
 * Media gallery: project filter, 3D coverflow or plain grid, and a
 * full-screen viewer. The grid is the lightweight alternative for anyone
 * who prefers it; the coverflow drops its rotation for reduced-motion users.
 */
export function GalleryExperience({
  items,
  families,
}: {
  items: GalleryItem[];
  families: { slug: string; name: string; year: number }[];
}) {
  const [family, setFamily] = useState<string | null>(null);
  const [view, setView] = useState<View>("carousel");
  const [open, setOpen] = useState<number | null>(null);

  const shown = family ? items.filter((i) => i.family === family) : items;
  const nameOf = (slug: string) => families.find((f) => f.slug === slug);
  const lightboxItems = shown.map((i) => {
    const f = nameOf(i.family);
    return { id: i.id, image: i.image, caption: i.caption, meta: f ? `${f.name} · ${f.year}` : undefined };
  });

  return (
    <div>
      <div className="container-site flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by project" className="flex flex-wrap gap-2">
          {[{ slug: null as string | null, name: "All projects" }, ...families].map((f) => (
            <button
              key={f.slug ?? "all"}
              type="button"
              aria-pressed={family === f.slug}
              onClick={() => setFamily(f.slug)}
              className={cn(
                "h-10 rounded-full px-4 text-sm font-semibold transition-colors",
                family === f.slug ? "bg-ink text-white" : "bg-white text-charcoal ring-1 ring-line hover:ring-ink/40",
              )}
            >
              {f.name}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Gallery view" className="inline-flex self-start rounded-full bg-white p-1 ring-1 ring-line">
          {([["carousel", "3D view", Box], ["grid", "Grid", LayoutGrid]] as const).map(([v, label, Icon]) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
                view === v ? "bg-brand-ink text-white" : "text-charcoal hover:text-ink",
              )}
            >
              <Icon aria-hidden="true" className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{shown.length} photos shown</p>

      {view === "carousel" ? (
        <div className="mt-12 overflow-hidden">
          <Coverflow
            key={family ?? "all"}
            label="Photo gallery"
            initial={Math.min(2, shown.length - 1)}
            onOpen={(i) => setOpen(i)}
            items={shown.map((i) => {
              const f = nameOf(i.family);
              return { id: i.id, title: i.caption, eyebrow: f ? `${f.name} · ${f.year}` : undefined, image: i.image };
            })}
          />
          <p className="mt-4 text-center text-sm text-slate-ink">Select the centre photo to view it full screen.</p>
        </div>
      ) : (
        <ul className="container-site mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block aspect-square w-full overflow-hidden rounded-sm bg-mist"
              >
                <span className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                  <Photo image={item.image} sizes="(min-width: 1024px) 25vw, 50vw" />
                </span>
                <span className="sr-only">Open photo: {item.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox items={lightboxItems} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </div>
  );
}
