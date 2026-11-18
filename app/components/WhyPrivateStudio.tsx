import { Palette, Clock3, Tag } from "lucide-react";

interface WhyPrivateStudioProps {
  lang: "en" | "es";
}

const COPY = {
  en: {
    eyebrow: "Why a private studio",
    titleTop: "Nails that look like",
    titleBottom: "the photo you saved",
    problem:
      "You show a picture, sit in a busy salon, and walk out with something close-ish — rushed, lifting a week later, and a total you didn't expect.",
    solution: "At IVA Nail Art it works differently:",
    points: [
      {
        title: "Designed for you",
        body: "Send the look you love. Iva adapts it to your nail shape and length, and paints the details by hand.",
      },
      {
        title: "Time that is only yours",
        body: "A private studio in Bay Ridge, by appointment only. No walk-ins, no waiting room, no rush.",
      },
      {
        title: "A clear price first",
        body: "Every service shows a guide price, and Iva confirms your quote by message before your appointment.",
      },
    ],
  },
  es: {
    eyebrow: "Por qué un estudio privado",
    titleTop: "Uñas que se ven como",
    titleBottom: "la foto que guardaste",
    problem:
      "Muestras una foto, te sientas en un salón lleno y sales con algo «parecido»: hecho con prisa, levantado a la semana y con un total que no esperabas.",
    solution: "En IVA Nail Art es diferente:",
    points: [
      {
        title: "Diseñado para ti",
        body: "Envía el diseño que te gusta. Iva lo adapta a la forma y el largo de tu uña y pinta los detalles a mano.",
      },
      {
        title: "Un tiempo solo para ti",
        body: "Estudio privado en Bay Ridge, solo con cita. Sin filas, sin sala de espera y sin prisas.",
      },
      {
        title: "Precio claro desde el inicio",
        body: "Cada servicio muestra un precio orientativo, e Iva te confirma la cotización por mensaje antes de tu cita.",
      },
    ],
  },
};

const ICONS = [Palette, Clock3, Tag];

/** Problem → solution block: names the usual salon frustrations and answers each one. */
export default function WhyPrivateStudio({ lang }: WhyPrivateStudioProps) {
  const c = COPY[lang];

  return (
    <section id="why-iva" className="bg-[#0E0706] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="font-display mb-5 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">{c.eyebrow}</p>
        <h2 className="max-w-3xl text-[#F4EBE1]">
          <span className="font-display block text-2xl font-bold md:text-4xl">{c.titleTop}</span>
          <span className="font-serif text-4xl font-normal italic text-[#E8C9A8] md:text-6xl">{c.titleBottom}</span>
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#F4EBE1]/75">{c.problem}</p>
        <p className="mt-4 text-lg font-medium text-[#F4EBE1]">{c.solution}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {c.points.map((point, i) => {
            const Icon = ICONS[i];
            return (
              <div key={point.title} className="rounded-[1.75rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] p-7">
                <Icon className="mb-5 h-6 w-6 text-[#D4A574]" aria-hidden />
                <h3 className="mb-2 font-serif text-2xl text-[#F4EBE1]">{point.title}</h3>
                <p className="text-[#F4EBE1]/75">{point.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
