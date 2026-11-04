import Link from "next/link";
import Image from "next/image";
import { Heart, CreditCard, Shield, Truck } from "lucide-react";

const footerLinks = {
  tienda: [
    { name: "Etiopía Yirgacheffe", href: "/producto/etiopia" },
    { name: "Kenia Nyeri", href: "/producto/kenia" },
    { name: "Uganda Mbale", href: "/producto/uganda" },
    { name: "Pack Degustación", href: "/producto/pack-degustacion" },
    { name: "Suscripción", href: "/producto/suscripcion" },
  ],
  marca: [
    { name: "Nosotros", href: "/nosotros" },
    { name: "Impacto", href: "/impacto" },
    { name: "Empresas", href: "/empresas" },
    { name: "Contacto", href: "/contacto" },
  ],
  legal: [
    { name: "Política de privacidad", href: "/privacidad" },
    { name: "Términos y condiciones", href: "/terminos" },
    { name: "Política de cookies", href: "/cookies" },
    { name: "Envíos y devoluciones", href: "/envios" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-fikir-brown text-fikir-cream">
      {/* Trust bar */}
      <div className="border-b border-fikir-cream/10">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-fikir-gold" />
              <span className="font-body text-xs text-fikir-cream/70">Envío 3-5 días · Gratis a partir de 50€</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-fikir-gold" />
              <span className="font-body text-xs text-fikir-cream/70">Tarjeta, Bizum</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-fikir-gold" />
              <span className="font-body text-xs text-fikir-cream/70">Pago 100% seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-fikir-gold" />
              <span className="font-body text-xs text-fikir-cream/70">100% del beneficio neto reinvertido</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block" aria-label="Fikir Café — Inicio">
              <Image
                src="/images/logo-transparente.png"
                alt="Fikir Café"
                width={560}
                height={843}
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-fikir-cream/70 max-w-xs">
              Café de especialidad sin ánimo de lucro. Todo el beneficio se reinvierte en proyectos para la infancia en origen.
            </p>
            <p className="mt-6 font-body text-sm italic text-fikir-gold">
              &ldquo;Café con impacto en su origen&rdquo;
            </p>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-fikir-cream mb-4">
              Tienda
            </h3>
            <ul className="space-y-3">
              {footerLinks.tienda.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-fikir-cream/70 transition-colors duration-200 hover:text-fikir-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marca */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-fikir-cream mb-4">
              Fikir
            </h3>
            <ul className="space-y-3">
              {footerLinks.marca.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-fikir-cream/70 transition-colors duration-200 hover:text-fikir-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-fikir-cream mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-fikir-cream/70 transition-colors duration-200 hover:text-fikir-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="font-body text-sm text-fikir-cream/70">
                hola@fikircafe.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-fikir-cream/10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="font-body text-xs text-fikir-cream/50">
            &copy; {new Date().getFullYear()} Fikir Coffee. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-fikir-cream/50 flex items-center gap-1">
            Hecho con <Heart className="h-3 w-3 text-fikir-gold fill-fikir-gold" /> para la infancia en origen
          </p>
        </div>
      </div>
    </footer>
  );
}
