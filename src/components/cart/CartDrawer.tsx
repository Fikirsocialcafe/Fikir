"use client";

import { useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, Tag, Coffee } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

function formatMoney(amount: string, currencyCode: string): string {
  const value = Number(amount);
  try {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currencyCode,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currencyCode}`;
  }
}

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    updateCartItem,
    removeFromCart,
    loading,
    applyDiscountCode,
    clearDiscountCodes,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponApplying, setCouponApplying] = useState(false);

  const activeCoupon = cart?.discountCodes?.find((d) => d.applicable)?.code;
  const rejectedCoupon = cart?.discountCodes?.find((d) => !d.applicable)?.code;

  async function handleApplyCoupon(e: React.FormEvent) {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;
    setCouponApplying(true);
    const { ok, applicable } = await applyDiscountCode(couponInput);
    setCouponApplying(false);
    if (!ok) {
      setCouponError("No hemos podido aplicar el código. Inténtalo de nuevo.");
      return;
    }
    if (!applicable) {
      setCouponError("Este código no es válido para tu carrito.");
      return;
    }
    setCouponInput("");
  }

  const subtotal = cart?.cost?.subtotalAmount;
  const total = cart?.cost?.totalAmount;
  const hasDiscount =
    Boolean(activeCoupon) &&
    subtotal &&
    total &&
    subtotal.amount !== total.amount;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-fikir-brown/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[95] h-full w-full max-w-md bg-fikir-cream shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Carrito"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-fikir-brown/10">
          <h2 className="font-heading text-xl font-bold text-fikir-brown">Tu carrito</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="p-1 text-fikir-brown-light hover:text-fikir-brown transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-full bg-fikir-gold/10 flex items-center justify-center mb-4">
                <ShoppingBag className="h-7 w-7 text-fikir-gold" />
              </div>
              <p className="font-heading text-lg font-bold text-fikir-brown">
                Tu carrito está vacío
              </p>
              <p className="mt-2 font-body text-sm text-fikir-brown-light">
                Descubre nuestros cafés de especialidad en la tienda.
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.lines.map((line) => {
                const img = line.merchandise.image;
                const variantTitle = line.merchandise.title;
                const showVariant = variantTitle && variantTitle !== "Default Title";
                const sellingPlanName = line.sellingPlanAllocation?.sellingPlan?.name;
                return (
                  <li key={line.id} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-fikir-cream-dark shrink-0">
                      {img?.url ? (
                        <Image
                          src={img.url}
                          alt={img.altText || line.merchandise.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="flex h-full w-full items-center justify-center"
                        >
                          <Coffee className="h-7 w-7 text-fikir-brown-light/50" strokeWidth={1.25} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-semibold text-fikir-brown truncate">
                        {line.merchandise.product.title}
                      </p>
                      {showVariant && (
                        <p className="font-body text-xs text-fikir-brown-light mt-0.5">
                          {variantTitle}
                        </p>
                      )}
                      {sellingPlanName && (
                        <p className="font-body text-xs text-fikir-green mt-0.5">
                          {sellingPlanName}
                        </p>
                      )}
                      <p className="mt-1 font-body text-sm font-medium text-fikir-brown">
                        {formatMoney(
                          line.cost.totalAmount.amount,
                          line.cost.totalAmount.currencyCode
                        )}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="inline-flex items-center border border-fikir-brown/20 rounded-md">
                          <button
                            type="button"
                            disabled={loading || line.quantity <= 1}
                            onClick={() => updateCartItem(line.id, line.quantity - 1)}
                            className="p-1.5 text-fikir-brown-light hover:text-fikir-brown disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            aria-label="Restar cantidad"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3 font-body text-sm text-fikir-brown tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={loading}
                            onClick={() => updateCartItem(line.id, line.quantity + 1)}
                            className="p-1.5 text-fikir-brown-light hover:text-fikir-brown disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                            aria-label="Sumar cantidad"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => removeFromCart(line.id)}
                          className="p-1 text-fikir-brown-light hover:text-red-600 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart && cart.lines.length > 0 && (
          <footer className="border-t border-fikir-brown/10 px-6 py-5 space-y-4">
            {/* Coupon */}
            <div>
              {activeCoupon ? (
                <div className="flex items-center justify-between rounded-lg bg-fikir-green/10 px-3 py-2">
                  <span className="flex items-center gap-2 font-body text-sm text-fikir-green font-semibold">
                    <Tag className="h-4 w-4" />
                    {activeCoupon}
                  </span>
                  <button
                    type="button"
                    onClick={clearDiscountCodes}
                    disabled={loading}
                    className="font-body text-xs text-fikir-brown-light hover:text-fikir-brown underline cursor-pointer disabled:opacity-40"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Código de descuento"
                    aria-label="Código de descuento"
                    className="flex-1 px-3 py-2 rounded-md border border-fikir-brown/20 bg-fikir-white font-body text-sm text-fikir-brown placeholder:text-fikir-brown-light/50 focus:outline-none focus:ring-2 focus:ring-fikir-gold/40"
                  />
                  <button
                    type="submit"
                    disabled={couponApplying || !couponInput.trim()}
                    className="px-4 py-2 rounded-md bg-fikir-brown font-body text-sm font-semibold text-fikir-cream hover:bg-fikir-brown-light transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {couponApplying ? "..." : "Aplicar"}
                  </button>
                </form>
              )}
              {couponError && (
                <p className="mt-1.5 font-body text-xs text-red-600" role="alert">
                  {couponError}
                </p>
              )}
              {!activeCoupon && rejectedCoupon && !couponError && (
                <p className="mt-1.5 font-body text-xs text-fikir-brown-light">
                  El código <span className="font-semibold">{rejectedCoupon}</span> no se puede aplicar a tu carrito.
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-1">
              {hasDiscount && subtotal && total && (
                <div className="flex items-center justify-between font-body text-sm text-fikir-brown-light">
                  <span>Subtotal</span>
                  <span className="line-through">
                    {formatMoney(subtotal.amount, subtotal.currencyCode)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-fikir-brown-light">Total</span>
                <span className="font-heading text-lg font-bold text-fikir-brown">
                  {total && formatMoney(total.amount, total.currencyCode)}
                </span>
              </div>
            </div>

            <p className="font-body text-xs text-fikir-brown-light">
              Impuestos y envío calculados en el checkout.
            </p>
            <a
              href={cart.checkoutUrl}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-fikir-green font-body text-sm font-semibold text-fikir-cream tracking-wide uppercase transition-colors duration-200 hover:bg-fikir-green-light cursor-pointer"
            >
              Ir al checkout
            </a>
          </footer>
        )}
      </aside>
    </>
  );
}
