import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import Link from "next/link";
import { ArrowRight, Briefcase, HandHeart, Handshake, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { InvolveNav } from "@/components/involve/InvolveNav";
import { images } from "@/content/images";

export const metadata: Metadata = pageMeta({
  title: "Get Involved",
  description: "Volunteer, partner, sponsor, donate or work with Chris Charis Concept.",
  path: "/get-involved",
});

const ways = [
  { icon: Users, title: "Volunteer", text: "Share your time on film sets, outreaches and events.", href: "/get-involved/volunteer", cta: "Apply to volunteer" },
  { icon: Handshake, title: "Partner & Sponsor", text: "Grow impact together through sponsorship or a programme partnership.", href: "/get-involved/partner", cta: "Start a partnership" },
  { icon: HandHeart, title: "Donate", text: "Fund the films, outreaches and training that change lives.", href: "/donate", cta: "Give now" },
  { icon: Briefcase, title: "Careers & Facilitators", text: "Teach, mentor or join our team.", href: "/get-involved/careers", cta: "See opportunities" },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Get Involved"
        subtitle="Be part of our mission."
        image={images.getInvolved}
        crumbs={[{ label: "Get Involved" }]}
      />
      <InvolveNav current="/get-involved" />
      <section aria-label="Ways to get involved" className="py-20 lg:py-28">
        <div className="container-site">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ways.map((w, i) => (
              <Reveal as="li" key={w.href} delay={i * 0.06}>
                <Link href={w.href} className="group flex h-full flex-col rounded-2xl border border-line p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_60px_-30px_rgba(35,108,158,0.45)]">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-mist text-brand-ink transition-colors group-hover:bg-brand-ink group-hover:text-white">
                    <w.icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h2 className="mt-8 text-h3 font-semibold">{w.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-ink">{w.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
                    {w.cta} <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="together-title" className="container-site pb-20 lg:pb-28">
        <div className="relative isolate overflow-hidden rounded-2xl bg-brand-deep">
          <div className="absolute inset-0 -z-10 opacity-60">
            <Photo image={images.getInvolved} tone="dark" notePosition="top-right" sizes="100vw" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deep via-brand-deep/85 to-transparent" />
          <div className="max-w-xl p-10 sm:p-14">
            <h2 id="together-title" className="text-h2 font-semibold text-white!">Together, we can create more impact.</h2>
            <p className="mt-4 text-white/80">Every volunteer hour, partnership and gift moves a young person further along the pathway.</p>
            <ButtonLink href="/donate" variant="light" className="mt-8">Donate now</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
