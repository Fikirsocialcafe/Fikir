"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { packs, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import FaqAccordion from "@/components/product/FaqAccordion";
import {
  ArrowLeft,
  ShoppingBag,
  Coffee,
  Heart,
  CheckCircle,
  Truck,
  Award,
  BookOpen,
  GraduationCap,
  Minus,
  Plus,
} from "lucide-react";

const MIN_QTY = 1;
const MAX_QTY = 10;

export default function PackDegustacionClient() {
  const pack = packs.find((p) => p.handle === "pack-degustacion");
  const etiopia = products.find((p) => p.handle === "etiopia");
  const kenia = products.find((p) => p.handle === "kenia");

  const [quantity, setQuantity] = useState(MIN_QTY);
  const [buyError, setBuyError] = useState<string | null>(null);
  const { addToCart, loading } = useCart();

  if (!pack) return null;

  async function handleBuyClick() {
    if (!pack?.shopifyVariantId) {
      setBuyError("Este pack todavía no está disponible para comprar online. Contáctanos para hacer un pedido.");
      return;
    }
    setBuyError(null);
    try {
      await addToCart(pack.shopifyVariantId, quantity);
    } catch (err) {
      console.error("Add to cart error:", err);
      setBuyError("No hemos podido añadir el pack al carrito. Inténtalo de nuevo.");
    }
  }

  const decrementQty = () => setQuantity((q) => Math.max(MIN_QTY, q - 1));
  const incrementQty = () => setQuantity((q) => Math.min(MAX_QTY, q + 1));

  return (
    <div className="pt-20 lg:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: pack.name,
            description: pack.description,
            image: `https://www.fikircafe.com${pack.image}`,
            brand: { "@type": "Brand", name: "Fikir Coffee" },
            offers: {
              "@type": "Offer",
              price: pack.price.toString(),
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              url: `https://www.fikircafe.com/producto/${pack.handle}`,
            },
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <nav className="flex items-center gap-2 font-body text-sm text-fikir-brown-light">
          <Link href="/tienda" className="hover:text-fikir-brown transition-colors">
            Tienda
          </Link>
          <span>/</span>
          <span className="text-fikir-brown font-medium">{pack.name}</span>
        </nav>
      </div>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left: image */}
            <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:min-h-[560px] bg-gradient-to-br from-fikir-green to-fikir-terracotta flex items-center justify-center">
              <Image
                src={pack.image}
                alt={pack.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                <span className="px-3 py-1.5 rounded-full bg-fikir-gold/90 font-body text-xs font-semibold text-fikir-brown">
                  Ideal para empezar
                </span>
              </div>
            </div>

            {/* Right: info */}
            <div className="py-4 lg:py-8">
              <h1 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
                {pack.name}
              </h1>
              <p className="mt-2 font-body text-base text-fikir-brown-light">
                2 × 250g · Etiopía Yirgacheffe + Kenia Nyeri
              </p>
              <p className="mt-3 font-heading text-3xl font-bold text-fikir-brown">
                {pack.price.toFixed(2)}€
              </p>

              <p className="mt-5 font-body text-base leading-relaxed text-fikir-brown-light">
                {pack.description}
              </p>

              {/* What's inside */}
              <div className="mt-6 p-6 rounded-2xl bg-fikir-cream">
                <h2 className="font-heading text-lg font-bold text-fikir-brown mb-4">
                  Qué incluye
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Coffee className="h-5 w-5 text-fikir-green mt-0.5 shrink-0" />
                    <div>
                      <p className="font-body text-sm font-semibold text-fikir-brown">
                        1 bolsa de Café Etiopía
                      </p>
                      <p className="font-body text-xs text-fikir-brown-light">
                        Yirgacheffe, 250g · Notas florales y cítricas
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Coffee className="h-5 w-5 text-fikir-terracotta mt-0.5 shrink-0" />
                    <div>
                      <p className="font-body text-sm font-semibold text-fikir-brown">
                        1 bolsa de Café Kenia
                      </p>
                      <p className="font-body text-xs text-fikir-brown-light">
                        Nyeri, 250g · Notas de frutos rojos y cítrico
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Trust */}
              <div className="mt-6 flex flex-col gap-2 p-4 rounded-xl bg-fikir-cream-dark/70">
                {[
                  { icon: Award, text: "Café de especialidad (SCA 85+)" },
                  { icon: Truck, text: "Envío en 3-5 días · Gratis a partir de 50€" },
                  { icon: Heart, text: "100% del beneficio reinvertido en origen" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-fikir-green shrink-0" />
                    <span className="font-body text-sm text-fikir-brown-light">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Quantity */}
              <div className="mt-6 flex items-center gap-4">
                <p className="font-body text-sm font-semibold text-fikir-brown">Cantidad</p>
                <div className="inline-flex items-center border-2 border-fikir-brown/20 rounded-lg">
                  <button
                    type="button"
                    onClick={decrementQty}
                    disabled={quantity <= MIN_QTY}
                    aria-label="Restar cantidad"
                    className="p-2 text-fikir-brown-light hover:text-fikir-brown disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span
                    className="px-4 font-body text-base font-semibold text-fikir-brown tabular-nums"
                    aria-live="polite"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={incrementQty}
                    disabled={quantity >= MAX_QTY}
                    aria-label="Sumar cantidad"
                    className="p-2 text-fikir-brown-light hover:text-fikir-brown disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBuyClick}
                disabled={loading}
                className="mt-4 w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-fikir-green hover:bg-fikir-green-light font-body text-base font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="h-5 w-5" />
                {loading ? "Añadiendo..." : `Comprar — ${(pack.price * quantity).toFixed(2)}€`}
              </button>
              {buyError && (
                <p className="mt-3 font-body text-sm text-red-600" role="alert">
                  {buyError}
                </p>
              )}

              {/* Dual impact */}
              <div className="mt-8 p-6 rounded-2xl bg-fikir-white border border-fikir-brown/5">
                <h3 className="font-heading text-lg font-bold text-fikir-brown">
                  Doble impacto
                </h3>
                <p className="mt-2 font-body text-sm text-fikir-brown-light">
                  Este pack financia nuestros dos proyectos simultáneamente: infancia en Meki
                  (Etiopía) e infancia en Dokolo (Kenia).
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {etiopia && (
                    <div className="p-4 rounded-xl bg-fikir-green/5 border border-fikir-green/20">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-fikir-green flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-fikir-cream" />
                        </div>
                        <p className="font-body text-xs font-semibold uppercase text-fikir-green tracking-wide">
                          Etiopía
                        </p>
                      </div>
                      <p className="mt-2 font-heading text-sm font-bold text-fikir-brown">
                        {etiopia.impactProject}
                      </p>
                      <p className="mt-1 font-body text-xs text-fikir-brown-light">
                        {etiopia.impactLocation} · {etiopia.impactWho}
                      </p>
                    </div>
                  )}
                  {kenia && (
                    <div className="p-4 rounded-xl bg-fikir-terracotta/5 border border-fikir-terracotta/20">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-fikir-terracotta flex items-center justify-center">
                          <GraduationCap className="h-4 w-4 text-fikir-cream" />
                        </div>
                        <p className="font-body text-xs font-semibold uppercase text-fikir-terracotta tracking-wide">
                          Kenia
                        </p>
                      </div>
                      <p className="mt-2 font-heading text-sm font-bold text-fikir-brown">
                        {kenia.impactProject}
                      </p>
                      <p className="mt-1 font-body text-xs text-fikir-brown-light">
                        {kenia.impactLocation} · {kenia.impactWho}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* FAQ */}
              <div className="mt-8">
                <h3 className="font-heading text-lg font-bold text-fikir-brown mb-4">
                  Preguntas frecuentes
                </h3>
                <FaqAccordion
                  items={[
                    {
                      q: "¿Puedo elegir grano o molido?",
                      a: "Sí. Al añadir el pack al carrito, en el checkout podrás indicar tus preferencias. Por defecto, enviamos ambas bolsas en grano.",
                    },
                    {
                      q: "¿Es un buen regalo?",
                      a: "Perfecto. Es nuestra opción más regalada: una selección de dos orígenes con impacto social real. Podemos incluir una tarjeta personalizada bajo petición.",
                    },
                    {
                      q: "¿Tiempo de entrega?",
                      a: "Enviamos en 24-48h laborables y llega en 3-5 días a cualquier punto de la península.",
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
