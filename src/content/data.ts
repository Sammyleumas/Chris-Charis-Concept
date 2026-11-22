import { aboutShort as aboutShortText, linkRegister, site } from "@/config/site";
import { galleryFor, hhcp1Gallery, hhcpGallery, fusionGallery, images } from "./images";
import type {
  ProjectFamilySlug,
  FeaturedInitiative,
  HeroSlide,
  Post,
  PressAsset,
  Film,
  LegalEntity,
  Statements,
  TeamMember,
  ImpactStat,
  ImpactStory,
  Report,
  Organisation,
  Partner,
  PathwayStage,
  ProjectFamily,
  TimelineEntry,
} from "./types";

/*
 * Local content layer: verified content from the CTO build brief (Oct 2026)
 * and the Founder's master specification. Nothing here is invented: where
 * the brief has no value, the field is null or the list is empty.
 */

export const projectFamilies: ProjectFamily[] = [
  {
    slug: "film-for-social-change",
    name: "Film for Social Change",
    shortName: "Film for Social Change",
    year: 2020,
    line: "Film and storytelling that educate, raise awareness and advocate for change.",
    intro:
      "Film for Social Change uses filmmaking and storytelling to promote education, public awareness, advocacy and social change. It is where the Chris Charis Concept story began in August 2020.",
    accent: null,
    image: images.ffsc,
    items: [
      { name: "Shun Electoral Violence" },
      { name: "D’impact Campaign" },
      { name: "Hope Alive", summary: "A short film on gender-based violence.", poster: images.hopeAlivePoster },
      { name: "Blur" },
      { name: "Treepz Stage Drama" },
      { name: "FreeDumb" },
      { name: "Stop Human Trafficking" },
    ],
    externalLinks: [{ label: "Watch on YouTube", url: linkRegister.youtubeChannel }],
    related: ["healthy-heart", "fusion"],
    results: [{ value: "6", label: "Films produced", source: "Chris Charis Concept M&E records, October 2026" }],
    gallery: galleryFor("Film for Social Change", ["on set", "behind the camera", "screening audience", "cast and crew"]),
    cta: {
      title: "Tell a story with us.",
      text: "Partner on our next film, or help the films we have made reach more people.",
      actions: [
        { label: "Watch on YouTube", url: linkRegister.youtubeChannel, external: true },
        { label: "Partner on a film", url: "/get-involved/partner" },
        { label: "Volunteer on set", url: "/get-involved/volunteer" },
      ],
    },
  },
  {
    slug: "healthy-heart",
    name: "Healthy Heart Community Project",
    shortName: "Healthy Heart",
    year: 2021,
    line: "Our flagship community development programme for health and well-being.",
    intro:
      "The Healthy Heart Community Project (HHCP) is Chris Charis Concept’s flagship community development programme. Its editions, the Mental Health Awareness Campaign and Well-being Socials take health and well-being conversations into communities.",
    accent: null,
    image: images.hhcp,
    items: [
      { name: "HHCP 1.0" },
      { name: "HHCP 2.0" },
      { name: "HHCP 3.0" },
      { name: "HHCP 4.0" },
      { name: "MHAC 1.0", summary: "Mental Health Awareness Campaign" },
      { name: "MHAC 2.0", summary: "Mental Health Awareness Campaign" },
      {
        name: "NAHCON 2021",
        date: "May 2021",
        summary:
          "Took part in the inaugural National Arts in Health Conference, later running a Young Leaders in Arts and Health activation in Benin.",
      },
      { name: "Well-being Socials", date: "2025" },
    ],
    externalLinks: [{ label: "HHCP website", url: linkRegister.hhcpWebsite }],
    related: ["film-for-social-change", "learn-to-lead"],
    results: [{ value: "4", label: "HHCP editions completed", source: "Chris Charis Concept M&E records, October 2026" }],
    gallery: [...hhcp1Gallery, ...hhcpGallery],
    cta: {
      title: "Bring Healthy Heart to your community.",
      text: "Volunteer at an outreach or sponsor the next edition.",
      actions: [
        { label: "Sponsor an edition", url: "/get-involved/partner" },
        { label: "Volunteer", url: "/get-involved/volunteer" },
        { label: "HHCP website", url: linkRegister.hhcpWebsite, external: true },
      ],
    },
  },
  {
    slug: "learn-to-lead",
    name: "Learn To Lead → SOUL",
    shortName: "Learn To Lead",
    year: 2021,
    line: "Leadership development for young people, growing into the School of Ultimate Leadership.",
    intro:
      "Learn To Lead builds leadership and personal development in young people. Two editions laid the foundation for SOUL, the School of Ultimate Leadership, and its seven faculties.",
    accent: null,
    image: images.learnToLead,
    items: [
      { name: "Learn To Lead 1.0" },
      { name: "Learn To Lead 2.0" },
      { name: "SOUL", summary: "School of Ultimate Leadership, with seven faculties", href: "/organisations/soul" },
    ],
    externalLinks: [{ label: "SOUL website", url: linkRegister.soulWebsite }],
    related: ["healthy-heart", "fusion"],
    results: [],
    gallery: galleryFor("Learn To Lead and SOUL", ["Learn To Lead 1.0", "Learn To Lead 2.0", "SOUL session", "graduates"]),
    cta: {
      title: "Grow the next generation of leaders.",
      text: "Facilitate a SOUL faculty or partner on a leadership programme.",
      actions: [
        { label: "Become a facilitator", url: "/get-involved/careers" },
        { label: "Partner with us", url: "/get-involved/partner" },
        { label: "SOUL website", url: linkRegister.soulWebsite, external: true },
      ],
    },
  },
  {
    slug: "fusion",
    name: "Fusion Creative Project",
    shortName: "Fusion",
    year: 2024,
    line: "Where art meets technology: bootcamps, training, enterprise and awards for young creatives.",
    intro:
      "The Fusion Creative Project brings young creatives and technologists together. It spans the Fusion: Art Meets Tech bootcamp, Fusion Connect Academy, Fusion Solutions Hub, school and Africa tours, and the Fusion Art and Tech Awards.",
    accent: null,
    image: images.fusion,
    items: [
      { name: "Fusion: Art Meets Tech", date: "26–28 Nov 2026", group: "Programmes", summary: "The bootcamp bringing creatives and technologists together.", href: "/our-work/fusion/2026" },
      { name: "FUSION 1.0", group: "Editions" },
      { name: "FUSION 2.0", group: "Editions" },
      { name: "FUSION 3.0", group: "Editions" },
      { name: "School Tour", group: "Programmes" },
      { name: "Africa Tour", group: "Programmes" },
      { name: "Fusion Art and Tech Awards", group: "Programmes" },
      { name: "Fusion Connect Academy", group: "Enterprises", summary: "Creative and technology education.", href: "/organisations/fusion-connect-academy" },
      { name: "Fusion Solutions Hub", group: "Enterprises", summary: "Innovative, sustainable solutions for individuals and businesses.", href: "/organisations/fusion-solutions-hub" },
    ],
    externalLinks: [
      { label: "Bootcamp website", url: linkRegister.fusionBootcamp },
      { label: "Fusion Connect Academy", url: linkRegister.fusionConnectAcademy },
    ],
    related: ["learn-to-lead", "chris-charis-brand"],
    results: [],
    gallery: fusionGallery,
    cta: {
      title: "Be part of Fusion 2026.",
      text: "Fusion: Art Meets Tech runs 26–28 November 2026. Apply to take part or sponsor young talent.",
      actions: [
        { label: "Apply", url: linkRegister.fusionBootcamp, external: true },
        { label: "Sponsor Fusion", url: "/get-involved/partner?interest=fusion" },
        { label: "About Fusion Solutions Hub", url: "/organisations/fusion-solutions-hub" },
      ],
    },
  },
  {
    slug: "chris-charis-brand",
    name: "The Chris Charis Brand",
    shortName: "Chris Charis Brand",
    year: 2025,
    line: "Founder-led content and community: the MayBe Challenge, the Community and the Book Project.",
    intro:
      "The Chris Charis Brand carries the founder’s voice into content and community, through the MayBe Challenge, the Chris Charis Community and the Book Project.",
    accent: null,
    image: images.brand,
    items: [{ name: "MayBe Challenge" }, { name: "Chris Charis Community" }, { name: "Book Project" }],
    externalLinks: [{ label: "MayBe Challenge on TikTok", url: linkRegister.maybeChallengeTiktok }],
    related: ["fusion", "film-for-social-change"],
    results: [],
    gallery: galleryFor("Chris Charis Brand", ["MayBe Challenge", "community meet-up", "Book Project", "content shoot"]),
    cta: {
      title: "Join the conversation.",
      text: "Take part in the MayBe Challenge or join the Chris Charis Community.",
      actions: [
        { label: "MayBe Challenge on TikTok", url: linkRegister.maybeChallengeTiktok, external: true },
        { label: "Get in touch", url: "/contact" },
      ],
    },
  },
];

export const impactStats: ImpactStat[] = [
  {
    id: "projects",
    value: 26,
    display: "26",
    label: "Projects since 2020",
    detail: "Across five project families",
    href: "/our-work",
    source: "Chris Charis Concept M&E records",
    asOf: "October 2026",
  },
  {
    id: "films",
    value: 6,
    display: "6",
    label: "Films",
    detail: "Film for Social Change",
    href: "/our-work/film-for-social-change",
    source: "Chris Charis Concept M&E records",
    asOf: "October 2026",
  },
  {
    id: "hhcp",
    value: 4,
    display: "4",
    label: "HHCP editions",
    detail: "Healthy Heart Community Project",
    href: "/our-work/healthy-heart",
    source: "Chris Charis Concept M&E records",
    asOf: "October 2026",
  },
  {
    id: "young-people",
    value: 1200,
    display: "1,200+",
    label: "Young people reached",
    detail: "Across our programmes",
    href: "/impact",
    source: "Chris Charis Concept M&E records",
    asOf: "October 2026",
  },
  {
    id: "dakar",
    value: null,
    display: "Dakar",
    label: "2025 delegation",
    detail: "Delegation to Dakar, 2025",
    href: "/impact#dakar-2025",
    source: "Chris Charis Concept M&E records",
    asOf: "October 2026",
  },
];

export const pathway: PathwayStage[] = [
  {
    key: "tell",
    title: "Tell",
    text: "Film and storytelling start conversations, educate and raise awareness.",
    href: "/our-work/film-for-social-change",
    linkLabel: "Film for Social Change",
  },
  {
    key: "reach",
    title: "Reach",
    text: "Community outreach and social impact programmes connect with people where they are.",
    href: "/our-work/healthy-heart",
    linkLabel: "Healthy Heart Community Project",
  },
  {
    key: "build",
    title: "Build",
    text: "Education, training, mentorship and skills development build lasting capacity.",
    href: "/our-work/learn-to-lead",
    linkLabel: "Learn To Lead → SOUL",
  },
  {
    key: "earn",
    title: "Earn & Lead",
    text: "Fusion Connect Academy and Fusion Solutions Hub turn skills into income and opportunity.",
    href: "/our-work/fusion",
    linkLabel: "Fusion Creative Project",
  },
];

export const timeline: TimelineEntry[] = [
  {
    date: "August 2020",
    year: 2020,
    title: "Chris Charis Concept begins with Film for Social Change",
    text: "Advocacy films become the first tool for starting conversations in our communities.",
    href: "/our-work/film-for-social-change",
  },
  {
    date: "2021",
    year: 2021,
    title: "Healthy Heart Community Project launches",
    text: "The flagship community development programme takes health and well-being into communities.",
    href: "/our-work/healthy-heart",
  },
  {
    date: "May 2021",
    year: 2021,
    title: "NAHCON 2021",
    text: "Chris Charis Concept takes part in the inaugural National Arts in Health Conference.",
    href: "/our-work/healthy-heart",
  },
  {
    date: "2021",
    year: 2021,
    title: "Learn To Lead",
    text: "Leadership development for young people begins, later growing into SOUL.",
    href: "/our-work/learn-to-lead",
  },
  {
    date: "2024",
    year: 2024,
    title: "Fusion Creative Project",
    text: "Art meets technology: bootcamps, training and enterprise for young creatives.",
    href: "/our-work/fusion",
  },
  {
    date: "2025",
    year: 2025,
    title: "The Chris Charis Brand, Well-being Socials and Dakar",
    text: "The brand launches its community projects, and a delegation travels to Dakar.",
    href: "/our-work/chris-charis-brand",
  },
  {
    date: "26–28 November 2026",
    year: 2026,
    title: "Fusion: Art Meets Tech",
    text: "Three days bringing young creatives and technologists together.",
    href: "/our-work/fusion/2026",
  },
];

export const organisations: Organisation[] = [
  {
    slug: "social-enterprise",
    name: "The Social Enterprise",
    registeredName: site.legalName,
    registrationNumber: site.registrationNumber,
    line: "The registered not-for-profit at the centre of everything we do.",
    description: aboutShortText,
    image: images.orgSocialEnterprise,
    website: null,
    relationship: "The parent organisation. Every project and arm carries the line “a Chris Charis Concept initiative”.",
    relatedFamilies: ["film-for-social-change", "healthy-heart", "learn-to-lead", "fusion", "chris-charis-brand"],
    offerings: {
      title: "Objects",
      items: [
        "Audiovisual and digital content for education, public enlightenment, advocacy and cultural development",
        "Training, workshops, mentorship and skills acquisition in creative arts, media and digital technology",
        "Creative and technology hubs, learning platforms and community-based programmes",
      ],
      pendingNote: "",
    },
    enquiry: {
      title: "Work with the social enterprise.",
      text: "We work with governments, NGOs, educational institutions, private organisations, development partners and donor agencies.",
      actions: [
        { label: "Partner with us", url: "/get-involved/partner" },
        { label: "Contact us", url: "/contact" },
      ],
    },
  },
  {
    slug: "fusion-connect-academy",
    name: "Fusion Connect Academy",
    registeredName: null,
    registrationNumber: null,
    line: "Creative and technology education that turns talent into skill.",
    description: null,
    image: images.orgFca,
    website: linkRegister.fusionConnectAcademy,
    relationship: "Born from the Fusion Creative Project. With Fusion Solutions Hub, it forms the “Earn & Lead” stage of our pathway.",
    relatedFamilies: ["fusion"],
    offerings: {
      title: "Programmes and courses",
      items: [],
      pendingNote: "Approved programmes, courses, schedules and enrolment details. No courses, fees or certificates are shown until supplied.",
    },
    enquiry: {
      title: "Learn with Fusion Connect Academy.",
      text: "Ask about upcoming programmes and how to enrol.",
      actions: [
        { label: "Visit the Academy website", url: linkRegister.fusionConnectAcademy, external: true },
        { label: "Ask about enrolment", url: "/contact" },
      ],
    },
  },
  {
    slug: "fusion-solutions-hub",
    name: "Fusion Solutions Hub",
    registeredName: null,
    registrationNumber: null,
    line: "Innovative, sustainable solutions for individuals and businesses.",
    description:
      "At FUSION Solution Hub, we empower individuals and businesses to thrive in an ever-evolving world by providing innovative, sustainable solutions to complex problems. Our multifaceted enterprise brings together experts from diverse fields to deliver exceptional services that drive growth, efficiency, and success.",
    image: images.orgFsh,
    website: null,
    relationship: "Born from the Fusion Creative Project. With Fusion Connect Academy, it forms the “Earn & Lead” stage of our pathway.",
    relatedFamilies: ["fusion"],
    offerings: {
      title: "Services",
      items: [],
      pendingNote: "The approved Fusion Solutions Hub services list, vision and mission from the company profile.",
    },
    enquiry: {
      title: "Request a quote.",
      text: "Tell us about your project and the Fusion Solutions Hub team will get back to you.",
      // The quote form on the page itself is the enquiry route.
      actions: [],
    },
  },
  {
    slug: "chris-charis-brand",
    name: "The Chris Charis Brand",
    registeredName: null,
    registrationNumber: null,
    line: "Founder-led media and community, creating content with purpose.",
    description: null,
    image: images.brand,
    website: null,
    relationship: "The founder-led brand of the Chris Charis Concept family, launched in 2025.",
    relatedFamilies: ["chris-charis-brand"],
    offerings: {
      title: "Projects",
      items: ["MayBe Challenge", "Chris Charis Community", "Book Project"],
      pendingNote: "Purpose statement for the Chris Charis Brand and descriptions of its projects.",
    },
    enquiry: {
      title: "Collaborate with the brand.",
      text: "For content collaborations and community enquiries, get in touch.",
      actions: [
        { label: "MayBe Challenge on TikTok", url: linkRegister.maybeChallengeTiktok, external: true },
        { label: "Contact us", url: "/contact" },
      ],
    },
  },
  {
    slug: "soul",
    name: "SOUL",
    registeredName: null,
    registrationNumber: null,
    line: "The School of Ultimate Leadership and its seven faculties.",
    description: null,
    image: images.orgSoul,
    website: linkRegister.soulWebsite,
    relationship: "Grew out of Learn To Lead (2021), our leadership development programme for young people.",
    relatedFamilies: ["learn-to-lead"],
    offerings: {
      title: "The seven faculties",
      items: [],
      pendingNote: "Names and short descriptions of SOUL’s seven faculties.",
    },
    enquiry: {
      title: "Lead with SOUL.",
      text: "Join a SOUL programme or facilitate a faculty.",
      actions: [
        { label: "SOUL website", url: linkRegister.soulWebsite, external: true },
        { label: "Become a facilitator", url: "/get-involved/careers" },
      ],
    },
  },
];

/** Homepage feature slot (brief §5.1). CMS-editable in Phase 11. */
export const featuredInitiative: FeaturedInitiative = {
  eyebrow: "Featured now",
  title: "Fusion: Art Meets Tech",
  dateLabel: "26–28 November 2026",
  startDate: "2026-11-26",
  endDate: "2026-11-28",
  description:
    "Three days where young creatives and technologists learn, build and showcase together. Apply to take part, vote for your favourites, or sponsor the next generation of talent.",
  image: images.fusionFeature,
  actions: [
    { label: "Apply", url: linkRegister.fusionBootcamp, external: true },
    { label: "Vote", url: linkRegister.fusionVote, external: true },
    { label: "Sponsor", url: "/get-involved/partner?interest=fusion" },
  ],
};

/** Approved partners only. Empty until logos and permissions are supplied. */
export const partners: Partner[] = [];

export const films: Film[] = [
  {
    title: "Latest from Film for Social Change",
    family: "film-for-social-change",
    description:
      "Our films start conversations about the issues that shape communities, from electoral violence to human trafficking.",
    youtubeUrl: null,
    poster: images.latestFilm,
  },
];

/**
 * Homepage hero (brief §5.1: 20-second muted loop from a project).
 * `videoSrc` must be an approved, externally hosted, optimised MP4/WebM
 * (e.g. a Cloudinary delivery URL). Until supplied, the poster is shown.
 */
export const heroMedia = {
  videoSrc: (process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? null) as string | null,
  poster: images.heroPoster,
};

/**
 * Vision, mission, tagline, motto and values (brief §5.2). The brief marks
 * these "Ready" but the wording is not in the document. Do not write them.
 */
export const statements: Statements = {
  vision: null,
  mission: null,
  tagline: null,
  motto: null,
  values: [],
};

/** Team: published only with photos, bios and consent (COO to collect). */
export const team: TeamMember[] = [];

/** Legal & Governance (brief §5.2). Numbers must match CAC records exactly. */
export const legalEntities: LegalEntity[] = [
  {
    name: "Chris Charis Concept",
    registeredName: site.legalName,
    registrationNumber: site.registrationNumber,
    role: "Parent not-for-profit social enterprise (company limited by guarantee). “Chris Charis Concept” is its trading name.",
  },
  {
    name: "Fusion Connect Academy",
    registeredName: null,
    registrationNumber: null,
    role: "Creative and technology education arm.",
  },
];

/** Beneficiary stories. Only `consent: "granted"` entries are published. */
export const impactStories: ImpactStory[] = [];

/** Annual reports. The FY2026/27 report is added once published. */
export const reports: Report[] = [];

/** News and blog posts. CMS-managed from Phase 11. */
export const posts: Post[] = [];

/** Press kit downloads (brief §5.6). Files are added as they are approved. */
export const pressAssets: PressAsset[] = [
  { label: "Logo pack", description: "Full-colour logo, versions for dark backgrounds, horizontal lockup and symbol (PNG). Vector files on request.", fileUrl: "/brand/chris-charis-logo-pack.zip", format: "ZIP" },
  { label: "Founder biography", description: "Approved biography and portrait of the founder.", fileUrl: null, format: "PDF" },
  { label: "Approved photographs", description: "High-resolution project photos cleared for press use, with credits.", fileUrl: null, format: "ZIP" },
  { label: "Organisation fact sheet", description: "One-page summary of who we are, our projects and our impact.", fileUrl: null, format: "PDF" },
];

/**
 * Hero slideshow (approved mock-up: six slides). Default: the hero photo
 * plus one image per project family. Replaced by Site settings → Hero
 * slides in the CMS when set.
 */
/** Headline lines for each project's hero slide, taken from its name. */
const heroTitles: Record<ProjectFamilySlug, [string, string]> = {
  "film-for-social-change": ["Film for", "Social Change"],
  "healthy-heart": ["Healthy Heart", "Community Project"],
  "learn-to-lead": ["Learn To Lead", "School of Ultimate Leadership"],
  fusion: ["Fusion", "Creative Project"],
  "chris-charis-brand": ["The Chris Charis", "Brand"],
};

/**
 * Homepage hero slides. The first carries the organisation's headline;
 * each project slide swaps the hero copy for that project's name, one-line
 * summary and link while its photo is showing.
 */
export const heroSlides: HeroSlide[] = [
  {
    image: images.heroPoster,
    label: "Chris Charis Concept",
    href: "/about",
    eyebrow: "Chris Charis Concept · Benin City, Nigeria",
    title: ["Transforming Communities", "Through Creative Expressions"],
    text: "Creativity, technology and community development working together to create lasting impact.",
    cta: { label: "Explore Our Work", href: "/our-work" },
  },
  ...projectFamilies.map((f) => ({
    image: f.image,
    label: `${f.name} · ${f.year}`,
    href: `/our-work/${f.slug}`,
    eyebrow: `Our Work · Since ${f.year}`,
    title: heroTitles[f.slug],
    text: f.line,
    cta: { label: `Explore ${f.shortName}`, href: `/our-work/${f.slug}` },
  })),
];
