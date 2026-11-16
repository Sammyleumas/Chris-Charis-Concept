import { linkRegister } from "@/config/site";
import { images } from "./images";
import type { ImageAsset } from "./types";

export type EventSession = { time?: string; title: string; detail?: string; speaker?: string };
export type EventDay = { date: string; label: string; sessions: EventSession[] };
export type EventPerson = { name: string; role: string; photo: ImageAsset; bio?: string };

export type FusionEvent = {
  slug: string;
  title: string;
  edition: string;
  /** ISO date-times with Lagos offset (WAT, UTC+1). */
  startsAt: string;
  endsAt: string;
  dateLabel: string;
  /** Venue and city: `null` until confirmed. Never guessed. */
  venue: string | null;
  city: string | null;
  summary: string;
  hero: ImageAsset;
  applyUrl: string | null;
  voteUrl: string | null;
  sponsorUrl: string;
  /** One entry per day; sessions stay empty until the programme is announced. */
  days: EventDay[];
  speakers: EventPerson[];
  sponsors: { name: string; logo: ImageAsset; url?: string }[];
  faqs: { q: string; a: string }[];
};

/**
 * Fusion: Art Meets Tech 2026 (brief §5.1 and §5.4). Only verified facts;
 * everything else is an empty slot to be filled in the CMS.
 */
export const fusion2026: FusionEvent = {
  slug: "2026",
  title: "Fusion: Art Meets Tech",
  edition: "2026",
  startsAt: "2026-11-26T00:00:00+01:00",
  endsAt: "2026-11-28T23:59:59+01:00",
  dateLabel: "26–28 November 2026",
  venue: null,
  city: null,
  summary:
    "Three days where young creatives and technologists learn, build and showcase together. Fusion: Art Meets Tech is the bootcamp of the Fusion Creative Project, a Chris Charis Concept initiative.",
  hero: images.fusionFeature,
  applyUrl: linkRegister.fusionBootcamp,
  voteUrl: linkRegister.fusionVote,
  sponsorUrl: "/get-involved/partner?interest=fusion",
  days: [
    { date: "2026-11-26", label: "Day 1 · Thursday 26 November", sessions: [] },
    { date: "2026-11-27", label: "Day 2 · Friday 27 November", sessions: [] },
    { date: "2026-11-28", label: "Day 3 · Saturday 28 November", sessions: [] },
  ],
  speakers: [],
  sponsors: [],
  faqs: [
    { q: "When is Fusion: Art Meets Tech 2026?", a: "Thursday 26 to Saturday 28 November 2026." },
    { q: "How do I apply?", a: "Use the Apply button on this page, which takes you to the bootcamp’s application page." },
    { q: "Can my organisation sponsor or support Fusion?", a: "Yes. Use the Sponsor button to send a partnership enquiry and our team will reply with options." },
    { q: "Can I volunteer at the event?", a: "Yes. Send a volunteer application and mention Fusion in your message." },
    { q: "Where will it take place?", a: "The venue will be announced on this page. Add the event to your calendar and check back for details." },
  ],
};
