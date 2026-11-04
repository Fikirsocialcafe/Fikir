"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import FaqAccordion from "@/components/product/FaqAccordion";
import {
  ArrowLeft,
  ShoppingBag,
  Award,
  Truck,
  Heart,
  CheckCircle,
  Minus,
  Plus,
} from "lucide-react";
import type { ShopifyProductDetail } from "@/lib/shopify";

const MIN_QTY = 1;
const MAX_QTY = 10;

function formatMoney(amount: string, currency: string) {
  const n = Number(amount);
  try {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency}`;
  }
}

interface ShopifyPDPProps {
  product: ShopifyProductDetail;
}

export default function ShopifyPDP({ product }: ShopifyPDPProps) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(MIN_QTY);
  const [buyError, setBuyError] = useState<string | null>(null);
  const { addToCart, loading } = useCart();

  const variant = product.variants[selectedVariantIdx] ?? product.variants[0];
  const variantAvailable = variant?.availableForSale ?? product.availableForSale;
  const unitPrice = variant?.price ?? product.priceRange.minVariantPrice;

  const images = product.images.length
    ? product.images
    : product.featuredImage
      ? [product.featuredImage]
      : [];

  async function handleBuyClick() {
    if (!variantAvailable || !variant) return;
    setBuyError(null);
    try {
      await addToCart(variant.id, quantity);
    } catch (err) {
      console.error("Add to cart error:", err);
      setBuyError("No hemos podido añadir el producto al carrito. Inténtalo de nuevo.");
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
            name: product.title,
            description: product.description,
            image: product.featuredImage?.url,
            brand: { "@type": "Brand", name: "Fikir Coffee" },
            offers: {
              "@type": "Offer",
              price: unitPrice.amount,
              priceCurrency: unitPrice.currencyCode,
              availability: variantAvailable
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              url: `https://www.fikircafe.com/producto/${product.handle}`,
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
          <span className="text-fikir-brown font-medium">{product.title}</span>
        </nav>
      </div>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:min-h-[560px] bg-fikir-cream">
                {images[selectedImage]?.url && (
                  <Image
                    src={images[selectedImage].url}
                    alt={images[selectedImage].altText || product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                )}
                {!variantAvailable && (
                  <span className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-fikir-brown/90 font-body text-xs font-semibold text-fikir-cream uppercase z-10">
                    Agotado
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {images.slice(0, 4).map((img, idx) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setSelectedImage(idx)}
                      aria-label={`Ver imagen ${idx + 1}`}
                      className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
                        selectedImage === idx
                          ? "ring-2 ring-fikir-gold ring-offset-2 ring-offset-fikir-cream"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={img.altText || product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="py-4 lg:py-8">
              <h1 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
                {product.title}
              </h1>
              <p className="mt-3 font-heading text-3xl font-bold text-fikir-brown">
                {formatMoney(unitPrice.amount, unitPrice.currencyCode)}
              </p>

              {product.description && (
                <p className="mt-5 font-body text-base leading-relaxed text-fikir-brown-light whitespace-pre-line">
                  {product.description}
                </p>
              )}

              {product.variants.length > 1 && (
                <div className="mt-8">
                  <p className="font-body text-sm font-semibold text-fikir-brown mb-3">Formato</p>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((v, index) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantIdx(index)}
                        disabled={!v.availableForSale}
                        className={`px-6 py-3 rounded-lg border-2 font-body text-sm font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                          selectedVariantIdx === index
                            ? `border-fikir-brown bg-fikir-brown text-fikir-cream`
                            : `border-fikir-brown/20 text-fikir-brown hover:border-fikir-brown/40`
                        }`}
                      >
                        {v.title}
                        {!v.availableForSale && " (agotado)"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2 p-4 rounded-xl bg-fikir-cream-dark/70">
                {[
                  { icon: Award, text: "Café de especialidad" },
                  { icon: Truck, text: "Envío en 3-5 días · Gratis a partir de 50€" },
                  { icon: Heart, text: "100% del beneficio reinvertido en origen" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-fikir-green shrink-0" />
                    <span className="font-body text-sm text-fikir-brown-light">{item.text}</span>
                  </div>
                ))}
              </div>

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
                  <span className="px-4 font-body text-base font-semibold text-fikir-brown tabular-nums" aria-live="polite">
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
                disabled={loading || !variantAvailable}
                className="mt-4 w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-fikir-green hover:bg-fikir-green-light font-body text-base font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="h-5 w-5" />
                {!variantAvailable
                  ? "Agotado"
                  : loading
                    ? "Añadiendo..."
                    : `Comprar — ${formatMoney(
                        (Number(unitPrice.amount) * quantity).toString(),
                        unitPrice.currencyCode
                      )}`}
              </button>
              {buyError && (
                <p className="mt-3 font-body text-sm text-red-600" role="alert">
                  {buyError}
                </p>
              )}

              <div className="mt-8">
                <h3 className="font-heading text-lg font-bold text-fikir-brown mb-4">
                  Preguntas frecuentes
                </h3>
                <FaqAccordion
                  items={[
                    {
                      q: "¿Cuánto tarda en llegar mi pedido?",
                      a: "Enviamos en 24-48h laborables. Llega en 3-5 días a cualquier punto de la península.",
                    },
                    {
                      q: "¿Qué métodos de pago aceptáis?",
                      a: "Aceptamos tarjeta de crédito/débito y Bizum. El pago se procesa de forma segura a través de Shopify Payments.",
                    },
                    {
                      q: "¿Cómo conservo el café fresco?",
                      a: "Una vez abierto, consume en las 4-6 semanas siguientes. Guárdalo en lugar fresco y seco, alejado de la luz.",
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
