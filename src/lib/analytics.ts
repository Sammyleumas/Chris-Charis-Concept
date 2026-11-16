/**
 * Analytics events (GA4). Calls are no-ops unless the visitor has accepted
 * analytics cookies and NEXT_PUBLIC_GA_ID is set. Never pass personal data
 * (names, emails, messages) as parameters.
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

/** Event names used across the site, in one place for the GA4 report setup. */
export const events = {
  contact: "contact_submit",
  volunteer: "volunteer_application",
  partner: "partnership_enquiry",
  careers: "careers_application",
  quote: "quote_request",
  newsletter: "sign_up",
  donationStart: "donation_initiated",
  donationComplete: "donation_completed",
  projectLink: "project_link_click",
  eventApply: "event_application_click",
  videoPlay: "video_play",
  galleryOpen: "gallery_open",
} as const;
