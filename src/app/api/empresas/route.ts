import { NextRequest, NextResponse } from "next/server";
import { escapeHtml, getContactEmail } from "@/lib/brevo";
import { sendEmail } from "@/lib/email/sendEmail";

const SERVICE_LABELS: Record<string, string> = {
  oficina: "Café para oficina",
  regalo: "Regalos corporativos",
  rsc: "RSC y eventos",
  otro: "Otro",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { empresa, nombre, email, servicio, mensaje } = body;

    if (!nombre || !email) {
      return NextResponse.json(
        { error: "Nombre y email son obligatorios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const safeEmpresa = escapeHtml(empresa || "—");
    const safeNombre = escapeHtml(nombre);
    const safeEmail = escapeHtml(email);
    const safeMensaje = escapeHtml(mensaje || "—");
    const servicioLabel =
      SERVICE_LABELS[servicio] || escapeHtml(servicio || "No especificado");

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4A270D;">Nueva solicitud de empresa</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #7B451D;">Empresa</td><td style="padding: 8px;">${safeEmpresa}</td></tr>
          <tr style="background: #FBF7F3;"><td style="padding: 8px; font-weight: bold; color: #7B451D;">Contacto</td><td style="padding: 8px;">${safeNombre}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #7B451D;">Email</td><td style="padding: 8px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr style="background: #FBF7F3;"><td style="padding: 8px; font-weight: bold; color: #7B451D;">Servicio</td><td style="padding: 8px;">${servicioLabel}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #F5F0EB; border-radius: 8px;">
          <strong style="color: #4A270D;">Mensaje:</strong>
          <p style="margin-top: 8px; white-space: pre-wrap; color: #444;">${safeMensaje}</p>
        </div>
      </div>
    `;

    await sendEmail({
      to: getContactEmail(),
      subject: `Nueva solicitud de empresa - ${empresa || nombre} - fikircafe.com`,
      html,
      replyTo: email,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("empresas API error:", err);
    return NextResponse.json(
      { error: "Ha ocurrido un error. Por favor inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
