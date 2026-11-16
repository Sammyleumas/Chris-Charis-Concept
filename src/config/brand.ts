/**
 * Brand assets. Colours live as CSS tokens in src/app/globals.css.
 *
 * Logo files in /public/brand are generated from the organisation's
 * supplied master (crown-and-C symbol with the "Chris Charis." wordmark).
 * "-light" versions show the charcoal lettering in white for dark
 * backgrounds; blue, grey and the crown are unchanged. A rebrand replaces
 * these files and dimensions only.
 */
export const brand = {
  logo: {
    /** Symbol beside the wordmark: header, mobile menu. */
    horizontal: { dark: "/brand/logo-horizontal.webp", light: "/brand/logo-horizontal-light.webp", width: 374, height: 176 },
    /** Symbol above the wordmark: footer, press, social. */
    full: { dark: "/brand/logo-full.webp", light: "/brand/logo-full-light.webp", width: 698, height: 1021 },
    /** Symbol only: icons. */
    mark: { src: "/brand/logo-mark.png", width: 316, height: 512 },
    /** Full-colour PNG used where WebP is not accepted (structured data). */
    fullPng: "/brand/logo-full.png",
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
