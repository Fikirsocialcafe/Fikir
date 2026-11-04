import type { Metadata } from "next";
import { packs } from "@/data/products";
import { getProductByHandle, isShopifyConfigured, type SellingPlan } from "@/lib/shopify";
import SuscripcionClient from "./SuscripcionClient";

export const metadata: Metadata = {
  title: { absolute: "Suscripción Mensual de Café · Fikir Coffee" },
  alternates: { canonical: "/producto/suscripcion" },
};

// Force dynamic render so the page never depends on build-time network access.
// If the Shopify fetch fails at build (e.g. no egress during build) the static
// route would be skipped and /producto/suscripcion would fall through to
// /producto/[handle] which shows "Producto no encontrado".
export const dynamic = "force-dynamic";

const FALLBACK = packs.find((p) => p.handle === "suscripcion");
const SHOPIFY_HANDLES = ["suscripcion", "suscripcion-mensual"];

// Hard-coded selling plan fallback so the frequency picker still appears if
// the Shopify request fails or returns the product without selling plans.
const FALLBACK_SELLING_PLANS: SellingPlan[] = [
  {
    id: "gid://shopify/SellingPlan/712681357686",
    name: "Entrega cada mes",
    description: "Recibes tu café fresco cada mes. Pausa o cancela cuando quieras.",
    recurringDeliveries: true,
  },
];

export default async function SuscripcionPage() {
  let data = null;
  if (isShopifyConfigured()) {
    for (const handle of SHOPIFY_HANDLES) {
      try {
        data = await getProductByHandle(handle);
        if (data) break;
      } catch {
        // try next handle
      }
    }
  }

  if (data) {
    const variant = data.variants[0] ?? null;
    const shopifyPlans = data.sellingPlanGroups[0]?.sellingPlans ?? [];
    const plans = shopifyPlans.length > 0 ? shopifyPlans : FALLBACK_SELLING_PLANS;
    return (
      <SuscripcionClient
        variantId={variant?.id ?? FALLBACK?.shopifyVariantId ?? null}
        sellingPlans={plans}
        title={data.title}
        description={data.description || FALLBACK?.description || ""}
        priceAmount={data.priceRange.minVariantPrice.amount}
        priceCurrency={data.priceRange.minVariantPrice.currencyCode}
        imageUrl={data.featuredImage?.url ?? null}
        imageAlt={data.featuredImage?.altText ?? null}
        availableForSale={data.availableForSale}
      />
    );
  }

  // Fallback: Shopify unavailable → render with the static editorial data
  // plus the hard-coded monthly selling plan so subscriptions still work.
  return (
    <SuscripcionClient
      variantId={FALLBACK?.shopifyVariantId ?? null}
      sellingPlans={FALLBACK_SELLING_PLANS}
      title={FALLBACK?.name ?? "Suscripción Mensual"}
      description={FALLBACK?.description ?? ""}
      priceAmount={(FALLBACK?.price ?? 12.99).toFixed(2)}
      priceCurrency={FALLBACK?.currency ?? "EUR"}
      imageUrl={null}
      imageAlt={null}
      availableForSale={true}
    />
  );
}
