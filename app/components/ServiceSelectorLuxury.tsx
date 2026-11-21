"use client";

import { useState } from "react";
import { Sparkles, Clock, Check, ShieldCheck, ArrowRight, Info } from "lucide-react";

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
    id: "russian-mani",
    name: "The Signature Russian Dry Mani",
    nameEs: "Manicura Rusa Signature",
    price: 110,
    durationMin: 90,
    tag: "Most Requested",
    description: "Deep e-file cuticle clean, keratin strengthening base coat, flawless single-tone luxury finish.",
    descriptionEs: "Limpieza profunda de cutícula con torno, base de queratina y esmaltado de alta gama de larga duración.",
  },
  {
    id: "builder-gel-biab",
    name: "Aureate Structured Gel (BIAB)",
    nameEs: "Gel Estructurado BIAB",
    price: 130,
    durationMin: 105,
    tag: "Natural Strength",
    description: "Reinforces brittle nails with flexible multi-layer builder gel; promotes 3-4 weeks natural nail growth.",
    descriptionEs: "Refuerzo para uñas naturales con gel constructor flexible; promueve el crecimiento sin quiebres por 3-4 semanas.",
  },
  {
    id: "gel-x-extensions",
    name: "Apothecary Full Set Gel-X",
    nameEs: "Extensiones Gel-X Completas",
    price: 150,
    durationMin: 120,
    tag: "Editorial Length",
    description: "100% soft gel extension sculpted to perfection. Odorless, zero damage, tailored almond/coffin/square shapes.",
    descriptionEs: "Extensiones 100% gel suave sin químicos agresivos ni daño a la uña natural en forma personalizada.",
  },
];

const ADDONS: AddonService[] = [
  {
    id: "art-tier-1",
    name: "Nail Art Tier 1 (Minimalist)",
    nameEs: "Nail Art Nivel 1 (Minimalista)",
    price: 30,
    durationMin: 20,
    description: "Glazed chrome finish, micro-french, isolated negative space lines (up to 4 nails).",
    descriptionEs: "Efecto cromo glaseado, micro-french o líneas de espacio negativo (hasta 4 uñas).",
  },
  {
    id: "art-tier-2",
    name: "Nail Art Tier 2 (Artisan Hand-Painted)",
    nameEs: "Nail Art Nivel 2 (Pintado a Mano)",
    price: 65,
    durationMin: 45,
    description: "Intricate botanicals, aura gradients, tortoiseshell, or multi-layered chromes across all 10 nails.",
    descriptionEs: "Diseños botánicos, degradados aura, carey o cromados multicapa en las 10 uñas.",
  },
  {
    id: "art-tier-3",
    name: "Nail Art Tier 3 (Haute Couture 3D)",
    nameEs: "Nail Art Nivel 3 (Haute Couture 3D)",
    price: 95,
    durationMin: 60,
    description: "3D sculpted gel textures, genuine Swarovski crystal clusters, metallic encapsulation.",
    descriptionEs: "Texturas 3D esculpidas, cristales Swarovski genuinos y encapsulados metálicos de pasarela.",
  },
  {
    id: "safe-removal",
    name: "Safe E-File Removal & Care",
    nameEs: "Retiro Seguro con Torno",
    price: 35,
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
        `Hello IVA Atelier Brooklyn! ✨ I would love to reserve an appointment:\n\n• Primary Service: ${
          isEs ? selectedService.nameEs : selectedService.name
        } ($${selectedService.price})\n• Add-ons: ${addonNames || "None"}\n• Estimated Total: $${totalPrice} (~${formatDuration(
          totalDuration
        )})\n• Deposit: $35 Non-refundable\n\nPlease let me know your next available dates!`
      );
      window.open(`https://wa.me/19296257273?text=${msg}`, "_blank");
    }
  };

  return (
    <section id="booking-calculator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C5A059] block mb-2">
          {isEs ? "Tarifario Transparente & Personalizado" : "Transparent Haute Pricing"}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#111111] tracking-tight mb-4">
          {isEs ? "Diseña tu Experiencia & Cita" : "Curate Your Atelier Experience"}
        </h2>
        <p className="text-sm md:text-base text-[#4A4A4A] font-light max-w-2xl mx-auto">
          {isEs
            ? "Selecciona tu servicio principal y añade los niveles de arte que desees. Calculamos en tiempo real el tiempo y valor de tu sesión."
            : "Select your foundational service and bespoke design tiers. We reserve dedicated 3 to 4-hour appointments with zero rushing."}
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
                      <span className="text-base font-serif font-semibold text-[#111111]">
                        ${srv.price}
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
                      <span className="text-sm font-semibold text-[#111111] block">
                        +${addon.price}
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
                <span>${selectedService.price}</span>
              </div>

              {chosenAddons.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-stone-600">
                  <span className="line-clamp-1">{isEs ? item.nameEs : item.name}</span>
                  <span>+${item.price}</span>
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
                  {isEs ? "Inversión Total" : "Estimated Total"}
                </span>
                <span className="text-3xl font-serif font-semibold text-[#111111]">
                  ${totalPrice}
                </span>
              </div>
            </div>

            {/* Deposit Callout */}
            <div className="my-5 p-3.5 rounded-xl bg-white/80 border border-[#C5A059]/30 text-xs text-stone-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-medium text-[#111111]">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>
                  {isEs ? `Depósito de Reserva: $${deposit}` : `Required Deposit: $${deposit}`}
                </span>
              </div>
              <p className="text-[11px] font-light leading-relaxed text-stone-500">
                {isEs
                  ? "Deducible del total el día de tu cita. Protege tu bloque exclusivo de 3-4 horas sin prisas."
                  : "Deducted from your final total upon service. Guarantees your private 4-hour session."}
              </p>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleBookingClick}
              className="w-full py-4 px-6 rounded-xl bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] font-medium text-sm tracking-wide transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>{isEs ? "Asegurar Fecha con Depósito" : "Lock Slot with $35 Deposit"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-stone-500 text-center">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>
                {isEs
                  ? "Máximo 3 citas privadas por día en Brooklyn"
                  : "Strict limit of 3 private clients daily"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
