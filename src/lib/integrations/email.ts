import "server-only";

/**
 * Transactional email through Resend (https://resend.com).
 * Requires RESEND_API_KEY, FORMS_FROM_EMAIL (a verified sender on the
 * organisation's domain) and FORMS_TO_EMAIL (the inbox that receives
 * submissions). Never import from client code.
 */
export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.FORMS_FROM_EMAIL && process.env.FORMS_TO_EMAIL);
}

const escape = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendSubmissionEmail({
  subject,
  fields,
  replyTo,
  to = process.env.FORMS_TO_EMAIL!,
}: {
  subject: string;
  fields: Record<string, string | undefined>;
  replyTo?: string;
  to?: string;
}) {
  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top">${escape(k)}</th><td style="padding:6px 0;white-space:pre-wrap">${escape(v!)}</td></tr>`)
    .join("");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.FORMS_FROM_EMAIL,
      to: [to],
      subject,
      reply_to: replyTo,
      html: `<table style="font-family:system-ui,sans-serif;font-size:14px">${rows}</table>`,
      text: Object.entries(fields).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n"),
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}
