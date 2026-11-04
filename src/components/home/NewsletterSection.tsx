"use client";

import { useState } from "react";
import { Gift, CheckCircle, Heart, BookOpen } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!EMAIL_REGEX.test(email)) {
      setErrorMsg("Introduce un email válido.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error || "No hemos podido suscribirte. Inténtalo de nuevo.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      setErrorMsg("Error de conexión. Inténtalo de nuevo.");
      setStatus("error");
    }
  }

  return (
    <section className="py-24 bg-fikir-brown lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-fikir-gold/20 flex items-center justify-center mb-6">
            <Gift className="h-6 w-6 text-fikir-gold" />
          </div>

          <h2 className="font-heading text-4xl font-bold text-fikir-cream sm:text-5xl">
            Forma parte de Fikir
          </h2>
          <p className="mt-4 font-body text-lg leading-relaxed text-fikir-cream/80">
            Consigue un <span className="font-semibold text-fikir-gold">5% de descuento</span> y recibe historias reales del impacto que generas con cada taza.
          </p>

          {/* What you get */}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-6">
            {[
              { icon: Gift, text: "5% en tu primera compra" },
              { icon: BookOpen, text: "Historias reales de impacto" },
              { icon: Heart, text: "Novedades antes que nadie" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 justify-center">
                <item.icon className="h-4 w-4 text-fikir-gold shrink-0" />
                <span className="font-body text-sm text-fikir-cream/70">{item.text}</span>
              </div>
            ))}
          </div>

          {status === "success" ? (
            <div className="mt-8 flex items-center justify-center gap-3 p-4 rounded-lg bg-fikir-green/20">
              <CheckCircle className="h-5 w-5 text-fikir-gold" />
              <p className="font-body text-sm font-medium text-fikir-cream">
                Bienvenido/a a Fikir. Revisa tu email para tu descuento.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 max-w-lg mx-auto"
              noValidate
            >
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 px-5 py-4 rounded-lg border border-fikir-cream/20 bg-fikir-cream/10 font-body text-sm text-fikir-cream placeholder:text-fikir-cream/40 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
                aria-label="Tu email"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-4 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-gold-light shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Enviando..." : "Quiero mi descuento"}
              </button>
            </form>
          )}

          {status === "error" && errorMsg && (
            <p className="mt-4 font-body text-sm text-fikir-gold" role="alert">
              {errorMsg}
            </p>
          )}

          <p className="mt-4 font-body text-xs text-fikir-cream/40">
            Sin spam. Solo café, impacto y cosas que importan.
          </p>
        </div>
      </div>
    </section>
  );
}
