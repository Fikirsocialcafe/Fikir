import { NextRequest, NextResponse } from "next/server";
import {
  addCartLines,
  createCart,
  getCart,
  isShopifyConfigured,
  removeCartLines,
  updateCartDiscountCodes,
  updateCartLines,
  type CartLineInput,
} from "@/lib/shopify";

function configError() {
  return NextResponse.json({ error: "Shopify no está configurado" }, { status: 503 });
}

/** GET /api/cart?cartId=... — fetch an existing cart */
export async function GET(request: NextRequest) {
  if (!isShopifyConfigured()) return configError();
  const cartId = request.nextUrl.searchParams.get("cartId");
  if (!cartId) {
    return NextResponse.json({ error: "cartId requerido" }, { status: 400 });
  }
  try {
    const cart = await getCart(cartId);
    return NextResponse.json({ cart });
  } catch (err) {
    console.error("GET /api/cart error:", err);
    return NextResponse.json({ error: "No se pudo recuperar el carrito" }, { status: 502 });
  }
}

/**
 * POST /api/cart
 * Body: { action: "create" } |
 *       { action: "add", cartId?, lines: [{ merchandiseId, quantity, sellingPlanId? }] } |
 *       { action: "update", cartId, lines: [{ id, quantity }] } |
 *       { action: "remove", cartId, lineIds: [] } |
 *       { action: "discount", cartId, codes: [string] }
 */
export async function POST(request: NextRequest) {
  if (!isShopifyConfigured()) return configError();

  try {
    const body = await request.json();
    const action = body?.action;

    if (action === "create") {
      const cart = await createCart();
      return NextResponse.json({ cart });
    }

    if (action === "add") {
      const lines = body.lines as CartLineInput[] | undefined;
      if (!Array.isArray(lines) || lines.length === 0) {
        return NextResponse.json({ error: "lines requerido" }, { status: 400 });
      }
      let cartId: string | undefined = body.cartId;
      if (!cartId) {
        const newCart = await createCart();
        cartId = newCart?.id;
        if (!cartId) {
          return NextResponse.json({ error: "No se pudo crear el carrito" }, { status: 502 });
        }
      }
      const cart = await addCartLines(cartId, lines);
      return NextResponse.json({ cart });
    }

    if (action === "update") {
      const { cartId, lines } = body;
      if (!cartId || !Array.isArray(lines)) {
        return NextResponse.json({ error: "cartId y lines requeridos" }, { status: 400 });
      }
      const cart = await updateCartLines(cartId, lines);
      return NextResponse.json({ cart });
    }

    if (action === "remove") {
      const { cartId, lineIds } = body;
      if (!cartId || !Array.isArray(lineIds)) {
        return NextResponse.json({ error: "cartId y lineIds requeridos" }, { status: 400 });
      }
      const cart = await removeCartLines(cartId, lineIds);
      return NextResponse.json({ cart });
    }

    if (action === "discount") {
      const { cartId, codes } = body;
      if (!cartId || !Array.isArray(codes)) {
        return NextResponse.json({ error: "cartId y codes requeridos" }, { status: 400 });
      }
      const cart = await updateCartDiscountCodes(cartId, codes);
      return NextResponse.json({ cart });
    }

    return NextResponse.json({ error: "action no reconocida" }, { status: 400 });
  } catch (err) {
    console.error("POST /api/cart error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 502 });
  }
}
