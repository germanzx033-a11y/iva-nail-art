import type { Metadata } from "next";
import VIPClubClient from "@/app/components/VIPClubClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Sanctuary Circle VIP Club & Digital Loyalty Pass | IVA Nail Art Brooklyn",
  description:
    "Join The Sanctuary Circle at IVA Nail Art in Bay Ridge, Brooklyn. Digital stamp pass for builder gel refills, complimentary hand-painted nail art accents, and exclusive perks.",
  alternates: {
    canonical: `${SITE_URL}/vip-club`,
    languages: {
      en: `${SITE_URL}/vip-club`,
      es: `${SITE_URL}/es/vip-club`,
      "x-default": `${SITE_URL}/vip-club`,
    },
  },
  openGraph: {
    title: "The Sanctuary Circle VIP Club & Digital Loyalty Pass | IVA Nail Art Brooklyn",
    description:
      "Digital loyalty card for consistent builder gel refills in Bay Ridge, Brooklyn. Unlock complimentary luxury perks and priority bookings.",
    url: `${SITE_URL}/vip-club`,
    type: "website",
    siteName: "IVA Nail Art NY",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IVA Nail Art — The Sanctuary Circle VIP Pass",
      },
    ],
  },
};

export default function VIPClubPage() {
  return <VIPClubClient lang="en" />;
}
