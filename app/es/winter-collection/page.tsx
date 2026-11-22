import type { Metadata } from "next";
import WinterCollectionClient from "@/app/components/WinterCollectionClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colección Editorial de Invierno y Fiestas | IVA Nail Art Brooklyn",
  description:
    "Descubre los diseños de invierno y Año Nuevo en IVA Nail Art (Bay Ridge, Brooklyn). Terciopelo magnético velvet cat-eye, cromo dorado líquido, micro escarchas y rojo borgoña glaseado.",
  alternates: {
    canonical: `${SITE_URL}/es/winter-collection`,
    languages: {
      en: `${SITE_URL}/winter-collection`,
      es: `${SITE_URL}/es/winter-collection`,
      "x-default": `${SITE_URL}/winter-collection`,
    },
  },
  openGraph: {
    title: "Colección Editorial de Invierno y Fiestas | IVA Nail Art Brooklyn",
    description:
      "Diseños nupciales y festivos de invierno en South Brooklyn. Atención 1 a 1 sin prisas para cenas de gala, Navidad y Fin de Año.",
    url: `${SITE_URL}/es/winter-collection`,
    type: "website",
    siteName: "IVA Nail Art NY",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IVA Nail Art — Colección de Invierno y Fiestas",
      },
    ],
  },
};

export default function WinterCollectionSpanishPage() {
  return <WinterCollectionClient lang="es" />;
}
