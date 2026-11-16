import type { StructureResolver } from "sanity/structure";

const singleton = (S: Parameters<StructureResolver>[0], id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id));

/** Desk layout grouped the way the communications team works. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "siteSettings", "Site settings"),
      singleton(S, "homepage", "Homepage (featured & film)"),
      S.documentTypeListItem("event").title("Events"),
      S.divider(),
      S.documentTypeListItem("projectFamily").title("Project families"),
      S.documentTypeListItem("organisation").title("Organisations"),
      S.divider(),
      S.documentTypeListItem("impactStat").title("Impact figures"),
      S.documentTypeListItem("impactStory").title("Impact stories"),
      S.documentTypeListItem("report").title("Annual reports"),
      S.documentTypeListItem("timelineEntry").title("Our Story timeline"),
      S.divider(),
      S.documentTypeListItem("post").title("News & blog"),
      S.documentTypeListItem("pressAsset").title("Press kit files"),
      S.divider(),
      S.documentTypeListItem("teamMember").title("Team"),
      S.documentTypeListItem("partner").title("Partners"),
    ]);
