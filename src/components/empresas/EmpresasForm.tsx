"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmpresasForm() {
  const [form, setForm] = useState({
    empresa: "",
    nombre: "",
    email: "",
    servicio: "",
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

    if (!form.nombre.trim()) {
      setErrorMsg("El nombre es obligatorio.");
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
      const res = await fetch("/api/empresas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ empresa: "", nombre: "", email: "", servicio: "", mensaje: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error || "Ha ocurrido un error. Por favor inténtalo de nuevo.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Empresas fetch error:", err);
      setErrorMsg("Ha ocurrido un error. Por favor inténtalo de nuevo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-fikir-green/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-fikir-green" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-fikir-brown">¡Propuesta solicitada!</h3>
        <p className="mt-2 font-body text-sm text-fikir-brown-light">
          Te contactaremos en menos de 24 horas.
        </p>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block font-body text-sm font-medium text-fikir-brown mb-2">
            Empresa
          </label>
          <input
            type="text"
            id="company"
            name="empresa"
            value={form.empresa}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
            placeholder="Nombre de la empresa"
          />
        </div>
        <div>
          <label htmlFor="b2b-name" className="block font-body text-sm font-medium text-fikir-brown mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="b2b-name"
            name="nombre"
            required
            value={form.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
            placeholder="Tu nombre"
          />
        </div>
      </div>
      <div>
        <label htmlFor="b2b-email" className="block font-body text-sm font-medium text-fikir-brown mb-2">
          Email
        </label>
        <input
          type="email"
          id="b2b-email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors"
          placeholder="tu@empresa.com"
        />
      </div>
      <div>
        <label htmlFor="service" className="block font-body text-sm font-medium text-fikir-brown mb-2">
          Que te interesa
        </label>
        <select
          id="service"
          name="servicio"
          value={form.servicio}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors cursor-pointer"
        >
          <option value="">Selecciona una opción</option>
          <option value="oficina">Café para oficina</option>
          <option value="regalo">Regalos corporativos</option>
          <option value="rsc">RSC y eventos</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <label htmlFor="b2b-message" className="block font-body text-sm font-medium text-fikir-brown mb-2">
          Mensaje
        </label>
        <textarea
          id="b2b-message"
          name="mensaje"
          rows={4}
          value={form.mensaje}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-fikir-brown/10 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/50 focus:border-fikir-gold transition-colors resize-none"
          placeholder="Cuéntanos que necesitas..."
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
        {loading ? "Enviando..." : "Solicitar propuesta en 24h"}
      </button>
      <p className="font-body text-xs text-fikir-brown-light/60 text-center">
        Sin compromiso. Te respondemos en menos de 24 horas.
      </p>
    </form>
  );
}
