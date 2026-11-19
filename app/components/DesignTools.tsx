import Link from "next/link";
import { Hand, Sparkles, Gift } from "lucide-react";

const COPY = {
  en: {
    eyebrow: "Find your design",
    titleA: "Try it before",
    titleB: "you book it",
    cards: [
      { href: "/nail-match", icon: Sparkles, t: "Nail Match", d: "4 quick questions, 3 designs made for you.", cta: "Take the quiz" },
      { href: "/try-on", icon: Hand, t: "Virtual try-on", d: "See shapes, lengths and finishes on your own hand with your camera.", cta: "Open the try-on" },
      { href: "/gift-card", icon: Gift, t: "Gift card", d: "Design a digital gift card and send it by WhatsApp or Instagram.", cta: "Create a gift card" },
    ],
  },
  es: {
    eyebrow: "Encuentra tu diseño",
    titleA: "Pruébalo antes",
    titleB: "de reservar",
    cards: [
      { href: "/nail-match", icon: Sparkles, t: "Nail Match", d: "4 preguntas rápidas y 3 diseños hechos para ti.", cta: "Hacer el quiz" },
      { href: "/try-on", icon: Hand, t: "Probador virtual", d: "Mira formas, largos y acabados en tu propia mano con la cámara.", cta: "Abrir el probador" },
      { href: "/gift-card", icon: Gift, t: "Tarjeta de regalo", d: "Diseña una tarjeta de regalo digital y envíala por WhatsApp o Instagram.", cta: "Crear tarjeta" },
    ],
  },
};

export default function DesignTools({ lang }: { lang: "en" | "es" }) {
  const c = COPY[lang];
  const q = lang === "es" ? "?lang=es" : "";
  return (
    <section id="design-tools" className="bg-[#140B0A] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="font-display mb-5 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">{c.eyebrow}</p>
        <h2 className="text-[#F4EBE1]">
          <span className="font-display block text-2xl font-bold md:text-4xl">{c.titleA}</span>
          <span className="font-serif text-4xl font-normal italic text-[#E8C9A8] md:text-6xl">{c.titleB}</span>
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {c.cards.map(({ href, icon: Icon, t, d, cta }) => (
            <Link
              key={href}
              href={`${href}${q}`}
              className="group flex flex-col rounded-[1.75rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] p-7 transition-colors hover:border-[#E8C9A8]/60"
            >
              <Icon className="mb-5 h-7 w-7 text-[#D4A574] transition-transform group-hover:scale-110" aria-hidden />
              <h3 className="mb-2 font-serif text-2xl text-[#F4EBE1]">{t}</h3>
              <p className="mb-6 text-[#F4EBE1]/75">{d}</p>
              <span className="mt-auto font-medium text-[#E8C9A8] underline underline-offset-4">{cta} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
