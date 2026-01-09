"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  ChevronRight,
  Check,
  X,
  Menu,
  MessageCircle,
  Star,
  Sparkles,
} from "lucide-react";

// =============================================
// LOGO COMPONENT - Elegant Rose Gold IVA
// =============================================

// =============================================
// ANIMATED SPARKLES COMPONENT
// =============================================

function FloatingSparkles() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 8 + 4,
    }));
    setSparkles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-pulse"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: '3s',
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#D4AF37]/40"
          >
            <path
              d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

// =============================================
// ANIMATED COUNTER COMPONENT
// =============================================

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${target}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [target, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  return (
    <span id={`counter-${target}`} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

// =============================================
// BACK TO TOP BUTTON
// =============================================

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-[#4A0404] text-white rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-all shadow-lg hover:scale-110"
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

// =============================================
// TYPING EFFECT COMPONENT
// =============================================

function TypingEffect({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// =============================================
// LOGO COMPONENT - Elegant Rose Gold IVA
// =============================================

function IVALogo({ className = "h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Rose Gold Gradient */}
        <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8B4B8" />
          <stop offset="25%" stopColor="#D4A5A5" />
          <stop offset="50%" stopColor="#C9A0A0" />
          <stop offset="75%" stopColor="#B76E79" />
          <stop offset="100%" stopColor="#A45A52" />
        </linearGradient>
        {/* Diamond Gradient */}
        <linearGradient id="diamond" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#F0F0F0" />
          <stop offset="60%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#D0D0D0" />
        </linearGradient>
        {/* Shine effect */}
        <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Letter i */}
      <path
        d="M8 18 L8 42 Q8 44 10 44 L14 44 Q16 44 16 42 L16 18 Q16 16 14 16 L10 16 Q8 16 8 18 Z"
        fill="url(#roseGold)"
      />
      {/* Shine on i */}
      <path
        d="M8 18 L8 42 Q8 44 10 44 L12 44 L12 16 L10 16 Q8 16 8 18 Z"
        fill="url(#shine)"
      />

      {/* Diamond dot on i */}
      <circle cx="12" cy="7" r="6" fill="url(#diamond)" stroke="#C9A0A0" strokeWidth="0.5" />
      {/* Diamond facets */}
      <path d="M12 1 L14 7 L12 13 L10 7 Z" fill="url(#diamond)" opacity="0.8" />
      <path d="M6 7 L12 5 L18 7 L12 9 Z" fill="url(#diamond)" opacity="0.6" />
      {/* Diamond sparkle */}
      <circle cx="10" cy="5" r="1" fill="white" opacity="0.9" />

      {/* Letter V */}
      <path
        d="M28 16 L28 16 Q26 16 25 18 L40 44 Q41 46 43 46 L47 46 Q49 46 50 44 L65 18 Q66 16 64 16 L60 16 Q58 16 57 18 L45 38 L33 18 Q32 16 30 16 Z"
        fill="url(#roseGold)"
      />
      {/* Shine on V */}
      <path
        d="M28 16 Q26 16 25 18 L40 44 Q41 46 43 46 L45 46 L32 20 Q31 18 29 17 Z"
        fill="url(#shine)"
      />

      {/* Letter A */}
      <path
        d="M75 44 L75 44 Q73 44 72 42 L87 10 Q88 8 90 8 L94 8 Q96 8 97 10 L112 42 Q113 44 111 44 L107 44 Q105 44 104 42 L100 34 L84 34 L80 42 Q79 44 77 44 Z M92 14 L86 28 L98 28 Z"
        fill="url(#roseGold)"
      />
      {/* Shine on A */}
      <path
        d="M87 10 Q88 8 90 8 L92 8 L78 42 Q77 44 75 44 L75 44 Q73 44 72 42 L87 10 Z"
        fill="url(#shine)"
      />
      {/* Inner triangle of A */}
      <path d="M92 16 L87 27 L97 27 Z" fill="#FDF8F6" />
    </svg>
  );
}

// =============================================
// TYPES
// =============================================

interface Service {
  id: string;
  name: string;
  nameEs: string;
  category: "manicure" | "pedicure" | "acrylic" | "nailart" | "extras";
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
}

type Language = "en" | "es";
type ServiceCategory = "manicure" | "pedicure" | "acrylic" | "nailart" | "extras";

// =============================================
// DATA
// =============================================

const CONFIG = {
  whatsappNumber: "19296257273",
  instagram: "iva_nailart_ny",
  instagramUrl: "https://instagram.com/iva_nailart_ny",
  tiktok: "iva_nailart_ny",
  tiktokUrl: "https://tiktok.com/@iva_nailart_ny",
  location: "Bay Ridge, Brooklyn, NY 11209",
  hours: "9:00 AM – 8:00 PM",
  deposit: 35,
};

const SERVICES: Service[] = [
  // Manicure
  { id: "classic-mani", name: "Classic Manicure", nameEs: "Manicura Clásica", category: "manicure" },
  { id: "gel-mani", name: "Gel Manicure", nameEs: "Manicura en Gel", category: "manicure" },
  { id: "deluxe-mani", name: "Deluxe Manicure", nameEs: "Manicura Deluxe", category: "manicure" },
  { id: "french-mani", name: "French Manicure", nameEs: "Manicura Francesa", category: "manicure" },
  // Pedicure
  { id: "classic-pedi", name: "Classic Pedicure", nameEs: "Pedicura Clásica", category: "pedicure" },
  { id: "gel-pedi", name: "Gel Pedicure", nameEs: "Pedicura en Gel", category: "pedicure" },
  { id: "luxury-pedi", name: "Luxury Spa Pedicure", nameEs: "Pedicura Spa de Lujo", category: "pedicure" },
  // Acrylic
  { id: "acrylic-full", name: "Full Set Acrylic", nameEs: "Set Completo Acrílico", category: "acrylic" },
  { id: "acrylic-fill", name: "Acrylic Fill", nameEs: "Relleno Acrílico", category: "acrylic" },
  { id: "acrylic-removal", name: "Acrylic Removal", nameEs: "Remoción de Acrílico", category: "acrylic" },
  // Nail Art
  { id: "custom-art", name: "Custom Nail Art", nameEs: "Arte de Uñas Personalizado", category: "nailart" },
  { id: "3d-art", name: "3D Nail Art", nameEs: "Arte 3D", category: "nailart" },
  { id: "chrome-nails", name: "Chrome/Mirror Nails", nameEs: "Uñas Cromadas/Espejo", category: "nailart" },
  { id: "ombre-nails", name: "Ombré Nails", nameEs: "Uñas Degradadas", category: "nailart" },
  // Extras
  { id: "nail-repair", name: "Nail Repair", nameEs: "Reparación de Uña", category: "extras" },
  { id: "gel-removal", name: "Gel Removal", nameEs: "Remoción de Gel", category: "extras" },
  { id: "nail-art-per-nail", name: "Nail Art (per nail)", nameEs: "Arte por Uña", category: "extras" },
];

const CATEGORIES: { id: ServiceCategory; name: string; nameEs: string }[] = [
  { id: "manicure", name: "Manicure", nameEs: "Manicura" },
  { id: "pedicure", name: "Pedicure", nameEs: "Pedicura" },
  { id: "acrylic", name: "Acrylic", nameEs: "Acrílico" },
  { id: "nailart", name: "Nail Art", nameEs: "Arte" },
  { id: "extras", name: "Extras", nameEs: "Extras" },
];

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

const GALLERY_IMAGES = [
  "/trabajo1.jpg",
  "/trabajo2.jpg",
  "/trabajo3.jpg",
];

const TRANSLATIONS = {
  en: {
    nav: {
      services: "Services",
      gallery: "Gallery",
      book: "Book",
    },
    hero: {
      welcome: "WELCOME TO",
      tagline: "Where elegance meets artistry. Unique nail designs crafted with passion and precision.",
      cta: "BOOK YOUR APPOINTMENT",
      location: "Bay Ridge, Brooklyn",
      hours: "9:00 AM – 8:00 PM",
      byAppointment: "By appointment only",
    },
    about: {
      subtitle: "MEET IVA",
      title: "The Artist Behind the Art",
      paragraph: "With years of experience and an unwavering passion for nail artistry, Iva brings creativity and precision to every design. Based in the heart of Brooklyn, she specializes in unique, handcrafted nail art using only premium, high-quality products. Every appointment is a personalized experience where your vision becomes reality.",
    },
    services: {
      title: "OUR SERVICES",
      subtitle: "Luxury nail care tailored to you",
      note: "Prices may vary based on design complexity. Contact Iva via WhatsApp for pricing.",
      askPrice: "Ask for price",
    },
    gallery: {
      title: "NAIL ART GALLERY",
      subtitle: "A glimpse of our artistry",
    },
    booking: {
      title: "BOOK YOUR APPOINTMENT",
      step1: "Select Service",
      step2: "Choose Date & Time",
      step3: "Your Information",
      step4: "Review & Confirm",
      selectService: "Choose a service",
      selectDate: "Select date",
      selectTime: "Select time",
      name: "Full Name",
      namePlaceholder: "Your name",
      phone: "Phone Number",
      phonePlaceholder: "(000) 000-0000",
      email: "Email (optional)",
      emailPlaceholder: "your@email.com",
      policies: "I understand that a $35 non-refundable deposit is required and cancellations must be made at least 24 hours in advance.",
      summary: "Appointment Summary",
      service: "Service",
      date: "Date",
      time: "Time",
      deposit: "Deposit Required",
      sendWhatsApp: "Send via WhatsApp",
      back: "Back",
      next: "Next",
      payments: "We accept: Cash, Zelle, Card",
    },
    footer: {
      hours: "Hours",
      location: "Location",
      followUs: "Follow Us",
      rights: "All rights reserved.",
    },
  },
  es: {
    nav: {
      services: "Servicios",
      gallery: "Galería",
      book: "Reservar",
    },
    hero: {
      welcome: "BIENVENIDA A",
      tagline: "Donde la elegancia se encuentra con el arte. Diseños únicos creados con pasión y precisión.",
      cta: "RESERVA TU CITA",
      location: "Bay Ridge, Brooklyn",
      hours: "9:00 AM – 8:00 PM",
      byAppointment: "Solo con cita previa",
    },
    about: {
      subtitle: "CONOCE A IVA",
      title: "La Artista Detrás del Arte",
      paragraph: "Con años de experiencia y una pasión inquebrantable por el arte de uñas, Iva aporta creatividad y precisión a cada diseño. Ubicada en el corazón de Brooklyn, se especializa en arte de uñas único y hecho a mano usando solo productos premium de alta calidad. Cada cita es una experiencia personalizada donde tu visión se convierte en realidad.",
    },
    services: {
      title: "NUESTROS SERVICIOS",
      subtitle: "Cuidado de uñas de lujo a tu medida",
      note: "Los precios pueden variar según la complejidad del diseño. Contacta a Iva por WhatsApp para precios.",
      askPrice: "Consultar precio",
    },
    gallery: {
      title: "GALERÍA DE ARTE",
      subtitle: "Una muestra de nuestra artesanía",
    },
    booking: {
      title: "RESERVA TU CITA",
      step1: "Seleccionar Servicio",
      step2: "Elegir Fecha y Hora",
      step3: "Tu Información",
      step4: "Revisar y Confirmar",
      selectService: "Elige un servicio",
      selectDate: "Selecciona fecha",
      selectTime: "Selecciona hora",
      name: "Nombre Completo",
      namePlaceholder: "Tu nombre",
      phone: "Número de Teléfono",
      phonePlaceholder: "(000) 000-0000",
      email: "Email (opcional)",
      emailPlaceholder: "tu@email.com",
      policies: "Entiendo que se requiere un depósito de $35 no reembolsable y las cancelaciones deben hacerse con al menos 24 horas de anticipación.",
      summary: "Resumen de la Cita",
      service: "Servicio",
      date: "Fecha",
      time: "Hora",
      deposit: "Depósito Requerido",
      sendWhatsApp: "Enviar por WhatsApp",
      back: "Atrás",
      next: "Siguiente",
      payments: "Aceptamos: Efectivo, Zelle, Tarjeta",
    },
    footer: {
      hours: "Horario",
      location: "Ubicación",
      followUs: "Síguenos",
      rights: "Todos los derechos reservados.",
    },
  },
};

// =============================================
// INITIAL STATE
// =============================================

const initialBooking: BookingState = {
  step: 1,
  service: null,
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  acceptedPolicies: false,
};

// =============================================
// MAIN COMPONENT
// =============================================

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [booking, setBooking] = useState<BookingState>(initialBooking);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("manicure");
  const [currentYear, setCurrentYear] = useState(2024);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // =============================================
  // HELPERS
  // =============================================

  const getMinDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const openBooking = () => {
    setBooking(initialBooking);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setBooking(initialBooking);
  };

  const nextStep = () => {
    if (booking.step < 4) {
      setBooking((prev) => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    if (booking.step > 1) {
      setBooking((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const canProceed = (): boolean => {
    switch (booking.step) {
      case 1:
        return booking.service !== null;
      case 2:
        return booking.date !== "" && booking.time !== "";
      case 3:
        return booking.name.trim() !== "" && booking.phone.trim() !== "" && booking.acceptedPolicies;
      default:
        return true;
    }
  };

  const sendToWhatsApp = () => {
    const serviceName = language === "en" ? booking.service?.name : booking.service?.nameEs;
    const message = language === "en"
      ? `Hi Iva! I'd like to book an appointment.

Service: ${serviceName}
Date: ${formatDate(booking.date)}
Time: ${booking.time}
Name: ${booking.name}
Phone: ${booking.phone}
${booking.email ? `Email: ${booking.email}` : ""}

I understand a $${CONFIG.deposit} non-refundable deposit is required and cancellations must be made at least 24 hours in advance.`
      : `¡Hola Iva! Me gustaría reservar una cita.

Servicio: ${serviceName}
Fecha: ${formatDate(booking.date)}
Hora: ${booking.time}
Nombre: ${booking.name}
Teléfono: ${booking.phone}
${booking.email ? `Email: ${booking.email}` : ""}

Entiendo que se requiere un depósito de $${CONFIG.deposit} no reembolsable y las cancelaciones deben hacerse con al menos 24 horas de anticipación.`;

    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    closeBooking();
  };

  const filteredServices = SERVICES.filter((s) => s.category === activeCategory);

  // =============================================
  // RENDER
  // =============================================

  return (
    <main className="min-h-screen bg-[#FDF8F6]">
      {/* ==================== HEADER ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F6]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
        <nav className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <IVALogo className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              className="text-sm uppercase tracking-widest text-[#4A0404] hover:text-[#D4AF37] transition-colors"
            >
              {t.nav.services}
            </a>
            <a
              href="#gallery"
              className="text-sm uppercase tracking-widest text-[#4A0404] hover:text-[#D4AF37] transition-colors"
            >
              {t.nav.gallery}
            </a>
            <a
              href="#booking"
              className="text-sm uppercase tracking-widest text-[#4A0404] hover:text-[#D4AF37] transition-colors"
            >
              {t.nav.book}
            </a>

            {/* Language Toggle */}
            <div className="flex items-center gap-1 border-l border-[#D4AF37]/30 pl-6">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                  language === "en"
                    ? "bg-[#4A0404] text-white"
                    : "text-[#4A0404] hover:bg-[#4A0404]/10"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                  language === "es"
                    ? "bg-[#4A0404] text-white"
                    : "text-[#4A0404] hover:bg-[#4A0404]/10"
                }`}
              >
                ES
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A0404]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FDF8F6] border-t border-[#D4AF37]/20 px-4 py-6 space-y-4">
            <a
              href="#services"
              className="block text-sm uppercase tracking-widest text-[#4A0404]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.services}
            </a>
            <a
              href="#gallery"
              className="block text-sm uppercase tracking-widest text-[#4A0404]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.gallery}
            </a>
            <a
              href="#booking"
              className="block text-sm uppercase tracking-widest text-[#4A0404]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.nav.book}
            </a>
            <div className="flex items-center gap-2 pt-4 border-t border-[#D4AF37]/20">
              <span className="text-xs text-[#4A0404]/60 uppercase tracking-wider">
                {language === "en" ? "Language" : "Idioma"}:
              </span>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 text-xs rounded ${
                  language === "en" ? "bg-[#4A0404] text-white" : "bg-[#D4AF37]/20 text-[#4A0404]"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={`px-3 py-1.5 text-xs rounded ${
                  language === "es" ? "bg-[#4A0404] text-white" : "bg-[#D4AF37]/20 text-[#4A0404]"
                }`}
              >
                ES
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/portada.jpg)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Floating Sparkles */}
        <FloatingSparkles />

        {/* Content */}
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            {t.hero.welcome}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            IVA <span className="text-[#D4AF37]">Nail Art</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.hero.tagline}
          </p>

          <button
            onClick={openBooking}
            className="px-10 py-4 bg-[#D4AF37] text-[#4A0404] text-sm uppercase tracking-widest font-medium hover:bg-[#D4AF37]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {t.hero.cta}
          </button>

          {/* Info Bar */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero.hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero.byAppointment}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            {t.about.subtitle}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#4A0404] mb-8">
            {t.about.title}
          </h2>
          <p className="text-lg text-[#4A0404]/80 leading-relaxed max-w-3xl mx-auto">
            {t.about.paragraph}
          </p>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-[#4A0404] via-[#6B1010] to-[#4A0404]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <p className="font-serif text-4xl md:text-5xl text-[#D4AF37] mb-2">
                <AnimatedCounter target={500} suffix="+" />
              </p>
              <p className="text-sm uppercase tracking-wider text-white/80">
                {language === "en" ? "Happy Clients" : "Clientas Felices"}
              </p>
            </div>
            <div className="group">
              <p className="font-serif text-4xl md:text-5xl text-[#D4AF37] mb-2">
                <AnimatedCounter target={8} suffix="+" />
              </p>
              <p className="text-sm uppercase tracking-wider text-white/80">
                {language === "en" ? "Years Experience" : "Años de Experiencia"}
              </p>
            </div>
            <div className="group">
              <p className="font-serif text-4xl md:text-5xl text-[#D4AF37] mb-2">
                <AnimatedCounter target={50} suffix="+" />
              </p>
              <p className="text-sm uppercase tracking-wider text-white/80">
                {language === "en" ? "Nail Art Styles" : "Estilos de Arte"}
              </p>
            </div>
            <div className="group">
              <p className="font-serif text-4xl md:text-5xl text-[#D4AF37] mb-2">
                5<span className="text-2xl">★</span>
              </p>
              <p className="text-sm uppercase tracking-wider text-white/80">
                {language === "en" ? "Google Rating" : "Calificación Google"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section id="services" className="py-20 md:py-28 px-4 md:px-8 bg-[#FDF8F6]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              {t.services.subtitle}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#4A0404] mb-4">
              {t.services.title}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm uppercase tracking-wider rounded-full transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#4A0404] text-white"
                    : "bg-white text-[#4A0404] border border-[#4A0404]/20 hover:border-[#4A0404]/50"
                }`}
              >
                {language === "en" ? cat.name : cat.nameEs}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-lg border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:shadow-lg transition-all group"
              >
                <h3 className="font-serif text-xl text-[#4A0404] mb-2">
                  {language === "en" ? service.name : service.nameEs}
                </h3>
                <p className="text-sm text-[#D4AF37] mb-4">
                  {t.services.askPrice}
                </p>
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    language === "en"
                      ? `Hi Iva! I'd like to know the price for: ${service.name}`
                      : `¡Hola Iva! Me gustaría saber el precio de: ${service.nameEs}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#4A0404] hover:text-[#D4AF37] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-center text-sm text-[#4A0404]/60 mt-8 max-w-2xl mx-auto">
            {t.services.note}
          </p>
        </div>
      </section>

      {/* ==================== GALLERY SECTION ==================== */}
      <section id="gallery" className="py-20 md:py-28 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              {t.gallery.subtitle}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#4A0404]">
              {t.gallery.title}
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {GALLERY_IMAGES.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer bg-gradient-to-br from-[#D4AF37]/20 to-[#4A0404]/10"
              >
                <img
                  src={img}
                  alt={`Nail art work ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Placeholder fallback */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center opacity-30">
                    <Sparkles className="w-12 h-12 mx-auto text-[#D4AF37] mb-2" />
                    <p className="text-sm text-[#4A0404]">Nail Art {index + 1}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[#4A0404]/0 group-hover:bg-[#4A0404]/20 transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className="text-center mt-10">
            <a
              href={CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-sm uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-5 h-5" />
              @{CONFIG.instagram}
            </a>
          </div>
        </div>
      </section>

      {/* ==================== BOOKING SECTION ==================== */}
      <section id="booking" className="py-20 md:py-28 px-4 md:px-8 bg-[#4A0404]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
            {language === "en" ? "Ready for beautiful nails?" : "¿Lista para uñas hermosas?"}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-8">
            {t.booking.title}
          </h2>

          <button
            onClick={openBooking}
            className="px-12 py-5 bg-[#D4AF37] text-[#4A0404] text-sm uppercase tracking-widest font-medium hover:bg-white transition-all shadow-xl"
          >
            {t.hero.cta}
          </button>

          {/* Payment Info */}
          <p className="mt-8 text-white/60 text-sm">
            {t.booking.payments}
          </p>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-16 px-4 md:px-8 bg-[#FDF8F6] border-t border-[#D4AF37]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <IVALogo className="h-10 w-auto mb-4" />
              <div className="flex items-center gap-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#4A0404] mb-4 font-medium">
                {t.footer.hours}
              </h4>
              <p className="text-sm text-[#4A0404]/70">Mon - Sat: {CONFIG.hours}</p>
              <p className="text-sm text-[#4A0404]/70">
                {language === "en" ? "Sunday: Closed" : "Domingo: Cerrado"}
              </p>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#4A0404] mb-4 font-medium">
                {t.footer.location}
              </h4>
              <p className="text-sm text-[#4A0404]/70">{CONFIG.location}</p>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#4A0404] mb-4 font-medium">
                {t.footer.followUs}
              </h4>
              <div className="flex items-center gap-4">
                <a
                  href={CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href={CONFIG.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Phone className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-[#D4AF37]/20 text-center">
            <p className="text-xs text-[#4A0404]/60">
              © {currentYear} IVA Nail Art. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      {/* ==================== FLOATING WHATSAPP BUTTON ==================== */}
      <a
        href={`https://wa.me/${CONFIG.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* ==================== BACK TO TOP BUTTON ==================== */}
      <BackToTop />

      {/* ==================== BOOKING MODAL (4-STEP WIZARD) ==================== */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeBooking}
          />

          {/* Modal */}
          <div className="relative bg-[#FDF8F6] w-full max-w-lg max-h-[90vh] overflow-hidden md:mx-4 md:rounded-xl shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-[#FDF8F6] z-10 px-6 py-5 border-b border-[#D4AF37]/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl text-[#4A0404]">
                  {t.booking.title}
                </h2>
                <button
                  onClick={closeBooking}
                  className="p-2 hover:bg-[#4A0404]/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[#4A0404]" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 h-1.5 rounded-full transition-colors ${
                      booking.step >= step ? "bg-[#D4AF37]" : "bg-[#D4AF37]/20"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-[#4A0404]/60">
                <span className={booking.step >= 1 ? "text-[#4A0404]" : ""}>1</span>
                <span className={booking.step >= 2 ? "text-[#4A0404]" : ""}>2</span>
                <span className={booking.step >= 3 ? "text-[#4A0404]" : ""}>3</span>
                <span className={booking.step >= 4 ? "text-[#4A0404]" : ""}>4</span>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[55vh] px-6 py-6">
              {/* Step 1: Select Service */}
              {booking.step === 1 && (
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#4A0404]/60 mb-4">
                    {t.booking.selectService}
                  </p>
                  <div className="space-y-3">
                    {SERVICES.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setBooking((prev) => ({ ...prev, service }))}
                        className={`w-full p-4 text-left border rounded-lg transition-all ${
                          booking.service?.id === service.id
                            ? "border-[#D4AF37] bg-[#D4AF37]/10"
                            : "border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-serif text-[#4A0404]">
                            {language === "en" ? service.name : service.nameEs}
                          </span>
                          {booking.service?.id === service.id && (
                            <Check className="w-5 h-5 text-[#D4AF37]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {booking.step === 2 && (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-[#4A0404]/60 mb-3">
                      {t.booking.selectDate}
                    </p>
                    <input
                      type="date"
                      min={getMinDate()}
                      value={booking.date}
                      onChange={(e) => setBooking((prev) => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#D4AF37]/30 rounded-lg bg-white text-[#4A0404] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-wider text-[#4A0404]/60 mb-3">
                      {t.booking.selectTime}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setBooking((prev) => ({ ...prev, time: slot }))}
                          className={`px-3 py-2 text-sm border rounded-lg transition-all ${
                            booking.time === slot
                              ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#4A0404]"
                              : "border-[#D4AF37]/20 hover:border-[#D4AF37]/50 text-[#4A0404]/70"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Personal Info */}
              {booking.step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="text-sm uppercase tracking-wider text-[#4A0404]/60 block mb-2">
                      {t.booking.name} *
                    </label>
                    <input
                      type="text"
                      value={booking.name}
                      onChange={(e) => setBooking((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder={t.booking.namePlaceholder}
                      className="w-full px-4 py-3 border border-[#D4AF37]/30 rounded-lg bg-white text-[#4A0404] placeholder:text-[#4A0404]/40 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm uppercase tracking-wider text-[#4A0404]/60 block mb-2">
                      {t.booking.phone} *
                    </label>
                    <input
                      type="tel"
                      value={booking.phone}
                      onChange={(e) => setBooking((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder={t.booking.phonePlaceholder}
                      className="w-full px-4 py-3 border border-[#D4AF37]/30 rounded-lg bg-white text-[#4A0404] placeholder:text-[#4A0404]/40 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm uppercase tracking-wider text-[#4A0404]/60 block mb-2">
                      {t.booking.email}
                    </label>
                    <input
                      type="email"
                      value={booking.email}
                      onChange={(e) => setBooking((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder={t.booking.emailPlaceholder}
                      className="w-full px-4 py-3 border border-[#D4AF37]/30 rounded-lg bg-white text-[#4A0404] placeholder:text-[#4A0404]/40 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  {/* Policies Checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer mt-4">
                    <input
                      type="checkbox"
                      checked={booking.acceptedPolicies}
                      onChange={(e) =>
                        setBooking((prev) => ({ ...prev, acceptedPolicies: e.target.checked }))
                      }
                      className="mt-1 w-5 h-5 rounded border-[#D4AF37]/30 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <span className="text-sm text-[#4A0404]/70 leading-relaxed">
                      {t.booking.policies}
                    </span>
                  </label>
                </div>
              )}

              {/* Step 4: Summary */}
              {booking.step === 4 && (
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#4A0404]/60 mb-4">
                    {t.booking.summary}
                  </p>

                  <div className="bg-white p-5 rounded-lg border border-[#D4AF37]/20 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[#4A0404]/60">{t.booking.service}</span>
                      <span className="text-[#4A0404] font-medium">
                        {language === "en" ? booking.service?.name : booking.service?.nameEs}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A0404]/60">{t.booking.date}</span>
                      <span className="text-[#4A0404] font-medium">{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A0404]/60">{t.booking.time}</span>
                      <span className="text-[#4A0404] font-medium">{booking.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A0404]/60">{t.booking.name}</span>
                      <span className="text-[#4A0404] font-medium">{booking.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A0404]/60">{t.booking.phone}</span>
                      <span className="text-[#4A0404] font-medium">{booking.phone}</span>
                    </div>
                    {booking.email && (
                      <div className="flex justify-between">
                        <span className="text-[#4A0404]/60">{t.booking.email}</span>
                        <span className="text-[#4A0404] font-medium">{booking.email}</span>
                      </div>
                    )}
                    <div className="pt-4 border-t border-[#D4AF37]/20">
                      <div className="flex justify-between">
                        <span className="text-[#4A0404]/60">{t.booking.deposit}</span>
                        <span className="text-[#D4AF37] font-bold text-lg">${CONFIG.deposit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#FDF8F6] border-t border-[#D4AF37]/20 px-6 py-5">
              <div className="flex gap-3">
                {booking.step > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex-1 py-3 border border-[#4A0404] text-[#4A0404] text-sm uppercase tracking-wider rounded-lg hover:bg-[#4A0404]/5 transition-colors"
                  >
                    {t.booking.back}
                  </button>
                )}
                {booking.step < 4 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`flex-1 py-3 bg-[#4A0404] text-white text-sm uppercase tracking-wider rounded-lg transition-all ${
                      !canProceed() ? "opacity-40 cursor-not-allowed" : "hover:bg-[#4A0404]/90"
                    }`}
                  >
                    {t.booking.next}
                  </button>
                ) : (
                  <button
                    onClick={sendToWhatsApp}
                    className="flex-1 py-3 bg-[#25D366] text-white text-sm uppercase tracking-wider rounded-lg hover:bg-[#25D366]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.booking.sendWhatsApp}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
