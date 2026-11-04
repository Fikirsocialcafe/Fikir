import { NextRequest, NextResponse } from "next/server";
import { escapeHtml, getContactEmail } from "@/lib/brevo";
import { sendEmail } from "@/lib/email/sendEmail";

const SUBJECT_LABELS: Record<string, string> = {
  pedido: "Sobre mi pedido",
  producto: "Sobre el café",
  impacto: "Sobre el impacto",
  empresa: "Propuesta para empresas",
  colaborar: "Quiero colaborar",
  otro: "Otro",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, asunto, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son obligatorios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const safeNombre = escapeHtml(nombre);
    const safeEmail = escapeHtml(email);
    const safeMensaje = escapeHtml(mensaje);
    const subjectLabel = SUBJECT_LABELS[asunto] || escapeHtml(asunto || "Sin asunto");

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4A270D;">Nuevo mensaje de contacto</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #7B451D;">Nombre</td><td style="padding: 8px;">${safeNombre}</td></tr>
          <tr style="background: #FBF7F3;"><td style="padding: 8px; font-weight: bold; color: #7B451D;">Email</td><td style="padding: 8px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #7B451D;">Asunto</td><td style="padding: 8px;">${subjectLabel}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #F5F0EB; border-radius: 8px;">
          <strong style="color: #4A270D;">Mensaje:</strong>
          <p style="margin-top: 8px; white-space: pre-wrap; color: #444;">${safeMensaje}</p>
        </div>
      </div>
    `;

    await sendEmail({
      to: getContactEmail(),
      subject: "Nuevo mensaje de contacto - fikircafe.com",
      html,
      replyTo: email,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("contact API error:", err);
    return NextResponse.json(
      { error: "Ha ocurrido un error. Por favor inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
