export type NavItem = {
  label: string;
  href: string;
  /** Shows the Our Work mega-menu. */
  mega?: boolean;
  children?: { label: string; href: string }[];
};

export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about" },
      { label: "Our Story", href: "/about/story" },
      { label: "Vision, Mission & Values", href: "/about/vision" },
      { label: "Team", href: "/about/team" },
      { label: "Partners", href: "/about/partners" },
      { label: "Legal & Governance", href: "/about/governance" },
    ],
  },
  { label: "Our Work", href: "/our-work", mega: true },
  {
    label: "Our Organisations",
    href: "/organisations",
    children: [
      { label: "The Social Enterprise", href: "/organisations/social-enterprise" },
      { label: "Fusion Connect Academy", href: "/organisations/fusion-connect-academy" },
      { label: "Fusion Solutions Hub", href: "/organisations/fusion-solutions-hub" },
      { label: "The Chris Charis Brand", href: "/organisations/chris-charis-brand" },
      { label: "SOUL", href: "/organisations/soul" },
    ],
  },
  {
    label: "Impact",
    href: "/impact",
    children: [
      { label: "Impact Overview", href: "/impact" },
      { label: "Stories", href: "/impact/stories" },
      { label: "Annual Reports", href: "/impact/reports" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Films", href: "/media/films" },
      { label: "Gallery", href: "/media/gallery" },
      { label: "News & Blog", href: "/news" },
      { label: "Press Kit", href: "/media/press" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Volunteer", href: "/get-involved/volunteer" },
      { label: "Partner & Sponsor", href: "/get-involved/partner" },
      { label: "Careers & Facilitators", href: "/get-involved/careers" },
      { label: "Donate", href: "/donate" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Safeguarding", href: "/safeguarding" },
  { label: "Cookie Notice", href: "/cookies" },
];
