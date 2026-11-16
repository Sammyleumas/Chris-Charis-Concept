import { expect, test } from "@playwright/test";
import { dismissCookies } from "./helpers";

test.beforeEach(async ({ page }) => dismissCookies(page));

test("theme follows the device, then the saved choice", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "dark" });
  const page = await ctx.newPage();
  await dismissCookies(page);
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");
  const sw = page.getByRole("switch", { name: "Dark mode" });
  await expect(sw).toHaveAttribute("aria-checked", "true");
  await sw.click();
  await expect(html).toHaveAttribute("data-theme", "light");
  await expect(sw).toHaveAttribute("aria-checked", "false");
  await page.goto("/about");
  await expect(html).toHaveAttribute("data-theme", "light"); // saved choice wins
  await ctx.close();
});

test("Donate buttons have no eyes", async ({ page }) => {
  await page.goto("/get-involved");
  for (const link of await page.locator('a[href="/donate"]').all()) {
    await expect(link.locator(".btn-eyes")).toHaveCount(0);
  }
});
