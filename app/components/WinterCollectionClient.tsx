"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  MessageCircle,
  Snowflake,
  ChevronRight,
  Droplets,
} from "lucide-react";
import CalendlyModal from "./CalendlyModal";
import MobileBookingBar from "./MobileBookingBar";
import { BUSINESS } from "@/lib/site";

interface WinterCollectionClientProps {
  lang: "en" | "es";
}

export default function WinterCollectionClient({ lang }: WinterCollectionClientProps) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Holiday Nail Art Set");
  const isEs = lang === "es";

  const openBooking = (service: string = "Holiday Nail Art Set") => {
    setSelectedService(service);
    setIsCalendlyOpen(true);
  };

  const whatsappHolidayUrl = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
    isEs
      ? "¡Hola Ivannía! Quiero consultar disponibilidad para mi set de fin de año / temporada de invierno en IVA Nail Art ✨❄️"
      : "Hi Ivannía! I would love to check availability for my holiday / winter nail set at IVA Nail Art ✨❄️"
  )}`;

  const winterLooks = [
    {
      id: "midnight-velvet",
      title: isEs ? "Midnight Emerald Velvet" : "Midnight Emerald Velvet",
      tagline: isEs ? "Efecto terciopelo magnético profundo" : "Multidimensional magnetic cat-eye",
      palette: isEs ? "Verde esmeralda · Cromo dorado sutil" : "Deep emerald green · Subtle gold chrome",
      description: isEs
        ? "Verde bosque profundo enriquecido con partículas magnéticas que atrapan la luz festiva como un traje de terciopelo de noche."
        : "Deep forest emerald imbued with magnetic cat-eye particles that glow with a velvety sheen under festive lighting.",
    },
    {
      id: "champagne-frost",
      title: isEs ? "Champagne Frost & Gold Leaf" : "Champagne Frost & Gold Leaf",
      tagline: isEs ? "Micro-francesa y láminas de oro" : "Milky frosted tips with gold flakes",
      palette: isEs ? "Base lechosa marfil · Oro 24K" : "Frosted ivory nude · 24K gold foil",
      description: isEs
        ? "Base marfil semitransparente con puntas escarchadas y detalles orgánicos en lámina dorada. Ideal para fiestas de gala y Año Nuevo."
        : "Translucent frosted milky base with delicate winter shimmer and handcrafted gold foil accents. The quintessential New Year's Eve look.",
    },
    {
      id: "bordeaux-glaze",
      title: isEs ? "Bordeaux Glazed Cherry" : "Bordeaux Glazed Cherry",
      tagline: isEs ? "Rojo vino ruso con brillo vítreo" : "Rich burgundy with high-gloss mirror glaze",
      palette: isEs ? "Borgoña intenso · Polvo perlado" : "Deep wine bordeaux · Glazed pearl veil",
      description: isEs
        ? "El clásico tono invernal elevado con nivelación rusa de builder gel y acabado glaseado que refleja la luz con brillo de espejo."
        : "The definitive winter staple elevated with structured Russian builder gel leveling and an opulent glazed luster.",
    },
    {
      id: "celestial-stars",
      title: isEs ? "Celestial Stars & Micro-Flakes" : "Celestial Stars & Micro-Flakes",
      tagline: isEs ? "Estrellas y copos dibujados a mano" : "Hand-painted micro snowflakes & silver foil",
      palette: isEs ? "Azul noche / Nude hielo · Plata" : "Midnight blue / Ice nude · Liquid silver",
      description: isEs
        ? "Ilustraciones botánicas invernales y copos de nieve pintados a mano alzada con pincel de precisión sobre base nude fría."
        : "Fine-line hand-painted ice crystals and celestial stars painted individually on a cool nude or deep midnight base.",
    },
    {
      id: "molten-chrome",
      title: isEs ? "Liquid Molten Gold & Chrome" : "Liquid Molten Gold & Chrome",
      tagline: isEs ? "Relieves 3D escultóricos en metal" : "Sculptural 3D metallic holiday ribbons",
      palette: isEs ? "Cromo plateado o dorado líquido" : "Molten mirror chrome · 3D gel droplets",
      description: isEs
        ? "Gotas de gel en relieve y lazos tridimensionales cubiertos de cromo reflectante que parecen joyería fundida sobre tus uñas."
        : "Textured raised 3D gel ribbons coated in high-reflect mirror chrome, creating a jewel-like tactile centerpiece on your nails.",
    },
    {
      id: "winter-white-pearl",
      title: isEs ? "Winter White Glazed Pearl" : "Winter White Glazed Pearl",
      tagline: isEs ? "Perlado níveo minimalista" : "Minimalist pearlescent snow veil",
      palette: isEs ? "Blanco nieve puro · Cromo nacarado" : "Pure soft white · Iridescent pearl dust",
      description: isEs
        ? "El look 'clean girl' invernal por excelencia. Blanco suave nivelado con polvo de perla que recuerda a la nieve fresca bajo el sol."
        : "The ultimate cozy luxury aesthetic. Soft snow white layered with multi-tonal pearl dust reminiscent of fresh morning frost.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0E0706] text-[#F4EBE1] selection:bg-[#D4A574]/30 selection:text-white">
      {/* Top Header */}
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
              href={isEs ? "/winter-collection" : "/es/winter-collection"}
              className="text-xs text-[#F4EBE1]/70 hover:text-[#D4A574] transition-colors border border-[#D4A574]/20 rounded-lg px-2.5 py-1"
            >
              {isEs ? "EN" : "ES"}
            </Link>

            <button
              onClick={() => openBooking(isEs ? "Set de Invierno" : "Winter Holiday Set")}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B8864E] px-4 py-1.5 text-xs font-semibold text-[#0E0706] shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{isEs ? "Apartar Cita Festiva" : "Reserve Holiday Set"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden text-center">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-[#D4A574]/15 via-[#1d2a44]/15 to-transparent blur-3xl rounded-full" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A574]/40 bg-[#D4A574]/10 px-3.5 py-1 text-xs font-medium text-[#D4A574] uppercase tracking-widest mb-6">
            <Snowflake className="w-3.5 h-3.5 text-sky-300" />
            <span>{isEs ? "COLECCIÓN EDITORIAL DE INVIERNO & FIN DE AÑO" : "WINTER & HOLIDAY EDITORIAL COLLECTION"}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] text-[#F4EBE1]">
            {isEs ? (
              <>
                Destellos Festivos &amp;{" "}
                <span className="italic font-serif text-[#D4A574]">Elegancia Invernal</span>
              </>
            ) : (
              <>
                Festive Luster &amp;{" "}
                <span className="italic font-serif text-[#D4A574]">Winter Sanctuary Art</span>
              </>
            )}
          </h1>

          <p className="mt-6 text-sm sm:text-base text-[#F4EBE1]/75 max-w-2xl mx-auto font-light leading-relaxed">
            {isEs
              ? "Desde el magnetismo aterciopelado del velvet cat-eye hasta gotas de cromo fundido y micro-escarchas doradas. Diseñados para brillar en tus cenas de gala, Navidad y Año Nuevo con la fuerza indestructible del builder gel europeo."
              : "From deep velvet cat-eye shimmer to molten 3D metallic chrome ribbons and champagne frosted tips. Created exclusively for holiday celebrations and New Year's Eve galas with the unbreakable strength of European builder gel."}
          </p>

          {/* Limited Openings Urgent Notice */}
          <div className="mt-7 inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-200">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>
              {isEs
                ? "Cupos limitados para Navidad y Fin de Año — Te sugerimos apartar con anticipación"
                : "Peak holiday & New Year's Eve slots fill quickly — We recommend booking in advance"}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => openBooking(isEs ? "Set de Invierno" : "Winter Holiday Set")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B8864E] px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0E0706] shadow-xl shadow-[#D4A574]/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{isEs ? "Apartar Cita en Calendly" : "Reserve Winter Appointment"}</span>
            </button>

            <a
              href={whatsappHolidayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#D4A574]/40 bg-[#170c0a] px-6 py-3.5 text-xs sm:text-sm font-medium text-[#F4EBE1] hover:border-[#D4A574] hover:bg-[#D4A574]/10 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{isEs ? "Consultar Diseños por WhatsApp" : "Inquire via WhatsApp"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lookbook Gallery */}
      <section className="py-16 border-t border-[#D4A574]/15 bg-[#120a09]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.25em] text-[#D4A574] uppercase mb-2">
              {isEs ? "LOS 6 ESTILOS DE LA TEMPORADA" : "THE 6 SEASONAL EDITORIAL LOOKS"}
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-light text-[#F4EBE1]">
              {isEs ? "Inspiración para tus Fiestas" : "Hand-Painted Holiday Inspiration"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#F4EBE1]/70 max-w-lg mx-auto font-light">
              {isEs
                ? "Elige tu diseño favorito o combina detalles a medida en tu cita privada en Bay Ridge."
                : "Select your signature holiday design or customize elements during your 1-on-1 Bay Ridge session."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {winterLooks.map((look) => (
              <div
                key={look.id}
                className="rounded-2xl border border-[#D4A574]/25 bg-[#170c0a] p-6 flex flex-col justify-between hover:border-[#D4A574]/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-[#D4A574] bg-[#D4A574]/10 border border-[#D4A574]/30 px-3 py-0.5 rounded-full">
                      {look.palette}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#D4A574]/60 group-hover:text-[#D4A574] transition-colors" />
                  </div>

                  <h3 className="font-display text-lg text-[#F4EBE1] font-medium group-hover:text-[#D4A574] transition-colors">
                    {look.title}
                  </h3>
                  <p className="text-xs text-[#D4A574] font-medium mt-0.5">{look.tagline}</p>

                  <p className="text-xs text-[#F4EBE1]/70 mt-3 leading-relaxed font-light">
                    {look.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => openBooking(`Holiday: ${look.title}`)}
                    className="text-xs font-semibold text-[#D4A574] hover:text-white flex items-center gap-1.5"
                  >
                    <span>{isEs ? "Pedir este look" : "Book this look"}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[10px] text-[#F4EBE1]/40">4 semanas de brillo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Winter Nail Care Guide */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Droplets className="w-7 h-7 text-[#D4A574] mx-auto mb-2" />
            <p className="font-display text-xs tracking-[0.25em] text-[#D4A574] uppercase mb-1">
              {isEs ? "CONSEJOS DE ESTUDIO" : "STUDIO CARE GUIDE"}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-[#F4EBE1]">
              {isEs ? "Cómo Cuidar tus Uñas en el Invierno de Nueva York" : "Winter Nail Longevity Protocol"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#F4EBE1]/70 max-w-md mx-auto font-light">
              {isEs
                ? "El frío y la calefacción secan la piel. Nuestro protocolo garantiza que tu set no sufra desprendimientos."
                : "Freezing winds and dry indoor heating challenge cuticle elasticity. Here is how our studio protects your hands."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Snowflake,
                title: isEs ? "Manicura Rusa en Seco" : "Waterless Russian Protocol",
                desc: isEs
                  ? "A diferencia de salones convencionales que remojan tus manos en agua (lo que expande la uña y causa desprendimientos cuando se contrae con el frío), la manicura rusa en seco sella perfectamente el builder gel."
                  : "Traditional salons soak nails in water, causing nail plates to expand and later shrink in cold air, prompting chips. Russian dry manicures keep moisture balance constant, creating a lifetime seal.",
              },
              {
                icon: Droplets,
                title: isEs ? "Aceite de Cutícula Diario" : "Daily Cuticle Oil Regimen",
                desc: isEs
                  ? "Aplica 1 gota de aceite de jojoba o almendras por la mañana y noche. El builder gel necesita flexibilidad para absorber impactos sin quebrarse en temperaturas bajo cero."
                  : "Apply 1 drop of botanical cuticle oil twice daily. Builder gel requires moisture elasticity to withstand cold outdoor shocks without developing hairline micro-fractures.",
              },
              {
                icon: ShieldCheck,
                title: isEs ? "Guantes contra el Frío" : "Cold-Weather Glove Shield",
                desc: isEs
                  ? "Llevar guantes protege la microcirculación de tus dedos y evita que los detergentes calientes en casa deshidraten la cutícula que acabamos de limpiar."
                  : "Wearing lined gloves outdoors preserves fingertip circulation, while rubber gloves for warm dishwashing prevent thermal shock from dulling your high-shine glazed topcoat.",
              },
            ].map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div key={i} className="rounded-2xl border border-[#D4A574]/20 bg-[#160c0b] p-6">
                  <div className="h-10 w-10 rounded-xl bg-[#D4A574]/10 border border-[#D4A574]/30 flex items-center justify-center text-[#D4A574] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-base text-[#F4EBE1] font-medium">{tip.title}</h3>
                  <p className="mt-2 text-xs text-[#F4EBE1]/70 leading-relaxed font-light">{tip.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={isEs ? "/es/aftercare" : "/aftercare"}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4A574] hover:text-white underline underline-offset-4 transition-colors"
            >
              <span>{isEs ? "Leer Guía Completa de Cuidados Post-Servicio →" : "Read Complete Aftercare Guide →"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D4A574]/15 py-8 text-center text-xs text-[#F4EBE1]/50">
        <p>IVA Nail Art NY · Winter Collection 2025/2026 · Bay Ridge, Brooklyn</p>
        <p className="mt-1 font-light">Official Instagram: @iva_nailart_nyc · +1 (929) 625-7273</p>
      </footer>

      <MobileBookingBar lang={lang} onBookClick={() => openBooking(isEs ? "Set de Invierno" : "Winter Holiday Set")} />
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        lang={lang}
        prefilledService={selectedService}
      />
    </div>
  );
}
