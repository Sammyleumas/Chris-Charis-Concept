import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarPlus, Clock, HandHeart, MapPin, Send, Users, Vote } from "lucide-react";
import { pageMeta } from "@/lib/seo/meta";
import { site } from "@/config/site";
import { getFusionEvent, getProjectFamily } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { ContentNote } from "@/components/ui/ContentNote";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { EventCountdown } from "@/components/events/EventCountdown";
import { ShareButtons } from "@/components/events/ShareButtons";
import { Coverflow } from "@/components/media/Coverflow";

const PATH = "/our-work/fusion/2026";

export async function generateMetadata(): Promise<Metadata> {
  const e = await getFusionEvent();
  return pageMeta({ title: `${e.title} ${e.edition}`, description: `${e.dateLabel}. ${e.summary}`, path: PATH });
}

export default async function FusionEventPage() {
  const [e, fusion] = await Promise.all([getFusionEvent(), getProjectFamily("fusion")]);
  const pastEditions = (fusion?.items ?? []).filter((i) => i.group === "Editions");
  const location = [e.venue, e.city].filter(Boolean).join(", ");

  const ways = [
    { icon: Send, title: "Apply", text: "Join the bootcamp as a creative or technologist.", url: e.applyUrl, external: true, track: "event_application_click" },
    { icon: Vote, title: "Vote", text: "Back your favourite projects and creators.", url: e.voteUrl, external: true },
    { icon: HandHeart, title: "Sponsor", text: "Support young talent and put your brand behind Fusion.", url: e.sponsorUrl },
    { icon: Users, title: "Volunteer", text: "Help run the three days on the ground.", url: "/get-involved/volunteer" },
  ];

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${e.title} ${e.edition}`,
    startDate: e.startsAt,
    endDate: e.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: e.summary,
    organizer: { "@type": "Organization", name: site.name },
    // Location only when confirmed: never guessed.
    ...(location && {
      location: { "@type": "Place", name: e.venue ?? e.city, address: { "@type": "PostalAddress", addressLocality: e.city ?? undefined, addressCountry: "NG" } },
    }),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: e.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero: the storytelling moment, with the countdown as its focal point */}
      <section aria-labelledby="event-title" className="edge-slant relative isolate overflow-hidden bg-night [--slant:4vw]">
        <div className="absolute inset-0 -z-10">
          <Photo image={e.hero} tone="dark" variant={2} priority notePosition="top-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/95 via-night/70 to-night/20" />
          <div aria-hidden="true" className="absolute -right-24 -bottom-24 h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-3xl" />
        </div>
        <div className="container-site pt-32 pb-28 md:pt-40 lg:pb-36">
          <Breadcrumbs items={[{ label: "Our Work", href: "/our-work" }, { label: "Fusion", href: "/our-work/fusion" }, { label: `${e.title} ${e.edition}` }]} />
          <p className="eyebrow mt-10 text-mist">Fusion Creative Project · A Chris Charis Concept initiative</p>
          <h1 id="event-title" className="mt-4 max-w-4xl text-display font-bold text-white!">
            {e.title} <span className="text-brand">{e.edition}</span>
          </h1>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-white/85">
            <li className="flex items-center gap-2"><Clock aria-hidden="true" className="h-5 w-5 text-brand" /><time dateTime={e.startsAt}>{e.dateLabel}</time></li>
            <li className="flex items-center gap-2"><MapPin aria-hidden="true" className="h-5 w-5 text-brand" />{location || "Venue to be announced"}</li>
          </ul>
          <p className="mt-6 max-w-2xl text-lead text-white/80">{e.summary}</p>

          <div className="mt-10"><EventCountdown startsAt={e.startsAt} endsAt={e.endsAt} /></div>

          <div className="mt-10 flex flex-wrap gap-3">
            {e.applyUrl && (
              <ButtonLink href={e.applyUrl} external size="lg" data-track="event_application_click" data-track-label={`${e.title} ${e.edition}: Apply (hero)`}>
                Apply now
              </ButtonLink>
            )}
            <ButtonLink href={e.sponsorUrl} size="lg" variant="outline-light">Sponsor Fusion</ButtonLink>
            <a
              href={`${PATH}/calendar.ics`}
              download
              data-track="add_to_calendar"
              data-track-label={`${e.title} ${e.edition}`}
              className="tap inline-flex h-13 items-center gap-2 rounded-full px-5 text-[0.95rem] font-semibold text-white/85 hover:bg-white/10 hover:text-white"
            >
              <CalendarPlus aria-hidden="true" className="h-5 w-5" /> Add to calendar
            </a>
          </div>
        </div>
      </section>

      {/* Take part */}
      <section aria-labelledby="takepart-title" className="py-20 lg:py-28">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand-ink">Take part</p>
              <h2 id="takepart-title" className="mt-3 text-h2 font-semibold">Four ways to be part of Fusion</h2>
            </div>
            <a
              href={`${PATH}/calendar.ics`}
              download
              data-track="add_to_calendar"
              data-track-label={`${e.title} ${e.edition}`}
              className="hit-y group inline-flex items-center gap-2 text-sm font-semibold text-brand-ink"
            >
              <CalendarPlus aria-hidden="true" className="h-4 w-4" /> Add to calendar
            </a>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ways.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.06}>
                {w.url ? (
                  <a
                    href={w.url}
                    {...(w.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    data-track={w.track}
                    data-track-label={w.track ? `${e.title} ${e.edition}: ${w.title}` : undefined}
                    className="group tap-soft flex h-full flex-col rounded-2xl border border-line p-7 transition-[translate,transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_60px_-30px_rgba(35,108,158,0.45)]"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-mist text-brand-ink transition-colors group-hover:bg-brand-ink group-hover:text-white">
                      <w.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-7 text-h3 font-semibold">{w.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-ink">{w.text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
                      {w.title} {w.external ? <ArrowUpRight aria-hidden="true" className="h-4 w-4" /> : <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
                      {w.external && <span className="sr-only">(opens in a new tab)</span>}
                    </span>
                  </a>
                ) : (
                  <div className="flex h-full flex-col rounded-2xl border border-dashed border-line p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-slate-ink">
                      <w.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-7 text-h3 font-semibold text-slate-ink">{w.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-ink">{w.text}</p>
                    <p className="mt-6 text-sm font-semibold text-slate-ink">Opens soon</p>
                  </div>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Programme */}
      <section aria-labelledby="programme-title" className="bg-ink py-20 text-white lg:py-28">
        <div className="container-site">
          <p className="eyebrow text-mist">Programme</p>
          <h2 id="programme-title" className="mt-3 text-h2 font-semibold text-white!">Three days</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-3">
            {e.days.map((d, i) => (
              <li key={d.date} className="flex flex-col bg-ink p-7 sm:p-9">
                <p className="font-display text-5xl leading-none font-bold text-brand tabular-nums">0{i + 1}</p>
                <h3 className="mt-4 text-lg font-semibold text-white!">
                  <time dateTime={d.date}>{d.label}</time>
                </h3>
                {d.sessions.length > 0 ? (
                  <ul className="mt-6 divide-y divide-white/10 border-t border-white/10">
                    {d.sessions.map((s) => (
                      <li key={`${s.time}-${s.title}`} className="grid grid-cols-[4rem_1fr] gap-3 py-4">
                        <span className="text-sm font-semibold text-mist tabular-nums">{s.time}</span>
                        <span>
                          <span className="block font-semibold text-white">{s.title}</span>
                          {(s.detail || s.speaker) && <span className="mt-1 block text-sm text-white/65">{[s.speaker, s.detail].filter(Boolean).join(" · ")}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/65">Sessions for this day will be announced soon.</p>
                )}
              </li>
            ))}
          </ol>
          {e.days.every((d) => d.sessions.length === 0) && (
            <ContentNote className="mt-8 max-w-2xl border-white/25 bg-white/5 text-white/80 [&_span]:text-mist">
              Daily programme (times, sessions, facilitators), venue and the voting link. Add them in the Studio under Events.
            </ContentNote>
          )}
        </div>
      </section>

      {/* Speakers */}
      <section aria-labelledby="speakers-title" className="py-20 lg:py-28">
        <div className="container-site">
          <p className="eyebrow text-brand-ink">People</p>
          <h2 id="speakers-title" className="mt-3 text-h2 font-semibold">Speakers and facilitators</h2>
          {e.speakers.length > 0 ? (
            <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
              {e.speakers.map((p) => (
                <li key={p.name}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-mist"><Photo image={p.photo} sizes="(min-width: 1024px) 25vw, 50vw" /></div>
                  <h3 className="mt-4 text-base font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-brand-ink">{p.role}</p>
                  {p.bio && <p className="mt-2 text-sm text-slate-ink">{p.bio}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 max-w-xl text-lead text-slate-ink">The line-up will be announced here. Add the event to your calendar so you don’t miss it.</p>
          )}
        </div>
      </section>

      {/* Past editions */}
      <section aria-labelledby="past-title" className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-brand-ink">The story so far</p>
              <h2 id="past-title" className="mt-3 text-h2 font-semibold">Past editions</h2>
            </div>
            <Link href="/our-work/fusion" className="hit-y group inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
              About the Fusion Creative Project <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-3">
            {pastEditions.map((ed) => (
              <li key={ed.name} className="rounded-full bg-white px-5 py-2.5 font-display font-semibold text-ink ring-1 ring-line">{ed.name}</li>
            ))}
          </ul>
          {fusion && fusion.gallery.length > 0 && (
            <div className="mt-10">
              <Coverflow
                label="Fusion photos"
                initial={Math.floor((fusion.gallery.length - 1) / 2)}
                items={fusion.gallery.map((img, i) => ({ id: `fusion-${i}`, title: img.src ? img.brief || img.alt : img.alt.split(": ").slice(1).join(": ") || img.alt, eyebrow: "Fusion Creative Project", image: img }))}
              />
            </div>
          )}
        </div>
      </section>

      {/* Sponsors */}
      <section aria-labelledby="sponsors-title" className="py-20">
        <div className="container-site">
          <h2 id="sponsors-title" className="eyebrow text-center text-slate-ink">Supported by</h2>
          {e.sponsors.length > 0 ? (
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {e.sponsors.map((s) => (
                <li key={s.name} className="text-sm font-semibold text-charcoal">{s.name}</li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto mt-6 max-w-xl text-center">
              <p className="text-lead text-slate-ink">Sponsorship places are open for Fusion {e.edition}.</p>
              <ButtonLink href={e.sponsorUrl} variant="outline" className="mt-6">Become a sponsor</ButtonLink>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-line py-20 lg:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-brand-ink">FAQ</p>
            <h2 id="faq-title" className="mt-3 text-h2 font-semibold">Good to know</h2>
          </div>
          <div className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
            {e.faqs.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-3 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist text-brand-ink transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 leading-relaxed text-slate-ink">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section aria-labelledby="event-cta-title" className="bg-brand-deep py-20 text-white">
        <div className="container-site flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="event-cta-title" className="text-h2 font-semibold text-white!">See you at Fusion {e.edition}.</h2>
            <p className="mt-3 text-white/80"><time dateTime={e.startsAt}>{e.dateLabel}</time>{location && <> · {location}</>}</p>
          </div>
          <ShareButtons path={PATH} text={`${e.title} ${e.edition}, ${e.dateLabel}`} />
        </div>
      </section>
    </>
  );

}
