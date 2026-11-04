/**
 * Brevo server-side helpers shared between API routes.
 */

const BREVO_API = "https://api.brevo.com/v3";
const DEFAULT_LIST_NAME = "Newsletter fikircafe.com";

// Default sender/recipient while the fikircafe.com domain DNS is still
// propagating in Brevo. Emails from hola@fikircafe.com would be silently
// rejected by Brevo, so we default to the verified address.
const DEFAULT_SENDER_EMAIL = "pablo.esteve@beniaa.com";
const DEFAULT_CONTACT_EMAIL = "pablo.esteve@beniaa.com";

export function getSender(): { name: string; email: string } {
  return {
    name: process.env.BREVO_SENDER_NAME || "Fikir Coffee",
    email: process.env.BREVO_SENDER_EMAIL || DEFAULT_SENDER_EMAIL,
  };
}

export function getContactEmail(): string {
  return process.env.CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;
}

function apiKey(): string | null {
  return process.env.BREVO_API_KEY || null;
}

export async function brevo(path: string, init: RequestInit = {}): Promise<{ status: number; data: unknown }> {
  const key = apiKey();
  if (!key) throw new Error("BREVO_API_KEY missing");
  const res = await fetch(`${BREVO_API}${path}`, {
    ...init,
    headers: {
      "api-key": key,
      "Content-Type": "application/json",
      accept: "application/json",
      ...(init.headers || {}),
    },
  });
  let data: unknown = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { status: res.status, data };
}

/**
 * Returns the Brevo list id to use for the newsletter.
 * If BREVO_NEWSLETTER_LIST_ID is set, returns it as-is.
 * Otherwise finds (or creates) a list named "Newsletter fikircafe.com".
 */
let cachedListId: number | null = null;

export async function getOrCreateNewsletterListId(): Promise<number | null> {
  const fromEnv = process.env.BREVO_NEWSLETTER_LIST_ID;
  if (fromEnv) return Number(fromEnv);
  if (cachedListId) return cachedListId;

  const { status, data } = await brevo("/contacts/lists?limit=50");
  if (status === 200) {
    const lists =
      (data as { lists?: { id: number; name: string }[] })?.lists ?? [];
    const existing = lists.find((l) => l.name === DEFAULT_LIST_NAME);
    if (existing) {
      cachedListId = existing.id;
      return existing.id;
    }
  }

  const created = await brevo("/contacts/lists", {
    method: "POST",
    body: JSON.stringify({ name: DEFAULT_LIST_NAME, folderId: 1 }),
  });
  if (created.status === 201 && (created.data as { id?: number })?.id) {
    cachedListId = (created.data as { id: number }).id;
    return cachedListId;
  }
  console.error("Could not create Brevo list:", created.status, created.data);
  return null;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface SendEmailInput {
  to: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
  templateId?: number;
  params?: Record<string, string | number>;
}

export async function sendEmail(input: SendEmailInput): Promise<{ ok: boolean; status: number; data: unknown }> {
  const body: Record<string, unknown> = {
    sender: getSender(),
    to: [input.to],
  };
  if (input.replyTo) body.replyTo = input.replyTo;
  if (input.templateId) {
    body.templateId = input.templateId;
    if (input.params) body.params = input.params;
  } else {
    body.subject = input.subject;
    body.htmlContent = input.htmlContent;
  }
  const { status, data } = await brevo("/smtp/email", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return { ok: status === 201, status, data };
}
