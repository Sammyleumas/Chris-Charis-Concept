import Link from "next/link";
import { ArrowRight, HandHeart, Handshake, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const actions = [
  {
    icon: Users,
    title: "Volunteer",
    text: "Give your time and skills on set, at outreaches and at events.",
    href: "/get-involved/volunteer",
    cta: "Apply to volunteer",
  },
  {
    icon: Handshake,
    title: "Partner",
    text: "Sponsor a programme or build a project with us.",
    href: "/get-involved/partner",
    cta: "Start a partnership",
  },
  {
    icon: HandHeart,
    title: "Donate",
    text: "Fund the films, outreaches and training that change lives.",
    href: "/donate",
    cta: "Give today",
  },
];

export function GetInvolvedSection() {
  return (
    <section aria-labelledby="involved-title" className="py-24 lg:py-32">
      <div className="container-site">
        <SectionHeading
          id="involved-title"
          eyebrow="Get involved"
          title="Together, we can create more impact."
          align="center"
        />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {actions.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.08}>
              <Link
                href={a.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-8 tap-soft transition-[translate,transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_60px_-30px_rgba(35,108,158,0.45)] lg:p-10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-mist text-brand-ink transition-colors group-hover:bg-brand-ink group-hover:text-white">
                  <a.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-8 text-h3 font-semibold">{a.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-slate-ink">{a.text}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
                  {a.cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
