/**
 * Organisation identity and global settings.
 *
 * Source of truth: "Official Website Build Brief for the CTO" (Oct 2026).
 * Anything the brief marks "[LINK — to be provided]" is `null` here. A null
 * value is never rendered as a link; the UI hides it instead. When the
 * Founder supplies a value, set it here (or in the CMS once connected).
 */

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "x"
  | "tiktok"
  | "youtube"
  | "whatsapp"
  | "telegram";

export type SocialLink = { platform: SocialPlatform; url: string };

export const site = {
  name: "Chris Charis Concept",
  legalName: "Chris Charis Social Enterprise for Art and Tech LTD/GTE",
  registrationNumber: "RC 9786077",
  organisationType: "Not-for-profit social enterprise",
  foundedLabel: "August 2020",
  tagline: "Transforming Communities Through Creative Expressions",
  // Main website domain: [LINK — to be provided]. Used for canonical URLs
  // and the sitemap; falls back to the deployment URL when unset.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? null,

  location: {
    city: "Benin City",
    state: "Edo State",
    country: "Nigeria",
    // Street address: not supplied. Do not invent.
    streetAddress: null as string | null,
  },

  contact: {
    // Official email and phone: not supplied in the brief.
    email: null as string | null,
    phone: null as string | null,
  },

  // Brief §7 lists *proposed* handles only (e.g. @chrischarisconcept).
  // They must be registered and confirmed before they are linked.
  socials: [] as SocialLink[],

  shortDescription:
    "Chris Charis Concept is a not-for-profit social enterprise in Benin City, Nigeria, that uses filmmaking, creative media, arts and technology to drive community development, skills and social impact.",
} as const;

/** Brief §6, "About (full)" — approved text, do not edit without Founder sign-off. */
export const aboutFull =
  "Chris Charis Social Enterprise for Art and Tech LTD/GTE (RC 9786077), trading as Chris Charis Concept, is a not-for-profit social enterprise registered in Nigeria and based in Benin City, Edo State. It promotes community development through filmmaking, creative media, arts and technology-based education, skills development and social impact initiatives. The enterprise creates and shares audiovisual and digital content for education, public enlightenment, advocacy and cultural development; runs training, workshops, mentorship and skills acquisition programmes in creative arts, media and digital technology for young people and underserved communities; and establishes creative and technology hubs, learning platforms and community-based programmes for innovation, talent development and social impact. It works with governments, non-governmental organisations, educational institutions, private organisations, development partners and donor agencies, and applies all income and property solely to these objects.";

/** Brief §6, "About (short, for footer and social bios)". */
export const aboutShort =
  "Chris Charis Concept is the trading name of Chris Charis Social Enterprise for Art and Tech LTD/GTE (RC 9786077), a not-for-profit social enterprise in Benin City, Nigeria, that uses filmmaking, creative media, arts and technology to drive community development, skills and social impact. Since August 2020 it has produced advocacy films, run community health and mental health campaigns, built leadership programmes, and launched the Fusion Creative Project for young creatives and technologists.";

/** Brief §7.1 website link register. `null` = awaiting the Founder. */
export const linkRegister = {
  youtubeChannel: null as string | null,
  hhcpWebsite: null as string | null,
  soulWebsite: null as string | null,
  // Brief: "Currently https://bit.ly/fusion-artxtech — replace with final URL"
  fusionBootcamp: "https://bit.ly/fusion-artxtech" as string | null,
  fusionConnectAcademy: "https://fc-academy-mu.vercel.app/" as string | null,
  maybeChallengeTiktok: null as string | null,
  donationPage: null as string | null,
  fusionVote: null as string | null,
};
