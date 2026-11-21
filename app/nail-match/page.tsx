import type { Metadata } from "next";
import ToolShell from "@/app/components/ToolShell";
import NailMatch from "@/app/components/NailMatch";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const es = (await searchParams).lang === "es";
  return {
    title: { absolute: es ? "Quiz Nail Match | IVA Nail Art NY" : "Nail Match Quiz | IVA Nail Art NY" },
    description: es ? "Responde 4 preguntas rápidas y recibe 3 diseños de uñas hechos para ti; pruébalos en tu mano y reserva con Iva en Bay Ridge, Brooklyn." : "Answer 4 quick questions and get 3 nail designs made for you, then try them on your hand and book with Iva in Bay Ridge, Brooklyn.",
    alternates: { canonical: "/nail-match" },
  };
}

export default async function Page({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang = (await searchParams).lang === "es" ? "es" : "en";
  return (
    <ToolShell lang={lang} path="/nail-match">
      <NailMatch key={lang} lang={lang} />
    </ToolShell>
  );
}
