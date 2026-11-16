import { CalendarDays } from "lucide-react";
import type { FeaturedInitiative as Featured } from "@/content/types";
import { site } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { ContentNote } from "@/components/ui/ContentNote";

/** Swappable homepage feature slot (CMS-editable in Phase 11). */
export function FeaturedInitiative({ item }: { item: Featured }) {
  const live = item.actions.filter((a) => a.url);
  const missing = item.actions.filter((a) => !a.url);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: item.title,
    startDate: item.startDate,
    endDate: item.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    description: item.description,
    location: {
      "@type": "Place",
      name: `${site.location.city}, ${site.location.state}`,
      address: { "@type": "PostalAddress", addressLocality: site.location.city, addressRegion: site.location.state, addressCountry: "NG" },
    },
    organizer: { "@type": "Organization", name: site.name },
  };

  return (
    <section aria-labelledby="featured-title" className="py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-site">
        <div className="grid overflow-hidden rounded-2xl bg-ink lg:grid-cols-12">
          <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]">
            <Photo image={item.image} tone="dark" sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <div className="flex flex-col justify-center p-8 text-white sm:p-12 lg:col-span-5 lg:p-14">
            <p className="eyebrow text-mist">{item.eyebrow}</p>
            <h2 id="featured-title" className="mt-4 text-h2 font-semibold text-white!">{item.title}</h2>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
              <CalendarDays aria-hidden="true" className="h-4 w-4 text-brand" />
              <time dateTime={item.startDate}>{item.dateLabel}</time>
            </p>
            <p className="mt-5 leading-relaxed text-white/75">{item.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {live.map((a, i) => (
                <ButtonLink
                  key={a.label}
                  href={a.url!}
                  external={a.external}
                  variant={i === 0 ? "primary" : "outline-light"}
                  data-track={a.label === "Apply" ? "event_application_click" : undefined}
                  data-track-label={`${item.title}: ${a.label}`}
                >
                  {a.label}
                </ButtonLink>
              ))}
            </div>
            {missing.length > 0 && (
              <ContentNote className="mt-6 border-white/25 bg-white/5 text-white/80 [&_span]:text-mist">
                Link for {missing.map((m) => `“${m.label}”`).join(", ")} not yet supplied; the button appears once it is set.
              </ContentNote>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
