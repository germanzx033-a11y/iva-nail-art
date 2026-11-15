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
  Heart,
  Star,
  X,
  Award,
  Hand,
  Footprints,
  Palette,
  Scissors,
} from "lucide-react";
import { formatDate, getMinBookingDate, isValidEmail, isValidPhone } from "@/lib/utils";
import Image from "next/image";
import AboutIva from "@/app/components/AboutIva";
import GallerySection from "@/app/components/GallerySection";
import { GALLERY_IMAGES } from "@/app/data/galleryData";

// Componente de contador animado PREMIUM
function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const counterEl = counterRef.current;
    if (counterEl) {
      observer.observe(counterEl);
    }

    return () => {
      if (counterEl) {
        observer.unobserve(counterEl);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOut);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return <span ref={counterRef}>{prefix}{count}{suffix}</span>;
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

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
function makeParticles(count: number) {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 4}s`,
  }));
}

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

  // Estado para cursor personalizado
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [particles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  // Valores aleatorios generados una sola vez (initializer lazy). Se renderizan solo
  // cuando !isLoading, así que no hay desajuste de hidratación con el servidor.
  const [stars] = useState<Array<{ id: number; x: number; y: number; delay: number }>>(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
  );
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [heroParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>(() =>
    makeParticles(15)
  );
  const [backgroundParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>(() =>
    makeParticles(20)
  );

  // Estados para efectos mágicos interactivos
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 50, y: 50 });
  const [cursorParticles, setCursorParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; life: number }>>([]);
  const [goldWaves, setGoldWaves] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

  // Hook para cursor personalizado
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Detectar elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Hook para loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Hook para crear ripples en clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const newRipple = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        };
        setRipples((prev: Array<{ id: number; x: number; y: number }>) => [...prev, newRipple]);
        setTimeout(() => {
          setRipples((prev: Array<{ id: number; x: number; y: number }>) => prev.filter((r: { id: number; x: number; y: number }) => r.id !== newRipple.id));
        }, 1000);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Hook para scroll parallax y progress
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min((window.scrollY / scrollHeight) * 100, 100) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hook para spotlight mágico que sigue el mouse
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      setSpotlightPosition({ x: e.clientX, y: e.clientY });
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Crear partículas doradas que siguen el cursor
      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
        };
        setCursorParticles((prev) => [...prev.slice(-15), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animación de partículas del cursor
  useEffect(() => {
    if (cursorParticles.length === 0) return;

    const interval = setInterval(() => {
      setCursorParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
            vx: p.vx * 0.98,
            vy: p.vy * 0.98,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [cursorParticles.length]);

  // Hook para crear ondas doradas al hacer hover en tarjetas
  useEffect(() => {
    if (!hoveredCard) return;

    const interval = setInterval(() => {
      const cardElement = document.querySelector(`[data-card-id="${hoveredCard}"]`);
      if (cardElement) {
        const rect = cardElement.getBoundingClientRect();
        const newWave = {
          id: Date.now(),
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          size: 0,
          opacity: 1,
        };
        setGoldWaves((prev) => [...prev.slice(-5), newWave]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [hoveredCard]);

  // Animación de ondas doradas
  useEffect(() => {
    if (goldWaves.length === 0) return;

    const interval = setInterval(() => {
      setGoldWaves((prev) =>
        prev
          .map((w) => ({
            ...w,
            size: w.size + 20,
            opacity: w.opacity - 0.05,
          }))
          .filter((w) => w.opacity > 0 && w.size < 500)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [goldWaves.length]);

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
    <main className="min-h-screen bg-[#FDF8F6] relative overflow-x-hidden">
      {/* Spotlight mágico que sigue el mouse */}
      <div
        className="fixed pointer-events-none z-40 transition-opacity duration-300"
        style={{
          left: spotlightPosition.x - 300,
          top: spotlightPosition.y - 300,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 40%, transparent 70%)',
          borderRadius: '50%',
          mixBlendMode: 'multiply',
          opacity: 0.6,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Partículas doradas que siguen el cursor */}
      {cursorParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-30"
          style={{
            left: particle.x,
            top: particle.y,
            width: '4px',
            height: '4px',
            background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
            borderRadius: '50%',
            opacity: particle.life,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${particle.life * 10}px rgba(212, 175, 55, ${particle.life * 0.8})`,
          }}
        />
      ))}

      {/* Ondas doradas en tarjetas hover */}
      {goldWaves.map((wave) => (
        <div
          key={wave.id}
          className="fixed pointer-events-none z-20"
          style={{
            left: wave.x,
            top: wave.y,
            width: `${wave.size}px`,
            height: `${wave.size}px`,
            border: `2px solid rgba(212, 175, 55, ${wave.opacity})`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${wave.size * 0.5}px rgba(212, 175, 55, ${wave.opacity * 0.5})`,
          }}
        />
      ))}

      {/* Scroll Progress Bar Avanzado */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Partículas interactivas que siguen el mouse */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle-trail"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
          }}
        />
      ))}

      {/* Spotlight que sigue el mouse */}
      {!isLoading && (
        <div
          className="spotlight"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            opacity: isHovering ? 0.8 : 0.3,
          }}
        />
      )}

      {/* Grid animado de fondo */}
      {!isLoading && <div className="grid-background" />}

      {/* Partículas de estrellas */}
      {!isLoading && stars.map((star) => (
        <div
          key={star.id}
          className="star-particle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Ripples en clicks de botones */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '100px',
            height: '100px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Morphing shapes decorativos */}
      {!isLoading && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="morph-shape absolute"
            style={{
              width: '300px',
              height: '300px',
              top: '10%',
              right: '10%',
              opacity: 0.1,
            }}
          />
          <div
            className="morph-shape absolute"
            style={{
              width: '200px',
              height: '200px',
              bottom: '20%',
              left: '15%',
              opacity: 0.1,
              animationDelay: '4s',
            }}
          />
        </div>
      )}

      {/* Ondas animadas de fondo */}
      {!isLoading && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          <div className="wave-bg" style={{ left: '-50%', top: '-50%' }} />
          <div className="wave-bg" style={{ left: '-30%', top: '-30%', animationDelay: '2s' }} />
          <div className="wave-bg" style={{ left: '-10%', top: '-10%', animationDelay: '4s' }} />
        </div>
      )}
      {/* Loading Screen Elegante */}
      {isLoading && (
        <div className="fixed inset-0 z-[10000] bg-gradient-to-br from-[#FDF8F6] via-white to-[#FAF5F2] flex items-center justify-center animate-fade-out">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-[#D4AF37]/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-[#D4AF37] rounded-full animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#D4AF37] animate-pulse" />
            </div>
            <h2 className="font-serif text-2xl text-[#4A0404] animate-gradient-text bg-gradient-to-r from-[#4A0404] via-[#D4AF37] to-[#4A0404] bg-clip-text text-transparent">
              IVA Nail Art
            </h2>
          </div>
        </div>
      )}

      {/* Cursor personalizado con efectos */}
      {typeof window !== 'undefined' && !isLoading && (
        <div
          className={`fixed pointer-events-none z-[9999] transition-all duration-300 ease-out ${isHovering ? 'cursor-glow active' : 'cursor-glow'
            }`}
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Partículas de fondo flotantes */}
      {!isLoading && backgroundParticles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {backgroundParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37]/20 rounded-full animate-float-particle"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>
      )}
      {/* ================================================================== */}
      {/* HEADER */}
      {/* ================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FDF8F6]/90 backdrop-blur-md border-b border-[#4A0404]/10">
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

            <a
              href={CONFIG.instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4A0404] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#6B0606] transition-colors shadow-lg shadow-[#4A0404]/20"
            >
              {t.nav.book}
            </a>
          </div>
        </nav>
      </header>

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image con Parallax Avanzado */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
          style={{
            backgroundImage: "url('/portada.jpg')",
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
            backgroundPosition: `${50 + (mousePosition.x - 50) * 0.02}% ${50 + (mousePosition.y - 50) * 0.02}%`,
          }}
        />
        {/* Overlay con gradiente dinámico */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(212, 175, 55, 0.1) 0%, transparent 50%), linear-gradient(to bottom, rgba(74, 4, 4, 0.8) 0%, rgba(74, 4, 4, 0.6) 50%, rgba(74, 4, 4, 0.85) 100%)`,
          }}
        />
        {/* Efecto de luz dinámica que sigue el mouse */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 400px at ${mousePosition.x}% ${mousePosition.y}%, rgba(212, 175, 55, 0.15) 0%, transparent 70%)`,
            opacity: isHovering ? 1 : 0.5,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 pt-28 pb-24 max-w-4xl mx-auto">
          <p className="text-[#D4AF37] tracking-[0.3em] text-sm mb-4 font-medium">
            {t.hero.welcome}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight animate-slide-in-up">
            IVA <span className="font-light italic bg-gradient-to-r from-[#D4AF37] via-[#E8C9A8] to-[#D4AF37] bg-clip-text text-transparent animate-gradient-text">Nail Art</span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            <span>{t.hero.tagline}</span>
          </p>

          {/* Logo IVA - Transparente */}
          <div className="relative mx-auto mb-10 flex justify-center">
            <Image
src="/logo-iva.png"
alt="IVA Nail Art logo"
width={631}
height={436}
className="w-56 sm:w-72 h-auto drop-shadow-[0_8px_32px_rgba(0,0,0,0.4)]" priority
/>
          </div>

          <a
            href={CONFIG.instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-[#D4AF37] via-[#E8C9A8] to-[#D4AF37] text-[#4A0404] px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:from-white hover:via-[#F5E6D3] hover:to-white transition-all shadow-2xl hover:shadow-[#D4AF37]/50 hover:scale-110 inline-flex items-center gap-2 relative overflow-hidden"
            aria-label={t.hero.cta}
          >
            <span className="relative z-10 flex items-center gap-2">
            {t.hero.cta}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          </a>

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

        {/* Partículas flotantes decorativas PREMIUM */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          {!isLoading && heroParticles.length > 0 && (
            <>
              {heroParticles.map((particle, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-[#D4AF37]/40 rounded-full animate-float-particle neon-glow"
                  style={{
                    left: particle.left,
                    top: particle.top,
                    animationDelay: particle.delay,
                    animationDuration: particle.duration,
                  }}
                />
              ))}
            </>
          )}
          {/* Sparkles animados */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-sparkle"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 4) * 25}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]/60" />
            </div>
          ))}
        </div>

        {/* Scroll Indicator PREMIUM */}
        <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-7 h-12 border-2 border-white/50 rounded-full flex justify-center pt-3 shadow-xl backdrop-blur-sm bg-white/10">
            <div className="w-1.5 h-3 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* STATISTICS SECTION PREMIUM */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden py-16 md:py-20 px-6 bg-gradient-to-br from-[#FDF8F5] via-white to-[#FAF5F2]">
        {/* Marca de agua IVA */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
          <Image
src="/logo-iva.png"
alt="IVA watermark"
width={631}
height={436}
className="w-[360px] sm:w-[440px] max-w-[80vw] drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
/>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Stat 1: Years of Experience */}
            <div className="text-center group">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-[#B8864D]/20 flex items-center justify-center group-hover:from-[#D4A574]/30 group-hover:to-[#B8864D]/30 transition-all duration-300 group-hover:scale-110">
                  <Star className="w-8 h-8 text-[#B8864D]" fill="#B8864D" />
                </div>
              </div>
              <div className="font-serif text-4xl md:text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #D4A574 0%, #B8864D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                <AnimatedCounter end={3} suffix="" />
              </div>
              <p className="text-[#3D2828] text-sm md:text-base font-medium">
                {lang === "en" ? "Years Experience" : "Años de Experiencia"}
              </p>
            </div>

            {/* Stat 2: Happy Clients */}
            <div className="text-center group">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-[#B8864D]/20 flex items-center justify-center group-hover:from-[#D4A574]/30 group-hover:to-[#B8864D]/30 transition-all duration-300 group-hover:scale-110">
                  <Heart className="w-8 h-8 text-[#B8864D]" fill="#B8864D" />
                </div>
              </div>
              <div className="font-serif text-4xl md:text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #D4A574 0%, #B8864D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <p className="text-[#3D2828] text-sm md:text-base font-medium">
                {lang === "en" ? "Happy Clients" : "Clientas Felices"}
              </p>
            </div>

            {/* Stat 3: Designs Created */}
            <div className="text-center group">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-[#B8864D]/20 flex items-center justify-center group-hover:from-[#D4A574]/30 group-hover:to-[#B8864D]/30 transition-all duration-300 group-hover:scale-110">
                  <Sparkles className="w-8 h-8 text-[#B8864D]" />
                </div>
              </div>
              <div className="font-serif text-4xl md:text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #D4A574 0%, #B8864D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                <AnimatedCounter end={2000} suffix="+" />
              </div>
              <p className="text-[#3D2828] text-sm md:text-base font-medium">
                {lang === "en" ? "Designs Created" : "Diseños Creados"}
              </p>
            </div>

            {/* Stat 4: Satisfaction Rate */}
            <div className="text-center group">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-[#B8864D]/20 flex items-center justify-center group-hover:from-[#D4A574]/30 group-hover:to-[#B8864D]/30 transition-all duration-300 group-hover:scale-110">
                  <Award className="w-8 h-8 text-[#B8864D]" />
                </div>
              </div>
              <div className="font-serif text-4xl md:text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #D4A574 0%, #B8864D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p className="text-[#3D2828] text-sm md:text-base font-medium">
                {lang === "en" ? "Satisfaction Rate" : "Tasa de Satisfacción"}
              </p>
            </div>
          </div>
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
        className={`py-32 px-4 md:px-6 bg-gradient-to-b from-stone-50 via-white to-stone-50 transition-all duration-1000 relative overflow-hidden ${visibleSections.has('services')
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
          }`}
      >
        {/* Fondo con textura sutil tipo mármol - Estilo Premium */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(ellipse 800px 400px at 20% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse 600px 300px at 80% 70%, rgba(212, 175, 55, 0.06) 0%, transparent 60%),
              linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.02) 50%, transparent 100%)
            `,
          }} />
          {/* Efecto de venas sutiles tipo mármol */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(212, 175, 55, 0.03) 49%, rgba(212, 175, 55, 0.03) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(212, 175, 55, 0.02) 49%, rgba(212, 175, 55, 0.02) 51%, transparent 52%)
            `,
            backgroundSize: '200px 200px',
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section - Estilo Premium Minimalista */}
          <div className="text-center mb-20">
            <p className="text-[#4A0404] tracking-[0.4em] text-xs md:text-sm mb-6 font-light uppercase">
              {t.services.subtitle}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#4A0404] mb-8 font-light tracking-tight leading-tight">
              {t.services.title}
            </h2>
            <p className="text-[#6B5050] text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
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
                  ? "bg-[#4A0404] text-white border border-[#D4AF37] shadow-md"
                  : "bg-white/90 text-[#4A0404] border border-[#D4AF37]/40 hover:border-[#D4AF37]/60 hover:bg-white/95 shadow-sm"
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

              // Gradientes únicos por categoría
              const getCategoryGradient = () => {
                switch (service.category) {
                  case "manicure":
                    return "from-[#E8A4B8]/20 via-[#F5C6D6]/10 to-[#D4AF37]/15";
                  case "pedicure":
                    return "from-[#D4AF37]/20 via-[#E8C9A8]/15 to-[#E8A4B8]/10";
                  case "nailart":
                    return "from-[#E8A4B8]/25 via-[#D4AF37]/15 to-[#F5C6D6]/20";
                  case "acrylic":
                    return "from-[#D4AF37]/25 via-[#E8C9A8]/20 to-[#E8A4B8]/15";
                  default:
                    return "from-[#D4AF37]/15 via-[#E8A4B8]/10 to-[#E8C9A8]/15";
                }
              };


              return (
              <div
                key={service.id}
                  data-card-id={service.id}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl border border-stone-200/80 hover:border-[#D4AF37]/50 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col min-h-[380px] magic-card"
                  style={{
                    background: hoveredCard === service.id
                      ? `linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(252, 248, 240, 0.98) 100%)`
                      : `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(252, 248, 240, 0.95) 100%)`,
                  }}
                >
                  {/* Imagen de fondo decorativa con overlay */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 scale-110 group-hover:scale-100"
                      style={{
                        backgroundImage: `url(${serviceImage})`,
                        filter: 'blur(20px)',
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient()} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                </div>

                  {/* Imagen principal del servicio */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl mb-4 group-hover:mb-6 transition-all duration-500">
                    {/* eslint-disable-next-line @next/next/no-img-element -- dynamic per-service src with an onError fallback; kept as <img> to avoid pushing every service photo through the image optimizer */}
                    <img
                      src={serviceImage}
                      alt={lang === "en" ? service.name : service.nameEs}
                      className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                    {/* Overlay con gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A0404]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Badge de categoría */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-gradient-to-r from-[#D4AF37] to-[#E8C9A8] text-[#4A0404] px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                        {service.category === "manicure" ? "💅" : service.category === "pedicure" ? "🦶" : service.category === "nailart" ? "🎨" : service.category === "acrylic" ? "✨" : "✂️"} {lang === "en" ? service.category.charAt(0).toUpperCase() + service.category.slice(1) : service.category === "manicure" ? "Manicura" : service.category === "pedicure" ? "Pedicura" : service.category === "nailart" ? "Nail Art" : service.category === "acrylic" ? "Acrílico" : "Extras"}
              </div>
          </div>

                    {/* Icono flotante animado */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                      <div className="bg-white/90 backdrop-blur-md rounded-full p-4 shadow-2xl">
                        <IconComponent className="w-10 h-10 text-[#D4AF37] animate-pulse-glow" />
                      </div>
                    </div>
                  </div>

                  {/* Efecto de brillo sutil al hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-transparent to-transparent group-hover:from-[#D4AF37]/10 group-hover:via-transparent transition-all duration-500 pointer-events-none"></div>

                  {/* Contenido - Estilo Spa de Lujo */}
                  <div className="relative z-10 flex flex-col h-full px-6 pb-6">
                    {/* Header con icono a la derecha */}
                    <div className="flex justify-end mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-[#D4AF37]/40 bg-white/80 backdrop-blur-sm group-hover:border-[#D4AF37] group-hover:bg-white transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                        <IconComponent className="w-6 h-6 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Título del servicio - Centrado y elegante */}
                    <h3 className="font-serif text-2xl md:text-3xl text-[#4A0404] mb-6 font-light tracking-wide leading-tight text-center flex-grow group-hover:text-[#D4AF37] transition-colors duration-300">
                      {lang === "en" ? service.name : service.nameEs}
                    </h3>

                    {/* Descripción decorativa */}
                    <div className="text-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-[#4A0404]/60 text-sm font-light italic">
                        {lang === "en" ? "Premium Quality Service" : "Servicio de Calidad Premium"}
                      </p>
                    </div>

                    {/* Botón de mensaje directo - Estilo Premium con gradiente */}
                    <a
                      href={CONFIG.instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="group/btn w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#4A0404] via-[#7A1F1F] to-[#4A0404] text-white rounded-full font-semibold text-sm tracking-wide hover:from-[#7A1F1F] hover:via-[#4A0404] hover:to-[#7A1F1F] transition-all duration-500 hover:shadow-xl hover:scale-105 mt-auto relative overflow-hidden"
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                      aria-label={`${lang === "en" ? "Send a direct message on Instagram about" : "Enviar mensaje directo por Instagram sobre"} ${lang === "en" ? service.name : service.nameEs}`}
                    >
                      {/* Efecto shimmer en el botón */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>

                      <Instagram className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12 relative z-10" />
                      <span className="relative z-10 font-semibold">{lang === "en" ? "Ask for Price" : "Preguntar Precio"}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300 relative z-10" />
                    </a>
                  </div>

                  {/* Partículas doradas en hover */}
                  {hoveredCard === service.id && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 animate-sparkle pointer-events-none"
                          style={{
                            top: `${20 + Math.random() * 60}%`,
                            left: `${10 + Math.random() * 80}%`,
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: `${2 + Math.random()}s`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
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
          <a
            href={CONFIG.instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#D4AF37] text-[#4A0404] px-8 py-4 rounded-full font-semibold hover:bg-white transition-all shadow-2xl"
          >
            {t.nav.book}
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

      {/* ================================================================== */}
      {/* BACK TO TOP BUTTON */}
      {/* ================================================================== */}
      {scrollY > 500 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 bg-[#4A0404]/90 text-white p-3 rounded-full shadow-2xl hover:bg-[#4A0404] hover:scale-110 transition-all z-40 backdrop-blur-sm border border-[#D4AF37]/30"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* ================================================================== */}
      {/* SCROLL PROGRESS BAR */}
      {/* ================================================================== */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#E8C9A8] to-[#D4AF37] z-50 transition-all duration-150"
        style={{
          width: `${scrollProgress}%`,
        }}
      />
    </main>
  );
}

