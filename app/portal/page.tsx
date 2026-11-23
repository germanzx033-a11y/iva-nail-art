import type { Metadata } from "next";
import ClientPortalDashboard from "@/app/components/ClientPortalDashboard";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "VIP Client Portal & Refill Sanctuary | IVA Nail Art NY — Bay Ridge, Brooklyn",
  description:
    "Personal VIP client sanctuary portal for IVA Nail Art Brooklyn. Manage your nail profile, track loyalty stamps, access rewards, and auto-schedule builder gel refills.",
  alternates: {
    canonical: `${SITE_URL}/portal`,
    languages: {
      en: `${SITE_URL}/portal`,
      es: `${SITE_URL}/es/portal`,
      "x-default": `${SITE_URL}/portal`,
    },
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClientPortalPage() {
  return <ClientPortalDashboard lang="en" />;
}
