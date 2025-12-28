"use client";

/**
 * IVA Nail Art - Multi-language System
 * Complete English/Spanish support with auto-detection
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "es";

interface Translations {
  [key: string]: {
    en: string;
    es: string;
  };
}

// Complete translations for the entire app
export const translations: Translations = {
  // Navigation
  "nav.services": { en: "Services", es: "Servicios" },
  "nav.gallery": { en: "Gallery", es: "Galería" },
  "nav.about": { en: "About", es: "Nosotros" },
  "nav.reviews": { en: "Reviews", es: "Reseñas" },
  "nav.shop": { en: "Shop", es: "Tienda" },
  "nav.blog": { en: "Blog", es: "Blog" },
  "nav.book": { en: "Book Now", es: "Reservar" },

  // Hero Section
  "hero.tagline": { en: "LUXURY NAIL ART • BROOKLYN", es: "ARTE EN UÑAS DE LUJO • BROOKLYN" },
  "hero.title": { en: "Where Art Meets", es: "Donde el Arte" },
  "hero.title2": { en: "Elegance", es: "Encuentra la Elegancia" },
  "hero.description": {
    en: "Experience the artistry of handcrafted nail designs in our serene Brooklyn sanctuary. Non-toxic, pregnancy-safe products for the conscious beauty enthusiast.",
    es: "Experimenta el arte de diseños de uñas hechos a mano en nuestro sereno santuario de Brooklyn. Productos no tóxicos y seguros para el embarazo."
  },
  "hero.cta.book": { en: "Book Your Experience", es: "Reserva tu Experiencia" },
  "hero.cta.gallery": { en: "View Gallery", es: "Ver Galería" },

  // About Section
  "about.tagline": { en: "THE IVA DIFFERENCE", es: "LA DIFERENCIA IVA" },
  "about.title": { en: "Artistry in Every Detail", es: "Arte en Cada Detalle" },
  "about.description": {
    en: "At IVA Nail Art, we believe your nails are a canvas for self-expression. Our intimate Brooklyn studio offers a sanctuary where luxury meets consciousness—featuring premium, non-toxic products safe for expecting mothers.",
    es: "En IVA Nail Art, creemos que tus uñas son un lienzo para la autoexpresión. Nuestro íntimo estudio de Brooklyn ofrece un santuario donde el lujo se encuentra con la consciencia—con productos premium no tóxicos seguros para futuras mamás."
  },
  "about.feature1.title": { en: "Non-Toxic Excellence", es: "Excelencia No Tóxica" },
  "about.feature1.desc": { en: "Premium 10-free formulas safe for pregnancy", es: "Fórmulas premium 10-free seguras para el embarazo" },
  "about.feature2.title": { en: "Custom Artistry", es: "Arte Personalizado" },
  "about.feature2.desc": { en: "Bespoke designs tailored to your vision", es: "Diseños a medida adaptados a tu visión" },
  "about.feature3.title": { en: "Relaxing Ambiance", es: "Ambiente Relajante" },
  "about.feature3.desc": { en: "HEPA-filtered air in a serene setting", es: "Aire filtrado HEPA en un entorno sereno" },

  // Services Section
  "services.tagline": { en: "OUR SERVICES", es: "NUESTROS SERVICIOS" },
  "services.title": { en: "Signature Experiences", es: "Experiencias Exclusivas" },
  "services.book": { en: "Book Now", es: "Reservar" },
  "services.from": { en: "From", es: "Desde" },

  // Gallery Section
  "gallery.tagline": { en: "OUR PORTFOLIO", es: "NUESTRO PORTAFOLIO" },
  "gallery.title": { en: "Nail Art Gallery", es: "Galería de Arte en Uñas" },
  "gallery.filter.all": { en: "All", es: "Todos" },
  "gallery.search.placeholder": { en: "Search by color, style, or mood...", es: "Buscar por color, estilo o ambiente..." },
  "gallery.search.ai": { en: "AI Search", es: "Búsqueda IA" },

  // Reviews Section
  "reviews.tagline": { en: "TESTIMONIALS", es: "TESTIMONIOS" },
  "reviews.title": { en: "What Our Clients Say", es: "Lo Que Dicen Nuestros Clientes" },
  "reviews.view": { en: "View all reviews on Google", es: "Ver todas las reseñas en Google" },

  // Shop Section
  "shop.tagline": { en: "NAIL CARE PRODUCTS", es: "PRODUCTOS PARA UÑAS" },
  "shop.title": { en: "IVA Curated Shop", es: "Tienda Curada IVA" },
  "shop.cart": { en: "Cart", es: "Carrito" },
  "shop.addToCart": { en: "Add to Cart", es: "Agregar" },
  "shop.checkout": { en: "Checkout via WhatsApp", es: "Pagar por WhatsApp" },

  // Blog Section
  "blog.tagline": { en: "NAIL TIPS & TRENDS", es: "CONSEJOS Y TENDENCIAS" },
  "blog.title": { en: "The IVA Journal", es: "El Diario IVA" },
  "blog.readMore": { en: "Read More", es: "Leer Más" },
  "blog.minRead": { en: "min read", es: "min lectura" },

  // Contact/Booking
  "contact.tagline": { en: "BOOK YOUR VISIT", es: "RESERVA TU VISITA" },
  "contact.title": { en: "Begin Your Journey", es: "Comienza tu Experiencia" },
  "contact.subtitle": {
    en: "Ready to experience the IVA difference? Book your appointment today.",
    es: "¿Lista para experimentar la diferencia IVA? Reserva tu cita hoy."
  },
  "contact.book": { en: "Book via WhatsApp", es: "Reservar por WhatsApp" },
  "contact.call": { en: "Call Us", es: "Llámanos" },

  // Footer
  "footer.hours": { en: "Hours", es: "Horario" },
  "footer.location": { en: "Location", es: "Ubicación" },
  "footer.follow": { en: "Follow Us", es: "Síguenos" },
  "footer.rights": { en: "All rights reserved", es: "Todos los derechos reservados" },

  // Chat
  "chat.title": { en: "IVA Assistant", es: "Asistente IVA" },
  "chat.welcome": { en: "Hi! How can I help you today?", es: "¡Hola! ¿Cómo puedo ayudarte hoy?" },
  "chat.placeholder": { en: "Type your message...", es: "Escribe tu mensaje..." },
  "chat.send": { en: "Send", es: "Enviar" },

  // Client Dashboard
  "dashboard.title": { en: "My Account", es: "Mi Cuenta" },
  "dashboard.appointments": { en: "Appointments", es: "Citas" },
  "dashboard.loyalty": { en: "Loyalty Points", es: "Puntos de Lealtad" },
  "dashboard.favorites": { en: "Saved Designs", es: "Diseños Guardados" },
  "dashboard.reviews": { en: "My Reviews", es: "Mis Reseñas" },

  // Common
  "common.loading": { en: "Loading...", es: "Cargando..." },
  "common.error": { en: "Something went wrong", es: "Algo salió mal" },
  "common.close": { en: "Close", es: "Cerrar" },
  "common.save": { en: "Save", es: "Guardar" },
  "common.cancel": { en: "Cancel", es: "Cancelar" },
  "common.submit": { en: "Submit", es: "Enviar" },
  "common.viewAll": { en: "View All", es: "Ver Todo" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isSpanish: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Auto-detect language on mount
  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem("iva-language") as Language;
    if (saved && (saved === "en" || saved === "es")) {
      setLanguageState(saved);
      return;
    }

    // Auto-detect from browser
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("es")) {
      setLanguageState("es");
      localStorage.setItem("iva-language", "es");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("iva-language", lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isSpanish: language === "es",
        isEnglish: language === "en",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Language Switcher Component
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 text-xs font-medium rounded transition-all ${
          language === "en"
            ? "bg-[#722F37] text-white"
            : "text-[#7A7A7A] hover:text-[#1A1A1A]"
        }`}
      >
        EN
      </button>
      <span className="text-[#D4D0C8]">|</span>
      <button
        onClick={() => setLanguage("es")}
        className={`px-2 py-1 text-xs font-medium rounded transition-all ${
          language === "es"
            ? "bg-[#722F37] text-white"
            : "text-[#7A7A7A] hover:text-[#1A1A1A]"
        }`}
      >
        ES
      </button>
    </div>
  );
}
