import { site } from "@/config/site";
import type { LegalDoc } from "./types";

const controller = `${site.legalName} (${site.registrationNumber}), trading as ${site.name}, ${site.location.city}, ${site.location.state}, ${site.location.country}`;
const UPDATED = "16 November 2026 (draft)";

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  summary: "How we collect, use and protect your personal information.",
  updated: UPDATED,
  approved: false,
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      body: [`This website is run by ${controller}. We are the data controller for personal information collected through it.`],
      review: "Name the Data Protection Officer or contact person, and confirm whether registration with the Nigeria Data Protection Commission (NDPC) applies.",
    },
    {
      id: "what-we-collect",
      heading: "What we collect",
      body: [
        "We only collect information you choose to give us, through these forms:",
        [
          "Contact form: your name, email, subject and message.",
          "Volunteer application: name, email, phone (optional), city, area of interest, availability and experience.",
          "Partnership enquiry: name, email, phone (optional), organisation, partnership type, project of interest and message.",
          "Careers and facilitator application: name, email, phone (optional), role, expertise, a CV or portfolio link and message.",
          "Fusion Solutions Hub quote request: name, email, phone and organisation (optional), service, project details and timeline.",
          "Newsletter: your email address.",
          "Donations: your name, email, gift amount, frequency and chosen project. Card details are entered on Paystack’s secure page and never reach us.",
        ],
        "If you accept analytics cookies, we also collect anonymous information about how the site is used (see the Cookie Notice).",
      ],
    },
    {
      id: "why",
      heading: "Why we use it and our legal basis",
      body: [
        [
          "To reply to your message or application, based on your consent, which you give when submitting a form.",
          "To process donations and send receipts, as necessary to carry out your request.",
          "To send our newsletter, based on your consent. You can unsubscribe at any time.",
          "To understand and improve the website, only if you accept analytics cookies.",
        ],
        "We do not sell your information or use it for advertising.",
      ],
    },
    {
      id: "sharing",
      heading: "Who we share it with",
      body: [
        "We use trusted service providers who process information on our behalf:",
        [
          "Vercel: website hosting.",
          "Resend: delivering form submissions to our inbox.",
          "Brevo: our newsletter mailing list.",
          "Paystack: processing donations.",
          "Google Analytics: website statistics, only with your consent.",
          "YouTube (privacy-enhanced mode): film playback, loaded only when you press play.",
        ],
        "Some providers process data outside Nigeria. Where they do, we rely on the safeguards the NDPA requires.",
      ],
      review: "Confirm the final list of processors (including the CMS and database added at launch) and the transfer safeguards for each.",
    },
    {
      id: "retention",
      heading: "How long we keep it",
      body: ["We keep personal information only as long as we need it for the purpose it was collected, then delete it securely."],
      review: "Set retention periods for each type of submission (e.g. enquiries, applications, donation records for accounting purposes).",
    },
    {
      id: "rights",
      heading: "Your rights",
      body: [
        "Under the Nigeria Data Protection Act 2023 you can ask us to:",
        ["Give you a copy of your information", "Correct it", "Delete it", "Stop or restrict using it", "Transfer it to another organisation", "Withdraw your consent at any time"],
        "To make a request, use our contact form. If you are unhappy with how we handle your information, you can complain to the Nigeria Data Protection Commission.",
      ],
    },
    {
      id: "children",
      heading: "Children and participants",
      body: ["We do not publish stories or images of programme participants without recorded consent. See our Safeguarding Statement."],
      review: "Confirm the consent rules for participants under 18 (e.g. parent or guardian consent).",
    },
    {
      id: "security",
      heading: "Security",
      body: ["Forms are sent over encrypted connections and checked on our server. Access to submissions is limited to staff who need it."],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  title: "Terms of Use",
  summary: "The terms for using this website.",
  updated: UPDATED,
  approved: false,
  sections: [
    { id: "about", heading: "About these terms", body: [`These terms apply to your use of this website, operated by ${controller}. By using the site you agree to them.`] },
    {
      id: "content",
      heading: "Our content",
      body: [
        "Text, films, photographs, logos and other content on this site belong to Chris Charis Concept or are used with permission. You may share links and quote short passages with credit. Please contact us before reusing images, films or logos.",
        "Approved logos and photographs for press use are available in our Press Kit.",
      ],
    },
    {
      id: "use",
      heading: "Acceptable use",
      body: ["Please do not misuse the site, including by sending spam through our forms, attempting to access systems you are not authorised to use, or uploading harmful content."],
    },
    {
      id: "donations",
      heading: "Donations",
      body: ["Donations are processed by Paystack. Monthly gifts can be cancelled at any time by contacting us."],
      review: "Confirm the refund and cancellation policy for one-off and monthly donations.",
    },
    {
      id: "links",
      heading: "Links to other websites",
      body: ["We link to project websites and social media. We are not responsible for the content or privacy practices of other sites."],
    },
    {
      id: "liability",
      heading: "Accuracy and liability",
      body: ["We work to keep information accurate and up to date, but the site is provided as it is. To the extent permitted by law, we are not liable for losses arising from its use."],
      review: "Lawyer to confirm liability wording.",
    },
    {
      id: "law",
      heading: "Governing law",
      body: ["These terms are governed by the laws of the Federal Republic of Nigeria."],
      review: "Confirm governing law and jurisdiction.",
    },
  ],
};

export const safeguardingStatement: LegalDoc = {
  title: "Safeguarding Statement",
  summary: "Our commitment to the safety and dignity of everyone we work with.",
  updated: UPDATED,
  approved: false,
  sections: [
    {
      id: "commitment",
      heading: "Our commitment",
      body: ["Chris Charis Concept works with young people and communities. We are committed to keeping everyone who takes part in our programmes, films and events safe, and to treating them with dignity and respect."],
    },
    {
      id: "principles",
      heading: "What we do",
      body: [
        [
          "We only film, photograph or publish participants with their recorded consent.",
          "We tell people’s stories accurately and respectfully, and never identify someone in a way that could put them at risk.",
          "Staff, facilitators and volunteers are expected to follow our code of conduct.",
          "We take every concern seriously and act on it promptly.",
        ],
      ],
      review: "Attach or summarise the safeguarding policy and code of conduct, and the vetting process for staff, facilitators and volunteers working with young people.",
    },
    {
      id: "report",
      heading: "Raising a concern",
      body: ["If you are worried about the safety or wellbeing of anyone involved in our work, contact us straight away through our contact page. If someone is in immediate danger, contact the emergency services first."],
      review: "Name the designated safeguarding lead and give a direct, confidential contact (email or phone).",
    },
  ],
};

export const cookieNotice: LegalDoc = {
  title: "Cookie Notice",
  summary: "How this website uses cookies and similar technologies.",
  updated: UPDATED,
  approved: false,
  sections: [
    {
      id: "what",
      heading: "What we use",
      body: [
        [
          "Strictly necessary: your cookie choice, saved in your browser so we don’t ask again. Always on.",
          "Analytics (optional): Google Analytics cookies that help us understand which pages are useful. Only set if you accept.",
          "Embedded films: YouTube’s privacy-enhanced player loads only when you press play.",
        ],
        "We do not use advertising or tracking cookies.",
      ],
    },
    {
      id: "choices",
      heading: "Your choices",
      body: ["When you first visit, we ask whether you accept analytics cookies. You can change your choice at any time using “Cookie settings” in the footer."],
    },
  ],
};
