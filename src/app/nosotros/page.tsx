import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Globe, Coffee, Sparkles, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "La historia de Fikir Coffee y su fundador Pablo Esteve Rozas. Café con propósito desde Etiopía y Kenia.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Sobre nosotros | Fikir Coffee",
    description: "La historia de Fikir Coffee y su fundador Pablo Esteve Rozas.",
    images: [{ url: "/images/fundador-pablo.jpg" }],
  },
};

const timeline = [
  {
    year: "2024",
    title: "La semilla",
    description:
      "Después de vivir en Kenia y Etiopía y trabajar en un orfanato en Meki, nace la idea: crear un café de especialidad donde todo el beneficio vuelva a los niños de las comunidades de origen.",
  },
  {
    year: "2024",
    title: "El primer viaje",
    description:
      "Viajamos a Etiopía y Kenia para encontrar los mejores granos. Cafés con puntuación SCA superior a 85, cultivados con métodos tradicionales por familias caficultoras.",
  },
  {
    year: "2025",
    title: "Las primeras bolsas",
    description:
      "Lanzamos las dos primeras referencias: Etiopía Yirgacheffe y Kenia Nyeri. Los primeros clientes se convierten en los primeros embajadores del proyecto.",
  },
  {
    year: "2025",
    title: "El impacto empieza",
    description:
      "Financiamos los primeros kits escolares en Yirgacheffe y los primeros programas educativos en Nyeri. El café empieza a cambiar vidas.",
  },
  {
    year: "2026",
    title: "Hoy: una comunidad que crece",
    description:
      "3 proyectos en marcha en Meki, Dokolo y Uganda, 3 comunidades apoyadas. Cada persona que elige Fikir se une a un movimiento donde el consumo consciente genera impacto real.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Autenticidad",
    description: "Sin greenwashing. Sin palabras vacías. Cada euro que decimos que va al origen, va al origen.",
  },
  {
    icon: Globe,
    title: "Transparencia",
    description: "Publicamos donde va cada euro. Creemos que la confianza se construye con hechos, no con promesas.",
  },
  {
    icon: Coffee,
    title: "Excelencia",
    description: "El impacto social no está reñido con la calidad. Nuestros cafés son excepcionales, porque el origen lo merece.",
  },
  {
    icon: Sparkles,
    title: "Propósito",
    description: "No somos un negocio que dona. Somos un proyecto social que vende café para financiar su misión.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero — split layout with community image */}
      <section className="bg-fikir-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 lg:min-h-[420px]">
          {/* Texto */}
          <div className="flex items-center px-6 py-12 lg:px-8 lg:pr-16 lg:py-16">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-fikir-gold">
                Sobre nosotros
              </p>
              <h1 className="mt-5 font-heading text-4xl font-medium leading-[1.05] text-fikir-brown sm:text-5xl lg:text-6xl">
                Fikir significa{" "}
                <em className="font-normal italic text-fikir-gold">amor</em>
              </h1>
              <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-fikir-brown-light sm:text-lg">
                En amharico, la lengua de Etiopía. Y eso es exactamente lo que
                ponemos en cada bolsa: amor por el café, por los niños que crecen
                donde se cultiva y por la idea de que las cosas se pueden hacer de
                otra manera.
              </p>
              <Link
                href="/impacto"
                className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-fikir-green px-7 py-4 font-body text-sm font-semibold uppercase tracking-wider text-fikir-cream transition duration-200 hover:-translate-y-0.5 hover:bg-fikir-brown"
              >
                Ver el impacto
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          {/* Imagen comunidad masai */}
          <div className="relative aspect-[4/5] lg:aspect-auto">
            <Image
              src="/images/nosotros-comunidad.jpg"
              alt="Mujeres de la comunidad masái con vestimenta tradicional"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-fikir-cream/30 lg:to-fikir-cream/40" />
          </div>
        </div>
      </section>

      {/* Foto documental — tostado */}
      <section className="relative h-72 overflow-hidden lg:h-96">
        <Image
          src="/images/nosotros-tostado.png"
          alt="Granos de café tostados saliendo de la tostadora con vapor"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-fikir-brown/45" />
        <div className="relative h-full flex items-center justify-center px-6">
          <p className="font-heading text-3xl font-medium text-fikir-cream text-center sm:text-4xl lg:text-5xl">
            Calidad que se{" "}
            <em className="font-normal italic text-fikir-gold">huele</em>
          </p>
        </div>
      </section>

      {/* Founder letter - NEW */}
      <section className="py-24 bg-fikir-cream-dark lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Founder photo placeholder */}
            <div className="w-32 h-32 rounded-full overflow-hidden mb-8 relative">
              <Image
                src="/images/fundador-pablo.jpg"
                alt="Pablo Esteve Rozas, fundador de Fikir Coffee"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <h2 className="font-heading text-3xl font-bold text-fikir-brown sm:text-4xl">
              Por qué existe Fikir
            </h2>
            <div className="mt-8 font-body text-base leading-relaxed text-fikir-brown-light text-left max-w-2xl space-y-4">
              <p>
                Fikir no empezó como un negocio. Empezó después de vivir en Kenia y Etiopía, de formar allí parte de mi vida y de trabajar en un orfanato en Meki durante dos años.
              </p>
              <p>
                Cuando volví, sentí que le debía algo a esas comunidades. No como caridad, sino como compromiso real. Fikir es mi forma de devolver: un proyecto donde <span className="font-semibold text-fikir-brown">todo el beneficio, literalmente todo,</span> va a proyectos para la infancia en las comunidades que me dieron tanto.
              </p>
              <p>
                Hoy, cada bolsa de Fikir apoya al orfanato en Meki y un nuevo proyecto con la Fundación Pablo Horstmann en Dokolo. Son lugares que conozco. Personas que conozco. No es un proyecto lejano. Es personal.
              </p>
              <p className="font-semibold text-fikir-brown">
                Gracias por ser parte de esto.
              </p>
            </div>
            <p className="mt-6 font-heading text-xl italic text-fikir-gold">
              &mdash; Pablo Esteve Rozas, fundador de Fikir Coffee
            </p>
            <a
              href="https://www.linkedin.com/in/pabloesteverozas/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-body text-sm text-fikir-brown-light hover:text-fikir-brown transition-colors cursor-pointer"
            >
              <ExternalLink className="h-4 w-4" />
              LinkedIn
            </a>

            {/* Partner */}
            <div className="mt-10 pt-8 border-t border-fikir-brown/10 flex items-center gap-4">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/images/logo-fph.png"
                  alt="Logo Fundación Pablo Horstmann"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <p className="font-body text-sm text-fikir-brown-light text-left">
                Colaboramos con la Fundación Pablo Horstmann en proyectos para la infancia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story / Timeline with dates */}
      <section className="py-24 bg-fikir-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Nuestra historia
            </h2>
          </div>

          <div className="mx-auto max-w-4xl">
            {timeline.map((item, index) => (
              <div
                key={item.title}
                className={`grid grid-cols-[minmax(96px,140px)_1fr] items-start gap-6 sm:gap-10 ${
                  index < timeline.length - 1 ? "pb-10 sm:pb-14" : ""
                }`}
              >
                <div className="relative flex h-full flex-col items-end">
                  <span className="font-heading text-[52px] font-light leading-none text-fikir-gold sm:text-[72px]">
                    {item.year}
                  </span>
                  {index < timeline.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mt-3 h-full w-px flex-1 bg-fikir-gold/25"
                    />
                  )}
                </div>
                <div className="pt-1 sm:pt-3">
                  <h3 className="font-heading text-2xl font-semibold text-fikir-brown sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-body text-base leading-relaxed text-fikir-brown-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-fikir-cream lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
              Lo que nos mueve
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
              Nuestros valores
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-2xl bg-fikir-white"
              >
                <div className="w-12 h-12 rounded-full bg-fikir-gold/10 flex items-center justify-center">
                  <value.icon className="h-5 w-5 text-fikir-gold" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-fikir-brown">
                  {value.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-fikir-brown-light">
                  {value.description}
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
            Únete al movimiento
          </h2>
          <p className="mt-4 font-body text-base text-fikir-cream/80 leading-relaxed">
            Cada taza de Fikir es un acto de amor hacia las comunidades que
            hacen posible tu café de cada mañana.
          </p>
          <Link
            href="/tienda"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-fikir-gold font-body text-sm font-semibold text-fikir-brown tracking-wide uppercase transition-all duration-200 hover:bg-fikir-gold-light cursor-pointer"
          >
            Únete al proyecto — desde 14,99€
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
