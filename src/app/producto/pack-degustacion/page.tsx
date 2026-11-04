import type { Metadata } from "next";
import PackDegustacionClient from "./PackDegustacionClient";

export const metadata: Metadata = {
  title: { absolute: "Pack Degustación Etiopía + Kenia · Fikir Coffee" },
  alternates: { canonical: "/producto/pack-degustacion" },
};

export default function PackDegustacionPage() {
  return <PackDegustacionClient />;
}
