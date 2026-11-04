import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Heart, Users, TrendingUp, Eye, Shield, Calendar, MapPin, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Impacto",
  description: "Conoce el impacto social de Fikir Coffee: proyectos en marcha en Meki (Etiopía), Dokolo (Kenia) y Dokolo (Uganda) para la infancia en comunidades cafeteras.",
  alternates: { canonical: "/impacto" },
  openGraph: {
    title: "Impacto | Fikir Coffee",
    description: "Conoce el impacto social de Fikir Coffee: proyectos en marcha en Meki, Dokolo (Kenia) y Dokolo (Uganda) para la infancia.",
    images: [{ url: "/images/impacto-recoleccion.png" }],
  },
};

type Project = {
  icon: React.ComponentType<{ className?: string }>;
  country: string;
  region: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  evidence: { date: string; text: string; location: string }[];
  color: string;
  accent: string;
  image: string;
  imageAlt: string;
  secondaryImage?: { src: string; alt: string };
  videoYoutubeId?: string;
  videoTitle?: string;
  partner?: { logo: string; logoAlt: string; description: string };
};

const projects: Project[] = [
  {
    icon: BookOpen,
    country: "Etiopía",
    region: "Meki",
    title: "Orfanato en Meki",
    description:
      "El fundador de Fikir vivió y trabajó en este orfanato en Meki durante dos años, seis meses de ellos en terreno. Esta conexión personal es el corazón de Fikir. Cada bolsa de Etiopía contribuye directamente a mejorar las condiciones de vida, el material educativo y las necesidades básicas de los niños que aquí crecen.",
    stats: [
      { value: "Proyecto activo", label: "" },
      { value: "Conexión directa", label: "" },
      { value: "Meki, Etiopía", label: "" },
    ],
    evidence: [
      { date: "2024-presente", text: "Apoyo continuo al orfanato donde el fundador vivió", location: "Meki, Etiopía" },
    ],
    color: "bg-fikir-green",
    accent: "text-fikir-green",
    image: "/images/meki-orfanato.jpg",
    imageAlt: "Orfanato en Meki, Etiopía",
    secondaryImage: { src: "/images/meki-grupo.jpg", alt: "Pablo con los niños del orfanato en Meki" },
  },
  {
    icon: Heart,
    country: "Kenia",
    region: "",
    title: "Fundación Pablo Horstmann",
    description:
      "Junto a la Fundación Pablo Horstmann, Fikir apoya el desarrollo de un nuevo proyecto para la infancia en Kenia. Un compromiso que nace de la experiencia directa del fundador en el país y de la relación con esta fundación de referencia en cooperación infantil.",
    stats: [
      { value: "En desarrollo", label: "" },
      { value: "Fundación Pablo Horstmann", label: "" },
      { value: "Kenia", label: "" },
    ],
    evidence: [
      { date: "2025-presente", text: "Desarrollo del proyecto infantil con Fundación Pablo Horstmann", location: "Kenia" },
    ],
    color: "bg-fikir-terracotta",
    accent: "text-fikir-terracotta",
    image: "/images/fundador-lalibela.jpg",
    imageAlt: "Pablo en Kenia",
    videoYoutubeId: "0HcMMGiaruw",
    videoTitle: "Proyecto Fikir en Dokolo con Fundación Pablo Horstmann",
    partner: {
      logo: "/images/logo-fph.png",
      logoAlt: "Logo Fundación Pablo Horstmann",
      description: "En colaboración con la Fundación Pablo Horstmann",
    },
  },
  {
    icon: BookOpen,
    country: "Uganda",
    region: "Dokolo",
    title: "Colegio de infantil y Primaria en Dokolo",
    description:
      "Impulsando este colegio de iniciativa comunitaria, queremos garantizar el derecho a una escolarización a los más vulnerables. Cada bolsa de Uganda apoya directamente a las familias de Dokolo a mantener este proyecto educativo en marcha.",
    stats: [
      { value: "En desarrollo", label: "" },
      { value: "Iniciativa comunitaria", label: "" },
      { value: "Dokolo, Uganda", label: "" },
    ],
    evidence: [
      { date: "2026-presente", text: "Apoyo al colegio comunitario de infantil y primaria", location: "Dokolo, Uganda" },
    ],
    color: "bg-fikir-gold",
    accent: "text-fikir-gold",
    image: "/images/impacto-uganda.png",
    imageAlt: "Proyecto educativo comunitario en Dokolo, Uganda",
    videoYoutubeId: "0HcMMGiaruw",
    videoTitle: "Colegio comunitario de infantil y primaria en Dokolo (Uganda)",
  },
];

const principles = [
  {
    icon: TrendingUp,
    title: "100% reinvertido",
    description:
      "No retenemos beneficios. Todo el excedente después de cubrir costes operativos se destina íntegramente a proyectos en origen.",
  },
  {
    icon: Eye,
    title: "Transparencia total",
    description:
      "Publicamos informes periódicos sobre a donde va cada euro. Creemos que la rendición de cuentas es la base de la confianza.",
  },
  {
    icon: Shield,
    title: "Relación directa",
    description:
      "Trabajamos directamente con cooperativas locales y organizaciones en terreno. Sin intermediarios que diluyan el impacto.",
  },
  {
    icon: Users,
    title: "Comunidad primero",
    description:
      "Los proyectos los eligen las comunidades, priorizando las necesidades de sus niños. No imponemos soluciones desde fuera, acompañamos sus propias prioridades.",
  },
];

export default function ImpactoPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero — full-bleed con foto documental */}
      <section className="relative isolate min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/images/impacto-recoleccion.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fikir-brown via-fikir-brown/55 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 lg:px-8 lg:pb-28">
          <div className="max-w-3xl">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-fikir-gold">
              Nuestro impacto
            </p>
            <h1 className="mt-5 font-heading text-4xl font-medium leading-[1.05] text-fikir-cream sm:text-5xl lg:text-6xl">
              Tu café{" "}
              <em className="font-normal italic text-fikir-gold">construye futuro</em>
            </h1>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-fikir-cream/85 sm:text-lg">
              El 100% del beneficio neto —tras cubrir costes operativos— se reinvierte en proyectos para la infancia en Etiopía, Kenia y Uganda.
            </p>
            <Link
              href="/tienda"
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-fikir-green px-7 py-4 font-body text-sm font-semibold uppercase tracking-wider text-fikir-cream transition duration-200 hover:-translate-y-0.5 hover:bg-fikir-gold hover:text-fikir-brown"
            >
              Comprar y aportar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Más que café */}
      <section className="py-20 bg-fikir-white lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Más que café, oportunidades reales
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-fikir-brown-light">
              Después de vivir en Kenia y Etiopía y formar allí parte de su vida, el fundador de Fikir sintió una deuda personal con estas comunidades. Fikir nace de esa conexión: no como un proyecto distante, sino como algo profundamente personal.
            </p>
          </div>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="py-16 bg-fikir-cream-dark lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "3", label: "Proyectos en marcha" },
              { value: "3", label: "Comunidades apoyadas" },
              { value: "100%", label: "Beneficio neto reinvertido" },
              { value: "85+", label: "Puntuación SCA" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-body text-sm text-fikir-brown-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects with evidence */}
      <section className="py-24 bg-fikir-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Proyectos en marcha
            </h2>
            <p className="mt-4 font-body text-lg text-fikir-brown-light">
              Cada café de Fikir está vinculado a un proyecto real y verificable.
            </p>
          </div>

          <div className="space-y-20">
            {projects.map((project) => (
              <div key={project.title}>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-16 items-start">
                  {/* Project image */}
                  <div className="rounded-3xl overflow-hidden lg:col-span-2 relative aspect-video lg:aspect-square">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-3 py-4">
                    <p className={`font-body text-xs font-semibold tracking-[0.2em] uppercase ${project.accent}`}>
                      {project.country}{project.region ? ` · ${project.region}` : ""}
                    </p>
                    <h3 className="mt-3 font-heading text-3xl font-bold text-fikir-brown">
                      {project.title}
                    </h3>
                    <p className="mt-4 font-body text-base leading-relaxed text-fikir-brown-light">
                      {project.description}
                    </p>

                    <div className="mt-8 grid grid-cols-3 gap-6">
                      {project.stats.map((stat, idx) => (
                        <div key={idx}>
                          <p className={`font-heading text-sm font-bold ${project.accent}`}>
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Evidence timeline */}
                    <div className="mt-8 border-t border-fikir-brown/10 pt-6">
                      <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-fikir-brown-light mb-4">
                        Últimas actualizaciones
                      </h4>
                      <div className="space-y-4">
                        {project.evidence.map((ev) => (
                          <div key={ev.date} className="flex gap-4">
                            <div className="w-10 h-10 rounded-lg bg-fikir-cream-dark flex items-center justify-center shrink-0">
                              <Camera className="h-4 w-4 text-fikir-brown-light" />
                            </div>
                            <div>
                              <p className="font-body text-sm text-fikir-brown font-medium">
                                {ev.text}
                              </p>
                              <div className="mt-1 flex items-center gap-3">
                                <span className="flex items-center gap-1 font-body text-xs text-fikir-brown-light">
                                  <Calendar className="h-3 w-3" /> {ev.date}
                                </span>
                                <span className="flex items-center gap-1 font-body text-xs text-fikir-brown-light">
                                  <MapPin className="h-3 w-3" /> {ev.location}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Media: secondary photo and/or YouTube embed + partner logo */}
                    {project.secondaryImage && (
                      <div className="mt-8 relative aspect-video rounded-2xl overflow-hidden">
                        <Image
                          src={project.secondaryImage.src}
                          alt={project.secondaryImage.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                      </div>
                    )}
                    {project.videoYoutubeId && (
                      <div className="mt-8">
                        <div className="relative aspect-video rounded-2xl overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${project.videoYoutubeId}`}
                            title={project.videoTitle ?? `Proyecto Fikir en ${project.region}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                        {project.partner && (
                          <div className="mt-4 flex items-center gap-3">
                            <div className="relative w-10 h-10 shrink-0">
                              <Image
                                src={project.partner.logo}
                                alt={project.partner.logoAlt}
                                fill
                                className="object-contain"
                                sizes="40px"
                              />
                            </div>
                            <p className="font-body text-xs text-fikir-brown-light">
                              {project.partner.description}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency section */}
      <section id="transparencia" className="py-24 bg-fikir-cream-dark lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Transparencia
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              De cada 14,99€, ¿a dónde va?
            </h2>
            <p className="mt-4 font-body text-lg text-fikir-brown-light">
              Este es nuestro modelo. Sin letra pequeña.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="bg-fikir-white rounded-2xl p-8">
                <p className="font-heading text-4xl font-bold text-fikir-brown-light">~10,50€</p>
                <p className="mt-2 font-body text-sm font-semibold text-fikir-brown">Costes operativos</p>
                <div className="mt-4 pt-4 border-t border-fikir-brown/10">
                  <p className="font-body text-xs text-fikir-brown-light leading-relaxed">
                    Café verde, tueste, packaging, envío, logística.
                  </p>
                </div>
              </div>
              <div className="bg-fikir-green rounded-2xl p-8">
                <p className="font-heading text-4xl font-bold text-fikir-cream">~4,50€</p>
                <p className="mt-2 font-body text-sm font-semibold text-fikir-cream">
                  Beneficio neto → 100% reinvertido
                </p>
                <div className="mt-4 pt-4 border-t border-fikir-cream/20">
                  <p className="font-body text-xs text-fikir-cream/80 leading-relaxed">
                    Proyectos para la infancia en Etiopía, Kenia y Uganda. Sin intermediarios.
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-6 font-body text-xs text-fikir-brown-light/70 text-center leading-relaxed">
              El &ldquo;100% del beneficio&rdquo; significa el 100% del excedente tras cubrir costes, no el
              100% del precio de venta. Desglose aproximado; publicaremos cifras reales auditadas a medida que crezcamos.
            </p>
          </div>
        </div>
      </section>

      {/* How the model works */}
      <section className="py-24 bg-fikir-cream lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Nuestro modelo
            </p>
            <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Por qué funciona
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="p-8 rounded-2xl bg-fikir-white"
              >
                <div className="w-12 h-12 rounded-full bg-fikir-gold/10 flex items-center justify-center">
                  <principle.icon className="h-5 w-5 text-fikir-gold" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-fikir-brown">
                  {principle.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-fikir-brown-light">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-fikir-green text-center lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-fikir-cream sm:text-4xl">
            Sé parte del cambio
          </h2>
          <p className="mt-4 font-body text-base text-fikir-cream/80 leading-relaxed">
            Con cada taza de Fikir, estás apoyando directamente a comunidades
            en Etiopía, Kenia y Uganda. Tu café de la mañana tiene más poder del
            que crees.
          </p>
          <Link
            href="/tienda"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-all duration-200 hover:bg-fikir-gold-light cursor-pointer"
          >
            Tu primera bolsa, tu primer impacto →
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
