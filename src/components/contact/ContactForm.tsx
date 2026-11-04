"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!form.nombre.trim() || !form.mensaje.trim()) {
      setErrorMsg("Nombre y mensaje son obligatorios.");
      setStatus("error");
      return;
    }
    if (!EMAIL_REGEX.test(form.email)) {
      setErrorMsg("Introduce un email válido.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error || "Ha ocurrido un error. Por favor inténtalo de nuevo.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact fetch error:", err);
      setErrorMsg("Ha ocurrido un error. Por favor inténtalo de nuevo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-fikir-cream rounded-2xl p-8 lg:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-fikir-green/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-fikir-green" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-fikir-brown">¡Mensaje enviado!</h3>
        <p className="mt-2 font-body text-sm text-fikir-brown-light">
          Te responderemos en menos de 24 horas.
        </p>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <div className="bg-fikir-cream rounded-2xl p-8 lg:p-12">
      <h2 className="font-heading text-2xl font-bold text-fikir-brown mb-8">
        Envíanos un mensaje
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="block font-body text-sm font-medium text-fikir-brown mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="contact-name"
              name="nombre"
              required
              value={form.nombre}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block font-body text-sm font-medium text-fikir-brown mb-2">
              Email
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
              placeholder="tu@email.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" className="block font-body text-sm font-medium text-fikir-brown mb-2">
            Asunto
          </label>
          <select
            id="contact-subject"
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors cursor-pointer"
          >
            <option value="">Selecciona un tema</option>
            <option value="pedido">Sobre mi pedido</option>
            <option value="producto">Sobre el café</option>
            <option value="impacto">Sobre el impacto</option>
            <option value="empresa">Propuesta para empresas</option>
            <option value="colaborar">Quiero colaborar</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-message" className="block font-body text-sm font-medium text-fikir-brown mb-2">
            Mensaje
          </label>
          <textarea
            id="contact-message"
            name="mensaje"
            rows={5}
            required
            value={form.mensaje}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors resize-none"
            placeholder="Cuéntanos..."
          />
        </div>

        {status === "error" && errorMsg && (
          <p className="font-body text-sm text-red-600" role="alert">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-4 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar mensaje"}
        </button>
        <p className="font-body text-xs text-fikir-brown-light/60 text-center">
          Te respondemos en menos de 24 horas.
        </p>
      </form>
    </div>
  );
}
