import { images } from "@/content/images";
import { site } from "@/config/site";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function WhoWeAre() {
  const facts = [
    { k: "Since", v: site.foundedLabel },
    { k: "Based in", v: `${site.location.city}, ${site.location.state}` },
    { k: "Registered", v: `Not-for-profit · ${site.registrationNumber}` },
  ];
  return (
    <section aria-labelledby="who-title" className="py-24 lg:py-36">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative lg:col-span-6">
          <div aria-hidden="true" className="absolute -bottom-5 -left-5 h-2/3 w-2/3 bg-mist lg:-bottom-8 lg:-left-8" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Photo image={images.whoWeAre} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <p className="eyebrow text-brand-ink">Who we are</p>
          <h2 id="who-title" className="mt-4 text-h2 font-semibold">
            More than films, training or events.
          </h2>
          <p className="mt-6 text-lead text-charcoal">
            Chris Charis Concept is a creative social enterprise dedicated to using filmmaking, arts, media and
            technology to drive community development, empower young people and create positive social change.
          </p>
          <dl className="mt-10 grid grid-cols-1 gap-y-4 border-t border-line pt-8 sm:grid-cols-3 sm:gap-x-6">
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="text-xs text-slate-ink">{f.k}</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href="/about" variant="outline" className="mt-10">Discover Our Story</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
