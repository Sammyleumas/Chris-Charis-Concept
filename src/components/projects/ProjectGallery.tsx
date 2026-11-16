"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import type { ImageAsset } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { Lightbox } from "@/components/media/Lightbox";
import { events, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/** Fewest real photos needed for the moving rows; below this the grid shows. */
const MIN_FOR_MARQUEE = 4;
/** Each copy of a row holds at least this many cards so it outruns wide screens. */
const MIN_PER_SET = 7;
/** Seconds each card takes to travel its own width (lower is faster). */
const SECONDS_PER_CARD = 5.5;

/**
 * Project photos.
 *
 * With enough real photos: full-width rows of cards that drift sideways in
 * alternating directions, looping without a seam (each row is rendered
 * twice and moved by half its width). Motion pauses on hover or keyboard
 * focus, can be stopped with the Pause control (WCAG 2.2.2), and is off
 * for people who prefer reduced motion: rows then scroll by hand.
 *
 * Without enough photos: the labelled placeholder grid, so the page shows
 * what is still needed.
 */
export function ProjectGallery({ images, familyName }: { images: ImageAsset[]; familyName: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const real = images.filter((i) => i.src);

  const show = (img: ImageAsset) => {
    track(events.galleryOpen, { project: familyName });
    setOpen(real.indexOf(img));
  };

  const lightbox = (
    <Lightbox
      items={real.map((img, i) => ({ id: `${familyName}-${i}`, image: img, caption: img.brief, meta: familyName }))}
      index={open}
      onIndex={setOpen}
      onClose={() => setOpen(null)}
    />
  );

  if (real.length < MIN_FOR_MARQUEE) {
    return (
      <div className="container-site">
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {images.map((img, i) => (
            <li key={img.src ?? img.brief} className={cn("relative overflow-hidden rounded-xl bg-mist", i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square")}>
              {img.src ? (
                <Card img={img} label={familyName} onOpen={() => show(img)} />
              ) : (
                <Photo image={img} sizes="(min-width: 768px) 25vw, 50vw" />
              )}
            </li>
          ))}
        </ul>
        {lightbox}
      </div>
    );
  }

  const rowCount = real.length >= 9 ? 3 : 2;
  const rows = Array.from({ length: rowCount }, (_, r) => real.filter((_, i) => i % rowCount === r));

  return (
    <>
      <div
        className="marquee mt-10 space-y-3 md:space-y-4"
        data-paused={paused || undefined}
        role="group"
        aria-roledescription="moving photo rows"
        aria-label={`${familyName} photos`}
      >
        {rows.map((row, r) => {
          const set: ImageAsset[] = [];
          while (set.length < Math.max(MIN_PER_SET, row.length)) set.push(...row);
          return (
            <div key={r} className="marquee-row">
              <ul
                className="marquee-track"
                style={{
                  animationName: r % 2 === 0 ? "marquee-left" : "marquee-right",
                  animationDuration: `${set.length * SECONDS_PER_CARD * (1 + r * 0.18)}s`,
                }}
              >
                {[0, 1].map((copy) =>
                  set.map((img, i) => (
                    <li
                      key={`${copy}-${i}`}
                      className={cn("marquee-card", copy === 1 && "marquee-dup", i >= row.length && "marquee-dup")}
                      aria-hidden={copy === 1 || i >= row.length || undefined}
                    >
                      <Card img={img} label={familyName} onOpen={() => show(img)} tabbable={copy === 0 && i < row.length} />
                    </li>
                  )),
                )}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="container-site mt-5 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="marquee-toggle tap inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-slate-ink ring-1 ring-line hover:text-ink"
        >
          {paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
          {paused ? "Play motion" : "Pause motion"}
        </button>
      </div>
      {lightbox}
    </>
  );
}

function Card({ img, label, onOpen, tabbable = true }: { img: ImageAsset; label: string; onOpen: () => void; tabbable?: boolean }) {
  return (
    <button type="button" onClick={onOpen} tabIndex={tabbable ? undefined : -1} className="group tap-soft absolute inset-0 block overflow-hidden text-left">
      <span className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]">
        <Photo image={img} sizes="(min-width: 1024px) 340px, (min-width: 640px) 290px, 230px" />
      </span>
      <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night/80 via-night/30 to-transparent" />
      <span className="absolute right-3.5 bottom-3 left-3.5 block">
        <span className="block text-[0.6875rem] font-medium tracking-wide text-white/75">{label}</span>
        <span className="mt-0.5 block truncate text-sm font-semibold text-white">{img.brief}</span>
      </span>
      <span className="sr-only">. View full screen: {img.alt}</span>
    </button>
  );
}
