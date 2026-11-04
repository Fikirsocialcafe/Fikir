import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Información sobre el uso de cookies en Fikir Coffee.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Política de cookies" lastUpdated="Abril 2026">
      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos que se almacenan en tu dispositivo al visitar un sitio
        web. Nos permiten recordar tus preferencias y entender cómo se usa la web.
      </p>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Cookies que utilizamos</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Técnicas</strong>: imprescindibles para el funcionamiento del carrito y el
          checkout (Shopify).
        </li>
        <li>
          <strong>Analíticas</strong>: Google Analytics (anonimizadas) para medir uso agregado.
        </li>
        <li>
          <strong>Marketing</strong>: Meta Pixel, solo si das tu consentimiento explícito.
        </li>
      </ul>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Gestión de cookies</h2>
      <p>
        Puedes configurar tu navegador para rechazar o borrar cookies en cualquier momento. Las
        cookies técnicas son necesarias para completar compras.
      </p>
    </LegalLayout>
  );
}
