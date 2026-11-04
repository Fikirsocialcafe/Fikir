import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Envíos y devoluciones",
  description: "Política de envíos y devoluciones de Fikir Coffee.",
  alternates: { canonical: "/envios" },
  robots: { index: true, follow: true },
};

export default function EnviosPage() {
  return (
    <LegalLayout title="Envíos y devoluciones" lastUpdated="Abril 2026">
      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Plazos de envío</h2>
      <p>
        Preparamos los pedidos en 24-48 horas laborables. La entrega se realiza en 3-5 días
        laborables a cualquier punto de la España peninsular.
      </p>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Gastos de envío</h2>
      <p>
        Envío gratis en pedidos superiores a 50€. Por debajo, el coste se calcula según destino
        y se muestra en el checkout antes de confirmar.
      </p>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Devoluciones</h2>
      <p>
        Dispones de 14 días naturales desde la recepción para devolver cualquier producto sin
        abrir. Escríbenos a hola@fikircafe.com indicando tu número de pedido y te enviaremos las
        instrucciones para la devolución.
      </p>

      <h2 className="font-heading text-xl font-bold text-fikir-brown mt-8">Incidencias</h2>
      <p>
        Si tu pedido llega en mal estado o faltan productos, contáctanos en las 48 horas
        siguientes a la recepción y te lo solucionaremos.
      </p>
    </LegalLayout>
  );
}
