export interface Product {
  id: string;
  handle: string;
  name: string;
  origin: string;
  region: string;
  price: number;
  currency: string;
  weight: string;
  process: string;
  scaScore: string;
  flavorNotes: string[];
  roast: string;
  variants: { id: string; name: string; helper: string; shopifyVariantId?: string }[];
  description: string;
  story: string;
  impact: string;
  impactProject: string;
  impactLocation: string;
  impactWhat: string;
  impactWho: string;
  profileHint: string;
  image: string;
  imageAlt: string;
  color: "green" | "terracotta";
}

export const products: Product[] = [
  {
    id: "etiopia-yirgacheffe",
    handle: "etiopia",
    name: "Etiopía",
    origin: "Etiopía",
    region: "Yirgacheffe",
    price: 14.99,
    currency: "EUR",
    weight: "250g",
    process: "Lavado",
    scaScore: "85+",
    flavorNotes: ["Floral", "Cítrico", "Bergamota"],
    roast: "Medio",
    variants: [
      {
        id: "etiopia-grano",
        name: "Grano",
        helper: "Máxima frescura. Ideal si tienes molinillo.",
        shopifyVariantId: "gid://shopify/ProductVariant/57707456921974",
      },
      {
        id: "etiopia-molido",
        name: "Molido",
        helper: "Listo para cafetera italiana, filtro o prensa francesa.",
        shopifyVariantId: "gid://shopify/ProductVariant/57707456954742",
      },
    ],
    description:
      "Café de especialidad de la región de Yirgacheffe, cuna del café. Notas florales delicadas con toques citricos y un final a bergamota que lo hacen único.",
    story:
      "Yirgacheffe es considerada la cuna del café. Aquí, a más de 1.800 metros de altitud, las familias caficultoras cultivan con métodos tradicionales que se transmiten de generación en generación. Cada grano lleva consigo siglos de tradición.",
    impact:
      "Este café contribuye directamente a mejorar la vida de niños en un orfanato en Meki, donde el fundador de Fikir convivió y trabajó durante años. Una conexión personal y real con el origen.",
    impactProject: "Orfanato en Meki",
    impactLocation: "Meki, Etiopía",
    impactWhat: "Mejora de condiciones, material educativo y necesidades básicas",
    impactWho: "Niños del orfanato donde el fundador vivió y trabajó",
    profileHint: "Ideal si te gustan los cafés suaves y florales",
    image: "/images/etiopia-product.png",
    imageAlt: "Bolsa de café Fikir Coffee Etiopía Yirgacheffe",
    color: "green",
  },
  {
    id: "kenia-nyeri",
    handle: "kenia",
    name: "Kenia",
    origin: "Kenia",
    region: "Nyeri",
    price: 14.99,
    currency: "EUR",
    weight: "250g",
    process: "Lavado",
    scaScore: "86+",
    flavorNotes: ["Grosella negra", "Frutos rojos", "Cítrico"],
    roast: "Medio",
    variants: [
      {
        id: "kenia-grano",
        name: "Grano",
        helper: "Máxima frescura. Ideal si tienes molinillo.",
        shopifyVariantId: "gid://shopify/ProductVariant/57707478024566",
      },
      {
        id: "kenia-molido",
        name: "Molido",
        helper: "Listo para cafetera italiana, filtro o prensa francesa.",
        shopifyVariantId: "gid://shopify/ProductVariant/57707478057334",
      },
    ],
    description:
      "Café de especialidad de la región de Nyeri. Un perfil vibrante con notas de grosella negra, frutos rojos y un final cítrico brillante.",
    story:
      "En las faldas del Monte Kenia, a más de 1.700 metros, los caficultores de Nyeri producen algunos de los cafes más complejos del mundo. El suelo volcánico y el clima templado crean condiciones perfectas para un café excepcional.",
    impact:
      "Este café apoya el desarrollo de un nuevo proyecto para la infancia junto a la Fundación Pablo Horstmann en Dokolo. Un compromiso real con las comunidades que hacen posible tu café.",
    impactProject: "Proyecto infantil con Fundación Pablo Horstmann",
    impactLocation: "Dokolo, Kenia",
    impactWhat: "Desarrollo infantil, educación y oportunidades",
    impactWho: "Niños en la comunidad de Dokolo",
    profileHint: "Ideal si prefieres intensidad y fruta",
    image: "/images/kenia-product.png",
    imageAlt: "Bolsa de café Fikir Coffee Kenia Nyeri",
    color: "terracotta",
  },
  {
    id: "uganda-mbale",
    handle: "uganda",
    name: "Uganda",
    origin: "Uganda",
    region: "Mbale",
    price: 14.99,
    currency: "EUR",
    weight: "250g",
    process: "Lavado",
    scaScore: "80+",
    flavorNotes: ["Chocolate", "Nuez", "Caramelo"],
    roast: "Medio",
    variants: [
      {
        id: "uganda-grano",
        name: "Grano",
        helper: "Máxima frescura. Ideal si tienes molinillo.",
                shopifyVariantId: "gid://shopify/ProductVariant/57777841308022",
      },
      {
        id: "uganda-molido",
        name: "Molido",
        helper: "Listo para cafetera italiana, filtro o prensa francesa.",
                shopifyVariantId: "gid://shopify/ProductVariant/57777841340790",
      },
    ],
    description:
      "Café de especialidad de la región de Mbale, en las faldas del Monte Elgon. Un perfil redondo con notas de chocolate negro, nuez tostada y un final suave a caramelo.",
    story:
      "En las laderas del Monte Elgon, los caficultores de Mbale cultivan arábica a más de 1.500 metros de altitud, en parcelas familiares que combinan café con cultivos alimentarios. Una tradición que combina patrimonio cafetero y biodiversidad.",
    impact:
      "Este café apoya un colegio comunitario de infantil y primaria en Dokolo (Uganda), garantizando el derecho a la escolarización a los más vulnerables.",
    impactProject: "Colegio de infantil y Primaria en Dokolo",
    impactLocation: "Dokolo, Uganda",
    impactWhat: "Impulsando este colegio de iniciativa comunitaria, queremos garantizar el derecho a una escolarización a los más vulnerables",
    impactWho: "Familias de Dokolo",
    profileHint: "Ideal si te gustan los cafés equilibrados con notas dulces",
    image: "/images/uganda-product.png",
    imageAlt: "Bolsa de café Fikir Coffee Uganda Mbale",
    color: "green",
  },
];

export type BrandColor = "green" | "terracotta" | "brown" | "gold";

export interface CardMeta {
  brand: BrandColor;
  tagline: string;
  notes: string[];
  badge?: string;
}

/**
 * Visual metadata keyed by product handle. Used by both the editorial
 * ProductCard and ShopifyProductCard so the grid reads as a single
 * system whether the catalog is served from Shopify or the static fallback.
 */
export const CARD_METADATA: Record<string, CardMeta> = {
  etiopia: {
    brand: "green",
    tagline: "Ideal si te gustan los cafés suaves y florales",
    notes: ["Floral", "Cítrico", "Bergamota"],
  },
  kenia: {
    brand: "terracotta",
    tagline: "Ideal si prefieres intensidad y fruta",
    notes: ["Grosella negra", "Frutos rojos", "Cítrico"],
  },
  uganda: {
    brand: "green",
    tagline: "Ideal si te gustan los cafés equilibrados con notas dulces",
    notes: ["Chocolate", "Nuez", "Caramelo"],
  },
  "pack-degustacion": {
    brand: "brown",
    tagline: "Los dos orígenes, una historia",
    notes: ["Etiopía + Kenia", "2 × 250g"],
  },
  suscripcion: {
    brand: "gold",
    tagline: "Café fresco cada mes, en tu puerta",
    notes: ["Grano o molido", "Pausa cuando quieras"],
    badge: "Más popular",
  },
};

export const FALLBACK_CARD_META: CardMeta = {
  brand: "green",
  tagline: "Café de especialidad",
  notes: [],
};

/** Preferred order on /tienda: origin products first, then pack, then subscription. */
export const TIENDA_ORDER = ["etiopia", "kenia", "uganda", "pack-degustacion", "suscripcion"];

export const packs = [
  {
    id: "pack-degustacion",
    handle: "pack-degustacion",
    name: "Pack Degustación",
    description: "Descubre los dos orígenes de Fikir. Incluye 1 bolsa de Etiopía + 1 bolsa de Kenia (250g cada una).",
    price: 27.99,
    currency: "EUR",
    image: "/images/pack-degustacion.png",
    shopifyVariantId: "gid://shopify/ProductVariant/57707504533878",
  },
  {
    id: "suscripcion-mensual",
    handle: "suscripcion",
    name: "Suscripción Mensual",
    description: "Recibe café fresco cada mes en tu puerta. Elige tu origen favorito o alterna entre los dos.",
    price: 12.99,
    currency: "EUR",
    image: "/images/suscripcion.png",
    note: "al mes",
    shopifyVariantId: "gid://shopify/ProductVariant/57707511611766",
  },
];
