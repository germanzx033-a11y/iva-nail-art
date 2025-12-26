// =============================================
// LUXURY FEATURES - Paintbox/Townhouse Inspired
// =============================================

export interface SignatureDesign {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  image: string;
  price: number;
  serviceCategory: string;
  popular?: boolean;
}

export interface TrustBadge {
  id: string;
  icon: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
}

// =============================================
// THE IVA PROMISE - Hygiene & Exclusivity
// =============================================
export const IVA_PROMISE = {
  en: {
    title: "The IVA Promise",
    subtitle: "Where Hygiene Meets Artistry",
    features: [
      {
        icon: "🤰",
        title: "Intimate Attention",
        description: "Maximum 3 clients daily for undivided focus and care",
      },
      {
        icon: "🧼",
        title: "Medical-Grade Sterilization",
        description: "Hospital-level sanitization between every appointment",
      },
      {
        icon: "⏱️",
        title: "No Rush Policy",
        description: "4-hour blocks ensure perfection, never hurried work",
      },
      {
        icon: "✨",
        title: "Single-Use Tools",
        description: "Fresh, sterile implements for each client",
      },
    ],
  },
  es: {
    title: "La Promesa IVA",
    subtitle: "Donde la Higiene se Encuentra con el Arte",
    features: [
      {
        icon: "🤰",
        title: "Atención Íntima",
        description: "Máximo 3 clientas diarias para enfoque y cuidado total",
      },
      {
        icon: "🧼",
        title: "Esterilización Médica",
        description: "Sanitización de grado hospitalario entre cada cita",
      },
      {
        icon: "⏱️",
        title: "Sin Apuros",
        description: "Bloques de 4 horas garantizan perfección sin prisa",
      },
      {
        icon: "✨",
        title: "Herramientas de Un Solo Uso",
        description: "Implementos frescos y estériles para cada cliente",
      },
    ],
  },
};

// =============================================
// SIGNATURE DESIGNS - The IVA Collection
// =============================================
export const SIGNATURE_DESIGNS: SignatureDesign[] = [
  {
    id: "brooklyn-rose",
    name: "Brooklyn Rose",
    nameEs: "Rosa de Brooklyn",
    description: "Soft nude with delicate rose gold accent",
    descriptionEs: "Nude suave con acento delicado oro rosa",
    image: "/trabajo1.jpg",
    price: 90,
    serviceCategory: "Builder Gel + Color",
    popular: true,
  },
  {
    id: "midnight-luxe",
    name: "Midnight Luxe",
    nameEs: "Lujo de Medianoche",
    description: "Deep burgundy with crystal embellishments",
    descriptionEs: "Vino profundo con cristales incrustados",
    image: "/trabajo2.jpg",
    price: 105,
    serviceCategory: "Builder Gel + French",
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    nameEs: "Hora Dorada",
    description: "Warm sunset ombre with gold leaf",
    descriptionEs: "Ombre cálido atardecer con hoja de oro",
    image: "/trabajo3.jpg",
    price: 95,
    serviceCategory: "Acrylic + Custom Design",
    popular: true,
  },
];

// =============================================
// TRUST BADGES - Social Proof
// =============================================
export const TRUST_BADGES: TrustBadge[] = [
  {
    id: "clients",
    icon: "👥",
    title: "500+ Happy Clients",
    titleEs: "500+ Clientas Felices",
    description: "Serving Brooklyn's most discerning women",
    descriptionEs: "Sirviendo a las mujeres más exigentes de Brooklyn",
  },
  {
    id: "experience",
    icon: "💅",
    title: "10+ Years Expertise",
    titleEs: "10+ Años de Experiencia",
    description: "Mastering the art of luxury nail care",
    descriptionEs: "Dominando el arte del cuidado de uñas de lujo",
  },
  {
    id: "exclusive",
    icon: "⭐",
    title: "Exclusive Appointments",
    titleEs: "Citas Exclusivas",
    description: "Limited daily capacity for premium service",
    descriptionEs: "Capacidad limitada diaria para servicio premium",
  },
  {
    id: "hygiene",
    icon: "🧼",
    title: "Hospital-Grade Safety",
    titleEs: "Seguridad Grado Hospital",
    description: "Medical sterilization protocols",
    descriptionEs: "Protocolos de esterilización médica",
  },
];

// =============================================
// PRESS & FEATURES (Placeholder)
// =============================================
export const PRESS_FEATURES = {
  en: {
    title: "As Featured In",
    subtitle: "Brooklyn's Premier Nail Artist",
  },
  es: {
    title: "Destacado En",
    subtitle: "La Mejor Artista de Uñas de Brooklyn",
  },
  // Placeholder for future press logos
  logos: [
    { name: "Instagram", followers: "2.5K+" },
    { name: "Local Press", mention: "Featured Artist" },
  ],
};
