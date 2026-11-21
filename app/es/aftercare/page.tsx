import type { Metadata } from "next";
import AftercarePage from "@/app/components/AftercarePage";

export const metadata: Metadata = {
  title: { absolute: "Guía de Cuidados para tus Uñas | IVA Nail Art NY" },
  description: "Cómo hacer que tu gel, builder gel o acrílico dure más: consejos para las primeras 24 horas, cuidado diario y cuándo reservar tu relleno.",
  alternates: { canonical: "/es/aftercare", languages: { en: "/aftercare", es: "/es/aftercare", "x-default": "/aftercare" } },
};

export default function Page() {
  return <AftercarePage lang="es" />;
}
