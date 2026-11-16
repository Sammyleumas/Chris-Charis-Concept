import { link, photo } from "./objects";
import {
  event,
  homepage,
  impactStat,
  impactStory,
  organisation,
  partner,
  post,
  pressAsset,
  projectFamily,
  report,
  siteSettings,
  teamMember,
  timelineEntry,
} from "./documents";

export const singletons = ["siteSettings", "homepage"];

export const schemaTypes = [
  photo,
  link,
  siteSettings,
  homepage,
  event,
  projectFamily,
  organisation,
  impactStat,
  impactStory,
  report,
  timelineEntry,
  post,
  pressAsset,
  teamMember,
  partner,
];
