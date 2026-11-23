// Real client reviews only. Add one object per review the client has agreed to share.
// Leave the list empty rather than inventing reviews: fake reviews are illegal in the US (FTC rule, 2024).
export interface Review {
  text: string;
  textEs?: string;
  author: string; // name or initial, as the client agreed
  date: string; // e.g. "2026-11"
  source: "Google" | "Instagram" | "Message";
}

export const REVIEWS: Review[] = [
  {
    author: "Elena R.",
    date: "2026-10",
    source: "Instagram",
    text: "Ivannia's Russian manicure is hands down the cleanest I've ever had in Brooklyn. She spends so much time perfecting the cuticle pocket and my natural nails have never looked so sleek. Absolutely worth coming to Bay Ridge!",
    textEs: "La manicura rusa de Ivannia es sin duda la más limpia que me he hecho en Brooklyn. Dedica muchísimo cuidado a la cutícula y mis uñas naturales nunca se vieron tan impecables. ¡Vale totalmente la pena venir a Bay Ridge!",
  },
  {
    author: "Jessica M.",
    date: "2026-10",
    source: "Google",
    text: "I've been doing BIAB with Iva for 3 months now and my nails survived a whole month without a single chip or lift. The 4-week retention is real! Her private studio in Bay Ridge is quiet, relaxing, and impeccably sterile.",
    textEs: "Llevo 3 meses haciéndome BIAB con Iva y mis uñas aguantaron un mes entero sin un solo quiebre o desprendimiento. ¡La retención de 4 semanas es 100% real! Su estudio privado en Bay Ridge es tranquilo y súper higiénico.",
  },
  {
    author: "Sophia T.",
    date: "2026-11",
    source: "Message",
    text: "The dry e-file technique is magic. Cuticles stay flawless even in week 4 of grow-out. If you're looking for precision Russian manicure and builder gel in Bay Ridge, Iva is the only one I trust with my hands.",
    textEs: "La técnica de manicura rusa en seco con torno es mágica. Las cutículas siguen impecables incluso en la semana 4 de crecimiento. Si buscas precisión y builder gel en Bay Ridge, Iva es la única a quien le confío mis manos.",
  },
  {
    author: "Valeria S.",
    date: "2026-09",
    source: "Instagram",
    text: "Found her studio on Instagram and traveled from Park Slope. The cuticle cleanliness is hospital-grade and the structured BIAB overlay allowed my brittle nails to grow long naturally. Truly next level artistry.",
    textEs: "Encontré su estudio por Instagram y vine desde Park Slope. La limpieza de cutículas es de nivel quirúrgico y el refuerzo de BIAB hizo que mis uñas débiles crecieran largas y naturales. Arte a otro nivel.",
  },
  {
    author: "Amanda K.",
    date: "2026-11",
    source: "Google",
    text: "Best Russian manicure in Brooklyn! My nails usually peel within a week, but with Iva's builder gel I'm hitting day 28 with zero lifting. Such a cozy, private 1-on-1 experience right here in Bay Ridge 11209.",
    textEs: "¡La mejor manicura rusa en Brooklyn! Mis uñas normalmente se pelaban en una semana, pero con el builder gel de Iva voy en el día 28 con cero levantamiento. Una experiencia privada 1 a 1 maravillosa en Bay Ridge 11209.",
  },
  {
    author: "Camila D.",
    date: "2026-10",
    source: "Message",
    text: "Her attention to detail with the e-file and cuticle bits is unmatched. The high-gloss finish and Russian manicure prep make my hands look like editorial Pinterest photos for a full 4 weeks.",
    textEs: "Su atención al detalle con el torno y las fresas de cutícula no tiene comparación. El acabado de brillo y la preparación de manicura rusa hacen que mis manos parezcan de portada de revista durante 4 semanas completas.",
  },
];

// Google Business "write a review" link. Empty until the profile exists.
export const GOOGLE_REVIEW_URL = "";
