import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de privacidad de Fikir Coffee — tratamiento de datos personales según RGPD.",
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Política de privacidad" lastUpdated="Abril 2026">
      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Responsable del tratamiento</h2>
      <p>Fikir Coffee · hola@fikircafe.com</p>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Finalidad</h2>
      <p>
        Recogemos tus datos únicamente para gestionar tu pedido, atender tu consulta y, si nos lo
        autorizas expresamente, enviarte nuestra newsletter con novedades sobre nuestros proyectos
        de impacto en origen.
      </p>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Base legal</h2>
      <p>
        Ejecución contractual para los pedidos, consentimiento expreso para la newsletter, e
        interés legítimo para responder a consultas.
      </p>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Derechos</h2>
      <p>
        Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y
        portabilidad en cualquier momento escribiéndonos a hola@fikircafe.com.
      </p>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Encargados del tratamiento</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Shopify Inc. — gestión de tienda y cobros.</li>
        <li>Brevo (Sendinblue) — envío de emails transaccionales y newsletter.</li>
        <li>Vercel Inc. — hosting del sitio web.</li>
      </ul>
    </LegalLayout>
  );
}
