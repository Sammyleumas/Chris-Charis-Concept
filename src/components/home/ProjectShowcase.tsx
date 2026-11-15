import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProjectFamily } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

// Editorial rhythm: one lead story, one tall companion, three supporting.
const layout = [
  { card: "lg:col-span-7", media: "aspect-[16/11]" },
  { card: "lg:col-span-5", media: "aspect-[4/3] lg:aspect-[5/6]" },
  { card: "lg:col-span-4", media: "aspect-[4/3]" },
  { card: "lg:col-span-4", media: "aspect-[4/3]" },
  { card: "lg:col-span-4", media: "aspect-[4/3]" },
];

export function ProjectShowcase({ families }: { families: ProjectFamily[] }) {
  return (
    <section aria-labelledby="work-title" className="bg-paper py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="work-title"
            eyebrow="Our work"
            title="Five project families. Six years of work."
            intro="From our first advocacy film in 2020 to a creative technology movement today."
          />
          <ButtonLink href="/our-work" variant="outline" className="self-start md:self-auto">
            View all our work
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-16">
          {families.map((f, i) => {
            const l = layout[i] ?? layout[2];
            return (
              <Reveal as="li" key={f.slug} delay={(i % 3) * 0.06} className={cn(l.card, i === 0 && "md:col-span-2 lg:col-span-7")}>
                <Link href={`/our-work/${f.slug}`} className="group block">
                  <div className={cn("relative overflow-hidden rounded-sm bg-mist", l.media)}>
                    <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]">
                      <Photo image={f.image} sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                    <span className="absolute top-4 left-4 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white tabular-nums">
                      {f.year}
                    </span>
                  </div>
                  <h3 className={cn("mt-6 font-semibold group-hover:text-brand-ink", i === 0 ? "text-h2" : "text-h3")}>
                    {f.name}
                  </h3>
                  <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-slate-ink">{f.line}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
                    Learn more
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    <span className="sr-only">about {f.name}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
