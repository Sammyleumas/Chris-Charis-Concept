import { expect, test } from "@playwright/test";
import { dismissCookies } from "./helpers";

test.beforeEach(async ({ page }) => dismissCookies(page));

test("contact form shows field errors and keeps typed values", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("#f-name-error")).toHaveText("Enter your full name.");
  await page.fill("#f-name", "Ada Test");
  await page.fill("#f-email", "not-an-email");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("#f-email-error")).toHaveText("Enter a valid email address.");
  await expect(page.locator("#f-name")).toHaveValue("Ada Test");
});

test("partner form preselects Fusion from the sponsor link", async ({ page }) => {
  await page.goto("/get-involved/partner?interest=fusion");
  await expect(page.locator("select[name=project]")).toHaveValue("Fusion: Art Meets Tech 2026");
});

test("donation enforces the minimum and never fakes a payment", async ({ page }) => {
  await page.goto("/donate");
  await page.getByRole("button", { name: "Monthly" }).click();
  await page.fill("#f-amount", "500");
  await page.locator("main button[type=submit]").click();
  await expect(page.locator("#f-amount-error")).toContainText("minimum gift");
  await page.getByRole("button", { name: "₦25,000" }).click();
  await expect(page.locator("main button[type=submit]")).toHaveText(/Give ₦25,000 monthly/);
  await page.fill("#f-name", "Ada Test");
  await page.fill("#f-email", "ada@example.com");
  await page.check("main input[name=consent]");
  await page.locator("main button[type=submit]").click();
  await expect(page.locator("form [role=alert]")).toContainText("No payment has been taken");
});
