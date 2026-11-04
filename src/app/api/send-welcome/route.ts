import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/brevo";

const DEFAULT_COUPON = "FIKIR5";

/**
 * Sends the newsletter welcome email with the 5% discount coupon.
 * Uses the Brevo template when BREVO_WELCOME_TEMPLATE_ID is set,
 * otherwise falls back to inline HTML so subscribers still get a
 * usable email before the template is wired up in Brevo.
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    if (!process.env.BREVO_API_KEY) {
      console.error("BREVO_API_KEY missing");
      return NextResponse.json({ error: "Servicio no configurado" }, { status: 500 });
    }

    const templateId = process.env.BREVO_WELCOME_TEMPLATE_ID
      ? Number(process.env.BREVO_WELCOME_TEMPLATE_ID)
      : undefined;

    const { ok, status, data } = await sendEmail({
      to: { email },
      subject: "¡Bienvenido/a a Fikir! Aquí tienes tu 5% de descuento",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #444;">
          <div style="background: #4A270D; padding: 32px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #D4892A; margin: 0;">Fikir Coffee</h1>
          </div>
          <div style="padding: 32px; background: #FBF7F3;">
            <h2 style="color: #4A270D;">Bienvenido/a a la comunidad Fikir</h2>
            <p>Gracias por unirte. Aquí tienes tu 5% de descuento en tu primera compra:</p>
            <p style="text-align: center; font-size: 28px; font-weight: bold; color: #4A270D; letter-spacing: 0.1em; padding: 16px; background: #fff; border: 2px dashed #D4892A; border-radius: 8px;">${DEFAULT_COUPON}</p>
            <p style="text-align: center;">
              <a href="https://www.fikircafe.com/tienda" style="display:inline-block; padding:12px 24px; background:#2E6B3E; color:#FBF7F3; text-decoration:none; border-radius:8px; font-weight:600;">Empieza a comprar</a>
            </p>
            <p style="font-size: 12px; color: #aaa; margin-top: 24px;">Fikir Coffee · 100% del beneficio, 100% al origen.</p>
          </div>
        </div>
      `,
      templateId,
      params: templateId ? { coupon: DEFAULT_COUPON } : undefined,
    });

    if (ok) return NextResponse.json({ success: true }, { status: 200 });
    console.error("Welcome email failed:", status, data);
    return NextResponse.json(
      { error: "No se pudo enviar el email de bienvenida" },
      { status: 502 }
    );
  } catch (err) {
    console.error("send-welcome API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
