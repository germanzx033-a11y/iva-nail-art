import type { Metadata } from "next";
import ToolShell from "@/app/components/ToolShell";
import GiftCard from "@/app/components/GiftCard";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const es = (await searchParams).lang === "es";
  return {
    title: { absolute: es ? "Tarjeta de Regalo Digital | IVA Nail Art NY" : "Digital Gift Card | IVA Nail Art NY" },
    description: es ? "Crea una tarjeta de regalo digital para una cita de uñas con Iva en Bay Ridge, Brooklyn, y envíala por WhatsApp, Instagram o mensaje." : "Create a beautiful digital gift card for a nail appointment with Iva in Bay Ridge, Brooklyn, and send it by WhatsApp, Instagram or text.",
    alternates: { canonical: "/gift-card" },
  };
}

export default async function Page({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang = (await searchParams).lang === "es" ? "es" : "en";
  return (
    <ToolShell lang={lang} path="/gift-card">
      <GiftCard key={lang} lang={lang} />
    </ToolShell>
  );
}
