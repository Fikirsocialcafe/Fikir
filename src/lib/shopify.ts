/**
 * Shopify Storefront API client for Fikir Coffee.
 *
 * Uses the public Storefront token (NEXT_PUBLIC_*), so these helpers can
 * run both in server components and in API route handlers.
 */

import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const SHOPIFY_STORE_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
  "";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_TOKEN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  "";

export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

let cachedClient: ReturnType<typeof createStorefrontApiClient> | null = null;

function client() {
  if (!isShopifyConfigured()) {
    throw new Error("Shopify is not configured");
  }
  if (!cachedClient) {
    cachedClient = createStorefrontApiClient({
      storeDomain: SHOPIFY_STORE_DOMAIN,
      // Shopify 2024-01 is already deprecated; 2025-07 is the current stable.
      apiVersion: "2025-07",
      publicAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    });
  }
  return cachedClient;
}

// --- Catalog ---------------------------------------------------------------

export interface ShopifyProductSummary {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
}

export async function getProducts(first = 20): Promise<ShopifyProductSummary[]> {
  const query = /* GraphQL */ `
    query Products($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            availableForSale
            featuredImage { url altText }
            priceRange {
              minVariantPrice { amount currencyCode }
            }
          }
        }
      }
    }
  `;
  const { data, errors } = await client().request<{
    products: { edges: { node: ShopifyProductSummary }[] };
  }>(query, { variables: { first } });
  if (errors) throw new Error(errors.message || "getProducts failed");
  return data?.products?.edges?.map((e) => e.node) ?? [];
}

export interface SellingPlan {
  id: string;
  name: string;
  description: string | null;
  recurringDeliveries: boolean;
}

export interface ShopifyProductDetail extends ShopifyProductSummary {
  images: { url: string; altText: string | null }[];
  variants: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: { amount: string; currencyCode: string };
  }[];
  sellingPlanGroups: {
    name: string;
    sellingPlans: SellingPlan[];
  }[];
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProductDetail | null> {
  const query = /* GraphQL */ `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        availableForSale
        featuredImage { url altText }
        priceRange { minVariantPrice { amount currencyCode } }
        images(first: 10) {
          edges { node { url altText } }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              price { amount currencyCode }
            }
          }
        }
        sellingPlanGroups(first: 5) {
          edges {
            node {
              name
              sellingPlans(first: 20) {
                edges {
                  node {
                    id
                    name
                    description
                    recurringDeliveries
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const { data, errors } = await client().request<{
    product: {
      id: string;
      handle: string;
      title: string;
      description: string;
      availableForSale: boolean;
      featuredImage: { url: string; altText: string | null } | null;
      priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
      images: { edges: { node: { url: string; altText: string | null } }[] };
      variants: {
        edges: {
          node: {
            id: string;
            title: string;
            availableForSale: boolean;
            price: { amount: string; currencyCode: string };
          };
        }[];
      };
      sellingPlanGroups: {
        edges: {
          node: {
            name: string;
            sellingPlans: { edges: { node: SellingPlan }[] };
          };
        }[];
      };
    } | null;
  }>(query, { variables: { handle } });

  if (errors) throw new Error(errors.message || "getProductByHandle failed");
  if (!data?.product) return null;

  const p = data.product;
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    availableForSale: p.availableForSale,
    featuredImage: p.featuredImage,
    priceRange: p.priceRange,
    images: p.images.edges.map((e) => e.node),
    variants: p.variants.edges.map((e) => e.node),
    sellingPlanGroups: p.sellingPlanGroups.edges.map((e) => ({
      name: e.node.name,
      sellingPlans: e.node.sellingPlans.edges.map((spe) => spe.node),
    })),
  };
}

// --- Cart ------------------------------------------------------------------

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string; handle: string };
    image?: { url: string; altText: string | null } | null;
    price: { amount: string; currencyCode: string };
  };
  sellingPlanAllocation?: { sellingPlan: { id: string; name: string } } | null;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
}

export interface CartDiscountCode {
  code: string;
  applicable: boolean;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: CartLine[];
  discountCodes: CartDiscountCode[];
}

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    discountCodes { code applicable }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          sellingPlanAllocation { sellingPlan { id name } }
          merchandise {
            ... on ProductVariant {
              id
              title
              product { title handle }
              image { url altText }
              price { amount currencyCode }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  }
`;

type RawCart = Omit<Cart, "lines"> & {
  lines: { edges: { node: CartLine }[] };
};

function normalizeCart(raw: RawCart | null | undefined): Cart | null {
  if (!raw) return null;
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    cost: raw.cost,
    discountCodes: raw.discountCodes ?? [],
    lines: raw.lines.edges.map((edge) => edge.node),
  };
}

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
  sellingPlanId?: string;
}

export async function createCart(): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartCreate {
      cartCreate {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;
  const { data, errors } = await client().request<{
    cartCreate: { cart: RawCart | null; userErrors: { message: string }[] };
  }>(query);
  if (errors) throw new Error(errors.message || "cartCreate failed");
  return normalizeCart(data?.cartCreate?.cart);
}

export async function addCartLines(
  cartId: string,
  lines: CartLineInput[]
): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;
  const { data, errors } = await client().request<{
    cartLinesAdd: { cart: RawCart | null; userErrors: { message: string }[] };
  }>(query, { variables: { cartId, lines } });
  if (errors) throw new Error(errors.message || "cartLinesAdd failed");
  return normalizeCart(data?.cartLinesAdd?.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;
  const { data, errors } = await client().request<{
    cartLinesUpdate: { cart: RawCart | null; userErrors: { message: string }[] };
  }>(query, { variables: { cartId, lines } });
  if (errors) throw new Error(errors.message || "cartLinesUpdate failed");
  return normalizeCart(data?.cartLinesUpdate?.cart);
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[]
): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;
  const { data, errors } = await client().request<{
    cartLinesRemove: { cart: RawCart | null; userErrors: { message: string }[] };
  }>(query, { variables: { cartId, lineIds } });
  if (errors) throw new Error(errors.message || "cartLinesRemove failed");
  return normalizeCart(data?.cartLinesRemove?.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
  `;
  const { data, errors } = await client().request<{ cart: RawCart | null }>(
    query,
    { variables: { cartId } }
  );
  if (errors) throw new Error(errors.message || "getCart failed");
  return normalizeCart(data?.cart);
}

export async function updateCartDiscountCodes(
  cartId: string,
  discountCodes: string[]
): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FRAGMENT}
    mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
      cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;
  const { data, errors } = await client().request<{
    cartDiscountCodesUpdate: {
      cart: RawCart | null;
      userErrors: { message: string }[];
    };
  }>(query, { variables: { cartId, discountCodes } });
  if (errors) throw new Error(errors.message || "cartDiscountCodesUpdate failed");
  return normalizeCart(data?.cartDiscountCodesUpdate?.cart);
}
