import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import Link from "next/link";
import { ArrowRight, Clapperboard, GraduationCap, Building2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AboutNav } from "@/components/about/AboutNav";
import { CountUp } from "@/components/home/CountUp";
import { images } from "@/content/images";
import { aboutFull, site } from "@/config/site";
import { getImpactStats } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description: "Chris Charis Concept is a not-for-profit social enterprise in Benin City, Nigeria, using filmmaking, creative media, arts and technology for community development.",
  path: "/about",
});

// The three areas of work, quoted from the approved About text (brief §6).
const pillars = [
  {
    icon: Clapperboard,
    title: "Create and share",
    text: "Audiovisual and digital content for education, public enlightenment, advocacy and cultural development.",
  },
  {
    icon: GraduationCap,
    title: "Train and mentor",
    text: "Training, workshops, mentorship and skills acquisition in creative arts, media and digital technology for young people and underserved communities.",
  },
  {
    icon: Building2,
    title: "Build platforms",
    text: "Creative and technology hubs, learning platforms and community-based programmes for innovation, talent development and social impact.",
  },
];

const explore = [
  { href: "/about/story", title: "Our Story", text: "Six years of projects, from August 2020 to today." },
  { href: "/about/vision", title: "Vision, Mission & Values", text: "What we believe and where we are going." },
  { href: "/about/team", title: "Our Team", text: "The people behind the work." },
  { href: "/about/partners", title: "Partners", text: "The organisations we work alongside." },
  { href: "/about/governance", title: "Legal & Governance", text: "Registered names, numbers and policies." },
];

export default async function AboutPage() {
  const stats = await getImpactStats();
  // First sentence of the approved text becomes the lead; the rest follows unchanged.
  const [lead, ...rest] = aboutFull.split(/(?<=\.)\s+(?=It promotes)/);

  return (
    <>
      <PageHero
        eyebrow="About"
        title="About Chris Charis Concept"
        subtitle="Our story, our purpose, our people."
        image={images.aboutHero}
        crumbs={[{ label: "About" }]}
      />
      <AboutNav current="/about" />

      {/* Who we are */}
      <section aria-labelledby="who-title" className="py-20 lg:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow text-brand-ink">Who we are</p>
            <h2 id="who-title" className="mt-4 text-h2 font-semibold">
              A creative social enterprise for community change.
            </h2>
            <p className="mt-8 text-lead font-medium text-ink">{lead}</p>
            <p className="mt-6 leading-relaxed text-charcoal">{rest.join(" ")}</p>
            <ButtonLink href="/about/story" variant="outline" className="mt-10">Our Story</ButtonLink>
          </div>
          <Reveal className="relative lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Photo image={images.aboutWho} sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden max-w-[16rem] bg-brand-ink p-6 text-white lg:block">
              <p className="text-xs tracking-wide text-white/75">Trading name of</p>
              <p className="mt-1 font-display text-sm font-semibold leading-snug">{site.legalName}</p>
              <p className="mt-2 text-xs text-white/75">{site.registrationNumber}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Figures panel (mock-up: charcoal stats block) */}
      <section aria-label="Our impact in numbers" className="container-site">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3 lg:grid-cols-5 [&>li]:bg-ink">
          {stats.map((s) => (
            <li key={s.id} className="p-7 text-center text-white last:col-span-2 sm:last:col-span-1">
              <p className="font-display text-4xl font-bold">
                {s.value !== null ? <CountUp value={s.value} display={s.display} /> : s.display}
              </p>
              <p className="mt-2 text-sm text-white/70">{s.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* What we do */}
      <section aria-labelledby="do-title" className="py-20 lg:py-32">
        <div className="container-site">
          <SectionHeading
            id="do-title"
            eyebrow="What we do"
            title="Three ways we create change."
            intro="We work with governments, NGOs, educational institutions, private organisations, development partners and donor agencies, and apply all income and property solely to these objects."
          />
          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="border-t-2 border-ink pt-8">
                <p.icon aria-hidden="true" className="h-7 w-7 text-brand-ink" />
                <h3 className="mt-6 text-h3 font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-ink">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Explore About */}
      <section aria-labelledby="explore-title" className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          <h2 id="explore-title" className="text-h2 font-semibold">Explore more about us</h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {explore.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="group grid items-center gap-2 py-6 md:grid-cols-[1fr_1.4fr_auto] md:gap-8">
                  <span className="font-display text-xl font-semibold text-ink group-hover:text-brand-ink">{e.title}</span>
                  <span className="text-slate-ink">{e.text}</span>
                  <ArrowRight aria-hidden="true" className="hidden h-5 w-5 text-brand-ink transition-transform group-hover:translate-x-1 md:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
