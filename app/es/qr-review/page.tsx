import type { Metadata } from "next";
import QRReviewClient from "@/app/components/QRReviewClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Califica tu Experiencia | IVA Nail Art NY — Bay Ridge, Brooklyn",
  description:
    "¿Te encantaron tus uñas en IVA Nail Art? Déjanos tu reseña de 5 estrellas en Google o envía tus comentarios privados a Ivannía.",
  alternates: {
    canonical: `${SITE_URL}/es/qr-review`,
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

export default function QRReviewSpanishPage() {
  return <QRReviewClient lang="es" />;
}
