import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  products as editorialProducts,
  packs,
  CARD_METADATA,
  TIENDA_ORDER,
} from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import ShopifyProductCard from "@/components/tienda/ShopifyProductCard";
import {
  getProducts,
  isShopifyConfigured,
  type ShopifyProductSummary,
} from "@/lib/shopify";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Compra café de especialidad: Etiopía Yirgacheffe y Kenia Nyeri, packs y suscripción mensual. Envío a toda España en 3-5 días.",
  alternates: { canonical: "/tienda" },
  openGraph: {
    title: "Tienda | Fikir Coffee",
    description:
      "Compra café de especialidad: Etiopía Yirgacheffe y Kenia Nyeri, packs y suscripción mensual.",
    images: [{ url: "/images/etiopia-product.jpg" }],
  },
};

// Revalidate Shopify catalog every 5 minutes in production.
export const revalidate = 300;

async function loadCatalog(): Promise<ShopifyProductSummary[]> {
  if (!isShopifyConfigured()) return [];
  try {
    return await getProducts(20);
  } catch (err) {
    console.error("loadCatalog error:", err);
    return [];
  }
}

function requiresPdpSelector(handle: string): boolean {
  // Subscription picks frequency + grano/molido on its PDP; always link there.
  return handle === "suscripcion";
}

export default async function TiendaPage() {
  // Editorial catalog (products.ts) is the source of truth for what shows
  // on /tienda. Shopify catalog is consulted only to overlay live price /
  // availability on the cards that match by handle. New origins (e.g.
  // Uganda) appear here even before they exist in Shopify, and stale
  // Shopify drafts (e.g. "Edición 001") never leak into the grid.
  const catalog = await loadCatalog();
  const shopifyByHandle = new Map(catalog.map((p) => [p.handle, p]));

  const packByHandle = new Map(packs.map((p) => [p.handle, p]));
  const editorialByHandle = new Map(editorialProducts.map((p) => [p.handle, p]));

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header — full-bleed hero with rebrand image */}
      <section className="relative isolate overflow-hidden bg-fikir-brown">
        <Image
          src="/images/tienda-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fikir-brown/70 via-fikir-brown/55 to-fikir-brown/85" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.25em] text-fikir-gold">
              Tienda
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold text-fikir-cream sm:text-5xl lg:text-6xl">
              Café con propósito
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-fikir-cream/85">
              Café de especialidad tostado en pequeños lotes. Cada bolsa financia
              proyectos para la infancia en comunidades cafetaleras.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {[
                "Envío 3-5 días · Gratis >50€",
                "100% del beneficio neto reinvertido",
                "Café tostado en pequeños lotes",
                "Desde SCA 80+",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-fikir-gold" />
                  <span className="font-body text-xs text-fikir-cream/85">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Unified product grid — ordered by TIENDA_ORDER */}
      <section className="bg-fikir-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {TIENDA_ORDER.map((handle) => {
              const editorial = editorialByHandle.get(handle);
              if (editorial) {
                // Origin coffees: editorial card. Shopify availability is
                // overlaid by EditorialPDP on the product page itself.
                return <ProductCard key={handle} product={editorial} />;
              }

              const pack = packByHandle.get(handle);
              if (pack) {
                const meta = CARD_METADATA[handle];
                const shopify = shopifyByHandle.get(handle);
                return (
                  <ShopifyProductCard
                    key={pack.id}
                    handle={pack.handle}
                    title={pack.name}
                    description={pack.description}
                    imageUrl={pack.image ?? null}
                    imageAlt={pack.name}
                    priceAmount={
                      shopify?.priceRange.minVariantPrice.amount ??
                      pack.price.toFixed(2)
                    }
                    priceCurrency={
                      shopify?.priceRange.minVariantPrice.currencyCode ??
                      pack.currency
                    }
                    availableForSale={shopify?.availableForSale ?? true}
                    defaultVariantId={null}
                    detailsOnly={requiresPdpSelector(pack.handle) || !meta}
                  />
                );
              }

              return null;
            })}
          </div>
        </div>
      </section>

      {/* Impact banner */}
      <section className="bg-fikir-green py-16 text-center lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-fikir-cream sm:text-4xl">
            Cada bolsa financia proyectos para la infancia en origen
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-fikir-cream/80">
            El 100% del beneficio neto —tras cubrir costes operativos— se reinvierte en proyectos para la infancia en origen. Sin intermediarios.
          </p>
          <Link
            href="/impacto"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-fikir-gold px-8 py-4 font-body text-sm font-semibold uppercase tracking-wide text-fikir-brown transition-all duration-200 hover:bg-fikir-gold-light"
          >
            Descubrir el impacto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
