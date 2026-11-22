import type { Metadata } from "next";
import WinterCollectionClient from "@/app/components/WinterCollectionClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Winter & Holiday Nail Art Collection 2025/2026 | IVA Nail Art Brooklyn",
  description:
    "Explore the Winter Editorial Lookbook at IVA Nail Art in Bay Ridge, Brooklyn. Magnetic velvet cat-eye, molten liquid chrome ribbons, frosted champagne French, and Bordeaux glaze. Reserve your holiday set.",
  alternates: {
    canonical: `${SITE_URL}/winter-collection`,
    languages: {
      en: `${SITE_URL}/winter-collection`,
      es: `${SITE_URL}/es/winter-collection`,
      "x-default": `${SITE_URL}/winter-collection`,
    },
  },
  openGraph: {
    title: "Winter & Holiday Nail Art Collection 2025/2026 | IVA Nail Art Brooklyn",
    description:
      "Curated holiday and winter nail designs in Bay Ridge, Brooklyn. Unhurried 1-on-1 private studio appointments for festive galas, Christmas, and New Year's Eve.",
    url: `${SITE_URL}/winter-collection`,
    type: "website",
    siteName: "IVA Nail Art NY",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IVA Nail Art — Winter & Holiday Editorial Lookbook",
      },
    ],
  },
};

export default function WinterCollectionPage() {
  return <WinterCollectionClient lang="en" />;
}
