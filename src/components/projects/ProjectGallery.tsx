"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import type { ImageAsset } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { Lightbox } from "@/components/media/Lightbox";
import { events, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/**
 * Project photo grid: first photo large, the rest in rows of four; a last
 * odd tile spans two so the grid never leaves a gap. Real photos open in
 * the full-screen viewer; placeholder slots are not clickable.
 */
export function ProjectGallery({ images, familyName }: { images: ImageAsset[]; familyName: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const real = images.filter((i) => i.src);
  const rest = images.length - 1;

  return (
    <>
      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {images.map((img, i) => {
          const lastWide = i === images.length - 1 && rest % 4 !== 0 && rest % 2 === 1;
          const cls = cn(
            "relative overflow-hidden rounded-sm bg-mist",
            i === 0 ? "col-span-2 row-span-2 aspect-square" : lastWide ? "col-span-2 aspect-[2/1]" : "aspect-square",
          );
          const sizes = i === 0 || lastWide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw";
          if (!img.src) {
            return (
              <li key={img.brief} className={cls}>
                <Photo image={img} sizes={sizes} />
              </li>
            );
          }
          const realIndex = real.indexOf(img);
          return (
            <li key={img.src} className={cls}>
              <button
                type="button"
                onClick={() => {
                  track(events.galleryOpen, { project: familyName });
                  setOpen(realIndex);
                }}
                className="group tap-soft absolute inset-0 block"
              >
                <span className="absolute inset-0 transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]">
                  <Photo image={img} sizes={sizes} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2 text-left text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="truncate">{img.brief}</span>
                  <Expand aria-hidden="true" className="h-4 w-4 shrink-0" />
                </span>
                <span className="sr-only">View full screen: {img.alt}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <Lightbox
        items={real.map((img, i) => ({ id: `${familyName}-${i}`, image: img, caption: img.brief, meta: familyName }))}
        index={open}
        onIndex={setOpen}
        onClose={() => setOpen(null)}
      />
    </>
  );
}
