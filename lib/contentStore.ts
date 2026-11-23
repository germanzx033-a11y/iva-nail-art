export interface HeroSceneContent {
  src: string;
  en: string[];
  es: string[];
  noteEn: string;
  noteEs: string;
}

export interface ServiceContentItem {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  durationMin: number;
  tagEn: string;
  tagEs: string;
}

export interface SiteContent {
  businessName: string;
  phone: string;
  whatsappNumber: string;
  instagram: string;
  tiktok: string;
  location: string;
  deposit: number;
  hoursEn: { days: string; time: string }[];
  hoursEs: { days: string; time: string }[];
  heroScenes: HeroSceneContent[];
  aboutIva: {
    name: string;
    titleEn: string;
    titleEs: string;
    bioEn: string;
    bioEs: string;
  };
  services: ServiceContentItem[];
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  businessName: "IVA Nail Art NY",
  phone: "+1 (929) 625-7273",
  whatsappNumber: "19296257273",
  instagram: "iva_nailart_nyc",
  tiktok: "iva_nailart_nyc",
  location: "Bay Ridge, Brooklyn, NY 11209",
  deposit: 35,
  hoursEn: [
    { days: "Mon – Fri", time: "5:30 PM – 10:00 PM" },
    { days: "Sat – Sun", time: "10:00 AM – 10:00 PM" },
  ],
  hoursEs: [
    { days: "Lun – Vie", time: "5:30 PM – 10:00 PM" },
    { days: "Sáb – Dom", time: "10:00 AM – 10:00 PM" },
  ],
  heroScenes: [
    {
      src: "/trabajo1.jpg",
      en: ["Sculpted acrylics & bespoke art", "in Bay Ridge, Brooklyn"],
      es: ["Uñas acrílicas & nail art", "en Bay Ridge, Brooklyn"],
      noteEn: "Sculpted acrylics, Russian manicure, and hand-painted bespoke designs in a private studio, with time that is only yours.",
      noteEs: "Uñas acrílicas esculpidas, manicura rusa y diseños a mano alzada en un estudio privado, con un tiempo solo para ti.",
    },
    {
      src: "/trabajo2.jpg",
      en: ["Handcrafted", "with precision"],
      es: ["Diseños únicos", "a mano alzada"],
      noteEn: "Every acrylic set is sculpted and detailed exclusively for you — no two are the same.",
      noteEs: "Cada set se esculpe y pinta exclusivamente para ti: no hay dos iguales.",
    },
    {
      src: "/trabajo3.jpg",
      en: ["Quote & booking", "in one message"],
      es: ["Cotización a medida", "en un solo mensaje"],
      noteEn: "Send your inspiration photo, get your custom quote, and pick your time. Iva replies within 1–2 hours.",
      noteEs: "Envía una foto de tu diseño, recibe tu cotización personalizada y elige tu horario. Iva responde en 1 a 2 horas.",
    },
  ],
  aboutIva: {
    name: "Ivannía Rodríguez",
    titleEn: "Master Nail Artist & Founder",
    titleEs: "Master Nail Artist & Fundadora",
    bioEn: "Passionate nail artist based in Brooklyn, NY. Specializing in sculpted acrylic sets, precision Russian dry manicures, and bespoke hand-painted nail art. Maximum 2 to 3 appointments per day in a private sanctuary where your time is exclusively yours.",
    bioEs: "Artista de uñas apasionada en Brooklyn, NY. Especialista en sets de acrílico esculpido, manicura rusa en seco y arte a mano alzada. Máximo 2 a 3 citas por día en un estudio privado donde el tiempo es 100% para ti.",
  },
  services: [
    {
      id: "acrylic-fullset",
      name: "Sculpted Acrylic Full Set",
      nameEs: "Set Completo de Acrílico",
      description: "Full sculpted acrylic extensions tailored in length and shape (coffin, square, almond, stiletto) with perfect apex balance.",
      descriptionEs: "Extensiones completas esculpidas en acrílico con forma y largo a medida (coffin, square, almendra) y balance de ápice perfecto.",
      durationMin: 120,
      tagEn: "Signature Acrylic",
      tagEs: "Especialidad Acrílico",
    },
    {
      id: "russian-mani",
      name: "The Signature Russian Dry Mani",
      nameEs: "Manicura Rusa Signature",
      description: "Deep e-file diamond bit cuticle clean, keratin strengthening, and high-gloss luxury finish on natural nails.",
      descriptionEs: "Limpieza profunda de cutícula con torno y fresas de diamante, refuerzo de queratina y esmaltado de alta gama.",
      durationMin: 90,
      tagEn: "Cuticle Care",
      tagEs: "Cuidado de Cutícula",
    },
    {
      id: "acrylic-refill",
      name: "Acrylic Refill & Apex Balance",
      nameEs: "Relleno & Mantenimiento Acrílico",
      description: "Maintenance refill for existing acrylic sets, structural rebalancing, and seamless cuticle blend for 3-4 weeks durability.",
      descriptionEs: "Mantenimiento y relleno de tu set de acrílico, balance de estructura y renovación impecable para 3-4 semanas.",
      durationMin: 90,
      tagEn: "Maintenance",
      tagEs: "Mantenimiento",
    },
  ],
};

export const SITE_CONTENT_STORAGE_KEY = "iva_site_content_custom_v1";

/**
 * Returns content from localStorage if available (client-side), or defaults.
 */
export function getSavedSiteContent(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_SITE_CONTENT;
  try {
    const raw = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_CONTENT;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SITE_CONTENT,
      ...parsed,
      heroScenes: Array.isArray(parsed.heroScenes) && parsed.heroScenes.length === 3 ? parsed.heroScenes : DEFAULT_SITE_CONTENT.heroScenes,
      aboutIva: { ...DEFAULT_SITE_CONTENT.aboutIva, ...(parsed.aboutIva || {}) },
      services: Array.isArray(parsed.services) && parsed.services.length ? parsed.services : DEFAULT_SITE_CONTENT.services,
    };
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

/**
 * Saves updated content to localStorage and dispatches a storage event.
 */
export function saveSiteContent(content: SiteContent): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new Event("iva-content-updated"));
  } catch (err) {
    console.error("Error saving site content:", err);
  }
}

/**
 * Resets site content back to studio defaults.
 */
export function resetSiteContent(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SITE_CONTENT_STORAGE_KEY);
    window.dispatchEvent(new Event("iva-content-updated"));
  } catch (err) {
    console.error("Error resetting site content:", err);
  }
}
