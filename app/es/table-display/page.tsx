import type { Metadata } from "next";
import TabletopStandClient from "@/app/components/TabletopStandClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Expositor QR Imprimible para Mesa de Manicura | IVA Nail Art NY — Bay Ridge Brooklyn",
  description:
    "Expositor acrílico de mesa imprimible con códigos QR para el Pase Digital VIP de Fidelización y reseñas en Google.",
  alternates: {
    canonical: `${SITE_URL}/es/table-display`,
    languages: {
      en: `${SITE_URL}/table-display`,
      es: `${SITE_URL}/es/table-display`,
      "x-default": `${SITE_URL}/table-display`,
    },
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TableDisplaySpanishPage() {
  return <TabletopStandClient lang="es" />;
}
