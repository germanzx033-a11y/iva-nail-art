import type { Metadata } from "next";
import BuilderGelPage, { BUILDER_GEL_PATH } from "@/app/components/BuilderGelPage";

export const metadata: Metadata = {
  title: { absolute: "Manicura Builder Gel en Bay Ridge, Brooklyn | IVA Nail Art NY" },
  description:
    "Manicura builder gel en un estudio privado de Bay Ridge: uñas fuertes y naturales, cualquier diseño y mantenimiento cada 2 a 3 semanas. Reserva por Instagram.",
  alternates: {
    canonical: BUILDER_GEL_PATH.es,
    languages: { en: BUILDER_GEL_PATH.en, es: BUILDER_GEL_PATH.es, "x-default": BUILDER_GEL_PATH.en },
  },
  openGraph: {
    title: "Manicura Builder Gel en Bay Ridge, Brooklyn | IVA Nail Art NY",
    description: "Uñas fuertes y naturales con builder gel, atención uno a uno en un estudio privado de Bay Ridge.",
    url: BUILDER_GEL_PATH.es,
    locale: "es_US",
    type: "website",
    siteName: "IVA Nail Art NY",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IVA Nail Art — builder gel and nail art in Bay Ridge, Brooklyn" }],
  },
};

export default function Page() {
  return <BuilderGelPage lang="es" />;
}
