import type { Metadata } from "next";
import QRReviewClient from "@/app/components/QRReviewClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Review Your Experience | IVA Nail Art NY — Bay Ridge, Brooklyn",
  description:
    "Loved your luxury nail service at IVA Nail Art? Share your 5-star review on Google or send private feedback to Iva.",
  alternates: {
    canonical: `${SITE_URL}/qr-review`,
    languages: {
      en: `${SITE_URL}/qr-review`,
      es: `${SITE_URL}/es/qr-review`,
      "x-default": `${SITE_URL}/qr-review`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QRReviewPage() {
  return <QRReviewClient lang="en" />;
}
