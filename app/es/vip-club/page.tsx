import type { Metadata } from "next";
import VIPClubClient from "@/app/components/VIPClubClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sanctuary Circle Club VIP & Tarjeta de Lealtad Digital | IVA Nail Art Brooklyn",
  description:
    "Únete al Sanctuary Circle en IVA Nail Art (Bay Ridge, Brooklyn). Tarjeta digital de sellos para refills de builder gel, acentos de nail art de cortesía y beneficios exclusivos.",
  alternates: {
    canonical: `${SITE_URL}/es/vip-club`,
    languages: {
      en: `${SITE_URL}/vip-club`,
      es: `${SITE_URL}/es/vip-club`,
      "x-default": `${SITE_URL}/vip-club`,
    },
  },
  openGraph: {
    title: "Sanctuary Circle Club VIP & Tarjeta de Lealtad Digital | IVA Nail Art Brooklyn",
    description:
      "Programa digital de recompensas para clientas en Bay Ridge, Brooklyn. Acumula sellos en tus citas y disfruta de beneficios de lujo.",
    url: `${SITE_URL}/es/vip-club`,
    type: "website",
    siteName: "IVA Nail Art NY",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IVA Nail Art — Sanctuary Circle VIP Pass",
      },
    ],
  },
};

export default function VIPClubSpanishPage() {
  return <VIPClubClient lang="es" />;
}
