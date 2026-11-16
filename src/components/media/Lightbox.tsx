"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImageAsset } from "@/content/types";
import { Photo } from "@/components/ui/Photo";

export type LightboxItem = { id: string; image: ImageAsset; caption: string; meta?: string };

/**
 * Full-screen image viewer built on the native <dialog>: the browser
 * provides the focus trap, Escape to close and focus return.
 * Arrow keys move between images.
 */
export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: LightboxItem[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  if (!open) return <dialog ref={ref} onClose={onClose} />;
  const item = items[index];
  const prev = () => onIndex((index - 1 + items.length) % items.length);
  const next = () => onIndex((index + 1) % items.length);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-label={`Image viewer: ${item.caption}`}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-night/95 p-0 text-white backdrop:bg-night/80"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p className="text-sm text-white/70 tabular-nums" aria-live="polite">
            {index + 1} / {items.length}
          </p>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            autoFocus
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"
          >
            <X aria-hidden="true" className="h-6 w-6" />
            <span className="sr-only">Close viewer</span>
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center px-2 sm:px-20">
          <div className="relative h-full max-h-[75vh] w-full max-w-6xl">
            <Photo image={item.image} tone="dark" fit="contain" notePosition="top-left" sizes="100vw" />
          </div>
          {items.length > 1 && (
            <>
              <button type="button" onClick={prev} className="absolute top-1/2 left-2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:left-6">
                <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </button>
              <button type="button" onClick={next} className="absolute top-1/2 right-2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 sm:right-6">
                <ChevronRight aria-hidden="true" className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </button>
            </>
          )}
        </div>

        <div className="mx-auto w-full max-w-3xl px-6 py-5 text-center">
          <p className="font-display text-lg font-semibold">{item.caption}</p>
          {item.meta && <p className="mt-1 text-sm text-white/60">{item.meta}</p>}
        </div>
      </div>
    </dialog>
  );
}
