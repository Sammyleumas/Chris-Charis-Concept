import { expect, test } from "@playwright/test";
import { dismissCookies } from "./helpers";

test.beforeEach(async ({ page }) => dismissCookies(page));

test("cursor ring follows the mouse smoothly and reacts to buttons", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "mouse only");
  await page.goto("/about");
  const ring = page.locator(".cursor-follower");
  const x = () => ring.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
  // Keep moving until the page has hydrated and the ring appears.
  await expect.poll(async () => {
    await page.mouse.move(300, 400);
    await page.mouse.move(301, 400);
    return ring.getAttribute("data-visible");
  }).toBe("");
  await page.mouse.move(800, 400);
  const lag = await x();
  expect(lag).toBeLessThan(800); // trails behind at first…
  await expect.poll(x).toBeGreaterThan(799); // …then settles on the pointer
  const link = page.getByRole("link", { name: "Who We Are" }).first();
  const box = (await link.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 });
  await expect(ring).toHaveAttribute("data-state", "hover");
});

test("no cursor ring on touch screens", async ({ browser }) => {
  const ctx = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page.locator(".cursor-follower")).toBeHidden();
  await ctx.close();
});
