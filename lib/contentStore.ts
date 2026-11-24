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

export interface UploadedImageItem {
  id: string;
  src: string;
  name: string;
  timestamp: number;
}

export interface GalleryItemContent {
  id: string;
  src: string;
  alt: string;
  altEs?: string;
  styleTag?: string;
  category: string;
}

export interface ServiceCustomText {
  name: string;
  nameEs: string;
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
  serviceImages: Record<string, string>;
  serviceTexts: Record<string, ServiceCustomText>;
  galleryItems: GalleryItemContent[];
  uploadedImages: UploadedImageItem[];
}

export const DEFAULT_SERVICE_IMAGES: Record<string, string> = {
  m1: "/gallery/241c7f28-5927-40de-8e0c-0a9c468846f0.jpg",
  m2: "/gallery/03d9f11c-1dfb-494d-9195-eb0db1acfb1e.jpg",
  m3: "/gallery/afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg",
  m4: "/gallery/f6a27073-5f54-4bdb-8fe1-736ed181a126.jpg",
  m5: "/gallery/1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg",
  p1: "/gallery/427a7f8e-1a34-4441-b9ca-fc60cb512ee7.jpg",
  p2: "/gallery/03d9f11c-1dfb-494d-9195-eb0db1acfb1e.jpg",
  p3: "/gallery/3923d364-f716-4ba2-961d-83f75dedb613.jpg",
  p4: "/gallery/5ab8ff73-fcb2-421d-b6bf-8169824f1a52.jpg",
  a1: "/gallery/0ee48e92-e11b-42dc-8a05-93c1aac67179.jpg",
  a2: "/gallery/810c6eb7-e2e7-49eb-87e4-c6867d09f390.jpg",
  a3: "/gallery/2b1d20c5-dd9d-45d5-85eb-da7821a34743.jpg",
  n1: "/gallery/7f90a13c-e5fa-4911-9798-a038d8e5753e.jpg",
  n2: "/gallery/0252121b-f561-4b19-bf43-11cdd5a1f36a.jpg",
  n3: "/gallery/14e8d740-b174-48d9-8c87-bddcb007ec72.jpg",
  n4: "/gallery/bff1062d-a2d4-4432-af01-0853a1a8cc82.jpg",
  n5: "/gallery/d9206f5a-c79f-4487-870d-a7bb5d75cef7.jpg",
  e1: "/gallery/5a9cfad8-1d83-41a9-adbc-5e4b6b5895e1.jpg",
  e2: "/gallery/c2bba6fb-d001-4658-bda3-2c78d8d59011.jpg",
  e3: "/gallery/fbec4b74-7503-47de-9cd8-d78bc318cc18.jpg",
};

export const DEFAULT_SERVICE_TEXTS: Record<string, ServiceCustomText> = {
  m1: { name: "Classic Dry Manicure", nameEs: "Manicura Clásica en Seco" },
  m2: { name: "Long-Wear Gel Manicure", nameEs: "Manicura en Gel de Larga Duración" },
  m3: { name: "The Signature Russian Dry Mani", nameEs: "Manicura Rusa Signature" },
  m4: { name: "Structured Builder Gel", nameEs: "Gel Estructurado de Alta Gama" },
  m5: { name: "Sculpted Extensions", nameEs: "Extensiones Esculpidas" },
  p1: { name: "Artisan Floral Manicure", nameEs: "Manicura Floral Artesanal" },
  p2: { name: "Glazed Porcelain Gel", nameEs: "Manicura Gel Porcelana Glaseada" },
  p3: { name: "Bridal Opal Crystal Mani", nameEs: "Manicura Bridal Ópalo" },
  p4: { name: "Baby Boomer Ombré Nails", nameEs: "Set Baby Boomer Ombré" },
  a1: { name: "Sculpted Acrylic Full Set", nameEs: "Set Completo de Acrílico (Esculpido)" },
  a2: { name: "Acrylic Refill & Apex Balance", nameEs: "Relleno de Acrílico & Mantenimiento" },
  a3: { name: "Safe Acrylic Removal", nameEs: "Remoción de Acrílico Seguro" },
  n1: { name: "Minimalist Nail Art (Tier 1)", nameEs: "Nail Art Nivel 1 (Minimalista)" },
  n2: { name: "Artisan Hand-Painted (Tier 2)", nameEs: "Nail Art Nivel 2 (Pintado a Mano)" },
  n3: { name: "Haute Couture 3D (Tier 3)", nameEs: "Nail Art Nivel 3 (Haute Couture 3D)" },
  n4: { name: "Velvet Cat Eye / Chrome", nameEs: "Efecto Cromo / Cat-Eye Velvet" },
  n5: { name: "French Tips & Micro-Pearls", nameEs: "Líneas Francesas & Perlas" },
  e1: { name: "Safe E-File Removal", nameEs: "Retiro Seguro con Fresas" },
  e2: { name: "Single Nail Repair", nameEs: "Reparación de Uña Individual" },
  e3: { name: "Keratin Soak & Nourish", nameEs: "Remojo y Nutrición de Queratina" },
};

export const DEFAULT_GALLERY_ITEMS: GalleryItemContent[] = [
  { id: "img-1", src: "/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg", alt: "Editorial Orange Floral Contour Tips", altEs: "Puntas Florales Naranja Editorial", category: "french", styleTag: "Artisan Floral" },
  { id: "img-2", src: "/gallery/afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg", alt: "High-Gloss Nude Minimalist Nails", altEs: "Uñas Nude Minimalistas de Alto Brillo", category: "minimalist", styleTag: "Clean Girl" },
  { id: "img-3", src: "/gallery/f0d71275-94d3-4325-9592-55cbe28a5bdd.jpg", alt: "Leopard Micro-French Tips", altEs: "Micro-Francesa Estampado Leopardo", category: "french", styleTag: "Animalier French" },
  { id: "img-4", src: "/gallery/1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg", alt: "Champagne Glazed Finish", altEs: "Acabado Glaseado Champaña", category: "chrome", styleTag: "Glazed Chrome" },
  { id: "img-5", src: "/gallery/2b1d20c5-dd9d-45d5-85eb-da7821a34743.jpg", alt: "Delicate Negative Space Linear Art", altEs: "Arte Lineal en Espacio Negativo", category: "minimalist", styleTag: "Negative Space" },
  { id: "img-6", src: "/gallery/14e8d740-b174-48d9-8c87-bddcb007ec72.jpg", alt: "Sculpted 3D Metallic Pearl Drops", altEs: "Gotas de Perla y Metal Esculpidas en 3D", category: "3dart", styleTag: "3D Metallic Drops" },
  { id: "img-7", src: "/gallery/810c6eb7-e2e7-49eb-87e4-c6867d09f390.jpg", alt: "Sculpted Acrylic Hand-Painted Lemon & Fruit Swirl Art", altEs: "Acrílico Escultural con Arte Frutal a Mano y Ondas", category: "3dart", styleTag: "Sculpted Acrylic Art" },
  { id: "img-8", src: "/gallery/0252121b-f561-4b19-bf43-11cdd5a1f36a.jpg", alt: "Liquid Gold French Smile Line", altEs: "Línea de Sonrisa Francesa Oro Líquido", category: "french", styleTag: "Molten Gold French" },
  { id: "img-9", src: "/gallery/2e0b31b1-9878-4a33-a0a9-6b505f577892.jpg", alt: "Gold Studded Haute French Tips", altEs: "Francesa de Alta Costura con Tachuelas de Oro", category: "french", styleTag: "Gold Studded French" },
  { id: "img-10", src: "/trabajo1.jpg", alt: "Signature Sculpted Acrylic Set", altEs: "Set Signature de Uñas Acrílicas Esculpidas", category: "3dart", styleTag: "Signature Acrylic" },
  { id: "img-11", src: "/trabajo2.jpg", alt: "Hand-Painted Nail Art Masterpiece", altEs: "Obra de Arte Pintada a Mano", category: "french", styleTag: "Bespoke Art" },
  { id: "img-12", src: "/trabajo3.jpg", alt: "Holiday Red & Gold Ribbon Velvet Nails", altEs: "Uñas de Terciopelo con Lazos Rojos y Dorados", category: "3dart", styleTag: "Holiday Velvet" },
];

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
  serviceImages: DEFAULT_SERVICE_IMAGES,
  serviceTexts: DEFAULT_SERVICE_TEXTS,
  galleryItems: DEFAULT_GALLERY_ITEMS,
  uploadedImages: [],
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
      serviceImages: { ...DEFAULT_SITE_CONTENT.serviceImages, ...(parsed.serviceImages || {}) },
      serviceTexts: { ...DEFAULT_SERVICE_TEXTS, ...(parsed.serviceTexts || {}) },
      galleryItems: Array.isArray(parsed.galleryItems) && parsed.galleryItems.length ? parsed.galleryItems : DEFAULT_SITE_CONTENT.galleryItems,
      uploadedImages: Array.isArray(parsed.uploadedImages) ? parsed.uploadedImages : [],
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
