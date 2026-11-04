"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface PackButtonProps {
  variantId: string;
  label: string;
  className: string;
}

export default function PackButton({ variantId, label, className }: PackButtonProps) {
  const { addToCart, loading } = useCart();
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    try {
      await addToCart(variantId, 1);
    } catch (err) {
      console.error("Pack add error:", err);
      setError("No se pudo añadir al carrito. Inténtalo de nuevo.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`${className} disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {loading ? "Añadiendo..." : label}
        <ArrowRight className="h-4 w-4" />
      </button>
      {error && (
        <p className="mt-2 font-body text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
