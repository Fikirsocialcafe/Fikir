import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-fikir-cream pb-14 pt-10 sm:pb-20 sm:pt-14 lg:pb-28 lg:pt-20"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-fikir-gold">
            Café de especialidad · Sin ánimo de lucro
          </p>

          <h1
            id="hero-title"
            className="mt-5 font-heading text-5xl font-medium leading-[1.05] tracking-tight text-fikir-brown sm:text-6xl lg:text-[72px]"
          >
            Café que devuelve al origen
            <em className="mt-1 block font-normal italic text-fikir-gold">
              todo lo que puede.
            </em>
          </h1>

          <p className="mt-6 max-w-[52ch] font-body text-base leading-relaxed text-fikir-brown-light sm:text-lg">
            De cada bolsa que compras, el{" "}
            <strong className="font-semibold text-fikir-brown">
              100% del beneficio neto
            </strong>{" "}
            financia proyectos para la infancia en Etiopía y Kenia. Sin
            intermediarios. Sin greenwashing.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/tienda"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-fikir-green px-7 py-4 font-body text-sm font-semibold uppercase tracking-wider text-fikir-cream transition duration-200 hover:-translate-y-0.5 hover:bg-fikir-brown"
            >
              Empezar desde 14,99€
            </Link>
            <Link
              href="/impacto"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-fikir-brown/20 bg-transparent px-7 py-4 font-body text-sm font-semibold uppercase tracking-wider text-fikir-brown transition duration-200 hover:border-fikir-brown hover:bg-fikir-brown hover:text-fikir-cream"
            >
              Ver el proyecto en Meki
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 font-body text-[13px] font-medium text-fikir-brown-light/85">
            {["SCA 85+", "Envío en 3-5 días", "Proyectos reales en terreno"].map(
              (item) => (
                <li
                  key={item}
                  className="relative pl-[18px] before:absolute before:left-0 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-fikir-gold"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Media */}
        <figure className="relative order-1 overflow-hidden rounded-3xl shadow-[0_16px_40px_rgba(45,42,38,0.18)] lg:order-2">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/fundador-meki.jpg"
              alt="Pablo, fundador de Fikir, con niños del orfanato de Meki en Etiopía"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <figcaption className="absolute bottom-5 left-5 max-w-[70%] rounded-xl bg-fikir-brown/55 px-3.5 py-2.5 font-body text-[12px] font-medium leading-snug tracking-wide text-fikir-cream backdrop-blur-md">
            Pablo, fundador de Fikir, en el orfanato de Meki (Etiopía).
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
