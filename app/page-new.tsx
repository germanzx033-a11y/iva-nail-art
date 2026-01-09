"use client";

import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  Heart,
  Star,
  X,
} from "lucide-react";
import { formatDate, getMinBookingDate, isValidEmail, isValidPhone } from "@/lib/utils";

// ============================================================================
// CONFIGURACIÓN DEL NEGOCIO
// ============================================================================
const CONFIG = {
  businessName: "IVA Nail Art",
  phone: "+1 (929) 625-7273",
  whatsappNumber: "19296257273",
  instagram: "iva_nailart_ny",
  instagramUrl: "https://instagram.com/iva_nailart_ny",
  tiktok: "iva_nailart_ny",
  tiktokUrl: "https://tiktok.com/@iva_nailart_ny",
  location: "Bay Ridge, Brooklyn, NY 11209",
  hours: "9:00 AM – 8:00 PM",
  deposit: 35,
  cancellationHours: 24,
};

// ============================================================================
// INTERFACES TYPESCRIPT
// ============================================================================
interface Service {
  id: string;
  name: string;
  nameEs: string;
  price: number;
  priceMax?: number;
  category: string;
}

interface BookingState {
  step: number;
  service: Service | null;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  acceptedPolicies: boolean;
  errors: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

// ============================================================================
// SERVICIOS CON PRECIOS
// ============================================================================
const SERVICES: Service[] = [
  // Manicure
  { id: "m1", name: "Classic Manicure", nameEs: "Manicura Clásica", price: 30, category: "manicure" },
  { id: "m2", name: "Gel Manicure", nameEs: "Manicura Gel", price: 55, category: "manicure" },
  { id: "m3", name: "Builder Gel Manicure", nameEs: "Manicura Builder Gel", price: 65, category: "manicure" },
  { id: "m4", name: "Structured Gel Manicure", nameEs: "Manicura Gel Estructurado", price: 75, category: "manicure" },
  // Pedicure
  { id: "p1", name: "Classic Pedicure", nameEs: "Pedicura Clásica", price: 45, category: "pedicure" },
  { id: "p2", name: "Gel Pedicure", nameEs: "Pedicura Gel", price: 65, category: "pedicure" },
  { id: "p3", name: "Builder Gel Pedicure", nameEs: "Pedicura Builder Gel", price: 75, category: "pedicure" },
  { id: "p4", name: "Luxury Spa Pedicure", nameEs: "Pedicura Spa de Lujo", price: 85, category: "pedicure" },
  // Acrylic
  { id: "a1", name: "Full Set Acrylic", nameEs: "Set Completo Acrílico", price: 75, priceMax: 95, category: "acrylic" },
  { id: "a2", name: "Acrylic Fill", nameEs: "Relleno Acrílico", price: 55, priceMax: 70, category: "acrylic" },
  { id: "a3", name: "Acrylic Removal", nameEs: "Remoción Acrílico", price: 20, category: "acrylic" },
  // Nail Art
  { id: "n1", name: "Simple Nail Art (per nail)", nameEs: "Arte Simple (por uña)", price: 5, priceMax: 10, category: "nailart" },
  { id: "n2", name: "Medium Design (per nail)", nameEs: "Diseño Medio (por uña)", price: 10, priceMax: 15, category: "nailart" },
  { id: "n3", name: "Complex Art (per nail)", nameEs: "Arte Complejo (por uña)", price: 15, priceMax: 25, category: "nailart" },
  { id: "n4", name: "Chrome / Cat Eye", nameEs: "Chrome / Ojo de Gato", price: 15, category: "nailart" },
  { id: "n5", name: "French Tips", nameEs: "Puntas Francesas", price: 15, category: "nailart" },
  // Extras
  { id: "e1", name: "Gel Removal", nameEs: "Remoción de Gel", price: 15, category: "extras" },
  { id: "e2", name: "Nail Repair (per nail)", nameEs: "Reparación (por uña)", price: 10, category: "extras" },
  { id: "e3", name: "Soak Off Only", nameEs: "Solo Remojo", price: 20, category: "extras" },
];

const CATEGORIES = [
  { id: "manicure", en: "Manicure", es: "Manicura" },
  { id: "pedicure", en: "Pedicure", es: "Pedicura" },
  { id: "acrylic", en: "Acrylic", es: "Acrílico" },
  { id: "nailart", en: "Nail Art", es: "Nail Art" },
  { id: "extras", en: "Extras", es: "Extras" },
];

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM",
];

// ============================================================================
// TRADUCCIONES
// ============================================================================
const translations = {
  en: {
    nav: {
      services: "Services",
      gallery: "Gallery",
      book: "Book Now",
    },
    hero: {
      welcome: "WELCOME TO",
      tagline: "Where every nail tells a story of elegance and artistry. Expert in unique designs that reflect your personality and enhance your natural beauty.",
      cta: "BOOK YOUR APPOINTMENT",
      location: "Bay Ridge, Brooklyn",
      hours: "9 AM – 8 PM",
      appointment: "By Appointment Only",
    },
    about: {
      subtitle: "MEET",
      name: "Iva",
      description: "Passionate nail artist based in Brooklyn, NY. I specialize in creating stunning nail designs that make every client feel special. Each set of nails is a unique work of art, crafted with love, dedication, and premium non-toxic products.",
    },
    services: {
      subtitle: "OUR SERVICES",
      title: "Luxury Nail Services",
      note: "Prices may vary based on design complexity",
    },
    gallery: {
      subtitle: "OUR WORK",
      title: "Nail Art Gallery",
      description: "A glimpse of our latest creations",
    },
    booking: {
      title: "Book Your Appointment",
      subtitle: "Reserve your moment of beauty",
      steps: ["Service", "Date & Time", "Your Info", "Confirm"],
      selectService: "Select Your Service",
      selectDateTime: "Choose Date & Time",
      yourDetails: "Your Details",
      confirmation: "Confirm Booking",
      date: "Date",
      time: "Time",
      selectTime: "Select a time...",
      name: "Full Name",
      namePlaceholder: "Your name",
      phone: "Phone",
      phonePlaceholder: "+1 (555) 123-4567",
      email: "Email (optional)",
      emailPlaceholder: "your@email.com",
      policies: {
        title: "Salon Policies",
        deposit: `$${CONFIG.deposit} deposit required (non-refundable)`,
        cancellation: `Minimum ${CONFIG.cancellationHours}h notice for cancellations`,
        payment: "Payment: Cash, Zelle, or Card",
      },
      acceptPolicies: "I accept the salon policies",
      next: "Continue",
      back: "Back",
      summary: "Booking Summary",
      sendWhatsApp: "Send via WhatsApp",
      successMessage: `Click below to send your booking request. Iva will confirm availability and send Zelle payment instructions for the $${CONFIG.deposit} deposit.`,
    },
    footer: {
      tagline: "Creating beauty, one nail at a time",
      hours: "Hours",
      location: "Location",
      followUs: "Follow Us",
      contact: "Contact",
    },
    floatingBtn: "Chat with us!",
    langSwitch: "ES",
  },
  es: {
    nav: {
      services: "Servicios",
      gallery: "Galería",
      book: "Reservar",
    },
    hero: {
      welcome: "BIENVENIDA A",
      tagline: "Donde cada uña cuenta una historia de elegancia y arte. Experta en diseños únicos que reflejan tu personalidad y realzan tu belleza natural.",
      cta: "RESERVA TU CITA",
      location: "Bay Ridge, Brooklyn",
      hours: "9 AM – 8 PM",
      appointment: "Solo con Cita",
    },
    about: {
      subtitle: "CONOCE A",
      name: "Iva",
      description: "Artista de uñas apasionada en Brooklyn, NY. Me especializo en crear diseños impresionantes que hacen sentir especial a cada clienta. Cada set de uñas es una obra de arte única, hecha con amor, dedicación y productos premium no tóxicos.",
    },
    services: {
      subtitle: "NUESTROS SERVICIOS",
      title: "Servicios de Lujo",
      note: "Los precios pueden variar según la complejidad del diseño",
    },
    gallery: {
      subtitle: "NUESTRO TRABAJO",
      title: "Galería de Arte",
      description: "Un vistazo a nuestras últimas creaciones",
    },
    booking: {
      title: "Reserva tu Cita",
      subtitle: "Reserva tu momento de belleza",
      steps: ["Servicio", "Fecha y Hora", "Tus Datos", "Confirmar"],
      selectService: "Selecciona tu Servicio",
      selectDateTime: "Elige Fecha y Hora",
      yourDetails: "Tus Datos",
      confirmation: "Confirmar Reserva",
      date: "Fecha",
      time: "Hora",
      selectTime: "Selecciona una hora...",
      name: "Nombre Completo",
      namePlaceholder: "Tu nombre",
      phone: "Teléfono",
      phonePlaceholder: "+1 (555) 123-4567",
      email: "Email (opcional)",
      emailPlaceholder: "tu@email.com",
      policies: {
        title: "Políticas del Salón",
        deposit: `Depósito de $${CONFIG.deposit} requerido (no reembolsable)`,
        cancellation: `Mínimo ${CONFIG.cancellationHours}h de anticipación para cancelar`,
        payment: "Pago: Efectivo, Zelle o Tarjeta",
      },
      acceptPolicies: "Acepto las políticas del salón",
      next: "Continuar",
      back: "Volver",
      summary: "Resumen de Reserva",
      sendWhatsApp: "Enviar por WhatsApp",
      successMessage: `Haz clic abajo para enviar tu solicitud. Iva confirmará disponibilidad y te enviará instrucciones de pago Zelle para el depósito de $${CONFIG.deposit}.`,
    },
    footer: {
      tagline: "Creando belleza, una uña a la vez",
      hours: "Horario",
      location: "Ubicación",
      followUs: "Síguenos",
      contact: "Contacto",
    },
    floatingBtn: "¡Escríbenos!",
    langSwitch: "EN",
  },
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function Home() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const [selectedCategory, setSelectedCategory] = useState("manicure");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingState>({
    step: 1,
    service: null,
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    acceptedPolicies: false,
    errors: {},
  });

  const t = translations[lang];

  // Filtrar servicios por categoría
  const filteredServices = SERVICES.filter((s) => s.category === selectedCategory);

  // Formatear precio
  const formatPrice = (service: Service): string => {
    return service.priceMax ? `$${service.price}–$${service.priceMax}` : `$${service.price}`;
  };

  // Formatear fecha usando utilidad del proyecto
  const formatBookingDate = (dateStr: string): string => {
    return formatDate(dateStr, lang);
  };

  // Validación por paso
  const canProceed = (): boolean => {
    const errors: BookingState["errors"] = {};
    
    switch (bookingData.step) {
      case 1:
        return bookingData.service !== null;
      case 2:
        return bookingData.date !== "" && bookingData.time !== "";
      case 3:
        // Validar nombre
        if (bookingData.name.trim() === "") {
          errors.name = lang === "en" ? "Name is required" : "El nombre es requerido";
        }
        
        // Validar teléfono
        if (bookingData.phone.trim() === "") {
          errors.phone = lang === "en" ? "Phone is required" : "El teléfono es requerido";
        } else if (!isValidPhone(bookingData.phone)) {
          errors.phone = lang === "en" ? "Invalid phone number" : "Número de teléfono inválido";
        }
        
        // Validar email si está presente
        if (bookingData.email.trim() !== "" && !isValidEmail(bookingData.email)) {
          errors.email = lang === "en" ? "Invalid email address" : "Dirección de email inválida";
        }
        
        // Actualizar errores
        if (Object.keys(errors).length > 0) {
          setBookingData({ ...bookingData, errors });
          return false;
        }
        
        return bookingData.name.trim() !== "" && 
               bookingData.phone.trim() !== "" && 
               bookingData.acceptedPolicies;
      default:
        return true;
    }
  };

  // Enviar a WhatsApp
  const sendToWhatsApp = () => {
    const serviceName = lang === "en" ? bookingData.service?.name : bookingData.service?.nameEs;
    const priceText = bookingData.service ? formatPrice(bookingData.service) : "";

    const message =
      lang === "en"
        ? `✨ *New Appointment Request* ✨

👤 *Name:* ${bookingData.name}
📱 *Phone:* ${bookingData.phone}
${bookingData.email ? `📧 *Email:* ${bookingData.email}` : ""}

💅 *Service:* ${serviceName}
💰 *Price:* ${priceText}
📅 *Date:* ${formatBookingDate(bookingData.date)}
🕐 *Time:* ${bookingData.time}

I understand a $${CONFIG.deposit} deposit is required.
Please confirm availability! 💕`
        : `✨ *Nueva Solicitud de Cita* ✨

👤 *Nombre:* ${bookingData.name}
📱 *Teléfono:* ${bookingData.phone}
${bookingData.email ? `📧 *Email:* ${bookingData.email}` : ""}

💅 *Servicio:* ${serviceName}
💰 *Precio:* ${priceText}
📅 *Fecha:* ${formatBookingDate(bookingData.date)}
🕐 *Hora:* ${bookingData.time}

Entiendo que se requiere depósito de $${CONFIG.deposit}.
¡Por favor confirma disponibilidad! 💕`;

    window.open(
      `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setIsBookingOpen(false);
    setBookingData({
      step: 1,
      service: null,
      date: "",
      time: "",
      name: "",
      phone: "",
      email: "",
      acceptedPolicies: false,
      errors: {},
    });
  };

  // Obtener fecha mínima (mañana) usando utilidad del proyecto
  const getMinDate = (): string => {
    return getMinBookingDate();
  };

  // Limpiar errores al cambiar campos
  const handleFieldChange = (field: "name" | "phone" | "email" | "date" | "time", value: string) => {
    setBookingData({
      ...bookingData,
      [field]: value,
      errors: { ...bookingData.errors, [field]: undefined },
    });
  };

  return (
    <main className="min-h-screen bg-[#FDF8F6]">
      {/* ================================================================== */}
      {/* HEADER */}
      {/* ================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F6]/90 backdrop-blur-md border-b border-[#4A0404]/10">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl text-[#4A0404] tracking-wide">
            IVA <span className="font-light">Nail Art</span>
          </a>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm text-[#4A0404]/70">
              <a href="#services" className="hover:text-[#4A0404] transition-colors">
                {t.nav.services}
              </a>
              <a href="#gallery" className="hover:text-[#4A0404] transition-colors">
                {t.nav.gallery}
              </a>
            </div>

            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-sm font-medium text-[#4A0404] border border-[#4A0404]/30 px-3 py-1.5 rounded-full hover:bg-[#4A0404] hover:text-white transition-all"
            >
              {t.langSwitch}
            </button>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="bg-[#4A0404] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#6B0606] transition-colors shadow-lg shadow-[#4A0404]/20"
            >
              {t.nav.book}
            </button>
          </div>
        </nav>
      </header>

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/portada.jpg')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4A0404]/70 via-[#4A0404]/50 to-[#4A0404]/80" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-[#D4AF37] tracking-[0.3em] text-sm mb-4 font-medium">
            {t.hero.welcome}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
            IVA <span className="font-light italic">Nail Art</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {t.hero.tagline}
          </p>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="group bg-[#D4AF37] text-[#4A0404] px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-white transition-all shadow-2xl inline-flex items-center gap-2"
          >
            {t.hero.cta}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Info Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-12 text-white/70 text-sm">
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              {t.hero.location}
            </span>
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              {t.hero.hours}
            </span>
            <span className="flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur px-4 py-2 rounded-full text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
              {t.hero.appointment}
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ABOUT SECTION */}
      {/* ================================================================== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#D4AF37] tracking-[0.2em] text-sm mb-2">{t.about.subtitle}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#4A0404] mb-8">{t.about.name}</h2>
          <p className="text-[#4A0404]/70 text-lg leading-relaxed max-w-2xl mx-auto">
            {t.about.description}
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Heart className="w-5 h-5 text-[#D4AF37]" />
            <Star className="w-5 h-5 text-[#D4AF37]" />
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SERVICES SECTION */}
      {/* ================================================================== */}
      <section id="services" className="py-24 px-6 bg-[#4A0404]/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] tracking-[0.2em] text-sm mb-2">{t.services.subtitle}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#4A0404] mb-4">
              {t.services.title}
            </h2>
            <p className="text-[#4A0404]/60 text-sm">{t.services.note}</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#4A0404] text-white shadow-lg"
                    : "bg-white text-[#4A0404] hover:bg-[#4A0404]/10"
                }`}
              >
                {lang === "en" ? cat.en : cat.es}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all group cursor-pointer border border-transparent hover:border-[#D4AF37]/30"
                onClick={() => {
                  setBookingData({ ...bookingData, service, step: 1 });
                  setIsBookingOpen(true);
                }}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-[#4A0404] group-hover:text-[#6B0606] transition-colors">
                    {lang === "en" ? service.name : service.nameEs}
                  </h3>
                  <span className="text-[#D4AF37] font-semibold">{formatPrice(service)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* GALLERY SECTION */}
      {/* ================================================================== */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] tracking-[0.2em] text-sm mb-2">{t.gallery.subtitle}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#4A0404] mb-4">
              {t.gallery.title}
            </h2>
            <p className="text-[#4A0404]/60">{t.gallery.description}</p>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {["/trabajo1.jpg", "/trabajo2.jpg", "/trabajo3.jpg"].map((img, index) => (
              <div
                key={index}
                className="aspect-square rounded-3xl overflow-hidden shadow-lg group cursor-pointer bg-gradient-to-br from-[#D4AF37]/20 to-[#4A0404]/10"
              >
                <img
                  src={img}
                  alt={`${t.gallery.title} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-12">
            <a
              href={CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#4A0404] hover:text-[#D4AF37] transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm">@{CONFIG.instagram}</span>
            </a>
            <a
              href={CONFIG.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#4A0404] hover:text-[#D4AF37] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
              <span className="text-sm">@{CONFIG.tiktok}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* CTA SECTION */}
      {/* ================================================================== */}
      <section className="py-24 px-6 bg-[#4A0404]">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            {lang === "en" ? "Ready to Get Beautiful Nails?" : "¿Lista para Uñas Hermosas?"}
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            {lang === "en"
              ? "Book your appointment today and let's create something beautiful together."
              : "Reserva tu cita hoy y creemos algo hermoso juntas."}
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="bg-[#D4AF37] text-[#4A0404] px-8 py-4 rounded-full font-semibold hover:bg-white transition-all shadow-2xl"
          >
            {t.nav.book}
          </button>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FOOTER */}
      {/* ================================================================== */}
      <footer className="bg-[#1a0202] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-2xl mb-4">
                IVA <span className="font-light">Nail Art</span>
              </h3>
              <p className="text-white/50 text-sm">{t.footer.tagline}</p>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                {t.footer.hours}
              </h4>
              <p className="text-white/60 text-sm">{CONFIG.hours}</p>
              <p className="text-[#D4AF37] text-sm mt-1">{t.hero.appointment}</p>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                {t.footer.location}
              </h4>
              <p className="text-white/60 text-sm">{CONFIG.location}</p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                {t.footer.contact}
              </h4>
              <p className="text-white/60 text-sm">{CONFIG.phone}</p>
              <div className="flex gap-4 mt-4">
                <a
                  href={CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-[#D4AF37] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={CONFIG.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-[#D4AF37] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} IVA Nail Art. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ================================================================== */}
      {/* BOOKING MODAL */}
      {/* ================================================================== */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsBookingOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-[#4A0404]/50 hover:text-[#4A0404] transition-colors z-10"
              aria-label={lang === "en" ? "Close booking modal" : "Cerrar modal de reserva"}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="bg-[#4A0404] text-white p-6 rounded-t-3xl">
              <h3 className="font-serif text-2xl">{t.booking.title}</h3>
              <p className="text-white/70 text-sm mt-1">{t.booking.subtitle}</p>

              {/* Progress Steps */}
              <div className="flex justify-between mt-6">
                {t.booking.steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        bookingData.step > index + 1
                          ? "bg-[#D4AF37] text-[#4A0404]"
                          : bookingData.step === index + 1
                          ? "bg-white text-[#4A0404]"
                          : "bg-white/20 text-white/50"
                      }`}
                    >
                      {bookingData.step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
                    </div>
                    <span className="text-xs mt-2 text-white/70 hidden sm:block">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* STEP 1: Select Service */}
              {bookingData.step === 1 && (
                <div>
                  <h4 className="font-medium text-[#4A0404] mb-4">{t.booking.selectService}</h4>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedCategory === cat.id
                            ? "bg-[#4A0404] text-white"
                            : "bg-[#4A0404]/10 text-[#4A0404]"
                        }`}
                      >
                        {lang === "en" ? cat.en : cat.es}
                      </button>
                    ))}
                  </div>

                  {/* Services */}
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredServices.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setBookingData({ ...bookingData, service })}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          bookingData.service?.id === service.id
                            ? "bg-[#4A0404] text-white"
                            : "bg-[#FDF8F6] hover:bg-[#4A0404]/10 text-[#4A0404]"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {lang === "en" ? service.name : service.nameEs}
                          </span>
                          <span
                            className={
                              bookingData.service?.id === service.id
                                ? "text-[#D4AF37]"
                                : "text-[#D4AF37]"
                            }
                          >
                            {formatPrice(service)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Date & Time */}
              {bookingData.step === 2 && (
                <div>
                  <h4 className="font-medium text-[#4A0404] mb-4">{t.booking.selectDateTime}</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-[#4A0404]/70 mb-2">{t.booking.date}</label>
                      <input
                        type="date"
                        min={getMinDate()}
                        value={bookingData.date}
                        onChange={(e) => handleFieldChange("date", e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#4A0404]/20 focus:border-[#4A0404] focus:outline-none transition-colors"
                        aria-label={t.booking.date}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-[#4A0404]/70 mb-2">{t.booking.time}</label>
                      <select
                        value={bookingData.time}
                        onChange={(e) => handleFieldChange("time", e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#4A0404]/20 focus:border-[#4A0404] focus:outline-none transition-colors bg-white"
                        aria-label={t.booking.time}
                      >
                        <option value="">{t.booking.selectTime}</option>
                        {TIME_SLOTS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Your Details */}
              {bookingData.step === 3 && (
                <div>
                  <h4 className="font-medium text-[#4A0404] mb-4">{t.booking.yourDetails}</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-[#4A0404]/70 mb-2">{t.booking.name} *</label>
                      <input
                        type="text"
                        placeholder={t.booking.namePlaceholder}
                        value={bookingData.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        className={`w-full p-3 rounded-xl border focus:outline-none transition-colors ${
                          bookingData.errors.name
                            ? "border-red-500 focus:border-red-600"
                            : "border-[#4A0404]/20 focus:border-[#4A0404]"
                        }`}
                        aria-label={t.booking.name}
                        aria-invalid={!!bookingData.errors.name}
                        aria-describedby={bookingData.errors.name ? "name-error" : undefined}
                      />
                      {bookingData.errors.name && (
                        <p id="name-error" className="text-red-500 text-xs mt-1">
                          {bookingData.errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#4A0404]/70 mb-2">{t.booking.phone} *</label>
                      <input
                        type="tel"
                        placeholder={t.booking.phonePlaceholder}
                        value={bookingData.phone}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        className={`w-full p-3 rounded-xl border focus:outline-none transition-colors ${
                          bookingData.errors.phone
                            ? "border-red-500 focus:border-red-600"
                            : "border-[#4A0404]/20 focus:border-[#4A0404]"
                        }`}
                        aria-label={t.booking.phone}
                        aria-invalid={!!bookingData.errors.phone}
                        aria-describedby={bookingData.errors.phone ? "phone-error" : undefined}
                      />
                      {bookingData.errors.phone && (
                        <p id="phone-error" className="text-red-500 text-xs mt-1">
                          {bookingData.errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-[#4A0404]/70 mb-2">{t.booking.email}</label>
                      <input
                        type="email"
                        placeholder={t.booking.emailPlaceholder}
                        value={bookingData.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        className={`w-full p-3 rounded-xl border focus:outline-none transition-colors ${
                          bookingData.errors.email
                            ? "border-red-500 focus:border-red-600"
                            : "border-[#4A0404]/20 focus:border-[#4A0404]"
                        }`}
                        aria-label={t.booking.email}
                        aria-invalid={!!bookingData.errors.email}
                        aria-describedby={bookingData.errors.email ? "email-error" : undefined}
                      />
                      {bookingData.errors.email && (
                        <p id="email-error" className="text-red-500 text-xs mt-1">
                          {bookingData.errors.email}
                        </p>
                      )}
                    </div>

                    {/* Policies */}
                    <div className="bg-[#FDF8F6] p-4 rounded-xl">
                      <h5 className="font-medium text-[#4A0404] text-sm mb-3">
                        {t.booking.policies.title}
                      </h5>
                      <ul className="text-sm text-[#4A0404]/70 space-y-1">
                        <li>• {t.booking.policies.deposit}</li>
                        <li>• {t.booking.policies.cancellation}</li>
                        <li>• {t.booking.policies.payment}</li>
                      </ul>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingData.acceptedPolicies}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, acceptedPolicies: e.target.checked, errors: { ...bookingData.errors } })
                        }
                        className="mt-1 w-5 h-5 rounded border-[#4A0404]/30 text-[#4A0404] focus:ring-[#4A0404]"
                      />
                      <span className="text-sm text-[#4A0404]/70">{t.booking.acceptPolicies} *</span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 4: Confirmation */}
              {bookingData.step === 4 && (
                <div>
                  <h4 className="font-medium text-[#4A0404] mb-4">{t.booking.confirmation}</h4>

                  <p className="text-sm text-[#4A0404]/70 mb-6">{t.booking.successMessage}</p>

                  {/* Summary */}
                  <div className="bg-[#FDF8F6] p-4 rounded-xl mb-6">
                    <h5 className="font-medium text-[#4A0404] mb-3">{t.booking.summary}</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#4A0404]/60">💅 {lang === "en" ? "Service" : "Servicio"}</span>
                        <span className="text-[#4A0404] font-medium">
                          {lang === "en" ? bookingData.service?.name : bookingData.service?.nameEs}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4A0404]/60">💰 {lang === "en" ? "Price" : "Precio"}</span>
                        <span className="text-[#D4AF37] font-medium">
                          {bookingData.service && formatPrice(bookingData.service)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4A0404]/60">📅 {lang === "en" ? "Date" : "Fecha"}</span>
                        <span className="text-[#4A0404]">{formatBookingDate(bookingData.date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4A0404]/60">🕐 {lang === "en" ? "Time" : "Hora"}</span>
                        <span className="text-[#4A0404]">{bookingData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4A0404]/60">👤 {lang === "en" ? "Name" : "Nombre"}</span>
                        <span className="text-[#4A0404]">{bookingData.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Button */}
                  <button
                    onClick={sendToWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t.booking.sendWhatsApp}
                  </button>
                </div>
              )}

              {/* Navigation Buttons */}
              {bookingData.step < 4 && (
                <div className="flex gap-3 mt-6">
                  {bookingData.step > 1 && (
                    <button
                      onClick={() => setBookingData({ ...bookingData, step: bookingData.step - 1 })}
                      className="flex-1 py-3 rounded-xl border border-[#4A0404]/20 text-[#4A0404] font-medium hover:bg-[#4A0404]/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {t.booking.back}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (canProceed()) {
                        setBookingData({ ...bookingData, step: bookingData.step + 1 });
                      }
                    }}
                    disabled={!canProceed()}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      canProceed()
                        ? "bg-[#4A0404] text-white hover:bg-[#6B0606]"
                        : "bg-[#4A0404]/30 text-white/50 cursor-not-allowed"
                    }`}
                    aria-label={t.booking.next}
                  >
                    {t.booking.next}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* FLOATING WHATSAPP BUTTON */}
      {/* ================================================================== */}
      <a
        href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
          lang === "en"
            ? "Hi! I'd like information about your nail services 💅"
            : "¡Hola! Me gustaría información sobre tus servicios de uñas 💅"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-110 transition-all z-40 group"
        aria-label="Contact via WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#4A0404] text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          {t.floatingBtn}
        </span>
      </a>
    </main>
  );
}

