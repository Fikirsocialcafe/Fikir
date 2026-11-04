import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones de compra en Fikir Coffee.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <LegalLayout title="Términos y condiciones" lastUpdated="Abril 2026">
      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Identificación</h2>
      <p>Fikir Coffee — proyecto sin ánimo de lucro. Contacto: hola@fikircafe.com.</p>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Objeto</h2>
      <p>
        Estas condiciones regulan la venta de café de especialidad y productos relacionados a
        través de fikircafe.com. El pago y gestión de pedidos se realiza mediante Shopify.
      </p>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Precios</h2>
      <p>
        Todos los precios están expresados en euros e incluyen IVA. Los gastos de envío se
        indican en el checkout antes de confirmar la compra.
      </p>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Derecho de desistimiento</h2>
      <p>
        Dispones de 14 días naturales desde la recepción del pedido para ejercer el derecho de
        desistimiento en los términos previstos por la legislación de consumo española, salvo en
        los supuestos excluidos por la ley.
      </p>
    </LegalLayout>
  );
}
