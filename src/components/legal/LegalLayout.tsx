import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-16 bg-fikir-white lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-sm text-fikir-green hover:underline mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
          <h1 className="font-heading text-4xl font-bold text-fikir-brown sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 font-body text-sm text-fikir-brown-light">
            Última actualización: {lastUpdated}
          </p>

          <div className="mt-10 p-6 rounded-2xl bg-fikir-cream border border-fikir-gold/20">
            <p className="font-body text-sm text-fikir-brown font-semibold mb-2">
              Política en construcción
            </p>
            <p className="font-body text-sm text-fikir-brown-light leading-relaxed">
              Estamos finalizando la redacción legal. Si mientras tanto necesitas información
              específica escríbenos a{" "}
              <a href="mailto:hola@fikircafe.com" className="text-fikir-green underline">
                hola@fikircafe.com
              </a>{" "}
              y te respondemos en menos de 24 horas laborables.
            </p>
          </div>

          <div className="mt-10 prose prose-sm font-body text-fikir-brown-light max-w-none">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
