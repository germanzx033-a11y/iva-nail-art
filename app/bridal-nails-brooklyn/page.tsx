import type { Metadata } from "next";
import BridalLandingClient from "@/app/components/BridalLandingClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bespoke Bridal Nails Brooklyn | Wedding Russian Manicure & Builder Gel",
  description:
    "Luxury wedding nail artist in Bay Ridge, Brooklyn. Russian dry manicure, strengthening builder gel, glazed pearl, and bespoke bridal nail art that lasts through your honeymoon. Book on Calendly.",
  alternates: {
    canonical: `${SITE_URL}/bridal-nails-brooklyn`,
    languages: {
      en: `${SITE_URL}/bridal-nails-brooklyn`,
      es: `${SITE_URL}/es/bridal-nails-brooklyn`,
      "x-default": `${SITE_URL}/bridal-nails-brooklyn`,
    },
  },
  openGraph: {
    title: "Bespoke Bridal Nails Brooklyn | Wedding Russian Manicure & Builder Gel",
    description:
      "Exclusive 1-on-1 wedding nail studio in Bay Ridge, Brooklyn. Flawless builder gel overlays, glazed pearl, and couture bridal nail art. Guaranteed 3-4 week retention.",
    url: `${SITE_URL}/bridal-nails-brooklyn`,
    type: "website",
    siteName: "IVA Nail Art NY",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IVA Nail Art — Bespoke Bridal Nails in Brooklyn",
      },
    ],
  },
};

export default function BridalNailsPage() {
  return <BridalLandingClient lang="en" />;
}
