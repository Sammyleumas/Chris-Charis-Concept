import { site } from "@/config/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    legalName: site.legalName,
    identifier: site.registrationNumber,
    description: site.shortDescription,
    foundingDate: "2020-08",
    ...(site.url && { url: site.url }),
    ...(site.contact.email && { email: site.contact.email }),
    ...(site.socials.length && { sameAs: site.socials.map((s) => s.url) }),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.state,
      addressCountry: "NG",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
