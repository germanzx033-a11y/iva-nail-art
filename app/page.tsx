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
import AboutIva from "@/app/components/AboutIva";
import HeroScroll from "@/app/components/HeroScroll";
import PhotoMarquee from "@/app/components/PhotoMarquee";
import BookingInfo from "@/app/components/BookingInfo";
import Reviews from "@/app/components/Reviews";
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
  instagramDmUrl: "https://ig.me/m/iva_nailart_nyc",
  instagram: "iva_nailart_nyc",
  instagramUrl: "https://instagram.com/iva_nailart_nyc",
  tiktok: "iva_nailart_ny",
  tiktokUrl: "https://tiktok.com/@iva_nailart_ny",
  location: "Bay Ridge, Brooklyn, NY 11209",
  // Shown in the booking card and the footer
  hours: {
    en: [
      { days: "Mon – Fri", time: "5:30 PM – 10:00 PM" },
      { days: "Sat – Sun", time: "All day" },
    ],
    es: [
      { days: "Lun – Vie", time: "5:30 PM – 10:00 PM" },
      { days: "Sáb – Dom", time: "Todo el día" },
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
  price: number;
  priceMax?: number;
  /** No guide price: the price is given on request */
  onRequest?: boolean;
  category: string;
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
  { id: "m5", name: "Gel-X Extensions", nameEs: "Extensiones Gel-X", price: 0, onRequest: true, category: "manicure" },
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
              {lang === "en" ? "Guide prices. The final total is confirmed by length, removal and level of nail art." : "Precios orientativos. El total final se confirma según el largo, el retiro y el nivel de nail art."}
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
                    <div>
                      <h3 className="font-serif text-2xl leading-tight text-[#F4EBE1]">
                        {lang === "en" ? service.name : service.nameEs}
                      </h3>
                      {service.onRequest ? (
                        <p className="mt-2 text-sm text-[#F4EBE1]/70">
                          <span className="font-display text-lg text-[#E8C9A8]">{lang === "en" ? "Price on request" : "Precio a consultar"}</span>
                        </p>
                      ) : (
                        <p className="mt-2 text-sm text-[#F4EBE1]/70">
                          {lang === "en" ? "From " : "Desde "}
                          <span className="font-display text-lg text-[#E8C9A8]">${service.price}</span>
                          {service.priceMax ? <span className="text-[#F4EBE1]/70"> – ${service.priceMax}</span> : null}
                          <span className="ml-2 text-xs text-[#F4EBE1]/60">{lang === "en" ? "guide price" : "precio orientativo"}</span>
                        </p>
                      )}
                    </div>
                    <a
                      href={CONFIG.instagramDmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex w-full items-center justify-center gap-3 rounded-full border border-[#E8C9A8]/60 px-6 py-4 text-sm font-semibold tracking-wide text-[#E8C9A8] transition-colors hover:bg-[#E8C9A8] hover:text-[#0E0706]"
                      aria-label={`${lang === "en" ? "Send a direct message on Instagram about" : "Enviar mensaje directo por Instagram sobre"} ${lang === "en" ? service.name : service.nameEs}`}
                    >
                      <Instagram className="h-5 w-5" />
                      {lang === "en" ? "Get my quote" : "Pedir mi cotización"}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <BookingInfo lang={lang} bookUrl={CONFIG.instagramDmUrl} phone={CONFIG.phone} hours={CONFIG.hours[lang]} deposit={CONFIG.deposit} />
      <Reviews lang={lang} />

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
              <a href={`tel:${CONFIG.phone.replace(/[^\d+]/g, "")}`} className="text-white/70 text-sm hover:text-[#D4AF37]">{CONFIG.phone}</a>
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
              © {new Date().getFullYear()} IVA Nail Art. {lang === "en" ? "All rights reserved." : "Todos los derechos reservados."}
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

