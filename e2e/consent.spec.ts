import { expect, test } from "@playwright/test";

test("cookie banner: choice is remembered and can be reopened", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByRole("region", { name: "Cookie choices" });
  await expect(banner).toBeVisible();
  await banner.getByRole("button", { name: "Necessary only" }).click();
  await expect(banner).toBeHidden();
  await page.reload();
  await expect(banner).toBeHidden();
  await page.getByRole("button", { name: "Cookie settings" }).click();
  await expect(banner).toBeVisible();
});

test("analytics script never loads without consent", async ({ page }) => {
  const gaRequests: string[] = [];
  page.on("request", (r) => r.url().includes("googletagmanager.com") && gaRequests.push(r.url()));
  await page.goto("/");
  await page.getByRole("region", { name: "Cookie choices" }).getByRole("button", { name: "Necessary only" }).click();
  await page.goto("/about");
  expect(gaRequests).toEqual([]);
});
