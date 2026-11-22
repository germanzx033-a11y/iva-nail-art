import type { Metadata } from "next";
import BridalLandingClient from "@/app/components/BridalLandingClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Uñas para Novias en Brooklyn | Manicura Nupcial Rusa y Builder Gel | IVA Nail Art",
  description:
    "Estudio privado de uñas para novias en Bay Ridge, Brooklyn. Manicura rusa en seco, builder gel duradero, glazed pearl y diseños a mano que duran toda tu luna de miel. Reserva en Calendly.",
  alternates: {
    canonical: `${SITE_URL}/es/bridal-nails-brooklyn`,
    languages: {
      en: `${SITE_URL}/bridal-nails-brooklyn`,
      es: `${SITE_URL}/es/bridal-nails-brooklyn`,
      "x-default": `${SITE_URL}/bridal-nails-brooklyn`,
    },
  },
  openGraph: {
    title: "Uñas para Novias en Brooklyn | Manicura Nupcial Rusa y Builder Gel | IVA Nail Art",
    description:
      "Atelier privado 1 a 1 para novias en Brooklyn. Sets de boda impecables con builder gel y manicura rusa de máxima duración.",
    url: `${SITE_URL}/es/bridal-nails-brooklyn`,
    type: "website",
    siteName: "IVA Nail Art NY",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IVA Nail Art — Uñas de Novia en Brooklyn",
      },
    ],
  },
};

export default function BridalNailsSpanishPage() {
  return <BridalLandingClient lang="es" />;
}
