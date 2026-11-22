"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  MapPin,
  Clock,
  Car,
  Train,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Phone,
} from "lucide-react";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { GALLERY_IMAGES } from "@/app/data/galleryData";
import {
  getHyperlocal,
  hyperlocalPath,
  HYPERLOCAL_LANDINGS,
  type Lang,
} from "@/app/data/hyperlocalLandings";
import CalendlyModal from "@/app/components/CalendlyModal";
import MobileBookingBar from "@/app/components/MobileBookingBar";

function generateSchemaJsonLd(slug: string, lang: Lang) {
  const item = getHyperlocal(slug);
  const c = item.copy[lang];
  const url = `${SITE_URL}${hyperlocalPath(slug, lang)}`;

  const areasServedList = [
    {
      "@type": "Place",
      name: `${item.neighborhoodEn}, Brooklyn, NY`,
    },
    ...item.zipCodes.map((zip) => ({
      "@type": "PostalCode",
      postalCode: zip,
    })),
    {
      "@type": "Place",
      name: "Bay Ridge, Brooklyn, NY",
    },
    {
      "@type": "PostalCode",
      postalCode: "11209",
    },
    {
      "@type": "City",
      name: "Brooklyn",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["NailSalon", "BeautySalon"],
        "@id": `${url}#nailsalon`,
        name: "IVA Nail Art NY",
        alternateName: `IVA Nail Art — Luxury Studio near ${item.neighborhoodEn}`,
        description: c.metaDescription,
        url: url,
        telephone: "+1-929-625-7273",
        priceRange: "$$",
        image: `${SITE_URL}/og-image.jpg`,
        logo: `${SITE_URL}/icon-512.png`,
        founder: {
          "@type": "Person",
          name: "Ivannía Rodríguez",
          jobTitle: "Master Nail Artist",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bay Ridge, Brooklyn",
          addressRegion: "NY",
          postalCode: "11209",
          addressCountry: "US",
        },
        areaServed: areasServedList,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "17:30",
            closes: "22:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday", "Sunday"],
            opens: "10:00",
            closes: "22:00",
          },
        ],
        sameAs: [
          "https://instagram.com/iva_nailart_nyc",
          "https://tiktok.com/@iva_nailart_nyc",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: c.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: lang === "en" ? "Home" : "Inicio",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `${item.neighborhoodEn} Nail Studio`,
            item: url,
          },
        ],
      },
    ],
  };
}

export default function HyperlocalLandingPage({
  slug,
  lang,
}: {
  slug: string;
  lang: Lang;
}) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Builder Gel Manicure");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const landing = getHyperlocal(slug);
  const c = landing.copy[lang];
  const otherLang: Lang = lang === "en" ? "es" : "en";
  const otherPath = hyperlocalPath(slug, otherLang);
  const photos = GALLERY_IMAGES.slice(landing.photoOffset, landing.photoOffset + 6);
  const otherNeighborhoods = HYPERLOCAL_LANDINGS.filter((l) => l.slug !== slug);

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsCalendlyOpen(true);
  };

  return (
    <main lang={lang} className="min-h-screen bg-[#0E0706] text-[#F4EBE1] selection:bg-[#D4A574]/30 selection:text-[#F4EBE1]">
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSchemaJsonLd(slug, lang)).replace(/</g, "\\u003c"),
        }}
      />

      {/* Top Luxury Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#F4EBE1]/10 bg-[#0E0706]/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 md:px-10">
          <Link
            href="/"
            className="font-display inline-block py-2 text-sm tracking-[0.3em] text-[#F4EBE1] hover:text-[#D4A574] transition-colors"
          >
            IVA <span className="font-light text-[#D4A574]">Nail Art</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href={otherPath}
              hrefLang={otherLang}
              className="rounded-full border border-[#D4A574]/40 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#D4A574] hover:bg-[#D4A574] hover:text-[#0E0706] transition-all"
            >
              {lang === "en" ? "ESPAÑOL" : "ENGLISH"}
            </Link>

            <button
              type="button"
              onClick={() => handleBookService("Builder Gel Manicure")}
              className="hidden sm:inline-flex rounded-full bg-gradient-to-r from-[#D4A574] to-[#B8864D] px-5 py-1.5 text-xs font-bold tracking-wider text-[#0E0706] shadow-[0_2px_15px_rgba(212,165,116,0.3)] hover:brightness-110 transition-all cursor-pointer"
            >
              {lang === "en" ? "BOOK APPOINTMENT" : "RESERVAR CITA"}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-28">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-[#D4A574]/10 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/2 left-0 h-80 w-80 rounded-full bg-[#5C1A1B]/15 blur-[100px]" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            {/* Travel & Neighborhood Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A574]/30 bg-[#D4A574]/10 px-4 py-1.5 text-xs font-medium text-[#D4A574] mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{c.badge}</span>
            </div>

            <p className="font-display mb-3 text-xs tracking-[0.35em] text-[#D4A574]/90 uppercase">
              {c.eyebrow}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F4EBE1] leading-[1.1] mb-6">
              {c.h1Top} <br />
              <span className="font-serif italic font-normal text-[#D4A574]">
                {c.h1Bottom}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#F4EBE1]/80 leading-relaxed mb-8 max-w-2xl font-light">
              {c.intro}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => handleBookService("Builder Gel Manicure")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#D4A574] px-8 py-4 text-sm font-bold tracking-wider text-[#0E0706] shadow-[0_4px_25px_rgba(212,165,116,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{c.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={BUSINESS.instagramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F4EBE1]/25 bg-white/5 px-6 py-4 text-sm font-medium text-[#F4EBE1] hover:bg-white/10 hover:border-[#D4A574]/50 transition-all"
              >
                <Instagram className="w-4 h-4 text-[#D4A574]" />
                <span>{c.ctaSecondary}</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-[#F4EBE1]/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4A574]" />
                <span>{lang === "en" ? "Private 1-on-1 Studio" : "Atención Privada 1 a 1"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4A574]" />
                <span>{lang === "en" ? "$35 Deposit Holds Your Slot" : "Depósito de $35 Aparta Tu Turno"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4A574]" />
                <span>{lang === "en" ? "15-Min Grace Period" : "15 Minutos de Tolerancia"}</span>
              </div>
            </div>
          </div>

          {/* Featured Visual Card */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#D4A574]/20 shadow-2xl bg-[#140b0a]">
              <Image
                src={photos[0].src}
                alt={photos[0].alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0706] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block rounded-full bg-[#D4A574]/20 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-[#D4A574] mb-2 border border-[#D4A574]/30">
                  {lang === "en" ? "Real Client Set by Iva" : "Diseño Real en Estudio"}
                </span>
                <p className="font-serif italic text-xl text-[#F4EBE1]">
                  {photos[0].alt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transit & How to Get Here Guide */}
      <section className="border-y border-[#F4EBE1]/10 bg-gradient-to-b from-[#140b0a] to-[#0E0706] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#D4A574] uppercase mb-2">
              {lang === "en" ? "PROXIMITY & COMMUTE" : "CERCANÍA Y TRAYECTO"}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#F4EBE1]">
              {c.transitHeading}
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#F4EBE1]/70 max-w-2xl mx-auto">
              {c.transitBody}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Driving / Rideshare */}
            <div className="rounded-2xl border border-[#D4A574]/20 bg-[#160d0b] p-6 md:p-8 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4A574]/15 border border-[#D4A574]/30 text-[#D4A574]">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-[#F4EBE1]">
                    {lang === "en" ? "By Car / Uber / Lyft" : "En Auto / Taxi / Uber"}
                  </h3>
                  <p className="text-xs font-semibold text-[#D4A574]">
                    ⏱ {c.transit.carMinutes}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#F4EBE1]/80 leading-relaxed mb-4">
                {c.transit.directionsSummary}
              </p>
              <div className="rounded-lg bg-[#0E0706]/60 p-3 border border-[#F4EBE1]/10 text-xs text-[#F4EBE1]/70 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4A574] shrink-0" />
                <span>{c.transit.parkingNote}</span>
              </div>
            </div>

            {/* Public Transit */}
            <div className="rounded-2xl border border-[#D4A574]/20 bg-[#160d0b] p-6 md:p-8 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4A574]/15 border border-[#D4A574]/30 text-[#D4A574]">
                  <Train className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-[#F4EBE1]">
                    {lang === "en" ? "MTA Subway & Bus" : "Metro y Autobús MTA"}
                  </h3>
                  <p className="text-xs font-semibold text-[#D4A574]">
                    ⏱ {c.transit.transitMinutes}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#F4EBE1]/80 leading-relaxed mb-4">
                {lang === "en"
                  ? "Direct connections straight into Bay Ridge (11209):"
                  : "Conexiones directas sin complicaciones hacia Bay Ridge (11209):"}
              </p>
              <div className="flex flex-wrap gap-2">
                {c.transit.mtaLines.map((line) => (
                  <span
                    key={line}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#D4A574]/30 bg-[#D4A574]/10 px-3 py-1 text-xs font-medium text-[#D4A574]"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose IVA Nail Art */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#D4A574] uppercase mb-2">
              {lang === "en" ? "THE PRIVATE EXPERIENCE" : "LA EXPERIENCIA PRIVADA"}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#F4EBE1]">
              {c.whyTitle}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.whyCards.map((card, i) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-[#F4EBE1]/10 bg-[#140b0a] p-6 hover:border-[#D4A574]/40 hover:bg-[#1a0e0c] transition-all"
              >
                <span className="font-mono text-xs text-[#D4A574]/70 mb-4 block">
                  0{i + 1}
                </span>
                <h3 className="font-display text-lg font-medium text-[#F4EBE1] mb-2 group-hover:text-[#D4A574] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-[#F4EBE1]/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Services */}
      <section className="border-t border-[#F4EBE1]/10 bg-[#120a09] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#D4A574] uppercase mb-2">
              {lang === "en" ? "MENU & SPECIALTIES" : "CATÁLOGO DE SERVICIOS"}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#F4EBE1]">
              {c.servicesTitle}
            </h2>
            <p className="mt-3 text-sm text-[#F4EBE1]/70">
              {c.servicesSubtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {c.services.map((svc) => (
              <div
                key={svc.title}
                className="rounded-2xl border border-[#D4A574]/20 bg-[#160d0b] p-6 md:p-8 flex flex-col justify-between hover:border-[#D4A574]/50 transition-all"
              >
                <div>
                  <h3 className="font-display text-xl font-medium text-[#F4EBE1] mb-1">
                    {svc.title}
                  </h3>
                  <p className="text-xs font-medium text-[#D4A574] mb-3">
                    {svc.tagline}
                  </p>
                  <p className="text-sm text-[#F4EBE1]/75 leading-relaxed mb-6">
                    {svc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F4EBE1]/10 flex items-center justify-between">
                  <span className="text-xs text-[#F4EBE1]/60">
                    {lang === "en" ? "Personalized quote · $35 deposit" : "Cotización personalizada · $35 depósito"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleBookService(svc.calendlyPrefill)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A574] px-4 py-1.5 text-xs font-bold text-[#0E0706] hover:bg-white transition-colors cursor-pointer"
                  >
                    <span>{lang === "en" ? "Select" : "Elegir"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Work Gallery */}
      <section className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-[#D4A574] uppercase mb-1">
                {lang === "en" ? "OUR CRAFT" : "NUESTRO TRABAJO"}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-light text-[#F4EBE1]">
                {lang === "en" ? "Recent Sets by Iva" : "Diseños Recientes"}
              </h2>
            </div>
            <Link
              href="/#gallery"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A574] hover:text-white transition-colors"
            >
              <span>{lang === "en" ? "View 40+ sets in full gallery" : "Ver galería completa (40+ sets)"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {photos.map((photo, idx) => (
              <div
                key={photo.src + idx}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-[#F4EBE1]/10 bg-[#160d0b]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0706]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                  <p className="text-[10px] text-white/90 line-clamp-2 leading-tight">
                    {photo.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Policies / Deposit Notice */}
      <section className="border-t border-[#F4EBE1]/10 bg-[#140b0a] px-6 py-12 md:px-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#D4A574]/30 bg-[#0E0706] p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-[#D4A574] shrink-0 mt-1" />
            <div>
              <h3 className="font-display text-base font-semibold text-[#F4EBE1]">
                {lang === "en" ? "Private Studio Reservation Policy" : "Política de Reserva en Estudio Privado"}
              </h3>
              <p className="text-xs text-[#F4EBE1]/70 mt-1 leading-relaxed">
                {lang === "en"
                  ? "All sessions are reserved exclusively for you. A $35 deposit confirms your slot and applies to your service total. We provide a 15-minute grace period; cancellations require 24 hours' notice."
                  : "Cada turno se reserva en exclusiva para ti. Un depósito de $35 confirma tu cita y se descuenta del total. Brindamos 15 min de tolerancia; avisar cambios con 24h de anticipación."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleBookService("Builder Gel Manicure")}
            className="shrink-0 rounded-full bg-gradient-to-r from-[#D4A574] to-[#B8864D] px-6 py-2.5 text-xs font-bold text-[#0E0706] hover:brightness-110 transition-all cursor-pointer"
          >
            {lang === "en" ? "Schedule Now" : "Agendar Ahora"}
          </button>
        </div>
      </section>

      {/* Hyperlocal FAQ */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#D4A574] uppercase mb-2">
              {lang === "en" ? "CLARITY & DETAILS" : "DUDAS FRECUENTES"}
            </p>
            <h2 className="font-display text-3xl font-light text-[#F4EBE1]">
              {c.faqTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {c.faq.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-xl border border-[#F4EBE1]/10 bg-[#140b0a] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="font-display text-sm md:text-base font-medium text-[#F4EBE1]">
                      {item.q}
                    </span>
                    <span className="text-[#D4A574] text-lg font-light shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-[#F4EBE1]/75 leading-relaxed border-t border-[#F4EBE1]/5">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Nearby Neighborhoods Link Module */}
      <section className="border-t border-[#F4EBE1]/10 bg-[#120a09] px-6 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#D4A574] uppercase mb-4 text-center">
            {lang === "en" ? "EXPLORE OTHER NEARBY AREAS" : "EXPLORA OTRAS ZONAS CERCANAS"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {otherNeighborhoods.map((other) => (
              <Link
                key={other.slug}
                href={hyperlocalPath(other.slug, lang)}
                className="rounded-full border border-[#F4EBE1]/20 bg-white/5 px-4 py-2 text-xs text-[#F4EBE1] hover:border-[#D4A574] hover:text-[#D4A574] transition-all"
              >
                📍 {lang === "en" ? other.neighborhoodEn : other.neighborhoodEs}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-full border border-[#D4A574]/40 bg-[#D4A574]/10 px-4 py-2 text-xs font-semibold text-[#D4A574] hover:bg-[#D4A574] hover:text-[#0E0706] transition-all"
            >
              ⭐ {lang === "en" ? "Bay Ridge Flagship Studio" : "Estudio Principal en Bay Ridge"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#F4EBE1]/10 bg-[#0E0706] px-6 py-12 text-center text-xs text-[#F4EBE1]/60">
        <div className="mx-auto max-w-6xl space-y-4">
          <p className="font-display tracking-[0.2em] text-[#F4EBE1] text-sm">
            IVA <span className="text-[#D4A574]">Nail Art NY</span>
          </p>
          <p>
            Bay Ridge, Brooklyn, NY 11209 · Instagram:{" "}
            <a
              href="https://instagram.com/iva_nailart_nyc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4A574] underline underline-offset-4"
            >
              @iva_nailart_nyc
            </a>{" "}
            · WhatsApp:{" "}
            <a
              href="https://wa.me/19296257273"
              className="text-[#D4A574] underline underline-offset-4"
            >
              +1 (929) 625-7273
            </a>
          </p>
          <p className="text-[11px] text-[#F4EBE1]/40">
            © {new Date().getFullYear()} IVA Nail Art. All rights reserved. By appointment only.
          </p>
        </div>
      </footer>

      {/* Mobile Sticky Booking Bar */}
      <div className="sm:hidden">
        <MobileBookingBar
          lang={lang}
          onBookClick={() => handleBookService("Builder Gel Manicure")}
        />
      </div>

      {/* Calendly Booking Funnel Modal */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        lang={lang}
        prefilledService={selectedService}
      />
    </main>
  );
}
