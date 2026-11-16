import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { Eye, Target, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContentNote } from "@/components/ui/ContentNote";
import { AboutNav } from "@/components/about/AboutNav";
import { getPathway, getStatements } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Vision, Mission & Values",
  description: "The vision, mission and values that guide Chris Charis Concept.",
  path: "/about/vision",
});

export default async function VisionPage() {
  const [s, pathway] = await Promise.all([getStatements(), getPathway()]);
  const blocks = [
    { icon: Eye, label: "Our vision", text: s.vision },
    { icon: Target, label: "Our mission", text: s.mission },
  ];

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Vision, Mission & Values"
        subtitle="What we believe and where we are going."
        crumbs={[{ label: "About", href: "/about" }, { label: "Vision, Mission & Values" }]}
      />
      <AboutNav current="/about/vision" />

      <section aria-label="Vision and mission" className="py-20 lg:py-28">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          {blocks.map((b) => (
            <article key={b.label} className="flex flex-col rounded-2xl bg-ink p-8 text-white sm:p-12">
              <b.icon aria-hidden="true" className="h-7 w-7 text-brand" />
              <h2 className="eyebrow mt-8 text-mist">{b.label}</h2>
              {b.text ? (
                <p className="mt-4 font-display text-2xl leading-snug font-semibold text-white sm:text-3xl">{b.text}</p>
              ) : (
                <ContentNote className="mt-6 border-white/25 bg-white/5 text-white/80 [&_span]:text-mist">
                  Approved {b.label.replace("Our ", "")} statement from the Founder.
                </ContentNote>
              )}
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          <p className="eyebrow text-brand-ink">Our values</p>
          <h2 id="values-title" className="mt-4 text-h2 font-semibold">What guides our work</h2>
          {s.values.length > 0 ? (
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {s.values.map((v, i) => (
                <li key={v.name} className="border-t-2 border-ink pt-6">
                  <p className="text-sm font-semibold text-brand-ink tabular-nums">0{i + 1}</p>
                  <h3 className="mt-2 text-h3 font-semibold">{v.name}</h3>
                  {v.text && <p className="mt-2 text-slate-ink">{v.text}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <ContentNote className="mt-8 max-w-2xl">
              Approved values, tagline and motto. The CTO brief lists them as ready, but the wording is not in the document.
            </ContentNote>
          )}
        </div>
      </section>

      <section aria-labelledby="approach-title" className="py-20 lg:py-28">
        <div className="container-site">
          <p className="eyebrow text-brand-ink">Our approach</p>
          <h2 id="approach-title" className="mt-4 max-w-2xl text-h2 font-semibold">
            Tell → Reach → Build → Earn &amp; Lead
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {pathway.map((p, i) => (
              <li key={p.key}>
                <Sparkles aria-hidden="true" className="h-5 w-5 text-brand" />
                <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-slate-ink">0{i + 1}</p>
                <h3 className="mt-1 text-h3 font-semibold">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-ink">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
