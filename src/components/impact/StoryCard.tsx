import type { ImpactStory } from "@/content/types";
import { Photo } from "@/components/ui/Photo";

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

export function StoryCard({ story, familyName }: { story: ImpactStory; familyName: string }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line">
      <div className="relative aspect-[16/10] bg-mist">
        <Photo image={story.photo} sizes="(min-width: 1024px) 33vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-xs font-semibold text-brand-ink">
          {familyName} · <time dateTime={story.date}>{fmt(story.date)}</time>
        </p>
        <h3 className="mt-3 text-h3 font-semibold">{story.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-slate-ink">{story.summary}</p>
        <p className="mt-6 border-t border-line pt-4 text-sm">
          <span className="font-semibold text-ink">Outcome: </span>
          <span className="text-charcoal">{story.outcome}</span>
        </p>
      </div>
    </article>
  );
}
