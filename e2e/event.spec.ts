import { expect, test } from "@playwright/test";
import { dismissCookies } from "./helpers";

const PAGE = "/our-work/fusion/2026";
test.beforeEach(async ({ page }) => dismissCookies(page));

test("before the event: countdown in days, hours and minutes", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-20T10:00:00+01:00"));
  await page.goto(PAGE);
  await expect(page.getByText(/Starts in 5 days, 14 hours and 0 minutes/)).toBeAttached();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Fusion: Art Meets Tech 2026");
});

test("during the event: happening now", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-27T12:00:00+01:00"));
  await page.goto(PAGE);
  await expect(page.getByText("Happening now")).toBeVisible();
});

test("after the event: thank-you message", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-12-02T12:00:00+01:00"));
  await page.goto(PAGE);
  await expect(page.getByText(/Thank you to everyone who took part/)).toBeVisible();
});

test("apply, sponsor, calendar and FAQ work; no invented venue", async ({ page, request }) => {
  await page.goto(PAGE);
  await expect(page.getByRole("link", { name: /Apply now/ })).toHaveAttribute("href", /bit\.ly\/fusion-artxtech/);
  await expect(page.getByText("Venue to be announced")).toBeVisible();
  await page.getByText("Where will it take place?").click();
  await expect(page.getByText(/The venue will be announced on this page/)).toBeVisible();
  const ics = await request.get(`${PAGE}/calendar.ics`);
  expect(ics.headers()["content-type"]).toContain("text/calendar");
  const body = await ics.text();
  expect(body).toContain("DTSTART;VALUE=DATE:20261126");
  expect(body).toContain("DTEND;VALUE=DATE:20261129");
  expect(body).not.toContain("LOCATION:");
});

test("short link redirects to the event page", async ({ page }) => {
  await page.goto("/fusion-2026");
  await expect(page).toHaveURL(new RegExp(`${PAGE}$`));
});
