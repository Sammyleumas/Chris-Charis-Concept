import "server-only";

/**
 * Brevo (formerly Sendinblue) contact sign-up. Requires BREVO_API_KEY and
 * BREVO_LIST_ID in the server environment. Never import from client code.
 */
export function isBrevoConfigured() {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID);
}

export async function subscribeToBrevo(email: string) {
  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [Number(process.env.BREVO_LIST_ID)],
      updateEnabled: true,
    }),
    cache: "no-store",
  });
  // 201 created, 204 updated existing contact
  if (!res.ok && res.status !== 204) {
    throw new Error(`Brevo responded ${res.status}`);
  }
}
