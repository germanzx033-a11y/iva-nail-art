"use client";

import { useState, useRef, useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AboutIva from "@/app/components/AboutIva";
import HeroScroll from "@/app/components/HeroScroll";
import PhotoMarquee from "@/app/components/PhotoMarquee";
import WhyPrivateStudio from "@/app/components/WhyPrivateStudio";
import DesignTools from "@/app/components/DesignTools";
import BookingInfo from "@/app/components/BookingInfo";
import Reviews from "@/app/components/Reviews";
import { BackToTop, ScrollProgressBar } from "@/app/components/ScrollUi";
import LookbookFilterable from "@/app/components/LookbookFilterable";
import ServiceSelectorLuxury from "@/app/components/ServiceSelectorLuxury";
import MobileBookingBar from "@/app/components/MobileBookingBar";
import NailConcierge from "@/app/components/NailConcierge";

// High-performance direct-DOM Animated Counter (Zero lag / Zero re-renders)
function AnimatedCounter({
  end,
  duration = 1600,
  suffix = "",
  prefix = "",
}: {
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

// Studio Business Configuration
const CONFIG = {
  businessName: "IVA Nail Art NY",
  domain: "ivanailartny.com",
  phone: "+1 (929) 625-7273",
  whatsappNumber: "19296257273",
  instagram: "aureate_sole",
  instagramUrl: "https://www.instagram.com/aureate_sole",
  instagramDmUrl: "https://ig.me/m/iva_nailart_nyc",
  tiktok: "aureate_sole",
  tiktokUrl: "https://www.tiktok.com/@aureate_sole",
  location: "Bay Ridge, Brooklyn, NY 11209",
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

// Bilingual Translations
const translations = {
  en: {
    nav: {
      services: "Services",
      lookbook: "Lookbook",
      concierge: "AI Concierge",
      tryOn: "Virtual Try-On",
      reviews: "Reviews",
      book: "Book Appointment",
    },
    hero: {
      welcome: "WELCOME TO",
      tagline: "Where every nail tells a story of elegance and artistry. Expert in unique designs that reflect your personality and enhance your natural beauty.",
      cta: "Book on Instagram",
      location: "Bay Ridge, Brooklyn",
      appointment: "By Appointment Only · Max 3 Daily",
    },
    footer: {
      tagline: "Exclusive private nail studio in Brooklyn. Medical-grade sterilization, structured gel & bespoke editorial nail art.",
      hours: "Studio Hours",
      location: "Location",
      followUs: "Follow Atelier",
      contact: "Direct Concierge",
    },
    floatingBtn: "Message Atelier",
    langSwitch: "ES",
  },
  es: {
    nav: {
      services: "Servicios",
      lookbook: "Lookbook",
      concierge: "Estilista IA",
      tryOn: "Probador Virtual",
      reviews: "Reseñas",
      book: "Reservar Cita",
    },
    hero: {
      welcome: "BIENVENIDA A",
      tagline: "Donde cada uña cuenta una historia de elegancia y arte. Experta en diseños únicos que reflejan tu personalidad y realzan tu belleza natural.",
      cta: "Reserva por Instagram",
      location: "Bay Ridge, Brooklyn",
      appointment: "Solo con Cita · Máximo 3 al Día",
    },
    footer: {
      tagline: "Estudio privado exclusivo en Brooklyn. Esterilización de grado médico, gel estructurado y arte de uñas de alta costura.",
      hours: "Horarios",
      location: "Ubicación",
      followUs: "Seguir Atelier",
      contact: "Contacto Directo",
    },
    floatingBtn: "Escríbenos",
    langSwitch: "EN",
  },
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("lang") === "es") {
      setLang("es");
    }
  }, []);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#111111] relative overflow-x-clip selection:bg-[#C5A059]/20 selection:text-[#111111]">
      {/* ================================================================== */}
      {/* LUXURY EDITORIAL HEADER */}
      {/* ================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/85 backdrop-blur-md border-b border-[#111111]/8">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          <a href="#" className="font-serif tracking-widest text-base sm:text-lg text-[#111111] uppercase font-medium">
            IVA <span className="font-light text-[#C5A059]">Atelier NY</span>
          </a>

          <div className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-medium text-[#4A4A4A]">
            <a href="#services" className="hover:text-[#C5A059] transition-colors">{t.nav.services}</a>
            <a href="#lookbook" className="hover:text-[#C5A059] transition-colors">{t.nav.lookbook}</a>
            <a href="#ai-concierge" className="hover:text-[#C5A059] transition-colors">{t.nav.concierge}</a>
            <Link href="/try-on" className="hover:text-[#C5A059] transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              {t.nav.tryOn}
            </Link>
            <a href="#reviews" className="hover:text-[#C5A059] transition-colors">{t.nav.reviews}</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-xs font-medium text-[#111111] border border-stone-300 px-3 py-1.5 rounded-full hover:bg-[#111111] hover:text-[#FAF8F5] transition-all"
              aria-label="Toggle language"
            >
              {t.langSwitch}
            </button>

            <a
              href="#booking-calculator"
              className="bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] px-4 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-colors shadow-sm"
            >
              {t.nav.book}
            </a>
          </div>
        </nav>
      </header>

      {/* ================================================================== */}
      {/* 1. CINEMATIC SCROLL HERO */}
      {/* ================================================================== */}
      <div className="pt-16">
        <HeroScroll lang={lang} bookUrl={CONFIG.instagramDmUrl} cta={t.hero.cta} />
      </div>

      {/* ================================================================== */}
      {/* 2. PHOTO MARQUEE (DRIFTING PORTFOLIO SETS) */}
      {/* ================================================================== */}
      <PhotoMarquee lang={lang} />

      {/* ================================================================== */}
      {/* 3. TRUST & PERFORMANCE STATISTICS */}
      {/* ================================================================== */}
      <section className="bg-white border-y border-stone-200/80 px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-stone-200">
          {[
            { end: 10, suffix: "+", en: "Years of Mastery", es: "Años de Maestría" },
            { end: 500, suffix: "+", en: "Private Clients", es: "Clientas Exclusivas" },
            { end: 3, suffix: " max", en: "Appointments / Day", es: "Citas por Día" },
            { end: 100, suffix: "%", en: "Hospital-Grade Hygiene", es: "Higiene Hospitalaria" },
          ].map((stat) => (
            <div key={stat.en} className="px-3 text-center md:px-8 md:text-left">
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-semibold">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#C5A059]">
                {lang === "en" ? stat.en : stat.es}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. INTERACTIVE DESIGN TOOLS BANNER (Try-On, Match, Gift Cards) */}
      {/* ================================================================== */}
      <DesignTools lang={lang} />

      {/* ================================================================== */}
      {/* 5. WHY PRIVATE STUDIO (SANCTUARY VS COMMERCIAL SALON) */}
      {/* ================================================================== */}
      <WhyPrivateStudio lang={lang} />

      {/* ================================================================== */}
      {/* 6. MEET THE MASTER ARTIST (ABOUT IVA) */}
      {/* ================================================================== */}
      <AboutIva language={lang} />

      {/* ================================================================== */}
      {/* 7. CURATED EDITORIAL LOOKBOOK (STYLE FILTERABLE) */}
      {/* ================================================================== */}
      <LookbookFilterable lang={lang} />

      {/* ================================================================== */}
      {/* 8. HAUTE AI NAIL CONCIERGE (BESPOKE STYLING CONSULTATION) */}
      {/* ================================================================== */}
      <NailConcierge lang={lang} />

      {/* ================================================================== */}
      {/* 9. LUXURY SERVICE CALCULATOR (TRANSPARENT PRICING & DEPOSIT) */}
      {/* ================================================================== */}
      <div id="services">
        <ServiceSelectorLuxury lang={lang} />
      </div>

      {/* ================================================================== */}
      {/* 10. BOOKING INFO & FAQ (POLICIES & LOCATION) */}
      {/* ================================================================== */}
      <BookingInfo
        lang={lang}
        bookUrl={CONFIG.instagramDmUrl}
        phone={CONFIG.phone}
        hours={CONFIG.hours[lang]}
        deposit={CONFIG.deposit}
      />

      {/* ================================================================== */}
      {/* 11. REPUTATION & CLIENT REVIEWS */}
      {/* ================================================================== */}
      <div id="reviews">
        <Reviews lang={lang} />
      </div>

      {/* ================================================================== */}
      {/* 12. CLOSING EDITORIAL CTA */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#111111] px-6 py-20 md:px-10 md:py-28 text-white">
        <Image
          src="/gallery/aurora-chrome-gold.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#111111]/60" />
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059]">
            {lang === "en" ? "By Appointment Only · Brooklyn, NY" : "Solo con Cita · Brooklyn, NY"}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.1] text-[#FAF8F5] mb-6">
            <span className="block font-light italic">{lang === "en" ? "Your Next Masterpiece" : "Tu Próxima Creación"}</span>
            <span className="font-normal text-[#EAD8B1]">{lang === "en" ? "Begins in the Atelier" : "Comienza en el Atelier"}</span>
          </h2>
          <p className="text-sm md:text-base text-stone-300 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            {lang === "en"
              ? "Send a photo of your desired aesthetic, reserve your dedicated 3 to 4-hour session with a $35 deposit, and experience private luxury nail care."
              : "Envía una foto de tu diseño favorito, asegura tu bloque exclusivo de 3 a 4 horas con un depósito de $35 y vive una experiencia de manicura de lujo."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#booking-calculator"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C5A059] hover:bg-[#EAD8B1] text-[#111111] text-xs uppercase tracking-widest font-semibold transition-all shadow-xl"
            >
              {lang === "en" ? "Design & Book Session" : "Diseñar y Reservar Cita"}
            </a>
            <a
              href={CONFIG.instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-stone-400 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-semibold transition-all"
            >
              <Instagram className="w-4 h-4 inline mr-2 text-[#C5A059]" />
              {lang === "en" ? "Direct DM @aureate_sole" : "Mensaje Directo"}
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 13. EDITORIAL FOOTER */}
      {/* ================================================================== */}
      <footer className="bg-[#FAF8F5] text-[#111111] border-t border-stone-200 py-16 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="font-serif text-2xl uppercase tracking-widest mb-3 font-semibold">
                IVA <span className="font-light text-[#C5A059]">Atelier</span>
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed mb-4">
                {t.footer.tagline}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-[#C5A059] font-medium">
                Brooklyn, NY · Private Sanctuary
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] mb-4 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                {t.footer.hours}
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {CONFIG.hours[lang].map((h) => (
                  <li key={h.days}>
                    <span className="font-medium text-[#111111]">{h.days}:</span> {h.time}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-[#C5A059] mt-2 font-medium">Strictly by appointment</p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] mb-4 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                {t.footer.location}
              </h4>
              <p className="text-xs text-stone-600 mb-2">{CONFIG.location}</p>
              <p className="text-[11px] text-stone-500">Private studio details provided upon deposit confirmation.</p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111] mb-4 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                {t.footer.contact}
              </h4>
              <a href={`tel:${CONFIG.phone.replace(/[^\d+]/g, "")}`} className="text-xs text-stone-700 hover:text-[#C5A059] block mb-3 font-medium">
                {CONFIG.phone}
              </a>
              <div className="flex gap-3">
                <a
                  href={CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-stone-300 hover:border-[#C5A059] text-stone-700 hover:text-[#C5A059] transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={CONFIG.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-stone-300 hover:border-[#C5A059] text-stone-700 hover:text-[#C5A059] transition-all"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-200/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>© {new Date().getFullYear()} IVA Nail Art NY. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-stone-600">
              <Link href="/try-on" className="hover:text-[#C5A059]">{lang === "en" ? "Virtual Try-On" : "Probador Virtual"}</Link>
              <Link href="/nail-match" className="hover:text-[#C5A059]">{lang === "en" ? "Nail Match" : "Quiz de Estilo"}</Link>
              <Link href="/gift-card" className="hover:text-[#C5A059]">{lang === "en" ? "Gift Cards" : "Tarjetas de Regalo"}</Link>
              <Link href="/aftercare" className="hover:text-[#C5A059]">{lang === "en" ? "Aftercare Guide" : "Cuidados Posteriores"}</Link>
              <Link href="/privacy" className="hover:text-[#C5A059]">{lang === "en" ? "Privacy" : "Privacidad"}</Link>
              <Link href="/terms" className="hover:text-[#C5A059]">{lang === "en" ? "Terms" : "Términos"}</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ================================================================== */}
      {/* 14. MOBILE STICKY ACTION BAR & FLOATING ELEMENTS */}
      {/* ================================================================== */}
      <MobileBookingBar lang={lang} />
      <BackToTop />
      <ScrollProgressBar />
    </main>
  );
}
