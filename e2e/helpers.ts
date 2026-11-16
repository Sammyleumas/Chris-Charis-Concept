import type { Page } from "@playwright/test";

export const routes = [
  "/", "/about", "/about/story", "/about/vision", "/about/team", "/about/partners", "/about/governance",
  "/our-work", "/our-work/film-for-social-change", "/our-work/healthy-heart", "/our-work/learn-to-lead",
  "/our-work/fusion", "/our-work/chris-charis-brand",
  "/organisations", "/organisations/social-enterprise", "/organisations/fusion-connect-academy",
  "/organisations/fusion-solutions-hub", "/organisations/chris-charis-brand", "/organisations/soul",
  "/impact", "/impact/stories", "/impact/reports",
  "/media", "/media/films", "/media/gallery", "/media/press", "/news",
  "/get-involved", "/get-involved/volunteer", "/get-involved/partner", "/get-involved/careers",
  "/donate", "/contact", "/privacy", "/terms", "/safeguarding", "/cookies",
];

/** Pre-answers the cookie banner so it does not cover content. */
export async function dismissCookies(page: Page, analytics = false) {
  await page.addInitScript((a) => localStorage.setItem("cc-consent", JSON.stringify({ analytics: a, at: "test" })), analytics);
}
