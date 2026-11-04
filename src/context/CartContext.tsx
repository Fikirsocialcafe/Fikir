"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Cart } from "@/lib/shopify";

const CART_ID_STORAGE_KEY = "fikir-cart-id";

interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    merchandiseId: string,
    quantity?: number,
    sellingPlanId?: string
  ) => Promise<void>;
  updateCartItem: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  applyDiscountCode: (code: string) => Promise<{ ok: boolean; applicable: boolean }>;
  clearDiscountCodes: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

async function postCart(body: object): Promise<Cart | null> {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Cart API ${res.status}`);
  const data = await res.json();
  return (data?.cart as Cart | null) ?? null;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedId = typeof window !== "undefined" ? localStorage.getItem(CART_ID_STORAGE_KEY) : null;
    if (!storedId) return;

    fetch(`/api/cart?cartId=${encodeURIComponent(storedId)}`)
      .then(async (res) => {
        if (!res.ok) {
          localStorage.removeItem(CART_ID_STORAGE_KEY);
          return;
        }
        const data = await res.json();
        if (data?.cart) {
          setCart(data.cart);
        } else {
          localStorage.removeItem(CART_ID_STORAGE_KEY);
        }
      })
      .catch(() => localStorage.removeItem(CART_ID_STORAGE_KEY));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (cart?.id) {
      localStorage.setItem(CART_ID_STORAGE_KEY, cart.id);
    }
  }, [cart?.id]);

  const addToCart = useCallback(
    async (merchandiseId: string, quantity = 1, sellingPlanId?: string) => {
      setLoading(true);
      try {
        const line: { merchandiseId: string; quantity: number; sellingPlanId?: string } = {
          merchandiseId,
          quantity,
        };
        if (sellingPlanId) line.sellingPlanId = sellingPlanId;
        const updated = await postCart({
          action: "add",
          cartId: cart?.id,
          lines: [line],
        });
        if (updated) setCart(updated);
        setIsOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const updateCartItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart?.id) return;
      setLoading(true);
      try {
        const updated = await postCart({
          action: "update",
          cartId: cart.id,
          lines: [{ id: lineId, quantity }],
        });
        if (updated) setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const removeFromCart = useCallback(
    async (lineId: string) => {
      if (!cart?.id) return;
      setLoading(true);
      try {
        const updated = await postCart({
          action: "remove",
          cartId: cart.id,
          lineIds: [lineId],
        });
        if (updated) setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const applyDiscountCode = useCallback(
    async (code: string) => {
      if (!cart?.id) return { ok: false, applicable: false };
      const trimmed = code.trim();
      if (!trimmed) return { ok: false, applicable: false };
      setLoading(true);
      try {
        const updated = await postCart({
          action: "discount",
          cartId: cart.id,
          codes: [trimmed],
        });
        if (updated) setCart(updated);
        const applicable = Boolean(
          updated?.discountCodes?.find(
            (d) => d.code.toLowerCase() === trimmed.toLowerCase() && d.applicable
          )
        );
        return { ok: true, applicable };
      } catch {
        return { ok: false, applicable: false };
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const clearDiscountCodes = useCallback(async () => {
    if (!cart?.id) return;
    setLoading(true);
    try {
      const updated = await postCart({
        action: "discount",
        cartId: cart.id,
        codes: [],
      });
      if (updated) setCart(updated);
    } finally {
      setLoading(false);
    }
  }, [cart?.id]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      loading,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addToCart,
      updateCartItem,
      removeFromCart,
      applyDiscountCode,
      clearDiscountCodes,
    }),
    [cart, loading, isOpen, addToCart, updateCartItem, removeFromCart, applyDiscountCode, clearDiscountCodes]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
