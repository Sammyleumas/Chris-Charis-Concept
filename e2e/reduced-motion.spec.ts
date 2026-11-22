import { expect, test } from "@playwright/test";
import { dismissCookies } from "./helpers";

test.use({ reducedMotion: "reduce" });

for (const route of ["/", "/about", "/our-work/healthy-heart", "/impact", "/get-involved"]) {
  test(`reduced motion: nothing stays hidden on ${route}`, async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop is enough");
    await dismissCookies(page);
    await page.goto(route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
    });
    await page.waitForTimeout(800);
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("main [style*='opacity: 0']")]
        .filter((el) => !el.closest("[aria-hidden='true'], .invisible, [inert]"))
        .map((el) => el.textContent?.trim().slice(0, 40)),
    );
    expect(hidden).toEqual([]);
  });
}
