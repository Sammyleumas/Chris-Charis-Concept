import { expect, test } from "@playwright/test";
import { dismissCookies, routes } from "./helpers";

test.describe("every route", () => {
  for (const route of routes) {
    test(`${route} renders cleanly`, async ({ page }) => {
      await dismissCookies(page);
      const errors: string[] = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      const res = await page.goto(route, { waitUntil: "networkidle" });
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("header a[aria-label$='home']")).toBeVisible();
      await expect(page.locator("footer")).toContainText("RC 9786077");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, "no horizontal scrolling").toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }
});

test("no horizontal overflow at small and tablet widths", async ({ page }) => {
  test.setTimeout(240_000);
  await dismissCookies(page);
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/our-work", "/media/gallery", "/donate", "/organisations/fusion-solutions-hub"]) {
      await page.goto(route, { waitUntil: "load" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${route} at ${width}px`).toBeLessThanOrEqual(0);
    }
  }
});

test("unknown pages return 404", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
});
