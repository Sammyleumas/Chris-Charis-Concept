/**
 * Brand assets. Colours live as CSS tokens in src/app/globals.css.
 *
 * LOGO: the official crown-and-C SVG/PNG files have not been supplied yet.
 * `logo.light` / `logo.dark` are null, so <Logo /> renders an interim
 * vector mark. Drop the supplied files into /public/brand/ and set the
 * paths below; every header, footer and metadata image picks them up.
 */
export const brand = {
  logo: {
    /** Logo for light backgrounds, e.g. "/brand/logo-on-light.svg" */
    light: null as string | null,
    /** Logo for dark backgrounds, e.g. "/brand/logo-on-dark.svg" */
    dark: null as string | null,
    width: 168,
    height: 40,
  },
  /** Mirror of the CSS tokens for places CSS cannot reach (OG images, theme-color). */
  colors: {
    brand: "#2B7FB8",
    slate: "#7A8A8A",
    charcoal: "#3A3B42",
    white: "#FFFFFF",
    mist: "#E6F0F8",
    ink: "#24252B",
  },
} as const;
