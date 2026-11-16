import { expect, test } from "@playwright/test";
import { dismissCookies } from "./helpers";

test.beforeEach(async ({ page }) => dismissCookies(page));

test("button eyes follow the pointer", async ({ page }) => {
  await page.goto("/");
  const pupil = page.locator(".hero-copy:not(.invisible) .btn-pupil").first();
  const box = (await pupil.boundingBox())!;
  const at = () => pupil.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform));
  await page.mouse.move(box.x + 400, box.y - 300); // up and to the right
  await expect.poll(async () => (await at()).m41).toBeGreaterThan(0);
  expect((await at()).m42).toBeLessThan(0);
  await page.mouse.move(box.x - 400, box.y + 300); // down and to the left
  await expect.poll(async () => (await at()).m41).toBeLessThan(0);
  expect((await at()).m42).toBeGreaterThan(0);
});
