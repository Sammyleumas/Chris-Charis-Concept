import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { dismissCookies, routes } from "./helpers";

test.use({ reducedMotion: "reduce" });

for (const route of routes) {
  test(`WCAG 2.1 AA: ${route}`, async ({ page }) => {
    await dismissCookies(page);
    await page.goto(route, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page } as unknown as ConstructorParameters<typeof AxeBuilder>[0]).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}

test.describe("dark mode", () => {
  test.use({ colorScheme: "dark" });
  for (const route of routes) {
    test(`WCAG 2.1 AA (dark): ${route}`, async ({ page }) => {
      await dismissCookies(page);
      await page.goto(route, { waitUntil: "networkidle" });
      expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe("dark");
      const results = await new AxeBuilder({ page } as unknown as ConstructorParameters<typeof AxeBuilder>[0]).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  }
});
