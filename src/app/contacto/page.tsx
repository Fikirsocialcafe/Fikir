import type { Metadata } from "next";
import { Mail, MapPin, Clock, ChevronDown, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con Fikir Coffee. Preguntas frecuentes sobre envíos, productos, suscripciones y devoluciones.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Fikir Coffee",
    description: "Contacta con Fikir Coffee. Preguntas frecuentes sobre envíos y productos.",
  },
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hola@fikircafe.com",
    description: "Te respondemos en menos de 24h",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: "España",
    description: "Envíos a toda la península",
  },
  {
    icon: Clock,
    title: "Horario",
    value: "Lun - Vie, 9:00 - 18:00",
    description: "Hora peninsular",
  },
];

const faqs = [
  {
    question: "¿Cuánto tarda en llegar mi pedido?",
    answer: "Los pedidos se envían en 24-48h laborables y llegan en 3-5 días a cualquier punto de la península. Recibirás un email con el número de seguimiento.",
  },
  {
    question: "¿Cuál es la diferencia entre grano y molido?",
    answer: "El café en grano conserva mejor la frescura y el aroma. Recomendamos grano si tienes molinillo. El molido es perfecto para cafetera italiana (moka), filtro o prensa francesa.",
  },
  {
    question: "¿Cómo funciona la suscripción?",
    answer: "Recibes café fresco cada mes en tu puerta. Puedes elegir tu origen favorito, alternar entre los dos, y pausar o cancelar cuando quieras. Sin permanencia.",
  },
  {
    question: "¿De verdad todo el beneficio va al origen?",
    answer: "Si. Fikir es un proyecto sin ánimo de lucro. Después de cubrir costes operativos (café verde, tueste, packaging, envío), el 100% del beneficio se reinvierte en proyectos para la infancia en comunidades cafetaleras de Etiopía y Kenia.",
  },
  {
    question: "¿Hacéis regalos corporativos o para empresas?",
    answer: "Si. Ofrecemos packs personalizados para oficinas, eventos y regalos corporativos. Visita nuestra página de Empresas o escríbenos a hola@fikircafe.com.",
  },
  {
    question: "¿Qué métodos de pago aceptáis?",
    answer: "Aceptamos tarjeta de crédito/débito y Bizum. El pago se procesa de forma segura a través de Shopify Payments.",
  },
];

export default function ContactoPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="flex items-center bg-fikir-cream py-16 lg:min-h-[420px] lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-fikir-gold">
              Contacto
            </p>
            <h1 className="mt-5 font-heading text-4xl font-medium leading-[1.05] text-fikir-brown sm:text-5xl lg:text-6xl">
              Hablemos
            </h1>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-fikir-brown-light sm:text-lg">
              Tienes preguntas sobre nuestro café, nuestro impacto o quieres
              colaborar? Estamos aquí para ti.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section - NEW */}
      <section className="py-24 bg-fikir-cream lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Preguntas frecuentes
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-fikir-brown sm:text-4xl">
              Resolvemos tus dudas
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-fikir-white rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-body text-base font-medium text-fikir-brown pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className="h-5 w-5 text-fikir-brown-light shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 -mt-2">
                  <p className="font-body text-sm leading-relaxed text-fikir-brown-light">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="py-24 bg-fikir-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-24">
            {/* Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-3xl font-bold text-fikir-brown">
                Información de contacto
              </h2>
              <p className="mt-4 font-body text-base text-fikir-brown-light leading-relaxed">
                No has encontrado tu respuesta arriba? Escríbenos directamente.
              </p>

              <div className="mt-10 space-y-8">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-fikir-gold/10 flex items-center justify-center shrink-0">
                      <info.icon className="h-5 w-5 text-fikir-gold" />
                    </div>
                    <div>
                      <h3 className="font-body text-sm font-semibold text-fikir-brown">
                        {info.title}
                      </h3>
                      <p className="font-body text-base text-fikir-brown mt-0.5">
                        {info.value}
                      </p>
                      <p className="font-body text-xs text-fikir-brown-light mt-1">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <div className="mt-10 pt-8 border-t border-fikir-brown/10">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34697544210"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Escríbenos por WhatsApp
                </a>
                <p className="mt-2 font-body text-xs text-fikir-brown-light">
                  Respondemos en horario laboral (Lun-Vie 9:00-18:00)
                </p>
              </div>

              {/* Social */}
              <div className="mt-10 pt-8 border-t border-fikir-brown/10">
                <p className="font-body text-sm font-semibold text-fikir-brown mb-4">
                  Síguenos
                </p>
                <div className="flex gap-4">
                  {["Instagram", "TikTok", "LinkedIn"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="px-4 py-2 rounded-full bg-fikir-cream font-body text-xs font-medium text-fikir-brown-light hover:bg-fikir-cream-dark transition-colors cursor-pointer"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
