"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { PRESETS, designLabel, drawPreview, type NailPreset } from "@/lib/nails";
import { track } from "@/lib/track";
import CalendlyModal from "@/app/components/CalendlyModal";

type Answer = string;

const QUESTIONS = {
  en: [
    { id: "event", q: "What are your nails for?", options: [["everyday", "Everyday / work"], ["night", "A night out"], ["wedding", "Wedding or big event"], ["vacation", "Vacation"]] },
    { id: "color", q: "Which colors are you wearing most?", options: [["neutral", "Neutrals & nudes"], ["red", "Reds & wine"], ["pastel", "Pastels"], ["dark", "Black & dark tones"], ["gold", "Gold & sparkle"]] },
    { id: "life", q: "How do you use your hands?", options: [["active", "Very busy hands — I type, cook, lift"], ["balanced", "A bit of everything"], ["long", "I love long nails, I adapt"]] },
    { id: "level", q: "How much design do you want?", options: [["minimal", "Clean and minimal"], ["detail", "One special detail"], ["statement", "A statement set"]] },
  ],
  es: [
    { id: "event", q: "¿Para qué son tus uñas?", options: [["everyday", "Día a día / trabajo"], ["night", "Una noche de fiesta"], ["wedding", "Boda o evento especial"], ["vacation", "Vacaciones"]] },
    { id: "color", q: "¿Qué colores usas más en tu ropa?", options: [["neutral", "Neutros y nudes"], ["red", "Rojos y vino"], ["pastel", "Pasteles"], ["dark", "Negro y tonos oscuros"], ["gold", "Dorado y brillo"]] },
    { id: "life", q: "¿Cómo usas tus manos?", options: [["active", "Muy ocupadas: escribo, cocino, cargo"], ["balanced", "Un poco de todo"], ["long", "Amo las uñas largas, me adapto"]] },
    { id: "level", q: "¿Cuánto diseño quieres?", options: [["minimal", "Limpio y minimalista"], ["detail", "Un detalle especial"], ["statement", "Un set que llame la atención"]] },
  ],
} as const;

/** Tags each look matches; the quiz scores looks by matching answers. */
const TAGS: Record<string, string[]> = {
  "clean-girl": ["everyday", "neutral", "active", "minimal"],
  "milky-almond": ["everyday", "wedding", "neutral", "balanced", "minimal"],
  "rose-chrome": ["wedding", "night", "neutral", "pastel", "balanced", "detail"],
  "cherry-classic": ["everyday", "night", "red", "active", "minimal"],
  "chocolate-cateye": ["night", "everyday", "dark", "balanced", "detail"],
  "wine-stiletto": ["night", "red", "dark", "long", "statement"],
  "gold-glitter": ["night", "vacation", "wedding", "gold", "long", "statement"],
  "lilac-matte": ["vacation", "everyday", "pastel", "balanced", "detail"],
  "noir-coffin": ["night", "dark", "long", "statement"],
  "sky-oval": ["vacation", "everyday", "pastel", "active", "minimal"],
};

const COPY = {
  en: { eyebrow: "Nail Match", title: "Find your", titleB: "perfect set", step: (n: number) => `Question ${n} of 4`, back: "Back", result: "Your 3 matches", try: "Inquire for quote on WhatsApp", similar: "Inspiration from the studio", again: "Start over", book: "Book on Instagram" },
  es: { eyebrow: "Nail Match", title: "Encuentra tu", titleB: "set perfecto", step: (n: number) => `Pregunta ${n} de 4`, back: "Atrás", result: "Tus 3 diseños ideales", try: "Cotizar este diseño por WhatsApp", similar: "Inspiración del estudio", again: "Empezar de nuevo", book: "Reservar por Instagram" },
};

function Preview({ look }: { look: NailPreset }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) drawPreview(ref.current, look);
  }, [look]);
  return <canvas ref={ref} aria-hidden className="h-28 w-full" />;
}

export default function NailMatch({ lang }: { lang: "en" | "es" }) {
  const c = COPY[lang];
  const questions = QUESTIONS[lang];
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const step = answers.length;
  const done = step === questions.length;

  const results = useMemo(() => {
    if (!done) return [];
    return [...PRESETS]
      .map((p, i) => ({ p, score: TAGS[p.id].filter((t) => answers.includes(t)).length * 10 - i * 0.01 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((r) => r.p);
  }, [answers, done]);

  useEffect(() => {
    if (done) track("nailmatch_complete", { answers: answers.join(","), top: results.map((r) => r.id).join(",") });
  }, [done, answers, results]);

  const q = questions[step];

  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-display mb-4 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">{c.eyebrow}</p>
      <h1 className="text-[#F4EBE1]">
        <span className="font-display block text-2xl font-bold md:text-4xl">{c.title}</span>
        <span className="font-serif text-4xl italic text-[#E8C9A8] md:text-6xl">{c.titleB}</span>
      </h1>

      {!done ? (
        <div className="mt-10 rounded-[1.75rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] p-6 md:p-10">
          <div className="mb-6 flex items-center justify-between text-sm text-[#F4EBE1]/70">
            <span>{c.step(step + 1)}</span>
            {step > 0 && (
              <button type="button" onClick={() => setAnswers(answers.slice(0, -1))} className="inline-flex items-center gap-1 py-2 text-[#E8C9A8] hover:text-white">
                <ArrowLeft className="h-4 w-4" aria-hidden /> {c.back}
              </button>
            )}
          </div>
          <div className="mb-6 h-1 w-full rounded-full bg-[#F4EBE1]/10" aria-hidden>
            <div className="h-1 rounded-full bg-[#E8C9A8] transition-all" style={{ width: `${(step / questions.length) * 100}%` }} />
          </div>
          <h2 className="mb-6 font-serif text-2xl text-[#F4EBE1] md:text-3xl">{q.q}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {q.options.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setAnswers([...answers, value])}
                className="rounded-2xl border border-[#F4EBE1]/20 px-5 py-4 text-left text-[#F4EBE1] transition-colors hover:border-[#E8C9A8] hover:bg-[#E8C9A8]/10"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="mb-6 flex items-center gap-2 font-serif text-3xl text-[#E8C9A8]">
            <Sparkles className="h-6 w-6" aria-hidden /> {c.result}
          </h2>
          <ol className="grid gap-5 md:grid-cols-3">
            {results.map((look, i) => (
              <li key={look.id} className="flex flex-col overflow-hidden rounded-[1.5rem] border border-[#F4EBE1]/12 bg-[#1A0F0D]">
                <div className="bg-[#2A1714] px-4 pt-4">
                  <Preview look={look} />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <p className="font-display text-sm text-[#D4A574]">0{i + 1}</p>
                  <h3 className="font-serif text-2xl text-[#F4EBE1]">{look[lang]}</h3>
                  <p className="text-sm text-[#F4EBE1]/70">{designLabel(look, lang)}</p>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={look.photo} alt={c.similar} fill sizes="(max-width: 768px) 90vw, 30vw" className="object-cover" />
                  </div>
                  <p className="text-xs text-[#F4EBE1]/60">{c.similar}</p>
                  <a
                    href={`https://wa.me/19296257273?text=${encodeURIComponent(
                      lang === "es"
                        ? `¡Hola Ivannía! ✨ Hice el test de estilo y me encantó el look "${look.es}". ¿Me podrías confirmar la cotización y tus próximas fechas disponibles? 💅`
                        : `Hello Ivannía! ✨ I completed your style quiz and fell in love with "${look.en}". Could you share a custom quote and your next openings? 💅`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-pill mt-auto justify-center text-center"
                  >
                    {c.try}
                  </a>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button type="button" onClick={() => setAnswers([])} className="py-2 text-[#E8C9A8] underline underline-offset-4 hover:text-white cursor-pointer">
              {c.again}
            </button>
            <button
              type="button"
              onClick={() => setIsCalendlyOpen(true)}
              className="py-2 px-5 rounded-full bg-[#E8C9A8] text-[#0E0706] text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              {lang === "en" ? "Schedule with this look (Calendly)" : "Agendar con este diseño (Calendly)"}
            </button>
            <a href="https://ig.me/m/iva_nailart_nyc" target="_blank" rel="noopener noreferrer" className="py-2 text-[#E8C9A8] underline underline-offset-4 hover:text-white">
              {c.book}
            </a>
          </div>

          <CalendlyModal
            isOpen={isCalendlyOpen}
            onClose={() => setIsCalendlyOpen(false)}
            lang={lang}
            prefilledService={`Nail Match: ${results[0]?.[lang] || "Custom Style"}`}
          />
        </div>
      )}
    </div>
  );
}
