import { expect, test } from "@playwright/test";
import { dismissCookies } from "./helpers";

test.beforeEach(async ({ page }) => dismissCookies(page));

test("gallery: filter, keyboard, viewer and grid", async ({ page }) => {
  await page.goto("/media/gallery");
  await page.getByRole("button", { name: "Healthy Heart", exact: true }).click();
  const stage = page.locator("[aria-describedby]").first();
  await stage.focus();
  await page.keyboard.press("End");
  await expect(page.getByText("04 / 04")).toBeVisible();
  await page.locator('button[aria-label^="4 of"]').click();
  const viewer = page.locator("dialog[open]");
  await expect(viewer).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(viewer.getByText("1 / 4")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(viewer).toHaveCount(0);
  await page.getByRole("button", { name: "Grid" }).click();
  await expect(page.getByRole("button", { name: /Open photo/ })).toHaveCount(4);
});

test("Our Work coverflow opens the centred project", async ({ page }) => {
  await page.goto("/our-work");
  await page.locator('a[aria-label^="4 of"]').click();
  await expect(page).toHaveURL(/\/our-work\/fusion$/);
});
