import Link from "next/link";
import { ArrowRight, Clapperboard, GraduationCap, HandHeart, TrendingUp } from "lucide-react";
import type { PathwayStage } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = { tell: Clapperboard, reach: HandHeart, build: GraduationCap, earn: TrendingUp };

export function ImpactPathway({ stages }: { stages: PathwayStage[] }) {
  return (
    <section aria-labelledby="pathway-title" className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="pathway-title"
            tone="light"
            eyebrow="Our impact pathway"
            title="From a story on screen to a skill that pays."
          />
          <p className="max-w-sm text-sm leading-relaxed text-white/65">
            Every project sits on one pathway. Film starts the conversation, outreach reaches communities, training
            builds skill, and our enterprises turn skill into income.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-0 lg:mt-20 lg:grid-cols-4">
          {/* Connecting line: vertical on mobile, horizontal on desktop */}
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-[1.375rem] w-px bg-white/15 lg:top-[1.375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full" />
          {stages.map((s, i) => {
            const Icon = icons[s.key];
            return (
              <Reveal as="li" key={s.key} delay={i * 0.08} className="relative pb-12 pl-16 last:pb-0 lg:pr-8 lg:pb-0 lg:pl-0">
                <span className="absolute top-0 left-0 grid h-11 w-11 place-items-center rounded-full bg-brand text-white ring-8 ring-ink lg:static">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="mt-0 text-xs font-semibold tracking-[0.2em] text-white/50 lg:mt-8">0{i + 1}</p>
                <h3 className="mt-2 font-display text-h3 font-semibold text-white!">{s.title}</h3>
                <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-white/70">{s.text}</p>
                <Link
                  href={s.href}
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mist hover:text-white"
                >
                  {s.linkLabel}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
