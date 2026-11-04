"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  CheckCircle,
  Truck,
  Award,
  Repeat,
  Calendar,
  Pause,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import FaqAccordion from "@/components/product/FaqAccordion";
import type { SellingPlan } from "@/lib/shopify";

interface SuscripcionClientProps {
  variantId: string | null;
  sellingPlans: SellingPlan[];
  title: string;
  description: string;
  priceAmount: string;
  priceCurrency: string;
  imageUrl: string | null;
  imageAlt: string | null;
  availableForSale: boolean;
}

function formatMoney(amount: string, currency: string): string {
  const n = Number(amount);
  try {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency}`;
  }
}

export default function SuscripcionClient({
  variantId,
  sellingPlans,
  title,
  description,
  priceAmount,
  priceCurrency,
  imageUrl,
  imageAlt,
  availableForSale,
}: SuscripcionClientProps) {
  const [selectedPlanId, setSelectedPlanId] = useState(sellingPlans[0]?.id ?? "");
  const [buyError, setBuyError] = useState<string | null>(null);
  const { addToCart, loading } = useCart();

  async function handleSubscribeClick() {
    if (!variantId) {
      setBuyError(
        "La suscripción aún no está publicada en la tienda. Contáctanos y te damos de alta manualmente."
      );
      return;
    }
    if (sellingPlans.length > 0 && !selectedPlanId) {
      setBuyError("Elige una frecuencia antes de continuar.");
      return;
    }
    setBuyError(null);
    try {
      await addToCart(variantId, 1, selectedPlanId || undefined);
    } catch (err) {
      console.error("Subscription add error:", err);
      setBuyError("No hemos podido iniciar tu suscripción. Inténtalo de nuevo.");
    }
  }

  const heroImage = imageUrl ?? "/images/etiopia-lifestyle.jpg";

  return (
    <div className="pt-20 lg:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: title,
            description,
            image: heroImage,
            brand: { "@type": "Brand", name: "Fikir Coffee" },
            offers: {
              "@type": "Offer",
              price: priceAmount,
              priceCurrency,
              availability: availableForSale
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              url: "https://www.fikircafe.com/producto/suscripcion",
            },
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <nav className="flex items-center gap-2 font-body text-sm text-fikir-brown-light">
          <Link href="/tienda" className="hover:text-fikir-brown transition-colors">
            Tienda
          </Link>
          <span>/</span>
          <span className="text-fikir-brown font-medium">{title}</span>
        </nav>
      </div>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: image */}
            <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:min-h-[560px] bg-gradient-to-br from-fikir-brown to-fikir-brown/80">
              <Image
                src={heroImage}
                alt={imageAlt || title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                <span className="px-3 py-1.5 rounded-full bg-fikir-gold/90 font-body text-xs font-semibold text-fikir-brown">
                  Recomendada
                </span>
                {!availableForSale && (
                  <span className="px-3 py-1.5 rounded-full bg-fikir-brown/90 font-body text-xs font-semibold text-fikir-cream uppercase">
                    Agotado
                  </span>
                )}
              </div>
            </div>

            {/* Right: info */}
            <div className="py-4 lg:py-8">
              <h1 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
                {title}
              </h1>
              <p className="mt-2 font-body text-base text-fikir-brown-light">
                250g de café fresco cada mes · Cancela cuando quieras
              </p>
              <p className="mt-3 font-heading text-3xl font-bold text-fikir-brown">
                {formatMoney(priceAmount, priceCurrency)}
                <span className="ml-1 font-body text-base font-medium text-fikir-brown-light">
                  /envío
                </span>
              </p>

              <p className="mt-5 font-body text-base leading-relaxed text-fikir-brown-light">
                {description}
              </p>

              {/* Selling plan selector */}
              {sellingPlans.length > 0 ? (
                <div className="mt-8">
                  <p className="font-body text-sm font-semibold text-fikir-brown mb-3">
                    Elige frecuencia
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {sellingPlans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-3 rounded-lg border-2 font-body text-left transition-all duration-200 cursor-pointer ${
                          selectedPlanId === plan.id
                            ? "border-fikir-brown bg-fikir-brown text-fikir-cream"
                            : "border-fikir-brown/20 text-fikir-brown hover:border-fikir-brown/40"
                        }`}
                      >
                        <span className="block text-sm font-semibold">{plan.name}</span>
                        {plan.description && (
                          <span
                            className={`block text-xs mt-0.5 ${
                              selectedPlanId === plan.id
                                ? "text-fikir-cream/75"
                                : "text-fikir-brown-light"
                            }`}
                          >
                            {plan.description}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-6 font-body text-sm text-fikir-brown-light italic">
                  Suscríbete y recibe café fresco cada mes. La primera entrega sale en 24-48h
                  laborables.
                </p>
              )}

              {/* Perks */}
              <div className="mt-6 flex flex-col gap-2 p-4 rounded-xl bg-fikir-cream-dark/70">
                {[
                  { icon: Award, text: "Café de especialidad (SCA 85+) recién tostado" },
                  { icon: Truck, text: "Envío gratis todos los meses" },
                  { icon: Heart, text: "100% del beneficio al origen (Etiopía + Kenia)" },
                  { icon: Pause, text: "Pausa, modifica o cancela cuando quieras" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-fikir-green shrink-0" />
                    <span className="font-body text-sm text-fikir-brown-light">{item.text}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleSubscribeClick}
                disabled={loading || !availableForSale}
                className="mt-6 w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-fikir-gold hover:bg-fikir-gold-light font-body text-base font-semibold text-fikir-brown tracking-wide uppercase transition-colors duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="h-5 w-5" />
                {loading
                  ? "Activando..."
                  : `Suscribirse — ${formatMoney(priceAmount, priceCurrency)}`}
              </button>
              {buyError && (
                <p className="mt-3 font-body text-sm text-red-600" role="alert">
                  {buyError}
                </p>
              )}
              <p className="mt-2 font-body text-xs text-fikir-brown-light text-center">
                Sin permanencia · Cancela desde tu cuenta
              </p>

              {/* How it works */}
              <div className="mt-8">
                <h2 className="font-heading text-xl font-bold text-fikir-brown mb-4">
                  Cómo funciona
                </h2>
                <ol className="space-y-4">
                  {[
                    {
                      icon: Repeat,
                      title: "1. Elige tu frecuencia",
                      desc: "Elige cada cuánto quieres recibir tu café. Cambia cuando quieras desde tu cuenta.",
                    },
                    {
                      icon: Calendar,
                      title: "2. Recibe café fresco cada envío",
                      desc: "Tostamos en lotes pequeños y enviamos cuando toca. Llega en 3-5 días.",
                    },
                    {
                      icon: Pause,
                      title: "3. Pausa o cancela cuando quieras",
                      desc: "Sin letra pequeña. Pausa si te vas de viaje o cancela desde tu cuenta en un clic.",
                    },
                  ].map((step) => (
                    <li key={step.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-fikir-green/10 flex items-center justify-center shrink-0">
                        <step.icon className="h-5 w-5 text-fikir-green" />
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold text-fikir-brown">
                          {step.title}
                        </p>
                        <p className="mt-1 font-body text-sm text-fikir-brown-light">
                          {step.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* FAQ */}
              <div className="mt-8">
                <h3 className="font-heading text-lg font-bold text-fikir-brown mb-4">
                  Preguntas frecuentes
                </h3>
                <FaqAccordion
                  items={[
                    {
                      q: "¿Cuándo se realiza el cobro?",
                      a: "El primer cobro es al suscribirte. Los siguientes coinciden con cada envío según la frecuencia que elijas.",
                    },
                    {
                      q: "¿Cómo pauso o cancelo?",
                      a: "Desde tu cuenta en un clic. Puedes pausar el envío (por ejemplo si te vas de vacaciones) o cancelar sin penalización.",
                    },
                    {
                      q: "¿Puedo cambiar la frecuencia más adelante?",
                      a: "Sí. Puedes cambiar entre las frecuencias disponibles desde tu cuenta cuando quieras.",
                    },
                    {
                      q: "¿Grano o molido?",
                      a: "Tú decides. Puedes elegir grano o molido al suscribirte y cambiarlo en cualquier envío.",
                    },
                  ]}
                  defaultOpen={0}
                />
              </div>

              <Link
                href="/tienda"
                className="mt-8 inline-flex items-center gap-2 font-body text-sm text-fikir-green hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> Volver a la tienda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
