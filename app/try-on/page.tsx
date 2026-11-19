import type { Metadata } from "next";
import ToolShell from "@/app/components/ToolShell";
import NailTryOn from "@/app/components/NailTryOn";
import { PRESETS, getPreset } from "@/lib/nails";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const es = (await searchParams).lang === "es";
  return {
    title: { absolute: es ? "Probador Virtual de Uñas | IVA Nail Art NY" : "Virtual Nail Try-On | IVA Nail Art NY" },
    description: es ? "Prueba uñas almendra, coffin, cuadradas, stiletto y ovaladas en tu propia mano con la cámara del celular y reserva el diseño con Iva en Bay Ridge, Brooklyn." : "Try almond, coffin, square, stiletto and oval nails on your own hand with your phone camera, then book the design with Iva in Bay Ridge, Brooklyn.",
    alternates: { canonical: "/try-on" },
  };
}

export default async function Page({ searchParams }: { searchParams: Promise<{ lang?: string; preset?: string }> }) {
  const sp = await searchParams;
  const lang = sp.lang === "es" ? "es" : "en";
  const p = getPreset(sp.preset) ?? PRESETS[2];
  return (
    <ToolShell lang={lang} path="/try-on" extraQuery={sp.preset ? `preset=${encodeURIComponent(sp.preset)}` : ""}>
      <NailTryOn key={`${lang}-${p.id}`} lang={lang} initial={{ shape: p.shape, length: p.length, finish: p.finish, color: p.color }} />
    </ToolShell>
  );
}
