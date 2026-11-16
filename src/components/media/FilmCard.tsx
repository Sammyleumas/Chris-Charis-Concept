import { Clapperboard } from "lucide-react";
import type { Film } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { YouTubeFacade } from "./YouTubeFacade";

export function FilmCard({ film, familyName }: { film: Film; familyName: string }) {
  return (
    <article>
      {film.youtubeUrl ? (
        <YouTubeFacade url={film.youtubeUrl} title={film.title} poster={film.poster.src ? film.poster : undefined} />
      ) : (
        <div className="relative aspect-video overflow-hidden rounded-xl bg-ink">
          <Photo image={film.poster} tone="dark" notePosition="top-left" sizes="(min-width: 1024px) 33vw, 100vw" />
          <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
            <Clapperboard aria-hidden="true" className="h-3.5 w-3.5" /> Film link coming soon
          </span>
        </div>
      )}
      <p className="mt-4 text-xs font-semibold text-brand-ink">
        {familyName}
        {film.year && <> · {film.year}</>}
      </p>
      <h3 className="mt-1 text-lg font-semibold">{film.title}</h3>
      {film.description && <p className="mt-1 text-sm leading-relaxed text-slate-ink">{film.description}</p>}
    </article>
  );
}
