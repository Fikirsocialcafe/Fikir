"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CARD_METADATA, FALLBACK_CARD_META, type BrandColor } from "@/data/products";

interface ShopifyProductCardProps {
  handle: string;
  title: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string | null;
  priceAmount: string;
  priceCurrency: string;
  availableForSale: boolean;
  /**
   * First variant GID from Shopify. Provided when the product has a single
   * buyable option. Subscription products should link to their PDP instead.
   */
  defaultVariantId: string | null;
  /** Skip inline buy button and only show "Ver detalles" (e.g. for products that need a PDP selector). */
  detailsOnly?: boolean;
}

const brandBg: Record<BrandColor, string> = {
  green: "bg-fikir-green",
  terracotta: "bg-fikir-terracotta",
  brown: "bg-fikir-brown",
  gold: "bg-fikir-gold",
};

// Local fallback imagery for products whose Shopify record has no featuredImage
// yet. Keeps the DOM img tag always rendered and the layout consistent.
const HANDLE_FALLBACK_IMAGE: Record<string, string> = {
  etiopia: "/images/etiopia-product.jpg",
  kenia: "/images/kenia-product.jpg",
  "pack-degustacion": "/images/etiopia-ficha.jpg",
  suscripcion: "/images/fikir-estanteria.jpg",
  "fikir-coffee-edicion-001": "/images/fikir-estanteria.jpg",
};
const DEFAULT_FALLBACK = "/images/fikir-estanteria.jpg";

function resolveImage(handle: string, shopifyUrl: string | null): string {
  if (shopifyUrl) return shopifyUrl;
  return HANDLE_FALLBACK_IMAGE[handle] || DEFAULT_FALLBACK;
}

function formatMoney(amount: string, currency: string): string {
  const n = Number(amount);
  try {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency}`;
  }
}

export default function ShopifyProductCard({
  handle,
  title,
  description,
  imageUrl,
  imageAlt,
  priceAmount,
  priceCurrency,
  availableForSale,
  defaultVariantId,
  detailsOnly = false,
}: ShopifyProductCardProps) {
  const { addToCart, loading } = useCart();
  const [error, setError] = useState<string | null>(null);

  async function handleBuy() {
    if (!defaultVariantId) return;
    setError(null);
    try {
      await addToCart(defaultVariantId, 1);
    } catch (err) {
      console.error("Add to cart error:", err);
      setError("No hemos podido añadir al carrito. Inténtalo de nuevo.");
    }
  }

  const canBuyInline = availableForSale && defaultVariantId && !detailsOnly;
  const resolvedImage = resolveImage(handle, imageUrl);
  const resolvedAlt = imageAlt || title;
  const meta = CARD_METADATA[handle] ?? FALLBACK_CARD_META;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-fikir-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 focus-within:shadow-xl">
      <Link
        href={`/producto/${handle}`}
        aria-label={`Ver ${title}`}
        className={`relative block aspect-[4/5] overflow-hidden ${brandBg[meta.brand]}`}
      >
        {meta.badge && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-fikir-brown/75 px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-wider text-fikir-cream backdrop-blur-md">
            {meta.badge}
          </span>
        )}
        {!availableForSale && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-fikir-brown/90 px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-wider text-fikir-cream">
            Agotado
          </span>
        )}
        <Image
          src={resolvedImage}
          alt={resolvedAlt}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 px-6 pb-6 pt-5">
        <Link
          href={`/producto/${handle}`}
          className="font-heading text-2xl font-semibold leading-tight text-fikir-brown transition-colors hover:text-fikir-green"
        >
          {title}
        </Link>

        <p className="font-body text-sm italic leading-snug text-fikir-brown-light">
          {meta.tagline}
        </p>

        {meta.notes.length > 0 ? (
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {meta.notes.map((note) => (
              <li
                key={note}
                className="rounded-full border border-fikir-cream-dark px-2.5 py-1 font-body text-[10.5px] font-medium uppercase tracking-wider text-fikir-brown-light"
              >
                {note}
              </li>
            ))}
          </ul>
        ) : description ? (
          <p className="mt-1 line-clamp-2 font-body text-sm leading-relaxed text-fikir-brown-light">
            {description}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-fikir-cream-dark pt-4">
          <span className="font-body text-xl font-semibold text-fikir-brown">
            {formatMoney(priceAmount, priceCurrency)}
          </span>
          {canBuyInline ? (
            <button
              type="button"
              onClick={handleBuy}
              disabled={loading}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-fikir-green px-4 py-2 font-body text-xs font-semibold uppercase tracking-wider text-fikir-cream transition-colors duration-200 hover:bg-fikir-green-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {loading ? "..." : "Añadir"}
            </button>
          ) : (
            <Link
              href={`/producto/${handle}`}
              className="font-body text-xs font-semibold uppercase tracking-wider text-fikir-green transition-transform duration-300 hover:translate-x-1"
            >
              Ver café <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        {error && (
          <p className="mt-1 font-body text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </article>
  );
}
