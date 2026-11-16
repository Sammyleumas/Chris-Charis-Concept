/**
 * GROQ queries. Projections return the same shapes as src/content/types.ts,
 * so CMS content and local content are interchangeable.
 */

// Image → ImageAsset. Hotspot becomes a CSS object-position.
const img = `{
  "src": asset->url,
  "alt": coalesce(alt, ""),
  "brief": coalesce(caption, alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "credit": credit,
  "focus": select(defined(hotspot) => string(round(hotspot.x * 100)) + "% " + string(round(hotspot.y * 100)) + "%")
}`;

const link = `{ label, url, external }`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  email, phone, streetAddress, socials[]{ platform, url },
  youtubeChannel, hhcpWebsite, soulWebsite, fusionBootcamp, fusionVote, fusionConnectAcademy, maybeChallengeTiktok,
  vision, mission, tagline, motto, values[]{ name, text },
  heroVideoUrl, "heroPoster": heroPoster${img},
  "heroSlides": heroSlides[]{ "image": image${img}, label, href }
}`;

export const homepageQuery = `*[_type == "homepage"][0]{
  "featured": featured{ eyebrow, title, dateLabel, startDate, endDate, description, "image": image${img}, "actions": actions[]${link} },
  "featuredFilm": featuredFilm{ title, description, youtubeUrl, "poster": poster${img} }
}`;

export const projectFamiliesQuery = `*[_type == "projectFamily"] | order(year asc){
  slug, name, shortName, year, line, intro, accent,
  "image": image${img},
  items[]{ name, date, summary, group, href, youtubeUrl },
  "externalLinks": externalLinks[]${link},
  results[]{ value, label, source },
  "gallery": gallery[]${img},
  "cta": cta{ title, text, "actions": actions[]${link} },
  related
}`;

export const organisationsQuery = `*[_type == "organisation"] | order(order asc){
  slug, name, registeredName, registrationNumber, line, description, relationship, website,
  "image": image${img},
  offeringsTitle, offerings, relatedFamilies,
  enquiryTitle, enquiryText, "enquiryActions": enquiryActions[]${link}
}`;

export const impactStatsQuery = `*[_type == "impactStat"] | order(order asc){
  "id": key, value, display, label, "detail": coalesce(detail, ""), "href": coalesce(href, "/impact"), source, asOf
}`;

export const timelineQuery = `*[_type == "timelineEntry"] | order(year asc, order asc){ date, year, title, "text": coalesce(text, ""), href }`;

export const storiesQuery = `*[_type == "impactStory" && consent == "granted"] | order(date desc){
  "slug": slug.current, title, summary, family, date, "photo": photo${img}, outcome, consent
}`;

export const reportsQuery = `*[_type == "report" && defined(file.asset)] | order(publishedOn desc){
  title, period, "description": coalesce(description, ""), "fileUrl": file.asset->url, publishedOn,
  "fileSizeLabel": string(round(file.asset->size / 1024 / 1024 * 10) / 10) + " MB"
}`;

export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(date desc){
  "slug": slug.current, title, excerpt, date, category, author, "image": image${img},
  "body": body[_type == "block"]{ "t": pt::text(@) }.t
}`;

export const pressAssetsQuery = `*[_type == "pressAsset"] | order(order asc){
  label, "description": coalesce(description, ""), "fileUrl": file.asset->url, format
}`;

export const teamQuery = `*[_type == "teamMember"] | order(order asc){
  name, role, group, department, bio, "photo": photo${img}, "links": links[]{ label, url }
}`;

export const partnersQuery = `*[_type == "partner" && permission == true] | order(order asc){
  name, "logo": logo{ "src": asset->url, "alt": "", "brief": "" }, collaboration, url
}`;
