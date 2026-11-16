/**
 * Content model. These shapes mirror the CMS schemas that Phase 11 will
 * create in Sanity, so swapping the local content layer for the CMS only
 * changes src/lib/content.ts, never the pages.
 */

export type ImageAsset = {
  /** Path in /public or a CMS image URL. `null` = photo not yet supplied. */
  src: string | null;
  alt: string;
  /** What the photo should show. Shown on the placeholder until supplied. */
  brief: string;
  width?: number;
  height?: number;
  /** CSS object-position, e.g. "50% 30%" to keep faces in frame. */
  focus?: string;
  credit?: string;
};

export type ExternalLink = {
  label: string;
  /** `null` = awaiting the Founder; the button is hidden until set. */
  url: string | null;
};

export type ProjectFamilySlug =
  | "film-for-social-change"
  | "healthy-heart"
  | "learn-to-lead"
  | "fusion"
  | "chris-charis-brand";

export type ProjectItem = {
  name: string;
  /** Internal or external page for this item, when one exists. */
  href?: string;
  /** Groups items on pages that need it (e.g. Fusion programmes vs enterprises). */
  group?: string;
  /** Year or date label, only when verified. */
  date?: string;
  summary?: string;
  youtubeUrl?: string | null;
};

export type ProjectFamily = {
  slug: ProjectFamilySlug;
  name: string;
  shortName: string;
  year: number;
  /** One line for cards and the mega-menu. */
  line: string;
  /** Hero description on the project page. */
  intro: string;
  /** Optional accent from the project's own logo, used only on its pages. */
  accent: string | null;
  image: ImageAsset;
  items: ProjectItem[];
  externalLinks: ExternalLink[];
  related: ProjectFamilySlug[];
  /** Verified key numbers only, each with its source. */
  results: { value: string; label: string; source: string }[];
  gallery: ImageAsset[];
  cta: {
    title: string;
    text: string;
    actions: { label: string; url: string | null; external?: boolean }[];
  };
};

export type ImpactStat = {
  id: string;
  value: number | null;
  /** Rendered exactly, e.g. "26", "1,200+", "Dakar". */
  display: string;
  label: string;
  detail: string;
  href: string;
};

export type PathwayStage = {
  key: "tell" | "reach" | "build" | "earn";
  title: string;
  text: string;
  href: string;
  linkLabel: string;
};

export type TimelineEntry = {
  date: string;
  year: number;
  title: string;
  text: string;
  href?: string;
  image?: ImageAsset;
};

export type Organisation = {
  slug: string;
  name: string;
  /** Registered name and number only when verified. */
  registeredName: string | null;
  registrationNumber: string | null;
  line: string;
  description: string | null;
  image: ImageAsset;
  website: string | null;
  /** How this organisation relates to the parent brand. */
  relationship: string;
  relatedFamilies: ProjectFamilySlug[];
  /** Programmes, services or courses: approved items only. */
  offerings: { title: string; items: string[]; pendingNote: string };
  enquiry: { title: string; text: string; actions: { label: string; url: string | null; external?: boolean }[] };
};

export type FeaturedInitiative = {
  eyebrow: string;
  title: string;
  dateLabel: string;
  /** ISO dates for Event schema. */
  startDate: string;
  endDate: string;
  description: string;
  image: ImageAsset;
  actions: { label: string; url: string | null; external?: boolean }[];
};

export type Partner = {
  name: string;
  logo: ImageAsset;
  collaboration: string;
  url?: string;
};

export type Film = {
  title: string;
  family: ProjectFamilySlug;
  year?: number;
  description?: string;
  youtubeUrl: string | null;
  poster: ImageAsset;
};

export type TeamMember = {
  name: string;
  role: string;
  group: "leadership" | "department";
  department?: string;
  bio?: string;
  photo: ImageAsset;
  links?: { label: string; url: string }[];
};

export type Statements = {
  /** Approved wording only. `null` = awaiting the Founder. */
  vision: string | null;
  mission: string | null;
  tagline: string | null;
  motto: string | null;
  values: { name: string; text?: string }[];
};

export type LegalEntity = {
  name: string;
  registeredName: string | null;
  registrationNumber: string | null;
  role: string;
};
