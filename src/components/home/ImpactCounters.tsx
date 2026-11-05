import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  DAYS_PER_BAG,
  MONTHLY_COST_PER_CHILD,
  NET_PROFIT_SHARE,
  VAT_RATE,
} from "@/lib/impact";

const stats = [
  {
    value: `${DAYS_PER_BAG} días`,
    label: "de comida y atención médica para un niño por cada bolsa",
  },
  {
    value: `${MONTHLY_COST_PER_CHILD} €`,
    label: "cubren la alimentación y la asistencia sanitaria de un niño durante un mes",
  },
  {
    value: "100%",
    label: "del beneficio neto se reinvierte en la infancia",
  },
  {
    value: "3",
    label: "proyectos en origen: Etiopía, Kenia y Uganda",
  },
];

export default function ImpactCounters() {
  return (
    <section
      aria-labelledby="impact-counters-title"
      className="bg-fikir-cream py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.25em] text-fikir-gold">
            Tu impacto
          </p>
          <h2
            id="impact-counters-title"
            className="mt-4 font-heading text-4xl font-bold text-fikir-brown sm:text-5xl"
          >
            Lo que hace tu bolsa de café
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-fikir-brown-light">
            Somos un negocio, y por eso funciona: cuanto más café vendemos, más
            niños comen y reciben atención médica.
          </p>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-fikir-white p-8 text-center"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p className="font-heading text-4xl font-bold text-fikir-green sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-fikir-brown-light">
                  {stat.label}
                </p>
              </dd>
            </div>
          ))}
        </dl>

        <details className="mx-auto mt-10 max-w-2xl rounded-xl border border-fikir-brown/10 bg-fikir-white/60 p-5 font-body text-sm text-fikir-brown-light">
          <summary className="cursor-pointer font-semibold text-fikir-brown">
            Cómo lo calculamos
          </summary>
          <p className="mt-3 leading-relaxed">
            Una bolsa de 250 g cuesta 14,99 € con IVA ({Math.round(VAT_RATE * 100)}%).
            Sin IVA son 13,63 €, y alrededor del {Math.round(NET_PROFIT_SHARE * 100)}%
            (unos 4,09 €) es beneficio neto tras pagar café verde, tueste,
            packaging y envío. Con {MONTHLY_COST_PER_CHILD} € al mes por niño,
            un día de comida y atención médica cuesta unos 0,27 €, así que cada
            bolsa cubre {DAYS_PER_BAG} días.
          </p>
          <Link
            href="/impacto#transparencia"
            className="mt-3 inline-flex items-center gap-2 font-semibold text-fikir-green hover:text-fikir-green-light"
          >
            Ver el reparto de cada euro
            <ArrowRight className="h-4 w-4" />
          </Link>
        </details>
      </div>
    </section>
  );
}
