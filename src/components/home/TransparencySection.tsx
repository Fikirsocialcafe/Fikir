import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TransparencySection() {
  return (
    <section className="py-24 bg-fikir-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-sm font-semibold tracking-[0.25em] uppercase text-fikir-gold">
            Transparencia
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
            De cada 14,99€, ¿a dónde va?
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-fikir-brown-light">
            El 100% del beneficio neto —tras cubrir costes operativos— se reinvierte en proyectos para la infancia en origen.
          </p>
          <div className="mt-8">
            <Link
              href="/impacto#transparencia"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-fikir-green tracking-wide uppercase transition-colors duration-200 hover:text-fikir-green-light cursor-pointer"
            >
              Ver cómo se distribuye cada euro
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
