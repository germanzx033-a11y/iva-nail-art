"use client";

import { useState } from "react";
import { Sparkles, Clock, Check, ShieldCheck, ArrowRight } from "lucide-react";

export interface CoreService {
  id: string;
  name: string;
  nameEs: string;
  price: number;
  durationMin: number;
  description: string;
  descriptionEs: string;
  tag?: string;
}

export interface AddonService {
  id: string;
  name: string;
  nameEs: string;
  price: number;
  durationMin: number;
  description: string;
  descriptionEs: string;
}

const CORE_SERVICES: CoreService[] = [
  {
    id: "acrylic-fullset",
    name: "Sculpted Acrylic Full Set",
    nameEs: "Set Completo de Acrílico",
    price: 0,
    durationMin: 120,
    tag: "Especialidad Acrílico",
    description: "Full sculpted acrylic extensions tailored in length and shape (coffin, square, almond, stiletto) with perfect apex balance.",
    descriptionEs: "Extensiones completas esculpidas en acrílico con forma y largo a medida (coffin, square, almendra) y balance de ápice perfecto.",
  },
  {
    id: "russian-mani",
    name: "The Signature Russian Dry Mani",
    nameEs: "Manicura Rusa Signature",
    price: 0,
    durationMin: 90,
    tag: "Cuidado de Cutícula",
    description: "Deep e-file diamond bit cuticle clean, keratin strengthening, and high-gloss luxury finish on natural nails.",
    descriptionEs: "Limpieza profunda de cutícula con torno y fresas de diamante, refuerzo de queratina y esmaltado de alta gama.",
  },
  {
    id: "acrylic-refill",
    name: "Acrylic Refill & Apex Balance",
    nameEs: "Relleno & Mantenimiento Acrílico",
    price: 0,
    durationMin: 90,
    tag: "Mantenimiento",
    description: "Maintenance refill for existing acrylic sets, structural rebalancing, and seamless cuticle blend for 3-4 weeks durability.",
    descriptionEs: "Mantenimiento y relleno de tu set de acrílico, balance de estructura y renovación impecable para 3-4 semanas.",
  },
];

const ADDONS: AddonService[] = [
  {
    id: "art-tier-1",
    name: "Nail Art Tier 1 (Minimalist)",
    nameEs: "Nail Art Nivel 1 (Minimalista)",
    price: 0,
    durationMin: 20,
    description: "Glazed chrome finish, micro-french, isolated negative space lines (up to 4 nails).",
    descriptionEs: "Efecto cromo glaseado, micro-french o líneas de espacio negativo (hasta 4 uñas).",
  },
  {
    id: "art-tier-2",
    name: "Nail Art Tier 2 (Artisan Hand-Painted)",
    nameEs: "Nail Art Nivel 2 (Pintado a Mano)",
    price: 0,
    durationMin: 45,
    description: "Intricate botanicals, aura gradients, tortoiseshell, or multi-layered chromes across all 10 nails.",
    descriptionEs: "Diseños botánicos, degradados aura, carey o cromados multicapa en las 10 uñas.",
  },
  {
    id: "art-tier-3",
    name: "Nail Art Tier 3 (Haute Couture 3D)",
    nameEs: "Nail Art Nivel 3 (Haute Couture 3D)",
    price: 0,
    durationMin: 60,
    description: "3D sculpted gel textures, genuine Swarovski crystal clusters, metallic encapsulation.",
    descriptionEs: "Texturas 3D esculpidas, cristales Swarovski genuinos y encapsulados metálicos de pasarela.",
  },
  {
    id: "safe-removal",
    name: "Safe E-File Removal & Care",
    nameEs: "Retiro Seguro con Torno",
    price: 0,
    durationMin: 30,
    description: "Zero-damage gel/acrylic removal preserving full natural plate health.",
    descriptionEs: "Retiro cuidadoso sin acetona agresiva preservando el grosor y salud de la uña natural.",
  },
];

interface ServiceSelectorLuxuryProps {
  lang?: "en" | "es";
  onProceedToBooking?: (bookingSummary: {
    service: CoreService;
    addons: AddonService[];
    totalPrice: number;
    totalDurationMin: number;
    deposit: number;
  }) => void;
}

export default function ServiceSelectorLuxury({
  lang = "en",
  onProceedToBooking,
}: ServiceSelectorLuxuryProps) {
  const isEs = lang === "es";
  const [selectedService, setSelectedService] = useState<CoreService>(CORE_SERVICES[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Math Calculations
  const chosenAddons = ADDONS.filter((addon) => selectedAddons.includes(addon.id));
  const addonsTotal = chosenAddons.reduce((sum, item) => sum + item.price, 0);
  const addonsDuration = chosenAddons.reduce((sum, item) => sum + item.durationMin, 0);

  const totalPrice = selectedService.price + addonsTotal;
  const totalDuration = selectedService.durationMin + addonsDuration;
  const deposit = 35; // Standard non-refundable deposit

  const formatDuration = (min: number) => {
    const hours = Math.floor(min / 60);
    const remainingMin = min % 60;
    if (hours > 0 && remainingMin > 0) {
      return `${hours}h ${remainingMin}m`;
    }
    if (hours > 0) return `${hours}h`;
    return `${remainingMin} min`;
  };

  const handleBookingClick = () => {
    if (onProceedToBooking) {
      onProceedToBooking({
        service: selectedService,
        addons: chosenAddons,
        totalPrice,
        totalDurationMin: totalDuration,
        deposit,
      });
    } else {
      // Direct WhatsApp bridge with pre-filled luxury concierge message
      const addonNames = chosenAddons.map((a) => (isEs ? a.nameEs : a.name)).join(", ");
      const msg = encodeURIComponent(
        isEs
          ? `¡Hola Ivannía! ✨ Me encantaría consultar la cotización y reservar una cita en tu estudio:\n\n• Servicio Base: ${
              selectedService.nameEs
            }\n• Adicionales de Arte: ${addonNames || "Ninguno"}\n• Duración estimada: ~${formatDuration(
              totalDuration
            )}\n\n¿Me podrías confirmar la cotización para mi diseño y tus próximas fechas disponibles? ¡Muchas gracias! 💅🤍`
          : `Hello Ivannía! ✨ I would love to inquire about pricing and reserve a session at your Brooklyn atelier:\n\n• Foundational Service: ${
              selectedService.name
            }\n• Bespoke Art & Add-ons: ${addonNames || "None"}\n• Estimated Duration: ~${formatDuration(
              totalDuration
            )}\n\nCould you please let me know your custom quote and next available dates? Thank you! 💅🤍`
      );
      window.open(`https://wa.me/19296257273?text=${msg}`, "_blank");
    }
  };

  return (
    <section id="booking-calculator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C5A059] block mb-2">
          {isEs ? "Cotización Personalizada & Atelier Privado" : "Bespoke Atelier Consultation"}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#111111] tracking-tight mb-4">
          {isEs ? "Diseña tu Experiencia & Consulta tu Cita" : "Curate Your Atelier Experience"}
        </h2>
        <p className="text-sm md:text-base text-[#4A4A4A] font-light max-w-2xl mx-auto">
          {isEs
            ? "Cada set se cotiza de forma personalizada según el largo, estado de tus uñas y el diseño deseado. Selecciona tu servicio base y consulta tu cita directamente con Ivannía."
            : "Every set is uniquely crafted and quoted individually based on nail condition, length, and custom design. Select your service and inquire directly with Ivannía."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step 1 & 2: Services & Addons (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Foundation */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#111111] text-[#FAF8F5] text-xs font-serif flex items-center justify-center">
                1
              </span>
              <h3 className="text-lg sm:text-xl font-serif text-[#111111]">
                {isEs ? "Elige tu Servicio Base" : "Select Foundational Service"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CORE_SERVICES.map((srv) => {
                const isSelected = selectedService.id === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`relative p-5 rounded-xl cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#FAF8F5] border-[#C5A059] shadow-md ring-1 ring-[#C5A059]"
                        : "bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                    }`}
                  >
                    {srv.tag && (
                      <span className="inline-block self-start text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[#F4EBE1] text-[#111111] mb-2">
                        {srv.tag}
                      </span>
                    )}
                    <div>
                      <h4 className="text-base font-serif font-medium text-[#111111] mb-1">
                        {isEs ? srv.nameEs : srv.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-light leading-relaxed mb-4">
                        {isEs ? srv.descriptionEs : srv.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#C5A059]">
                        {isEs ? "Cotizar con Ivannía" : "Bespoke Quote"}
                      </span>
                      <span className="text-xs text-stone-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {srv.durationMin}m
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Add-ons */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#111111] text-[#FAF8F5] text-xs font-serif flex items-center justify-center">
                2
              </span>
              <h3 className="text-lg sm:text-xl font-serif text-[#111111]">
                {isEs ? "Añade Arte & Servicios Adicionales (Opcional)" : "Bespoke Art & Add-ons (Optional)"}
              </h3>
            </div>

            <div className="space-y-3">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border flex items-center justify-between gap-4 ${
                      isChecked
                        ? "bg-[#FAF8F5] border-[#C5A059] shadow-sm"
                        : "bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md mt-0.5 border flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-[#111111] border-[#111111] text-white"
                            : "border-stone-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#111111]">
                          {isEs ? addon.nameEs : addon.name}
                        </h4>
                        <p className="text-xs text-stone-500 font-light">
                          {isEs ? addon.descriptionEs : addon.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right whitespace-nowrap">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#C5A059] block">
                        {isEs ? "A Medida" : "Custom"}
                      </span>
                      <span className="text-[11px] text-stone-400">+{addon.durationMin} min</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 3: Summary & Reservation Card (4 cols) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#C5A059]/40 shadow-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A059] block mb-1">
              {isEs ? "Resumen de Cita" : "Reservation Estimate"}
            </span>
            <h3 className="text-2xl font-serif text-[#111111] mb-6">
              {isEs ? "Tu Experiencia" : "Your Session"}
            </h3>

            {/* Selected Breakdown */}
            <div className="space-y-3 pb-6 border-b border-stone-200 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-[#111111] font-medium">
                <span>{isEs ? selectedService.nameEs : selectedService.name}</span>
                <span className="text-xs text-[#C5A059] font-semibold">{isEs ? "Cotización personalizada" : "Bespoke quote"}</span>
              </div>

              {chosenAddons.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-stone-600">
                  <span className="line-clamp-1">{isEs ? item.nameEs : item.name}</span>
                  <span className="text-xs text-stone-400 font-medium">{isEs ? "Diseño a medida" : "Custom design"}</span>
                </div>
              ))}
            </div>

            {/* Time & Total */}
            <div className="py-5 border-b border-stone-200 space-y-2">
              <div className="flex justify-between items-center text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                  {isEs ? "Duración Estimada" : "Estimated Duration"}
                </span>
                <span className="font-medium text-[#111111]">{formatDuration(totalDuration)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm font-serif text-[#111111]">
                  {isEs ? "Tarifa Estimada" : "Pricing Policy"}
                </span>
                <span className="text-base sm:text-lg font-serif font-semibold text-[#111111]">
                  {isEs ? "A Consultar con Ivannía" : "Quote by Ivannía"}
                </span>
              </div>
            </div>

            {/* Deposit Callout */}
            <div className="my-5 p-3.5 rounded-xl bg-white/80 border border-[#C5A059]/30 text-xs text-stone-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-medium text-[#111111]">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>
                  {isEs ? "Reserva Exclusiva de Horario" : "Private Dedicated Slot"}
                </span>
              </div>
              <p className="text-[11px] font-light leading-relaxed text-stone-500">
                {isEs
                  ? "Cada diseño se cotiza según tu largo y arte. Un depósito de $35 confirma tu horario exclusivo de 2 a 3 horas y se descuenta de tu cita."
                  : "Every set is quoted personally based on your design. A $35 deposit confirms your exclusive 3-hour session and is credited toward your service."}
              </p>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleBookingClick}
              className="w-full py-4 px-6 rounded-xl bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>{isEs ? "Consultar Tarifa & Fechas por WhatsApp" : "Inquire for Quote & Dates on WhatsApp"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-stone-500 text-center">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>
                {isEs
                  ? "Atelier privado en Bay Ridge · Solo 2 a 3 clientas al día"
                  : "Private Bay Ridge atelier · Max 2-3 clients daily"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
