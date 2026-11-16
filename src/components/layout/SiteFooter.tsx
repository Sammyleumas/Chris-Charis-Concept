import Link from "next/link";
import { cacheLife } from "next/cache";
import { MapPin, Mail, Phone } from "lucide-react";
import { legalNav } from "@/config/navigation";
import { site } from "@/config/site";
import { getOrganisations, getProjectFamilies, getSiteSettings } from "@/lib/content";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CookieSettingsButton } from "@/components/legal/CookieConsent";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "/about/story" },
  { label: "Impact", href: "/impact" },
  { label: "Media", href: "/media" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const involved = [
  { label: "Volunteer", href: "/get-involved/volunteer" },
  { label: "Partner & Sponsor", href: "/get-involved/partner" },
  { label: "Careers & Facilitators", href: "/get-involved/careers" },
  { label: "Donate", href: "/donate" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="eyebrow text-white/60">{title}</h2>
      <ul className="mt-4 space-y-0.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-1.5 text-sm text-white/80 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export async function SiteFooter() {
  const [families, orgs, settings] = await Promise.all([getProjectFamilies(), getOrganisations(), getSiteSettings()]);
  const { location, contact, socials } = settings;

  return (
    <footer className="bg-night text-white">
      <div className="container-site grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1.25fr_2fr] lg:gap-20 lg:py-24">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">{site.shortDescription}</p>
          <SocialLinks links={socials} className="mt-6 text-sm font-semibold text-white/85" />
          <div className="mt-8 max-w-sm">
            <h2 className="font-display text-base font-semibold text-white">Stay in the story</h2>
            <p className="mt-1 mb-4 text-sm text-white/65">Project news, films and opportunities, a few times a year.</p>
            <NewsletterForm tone="dark" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          <Column title="Explore" links={quickLinks} />
          <Column
            title="Our Work"
            links={families.map((f) => ({ label: f.shortName, href: `/our-work/${f.slug}` }))}
          />
          <Column
            title="Organisations"
            links={orgs.map((o) => ({ label: o.name, href: `/organisations/${o.slug}` }))}
          />
          <div>
            <Column title="Get Involved" links={involved} />
            <h2 className="eyebrow mt-10 text-white/60">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li className="flex gap-2.5">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {location.streetAddress && <>{location.streetAddress}, </>}
                  {location.city}, {location.state}, {location.country}
                </span>
              </li>
              {contact.email && (
                <li className="flex gap-2.5">
                  <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white">{contact.email}</a>
                </li>
              )}
              {contact.phone && (
                <li className="flex gap-2.5">
                  <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-white">{contact.phone}</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-xs text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. Trading name of {site.legalName} ({site.registrationNumber}).
          </p>
          <ul className="flex flex-wrap gap-x-5">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-2.5 hover:text-white">{l.label}</Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="inline-block py-2.5 hover:text-white" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
