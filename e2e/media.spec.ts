import { expect, test } from "@playwright/test";
import { dismissCookies } from "./helpers";

test.beforeEach(async ({ page }) => dismissCookies(page));

test("gallery: filter, keyboard, viewer and grid", async ({ page }) => {
  await page.goto("/media/gallery");
  await page.getByRole("button", { name: "Healthy Heart", exact: true }).click();
  const stage = page.locator("[aria-describedby]").first();
  await stage.focus();
  const n = await page.getByRole("button", { name: /^Show \d+:/ }).count();
  expect(n).toBeGreaterThan(1);
  await page.keyboard.press("End");
  await expect(page.getByRole("button", { name: new RegExp(`^Show ${n}:`) })).toHaveAttribute("aria-current", "true");
  await page.locator(`button[aria-label^="${n} of"]`).click();
  const viewer = page.locator("dialog[open]");
  await expect(viewer).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(viewer.getByText(`1 / ${n}`)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(viewer).toHaveCount(0);
  await page.getByRole("button", { name: "Grid view" }).click();
  await page.getByRole("button", { name: "Healthy Heart", exact: true }).click();
  await expect(page.getByRole("button", { name: /Open photo/ })).toHaveCount(n);
});

test("Our Work coverflow: side card centres, centred card opens", async ({ page }) => {
  await page.goto("/our-work");
  await page.locator('button[aria-label^="4 of"]').click();
  await expect(page.locator('a[aria-label^="4 of"]')).toBeVisible();
  await page.locator('a[aria-label^="4 of"]').click();
  await expect(page).toHaveURL(/\/our-work\/fusion$/);
});

test("gallery shows the full-screen control", async ({ page }) => {
  await page.goto("/media/gallery");
  await expect(page.getByRole("button", { name: "View full screen" })).toBeVisible();
});
