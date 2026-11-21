/**
 * Content for the service landing pages (one route per service and language).
 * No prices or unverifiable claims: every quote is personal; $35 deposit only.
 */

export type Lang = "en" | "es";

export interface ServiceCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1Top: string;
  h1Bottom: string;
  intro: string;
  whatTitle: string;
  whatBody: string[];
  forTitle: string;
  forList: string[];
  steps: { t: string; d: string }[];
  careTitle: string;
  careBody: string[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  waText: string;
}

export interface ServiceLanding {
  slug: string;
  /** schema.org serviceType */
  serviceType: string;
  /** Which gallery photos to show (start index into GALLERY_IMAGES). */
  photoOffset: number;
  /** Service category on the home page that links here. */
  homeCategory: "manicure" | "pedicure" | "acrylic" | "nailart";
  copy: Record<Lang, ServiceCopy>;
}

export const SHARED = {
  en: {
    switchLabel: "ES",
    home: "Home",
    book: "Book",
    cta: "Book on Instagram",
    ctaNote: "Replies within 1–2 hours · $35 deposit holds your time",
    stepsTitle: "Your appointment",
    galleryTitle: "Recent sets from the studio",
    galleryLink: "See the full gallery",
    hoursTitle: "Hours",
    hours: [
      { d: "Mon – Fri", h: "5:30 PM – 10:00 PM" },
      { d: "Sat – Sun", h: "10:00 AM – 10:00 PM" },
    ],
    hoursNote: "By appointment only · 15-minute grace period · Cancel at least 24 hours ahead",
    other: "Other ways to reach Iva",
    more: "More services",
    back: "← Back to the home page",
    priceQ: "How much does it cost?",
    priceA:
      "Every set is quoted personally, based on length, removal and design. Send your idea on Instagram and Iva confirms the price before your appointment. A $35 deposit holds your time and is applied to your service.",
    whereQ: "Where is the studio?",
    whereA: "It is a private studio in Bay Ridge, Brooklyn (11209). The exact address is shared when your appointment is confirmed.",
  },
  es: {
    switchLabel: "EN",
    home: "Inicio",
    book: "Reservar",
    cta: "Reserva por Instagram",
    ctaNote: "Respuesta en 1 a 2 horas · Depósito de $35 para apartar tu cita",
    stepsTitle: "Tu cita",
    galleryTitle: "Diseños recientes del estudio",
    galleryLink: "Ver la galería completa",
    hoursTitle: "Horario",
    hours: [
      { d: "Lun – Vie", h: "5:30 PM – 10:00 PM" },
      { d: "Sáb – Dom", h: "10:00 AM – 10:00 PM" },
    ],
    hoursNote: "Solo con cita · 15 minutos de tolerancia · Cancela con al menos 24 horas",
    other: "Otras formas de contactar a Iva",
    more: "Más servicios",
    back: "← Volver al inicio",
    priceQ: "¿Cuánto cuesta?",
    priceA:
      "Cada diseño se cotiza de forma personalizada según el largo, el retiro y el diseño. Envía tu idea por Instagram e Iva te confirma el precio antes de tu cita. Un depósito de $35 aparta tu horario y se descuenta del servicio.",
    whereQ: "¿Dónde está el estudio?",
    whereA: "Es un estudio privado en Bay Ridge, Brooklyn (11209). La dirección exacta se comparte al confirmar tu cita.",
  },
} as const;

const sendIdea = {
  en: { t: "Send your idea", d: "Message Iva on Instagram with a photo of the look you want and whether you have product to remove." },
  es: { t: "Envía tu idea", d: "Escríbele a Iva por Instagram con una foto del diseño que quieres y dile si tienes producto para retirar." },
};
const getQuote = {
  en: { t: "Get your quote", d: "Iva confirms the design, the length and a personal price by message before your visit." },
  es: { t: "Recibe tu cotización", d: "Iva te confirma por mensaje el diseño, el largo y un precio personalizado antes de tu visita." },
};

export const SERVICE_LANDINGS: ServiceLanding[] = [
  {
    slug: "builder-gel-bay-ridge",
    serviceType: "Builder Gel Manicure",
    photoOffset: 0,
    homeCategory: "manicure",
    copy: {
      en: {
        metaTitle: "Builder Gel Manicure in Bay Ridge, Brooklyn | IVA Nail Art NY",
        metaDescription:
          "Builder gel manicure in a private Bay Ridge studio: strong, natural-looking nails, any design on top and maintenance every 2–3 weeks. Book on Instagram.",
        eyebrow: "Builder gel · Bay Ridge, Brooklyn",
        h1Top: "Builder gel manicure",
        h1Bottom: "in Bay Ridge, Brooklyn",
        intro:
          "Strong, natural-looking nails that keep their shape — done one-on-one by Iva in a private studio in Bay Ridge. By appointment only, in English or Spanish.",
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
        steps: [
          sendIdea.en,
          getQuote.en,
          { t: "Prep and structure", d: "Your nails are prepped gently, then the builder gel is shaped to give each nail a balanced structure." },
          { t: "Your design", d: "Color, finish or hand-painted art on top — exactly the look you chose." },
        ],
        careTitle: "Maintenance and regular visits",
        careBody: [
          "Most builder gel sets are refreshed every 2–3 weeks as your nails grow. At each visit the structure is rebalanced and you can change your design.",
          "Book your next appointment before you leave to keep your preferred day and time.",
        ],
        faqTitle: "Builder gel questions",
        faq: [
          { q: "How long does builder gel last?", a: "It depends on how fast your nails grow and your daily routine. Most clients refresh their set every 2–3 weeks." },
          { q: "Does builder gel damage natural nails?", a: "Applied and removed correctly, builder gel protects the natural nail. Avoid peeling or picking it off at home — book a removal instead." },
          { q: "Builder gel or acrylic?", a: "Builder gel feels lighter and more flexible and is ideal for strengthening your own nails. Acrylic is often chosen for longer extensions. Iva can recommend the best option for your nails." },
          { q: "Can I get nail art on builder gel?", a: "Yes. Builder gel is a great base for any design, from a simple French to detailed hand-painted art." },
        ],
        waText: "Hi Iva! I would like to book a builder gel manicure. Preferred date: … Do I have product to remove? …",
      },
      es: {
        metaTitle: "Manicura Builder Gel en Bay Ridge, Brooklyn | IVA Nail Art NY",
        metaDescription:
          "Manicura builder gel en un estudio privado de Bay Ridge: uñas fuertes y naturales, cualquier diseño y mantenimiento cada 2 a 3 semanas. Reserva por Instagram.",
        eyebrow: "Builder gel · Bay Ridge, Brooklyn",
        h1Top: "Manicura builder gel",
        h1Bottom: "en Bay Ridge, Brooklyn",
        intro:
          "Uñas fuertes, de aspecto natural y que mantienen su forma. Atención uno a uno con Iva en un estudio privado en Bay Ridge. Solo con cita, en español o inglés.",
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
        steps: [
          sendIdea.es,
          getQuote.es,
          { t: "Preparación y estructura", d: "Tus uñas se preparan con cuidado y luego se moldea el builder gel para darle a cada uña una estructura equilibrada." },
          { t: "Tu diseño", d: "Color, acabado o arte pintado a mano encima: justo el diseño que elegiste." },
        ],
        careTitle: "Mantenimiento y visitas regulares",
        careBody: [
          "La mayoría de los sets de builder gel se renuevan cada 2 a 3 semanas, a medida que crece la uña. En cada visita se reequilibra la estructura y puedes cambiar de diseño.",
          "Agenda tu próxima cita antes de irte para conservar tu día y horario preferidos.",
        ],
        faqTitle: "Preguntas sobre builder gel",
        faq: [
          { q: "¿Cuánto dura el builder gel?", a: "Depende de qué tan rápido crecen tus uñas y de tu rutina. La mayoría de las clientas renuevan su set cada 2 a 3 semanas." },
          { q: "¿El builder gel daña la uña natural?", a: "Bien aplicado y bien retirado, el builder gel protege la uña natural. Evita arrancarlo en casa: agenda un retiro." },
          { q: "¿Builder gel o acrílico?", a: "El builder gel se siente más ligero y flexible, y es ideal para fortalecer tus propias uñas. El acrílico se suele elegir para extensiones más largas. Iva te recomienda la mejor opción para tus uñas." },
          { q: "¿Puedo hacerme nail art sobre builder gel?", a: "Sí. El builder gel es una base excelente para cualquier diseño, desde una francesa sencilla hasta arte detallado pintado a mano." },
        ],
        waText: "¡Hola Iva! Me gustaría reservar una manicura builder gel. Fecha preferida: … ¿Tengo producto para retirar? …",
      },
    },
  },
  {
    slug: "nail-art-bay-ridge",
    serviceType: "Custom Nail Art",
    photoOffset: 6,
    homeCategory: "nailart",
    copy: {
      en: {
        metaTitle: "Custom Nail Art in Bay Ridge, Brooklyn | IVA Nail Art NY",
        metaDescription:
          "Hand-painted, custom nail art in a private Bay Ridge studio: chrome, cat-eye, French, 3D and detailed designs made for you. Book on Instagram.",
        eyebrow: "Nail art · Bay Ridge, Brooklyn",
        h1Top: "Custom nail art",
        h1Bottom: "in Bay Ridge, Brooklyn",
        intro:
          "Designs drawn for you, from a clean French to detailed hand-painted art — one-on-one with Iva in a private studio in Bay Ridge.",
        whatTitle: "Designs made for you",
        whatBody: [
          "Bring a photo you saved or an idea you have in mind. Iva adapts it to your nail shape, length and style, and paints the details by hand.",
          "Popular finishes include chrome, aura, cat-eye, French variations, 3D details, charms and fully illustrated sets.",
        ],
        forTitle: "Great for",
        forList: [
          "Recreating a design you saved on Instagram or TikTok",
          "Birthdays, weddings, vacations and special events",
          "Adding accent nails to a simple set",
          "Trying a new trend with a personal touch",
        ],
        steps: [
          sendIdea.en,
          getQuote.en,
          { t: "Base and shape", d: "Your nails are prepped and shaped, with gel, builder gel or acrylic as the base." },
          { t: "Hand-painted details", d: "Iva paints the design detail by detail so it looks like the photo you loved." },
        ],
        careTitle: "Keep your design looking fresh",
        careBody: [
          "Wear gloves for cleaning, use cuticle oil and avoid using your nails as tools. Most clients refresh their set every 2–3 weeks.",
          "At your next visit you can keep the same look or try a new design.",
        ],
        faqTitle: "Nail art questions",
        faq: [
          { q: "Can you recreate a design from a photo?", a: "Yes. Send the photo by Instagram message and Iva will tell you how she can adapt it to your nails." },
          { q: "How long does a nail art appointment take?", a: "It depends on the design and the number of detailed nails. Iva tells you the estimated time when she confirms your quote." },
          { q: "Can I mix simple and detailed nails?", a: "Of course. Many clients choose a few accent nails with art and a solid color on the rest." },
          { q: "What base do you use for nail art?", a: "Gel, builder gel or acrylic, depending on your natural nails and the length you want." },
        ],
        waText: "Hi Iva! I would like to book a nail art appointment. My idea: … Preferred date: …",
      },
      es: {
        metaTitle: "Nail Art Personalizado en Bay Ridge, Brooklyn | IVA Nail Art NY",
        metaDescription:
          "Nail art personalizado y pintado a mano en un estudio privado de Bay Ridge: cromo, ojo de gato, francesa, 3D y diseños detallados. Reserva por Instagram.",
        eyebrow: "Nail art · Bay Ridge, Brooklyn",
        h1Top: "Nail art personalizado",
        h1Bottom: "en Bay Ridge, Brooklyn",
        intro:
          "Diseños hechos para ti, desde una francesa sencilla hasta arte detallado pintado a mano. Atención uno a uno con Iva en un estudio privado en Bay Ridge.",
        whatTitle: "Diseños hechos para ti",
        whatBody: [
          "Trae una foto que guardaste o una idea que tengas en mente. Iva la adapta a la forma, el largo y el estilo de tus uñas, y pinta los detalles a mano.",
          "Entre los acabados más pedidos están cromo, aura, ojo de gato, variaciones de francesa, detalles 3D, charms y sets ilustrados.",
        ],
        forTitle: "Ideal para",
        forList: [
          "Recrear un diseño que guardaste en Instagram o TikTok",
          "Cumpleaños, bodas, vacaciones y eventos especiales",
          "Agregar uñas decoradas a un set sencillo",
          "Probar una tendencia con un toque personal",
        ],
        steps: [
          sendIdea.es,
          getQuote.es,
          { t: "Base y forma", d: "Tus uñas se preparan y se les da forma, con gel, builder gel o acrílico como base." },
          { t: "Detalles a mano", d: "Iva pinta el diseño detalle por detalle para que se vea como la foto que te gustó." },
        ],
        careTitle: "Mantén tu diseño como nuevo",
        careBody: [
          "Usa guantes para limpiar, aplica aceite de cutícula y evita usar las uñas como herramienta. La mayoría de las clientas renuevan su set cada 2 a 3 semanas.",
          "En tu próxima visita puedes repetir el diseño o probar uno nuevo.",
        ],
        faqTitle: "Preguntas sobre nail art",
        faq: [
          { q: "¿Puedes recrear un diseño de una foto?", a: "Sí. Envía la foto por mensaje de Instagram e Iva te dice cómo puede adaptarla a tus uñas." },
          { q: "¿Cuánto dura una cita de nail art?", a: "Depende del diseño y de cuántas uñas llevan detalle. Iva te dice el tiempo estimado al confirmar tu cotización." },
          { q: "¿Puedo combinar uñas sencillas y decoradas?", a: "Claro. Muchas clientas eligen algunas uñas con arte y color liso en las demás." },
          { q: "¿Qué base usas para el nail art?", a: "Gel, builder gel o acrílico, según tus uñas naturales y el largo que quieras." },
        ],
        waText: "¡Hola Iva! Me gustaría reservar una cita de nail art. Mi idea: … Fecha preferida: …",
      },
    },
  },
  {
    slug: "acrylic-nails-bay-ridge",
    serviceType: "Acrylic Nail Set",
    photoOffset: 12,
    homeCategory: "acrylic",
    copy: {
      en: {
        metaTitle: "Acrylic Nails in Bay Ridge, Brooklyn | IVA Nail Art NY",
        metaDescription:
          "Acrylic full sets and fills in a private Bay Ridge studio: the length and shape you want, any design on top. Book on Instagram.",
        eyebrow: "Acrylic nails · Bay Ridge, Brooklyn",
        h1Top: "Acrylic nails",
        h1Bottom: "in Bay Ridge, Brooklyn",
        intro:
          "Full sets and fills with the length and shape you want — almond, coffin, square or stiletto — one-on-one with Iva in a private studio in Bay Ridge.",
        whatTitle: "Length, shape and strength",
        whatBody: [
          "Acrylic is a durable option for extensions. It lets you choose the length and shape you want, even if your natural nails are short.",
          "Wear it with a solid color, French, chrome or a full hand-painted design.",
        ],
        forTitle: "A good choice if you want",
        forList: [
          "Extra length from short natural nails",
          "A defined shape like coffin, almond or stiletto",
          "A sturdy base for bold designs and charms",
          "Regular fills to keep your set looking new",
        ],
        steps: [
          sendIdea.en,
          getQuote.en,
          { t: "Shape and length", d: "Your nails are prepped, then the acrylic is built and filed to the length and shape you chose." },
          { t: "Finish and design", d: "Color, French, chrome or hand-painted art to complete your set." },
        ],
        careTitle: "Fills and removal",
        careBody: [
          "Acrylic sets are usually filled every 2–3 weeks as your nails grow. Ask about a fill when you book your next visit.",
          "When you want to take them off, book a removal — never pull or bite them off at home.",
        ],
        faqTitle: "Acrylic questions",
        faq: [
          { q: "How often do I need a fill?", a: "Most clients come back every 2–3 weeks, depending on how fast their nails grow." },
          { q: "Acrylic or builder gel?", a: "Acrylic is often chosen for longer extensions; builder gel is lighter and ideal for strengthening your own nails. Iva can recommend what suits you." },
          { q: "Can you remove a set from another salon?", a: "Yes. Mention it in your message so the removal can be included in your time and quote." },
          { q: "Which shapes can I choose?", a: "Square, squoval, round, almond, coffin or stiletto — tell Iva your favorite when you book." },
        ],
        waText: "Hi Iva! I would like to book an acrylic set. Shape and length: … Preferred date: …",
      },
      es: {
        metaTitle: "Uñas Acrílicas en Bay Ridge, Brooklyn | IVA Nail Art NY",
        metaDescription:
          "Sets acrílicos y rellenos en un estudio privado de Bay Ridge: el largo y la forma que quieres, con cualquier diseño. Reserva por Instagram.",
        eyebrow: "Uñas acrílicas · Bay Ridge, Brooklyn",
        h1Top: "Uñas acrílicas",
        h1Bottom: "en Bay Ridge, Brooklyn",
        intro:
          "Sets completos y rellenos con el largo y la forma que quieres (almendra, coffin, cuadrada o stiletto). Atención uno a uno con Iva en un estudio privado en Bay Ridge.",
        whatTitle: "Largo, forma y resistencia",
        whatBody: [
          "El acrílico es una opción resistente para extensiones. Te permite elegir el largo y la forma que quieras, aunque tus uñas naturales sean cortas.",
          "Llévalo con color liso, francesa, cromo o un diseño pintado a mano.",
        ],
        forTitle: "Buena opción si quieres",
        forList: [
          "Más largo partiendo de uñas naturales cortas",
          "Una forma definida como coffin, almendra o stiletto",
          "Una base resistente para diseños llamativos y charms",
          "Rellenos regulares para que tu set se vea como nuevo",
        ],
        steps: [
          sendIdea.es,
          getQuote.es,
          { t: "Forma y largo", d: "Tus uñas se preparan y luego se construye y lima el acrílico con el largo y la forma que elegiste." },
          { t: "Acabado y diseño", d: "Color, francesa, cromo o arte pintado a mano para completar tu set." },
        ],
        careTitle: "Rellenos y retiro",
        careBody: [
          "Los sets acrílicos suelen rellenarse cada 2 a 3 semanas, a medida que crece la uña. Pregunta por el relleno al reservar tu próxima visita.",
          "Cuando quieras quitarlos, agenda un retiro: nunca los arranques ni los muerdas en casa.",
        ],
        faqTitle: "Preguntas sobre acrílico",
        faq: [
          { q: "¿Cada cuánto necesito relleno?", a: "La mayoría de las clientas vuelven cada 2 a 3 semanas, según qué tan rápido les crecen las uñas." },
          { q: "¿Acrílico o builder gel?", a: "El acrílico se suele elegir para extensiones más largas; el builder gel es más ligero e ideal para fortalecer tus propias uñas. Iva te recomienda lo que mejor te queda." },
          { q: "¿Puedes retirar un set de otro salón?", a: "Sí. Menciónalo en tu mensaje para incluir el retiro en el tiempo y la cotización." },
          { q: "¿Qué formas puedo elegir?", a: "Cuadrada, squoval, redonda, almendra, coffin o stiletto: dile a Iva tu favorita al reservar." },
        ],
        waText: "¡Hola Iva! Me gustaría reservar un set acrílico. Forma y largo: … Fecha preferida: …",
      },
    },
  },
  {
    slug: "pedicure-bay-ridge",
    serviceType: "Gel Pedicure",
    photoOffset: 18,
    homeCategory: "pedicure",
    copy: {
      en: {
        metaTitle: "Gel Pedicure in Bay Ridge, Brooklyn | IVA Nail Art NY",
        metaDescription:
          "Classic, gel and spa pedicures in a private Bay Ridge studio, by appointment and with time that is only yours. Book on Instagram.",
        eyebrow: "Pedicure · Bay Ridge, Brooklyn",
        h1Top: "Gel pedicure",
        h1Bottom: "in Bay Ridge, Brooklyn",
        intro:
          "Classic, gel and spa pedicures in a calm, private studio in Bay Ridge — no waiting room, no rush. By appointment only, in English or Spanish.",
        whatTitle: "Pedicures without the rush",
        whatBody: [
          "Your feet are cleaned, nails shaped and cuticles cared for, then finished with regular polish or long-lasting gel.",
          "Add a simple design or match your manicure for a complete look.",
        ],
        forTitle: "Choose from",
        forList: [
          "Classic pedicure with regular polish",
          "Gel pedicure for a longer-lasting shine",
          "Spa pedicure with extra care",
          "A matching design for your hands and feet",
        ],
        steps: [
          { t: "Message Iva", d: "Tell Iva on Instagram which pedicure you want and your preferred day." },
          getQuote.en,
          { t: "Care and prep", d: "Feet are cleaned, nails shaped and cuticles cared for." },
          { t: "Color or gel", d: "Your color in regular polish or gel, with a design if you like." },
        ],
        careTitle: "Make it last",
        careBody: [
          "Wear open shoes right after a regular polish and moisturize your feet daily. Gel pedicures usually keep their shine for several weeks.",
          "Book your next pedicure together with your manicure to save time.",
        ],
        faqTitle: "Pedicure questions",
        faq: [
          { q: "How long does a gel pedicure last?", a: "It depends on your routine and footwear, but gel usually keeps its shine for several weeks." },
          { q: "Can I book a manicure and pedicure together?", a: "Yes. Mention both in your message so Iva can plan enough time for your appointment." },
          { q: "Can I add a design to my pedicure?", a: "Of course — from a simple accent to a design that matches your manicure." },
        ],
        waText: "Hi Iva! I would like to book a pedicure. Type: classic / gel / spa. Preferred date: …",
      },
      es: {
        metaTitle: "Pedicura en Gel en Bay Ridge, Brooklyn | IVA Nail Art NY",
        metaDescription:
          "Pedicura clásica, en gel y spa en un estudio privado de Bay Ridge, con cita y un tiempo solo para ti. Reserva por Instagram.",
        eyebrow: "Pedicura · Bay Ridge, Brooklyn",
        h1Top: "Pedicura en gel",
        h1Bottom: "en Bay Ridge, Brooklyn",
        intro:
          "Pedicura clásica, en gel y spa en un estudio privado y tranquilo en Bay Ridge, sin sala de espera y sin prisas. Solo con cita, en español o inglés.",
        whatTitle: "Pedicura sin prisas",
        whatBody: [
          "Se limpian tus pies, se da forma a las uñas y se cuidan las cutículas, y se termina con esmalte regular o gel de larga duración.",
          "Agrega un diseño sencillo o combínalo con tu manicura para un look completo.",
        ],
        forTitle: "Elige entre",
        forList: [
          "Pedicura clásica con esmalte regular",
          "Pedicura en gel para un brillo más duradero",
          "Pedicura spa con cuidado extra",
          "Un diseño a juego para manos y pies",
        ],
        steps: [
          { t: "Escríbele a Iva", d: "Dile a Iva por Instagram qué pedicura quieres y tu día preferido." },
          getQuote.es,
          { t: "Cuidado y preparación", d: "Se limpian los pies, se da forma a las uñas y se cuidan las cutículas." },
          { t: "Color o gel", d: "Tu color en esmalte regular o gel, con diseño si quieres." },
        ],
        careTitle: "Para que dure más",
        careBody: [
          "Usa calzado abierto justo después de un esmalte regular e hidrata tus pies a diario. La pedicura en gel suele mantener su brillo varias semanas.",
          "Agenda tu próxima pedicura junto con tu manicura para ahorrar tiempo.",
        ],
        faqTitle: "Preguntas sobre pedicura",
        faq: [
          { q: "¿Cuánto dura una pedicura en gel?", a: "Depende de tu rutina y tu calzado, pero el gel suele mantener su brillo varias semanas." },
          { q: "¿Puedo reservar manicura y pedicura juntas?", a: "Sí. Menciona ambas en tu mensaje para que Iva planee el tiempo suficiente para tu cita." },
          { q: "¿Puedo agregar un diseño a mi pedicura?", a: "Claro: desde un detalle sencillo hasta un diseño a juego con tu manicura." },
        ],
        waText: "¡Hola Iva! Me gustaría reservar una pedicura. Tipo: clásica / gel / spa. Fecha preferida: …",
      },
    },
  },
];

export function landingPath(slug: string, lang: Lang): string {
  return lang === "en" ? `/${slug}` : `/es/${slug}`;
}

export function getLanding(slug: string): ServiceLanding {
  const landing = SERVICE_LANDINGS.find((l) => l.slug === slug);
  if (!landing) throw new Error(`Unknown service landing: ${slug}`);
  return landing;
}
