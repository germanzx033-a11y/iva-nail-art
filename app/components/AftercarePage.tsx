import ToolShell from "./ToolShell";
import ReminderButton from "./ReminderButton";
import { FileDown, Instagram } from "lucide-react";

const COPY = {
  en: {
    eyebrow: "Aftercare",
    titleA: "Make your set",
    titleB: "last longer",
    intro: "A few simple habits keep your nails strong and shiny until your next appointment.",
    sections: [
      { t: "The first 24 hours", items: ["Avoid very hot water, saunas and long baths.", "Skip harsh hand sanitizers and cleaning products right on your nails."] },
      { t: "Every day", items: ["Apply cuticle oil once or twice a day.", "Wear gloves for dishes, cleaning and gardening.", "Moisturize your hands, especially in winter."] },
      { t: "Protect your nails", items: ["Don't use your nails as tools to open cans or scrape labels.", "Never peel, pick or bite off gel, builder gel or acrylic — it lifts layers of your natural nail."] },
      { t: "When to come back", items: ["Most sets are refreshed every 2–3 weeks as your nails grow.", "If a nail lifts or breaks, message Iva — don't glue it at home."] },
    ],
    pdf: "Download the guide (PDF)",
    reminder: "Save a reminder for your next fill:",
    book: "Book your next appointment",
  },
  es: {
    eyebrow: "Cuidados",
    titleA: "Haz que tus uñas",
    titleB: "duren más",
    intro: "Unos hábitos sencillos mantienen tus uñas fuertes y brillantes hasta tu próxima cita.",
    sections: [
      { t: "Las primeras 24 horas", items: ["Evita el agua muy caliente, el sauna y los baños largos.", "No uses gel antibacterial fuerte ni productos de limpieza directo sobre las uñas."] },
      { t: "Todos los días", items: ["Aplica aceite de cutícula una o dos veces al día.", "Usa guantes para lavar platos, limpiar y en el jardín.", "Hidrata tus manos, sobre todo en invierno."] },
      { t: "Protege tus uñas", items: ["No uses las uñas como herramienta para abrir latas o raspar etiquetas.", "Nunca arranques, peles ni muerdas el gel, el builder gel o el acrílico: se llevan capas de tu uña natural."] },
      { t: "Cuándo volver", items: ["La mayoría de los sets se renuevan cada 2 a 3 semanas, a medida que crece la uña.", "Si una uña se levanta o se rompe, escríbele a Iva: no la pegues en casa."] },
    ],
    pdf: "Descargar la guía (PDF)",
    reminder: "Guarda un recordatorio para tu próximo relleno:",
    book: "Reservar tu próxima cita",
  },
};

export default function AftercarePage({ lang }: { lang: "en" | "es" }) {
  const c = COPY[lang];
  return (
    <ToolShell lang={lang} path={lang === "en" ? "/aftercare" : "/es/aftercare"}>
      <div className="mx-auto max-w-3xl">
        <p className="mb-6 hidden font-display text-sm tracking-[0.3em] text-[#F4EBE1] print:block">IVA NAIL ART NY · Bay Ridge, Brooklyn</p>
        <p className="font-display mb-4 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">{c.eyebrow}</p>
        <h1 className="text-[#F4EBE1]">
          <span className="font-display block text-2xl font-bold md:text-4xl">{c.titleA}</span>
          <span className="font-serif text-4xl italic text-[#E8C9A8] md:text-6xl">{c.titleB}</span>
        </h1>
        <p className="mt-5 text-lg text-[#F4EBE1]/80">{c.intro}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {c.sections.map((s) => (
            <section key={s.t} className="rounded-[1.5rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] p-6">
              <h2 className="mb-3 font-serif text-2xl text-[#E8C9A8]">{s.t}</h2>
              <ul className="list-disc space-y-2 pl-5 text-[#F4EBE1]/85">
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-10 hidden text-[#F4EBE1]/85 print:block">Instagram @iva_nailart_nyc · +1 (929) 625-7273</p>
        <div className="mt-10 space-y-5 print:hidden">
          <a href={`/iva-aftercare-${lang}.pdf`} download className="glow-pill">
            <FileDown className="h-5 w-5" aria-hidden /> {c.pdf}
          </a>
          <div>
            <p className="mb-2 text-[#F4EBE1]/80">{c.reminder}</p>
            <ReminderButton lang={lang} />
          </div>
          <a href="https://ig.me/m/iva_nailart_nyc" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 text-[#E8C9A8] underline underline-offset-4 hover:text-white">
            <Instagram className="h-4 w-4" aria-hidden /> {c.book}
          </a>
        </div>
      </div>
    </ToolShell>
  );
}
