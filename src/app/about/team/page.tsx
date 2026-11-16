import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { PageHero } from "@/components/ui/PageHero";
import { ContentNote } from "@/components/ui/ContentNote";
import { ButtonLink } from "@/components/ui/Button";
import { AboutNav } from "@/components/about/AboutNav";
import { TeamCard } from "@/components/about/TeamCard";
import { getTeam } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Our Team",
  description: "Meet the leadership and department leads of Chris Charis Concept.",
  path: "/about/team",
});

export default async function TeamPage() {
  const team = await getTeam();
  const leadership = team.filter((m) => m.group === "leadership");
  const leads = team.filter((m) => m.group === "department");

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Our Team"
        subtitle="The people behind the work."
        crumbs={[{ label: "About", href: "/about" }, { label: "Team" }]}
      />
      <AboutNav current="/about/team" />

      <section aria-labelledby="leadership-title" className="py-20 lg:py-28">
        <div className="container-site">
          <h2 id="leadership-title" className="text-h2 font-semibold">Leadership</h2>
          {leadership.length > 0 ? (
            <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((m) => <TeamCard key={m.name} member={m} featured />)}
            </ul>
          ) : (
            <ContentNote className="mt-8 max-w-2xl">
              Leadership photos, names, positions and short bios, with consent to publish (COO to collect).
            </ContentNote>
          )}

          <h2 className="mt-24 text-h2 font-semibold">Department leads</h2>
          {leads.length > 0 ? (
            <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
              {leads.map((m) => <TeamCard key={m.name} member={m} />)}
            </ul>
          ) : (
            <ContentNote className="mt-8 max-w-2xl">Department lead photos, names and roles.</ContentNote>
          )}
        </div>
      </section>

      <section aria-labelledby="volunteers-title" className="bg-ink py-20 text-white lg:py-24">
        <div className="container-site grid items-center gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 id="volunteers-title" className="text-h2 font-semibold text-white!">And our volunteers.</h2>
            <p className="mt-4 max-w-xl text-lead text-white/75">
              Every film shoot, outreach and event is carried by volunteers who give their time and skills. Thank you.
            </p>
          </div>
          <ButtonLink href="/get-involved/volunteer" variant="light" className="justify-self-start lg:justify-self-end">
            Become a volunteer
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
