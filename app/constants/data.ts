// =============================================
// TYPES
// =============================================
export interface Service {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  price: number;
  priceMax?: number;
  duration: string;
  category: "manicure" | "pedicure" | "acrylic" | "nailart" | "extras";
  popular?: boolean;
}

export type Language = "en" | "es";

// =============================================
// BUSINESS CONFIGURATION
// =============================================
export const CONFIG = {
  businessName: "IVA Nail Art",
  phone: "+1 (929) 625-7273",
  whatsappNumber: "19296257273",
  instagram: "iva_nailart_ny",
  instagramUrl: "https://www.instagram.com/iva_nailart_ny",
  tiktok: "iva_nailart_ny",
  tiktokUrl: "https://www.tiktok.com/@iva_nailart_ny",
  location: "Brooklyn, NY 11209",
  hours: "8:00 AM – 8:00 PM",
  deposit: 35,
  cancellationHours: 24,
  maternityMode: true, // 🤰 Modo Maternidad activado
  appointmentDuration: 4, // horas por cita (para descanso y limpieza)
};

// =============================================
// IMAGES
// =============================================
export const IMAGES = {
  hero: "/portada.jpg",
  gallery: ["/trabajo1.jpg", "/trabajo2.jpg", "/trabajo3.jpg"],
};

// =============================================
// SERVICES DATA
// =============================================
export const SERVICES: Service[] = [
  // Manicure
  {
    id: "classic-mani",
    name: "Classic Manicure",
    nameEs: "Manicura Clásica",
    description: "Regular Polish",
    descriptionEs: "Esmalte Regular",
    price: 35,
    duration: "30 min",
    category: "manicure"
  },
  {
    id: "gel-mani",
    name: "Gel Manicure",
    nameEs: "Manicura en Gel",
    description: "Long-Lasting Gel Polish",
    descriptionEs: "Esmalte Gel Duradero",
    price: 55,
    duration: "45 min",
    category: "manicure",
    popular: true
  },
  {
    id: "builder-overlay",
    name: "Builder Gel Overlay",
    nameEs: "Builder Gel Overlay",
    description: "Natural Nail Strengthening",
    descriptionEs: "Fortalecimiento Natural",
    price: 80,
    duration: "1 hr",
    category: "manicure"
  },
  {
    id: "builder-color",
    name: "Builder Gel + Color",
    nameEs: "Builder Gel + Color",
    description: "Strengthening with color",
    descriptionEs: "Fortalecimiento con color",
    price: 90,
    duration: "1 hr 15 min",
    category: "manicure"
  },
  {
    id: "builder-french",
    name: "Builder Gel + French",
    nameEs: "Builder Gel + Francés",
    description: "French design finish",
    descriptionEs: "Acabado diseño francés",
    price: 105,
    duration: "1 hr 30 min",
    category: "manicure"
  },

  // Pedicure
  {
    id: "classic-pedi",
    name: "Classic Pedicure",
    nameEs: "Pedicura Clásica",
    description: "Regular Polish",
    descriptionEs: "Esmalte Regular",
    price: 45,
    duration: "45 min",
    category: "pedicure"
  },
  {
    id: "spa-pedi",
    name: "Spa Pedicure",
    nameEs: "Pedicura Spa",
    description: "Exfoliation & Massage",
    descriptionEs: "Exfoliación y Masaje",
    price: 65,
    duration: "1 hr",
    category: "pedicure",
    popular: true
  },
  {
    id: "gel-pedi",
    name: "Gel Pedicure",
    nameEs: "Pedicura en Gel",
    description: "Long-Lasting Finish",
    descriptionEs: "Acabado Duradero",
    price: 70,
    duration: "1 hr",
    category: "pedicure"
  },

  // Acrylic
  {
    id: "acrylic-basic",
    name: "Acrylic Full Set",
    nameEs: "Set Acrílico Completo",
    description: "Basic Length",
    descriptionEs: "Largo Básico",
    price: 75,
    duration: "1 hr 30 min",
    category: "acrylic"
  },
  {
    id: "acrylic-french",
    name: "Acrylic + French",
    nameEs: "Acrílico + Francés",
    description: "French Tip design",
    descriptionEs: "Diseño punta francesa",
    price: 90,
    duration: "1 hr 45 min",
    category: "acrylic"
  },
  {
    id: "acrylic-custom",
    name: "Acrylic + Custom Design",
    nameEs: "Acrílico + Diseño",
    description: "Custom Art",
    descriptionEs: "Arte Personalizado",
    price: 95,
    priceMax: 120,
    duration: "2 hr",
    category: "acrylic",
    popular: true
  },
  {
    id: "acrylic-fill",
    name: "Acrylic Fill",
    nameEs: "Relleno Acrílico",
    description: "Maintenance",
    descriptionEs: "Mantenimiento",
    price: 65,
    duration: "1 hr",
    category: "acrylic"
  },

  // Nail Art
  {
    id: "art-basic",
    name: "Basic Nail Art",
    nameEs: "Nail Art Básico",
    description: "Simple Details",
    descriptionEs: "Detalles Simples",
    price: 20,
    duration: "+15 min",
    category: "nailart"
  },
  {
    id: "art-intermediate",
    name: "Intermediate Art",
    nameEs: "Nail Art Intermedio",
    description: "Detailed Design",
    descriptionEs: "Diseño Detallado",
    price: 35,
    duration: "+30 min",
    category: "nailart"
  },
  {
    id: "art-premium",
    name: "Premium Nail Art",
    nameEs: "Nail Art Premium",
    description: "3D / Stones / Advanced",
    descriptionEs: "3D / Pedrería / Avanzado",
    price: 50,
    priceMax: 80,
    duration: "+45 min",
    category: "nailart"
  },

  // Extras
  {
    id: "repair",
    name: "Nail Repair",
    nameEs: "Reparación de Uña",
    description: "Per Nail",
    descriptionEs: "Por Uña",
    price: 10,
    priceMax: 15,
    duration: "15 min",
    category: "extras"
  },
  {
    id: "gel-removal",
    name: "Gel Removal",
    nameEs: "Remoción de Gel",
    description: "Safe removal",
    descriptionEs: "Remoción segura",
    price: 10,
    duration: "15 min",
    category: "extras"
  },
  {
    id: "acrylic-removal",
    name: "Acrylic Removal",
    nameEs: "Remoción Acrílico",
    description: "Full removal",
    descriptionEs: "Remoción completa",
    price: 20,
    duration: "30 min",
    category: "extras"
  },
];

// =============================================
// AVAILABLE HOURS - MATERNITY MODE 🤰
// =============================================
// Bloques de 4 horas para cuidar la salud de Iva durante el embarazo
export interface TimeBlock {
  id: string;
  time: string;
  label: string;
  labelEs: string;
  icon: string;
  startTime: string;
  endTime: string;
}

export const TIME_BLOCKS: TimeBlock[] = [
  {
    id: "morning",
    time: "8:00 AM",
    label: "Morning (8:00 AM - 12:00 PM)",
    labelEs: "Mañana (8:00 AM - 12:00 PM)",
    icon: "🌅",
    startTime: "8:00 AM",
    endTime: "12:00 PM",
  },
  {
    id: "midday",
    time: "12:00 PM",
    label: "Midday (12:00 PM - 4:00 PM)",
    labelEs: "Mediodía (12:00 PM - 4:00 PM)",
    icon: "☀️",
    startTime: "12:00 PM",
    endTime: "4:00 PM",
  },
  {
    id: "afternoon",
    time: "4:00 PM",
    label: "Afternoon (4:00 PM - 8:00 PM)",
    labelEs: "Tarde (4:00 PM - 8:00 PM)",
    icon: "🌆",
    startTime: "4:00 PM",
    endTime: "8:00 PM",
  },
];

// Legacy support - solo los horarios de inicio de cada bloque
export const AVAILABLE_HOURS = TIME_BLOCKS.map(block => block.time);

// =============================================
// CATEGORIES
// =============================================
export const CATEGORIES = [
  { key: "manicure" as const, en: "Manicure", es: "Manicura", icon: "💅" },
  { key: "pedicure" as const, en: "Pedicure", es: "Pedicura", icon: "🦶" },
  { key: "acrylic" as const, en: "Acrylic", es: "Acrílico", icon: "✨" },
  { key: "nailart" as const, en: "Nail Art", es: "Nail Art", icon: "🎨" },
  { key: "extras" as const, en: "Extras", es: "Extras", icon: "🔧" },
];
