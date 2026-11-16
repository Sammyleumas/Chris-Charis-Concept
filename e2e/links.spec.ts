import { expect, test } from "@playwright/test";
import { routes } from "./helpers";

test("every internal link resolves", async ({ page, request }) => {
  const found = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")!));
    hrefs.forEach((h) => found.add(h.split("#")[0].split("?")[0] || "/"));
  }
  const broken: string[] = [];
  for (const href of found) {
    const res = await request.get(href, { maxRedirects: 2 });
    if (res.status() >= 400) broken.push(`${href} → ${res.status()}`);
  }
  expect(broken).toEqual([]);
  expect(found.size).toBeGreaterThan(30);
});
