import type { ImageAsset } from "./types";

/**
 * Image inventory. Every photograph on the site is registered here.
 *
 * `src: null` means the organisation has not yet supplied the photo, and
 * <Photo /> renders a labelled frame describing what is needed. To add a
 * photo: place the file in /public/images/<folder>/ and set `src`, `width`
 * and `height`. Only use photographs with participant consent (NDPA 2023).
 */
const pending = (alt: string, brief: string, focus?: string): ImageAsset => ({
  src: null,
  alt,
  brief,
  focus,
});

export const images = {
  heroPoster: pending(
    "Young creatives at work on a Chris Charis Concept project",
    "Hero poster: a frame from the 20-second hero video (filmmaking or workshop)",
  ),
  whoWeAre: pending(
    "Chris Charis Concept team members with participants at a community programme",
    "Team with participants at a programme, natural light",
  ),
  ffsc: pending(
    "Film crew on set during a Film for Social Change production",
    "Film for Social Change: on set, camera and crew",
  ),
  hhcp: pending(
    "Community members at a Healthy Heart Community Project outreach",
    "HHCP outreach: health screening or community session",
  ),
  learnToLead: pending(
    "Young leaders in a Learn To Lead session",
    "Learn To Lead or SOUL: facilitator with young leaders",
  ),
  fusion: pending(
    "Participants at Fusion: Art Meets Tech",
    "Fusion: Art Meets Tech: creatives and technologists at work",
  ),
  brand: pending(
    "Chris Charis Brand content production",
    "Chris Charis Brand: MayBe Challenge or community moment",
  ),
  fusionFeature: pending(
    "Fusion: Art Meets Tech 2026 event visual",
    "Fusion: Art Meets Tech 2026: official event visual or past edition photo",
  ),
  latestFilm: pending(
    "Still from the latest Film for Social Change release",
    "Still from the latest film (YouTube thumbnail works)",
  ),
  getInvolved: pending(
    "Volunteers working together at a Chris Charis Concept event",
    "Volunteers at an event, hands-on",
  ),
  orgSocialEnterprise: pending(
    "Chris Charis Concept at work in Benin City",
    "The social enterprise: team or hub in Benin City",
  ),
  orgFca: pending(
    "Learners at Fusion Connect Academy",
    "Fusion Connect Academy: class or training session",
  ),
  orgFsh: pending(
    "The Fusion Solutions Hub team",
    "Fusion Solutions Hub: team or client work",
  ),
  orgSoul: pending(
    "School of Ultimate Leadership session",
    "SOUL: leadership session",
  ),
  aboutHero: pending(
    "Filmmaker operating a camera on a Chris Charis Concept set",
    "About hero: documentary shot of the team at work (filmmaking)",
  ),
  aboutWho: pending(
    "Chris Charis Concept team members together",
    "Who We Are: team group photo, relaxed and authentic",
  ),
  storyHero: pending(
    "Archive moment from an early Chris Charis Concept project",
    "Our Story hero: an early project photo (2020–2021)",
  ),
  mediaHero: pending(
    "Filmmaker behind a camera at golden hour",
    "Media hero: cinematographer silhouette or film set",
  ),
  impactHero: pending(
    "Young person smiling at a Chris Charis Concept programme",
    "Impact hero: a participant at a programme (with consent)",
  ),
  governanceHero: pending(
    "Chris Charis Concept team meeting",
    "Governance hero: team or board meeting",
  ),
} satisfies Record<string, ImageAsset>;

/** Pending photo slots for a project gallery, one per subject. */
export function galleryFor(project: string, subjects: string[]): ImageAsset[] {
  return subjects.map((subject) =>
    pending(`${project}: ${subject}`, `${project} gallery: ${subject}`),
  );
}
