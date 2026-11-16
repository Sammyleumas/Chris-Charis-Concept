"use client";

import { useState } from "react";
import { Box, LayoutGrid } from "lucide-react";
import type { GalleryItem } from "@/content/types";
import { Coverflow } from "./Coverflow";
import { Lightbox } from "./Lightbox";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import { events, track } from "@/lib/analytics";

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
  const [open, setOpenState] = useState<number | null>(null);
  const setOpen = (i: number | null) => {
    if (i !== null && open === null) track(events.galleryOpen, { project: family ?? "all" });
    setOpenState(i);
  };

  const shown = family ? items.filter((i) => i.family === family) : items;
  const nameOf = (slug: string) => families.find((f) => f.slug === slug);
  const lightboxItems = shown.map((i) => {
    const f = nameOf(i.family);
    return { id: i.id, image: i.image, caption: i.caption, meta: f ? `${f.name} · ${f.year}` : undefined };
  });

  // Project filter: a dark segmented control inside the 3D stage (per the
  // approved reference), or a light one above the grid.
  const filters = (dark: boolean) => (
    <div
      role="group"
      aria-label="Filter by project"
      className={cn(
        "flex max-w-full gap-0.5 overflow-x-auto rounded-md p-0.5 [scrollbar-width:none]",
        dark ? "bg-white/10" : "bg-white ring-1 ring-line",
      )}
    >
      {[{ slug: null as string | null, name: "All" }, ...families].map((f) => {
        const on = family === f.slug;
        return (
          <button
            key={f.slug ?? "all"}
            type="button"
            aria-pressed={on}
            onClick={() => setFamily(f.slug)}
            className={cn(
              "tap h-11 shrink-0 rounded-[5px] px-3.5 text-xs font-semibold whitespace-nowrap sm:h-9",
              dark
                ? on ? "bg-white/90 text-ink" : "text-white/65 hover:bg-white/10 hover:text-white"
                : on ? "bg-ink text-white" : "text-charcoal hover:bg-mist",
            )}
          >
            {f.name}
          </button>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="container-site flex items-center justify-between gap-4">
        <p className="text-sm text-slate-ink">
          {view === "carousel" ? "Drag, swipe or use the arrow keys. Select the centre photo to view it full screen." : "Select a photo to view it full screen."}
        </p>
        <div role="group" aria-label="Gallery view" className="inline-flex shrink-0 rounded-full bg-white p-1 ring-1 ring-line">
          {([["carousel", "3D", Box], ["grid", "Grid", LayoutGrid]] as const).map(([v, label, Icon]) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn(
                "tap inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold sm:h-9",
                view === v ? "bg-brand-ink text-white" : "text-charcoal hover:text-ink",
              )}
            >
              <Icon aria-hidden="true" className="h-4 w-4" /> {label}
              <span className="sr-only"> view</span>
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{shown.length} photos shown</p>

      {view === "carousel" ? (
        <div className="container-site mt-6">
          <Coverflow
            key={family ?? "all"}
            label="Photo gallery"
            toolbar={filters(true)}
            allowFullscreen
            initial={Math.floor((shown.length - 1) / 2)}
            onOpen={(i) => setOpen(i)}
            items={shown.map((i) => {
              const f = nameOf(i.family);
              return { id: i.id, title: i.caption, eyebrow: f ? `${f.name} · ${f.year}` : undefined, image: i.image };
            })}
          />
        </div>
      ) : (
        <div>
          <div className="container-site mt-6">{filters(false)}</div>
        <ul className="container-site mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
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
        </div>
      )}

      <Lightbox items={lightboxItems} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
    </div>
  );
}
