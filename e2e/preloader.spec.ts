import { expect, test } from "@playwright/test";

test("loader plays once per visit and never blocks the page", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("cc-consent", JSON.stringify({ analytics: false, at: "test" })));
  await page.goto("/");
  const loader = page.locator(".preloader");
  await expect(loader).toBeVisible();
  // Clicks pass through while it plays.
  expect(await loader.evaluate((el) => getComputedStyle(el).pointerEvents)).toBe("none");
  await expect(loader).toBeHidden({ timeout: 4000 });
  await page.goto("/about");
  await expect(page.locator(".preloader")).toBeHidden();
});

test("loader is skipped for reduced motion", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.locator(".preloader")).toBeHidden();
  await ctx.close();
});
