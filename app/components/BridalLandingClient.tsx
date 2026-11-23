"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Calendar,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
  Gem,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Crown,
} from "lucide-react";
import CalendlyModal from "./CalendlyModal";
import MobileBookingBar from "./MobileBookingBar";
import { BUSINESS, SITE_URL } from "@/lib/site";

interface BridalLandingClientProps {
  lang: "en" | "es";
}

export default function BridalLandingClient({ lang }: BridalLandingClientProps) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Bridal Nail Ritual");
  const isEs = lang === "es";

  const openBooking = (service: string = "Bridal Nail Ritual") => {
    setSelectedService(service);
    setIsCalendlyOpen(true);
  };

  const whatsappBridalUrl = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
    isEs
      ? "¡Hola Ivannía! Me caso pronto en Brooklyn y me gustaría consultar por disponibilidad y cotización para mis uñas de novia 👰✨"
      : "Hi Ivannía! I am getting married in Brooklyn soon and would love to consult about bridal nail availability and custom quotes 👰✨"
  )}`;

  const bridalSchema = {
    "@context": "https://schema.org",
    "@type": ["Service", "BeautySalon"],
    "name": isEs ? "Uñas de Novia en Brooklyn | IVA Nail Art NY" : "Bridal Nails Brooklyn | IVA Nail Art NY",
    "description": isEs
      ? "Estudio privado de manicura para novias en Bay Ridge, Brooklyn. Especialistas en builder gel nupcial, micro-francesas, glazed pearl y manicura rusa duradera para bodas y lunas de miel."
      : "Bespoke bridal nail studio in Bay Ridge, Brooklyn. Specializing in wedding builder gel, glazed pearl, micro-French lines, and Russian dry manicures with guaranteed honeymoon retention.",
    "provider": {
      "@type": "Person",
      "name": BUSINESS.artist,
      "jobTitle": "Master Bridal Nail Artist",
    },
    "areaServed": [
      { "@type": "City", "name": "Brooklyn" },
      { "@type": "City", "name": "New York" },
      { "@type": "Place", "name": "Bay Ridge, Brooklyn, NY" },
      { "@type": "Place", "name": "Park Slope, Brooklyn, NY" },
      { "@type": "Place", "name": "DUMBO, Brooklyn, NY" },
    ],
    "url": `${SITE_URL}/${isEs ? "es/" : ""}bridal-nails-brooklyn`,
    "telephone": BUSINESS.phone,
    "priceRange": "$$",
  };

  return (
    <div className="min-h-screen bg-[#0E0706] text-[#F4EBE1] selection:bg-[#D4A574]/30 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bridalSchema) }}
      />

      {/* Top Luxury Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#D4A574]/20 bg-[#0E0706]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link
            href={isEs ? "/es" : "/"}
            className="flex items-center gap-2.5 text-xs text-[#D4A574] hover:text-white transition-colors"
          >
            <div className="relative h-7 w-7 rounded-lg overflow-hidden border border-[#D4A574]/40 p-0.5 bg-[#170c0a]">
              <Image src="/logo-iva.png" alt="IVA Nail Art" width={28} height={28} className="object-contain" />
            </div>
            <span className="font-display font-medium tracking-[0.2em] text-sm">IVA NAIL ART NY</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={isEs ? "/bridal-nails-brooklyn" : "/es/bridal-nails-brooklyn"}
              className="text-xs text-[#F4EBE1]/70 hover:text-[#D4A574] transition-colors border border-[#D4A574]/20 rounded-lg px-2.5 py-1"
            >
              {isEs ? "EN" : "ES"}
            </Link>

            <button
              onClick={() => openBooking(isEs ? "Manicura Nupcial" : "Bridal Nail Ritual")}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B8864E] px-4 py-1.5 text-xs font-semibold text-[#0E0706] shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{isEs ? "Reservar Cita de Novia" : "Reserve Bridal Session"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#D4A574]/15 via-[#B76E79]/10 to-transparent blur-3xl rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A574]/40 bg-[#D4A574]/10 px-3.5 py-1 text-xs font-medium text-[#D4A574] uppercase tracking-widest mb-6">
            <Crown className="w-3.5 h-3.5" />
            <span>{isEs ? "ATELIER PRIVADO PARA NOVIAS · BAY RIDGE, BROOKLYN" : "THE BROOKLYN BRIDAL SANCTUARY · BAY RIDGE"}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-[#F4EBE1]">
            {isEs ? (
              <>
                Uñas de Novia a Medida &amp;{" "}
                <span className="italic font-serif text-[#D4A574]">Builder Gel Impecable</span>
              </>
            ) : (
              <>
                Bespoke Wedding Nails &amp;{" "}
                <span className="italic font-serif text-[#D4A574]">Flawless Bridal Gel</span>
              </>
            )}
          </h1>

          <p className="mt-6 text-sm sm:text-base text-[#F4EBE1]/75 max-w-2xl mx-auto font-light leading-relaxed">
            {isEs
              ? "Tu boda merece un set que no se astille, se levante ni pierda su brillo desde la ceremonia hasta el último día de tu luna de miel. Creado a mano en un estudio privado 1 a 1 en Bay Ridge, con técnica rusa en seco y nivelación en builder gel europeo."
              : "Your wedding day demands nails that will not chip, lift, or dull from your first walk down the aisle to the final sunset of your honeymoon. Hand-crafted in an intimate 1-on-1 Bay Ridge atelier using Russian dry cuticle precision and European builder gel reinforcement."}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => openBooking(isEs ? "Manicura Nupcial" : "Bridal Nail Ritual")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B8864E] px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0E0706] shadow-xl shadow-[#D4A574]/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{isEs ? "Apartar Cita Nupcial en Calendly" : "Reserve Bridal Appointment"}</span>
            </button>

            <a
              href={whatsappBridalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#D4A574]/40 bg-[#170c0a] px-6 py-3.5 text-xs sm:text-sm font-medium text-[#F4EBE1] hover:border-[#D4A574] hover:bg-[#D4A574]/10 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{isEs ? "Consultar por WhatsApp con Ivannía" : "Consult with Iva on WhatsApp"}</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {[
              { label: isEs ? "Garantía Luna de Miel" : "Honeymoon Proof", sub: isEs ? "3 a 4 semanas sin astillado" : "3–4 weeks zero lifting" },
              { label: isEs ? "Atelier 100% Privado" : "Private 1:1 Sanctuary", sub: isEs ? "Sin esperas ni ruidos" : "Calm, zero rushed salon chaos" },
              { label: isEs ? "Salud de la Uña" : "Zero Damage Protocol", sub: isEs ? "Técnica rusa en seco" : "Pure Russian dry manicure" },
              { label: isEs ? "Diseño a Medida" : "Custom Swatch Match", sub: isEs ? "A juego con tu vestido" : "Toned to your dress & veil" },
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl border border-[#D4A574]/20 bg-[#160c0b]/80 p-3.5">
                <p className="text-xs font-semibold text-[#D4A574]">{item.label}</p>
                <p className="text-[11px] text-[#F4EBE1]/60 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 3-Phase Bridal Countdown */}
      <section className="py-16 border-t border-[#D4A574]/15 bg-[#120a09]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.25em] text-[#D4A574] uppercase mb-2">
              {isEs ? "EL CRONOGRAMA NUPCIAL RECOMENDADO" : "THE BRIDAL NAIL JOURNEY"}
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-light text-[#F4EBE1]">
              {isEs ? "La Preparación Perfecta para el Gran Día" : "Your Countdown to Wedding Day Perfection"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#F4EBE1]/70 max-w-xl mx-auto font-light">
              {isEs
                ? "Diseñado para que tus uñas naturales alcancen la longitud, forma y fuerza ideal con tiempo de anticipación."
                : "Designed so your natural nails achieve optimal length, balance, and cuticle health weeks ahead of time."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                time: isEs ? "2 a 3 Meses Antes" : "2–3 Months Prior",
                title: isEs ? "Fase de Fuerza & Crecimiento" : "Strength & Length Foundation",
                desc: isEs
                  ? "Iniciamos el tratamiento con Builder Gel estructurado (BIAB). Protegemos tu lámina ungueal para que crezca naturalmente sin romperse, eliminando la necesidad de extensiones artificiales pesadas."
                  : "We begin your structured Builder Gel (BIAB) journey. This shields brittle natural nails and builds a resilient apex, allowing your natural nails to grow to your dream wedding silhouette.",
                icon: Gem,
              },
              {
                step: "02",
                time: isEs ? "3 a 4 Semanas Antes" : "3–4 Weeks Prior",
                title: isEs ? "Prueba de Estilo & Color" : "Bridal Trial & Swatch Test",
                desc: isEs
                  ? "Realizamos tu set de prueba en la misma semana de tu prueba de vestido. Evaluamos tonos nude traslúcidos, efectos glazed pearl y micro-francesas frente a la tela de tu ajuar."
                  : "Scheduled alongside your final dress fitting. We test sheer milky nudes, glazed donut lusters, and micro-French widths against your gown fabric and jewelry to lock in your signature look.",
                icon: Sparkles,
              },
              {
                step: "03",
                time: isEs ? "2 a 3 Días Antes" : "2–3 Days Prior",
                title: isEs ? "El Ritual Nupcial del Gran Día" : "The Wedding Sanctuary Ritual",
                desc: isEs
                  ? "Tu cita final de boda. Limpieza rusa impecable, nivelación con gel de larga duración, arte nupcial a mano y mascarilla hidratante profunda para que tus manos luzcan listas para el anillo."
                  : "Your final pre-wedding atelier session. Impeccable Russian dry cuticle care, diamond-shine builder gel, bespoke bridal art, and deep botanical hand conditioning ready for ring photos.",
                icon: Heart,
              },
            ].map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-[#D4A574]/25 bg-[#170c0a] p-6 relative flex flex-col justify-between hover:border-[#D4A574]/50 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-2xl font-light text-[#D4A574]/60 group-hover:text-[#D4A574] transition-colors">
                        {phase.step}
                      </span>
                      <span className="text-[11px] font-semibold text-[#D4A574] rounded-full bg-[#D4A574]/10 border border-[#D4A574]/30 px-3 py-0.5">
                        {phase.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-[#D4A574]" />
                      <h3 className="font-display text-lg text-[#F4EBE1] font-medium">{phase.title}</h3>
                    </div>

                    <p className="text-xs text-[#F4EBE1]/70 leading-relaxed font-light mt-2">
                      {phase.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#D4A574]">
                    <span>{isEs ? "Atención privada 1 a 1" : "Dedicated 1-on-1 session"}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curated Bridal Styles */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.25em] text-[#D4A574] uppercase mb-2">
              {isEs ? "ESTILOS NUPCIALES EXCLUSIVOS" : "CURATED BRIDAL LOOKS"}
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-light text-[#F4EBE1]">
              {isEs ? "Estilos que Enamoran en las Fotos" : "Timeless Silhouettes for Your Portraits"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#F4EBE1]/70 max-w-lg mx-auto font-light">
              {isEs
                ? "Desde el minimalismo más sutil hasta encajes botánicos pintados a mano alzada."
                : "From modern ethereal glazed chrome to hand-painted micro lace and miniature pearls."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: isEs ? "The Glazed Pearl" : "The Glazed Pearl",
                subtitle: isEs ? "Efecto perlado traslúcido" : "Ethereal champagne chrome finish",
                desc: isEs
                  ? "Base lechosa o nude semitransparente con polvo de cromo nacarado ultrafino que refleja la luz sin robarle protagonismo al anillo."
                  : "Sheer milky base dusted with ultra-fine pearl chrome that catches golden-hour light without distracting from your ring.",
              },
              {
                title: isEs ? "Couture Micro-French" : "Couture Micro-French",
                subtitle: isEs ? "Línea ultra delgada y limpia" : "Skinny tip with optical lengthening",
                desc: isEs
                  ? "La versión contemporánea de la clásica francesa. Puntas delgadas como un hilo en blanco marfil o cromo champán que alargan visualmente tus dedos."
                  : "A modern reinvention of the classic French manicure. Whispering-fine smile lines in ivory or silver chrome that elongate your hands.",
              },
              {
                title: isEs ? "Velvet Silk & Rose" : "Velvet Silk & Rose",
                subtitle: isEs ? "Brillo magnético tridimensional" : "Subtle multidimensional cat-eye",
                desc: isEs
                  ? "Pigmentos magnéticos suaves en tonos oro rosa o cuarzo rosa que imitan la caída de un velo de seda bajo la luz de las velas."
                  : "Soft magnetic cat-eye pigments in rose quartz and champagne silk that mimic the luminous drape of your veil under reception lights.",
              },
              {
                title: isEs ? "Encaje 3D & Perlas" : "3D Lace & Pearl Accents",
                subtitle: isEs ? "Arte botánico a mano alzada" : "Hand-painted couture embellishment",
                desc: isEs
                  ? "Texturas tridimensionales suaves inspiradas en los bordados de tu vestido, complementadas con micro-perlas fijadas de forma segura."
                  : "Raised 3D gel florals and botanical lace inspired by your gown, paired with miniature secured freshwater pearl studs.",
              },
            ].map((style, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#D4A574]/20 bg-[#160c0b] p-5 flex flex-col justify-between hover:border-[#D4A574]/50 transition-all"
              >
                <div>
                  <div className="h-2 w-10 bg-gradient-to-r from-[#D4A574] to-transparent rounded-full mb-3" />
                  <h3 className="font-display text-base text-[#F4EBE1] font-medium">{style.title}</h3>
                  <p className="text-[11px] text-[#D4A574] font-medium mt-0.5">{style.subtitle}</p>
                  <p className="text-xs text-[#F4EBE1]/65 mt-2.5 leading-relaxed font-light">{style.desc}</p>
                </div>

                <button
                  onClick={() => openBooking(`Bridal: ${style.title}`)}
                  className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-[#D4A574] hover:text-white flex items-center justify-between"
                >
                  <span>{isEs ? "Consultar este estilo" : "Select this style"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridal Ritual Packages */}
      <section className="py-16 border-t border-[#D4A574]/15 bg-[#120a09]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.25em] text-[#D4A574] uppercase mb-2">
              {isEs ? "RITUALES NUPCIALES TRANSPARENTES" : "TRANSPARENT BRIDAL PACKAGES"}
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-light text-[#F4EBE1]">
              {isEs ? "Inversión en Belleza Sin Sorpresas" : "Private Bridal Sessions"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#F4EBE1]/70 max-w-md mx-auto font-light">
              {isEs
                ? "Todos los paquetes incluyen manicura rusa clínica, esterilización médica y garantía de retención."
                : "Every bridal ritual includes medical-grade sterilization, Russian dry cuticle care, and honeymoon durability."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Package 1 */}
            <div className="rounded-2xl border-2 border-[#D4A574]/40 bg-[#170c0a] p-7 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D4A574] bg-[#D4A574]/15 border border-[#D4A574]/30 px-3 py-1 rounded-full">
                    {isEs ? "EL MÁS ELEGIDO" : "MOST POPULAR"}
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#D4A574]">
                    {isEs ? "A Consultar" : "Bespoke Quote"}
                  </span>
                </div>
                <h3 className="font-display text-xl text-[#F4EBE1] font-medium">
                  {isEs ? "The Solo Bride Sanctuary Set" : "The Solo Bride Sanctuary Set"}
                </h3>
                <p className="text-xs text-[#F4EBE1]/70 mt-1 mb-5">
                  {isEs
                    ? "Sesión privada completa dedicada exclusivamente a la novia 2–3 días antes de la ceremonia."
                    : "Full private session exclusively for the bride 2–3 days before the ceremony."}
                </p>

                <ul className="space-y-2.5 text-xs text-[#F4EBE1]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A574] flex-shrink-0" />
                    <span>{isEs ? "Manicura rusa profunda en seco (sin cortes ni resequedad)" : "Full dry Russian e-file cuticle detailing"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A574] flex-shrink-0" />
                    <span>{isEs ? "Refuerzo y nivelación con Builder Gel (BIAB) europeo" : "Structured European builder gel reinforcement & apex"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A574] flex-shrink-0" />
                    <span>{isEs ? "Diseño nupcial a medida (glazed pearl, micro-french o velvet)" : "Custom bridal art (glazed chrome, micro-French, velvet)"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A574] flex-shrink-0" />
                    <span>{isEs ? "Mascarilla y aceite botánico de cutícula de regalo" : "Botanical cuticle treatment & complimentary home oil"}</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <button
                  onClick={() => openBooking("The Solo Bride Sanctuary Set")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B8864E] py-3 text-xs font-semibold uppercase tracking-wider text-[#0E0706] hover:brightness-110 active:scale-95 transition-all shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isEs ? "Reservar Sesión de Novia" : "Book Bridal Sanctuary"}</span>
                </button>
              </div>
            </div>

            {/* Package 2 */}
            <div className="rounded-2xl border border-[#D4A574]/20 bg-[#160c0b] p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#F4EBE1]/60">
                    {isEs ? "DÚO NUPCIAL" : "BRIDAL DUO"}
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#F4EBE1]/80">
                    {isEs ? "A Consultar" : "Bespoke Quote"}
                  </span>
                </div>
                <h3 className="font-display text-xl text-[#F4EBE1] font-medium">
                  {isEs ? "Novia & Dama de Honor / Mamá" : "Bride & Maid of Honor / Mother"}
                </h3>
                <p className="text-xs text-[#F4EBE1]/70 mt-1 mb-5">
                  {isEs
                    ? "Dos citas privadas consecutivas para compartir un momento de calma antes del gran día."
                    : "Two back-to-back private sessions to share unhurried relaxation before the big day."}
                </p>

                <ul className="space-y-2.5 text-xs text-[#F4EBE1]/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A574] flex-shrink-0" />
                    <span>{isEs ? "Dos sets completos de manicura rusa + builder gel" : "Two complete Russian manicure + builder gel sets"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A574] flex-shrink-0" />
                    <span>{isEs ? "Diseños personalizados en armonía con los vestidos" : "Coordinated bespoke designs matching gowns & themes"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A574] flex-shrink-0" />
                    <span>{isEs ? "Estudio completamente cerrado solo para ustedes" : "Private atelier exclusively closed for your duo"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A574] flex-shrink-0" />
                    <span>{isEs ? "Bebida de cortesía y espacio relajante" : "Calm luxury atmosphere & complimentary tea/coffee"}</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <a
                  href={whatsappBridalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4A574]/40 bg-[#D4A574]/10 py-3 text-xs font-semibold uppercase tracking-wider text-[#D4A574] hover:bg-[#D4A574] hover:text-[#0E0706] transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isEs ? "Coordinar Dúo por WhatsApp" : "Coordinate Duo on WhatsApp"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridal FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <HelpCircle className="w-7 h-7 text-[#D4A574] mx-auto mb-2" />
            <h2 className="font-display text-2xl sm:text-3xl font-light text-[#F4EBE1]">
              {isEs ? "Preguntas Frecuentes de Novias" : "Frequently Asked Bridal Questions"}
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: isEs ? "¿Cuántos días antes de la boda debo hacerme las uñas?" : "How many days before the wedding should I get my nails done?",
                a: isEs
                  ? "Recomendamos agendar tu cita entre 2 y 3 días antes de la boda. Con nuestra técnica de Builder Gel y manicura rusa, el set permanece con brillo de espejo y cutículas impecables por 3 a 4 semanas, por lo que tus fotos del día y toda tu luna de miel estarán 100% protegidas."
                  : "We recommend scheduling 2 to 3 days before your wedding date. Because we use European builder gel and Russian dry cuticle protocols, your set will stay crystal-shiny and pristine for 3 to 4 weeks, looking perfect from rehearsal dinner through honeymoon swimming.",
              },
              {
                q: isEs ? "¿Qué pasa si mis uñas naturales son cortas o quebradizas?" : "What if my natural nails are very short or brittle?",
                a: isEs
                  ? "¡No te preocupes! Si comienzas 2 a 3 meses antes, el builder gel las protegerá para que crezcan fuertes. Si tu boda es pronto, podemos esculpir extensiones ligeras de gel suave (Gel-X o acrílico fino) con longitud natural y elegante."
                  : "Do not stress! If you begin 2 to 3 months prior, our builder gel growth program will allow them to reach your desired length naturally. If your wedding is around the corner, we can sculpt lightweight soft extensions (Gel-X or slender acrylic) tailored to your hands.",
              },
              {
                q: isEs ? "¿Puedo llevar fotos de mi vestido o ramo?" : "Can I bring photos of my gown, veil, and florals?",
                a: isEs
                  ? "¡Absolutamente! De hecho, lo recomendamos con entusiasmo. Ivannía adaptará la calidez del tono (nude marfil, rosa pétalo o blanco perla) para que armonice a la perfección con la tela de tu ajuar."
                  : "Absolutely! In fact, we strongly encourage it. Iva will nuance the undertone of your sheer base (milky ivory, delicate blush, or champagne) to harmonize seamlessly with your gown fabric and floral palette.",
              },
              {
                q: isEs ? "¿Cómo funciona el depósito de reserva?" : "How does the reservation deposit work?",
                a: isEs
                  ? "Al reservar en Calendly, un depósito de $35 vía Zelle, Apple Pay o Venmo aparta tu fecha de forma exclusiva y se descuenta del total el día del servicio."
                  : "When selecting your time on Calendly, a $35 deposit via Zelle, Apple Pay, or Venmo locks in your private date and is fully credited toward your final bridal balance.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-[#D4A574]/20 bg-[#160c0b] p-5">
                <h3 className="text-sm font-medium text-[#F4EBE1] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4A574] flex-shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="mt-2 text-xs text-[#F4EBE1]/70 leading-relaxed font-light pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 rounded-2xl border border-[#D4A574]/30 bg-gradient-to-br from-[#1b0d0c] to-[#0E0706]">
            <Crown className="w-8 h-8 text-[#D4A574] mx-auto mb-3" />
            <h3 className="font-display text-xl text-[#F4EBE1]">
              {isEs ? "Asegura tu Fecha de Boda" : "Secure Your Bridal Sanctuary Date"}
            </h3>
            <p className="text-xs text-[#F4EBE1]/70 max-w-md mx-auto mt-2 font-light">
              {isEs
                ? "Atendemos únicamente 2 clientas al día para garantizar privacidad absoluta y máxima dedicación."
                : "We limit appointments to just 2 clients per day to guarantee complete privacy and zero rush."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => openBooking("Bridal Nail Ritual")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4A574] to-[#B8864E] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0E0706] hover:brightness-110 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>{isEs ? "Ver Horarios en Calendly" : "Check Open Dates on Calendly"}</span>
              </button>
              <a
                href={whatsappBridalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#D4A574]/40 bg-white/5 px-5 py-3 text-xs font-medium text-[#F4EBE1] hover:bg-white/10"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D4A574]/15 py-8 text-center text-xs text-[#F4EBE1]/50">
        <p>IVA Nail Art NY · Exclusive Bridal Sanctuary · Bay Ridge, Brooklyn</p>
        <p className="mt-1 font-light">Official Instagram: @iva_nailart_nyc · +1 (929) 625-7273</p>
      </footer>

      <MobileBookingBar lang={lang} onBookClick={() => openBooking(isEs ? "Manicura Nupcial" : "Bridal Nail Ritual")} />
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        lang={lang}
        prefilledService={selectedService}
      />
    </div>
  );
}
