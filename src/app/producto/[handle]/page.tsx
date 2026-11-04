import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProductByHandle, isShopifyConfigured } from "@/lib/shopify";
import EditorialPDP from "@/components/product/EditorialPDP";
import ShopifyPDP from "@/components/product/ShopifyPDP";

// Re-fetch each request so stock/price changes in Shopify show up immediately
// and new Shopify handles don't 404 because the static route wasn't regenerated.
export const dynamic = "force-dynamic";

const titleByHandle: Record<string, string> = {
  "etiopia": "Café Etiopía Yirgacheffe SCA 85+ · Fikir Coffee",
  "kenia": "Café Kenia Nyeri SCA 86+ · Fikir Coffee",
  "uganda": "Café Uganda Mbale SCA 80+ · Fikir Coffee",
  "pack-degustacion": "Pack Degustación Etiopía + Kenia · Fikir Coffee",
  "suscripcion": "Suscripción Mensual de Café · Fikir Coffee",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const title = titleByHandle[handle];
  if (!title) {
    return { title: "Producto" };
  }
  return {
    title: { absolute: title },
    alternates: { canonical: `/producto/${handle}` },
  };
}

interface PageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductoPage({ params }: PageProps) {
  const { handle } = await params;

  const editorial = products.find((p) => p.handle === handle);

  let shopifyProduct = null;
  if (isShopifyConfigured()) {
    try {
      shopifyProduct = await getProductByHandle(handle);
    } catch (err) {
      console.error(`getProductByHandle(${handle}) failed:`, err);
    }
  }

  if (editorial) {
    // Merge Shopify's live availability + price into the editorial layout so
    // the rich story page stays accurate without Shopify admin sync.
    return (
      <EditorialPDP
        product={editorial}
        shopifyAvailable={shopifyProduct?.availableForSale}
        shopifyPrice={shopifyProduct?.priceRange?.minVariantPrice}
      />
    );
  }

  if (shopifyProduct) {
    return <ShopifyPDP product={shopifyProduct} />;
  }

  notFound();
}
