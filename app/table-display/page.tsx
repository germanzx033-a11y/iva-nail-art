import type { Metadata } from "next";
import TabletopStandClient from "@/app/components/TabletopStandClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tabletop QR Acrylic Display Stand | IVA Nail Art NY — Bay Ridge Brooklyn",
  description:
    "Printable acrylic table stand for manicure stations with digital VIP loyalty pass and 5-star Google review QR codes.",
  alternates: {
    canonical: `${SITE_URL}/table-display`,
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

export default function TableDisplayPage() {
  return <TabletopStandClient lang="en" />;
}
