import { Clock, MessageCircle, CalendarCheck, Sparkles, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/site";

interface BookingInfoProps {
  lang: "en" | "es";
  bookUrl: string;
  phone: string;
  hours: { days: string; time: string }[];
  deposit: number;
}

const COPY = {
  en: {
    eyebrow: "How to book",
    titleTop: "Your appointment",
    titleBottom: "in three steps",
    steps: [
      { title: "Send your idea", body: "Message Iva on Instagram with a photo of the look you love, or pick one from the gallery. She usually replies within 1–2 hours during opening hours." },
      { title: "Get your quote", body: "Iva confirms the design, the technique and a personalised price with you." },
      { title: "Lock in your date", body: "Choose a time that works for you. Your appointment is confirmed once Iva replies." },
    ],
    faqTitle: "Before your visit",
    faq: [
      { q: "When can I come?", a: "By appointment only, between the hours below. Ask for the day and time that suits you." },
      { q: "How much will my set cost?", a: "Each service shows a guide price. The final price depends on length, removal, repairs and how detailed the design is, and is confirmed before your appointment." },
      { q: "Do I need a deposit?", a: "Yes, a {DEPOSIT} deposit holds your time. It is applied toward the cost of your service." },
      { q: "What if I'm running late?", a: "There is a 15-minute grace period. After that, your service may need to be shortened or rescheduled so the next client is not affected." },
      { q: "What if I need to cancel?", a: "Let Iva know at least 24 hours before. Late cancellations and missed appointments may lose the deposit." },
      { q: "I already have product on my nails.", a: "No problem — mention it in your message so removal can be included in your time and quote." },
      { q: "Can I bring my own inspiration?", a: "Yes, please do. Send photos in the DM so Iva can plan your design." },
    ],
    hoursLabel: "Hours",
    hoursNote: "By appointment only · Replies within 1–2 hours",
    call: "Other ways to reach Iva",
    whatsapp: "WhatsApp",
    waText: "Hi Iva! I would like to book an appointment. Service: … Preferred date: … Do I have product to remove? …",
    cta: "Message Iva on Instagram",
  },
  es: {
    eyebrow: "Cómo reservar",
    titleTop: "Tu cita",
    titleBottom: "en tres pasos",
    steps: [
      { title: "Envía tu idea", body: "Escríbele a Iva por Instagram con una foto del diseño que te gusta, o elige uno de la galería. Normalmente responde en 1 a 2 horas dentro del horario de atención." },
      { title: "Recibe tu cotización", body: "Iva confirma contigo el diseño, la técnica y un precio personalizado." },
      { title: "Aparta tu fecha", body: "Elige el horario que te acomode. Tu cita queda confirmada cuando Iva te responde." },
    ],
    faqTitle: "Antes de tu visita",
    faq: [
      { q: "¿Cuándo puedo ir?", a: "Solo con cita, dentro del horario de abajo. Pide el día y la hora que mejor te queden." },
      { q: "¿Cuánto cuesta mi set?", a: "Cada servicio muestra un precio orientativo. El precio final depende del largo, el retiro, las reparaciones y el detalle del diseño, y se confirma antes de tu cita." },
      { q: "¿Necesito dejar depósito?", a: "Sí, un depósito de {DEPOSIT} aparta tu horario. Se descuenta del costo de tu servicio." },
      { q: "¿Y si voy a llegar tarde?", a: "Hay 15 minutos de tolerancia. Después de ese tiempo, puede que haya que acortar o reprogramar tu servicio para no afectar a la siguiente clienta." },
      { q: "¿Y si necesito cancelar?", a: "Avísale a Iva al menos 24 horas antes. Las cancelaciones tardías y las citas no asistidas pueden perder el depósito." },
      { q: "Ya tengo producto en las uñas.", a: "Sin problema: menciónalo en tu mensaje para incluir el retiro en el tiempo y la cotización." },
      { q: "¿Puedo llevar mi propia inspiración?", a: "¡Claro! Envía las fotos por mensaje directo para que Iva planee tu diseño." },
    ],
    hoursLabel: "Horario",
    hoursNote: "Solo con cita · Respuesta en 1 a 2 horas",
    call: "Otras formas de contactar a Iva",
    whatsapp: "WhatsApp",
    waText: "¡Hola Iva! Me gustaría reservar una cita. Servicio: … Fecha preferida: … ¿Tengo producto para retirar? …",
    cta: "Escríbele a Iva por Instagram",
  },
};

const STEP_ICONS = [MessageCircle, Sparkles, CalendarCheck];

export default function BookingInfo({ lang, bookUrl, phone, hours, deposit }: BookingInfoProps) {
  const c = COPY[lang];
  const faq = c.faq.map((item) => ({ ...item, a: item.a.replace("{DEPOSIT}", `$${deposit}`) }));
  const tel = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <section id="booking-info" className="bg-[#140B0A] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="font-display mb-5 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">{c.eyebrow}</p>
        <h2 className="text-[#F4EBE1]">
          <span className="font-display block text-2xl font-bold md:text-4xl">{c.titleTop}</span>
          <span className="font-serif text-4xl font-normal italic text-[#E8C9A8] md:text-6xl">{c.titleBottom}</span>
        </h2>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {c.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li key={step.title} className="rounded-[1.75rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] p-7">
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-display text-3xl text-[#E8C9A8]">0{i + 1}</span>
                  <Icon className="h-5 w-5 text-[#D4A574]" aria-hidden />
                </div>
                <h3 className="mb-2 font-serif text-2xl text-[#F4EBE1]">{step.title}</h3>
                <p className="text-[#F4EBE1]/75">{step.body}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="mb-6 font-serif text-3xl italic text-[#E8C9A8]">{c.faqTitle}</h3>
            <div className="divide-y divide-[#F4EBE1]/12 border-y border-[#F4EBE1]/12">
              {faq.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-[#F4EBE1] marker:hidden">
                    {item.q}
                    <span aria-hidden className="text-2xl leading-none text-[#D4A574] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-[#F4EBE1]/75">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-[1.75rem] border border-[#D4A574]/30 bg-[#0E0706] p-8">
            <p className="mb-2 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#D4A574]">
              <Clock className="h-4 w-4" aria-hidden />
              {c.hoursLabel}
            </p>
            <dl className="space-y-2">
              {hours.map((h) => (
                <div key={h.days} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <dt className="text-[#F4EBE1]/70">{h.days}</dt>
                  <dd className="font-display text-xl text-[#F4EBE1]">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-1 text-[#F4EBE1]/70">{c.hoursNote}</p>

            <a
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-pill mt-8 w-full justify-center"
            >
              {c.cta}
            </a>

            <p className="mt-6 text-sm text-[#F4EBE1]/70">{c.call}</p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
              <a
                href={`https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(c.waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg text-[#E8C9A8] underline-offset-4 hover:underline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {c.whatsapp}
              </a>
              <a href={tel} className="inline-flex items-center gap-2 text-lg text-[#E8C9A8] underline-offset-4 hover:underline">
                <Phone className="h-4 w-4" aria-hidden />
                {phone}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
