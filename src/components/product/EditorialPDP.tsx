"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, packs, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import FaqAccordion from "@/components/product/FaqAccordion";
import {
  ArrowRight,
  ShoppingBag,
  MapPin,
  Leaf,
  Award,
  Heart,
  CheckCircle,
  Clock,
  Truck,
  BookOpen,
  GraduationCap,
  Minus,
  Plus,
} from "lucide-react";

const MIN_QTY = 1;
const MAX_QTY = 10;

interface EditorialPDPProps {
  product: Product;
  /** Shopify live data, when available, overrides price/availability. */
  shopifyAvailable?: boolean;
  shopifyPrice?: { amount: string; currencyCode: string };
}

export default function EditorialPDP({ product, shopifyAvailable, shopifyPrice }: EditorialPDPProps) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(MIN_QTY);
  const [buyError, setBuyError] = useState<string | null>(null);
  const { addToCart, loading } = useCart();

  const available = shopifyAvailable !== false; // default to true if unknown
  const unitPrice = shopifyPrice ? Number(shopifyPrice.amount) : product.price;

  async function handleBuyClick() {
    if (!available) return;
    const shopifyVariantId = product.variants[selectedVariant].shopifyVariantId;
    if (!shopifyVariantId) {
      setBuyError("Este producto todavía no está disponible para comprar online. Contáctanos para hacer un pedido.");
      return;
    }
    setBuyError(null);
    try {
      await addToCart(shopifyVariantId, quantity);
    } catch (err) {
      console.error("Add to cart error:", err);
      setBuyError("No hemos podido añadir el producto al carrito. Inténtalo de nuevo.");
    }
  }

  const decrementQty = () => setQuantity((q) => Math.max(MIN_QTY, q - 1));
  const incrementQty = () => setQuantity((q) => Math.min(MAX_QTY, q + 1));

  const colorMap = {
    green: {
      bg: "bg-fikir-green",
      button: "bg-fikir-green hover:bg-fikir-green-light",
      accent: "text-fikir-green",
      dot: "bg-fikir-green",
      border: "border-fikir-green/20",
      lightBg: "bg-fikir-green/5",
      impactIcon: BookOpen,
    },
    terracotta: {
      bg: "bg-fikir-terracotta",
      button: "bg-fikir-terracotta hover:bg-fikir-terracotta-light",
      accent: "text-fikir-terracotta",
      dot: "bg-fikir-terracotta",
      border: "border-fikir-terracotta/20",
      lightBg: "bg-fikir-terracotta/5",
      impactIcon: GraduationCap,
    },
  };

  const colors = colorMap[product.color];
  const ImpactIcon = colors.impactIcon;

  // Lifestyle hero per origin. Uganda has no dedicated lifestyle shot yet,
  // so we fall back to the project documentary image.
  const lifestyleByHandle: Record<string, string> = {
    etiopia: "/images/etiopia-lifestyle.jpg",
    kenia: "/images/kenia-lifestyle.jpg",
    uganda: "/images/impacto-uganda.png",
  };
  const lifestyleImage = lifestyleByHandle[product.handle] ?? product.image;

  const galleryImages = [
    { src: product.image, alt: product.imageAlt },
    { src: lifestyleImage, alt: `Origen ${product.origin} — ${product.region}` },
    { src: "/images/etiopia-granos.jpg", alt: "Granos de café de especialidad Fikir" },
    { src: "/images/etiopia-tostador.jpg", alt: "Proceso de tueste artesanal" },
  ];

  return (
    <div className="pt-20 lg:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `Café ${product.name}`,
            description: product.description,
            image: `https://www.fikircafe.com${product.image}`,
            brand: { "@type": "Brand", name: "Fikir Coffee" },
            offers: {
              "@type": "Offer",
              price: unitPrice.toString(),
              priceCurrency: "EUR",
              availability: available
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
          <span className="text-fikir-brown font-medium">{product.name}</span>
        </nav>
      </div>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="relative rounded-3xl overflow-hidden aspect-square">
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  <span className="px-3 py-1.5 rounded-full bg-fikir-cream/15 backdrop-blur-sm font-body text-xs font-semibold text-fikir-cream">
                    Tostado en pequeños lotes
                  </span>
                  {!available && (
                    <span className="px-3 py-1.5 rounded-full bg-fikir-brown/90 font-body text-xs font-semibold text-fikir-cream uppercase">
                      Agotado
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img.src}
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
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12vw"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="py-4 lg:py-8">
              <h1 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
                Café {product.name}
              </h1>
              <p className="mt-2 font-body text-base text-fikir-brown-light">
                {product.region}, {product.origin} &middot; {product.weight}
              </p>
              <p className="mt-1 font-body text-sm italic text-fikir-brown-light/80">
                {product.profileHint}
              </p>
              <p className="mt-3 font-heading text-3xl font-bold text-fikir-brown">
                {unitPrice.toFixed(2).replace(".", ",")}&euro;
              </p>
              <p className="mt-1 font-body text-xs text-fikir-brown-light/70">
                IVA incluido · Envío gratis a partir de 50€
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {product.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="px-4 py-2 rounded-full bg-fikir-cream-dark font-body text-sm text-fikir-brown-light"
                  >
                    {note}
                  </span>
                ))}
              </div>

              <p className="mt-5 font-body text-base leading-relaxed text-fikir-brown-light">
                {product.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Origen</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.region}, {product.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Proceso</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.process}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Puntuación SCA</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.scaScore}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className={`h-5 w-5 ${colors.accent} shrink-0`} />
                  <div>
                    <p className="font-body text-xs text-fikir-brown-light uppercase">Tueste</p>
                    <p className="font-body text-sm font-medium text-fikir-brown">{product.roast}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="font-body text-sm font-semibold text-fikir-brown mb-3">Formato</p>
                <div className="flex gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(index)}
                      className={`px-6 py-3 rounded-lg border-2 font-body text-sm font-medium transition-all duration-200 cursor-pointer ${
                        selectedVariant === index
                          ? `border-fikir-brown bg-fikir-brown text-fikir-cream`
                          : `border-fikir-brown/20 text-fikir-brown hover:border-fikir-brown/40`
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
                <p className="mt-2 font-body text-xs text-fikir-brown-light/70 italic">
                  {product.variants[selectedVariant].helper}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2 p-4 rounded-xl bg-fikir-cream-dark/70">
                {[
                  { icon: Award, text: "Café de especialidad (SCA " + product.scaScore + ")" },
                  { icon: Truck, text: "Envío en 3-5 días · Gratis a partir de 50€" },
                  { icon: Heart, text: "100% del beneficio neto reinvertido" },
                  { icon: Leaf, text: "Packaging compostable" },
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
                disabled={loading || !available}
                className={`mt-4 w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg ${colors.button} font-body text-base font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                <ShoppingBag className="h-5 w-5" />
                {!available
                  ? "Agotado"
                  : loading
                    ? "Añadiendo..."
                    : `Comprar — ${(unitPrice * quantity).toFixed(2).replace(".", ",")}€`}
              </button>
              {buyError && (
                <p className="mt-3 font-body text-sm text-red-600" role="alert">
                  {buyError}
                </p>
              )}

              <div className={`mt-8 p-6 rounded-2xl ${colors.lightBg} border ${colors.border}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                    <ImpactIcon className="h-5 w-5 text-fikir-cream" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-fikir-brown">Impacto de este café</h3>
                    <p className={`font-body text-xs ${colors.accent} font-semibold uppercase tracking-wide`}>
                      {product.origin}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="font-body text-xs font-semibold text-fikir-brown-light uppercase w-20 shrink-0">Proyecto</span>
                    <span className="font-body text-sm text-fikir-brown">{product.impactProject}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-body text-xs font-semibold text-fikir-brown-light uppercase w-20 shrink-0">Financia</span>
                    <span className="font-body text-sm text-fikir-brown">{product.impactWhat}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-body text-xs font-semibold text-fikir-brown-light uppercase w-20 shrink-0">Beneficia</span>
                    <span className="font-body text-sm text-fikir-brown">{product.impactWho}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-body text-xs font-semibold text-fikir-brown-light uppercase w-20 shrink-0">Ubicación</span>
                    <span className="font-body text-sm text-fikir-brown">{product.impactLocation}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-body text-xs font-semibold text-fikir-brown-light uppercase w-20 shrink-0">Estado</span>
                    <span className="font-body text-sm text-fikir-brown flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Activo
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 rounded-2xl bg-fikir-white border border-fikir-brown/5">
                <h3 className="font-heading text-lg font-bold text-fikir-brown mb-3">La historia del origen</h3>
                <p className="font-body text-sm leading-relaxed text-fikir-brown-light">{product.story}</p>
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-lg font-bold text-fikir-brown mb-4">Preguntas frecuentes</h3>
                <FaqAccordion
                  items={[
                    {
                      q: "¿Cómo debo preparar este café?",
                      a: "Recomendamos cafetera italiana (moka), filtro, prensa francesa o AeroPress. Usa agua a 90-96°C y una proporción de 1:15 (café:agua).",
                    },
                    {
                      q: "¿Cuánto tiempo se conserva fresco?",
                      a: "Una vez abierto, consume en las 4-6 semanas siguientes para disfrutar de todo su aroma. Guárdalo en lugar fresco y seco, alejado de la luz.",
                    },
                    {
                      q: "¿Grano o molido?",
                      a: "Si tienes molinillo, el grano conserva mejor la frescura. Si no, nuestro molido es perfecto para cafetera italiana, filtro o prensa francesa.",
                    },
                  ]}
                  defaultOpen={0}
                />
              </div>
            </div>
          </div>

          <CrossSell currentHandle={product.handle} />
        </div>
      </section>
    </div>
  );
}

function CrossSell({ currentHandle }: { currentHandle: string }) {
  const pack = packs.find((p) => p.handle === "pack-degustacion");
  const otherOrigin = products.find(
    (p) => p.handle !== currentHandle && (p.handle === "etiopia" || p.handle === "kenia")
  );

  const suggestions: { href: string; image: string; imageAlt: string; label: string; title: string; description: string; price: number }[] = [];

  if (pack) {
    suggestions.push({
      href: `/producto/${pack.handle}`,
      image: pack.image,
      imageAlt: pack.name,
      label: "Pack Degustación",
      title: "¿Quieres probar los dos orígenes?",
      description: pack.description,
      price: pack.price,
    });
  }

  if (currentHandle === "kenia" && otherOrigin) {
    suggestions.push({
      href: `/producto/${otherOrigin.handle}`,
      image: otherOrigin.image,
      imageAlt: otherOrigin.imageAlt,
      label: otherOrigin.origin,
      title: `Prueba también nuestro café de ${otherOrigin.origin}`,
      description: otherOrigin.description,
      price: otherOrigin.price,
    });
  }

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-16 lg:mt-20">
      <h2 className="font-heading text-2xl font-bold text-fikir-brown mb-6 lg:text-3xl">
        También te puede interesar
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {suggestions.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-fikir-cream hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-fikir-white shrink-0">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 128px"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <p className="font-body text-xs font-semibold tracking-wide uppercase text-fikir-gold">
                {item.label}
              </p>
              <h3 className="mt-1 font-heading text-lg font-bold text-fikir-brown">
                {item.title}
              </h3>
              <p className="mt-1 font-body text-sm text-fikir-brown-light line-clamp-2">
                {item.description}
              </p>
              <div className="mt-auto pt-3 flex items-center justify-between">
                <span className="font-heading text-lg font-bold text-fikir-brown">
                  {item.price.toFixed(2).replace(".", ",")}€
                </span>
                <span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-fikir-green group-hover:gap-2 transition-all">
                  Ver pack
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
