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
  ffsc: {
    src: "/images/ffsc/shun-electoral-violence/filming-the-crowd-scene.jpg",
    alt: "A camera operator films a crowd scene outside a building during the Shun Electoral Violence shoot",
    brief: "On set: Shun Electoral Violence",
    width: 2400,
    height: 1796,
    focus: "45% 50%",
  },
  hhcp: {
    src: "/images/hhcp/1.0/team-line-up.jpg",
    alt: "Healthy Heart volunteers, paramedics and health workers at HHCP 1.0, standing in a line outside a community building",
    brief: "The HHCP 1.0 team",
    width: 2400,
    height: 1271,
    focus: "50% 45%",
  },
  learnToLead: {
    src: "/images/learn-to-lead/yali-learns/team-in-learn-to-lead-shirts.jpg",
    alt: "Seven team members in black Learn To Lead T-shirts smiling together at the YALI Learns session",
    brief: "The Learn To Lead team",
    width: 2400,
    height: 1800,
    focus: "50% 35%",
  },
  fusion: {
    src: "/images/fusion/group-with-artworks.jpg",
    alt: "Fusion participants and organisers gathered on stage behind a display of their paintings, drawings and portraits",
    brief: "Participants with their artworks",
    width: 2400,
    height: 1800,
    focus: "50% 72%",
  },
  brand: pending(
    "Chris Charis Brand content production",
    "Chris Charis Brand: MayBe Challenge or community moment",
  ),
  fusionFeature: {
    src: "/images/fusion/live-portrait-sketch.jpg",
    alt: "An artist sketches a live pencil portrait of a seated participant while the audience watches, at a past Fusion event",
    brief: "Live portrait sketching at a past Fusion event",
    width: 2400,
    height: 1800,
    focus: "55% 50%",
  },
  hopeAlivePoster: {
    src: "/images/films/hope-alive-poster.jpg",
    alt: "Hope Alive film cover: a woman lies in a hospital bed with a bandaged head and an oxygen tube. A short film on gender-based violence. A Chris Charis Concept",
    brief: "Hope Alive: film cover",
    width: 1080,
    height: 1080,
    focus: "30% 0%",
  },
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
  contactHero: pending(
    "Chris Charis Concept team member on a phone call",
    "Contact hero: team member welcoming visitors or on a call",
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

/** Supplied photo with its intrinsic size. */
const photo = (file: string, w: number, h: number, alt: string, brief: string, focus?: string): ImageAsset => ({
  src: `/images/${file}`,
  alt,
  brief,
  width: w,
  height: h,
  focus,
});

/**
 * Healthy Heart Community Project session, August 2025 (supplied by the
 * organisation). Order matters: the first photo is shown large.
 */
export const hhcpGallery: ImageAsset[] = [
  photo("hhcp/group-with-paintings.jpg", 2400, 1800, "Participants and facilitators of a Healthy Heart Community Project session smiling and holding up their sunflower paintings", "Participants with their paintings", "50% 45%"),
  photo("hhcp/group-with-paintings-close.jpg", 2400, 1800, "Group of young participants and facilitators holding up the sunflower paintings they made", "Showing the finished paintings", "50% 40%"),
  photo("hhcp/painting-session.jpg", 2400, 1800, "Participants painting at a table covered with paper, paint palettes and cups of water", "The painting session"),
  photo("hhcp/participant-with-painting.jpg", 1800, 2400, "A smiling participant holding up her painting of three sunflowers signed Victory", "Victory’s painting", "50% 30%"),
  photo("hhcp/facilitators-with-painting.jpg", 1800, 2400, "Three smiling session leaders holding up a participant’s sunflower painting", "Celebrating the work", "50% 35%"),
  photo("hhcp/speakers-at-the-table.jpg", 2400, 1800, "Two speakers seated at a table in front of a banner during the conversation", "Opening conversation", "60% 40%"),
  photo("hhcp/panel-conversation.jpg", 2400, 1800, "A speaker holding a microphone talks while another participant listens beside a podcast microphone", "Panel conversation", "40% 40%"),
  photo("hhcp/speaker-at-the-microphone.jpg", 1800, 2400, "A speaker in a maroon outfit talking into a studio microphone", "Speaking at the microphone", "50% 35%"),
  photo("hhcp/group-discussion.jpg", 2400, 1800, "Participants seated around a table taking part in a group discussion", "Group discussion"),
  photo("hhcp/group-discussion-office.jpg", 1800, 2400, "Participants working together on sheets of paper around a table", "Working in groups", "50% 55%"),
  photo("hhcp/painting-table-conversation.jpg", 2400, 1800, "Participants at the painting table, one turning to look at the camera", "At the painting table", "35% 45%"),
  photo("hhcp/participants-smiling.jpg", 1800, 2400, "Two participants smiling during the session", "Moments of joy", "50% 45%"),
  photo("hhcp/participant-listening.jpg", 1800, 2400, "A participant listening attentively at the table", "Listening in", "50% 40%"),
  photo("hhcp/participant-portrait.jpg", 1800, 2400, "Portrait of a participant seated at the table during the session", "Taking part", "50% 40%"),
];

/**
 * Fusion Creative Project events (supplied by the organisation). The first
 * photo is shown large. A registration-desk photo was left out because it
 * shows a person's bank details.
 */
export const fusionGallery: ImageAsset[] = [
  photo("fusion/group-with-artworks.jpg", 2400, 1800, "Fusion participants and organisers gathered on stage behind a display of their paintings, drawings and portraits", "Showcasing the work", "50% 72%"),
  photo("fusion/artist-with-sitter.jpg", 1500, 2000, "An artist and a participant smile beside the finished pencil portrait of her", "The finished portrait", "50% 45%"),
  photo("fusion/artist-at-the-easel.jpg", 1500, 2000, "An artist at an easel begins a pencil portrait", "At the easel", "50% 55%"),
  photo("fusion/live-portrait-sketch.jpg", 2400, 1800, "An artist sketches a live pencil portrait of a seated participant while the audience watches", "Live portrait sketching", "55% 50%"),
  photo("fusion/presenting-a-portrait.jpg", 1500, 2000, "A host with a microphone presents a framed portrait to the audience", "Presenting the art", "45% 40%"),
  photo("fusion/performance.jpg", 1398, 1864, "A performer in a red dress sings into a microphone", "Performance", "40% 40%"),
  photo("fusion/addressing-the-audience.jpg", 1500, 2000, "A speaker in a red dress addresses seated guests, with artworks on the walls", "Addressing the audience", "50% 50%"),
  photo("fusion/audience.jpg", 1500, 2000, "Guests seated in rows during the programme", "In the audience", "50% 55%"),
  photo("fusion/conversation.jpg", 1391, 1854, "Two guests in conversation between sessions", "Between sessions", "45% 50%"),
  photo("fusion/participants-with-painting.jpg", 1500, 2000, "Three participants holding a landscape painting", "A painting to take home", "50% 45%"),
  photo("fusion/panel-session.jpg", 1800, 1200, "A panellist and a tech facilitator seated in the audience, one working on a laptop", "Panel session", "55% 45%"),
  photo("fusion/delegates-listening.jpg", 1800, 1200, "Delegates listening closely during a session", "Delegates listening", "50% 35%"),
  photo("fusion/convener-and-delegate.jpg", 1800, 1200, "The convener and a delegate, wearing event badges, smile for the camera", "Convener and delegate", "50% 35%"),
  photo("fusion/portrait-black-and-white.jpg", 892, 1200, "Black-and-white portrait of a smiling participant in a Where Art Meets Tech T-shirt", "Portrait", "50% 35%"),
  photo("fusion/at-the-fusion-banner.jpg", 1800, 2400, "Two organisers stand either side of the FUSION banner, labelled A Chris Charis Concept", "At the Fusion banner", "50% 45%"),
  photo("fusion/team-at-the-banner.jpg", 1374, 1961, "Four team members in front of the event banner", "The team", "50% 50%"),
  photo("fusion/team-group.jpg", 2000, 1500, "Six team members smiling in front of the event banner", "The team together", "50% 45%"),
];

/** Healthy Heart Community Project 1.0 (supplied by the organisation, labelled HHCP 1.0). */
const hh1 = (file: string, w: number, h: number, alt: string, brief: string, focus?: string): ImageAsset => ({
  ...photo(`hhcp/1.0/${file}.jpg`, w, h, alt, brief, focus),
  group: "HHCP 1.0",
});
export const hhcp1Gallery: ImageAsset[] = [
  hh1("team-line-up", 2400, 1271, "Healthy Heart volunteers, paramedics and health workers standing in a line outside a community building", "The HHCP 1.0 team", "50% 45%"),
  hh1("blood-pressure-check", 2400, 1800, "A volunteer checks an elderly man's blood pressure under a canopy while team members look on", "Free blood pressure checks", "40% 50%"),
  hh1("interview-at-the-phc", 2400, 1800, "A volunteer in a Healthy Heart T-shirt is interviewed outside a primary health centre", "Talking heart health", "50% 35%"),
  hh1("volunteers-celebrating", 2400, 1089, "A large group of HHCP 1.0 volunteers smiling and posing together under a cloudy sky", "Volunteers together", "50% 45%"),
  hh1("paramedic-volunteers", 2400, 1800, "Two paramedics and a volunteer standing together at the outreach", "Paramedics on the team", "50% 35%"),
  hh1("blood-pressure-check-close", 2400, 1800, "Close view of a volunteer taking a blood pressure reading with a stethoscope and cuff", "Taking a reading", "55% 50%"),
  hh1("speaking-to-camera", 2400, 1800, "A volunteer in a Healthy Heart T-shirt speaks into a microphone outside a health centre", "Spreading the message", "45% 35%"),
  hh1("dancing-in-traditional-dress", 2400, 1800, "Two young women in wrapper outfits and coral beads laughing and dancing on the road", "Celebrating together", "55% 40%"),
  hh1("team-cheering", 2400, 1089, "Volunteers in lab coats and team T-shirts cheering in front of a community building", "The team cheering", "50% 40%"),
  hh1("volunteers-with-instruments", 2400, 1800, "Volunteers standing together, some holding beaded shekere instruments", "Music on the day", "50% 40%"),
];

/** Healthy Heart Community Project 2.0, 17 May 2022, The Household of Peace, Omosigho, Benin City (supplied by the organisation). */
const hh2 = (file: string, alt: string, brief: string, focus?: string): ImageAsset => ({
  ...photo(`hhcp/2.0/${file}.jpg`, 2400, 1800, alt, brief, focus),
  group: "HHCP 2.0",
});
export const hhcp2Gallery: ImageAsset[] = [
  hh2("team-on-stage", "The HHCP 2.0 team and hosts standing together on the stage under purple lights", "The HHCP 2.0 team", "50% 40%"),
  hh2("blood-pressure-checks", "A volunteer in a white coat checks a woman's blood pressure while others wait their turn", "Free blood pressure checks", "50% 50%"),
  hh2("audience-listening", "Community members seated in rows listening during the health seminar", "The health seminar", "50% 45%"),
  hh2("speaker-at-the-lectern", "A speaker addresses the gathering from a glass lectern", "Opening address", "45% 30%"),
  hh2("blood-pressure-reading", "A volunteer in a white coat takes a man's blood pressure with a stethoscope and cuff", "Taking a reading", "50% 40%"),
  hh2("organisers", "Four members of the organising team smiling outside the venue", "The organisers", "50% 30%"),
  hh2("health-seminar", "A young speaker in a waistcoat talks to the audience with a microphone", "Speaking to the community", "40% 35%"),
  hh2("blood-pressure-monitor", "A volunteer uses a digital monitor and cuff to check a woman's blood pressure", "Measure your blood pressure", "55% 45%"),
  hh2("audience-smiling", "Women in the audience smiling and laughing during the programme", "Moments of joy", "40% 45%"),
  hh2("team-at-the-banner", "The team standing in front of the HHCP 2.0 banner outside the church", "At the HHCP 2.0 banner", "50% 40%"),
  hh2("speaking-at-the-lectern", "A young speaker at the lectern during the prayer session", "Prayer session", "45% 30%"),
];

/** Shun Electoral Violence film shoot (Film for Social Change, supplied by the organisation). */
const sev = (file: string, alt: string, brief: string, focus?: string): ImageAsset => ({
  ...photo(`ffsc/shun-electoral-violence/${file}.jpg`, 2400, 1796, alt, brief, focus),
  group: "Shun Electoral Violence",
});
export const shunElectoralViolenceGallery: ImageAsset[] = [
  sev("filming-the-crowd-scene", "A camera operator films a crowd scene outside a green building", "Filming the crowd scene", "45% 50%"),
  sev("cast-and-crew", "Cast and crew smiling together outdoors, one crouching in front with a camera", "Cast and crew", "50% 40%"),
  sev("read-through", "Cast members seated on chairs in a hall going over the script", "Script read-through", "50% 45%"),
  sev("rehearsing-the-scene", "Cast members rehearse a scene outside the building", "Rehearsing the scene", "50% 45%"),
  sev("blocking-the-scene", "Cast and crew gathered on set working out the scene", "Blocking the scene", "50% 45%"),
  sev("on-location", "Cast members on location, seen from behind, waiting for the next take", "On location", "50% 45%"),
  sev("after-the-shoot", "Three members of the team smiling outside after the shoot", "After the shoot", "40% 35%"),
];

/** YALI Learns session run by Learn To Lead (supplied by the organisation). */
const yali = (file: string, alt: string, brief: string, focus?: string): ImageAsset => ({
  ...photo(`learn-to-lead/yali-learns/${file}.jpg`, 2400, 1800, alt, brief, focus),
  group: "YALI Learns",
});
export const yaliLearnsGallery: ImageAsset[] = [
  yali("team-in-learn-to-lead-shirts", "Seven team members in black Learn To Lead T-shirts smiling together", "The Learn To Lead team", "50% 35%"),
  yali("panel-with-yali-learns-guest", "Three panellists seated in front of a mural, with a guest joining on screen", "Panel conversation", "50% 40%"),
  yali("yali-network-edo-welcome", "A speaker with a microphone beside a screen showing the YALI Network Edo logo", "Welcome", "60% 40%"),
  yali("session-on-social-change", "A facilitator presents a slide on planning for social change", "Planning for social change", "55% 45%"),
  yali("participants-taking-notes", "Young participants seated on colourful chairs, one holding a pen and notes", "Taking notes", "55% 45%"),
  yali("presenting-amara", "A participant presents his project, with its logo on the screen", "Presenting a project", "60% 40%"),
  yali("audience-listening", "Participants listening, one writing in a notebook, while the session is filmed behind them", "Listening in", "60% 40%"),
  yali("presenting-stead-feet-consult", "A participant presents his business to the room in front of a painted mural", "Pitching an idea", "50% 50%"),
  yali("learners-in-the-room", "A row of young men listening attentively", "Paying attention", "50% 35%"),
  yali("filming-the-session", "A camera on a tripod records a speaker during the session", "Recording the session", "40% 50%"),
  yali("two-team-members", "Two team members in Learn To Lead T-shirts in the corridor", "Team members", "55% 35%"),
];

/** Pending photo slots for a project gallery, one per subject. */
export function galleryFor(project: string, subjects: string[]): ImageAsset[] {
  return subjects.map((subject) =>
    pending(`${project}: ${subject}`, `${project} gallery: ${subject}`),
  );
}
