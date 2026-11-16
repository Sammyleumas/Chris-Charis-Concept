export type LegalSection = {
  id: string;
  heading: string;
  /** Paragraphs; an array renders as a bulleted list. */
  body: (string | string[])[];
  /** Point the organisation or its lawyer must confirm. */
  review?: string;
};

export type LegalDoc = {
  title: string;
  summary: string;
  updated: string;
  /** Set true only after legal sign-off; removes the draft banner. */
  approved: boolean;
  sections: LegalSection[];
};
