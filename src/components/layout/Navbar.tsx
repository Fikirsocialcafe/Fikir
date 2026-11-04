"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Tienda", href: "/tienda" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Impacto", href: "/impacto" },
  { name: "Empresas", href: "/empresas" },
  { name: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, openCart } = useCart();
  const cartCount = cart?.totalQuantity ?? 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-fikir-cream/95 backdrop-blur-sm border-b border-fikir-gold/10">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Navegacion principal">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Fikir Café — Inicio">
            <Image
              src="/images/logo-transparente.png"
              alt="Fikir Café"
              width={560}
              height={843}
              priority
              className="h-12 w-auto lg:h-14"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-body text-sm font-medium text-fikir-brown-light tracking-wide uppercase transition-colors duration-200 hover:text-fikir-green"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart + mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openCart}
              className="relative p-2 text-fikir-brown transition-colors duration-200 hover:text-fikir-green cursor-pointer"
              aria-label={cartCount > 0 ? `Abrir carrito (${cartCount} artículos)` : "Abrir carrito"}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-fikir-green text-fikir-cream font-body text-[10px] font-bold leading-[1.1rem] text-center"
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="lg:hidden p-2 text-fikir-brown cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-fikir-gold/10 pb-6 pt-4">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-body text-base font-medium text-fikir-brown-light tracking-wide uppercase transition-colors duration-200 hover:text-fikir-green py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
