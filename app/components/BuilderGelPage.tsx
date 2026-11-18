import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle, Phone, Clock, Check } from "lucide-react";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { GALLERY_IMAGES } from "@/app/data/galleryData";

type Lang = "en" | "es";

export const BUILDER_GEL_PATH: Record<Lang, string> = {
  en: "/builder-gel-bay-ridge",
  es: "/es/builder-gel-bay-ridge",
};

const DM_URL = "https://ig.me/m/iva_nailart_nyc";

const COPY = {
  en: {
    switchLabel: "ES",
    home: "Home",
    eyebrow: "Builder gel · Bay Ridge, Brooklyn",
    h1Top: "Builder gel manicure",
    h1Bottom: "in Bay Ridge, Brooklyn",
    intro:
      "Strong, natural-looking nails that keep their shape — done one-on-one by Iva in a private studio in Bay Ridge. By appointment only, in English or Spanish.",
    cta: "Book on Instagram",
    ctaNote: "Replies within 1–2 hours · $35 deposit holds your time",
    whatTitle: "What is builder gel?",
    whatBody: [
      "Builder gel is a thicker gel that adds a thin layer of structure over your natural nail. It gives strength and a smooth, balanced shape without needing extensions.",
      "On top, you can wear any finish: a clean nude, French, chrome, cat-eye or a full hand-painted design.",
    ],
    forTitle: "Who it is for",
    forList: [
      "Natural nails that bend, peel or break easily",
      "Growing your own nails longer without them snapping",
      "A manicure that stays put between appointments",
      "A strong base for detailed nail art",
    ],
    stepsTitle: "Your appointment",
    steps: [
      { t: "Send your idea", d: "Message Iva on Instagram with a photo of the look you want and whether you have product to remove." },
      { t: "Get your quote", d: "Iva confirms the design, the length and a personal price by message before your visit." },
      { t: "Prep and structure", d: "Your nails are prepped gently, then the builder gel is shaped to give each nail a balanced structure." },
      { t: "Your design", d: "Color, finish or hand-painted art on top — exactly the look you chose." },
    ],
    careTitle: "Maintenance and regular visits",
    careBody: [
      "Most builder gel sets are refreshed every 2–3 weeks as your nails grow. At each visit the structure is rebalanced and you can change your design.",
      "Book your next appointment before you leave to keep your preferred day and time.",
    ],
    galleryTitle: "Recent sets from the studio",
    galleryLink: "See the full gallery",
    faqTitle: "Builder gel questions",
    faq: [
      { q: "How long does builder gel last?", a: "It depends on how fast your nails grow and your daily routine. Most clients refresh their set every 2–3 weeks." },
      { q: "Does builder gel damage natural nails?", a: "Applied and removed correctly, builder gel protects the natural nail. Avoid peeling or picking it off at home — book a removal instead." },
      { q: "Builder gel or acrylic?", a: "Builder gel feels lighter and more flexible and is ideal for strengthening your own nails. Acrylic is often chosen for longer extensions. Iva can recommend the best option for your nails." },
      { q: "Can I get nail art on builder gel?", a: "Yes. Builder gel is a great base for any design, from a simple French to detailed hand-painted art." },
      { q: "How much does it cost?", a: "Every set is quoted personally, based on length, removal and design. Send your idea on Instagram and Iva confirms the price before your appointment. A $35 deposit holds your time and is applied to your service." },
      { q: "Where is the studio?", a: "It is a private studio in Bay Ridge, Brooklyn (11209). The exact address is shared when your appointment is confirmed." },
    ],
    hoursTitle: "Hours",
    hours: [
      { d: "Mon – Fri", h: "5:30 PM – 10:00 PM" },
      { d: "Sat – Sun", h: "10:00 AM – 10:00 PM" },
    ],
    hoursNote: "By appointment only · 15-minute grace period · Cancel at least 24 hours ahead",
    other: "Other ways to reach Iva",
    waText: "Hi Iva! I would like to book a builder gel manicure. Preferred date: … Do I have product to remove? …",
    back: "← Back to the home page",
  },
  es: {
    switchLabel: "EN",
    home: "Inicio",
    eyebrow: "Builder gel · Bay Ridge, Brooklyn",
    h1Top: "Manicura builder gel",
    h1Bottom: "en Bay Ridge, Brooklyn",
    intro:
      "Uñas fuertes, de aspecto natural y que mantienen su forma. Atención uno a uno con Iva en un estudio privado en Bay Ridge. Solo con cita, en español o inglés.",
    cta: "Reserva por Instagram",
    ctaNote: "Respuesta en 1 a 2 horas · Depósito de $35 para apartar tu cita",
    whatTitle: "¿Qué es el builder gel?",
    whatBody: [
      "El builder gel es un gel más espeso que agrega una capa fina de estructura sobre tu uña natural. Le da fuerza y una forma lisa y equilibrada sin necesidad de extensiones.",
      "Encima puedes llevar el acabado que quieras: nude, francesa, cromo, ojo de gato o un diseño pintado a mano.",
    ],
    forTitle: "Para quién es",
    forList: [
      "Uñas naturales que se doblan, se pelan o se quiebran con facilidad",
      "Dejar crecer tus propias uñas sin que se rompan",
      "Una manicura que dure entre cita y cita",
      "Una base fuerte para nail art detallado",
    ],
    stepsTitle: "Tu cita",
    steps: [
      { t: "Envía tu idea", d: "Escríbele a Iva por Instagram con una foto del diseño que quieres y dile si tienes producto para retirar." },
      { t: "Recibe tu cotización", d: "Iva te confirma por mensaje el diseño, el largo y un precio personalizado antes de tu visita." },
      { t: "Preparación y estructura", d: "Tus uñas se preparan con cuidado y luego se moldea el builder gel para darle a cada uña una estructura equilibrada." },
      { t: "Tu diseño", d: "Color, acabado o arte pintado a mano encima: justo el diseño que elegiste." },
    ],
    careTitle: "Mantenimiento y visitas regulares",
    careBody: [
      "La mayoría de los sets de builder gel se renuevan cada 2 a 3 semanas, a medida que crece la uña. En cada visita se reequilibra la estructura y puedes cambiar de diseño.",
      "Agenda tu próxima cita antes de irte para conservar tu día y horario preferidos.",
    ],
    galleryTitle: "Diseños recientes del estudio",
    galleryLink: "Ver la galería completa",
    faqTitle: "Preguntas sobre builder gel",
    faq: [
      { q: "¿Cuánto dura el builder gel?", a: "Depende de qué tan rápido crecen tus uñas y de tu rutina. La mayoría de las clientas renuevan su set cada 2 a 3 semanas." },
      { q: "¿El builder gel daña la uña natural?", a: "Bien aplicado y bien retirado, el builder gel protege la uña natural. Evita arrancarlo en casa: agenda un retiro." },
      { q: "¿Builder gel o acrílico?", a: "El builder gel se siente más ligero y flexible, y es ideal para fortalecer tus propias uñas. El acrílico se suele elegir para extensiones más largas. Iva te recomienda la mejor opción para tus uñas." },
      { q: "¿Puedo hacerme nail art sobre builder gel?", a: "Sí. El builder gel es una base excelente para cualquier diseño, desde una francesa sencilla hasta arte detallado pintado a mano." },
      { q: "¿Cuánto cuesta?", a: "Cada set se cotiza de forma personalizada según el largo, el retiro y el diseño. Envía tu idea por Instagram e Iva te confirma el precio antes de tu cita. Un depósito de $35 aparta tu horario y se descuenta del servicio." },
      { q: "¿Dónde está el estudio?", a: "Es un estudio privado en Bay Ridge, Brooklyn (11209). La dirección exacta se comparte al confirmar tu cita." },
    ],
    hoursTitle: "Horario",
    hours: [
      { d: "Lun – Vie", h: "5:30 PM – 10:00 PM" },
      { d: "Sáb – Dom", h: "10:00 AM – 10:00 PM" },
    ],
    hoursNote: "Solo con cita · 15 minutos de tolerancia · Cancela con al menos 24 horas",
    other: "Otras formas de contactar a Iva",
    waText: "¡Hola Iva! Me gustaría reservar una manicura builder gel. Fecha preferida: … ¿Tengo producto para retirar? …",
    back: "← Volver al inicio",
  },
} as const;

function jsonLd(lang: Lang) {
  const c = COPY[lang];
  const url = `${SITE_URL}${BUILDER_GEL_PATH[lang]}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: lang === "en" ? "Builder Gel Manicure" : "Manicura Builder Gel",
      serviceType: "Builder Gel Manicure",
      url,
      inLanguage: lang,
      provider: { "@id": `${SITE_URL}/#nailsalon` },
      areaServed: [
        { "@type": "Place", name: "Bay Ridge, Brooklyn, NY" },
        { "@type": "City", name: "Brooklyn" },
      ],
      description: c.intro,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: c.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: c.home, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: `${c.h1Top} ${c.h1Bottom}`, item: url },
      ],
    },
  ];
}

/** Landing page for the builder gel service (server-rendered, one route per language). */
export default function BuilderGelPage({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const other: Lang = lang === "en" ? "es" : "en";
  const photos = GALLERY_IMAGES.slice(0, 6);
  const tel = `tel:${BUSINESS.phoneE164}`;
  const wa = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(c.waText)}`;

  return (
    <main lang={lang} className="min-h-screen bg-[#0E0706] text-[#F4EBE1]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)).replace(/</g, "\\u003c") }}
      />

      <header className="border-b border-[#F4EBE1]/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 md:px-10">
          <Link href="/" className="font-display inline-block py-3 text-sm tracking-[0.3em] text-[#F4EBE1] hover:text-[#E8C9A8]">
            IVA <span className="font-light">Nail Art</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={BUILDER_GEL_PATH[other]}
              hrefLang={other}
              className="rounded-full border border-[#F4EBE1]/30 px-3 py-1.5 text-xs font-medium hover:bg-[#F4EBE1] hover:text-[#0E0706]"
            >
              {c.switchLabel}
            </Link>
            <a href={DM_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#E8C9A8] px-5 py-2 text-sm font-semibold text-[#0E0706] hover:bg-white">
              {lang === "en" ? "Book" : "Reservar"}
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:px-10 md:py-24">
        <div>
          <p className="font-display mb-5 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">{c.eyebrow}</p>
          <h1>
            <span className="font-display block text-[clamp(1.8rem,5vw,3rem)] font-bold leading-[1.1] text-[#F4EBE1]">{c.h1Top}</span>
            <span className="mt-1 block font-serif text-[clamp(2rem,5.5vw,3.6rem)] italic leading-[1.1] text-[#E8C9A8]">{c.h1Bottom}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#F4EBE1]/80">{c.intro}</p>
          <a href={DM_URL} target="_blank" rel="noopener noreferrer" className="glow-pill mt-8">
            <Instagram className="h-5 w-5" aria-hidden />
            {c.cta}
          </a>
          <p className="mt-4 text-sm text-[#F4EBE1]/70">{c.ctaNote}</p>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-[#140B0A]">
          <Image
            src={photos[0].src}
            alt={lang === "en" ? photos[0].alt : photos[0].altEs ?? photos[0].alt}
            fill
            priority
            sizes="(max-width: 768px) 90vw, 384px"
            className="object-cover"
          />
        </div>
      </section>

      {/* What + who */}
      <section className="bg-[#140B0A] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-5 font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.whatTitle}</h2>
            {c.whatBody.map((p) => (
              <p key={p} className="mb-4 text-lg leading-relaxed text-[#F4EBE1]/80">{p}</p>
            ))}
          </div>
          <div>
            <h2 className="mb-5 font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.forTitle}</h2>
            <ul className="space-y-3">
              {c.forList.map((item) => (
                <li key={item} className="flex gap-3 text-lg text-[#F4EBE1]/85">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-[#D4A574]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.stepsTitle}</h2>
          <ol className="grid gap-5 md:grid-cols-4">
            {c.steps.map((s, i) => (
              <li key={s.t} className="rounded-[1.5rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] p-6">
                <span className="font-display text-2xl text-[#E8C9A8]">0{i + 1}</span>
                <h3 className="mb-2 mt-3 font-serif text-xl text-[#F4EBE1]">{s.t}</h3>
                <p className="text-[#F4EBE1]/75">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Care */}
      <section className="bg-[#140B0A] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.careTitle}</h2>
          {c.careBody.map((p) => (
            <p key={p} className="mb-4 text-lg leading-relaxed text-[#F4EBE1]/80">{p}</p>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.galleryTitle}</h2>
            <Link href="/#gallery" className="inline-block py-2 text-sm text-[#E8C9A8] underline underline-offset-4 hover:text-white">
              {c.galleryLink}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {photos.map((img) => (
              <div key={img.id} className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-[#140B0A]">
                <Image
                  src={img.src}
                  alt={lang === "en" ? img.alt : img.altEs ?? img.alt}
                  fill
                  sizes="(max-width: 768px) 45vw, 30vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + hours */}
      <section className="bg-[#140B0A] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="mb-6 font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.faqTitle}</h2>
            <div className="divide-y divide-[#F4EBE1]/12 border-y border-[#F4EBE1]/12">
              {c.faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-[#F4EBE1] marker:hidden">
                    <h3 className="font-sans text-lg font-normal text-[#F4EBE1]">{f.q}</h3>
                    <span aria-hidden className="text-2xl leading-none text-[#D4A574] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-[#F4EBE1]/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-[1.75rem] border border-[#D4A574]/30 bg-[#0E0706] p-8">
            <p className="mb-3 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#D4A574]">
              <Clock className="h-4 w-4" aria-hidden />
              {c.hoursTitle}
            </p>
            <dl className="space-y-2">
              {c.hours.map((h) => (
                <div key={h.d} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <dt className="text-[#F4EBE1]/70">{h.d}</dt>
                  <dd className="font-display text-lg text-[#F4EBE1]">{h.h}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-[#F4EBE1]/70">{c.hoursNote}</p>
            <a href={DM_URL} target="_blank" rel="noopener noreferrer" className="glow-pill mt-8 w-full justify-center">
              {c.cta}
            </a>
            <p className="mt-6 text-sm text-[#F4EBE1]/70">{c.other}</p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-1 text-lg text-[#E8C9A8] underline-offset-4 hover:underline">
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </a>
              <a href={tel} className="inline-flex items-center gap-2 py-1 text-lg text-[#E8C9A8] underline-offset-4 hover:underline">
                <Phone className="h-4 w-4" aria-hidden />
                {BUSINESS.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <footer className="px-6 py-10 text-center md:px-10">
        <Link href="/" className="inline-block py-2 text-sm text-[#E8C9A8] underline underline-offset-4 hover:text-white">
          {c.back}
        </Link>
        <p className="mt-4 text-sm text-[#F4EBE1]/60">© {new Date().getFullYear()} {BUSINESS.name} · Bay Ridge, Brooklyn</p>
      </footer>
    </main>
  );
}
