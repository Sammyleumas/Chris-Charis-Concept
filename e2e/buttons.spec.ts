import { expect, test } from "@playwright/test";
import { dismissCookies } from "./helpers";

test.beforeEach(async ({ page }) => dismissCookies(page));

test("button eyes follow the pointer", async ({ page }) => {
  await page.goto("/");
  const pupil = page.locator(".hero-copy:not(.invisible) .btn-pupil").first();
  const vp = page.viewportSize()!;
  const look = async (x: number, y: number) => {
    // Keep nudging the pointer: the tracker attaches once the page hydrates.
    await page.mouse.move(x, y);
    await page.mouse.move(x + 1, y);
    return pupil.evaluate((el) => {
      const m = new DOMMatrix(getComputedStyle(el).transform);
      return [Math.sign(Math.round(m.m41)), Math.sign(Math.round(m.m42))];
    });
  };
  await expect.poll(() => look(vp.width - 10, 5)).toEqual([1, -1]); // up and right
  await expect.poll(() => look(5, vp.height - 10)).toEqual([-1, 1]); // down and left
});
