import nodemailer, { type Transporter } from "nodemailer";

// Verified sender while fikircafe.com domain is pending DNS propagation.
const FROM_EMAIL = process.env.BREVO_SENDER_EMAIL || "pablo.esteve@beniaa.com";
const FROM_NAME = process.env.BREVO_SENDER_NAME || "Fikir Coffee";
const FROM = `"${FROM_NAME}" <${FROM_EMAIL}>`;

let cachedTransporter: Transporter | null = null;

function transporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;
  cachedTransporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com",
    port: Number(process.env.BREVO_SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS || process.env.BREVO_SMTP_PASSWORD,
    },
  });
  return cachedTransporter;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  return transporter().sendMail({
    from: FROM,
    to,
    subject,
    html,
    replyTo,
  });
}
