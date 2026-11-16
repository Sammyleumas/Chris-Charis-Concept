import { site } from "@/config/site";
import { getSiteSettings } from "@/lib/content";
import { brand } from "@/config/brand";
import { siteUrl } from "@/lib/seo/meta";

export async function OrganizationJsonLd() {
  const { contact, socials, location } = await getSiteSettings();
  const data = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    legalName: site.legalName,
    identifier: site.registrationNumber,
    description: site.shortDescription,
    logo: `${siteUrl()}${brand.logo.fullPng}`,
    foundingDate: "2020-08",
    ...(site.url && { url: site.url }),
    ...(contact.email && { email: contact.email }),
    ...(contact.phone && { telephone: contact.phone }),
    ...(socials.length && { sameAs: socials.map((s) => s.url) }),
    address: {
      "@type": "PostalAddress",
      ...(location.streetAddress && { streetAddress: location.streetAddress }),
      addressLocality: location.city,
      addressRegion: site.location.state,
      addressCountry: "NG",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
