import { NextRequest, NextResponse } from "next/server";
import { brevo, getOrCreateNewsletterListId } from "@/lib/brevo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, honeypot } = body;

    // Honeypot: real users leave it empty; bots fill it.
    if (honeypot) return NextResponse.json({ success: true }, { status: 200 });

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    if (!process.env.BREVO_API_KEY) {
      console.error("BREVO_API_KEY missing");
      return NextResponse.json({ error: "Servicio no configurado" }, { status: 500 });
    }

    const listId = await getOrCreateNewsletterListId();
    if (!listId) {
      return NextResponse.json(
        { error: "No hay lista de newsletter disponible" },
        { status: 500 }
      );
    }

    const normalized = email.trim().toLowerCase();

    const { status, data } = await brevo("/contacts", {
      method: "POST",
      body: JSON.stringify({
        email: normalized,
        listIds: [listId],
        attributes: { SOURCE: "newsletter-website" },
        updateEnabled: true,
      }),
    });

    const subscribed = status === 201 || status === 204;
    let alreadyExists = false;
    if (!subscribed) {
      const errBody = data as { code?: string; message?: string };
      if (errBody?.code === "duplicate_parameter") {
        alreadyExists = true;
      } else {
        console.error("Brevo subscribe failed:", status, errBody);
        return NextResponse.json(
          { error: "No se pudo completar la suscripción" },
          { status: 502 }
        );
      }
    }

    // Fire-and-forget welcome email for new subscribers only.
    if (!alreadyExists) {
      const origin = request.nextUrl.origin;
      fetch(`${origin}/api/send-welcome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalized }),
      }).catch((err) => console.error("send-welcome dispatch failed:", err));
    }

    return NextResponse.json({ success: true, alreadyExists }, { status: 200 });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
