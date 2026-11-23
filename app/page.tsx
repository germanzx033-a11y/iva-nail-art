"use client";

import { useState, useRef, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  ChevronRight,
  Sparkles,
  Hand,
  Footprints,
  Palette,
  Scissors,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SERVICE_LANDINGS, landingPath } from "./data/serviceLandings";
import AboutIva from "@/app/components/AboutIva";
import HeroScroll from "@/app/components/HeroScroll";
import PhotoMarquee from "@/app/components/PhotoMarquee";
import WhyPrivateStudio from "./components/WhyPrivateStudio";
import DesignTools from "./components/DesignTools";
import BookingWidget, { BOOKING_ENABLED } from "./components/BookingWidget";
import BookingInfo from "@/app/components/BookingInfo";
import Reviews from "@/app/components/Reviews";
import { BackToTop, ScrollProgressBar } from "@/app/components/ScrollUi";
import GallerySection from "@/app/components/GallerySection";
import MobileBookingBar from "@/app/components/MobileBookingBar";
import CalendlyModal from "@/app/components/CalendlyModal";
import ServiceSelectorLuxury from "@/app/components/ServiceSelectorLuxury";
import LookbookFilterable from "@/app/components/LookbookFilterable";
import LocalSeoSchema from "@/app/components/LocalSeoSchema";

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

  // Render the real target value by default so it never displays as "0" during SSR or lazy paint
  return <span ref={ref}>{prefix}{end}{suffix}</span>;
}

// ============================================================================
// CONFIGURACIÓN DEL NEGOCIO
// ============================================================================
const CONFIG = {
  businessName: "IVA Nail Art",
  phone: "+1 (929) 625-7273",
  // Instagram direct messages (ig.me opens the chat; Instagram cannot pre-fill text)
  instagramDmUrl: "https://ig.me/m/iva_nailart_nyc",
  instagram: "iva_nailart_nyc",
  instagramUrl: "https://instagram.com/iva_nailart_nyc",
  tiktok: "iva_nailart_nyc",
  tiktokUrl: "https://tiktok.com/@iva_nailart_nyc",
  location: "Bay Ridge, Brooklyn, NY 11209",
  // Shown in the booking card and the footer
  hours: {
    en: [
      { days: "Mon – Fri", time: "5:30 PM – 10:00 PM" },
      { days: "Sat – Sun", time: "10:00 AM – 10:00 PM" },
    ],
    es: [
      { days: "Lun – Vie", time: "5:30 PM – 10:00 PM" },
      { days: "Sáb – Dom", time: "10:00 AM – 10:00 PM" },
    ],
  },
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
  category: string;
}


// ============================================================================
// SERVICIOS CON PRECIOS
// ============================================================================
const SERVICES: Service[] = [
  // Manicure
  { id: "m1", name: "Classic Manicure", nameEs: "Manicura Clásica", category: "manicure" },
  { id: "m2", name: "Gel Manicure", nameEs: "Manicura Gel", category: "manicure" },
  { id: "m3", name: "Builder Gel Manicure", nameEs: "Manicura Builder Gel", category: "manicure" },
  { id: "m4", name: "Structured Gel Manicure", nameEs: "Manicura Gel Estructurado", category: "manicure" },
  { id: "m5", name: "Gel-X Extensions", nameEs: "Extensiones Gel-X", category: "manicure" },
  // Pedicure
  { id: "p1", name: "Classic Pedicure", nameEs: "Pedicura Clásica", category: "pedicure" },
  { id: "p2", name: "Gel Pedicure", nameEs: "Pedicura Gel", category: "pedicure" },
  { id: "p3", name: "Builder Gel Pedicure", nameEs: "Pedicura Builder Gel", category: "pedicure" },
  { id: "p4", name: "Luxury Spa Pedicure", nameEs: "Pedicura Spa de Lujo", category: "pedicure" },
  // Acrylic
  { id: "a1", name: "Full Set Acrylic", nameEs: "Set Completo Acrílico", category: "acrylic" },
  { id: "a2", name: "Acrylic Fill", nameEs: "Relleno Acrílico", category: "acrylic" },
  { id: "a3", name: "Acrylic Removal", nameEs: "Remoción Acrílico", category: "acrylic" },
  // Nail Art
  { id: "n1", name: "Simple Nail Art (per nail)", nameEs: "Arte Simple (por uña)", category: "nailart" },
  { id: "n2", name: "Medium Design (per nail)", nameEs: "Diseño Medio (por uña)", category: "nailart" },
  { id: "n3", name: "Complex Art (per nail)", nameEs: "Arte Complejo (por uña)", category: "nailart" },
  { id: "n4", name: "Chrome / Cat Eye", nameEs: "Chrome / Ojo de Gato", category: "nailart" },
  { id: "n5", name: "French Tips", nameEs: "Puntas Francesas", category: "nailart" },
  // Extras
  { id: "e1", name: "Gel Removal", nameEs: "Remoción de Gel", category: "extras" },
  { id: "e2", name: "Nail Repair (per nail)", nameEs: "Reparación (por uña)", category: "extras" },
  { id: "e3", name: "Soak Off Only", nameEs: "Solo Remojo", category: "extras" },
];

const CATEGORIES = [
  { id: "manicure", en: "Manicure", es: "Manicura" },
  { id: "pedicure", en: "Pedicure", es: "Pedicura" },
  { id: "acrylic", en: "Acrylic", es: "Acrílico" },
  { id: "nailart", en: "Nail Art", es: "Nail Art" },
  { id: "extras", en: "Extras", es: "Extras" },
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
      cta: "Book on Instagram",
      location: "Bay Ridge, Brooklyn",
      appointment: "By Appointment Only",
    },
    about: {
      subtitle: "MEET",
      name: "Iva",
      description: "Passionate nail artist based in Brooklyn, NY. I specialize in creating stunning nail designs that make every client feel special. Each set of nails is a unique work of art, crafted with love, dedication, and premium non-toxic products.",
    },
    services: {
      subtitle: "OUR SERVICES",
      title: "Manicure, pedicure & nail art",
      note: "Prices may vary based on design complexity",
    },
    gallery: {
      subtitle: "OUR WORK",
      title: "Nail art gallery",
      description: "Real sets made by Iva in Bay Ridge. Save the one you love and send it as your inspiration.",
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
      cta: "Reserva por Instagram",
      location: "Bay Ridge, Brooklyn",
      appointment: "Solo con Cita",
    },
    about: {
      subtitle: "CONOCE A",
      name: "Iva",
      description: "Artista de uñas apasionada en Brooklyn, NY. Me especializo en crear diseños impresionantes que hacen sentir especial a cada clienta. Cada set de uñas es una obra de arte única, hecha con amor, dedicación y productos premium no tóxicos.",
    },
    services: {
      subtitle: "NUESTROS SERVICIOS",
      title: "Manicura, pedicura y nail art",
      note: "Los precios pueden variar según la complejidad del diseño",
    },
    gallery: {
      subtitle: "NUESTRO TRABAJO",
      title: "Galería de nail art",
      description: "Diseños reales hechos por Iva en Bay Ridge. Guarda el que te guste y envíalo como inspiración.",
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
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [calendlyService, setCalendlyService] = useState("");

  const openBooking = (serviceName?: string) => {
    setCalendlyService(serviceName || "");
    setIsCalendlyOpen(true);
  };

  // Pages like the try-on link back with ?lang=es
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("lang") === "es") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL once on mount (not available during SSR)
      setLang("es");
    }
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("manicure");
  const t = translations[lang];

  // Keep the page language in sync for screen readers and translation tools
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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


  return (
    <main className="min-h-screen bg-[#0E0706] relative overflow-x-clip">
      <LocalSeoSchema />
      {/* ================================================================== */}
      {/* HEADER */}
      {/* ================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0E0706]/70 backdrop-blur-md border-b border-[#F4EBE1]/10">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="font-display inline-block py-3 text-sm tracking-[0.3em] text-[#F4EBE1]">
            IVA <span className="font-light">Nail Art</span>
          </a>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 font-display text-[0.65rem] tracking-[0.25em] text-[#F4EBE1]/70">
              <a href="#services" className="inline-block py-3 hover:text-[#E8C9A8] transition-colors">
                {t.nav.services}
              </a>
              <a href="#gallery" className="inline-block py-3 hover:text-[#E8C9A8] transition-colors">
                {t.nav.gallery}
              </a>
              <a href="#locations" className="inline-block py-3 hover:text-[#E8C9A8] transition-colors">
                {lang === "en" ? "AREAS SERVED" : "ÁREAS"}
              </a>
            </div>

            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-xs font-medium text-[#F4EBE1] border border-[#F4EBE1]/30 px-3 py-1.5 rounded-full hover:bg-[#F4EBE1] hover:text-[#0E0706] transition-all"
            >
              {t.langSwitch}
            </button>

            <button
              onClick={() => openBooking()}
              className="bg-[#E8C9A8] text-[#0E0706] px-5 py-2 rounded-full text-sm font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              {t.nav.book}
            </button>
          </div>
        </nav>
      </header>

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <HeroScroll
        lang={lang}
        bookUrl={CONFIG.instagramDmUrl}
        cta={lang === "en" ? "Book Appointment" : "Reservar Cita"}
        secondaryCtaUrl="https://ig.me/m/iva_nailart_nyc"
        secondaryCtaText={lang === "en" ? "Instagram DM" : "Mensaje por Instagram"}
        onBookClick={() => openBooking()}
      />
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
      <DesignTools lang={lang} />
      <WhyPrivateStudio lang={lang} />
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
              {lang === "en" ? "Every set is quoted personally. Send Iva your idea and she confirms the price before your appointment." : "Cada diseño se cotiza de forma personalizada. Escríbele a Iva con tu idea y te confirma el precio antes de tu cita."}{" "}
              <Link
                href={lang === "en" ? "/builder-gel-bay-ridge" : "/es/builder-gel-bay-ridge"}
                className="text-[#E8C9A8] underline underline-offset-4 hover:text-white"
              >
                {lang === "en" ? "Discover builder gel" : "Descubre el builder gel"}
              </Link>
            </p>
          </div>

          {/* Category Tabs - Estilo Premium con bordes dorados sutiles */}
          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3.5 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={selectedCategory === cat.id}
                className={`px-5 md:px-7 py-2.5 rounded-full text-xs md:text-sm tracking-wider transition-all duration-300 cursor-pointer ${selectedCategory === cat.id
                  ? "bg-[#E8C9A8] text-[#0E0706] border border-[#E8C9A8] font-semibold shadow-[0_4px_25px_rgba(232,201,168,0.35)] scale-105"
                  : "bg-[#1A0F0D]/60 text-[#F4EBE1]/80 border border-[#F4EBE1]/20 hover:border-[#E8C9A8]/60 hover:text-[#E8C9A8] hover:bg-[#1A0F0D]"
                  }`}
                aria-label={`${lang === "en" ? "Filter by" : "Filtrar por"} ${lang === "en" ? cat.en : cat.es}`}
              >
                {lang === "en" ? cat.en : cat.es}
              </button>
            ))}
          </div>

          {/* Services Grid - Luxury Cards con imágenes y efectos premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredServices.map((service) => {
              // Icon mapping for services
              const getServiceIcon = () => {
                if (service.category === "manicure") return Hand;
                if (service.category === "pedicure") return Footprints;
                if (service.category === "nailart") return Palette;
                if (service.category === "acrylic") return Sparkles;
                return Scissors;
              };
              const IconComponent = getServiceIcon();

              // Curation per individual service: each service gets an exact,
              // tailored editorial photograph matching its technique and style.
              const SERVICE_EXACT_IMAGE_MAP: Record<string, string> = {
                // Manicure (Natural Nail, Russian & Builder Gel / Gel-X)
                m1: "/gallery/241c7f28-5927-40de-8e0c-0a9c468846f0.jpg", // Clean Cuticle Russian Mani Natural
                m2: "/gallery/03d9f11c-1dfb-494d-9195-eb0db1acfb1e.jpg", // Soft Blush Porcelain Gel Manicure
                m3: "/gallery/afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg", // Flawless High-Gloss Structured Builder Gel Overlay
                m4: "/gallery/f6a27073-5f54-4bdb-8fe1-736ed181a126.jpg", // Clean Rose Quartz Structured Set
                m5: "/gallery/1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg", // Champagne Glazed Soft Gel Extensions (Gel-X)
                // Pedicure
                p1: "/gallery/427a7f8e-1a34-4441-b9ca-fc60cb512ee7.jpg", // Sheer Silk Milky
                p2: "/gallery/03d9f11c-1dfb-494d-9195-eb0db1acfb1e.jpg", // Soft Blush Porcelain
                p3: "/gallery/3923d364-f716-4ba2-961d-83f75dedb613.jpg", // Bridal Opal Crystal
                p4: "/gallery/5ab8ff73-fcb2-421d-b6bf-8169824f1a52.jpg", // French Ombre Baby Boomer
                // Acrylic (Long Sculpted Sets & Hand-Crafted Acrylic Art)
                a1: "/gallery/0ee48e92-e11b-42dc-8a05-93c1aac67179.jpg", // Sculpted Stiletto Acrylic with 3D Starfish & Tortoiseshell
                a2: "/gallery/810c6eb7-e2e7-49eb-87e4-c6867d09f390.jpg", // Sculpted Almond Acrylic with Hand-Painted Lemon, Berries & Swirls
                a3: "/gallery/2b1d20c5-dd9d-45d5-85eb-da7821a34743.jpg", // Delicate Negative Space Linear Art
                // Nail Art
                n1: "/gallery/7f90a13c-e5fa-4911-9798-a038d8e5753e.jpg", // Geometric Minimal Gold Thread
                n2: "/gallery/0252121b-f561-4b19-bf43-11cdd5a1f36a.jpg", // Liquid Gold French Smile Line
                n3: "/gallery/14e8d740-b174-48d9-8c87-bddcb007ec72.jpg", // Sculpted 3D Metallic Pearl Drops
                n4: "/gallery/bff1062d-a2d4-4432-af01-0853a1a8cc82.jpg", // Cat Eye Magnetized Shimmer (Chrome / Cat Eye)
                n5: "/gallery/d9206f5a-c79f-4487-870d-a7bb5d75cef7.jpg", // Fine Line French with Pearls
                // Extras
                e1: "/gallery/5a9cfad8-1d83-41a9-adbc-5e4b6b5895e1.jpg", // Minimalist Black Onyx Micro Dots
                e2: "/gallery/c2bba6fb-d001-4658-bda3-2c78d8d59011.jpg", // Bespoke Abstract Line Play
                e3: "/gallery/fbec4b74-7503-47de-9cd8-d78bc318cc18.jpg", // Minimalist Nude with Solitary Crystal
              };

              const serviceImage =
                SERVICE_EXACT_IMAGE_MAP[service.id] ||
                "/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg";

              return (
                <article
                  key={service.id}
                  className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] transition-all duration-500 hover:border-[#E8C9A8]/60 hover:shadow-[0_20px_50px_rgba(232,201,168,0.12)] hover:-translate-y-1"
                >
                  {/* Photo container with smooth zoom on hover and subtle bottom vignette */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#140B0A]">
                    <Image
                      src={serviceImage}
                      alt={lang === "en" ? service.name : service.nameEs}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0D] via-transparent to-black/20 pointer-events-none" />
                    <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#B8864D] shadow-lg backdrop-blur-sm border border-[#E8C9A8]/30 transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <div>
                      <h3 className="font-serif text-2xl leading-tight text-[#F4EBE1]">
                        {lang === "en" ? service.name : service.nameEs}
                      </h3>
                      <p className="mt-2 text-sm text-[#F4EBE1]/70">
                        {lang === "en" ? "Personal quote by message" : "Cotización personalizada por mensaje"}
                      </p>
                      {(() => {
                        const landing = SERVICE_LANDINGS.find((l) => l.homeCategory === service.category);
                        if (!landing || (service.category === "manicure" && service.id !== "m3")) return null;
                        return (
                          <Link
                            href={landingPath(landing.slug, lang)}
                            className="mt-2 inline-block py-1 text-sm text-[#E8C9A8] underline underline-offset-4 hover:text-white"
                          >
                            {lang === "en" ? `More about ${landing.copy.en.h1Top.toLowerCase()}` : `Más sobre ${landing.copy.es.h1Top.toLowerCase()}`}
                          </Link>
                        );
                      })()}
                    </div>
                    <button
                      onClick={() => openBooking(lang === "en" ? service.name : service.nameEs)}
                      className="mt-auto flex w-full items-center justify-center gap-3 rounded-full border border-[#E8C9A8]/60 px-6 py-4 text-sm font-semibold tracking-wide text-[#E8C9A8] transition-colors hover:bg-[#E8C9A8] hover:text-[#0E0706] cursor-pointer"
                      aria-label={`${lang === "en" ? "Book appointment for" : "Reservar cita para"} ${lang === "en" ? service.name : service.nameEs}`}
                    >
                      <Sparkles className="h-4 w-4" />
                      {lang === "en" ? "Book & Get Quote" : "Reservar y Cotizar"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Interactive Luxury Service Selector & Calculator */}
          <div className="mt-20 rounded-[2.5rem] bg-[#FAF8F5] text-[#111111] p-4 sm:p-8 md:p-12 shadow-2xl border border-[#D4A574]/40">
            <ServiceSelectorLuxury
              lang={lang}
              onProceedToBooking={(summary) => {
                const serviceLabel = `${summary.service.name}${summary.addons.length ? ' + ' + summary.addons.map(a => a.name).join(', ') : ''}`;
                openBooking(serviceLabel);
              }}
            />
          </div>
        </div>
      </section>

      {BOOKING_ENABLED && <BookingWidget lang={lang} instagramUrl={CONFIG.instagramDmUrl} />}
      <BookingInfo
        lang={lang}
        bookUrl={CONFIG.instagramDmUrl}
        phone={CONFIG.phone}
        hours={CONFIG.hours[lang]}
        deposit={CONFIG.deposit}
        onBookClick={() => openBooking()}
      />
      <Reviews lang={lang} />

      {/* ================================================================== */}
      {/* GALLERY & LOOKBOOK SECTION */}
      {/* ================================================================== */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 my-16">
        <div className="rounded-[2.5rem] bg-[#FAF8F5] text-[#111111] p-4 sm:p-8 md:p-12 shadow-2xl border border-[#D4A574]/40">
          <LookbookFilterable
            lang={lang}
            onSelectStyle={(styleName) => openBooking(styleName)}
          />
        </div>
      </div>
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
          <button
            onClick={() => openBooking()}
            className="glow-pill group mt-10 cursor-pointer"
          >
            {t.hero.cta}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E0706]/25 transition-transform group-hover:rotate-45">
              <ChevronRight className="h-4 w-4" />
            </span>
          </button>
          <p className="mt-5 text-sm text-[#FDF8F5]/70">
            {lang === "en"
              ? `Replies within 1–2 hours · $${CONFIG.deposit} deposit holds your time`
              : `Respuesta en 1 a 2 horas · Depósito de $${CONFIG.deposit} para apartar tu cita`}
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* HYPERLOCAL SOUTH BROOKLYN AREAS SERVED */}
      {/* ================================================================== */}
      <section id="locations" className="border-t border-[#F4EBE1]/10 bg-[#120706] py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-display text-xs tracking-[0.35em] text-[#D4A574] uppercase mb-2">
              {lang === "en" ? "SOUTH BROOKLYN COVERAGE" : "COBERTURA EN SOUTH BROOKLYN"}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-[#F4EBE1]">
              {lang === "en" ? "Private Studio Near Your Neighborhood" : "Estudio Privado Cerca de Tu Barrio"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#F4EBE1]/70 max-w-2xl mx-auto font-light">
              {lang === "en"
                ? "Located in Bay Ridge (11209), our private studio is just 5 to 12 minutes away from neighboring South Brooklyn communities."
                : "Ubicado en Bay Ridge (11209), nuestro estudio privado está a solo 5 a 12 minutos de las comunidades vecinas del sur de Brooklyn."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Dyker Heights */}
            <div className="rounded-2xl border border-[#D4A574]/20 bg-[#170c0a] p-7 flex flex-col justify-between hover:border-[#D4A574]/50 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-[#D4A574]/15 px-3 py-1 text-xs font-semibold text-[#D4A574] border border-[#D4A574]/30">
                    ⏱ 5–8 min
                  </span>
                  <span className="text-xs text-white/50">ZIP 11228</span>
                </div>
                <h3 className="font-display text-xl font-medium text-[#F4EBE1] mb-2 group-hover:text-[#D4A574] transition-colors">
                  Dyker Heights
                </h3>
                <p className="text-xs text-[#F4EBE1]/70 leading-relaxed mb-6">
                  {lang === "en"
                    ? "Direct down 86th St or Bay Ridge Pkwy. B1 & B64 buses connect directly into Bay Ridge in minutes."
                    : "Directo por 86th St o Bay Ridge Pkwy. Autobuses B1 y B64 conectan en pocos minutos."}
                </p>
              </div>
              <a
                href={lang === "en" ? "/dyker-heights-nail-salon" : "/es/dyker-heights-nail-salon"}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A574] hover:text-white transition-colors"
              >
                <span>{lang === "en" ? "Explore Dyker Heights Guide" : "Ver Guía Dyker Heights"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Bensonhurst */}
            <div className="rounded-2xl border border-[#D4A574]/20 bg-[#170c0a] p-7 flex flex-col justify-between hover:border-[#D4A574]/50 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-[#D4A574]/15 px-3 py-1 text-xs font-semibold text-[#D4A574] border border-[#D4A574]/30">
                    ⏱ 10–12 min
                  </span>
                  <span className="text-xs text-white/50">ZIP 11214</span>
                </div>
                <h3 className="font-display text-xl font-medium text-[#F4EBE1] mb-2 group-hover:text-[#D4A574] transition-colors">
                  Bensonhurst
                </h3>
                <p className="text-xs text-[#F4EBE1]/70 leading-relaxed mb-6">
                  {lang === "en"
                    ? "Direct B1 bus on 86th St or fast drive via 75th St. Russian cuticle care & builder gel overlays."
                    : "Autobús B1 directo por 86th St o viaje rápido por 75th St. Cuidado ruso de cutículas y builder gel."}
                </p>
              </div>
              <a
                href={lang === "en" ? "/bensonhurst-nail-salon" : "/es/bensonhurst-nail-salon"}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A574] hover:text-white transition-colors"
              >
                <span>{lang === "en" ? "Explore Bensonhurst Guide" : "Ver Guía Bensonhurst"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Sunset Park */}
            <div className="rounded-2xl border border-[#D4A574]/20 bg-[#170c0a] p-7 flex flex-col justify-between hover:border-[#D4A574]/50 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-[#D4A574]/15 px-3 py-1 text-xs font-semibold text-[#D4A574] border border-[#D4A574]/30">
                    ⏱ 8–10 min
                  </span>
                  <span className="text-xs text-white/50">ZIP 11220 / 11232</span>
                </div>
                <h3 className="font-display text-xl font-medium text-[#F4EBE1] mb-2 group-hover:text-[#D4A574] transition-colors">
                  Sunset Park
                </h3>
                <p className="text-xs text-[#F4EBE1]/70 leading-relaxed mb-6">
                  {lang === "en"
                    ? "Direct R train straight down 4th Ave into Bay Ridge. Bilingual studio (EN/ES) and medical-grade hygiene."
                    : "Tren R directo hacia el sur por 4th Ave hasta Bay Ridge. Estudio bilingüe y desinfección médica."}
                </p>
              </div>
              <a
                href={lang === "en" ? "/sunset-park-nail-salon" : "/es/sunset-park-nail-salon"}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A574] hover:text-white transition-colors"
              >
                <span>{lang === "en" ? "Explore Sunset Park Guide" : "Ver Guía Sunset Park"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Park Slope */}
            <div className="rounded-2xl border border-[#D4A574]/20 bg-[#170c0a] p-7 flex flex-col justify-between hover:border-[#D4A574]/50 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-[#D4A574]/15 px-3 py-1 text-xs font-semibold text-[#D4A574] border border-[#D4A574]/30">
                    ⏱ 12–15 min
                  </span>
                  <span className="text-xs text-white/50">ZIP 11215 / 11217</span>
                </div>
                <h3 className="font-display text-xl font-medium text-[#F4EBE1] mb-2 group-hover:text-[#D4A574] transition-colors">
                  Park Slope
                </h3>
                <p className="text-xs text-[#F4EBE1]/70 leading-relaxed mb-6">
                  {lang === "en"
                    ? "Direct R train down 4th Ave with zero transfers. Unhurried 1-on-1 sanctuary away from crowded 5th/7th Ave salons."
                    : "Tren R directo por 4th Ave sin transbordos. Atelier privado 1 a 1 lejos del ruido comercial de 5th/7th Ave."}
                </p>
              </div>
              <a
                href={lang === "en" ? "/park-slope-nail-salon" : "/es/park-slope-nail-salon"}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A574] hover:text-white transition-colors"
              >
                <span>{lang === "en" ? "Explore Park Slope Guide" : "Ver Guía Park Slope"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Fort Hamilton */}
            <div className="rounded-2xl border border-[#D4A574]/20 bg-[#170c0a] p-7 flex flex-col justify-between hover:border-[#D4A574]/50 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-[#D4A574]/15 px-3 py-1 text-xs font-semibold text-[#D4A574] border border-[#D4A574]/30">
                    ⏱ 3–5 min
                  </span>
                  <span className="text-xs text-white/50">ZIP 11209 / 11252</span>
                </div>
                <h3 className="font-display text-xl font-medium text-[#F4EBE1] mb-2 group-hover:text-[#D4A574] transition-colors">
                  Fort Hamilton
                </h3>
                <p className="text-xs text-[#F4EBE1]/70 leading-relaxed mb-6">
                  {lang === "en"
                    ? "Immediate neighborhood neighbor via Fort Hamilton Pkwy or B16/B63. 4-week builder gel & pristine Russian manicures."
                    : "Vecinas inmediatas por Fort Hamilton Pkwy o buses B16/B63. Builder gel con 4 semanas de duración y manicura rusa."}
                </p>
              </div>
              <a
                href={lang === "en" ? "/fort-hamilton-nail-salon" : "/es/fort-hamilton-nail-salon"}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A574] hover:text-white transition-colors"
              >
                <span>{lang === "en" ? "Explore Fort Hamilton Guide" : "Ver Guía Fort Hamilton"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Bath Beach & Gravesend */}
            <div className="rounded-2xl border border-[#D4A574]/20 bg-[#170c0a] p-7 flex flex-col justify-between hover:border-[#D4A574]/50 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-[#D4A574]/15 px-3 py-1 text-xs font-semibold text-[#D4A574] border border-[#D4A574]/30">
                    ⏱ 8–10 min
                  </span>
                  <span className="text-xs text-white/50">ZIP 11214 / 11223</span>
                </div>
                <h3 className="font-display text-xl font-medium text-[#F4EBE1] mb-2 group-hover:text-[#D4A574] transition-colors">
                  Bath Beach & Gravesend
                </h3>
                <p className="text-xs text-[#F4EBE1]/70 leading-relaxed mb-6">
                  {lang === "en"
                    ? "Direct B1 bus down 86th St or fast drive via Cropsey Ave. Bespoke editorial nail art and strengthening overlays."
                    : "Bus B1 directo por 86th St o viaje rápido por Cropsey Ave. Nail art editorial a mano y refuerzo estructural."}
                </p>
              </div>
              <a
                href={lang === "en" ? "/bath-beach-nail-salon" : "/es/bath-beach-nail-salon"}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A574] hover:text-white transition-colors"
              >
                <span>{lang === "en" ? "Explore Bath Beach Guide" : "Ver Guía Bath Beach"}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
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
              <ul className="space-y-1 text-sm text-white/60">
                {CONFIG.hours[lang].map((h) => (
                  <li key={h.days}>
                    <span className="text-white/80">{h.days}</span> · {h.time}
                  </li>
                ))}
              </ul>
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
              <a href={`tel:${CONFIG.phone.replace(/[^\d+]/g, "")}`} className="inline-block py-2 text-white/70 text-sm hover:text-[#D4AF37]">{CONFIG.phone}</a>
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

          {/* Areas Served & Core Services Links for Local SEO */}
          <div className="border-t-2 border-white/20 pt-8 pb-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
              {lang === "en" ? "Areas Served in South Brooklyn" : "Áreas que Atendemos en South Brooklyn"}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/80 mb-6">
              <a
                href={lang === "en" ? "/dyker-heights-nail-salon" : "/es/dyker-heights-nail-salon"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Dyker Heights (11228)" : "Dyker Heights (11228)"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/bensonhurst-nail-salon" : "/es/bensonhurst-nail-salon"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Bensonhurst (11214)" : "Bensonhurst (11214)"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/sunset-park-nail-salon" : "/es/sunset-park-nail-salon"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Sunset Park (11220/11232)" : "Sunset Park (11220/11232)"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/park-slope-nail-salon" : "/es/park-slope-nail-salon"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Park Slope (11215/11217)" : "Park Slope (11215/11217)"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/fort-hamilton-nail-salon" : "/es/fort-hamilton-nail-salon"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Fort Hamilton (11209/11252)" : "Fort Hamilton (11209/11252)"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/bath-beach-nail-salon" : "/es/bath-beach-nail-salon"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Bath Beach (11214/11223)" : "Bath Beach (11214/11223)"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/builder-gel-bay-ridge" : "/es/builder-gel-bay-ridge"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Bay Ridge Flagship (11209)" : "Estudio Bay Ridge (11209)"}
              </a>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
              {lang === "en" ? "Signature Treatments" : "Tratamientos Exclusivos"}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/80 mb-6">
              <a
                href={lang === "en" ? "/builder-gel-bay-ridge" : "/es/builder-gel-bay-ridge"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Builder Gel" : "Builder Gel"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/nail-art-bay-ridge" : "/es/nail-art-bay-ridge"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Custom Nail Art" : "Nail Art a Mano"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/acrylic-nails-bay-ridge" : "/es/acrylic-nails-bay-ridge"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Acrylic Extensions" : "Uñas Acrílicas"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/pedicure-bay-ridge" : "/es/pedicure-bay-ridge"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Spa Gel Pedicure" : "Pedicura en Seco"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/bridal-nails-brooklyn" : "/es/bridal-nails-brooklyn"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Bridal & Wedding" : "Uñas de Novia"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/winter-collection" : "/es/winter-collection"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "Winter Lookbook" : "Colección Invierno"}
              </a>
              <span className="text-white/30 hidden sm:inline">·</span>
              <a
                href={lang === "en" ? "/vip-club" : "/es/vip-club"}
                className="underline-offset-4 hover:text-[#D4AF37] hover:underline"
              >
                {lang === "en" ? "VIP Loyalty Pass" : "Club VIP Digital"}
              </a>
            </div>

            <p className="text-white/70 text-sm font-medium">
              © {new Date().getFullYear()} IVA Nail Art · Official Instagram: <a href="https://instagram.com/iva_nailart_nyc" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">@iva_nailart_nyc</a>
            </p>
            <p className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-white/70">
              <a href="/privacy" className="inline-block py-2 underline-offset-4 hover:text-[#D4AF37] hover:underline">
                {lang === "en" ? "Privacy Policy" : "Privacidad"}
              </a>
              <a href="/terms" className="inline-block py-2 underline-offset-4 hover:text-[#D4AF37] hover:underline">
                {lang === "en" ? "Terms & Conditions" : "Términos y Condiciones"}
              </a>
              <a href={lang === "en" ? "/aftercare" : "/es/aftercare"} className="inline-block py-2 underline-offset-4 hover:text-[#D4AF37] hover:underline">
                {lang === "en" ? "Aftercare" : "Cuidados"}
              </a>
              <a href={lang === "en" ? "/qr-review" : "/es/qr-review"} className="inline-block py-2 underline-offset-4 hover:text-[#D4AF37] hover:underline">
                {lang === "en" ? "Reviews" : "Reseñas"}
              </a>
              <a href={lang === "en" ? "/gift-card" : "/gift-card?lang=es"} className="inline-block py-2 underline-offset-4 hover:text-[#D4AF37] hover:underline">
                {lang === "en" ? "Gift card" : "Tarjeta de regalo"}
              </a>
            </p>
            <p className="text-white/50 text-xs mt-2">
              {lang === "en" ? "Private Studio in Bay Ridge, Brooklyn (11209) · By Appointment Only" : "Estudio Privado en Bay Ridge, Brooklyn (11209) · Solo con Cita"}
            </p>
          </div>
        </div>
      </footer>

      {/* ================================================================== */}
      {/* FLOATING INSTAGRAM DM BUTTON */}
      {/* ================================================================== */}
      <a
        href={CONFIG.instagramDmUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:brightness-110 hover:scale-110 transition-all z-40 group"
        aria-label={lang === "en" ? "Message us on Instagram" : "Escríbenos por Instagram"}
      >
        <Instagram className="w-6 h-6 md:w-7 md:h-7" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#4A0404] text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          {t.floatingBtn}
        </span>
      </a>

      <BackToTop />
      <ScrollProgressBar />
      <MobileBookingBar lang={lang} onBookClick={() => openBooking()} />

      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        lang={lang}
        prefilledService={calendlyService}
      />
    </main>
  );
}

