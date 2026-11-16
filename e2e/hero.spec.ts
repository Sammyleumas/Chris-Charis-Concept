import { expect, test } from "@playwright/test";
import { dismissCookies } from "./helpers";

test.beforeEach(async ({ page }) => dismissCookies(page));

test("hero copy follows the slide", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Transforming Communities");
  await page.getByRole("button", { name: /^Show slide 3:/ }).click();
  const visible = page.locator(".hero-copy:not(.invisible)");
  await expect(visible).toHaveCount(1);
  await expect(visible).toContainText("Healthy Heart");
  await expect(visible.getByRole("link", { name: "Explore Healthy Heart" })).toBeVisible();
  // Hidden slides' buttons cannot be reached.
  await expect(page.getByRole("link", { name: "Explore Fusion" })).toBeHidden();
});
