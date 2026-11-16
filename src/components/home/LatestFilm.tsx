import type { Film } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { ContentNote } from "@/components/ui/ContentNote";
import { Photo } from "@/components/ui/Photo";
import { YouTubeFacade } from "@/components/media/YouTubeFacade";

export function LatestFilm({ film, channelUrl }: { film: Film; channelUrl?: string | null }) {
  const watchUrl = film.youtubeUrl ?? channelUrl ?? null;
  return (
    <section aria-labelledby="film-title" className="border-t border-line py-24 lg:py-32">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-brand-ink">Latest film</p>
          <h2 id="film-title" className="mt-4 text-h2 font-semibold">{film.title}</h2>
          {film.description && <p className="mt-5 leading-relaxed text-slate-ink">{film.description}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            {watchUrl && <ButtonLink href={watchUrl} external>Watch Film</ButtonLink>}
            <ButtonLink href="/media/films" variant="outline">Film library</ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-8">
          {film.youtubeUrl ? (
            <YouTubeFacade url={film.youtubeUrl} title={film.title} poster={film.poster} />
          ) : (
            <>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-ink">
                <Photo image={film.poster} tone="dark" sizes="(min-width: 1024px) 66vw, 100vw" />
              </div>
              <ContentNote className="mt-4">YouTube link for the featured film is needed to enable the player.</ContentNote>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
