"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import type { ImageAsset } from "@/content/types";

/** Extracts the video ID from any common YouTube URL form. */
export function youTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m?.[1] ?? null;
}

/**
 * Lightweight YouTube player: shows a thumbnail and only loads the
 * (privacy-enhanced) YouTube iframe when the visitor presses play.
 */
export function YouTubeFacade({ url, title, poster }: { url: string; title: string; poster?: ImageAsset }) {
  const [active, setActive] = useState(false);
  const id = youTubeId(url);
  if (!id) return null;
  const thumb = poster?.src ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-night">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0">
          <Image src={thumb} alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
          <span className="absolute inset-0 bg-night/30 transition-colors group-hover:bg-night/15" />
          <span className="absolute top-1/2 left-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand-ink shadow-xl transition-transform group-hover:scale-105">
            <Play aria-hidden="true" className="ml-1 h-8 w-8 fill-current" />
          </span>
          <span className="sr-only">Play video: {title}</span>
        </button>
      )}
    </div>
  );
}
