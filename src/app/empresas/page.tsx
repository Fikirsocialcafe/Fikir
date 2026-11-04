import type { Metadata } from "next";
import { Building2, Gift, Heart, Coffee, CheckCircle, ArrowRight, MessageSquare, Package, Sparkles } from "lucide-react";
import EmpresasForm from "@/components/empresas/EmpresasForm";

export const metadata: Metadata = {
  title: "Empresas",
  description: "Café de especialidad para empresas. Oficinas, regalos corporativos y eventos con impacto social incluido.",
  alternates: { canonical: "/empresas" },
  openGraph: {
    title: "Empresas | Fikir Coffee",
    description: "Café de especialidad para empresas. Servicio personalizado, impacto social incluido.",
  },
};

const services = [
  {
    icon: Building2,
    title: "Café para oficinas",
    description:
      "Lleva café de especialidad a tu oficina. Tus empleados disfrutarán de un café excepcional mientras tu empresa apoya proyectos sociales en origen.",
    features: [
      "Café de especialidad SCA 85+",
      "Suministro recurrente personalizado",
      "Grano o molido según tus necesidades",
      "Certificado de impacto social",
    ],
  },
  {
    icon: Gift,
    title: "Regalos corporativos",
    description:
      "Un regalo con significado. Packs personalizados de café de especialidad con la historia de impacto. Perfecto para clientes, partners y equipo.",
    features: [
      "Packs personalizados con tu marca",
      "Tarjeta con la historia de impacto",
      "Desde 25 unidades",
      "Opciones de grano, molido o mixto",
    ],
  },
  {
    icon: Heart,
    title: "RSC y eventos",
    description:
      "Asocia tu marca con un propósito real. Fikir puede ser parte de tu estrategia de responsabilidad social corporativa o de tus eventos de empresa.",
    features: [
      "Co-branding con impacto",
      "Informe de impacto personalizado",
      "Activaciones para eventos",
      "Charlas sobre café e impacto social",
    ],
  },
];

const process = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Entendemos tu necesidad",
    description: "Hablamos contigo para conocer qué buscas: café para oficina, regalos, eventos o RSC.",
  },
  {
    step: "02",
    icon: Package,
    title: "Diseñamos tu propuesta",
    description: "Te preparamos una propuesta personalizada con cantidades, formatos y branding adaptado.",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Entregamos café + impacto",
    description: "Recibes café excepcional y un certificado de impacto en la infancia para compartir con tu equipo.",
  },
];

export default function EmpresasPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="flex items-center bg-fikir-cream py-16 lg:min-h-[420px] lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-fikir-gold">
              Para empresas
            </p>
            <h1 className="mt-5 font-heading text-4xl font-medium leading-[1.05] text-fikir-brown sm:text-5xl lg:text-6xl">
              Café con propósito{" "}
              <em className="font-normal italic text-fikir-gold">para tu empresa</em>
            </h1>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-fikir-brown-light sm:text-lg">
              Café de especialidad que financia proyectos para la infancia en origen. Para tu
              oficina, tus clientes o tus eventos. Sin ánimo de lucro, con
              todo el sabor.
            </p>
            <a
              href="#contacto-b2b"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-fikir-green px-7 py-4 font-body text-sm font-semibold uppercase tracking-wider text-fikir-cream transition duration-200 hover:-translate-y-0.5 hover:bg-fikir-brown"
            >
              Solicitar propuesta en 24h
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-fikir-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-8 rounded-2xl bg-fikir-cream hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-fikir-gold/10 flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-fikir-gold" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-fikir-brown">
                  {service.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-fikir-brown-light">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-fikir-green mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-fikir-brown-light">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work - NEW process block */}
      <section className="py-24 bg-fikir-cream lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Proceso
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Cómo trabajamos
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {process.map((item) => (
              <div key={item.step} className="text-center p-8 rounded-2xl bg-fikir-white">
                <div className="mx-auto w-14 h-14 rounded-full bg-fikir-gold/10 flex items-center justify-center relative">
                  <item.icon className="h-6 w-6 text-fikir-gold" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-fikir-gold flex items-center justify-center font-body text-[10px] font-bold text-fikir-brown">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-fikir-brown">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm text-fikir-brown-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Fikir */}
      <section className="py-24 bg-fikir-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Por qué Fikir para tu empresa
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[
              { icon: Coffee, title: "Calidad SCA 85+", desc: "Café de especialidad, no café comercial" },
              { icon: Heart, title: "Sin ánimo de lucro", desc: "Tu compra financia la infancia en origen" },
              { icon: Building2, title: "RSC real", desc: "Certificado de impacto para tu empresa" },
              { icon: Gift, title: "Personalizable", desc: "Adaptamos el formato a tus necesidades" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-fikir-gold/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-fikir-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-fikir-brown">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm text-fikir-brown-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form with strong CTA */}
      <section id="contacto-b2b" className="py-24 bg-fikir-cream lg:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Empecemos
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Solicitar propuesta en 24h
            </h2>
            <p className="mt-4 font-body text-base text-fikir-brown-light">
              Cuéntanos que necesitas y te respondemos con una propuesta personalizada en menos de 24 horas.
            </p>
          </div>

          <EmpresasForm />
        </div>
      </section>
    </div>
  );
}
