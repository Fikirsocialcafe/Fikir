import Link from "next/link";
import Image from "next/image";
import type { Product, BrandColor } from "@/data/products";
import { CARD_METADATA, FALLBACK_CARD_META } from "@/data/products";

const brandBg: Record<BrandColor, string> = {
  green: "bg-fikir-green",
  terracotta: "bg-fikir-terracotta",
  brown: "bg-fikir-brown",
  gold: "bg-fikir-gold",
};

export default function ProductCard({
  product,
  badge: badgeOverride,
}: {
  product: Product;
  badge?: string;
}) {
  const meta = CARD_METADATA[product.handle] ?? FALLBACK_CARD_META;
  const tagline = meta.tagline || product.profileHint;
  const notes = meta.notes.length ? meta.notes : product.flavorNotes;
  const badge = badgeOverride || meta.badge;

  return (
    <Link
      href={`/producto/${product.handle}`}
      aria-label={`Ver ${product.name}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-fikir-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:-translate-y-1 focus-visible:shadow-xl"
    >
      <div
        className={`relative aspect-[4/5] overflow-hidden ${brandBg[meta.brand]}`}
      >
        {badge && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-fikir-brown/75 px-3 py-1.5 font-body text-[11px] font-semibold uppercase tracking-wider text-fikir-cream backdrop-blur-md">
            {badge}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-6 pb-6 pt-5">
        <h3 className="font-heading text-2xl font-semibold leading-tight text-fikir-brown">
          {product.name}
        </h3>

        <p className="font-body text-sm italic leading-snug text-fikir-brown-light">
          {tagline}
        </p>

        {notes.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {notes.map((note) => (
              <li
                key={note}
                className="rounded-full border border-fikir-cream-dark px-2.5 py-1 font-body text-[10.5px] font-medium uppercase tracking-wider text-fikir-brown-light"
              >
                {note}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-fikir-cream-dark pt-4">
          <span className="font-body text-xl font-semibold text-fikir-brown">
            {product.price.toFixed(2).replace(".", ",")}&euro;
          </span>
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-fikir-green transition-transform duration-300 group-hover:translate-x-1">
            Ver café <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
