"use client";

import { useState, useRef, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  X,
  Hand,
  Footprints,
  Palette,
  Scissors,
} from "lucide-react";
import { formatDate, getMinBookingDate, isValidEmail, isValidPhone } from "@/lib/utils";
import Image from "next/image";
import AboutIva from "@/app/components/AboutIva";
import HeroScroll from "@/app/components/HeroScroll";
import PhotoMarquee from "@/app/components/PhotoMarquee";
import { BackToTop, ScrollProgressBar } from "@/app/components/ScrollUi";
import GallerySection from "@/app/components/GallerySection";
import { GALLERY_IMAGES } from "@/app/data/galleryData";

// Contador animado. Escribe directo en el DOM (sin re-render por frame) y siempre
// termina en el valor final, aunque el navegador pause requestAnimationFrame.
function AnimatedCounter({ end, duration = 1600, suffix = "", prefix = "" }: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = (n: number) => {
      el.textContent = `${prefix}${n}${suffix}`;
    };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      show(end);
      return;
    }

    let frame = 0;
    let fallback = 0;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        show(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      fallback = window.setTimeout(() => show(end), duration + 250);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          start();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
    };
  }, [end, duration, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// ============================================================================
// CONFIGURACIÓN DEL NEGOCIO
// ============================================================================
const CONFIG = {
  businessName: "IVA Nail Art",
  phone: "+1 (929) 625-7273",
  // Instagram direct messages (ig.me opens the chat; Instagram cannot pre-fill text)
  instagramDmUrl: "https://ig.me/m/iva_nailart_ny",
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
      sendInstagram: "Send via Instagram",
      dmHint: "We'll copy your booking details and open our Instagram chat: just paste them and send.",
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
      sendInstagram: "Enviar por Instagram",
      dmHint: "Copiaremos los datos de tu reserva y abriremos nuestro chat de Instagram: solo pégalos y envía.",
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

  // Estado para animaciones de scroll reveal
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Hook para animaciones de scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = Object.values(sectionRefs.current);
    sections.forEach((ref) => {
      if (ref) observer.observe(ref as Element);
    });

    return () => {
      sections.forEach((ref) => {
        if (ref) observer.unobserve(ref as Element);
      });
    };
  }, []);

  // Filtrar servicios por categoría
  const filteredServices = SERVICES.filter((s) => s.category === selectedCategory);

  // Formatear fecha usando utilidad del proyecto
  const formatBookingDate = (dateStr: string): string => {
    if (!dateStr) return '';
    try {
    return formatDate(dateStr, lang);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateStr;
    }
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

  // Enviar por mensaje directo de Instagram
  const sendViaInstagram = () => {
    try {
    const serviceName = lang === "en" ? bookingData.service?.name : bookingData.service?.nameEs;
      const formattedDate = bookingData.date ? formatBookingDate(bookingData.date) : '';

    const message =
      lang === "en"
        ? `✨ *New Appointment Request* ✨

👤 *Name:* ${bookingData.name || ''}
📱 *Phone:* ${bookingData.phone || ''}
${bookingData.email ? `📧 *Email:* ${bookingData.email}` : ""}

💅 *Service:* ${serviceName || 'Consult service'}
📅 *Date:* ${formattedDate || 'To be scheduled'}
🕐 *Time:* ${bookingData.time || 'To be scheduled'}

I understand a $${CONFIG.deposit} deposit is required.
Please confirm availability! 💕`
        : `✨ *Nueva Solicitud de Cita* ✨

👤 *Nombre:* ${bookingData.name || ''}
📱 *Teléfono:* ${bookingData.phone || ''}
${bookingData.email ? `📧 *Email:* ${bookingData.email}` : ""}

💅 *Servicio:* ${serviceName || 'Consultar servicio'}
📅 *Fecha:* ${formattedDate || 'Por agendar'}
🕐 *Hora:* ${bookingData.time || 'Por agendar'}

Entiendo que se requiere depósito de $${CONFIG.deposit}.
¡Por favor confirma disponibilidad! 💕`;

    // Instagram cannot pre-fill a DM from a link, so copy the details (without
    // WhatsApp-style *bold* markers) and open the chat for the client to paste them.
    const plainMessage = message.replace(/\*/g, '');
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(plainMessage).catch(() => alert(plainMessage));
    } else {
      alert(plainMessage);
    }
    window.open(CONFIG.instagramDmUrl, "_blank");
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
    } catch (error) {
      console.error('Error sending via Instagram:', error);
      alert(lang === "en" ? "An error occurred. Please try again." : "Ocurrió un error. Por favor intenta de nuevo.");
    }
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
    <main className="min-h-screen bg-[#0E0706] relative overflow-x-clip">
      {/* ================================================================== */}
      {/* HEADER */}
      {/* ================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0E0706]/70 backdrop-blur-md border-b border-[#F4EBE1]/10">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="font-display text-sm tracking-[0.3em] text-[#F4EBE1]">
            IVA <span className="font-light">Nail Art</span>
          </a>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 font-display text-[0.65rem] tracking-[0.25em] text-[#F4EBE1]/70">
              <a href="#services" className="hover:text-[#E8C9A8] transition-colors">
                {t.nav.services}
              </a>
              <a href="#gallery" className="hover:text-[#E8C9A8] transition-colors">
                {t.nav.gallery}
              </a>
            </div>

            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-xs font-medium text-[#F4EBE1] border border-[#F4EBE1]/30 px-3 py-1.5 rounded-full hover:bg-[#F4EBE1] hover:text-[#0E0706] transition-all"
            >
              {t.langSwitch}
            </button>

            <a
              href={CONFIG.instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E8C9A8] text-[#0E0706] px-5 py-2 rounded-full text-sm font-semibold hover:bg-white transition-colors"
            >
              {t.nav.book}
            </a>
          </div>
        </nav>
      </header>

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <HeroScroll lang={lang} bookUrl={CONFIG.instagramDmUrl} cta={t.hero.cta} />
      <PhotoMarquee lang={lang} />

      {/* ================================================================== */}
      {/* STATISTICS SECTION PREMIUM */}
      {/* ================================================================== */}
      <section className="bg-[#0E0706] px-6 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-[#FDF8F5]/15">
          {[
            { end: 3, suffix: "", en: "Years of experience", es: "Años de experiencia" },
            { end: 33, suffix: "+", en: "Happy clients", es: "Clientas felices" },
            { end: 2000, suffix: "+", en: "Designs created", es: "Diseños creados" },
            { end: 100, suffix: "%", en: "Satisfaction rate", es: "Satisfacción" },
          ].map((stat) => (
            <div key={stat.en} className="px-2 text-center md:px-8 md:text-left">
              <div className="font-display text-4xl text-[#F4EBE1] md:text-6xl">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-[#FDF8F5]/70">
                {lang === "en" ? stat.en : stat.es}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* ABOUT SECTION - MEET IVA */}
      {/* ================================================================== */}
      <AboutIva language={lang} />

      {/* ================================================================== */}
      {/* SERVICES SECTION - LUXURY SPA MENU STYLE */}
      {/* ================================================================== */}
      <section
        id="services"
        ref={(el) => { sectionRefs.current['services'] = el as HTMLElement | null; }}
        className={`py-24 md:py-32 px-4 md:px-6 bg-[#0E0706] transition-all duration-1000 relative overflow-hidden ${visibleSections.has('services')
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section - Estilo Premium Minimalista */}
          <div className="text-center mb-20">
            <p className="font-display text-[#D4A574] tracking-[0.35em] text-[0.65rem] md:text-xs mb-6">
              {t.services.subtitle}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#F4EBE1] mb-8 font-light italic tracking-tight leading-tight">
              {t.services.title}
            </h2>
            <p className="text-[#F4EBE1]/70 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              {lang === "en" ? "Prices may vary based on design complexity" : "Los precios pueden variar según la complejidad del diseño"}
            </p>
          </div>

          {/* Category Tabs - Estilo Premium con bordes dorados sutiles */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-light tracking-wide transition-all duration-300 ${selectedCategory === cat.id
                  ? "bg-[#E8C9A8] text-[#0E0706] border border-[#E8C9A8] font-medium"
                  : "bg-transparent text-[#F4EBE1]/80 border border-[#F4EBE1]/25 hover:border-[#E8C9A8] hover:text-[#E8C9A8]"
                  }`}
                aria-label={`${lang === "en" ? "Filter by" : "Filtrar por"} ${lang === "en" ? cat.en : cat.es}`}
              >
                {lang === "en" ? cat.en : cat.es}
              </button>
            ))}
          </div>

          {/* Services Grid - Luxury Cards con imágenes y efectos premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredServices.map((service, index) => {
              // Icon mapping for services
              const getServiceIcon = () => {
                if (service.category === "manicure") return Hand;
                if (service.category === "pedicure") return Footprints;
                if (service.category === "nailart") return Palette;
                if (service.category === "acrylic") return Sparkles;
                return Scissors;
              };
              const IconComponent = getServiceIcon();

              // Obtener imagen de ejemplo de la galería basada en la categoría
              const getServiceImage = () => {
                const categoryImages = GALLERY_IMAGES.filter(img => img.category === "nails");
                // Usar diferentes imágenes según el índice para variedad
                const imageIndex = (index % categoryImages.length);
                return categoryImages[imageIndex]?.src || "/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg";
              };
              const serviceImage = getServiceImage();

              return (
                <article
                  key={service.id}
                  className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] transition-colors duration-300 hover:border-[#E8C9A8]/50"
                >
                  {/* Whole photo, never cropped: the frame has the same 3:4 ratio as the pictures */}
                  <div className="relative aspect-[3/4] w-full bg-[#140B0A]">
                    <Image
                      src={serviceImage}
                      alt={lang === "en" ? service.name : service.nameEs}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain"
                    />
                    <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#B8864D] shadow-md">
                      <IconComponent className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <h3 className="font-serif text-2xl leading-tight text-[#F4EBE1]">
                      {lang === "en" ? service.name : service.nameEs}
                    </h3>
                    <a
                      href={CONFIG.instagramDmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex w-full items-center justify-center gap-3 rounded-full border border-[#E8C9A8]/60 px-6 py-4 text-sm font-semibold tracking-wide text-[#E8C9A8] transition-colors hover:bg-[#E8C9A8] hover:text-[#0E0706]"
                      aria-label={`${lang === "en" ? "Send a direct message on Instagram about" : "Enviar mensaje directo por Instagram sobre"} ${lang === "en" ? service.name : service.nameEs}`}
                    >
                      <Instagram className="h-5 w-5" />
                      {lang === "en" ? "Ask for Price" : "Preguntar Precio"}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* GALLERY SECTION - GALERÍA VISUAL IMPRESIONANTE */}
      {/* ================================================================== */}
      <GallerySection lang={lang} t={t} CONFIG={CONFIG} />

      {/* ================================================================== */}
      {/* CTA SECTION */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#1C0A0A] px-6 py-24 md:px-10 md:py-36">
        <Image
          src="/gallery/aurora-chrome-gold.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-25"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1C0A0A] via-[#1C0A0A]/85 to-[#1C0A0A]/40" />
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A574]">
            {lang === "en" ? "By appointment only" : "Solo con cita"}
          </p>
          <h2 className="max-w-4xl font-serif text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] text-[#FDF8F5]">
            <span className="font-display block text-[0.72em] font-bold">{lang === "en" ? "Your next set" : "Tu próximo diseño"}</span>
            <span className="font-normal italic text-[#E8C9A8]">{lang === "en" ? "starts with a DM" : "empieza con un mensaje"}</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#FDF8F5]/75 md:text-lg">
            {lang === "en"
              ? "Send a photo of the look you love, pick a time, and Iva takes care of the rest."
              : "Envía una foto del diseño que te gusta, elige un horario e Iva se encarga del resto."}
          </p>
          <a
            href={CONFIG.instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-pill group mt-10"
          >
            {t.hero.cta}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E0706]/25 transition-transform group-hover:rotate-45">
              <ChevronRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FOOTER PREMIUM */}
      {/* ================================================================== */}
      <footer className="bg-gradient-to-br from-[#1a0202] via-[#2a0404] to-[#1a0202] text-white py-16 md:py-20 px-6 relative overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 via-transparent to-transparent"></div>

        {/* Marca de agua del logo en footer */}
        <div className="pointer-events-none absolute -right-16 -bottom-10 w-80 sm:w-96 opacity-10 rotate-6">
          <Image
src="/logo-iva.png"
alt="IVA watermark footer"
width={631}
height={436}
className="w-full h-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.25)]"
/>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand PREMIUM */}
            <div className="text-center md:text-left">
              <h3 className="font-serif text-3xl mb-5 bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent font-bold">
                IVA <span className="font-light">Nail Art</span>
              </h3>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Image
src="/logo-iva.png"
alt="IVA Nail Art logo footer"
width={631}
height={436}
className="w-16 h-auto rounded-lg"
/>
                <p className="text-[#D4AF37] text-sm font-semibold tracking-wide">
                  Luxury Nails · NY
                </p>
              </div>
              <p className="text-white/80 text-base font-medium leading-relaxed">{t.footer.tagline}</p>
            </div>

            {/* Hours */}
            <div className="text-center md:text-left">
              <h4 className="font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                {t.footer.hours}
              </h4>
              <p className="text-white/60 text-sm">{CONFIG.hours}</p>
              <p className="text-[#D4AF37] text-sm mt-1">{t.hero.appointment}</p>
            </div>

            {/* Location */}
            <div className="text-center md:text-left">
              <h4 className="font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                {t.footer.location}
              </h4>
              <p className="text-white/60 text-sm">{CONFIG.location}</p>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h4 className="font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                {t.footer.contact}
              </h4>
              <p className="text-white/60 text-sm">{CONFIG.phone}</p>
              <div className="flex justify-center md:justify-start gap-4 mt-4">
                <a
                  href={CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#D4AF37] transition-all hover:scale-110 p-2 rounded-full hover:bg-white/10"
                  aria-label={`${lang === "en" ? "Follow us on Instagram" : "Síguenos en Instagram"}`}
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href={CONFIG.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#D4AF37] transition-all hover:scale-110 p-2 rounded-full hover:bg-white/10"
                  aria-label={`${lang === "en" ? "Follow us on TikTok" : "Síguenos en TikTok"}`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-white/20 pt-10 text-center">
            <p className="text-white/70 text-base font-medium">
              © {new Date().getFullYear()} IVA Nail Art. All rights reserved.
            </p>
            <p className="mt-4 flex justify-center gap-6 text-sm text-white/70">
              <a href="/privacy" className="underline-offset-4 hover:text-[#D4AF37] hover:underline">
                {lang === "en" ? "Privacy Policy" : "Privacidad"}
              </a>
              <a href="/terms" className="underline-offset-4 hover:text-[#D4AF37] hover:underline">
                {lang === "en" ? "Terms & Conditions" : "Términos y Condiciones"}
              </a>
            </p>
            <p className="text-white/50 text-sm mt-2">
              {lang === "en" ? "Made with ❤️ in Brooklyn" : "Hecho con ❤️ en Brooklyn"}
            </p>
          </div>
        </div>
      </footer>

      {/* ================================================================== */}
      {/* BOOKING MODAL PREMIUM */}
      {/* ================================================================== */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop con animación */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsBookingOpen(false)}
            aria-hidden="true"
          />

          {/* Modal PREMIUM con animación */}
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border-2 border-[#E8A4B8]/20"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button PREMIUM */}
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-5 right-5 text-[#4A0404] hover:text-white transition-all z-10 bg-white/90 hover:bg-gradient-to-r hover:from-[#4A0404] hover:to-[#5C1A1B] rounded-full p-2.5 shadow-lg hover:shadow-xl hover:scale-110 border-2 border-[#E8A4B8]/30 hover:border-transparent"
              aria-label={lang === "en" ? "Close booking modal" : "Cerrar modal de reserva"}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header PREMIUM */}
            <div className="bg-gradient-to-r from-[#4A0404] via-[#5C1A1B] to-[#4A0404] text-white p-7 rounded-t-3xl relative overflow-hidden">
              {/* Efectos decorativos de fondo */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16"></div>

              <div className="relative z-10">
                <h3 id="booking-modal-title" className="font-serif text-3xl font-bold mb-2">{t.booking.title}</h3>
                <p className="text-white/90 text-base mt-1 font-medium">{t.booking.subtitle}</p>

                {/* Progress Steps PREMIUM */}
                <div className="flex justify-between mt-8 gap-2">
                {t.booking.steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${bookingData.step > index + 1
                          ? "bg-gradient-to-r from-[#D4AF37] to-[#E8C9A8] text-[#4A0404] shadow-xl scale-110"
                          : bookingData.step === index + 1
                            ? "bg-white text-[#4A0404] shadow-xl scale-110 ring-2 ring-[#D4AF37]"
                            : "bg-white/20 text-white/60"
                      }`}
                    >
                        {bookingData.step > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                    </div>
                      <span className="text-xs mt-2 text-white/90 hidden sm:block font-medium">{step}</span>
                  </div>
                ))}
                </div>
              </div>
            </div>

            {/* Content PREMIUM */}
            <div className="p-7 bg-gradient-to-b from-white to-[#FDF8F5]">
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
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === cat.id
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
                        className={`w-full p-4 rounded-xl text-left transition-all ${bookingData.service?.id === service.id
                            ? "bg-[#4A0404] text-white"
                            : "bg-[#FDF8F6] hover:bg-[#4A0404]/10 text-[#4A0404]"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {lang === "en" ? service.name : service.nameEs}
                          </span>
                          <span className="text-xs uppercase tracking-wide text-[#D4AF37]">
                            {lang === "en" ? "Price by DM" : "Precio por mensaje"}
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
                        className={`w-full p-3 rounded-xl border focus:outline-none transition-colors ${bookingData.errors.name
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
                        className={`w-full p-3 rounded-xl border focus:outline-none transition-colors ${bookingData.errors.phone
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
                        className={`w-full p-3 rounded-xl border focus:outline-none transition-colors ${bookingData.errors.email
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
                        <span className="text-[#4A0404]/60">📅 {lang === "en" ? "Date" : "Fecha"}</span>
                        <span className="text-[#4A0404]">{bookingData.date ? formatBookingDate(bookingData.date) : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4A0404]/60">🕐 {lang === "en" ? "Time" : "Hora"}</span>
                        <span className="text-[#4A0404]">{bookingData.time || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4A0404]/60">👤 {lang === "en" ? "Name" : "Nombre"}</span>
                        <span className="text-[#4A0404]">{bookingData.name || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Instagram DM Button */}
                  <p className="text-sm text-stone-600 text-center mb-3">{t.booking.dmHint}</p>
                  <button
                    onClick={sendViaInstagram}
                    className="w-full bg-[#4A0404] hover:bg-[#6B0606] text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3"
                  >
                    <Instagram className="w-6 h-6" />
                    {t.booking.sendInstagram}
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
                    className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${canProceed()
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
      {/* FLOATING INSTAGRAM DM BUTTON */}
      {/* ================================================================== */}
      <a
        href={CONFIG.instagramDmUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white p-4 rounded-full shadow-2xl hover:brightness-110 hover:scale-110 transition-all z-40 group"
        aria-label={lang === "en" ? "Message us on Instagram" : "Escríbenos por Instagram"}
      >
        <Instagram className="w-7 h-7" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#4A0404] text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          {t.floatingBtn}
        </span>
      </a>

      <BackToTop />
      <ScrollProgressBar />
    </main>
  );
}

