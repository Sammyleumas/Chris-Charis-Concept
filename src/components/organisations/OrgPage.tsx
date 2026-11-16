import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Organisation } from "@/content/types";
import { getProjectFamilies } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ContentNote } from "@/components/ui/ContentNote";
import { Photo } from "@/components/ui/Photo";

/** Shared organisation page (brief §5.5): name, registration, role, offerings, projects, enquiry. */
export async function OrgPage({
  org,
  children,
  heroAction,
}: {
  org: Organisation;
  children?: ReactNode;
  heroAction?: { label: string; href: string };
}) {
  const families = (await getProjectFamilies()).filter((f) => org.relatedFamilies.includes(f.slug));
  const actions = org.enquiry.actions.filter((a) => a.url);

  return (
    <>
      <PageHero
        eyebrow="Our Organisations"
        title={org.name}
        subtitle={org.line}
        image={org.image}
        crumbs={[{ label: "Our Organisations", href: "/organisations" }, { label: org.name }]}
      >
        {heroAction && <ButtonLink href={heroAction.href} size="lg">{heroAction.label}</ButtonLink>}
      </PageHero>

      <section aria-labelledby="overview-title" className="py-20 lg:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand-ink">Overview</p>
            <h2 id="overview-title" className="mt-3 text-h2 font-semibold">What we do</h2>
            {org.description ? (
              <p className="mt-6 text-lead text-charcoal">{org.description}</p>
            ) : (
              <ContentNote className="mt-6">Approved description of {org.name}: purpose, audience and approach.</ContentNote>
            )}
          </div>

          <aside className="self-start rounded-2xl bg-paper p-8 lg:col-span-4 lg:col-start-9">
            <h2 className="eyebrow text-slate-ink">At a glance</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-slate-ink">Relationship</dt>
                <dd className="mt-1 font-medium text-ink">{org.relationship}</dd>
              </div>
              {org.registeredName && (
                <div>
                  <dt className="text-slate-ink">Registered name</dt>
                  <dd className="mt-1 font-medium text-ink">{org.registeredName}</dd>
                </div>
              )}
              {org.registrationNumber && (
                <div>
                  <dt className="text-slate-ink">Registration number</dt>
                  <dd className="mt-1 font-medium text-ink tabular-nums">{org.registrationNumber}</dd>
                </div>
              )}
              {org.website && (
                <div>
                  <dt className="text-slate-ink">Website</dt>
                  <dd className="mt-1">
                    <a href={org.website} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-ink underline-offset-4 hover:underline">
                      {org.website.replace(/^https?:\/\//, "")}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            {!org.registrationNumber && (
              <p className="mt-6 border-t border-line pt-4 text-xs text-slate-ink">
                Registration details are shown once confirmed against CAC records.
              </p>
            )}
          </aside>
        </div>
      </section>

      <section aria-labelledby="offerings-title" className="bg-ink py-20 text-white lg:py-24">
        <div className="container-site">
          <h2 id="offerings-title" className="text-h2 font-semibold text-white!">{org.offerings.title}</h2>
          {org.offerings.items.length > 0 && (
            <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3">
              {org.offerings.items.map((item) => (
                <li key={item} className="flex gap-4 bg-ink p-7">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="leading-relaxed text-white/85">{item}</span>
                </li>
              ))}
            </ul>
          )}
          {org.offerings.pendingNote && (
            <ContentNote className="mt-8 max-w-2xl border-white/25 bg-white/5 text-white/80 [&_span]:text-mist">
              {org.offerings.pendingNote}
            </ContentNote>
          )}
        </div>
      </section>

      {children}

      {families.length > 0 && (
        <section aria-labelledby="projects-title" className="py-20 lg:py-28">
          <div className="container-site">
            <p className="eyebrow text-brand-ink">Connected projects</p>
            <h2 id="projects-title" className="mt-3 text-h2 font-semibold">Where this work happens</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {families.map((f) => (
                <li key={f.slug}>
                  <Link href={`/our-work/${f.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line transition-colors hover:border-brand/40">
                    <div className="relative aspect-[16/9] bg-mist">
                      <Photo image={f.image} sizes="(min-width: 1024px) 33vw, 100vw" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-sm font-semibold text-brand-ink tabular-nums">{f.year}</p>
                      <h3 className="mt-1 text-lg font-semibold group-hover:text-brand-ink">{f.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-ink">{f.line}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
                        View project <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {actions.length > 0 && (
        <section aria-labelledby="enquiry-title" className="bg-mist py-20">
          <div className="container-site grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 id="enquiry-title" className="text-h2 font-semibold">{org.enquiry.title}</h2>
              <p className="mt-4 max-w-xl text-lead text-slate-ink">{org.enquiry.text}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {actions.map((a, i) => (
                <ButtonLink key={a.label} href={a.url!} external={a.external} variant={i === 0 ? "primary" : "outline"}>
                  {a.label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
