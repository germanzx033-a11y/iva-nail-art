import type { Metadata } from "next";
import ClientPortalDashboard from "@/app/components/ClientPortalDashboard";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portal VIP de Clientas & Auto-Agendamiento de Refill | IVA Nail Art NY — Bay Ridge, Brooklyn",
  description:
    "Portal privado para clientas de IVA Nail Art Brooklyn. Consulta tus sellos de lealtad, tu ficha de estilo de uñas, recompensas de referidos y agenda tu refill automáticamente.",
  alternates: {
    canonical: `${SITE_URL}/es/portal`,
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

export default function ClientPortalSpanishPage() {
  return <ClientPortalDashboard lang="es" />;
}
