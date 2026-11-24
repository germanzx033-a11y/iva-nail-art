"use client";

import { useState } from "react";
import {
  MessageCircle,
  Copy,
  Check,
  Send,
  DollarSign,
  User,
  Phone,
  Sparkles,
  Calendar,
  Heart,
  RotateCcw,
} from "lucide-react";

// ==============================================================================
// CONSTANTS & TYPES
// ==============================================================================

export const STUDIO_WHATSAPP_NUMBER = "19296257273";
export const STUDIO_PHONE_DISPLAY = "+1 (929) 625-7273";
export const STUDIO_LOCATION = "Bay Ridge, Brooklyn, NY 11209";
export const STUDIO_DEPOSIT_DEFAULT = 35;

export const BASE_SERVICES = [
  "Acrílico esculpido",
  "Relleno",
  "Manicura rusa",
  "Gel estructurado",
] as const;

export const NAIL_LENGTHS = ["Corto", "Medio", "Largo", "XL"] as const;
export const ART_LEVELS = ["Minimalista", "Mano alzada", "3D/Cristales"] as const;
export const REMOVAL_OPTIONS = ["Sí", "No"] as const;

export type BaseService = (typeof BASE_SERVICES)[number];
export type NailLength = (typeof NAIL_LENGTHS)[number];
export type ArtLevel = (typeof ART_LEVELS)[number];
export type RemovalOption = (typeof REMOVAL_OPTIONS)[number];

export interface ExpressQuoteParams {
  clientName?: string;
  service: string;
  length: string;
  artLevel: string;
  removal: string;
  price: number | string;
}

export interface PostAppointmentMessageParams {
  clientName?: string;
  appointmentDate?: Date | string;
}

// ==============================================================================
// PURE GENERATOR FUNCTIONS (Matching R1 & R4 Contracts)
// ==============================================================================

/**
 * Generates formatted Luxury WhatsApp Quote according to R1 specification.
 * Strictly manual price input (no automated pricing calculation).
 */
export function generateExpressQuote({
  clientName,
  service,
  length,
  artLevel,
  removal,
  price,
}: ExpressQuoteParams) {
  const name = clientName && clientName.trim() ? clientName.trim() : "Bella";
  const numPrice = Number(price) || 0;
  const formattedPrice = `$${numPrice.toFixed(0)}`;

  const lines = [
    `✨ *IVA NAIL ART NY — Cotización Personalizada* ✨`,
    `Hola ${name}, un placer saludarte desde nuestro santuario privado en Bay Ridge. Aquí tienes el detalle de tu cotización:`,
    ``,
    `💅 *Servicio Base:* ${service}`,
    `📏 *Largo:* ${length}`,
    `🎨 *Nivel de Arte:* ${artLevel}`,
    `🔄 *Retiro Previo:* ${removal}`,
    `💎 *Total Estimado:* ${formattedPrice}`,
    ``,
    `📍 *Ubicación:* ${STUDIO_LOCATION}`,
    `💳 *Depósito para reservar:* $${STUDIO_DEPOSIT_DEFAULT} (se deduce de tu total)`,
    `⏱️ *Atención:* Exclusiva, 1 a 1 (máx. 2-3 citas al día)`,
    ``,
    `¿Te gustaría que te reservemos un espacio para esta semana? Confírmame para coordinar tu cita con Ivannía. 💖`,
  ];

  const text = lines.join("\n");
  const encodedText = encodeURIComponent(text);
  const waUrl = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodedText}`;

  return {
    rawText: text,
    waUrl,
    clientName: name,
    price: numPrice,
    formattedPrice,
  };
}

/**
 * Generates Post-Appointment 1-Click WhatsApp messages according to R4 specification.
 */
export function generatePostAppointmentMessage(
  type: "aftercare" | "review" | "refill",
  { clientName, appointmentDate }: PostAppointmentMessageParams = {}
) {
  const name = clientName && clientName.trim() ? clientName.trim() : "Bella";

  let lines: string[] = [];
  if (type === "aftercare") {
    lines = [
      `🌸 *Cuidados Posteriores — IVA Nail Art NY* 🌸`,
      `Hola ${name}, fue un honor tenerte en nuestro santuario privado hoy. Para que tu set permanezca impecable por 3-4 semanas:`,
      ``,
      `💧 Aplica aceite de cutícula diariamente para mantener el ápice flexible.`,
      `🧤 Usa guantes al manipular productos químicos o de limpieza.`,
      `🚫 No uses tus uñas como herramientas.`,
      ``,
      `📖 Encuentra nuestra guía completa de cuidados aquí:`,
      `https://ivanailart.com/aftercare`,
      ``,
      `¡Que disfrutes mucho tu set! ✨`,
    ];
  } else if (type === "review") {
    lines = [
      `⭐ *Tu Opinión Ilumina Nuestro Atelier* ⭐`,
      `Hola ${name}, ¡esperamos que estés fascinada con tus uñas!`,
      ``,
      `Como estudio privado en Bay Ridge, tu recomendación significa el mundo para nosotras. Si disfrutaste tu experiencia con Ivannía, ¿nos regalarías una reseña de 5 estrellas en Google Maps?`,
      ``,
      `🔗 Enlace directo para reseña:`,
      `https://maps.google.com/?cid=iva-nail-art-bay-ridge`,
      ``,
      `¡Muchísimas gracias por confiar en nuestro arte! 💖`,
    ];
  } else if (type === "refill") {
    const baseDate = appointmentDate ? new Date(appointmentDate) : new Date();
    const refillDate = new Date(baseDate.getTime() + 21 * 24 * 60 * 60 * 1000);
    const formattedRefillDate = refillDate.toLocaleDateString("es-ES", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    lines = [
      `💅 *Recordatorio de Mantenimiento — IVA Nail Art NY* 💅`,
      `Hola ${name}, esperamos que tus uñas sigan radiantes.`,
      ``,
      `Han pasado casi 3 semanas desde tu última cita. Para proteger la salud de tu uña natural y rebalancear la estructura y el ápice, recomendamos tu retoque alrededor de:`,
      `📅 *${formattedRefillDate}*`,
      ``,
      `¿Deseas asegurar tu cupo antes de que se llene la agenda de la semana? Escríbenos para agendar. ✨`,
    ];
  } else {
    throw new Error(`Unknown post-appointment type: ${type}`);
  }

  const text = lines.join("\n");
  const encodedText = encodeURIComponent(text);
  const waUrl = `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodedText}`;

  return { rawText: text, waUrl, clientName: name };
}

// ==============================================================================
// REACT COMPONENT: AdminQuoteBuilder
// ==============================================================================

interface AdminQuoteBuilderProps {
  onQuoteGenerated?: (quoteText: string) => void;
  className?: string;
}

export default function AdminQuoteBuilder({ className = "" }: AdminQuoteBuilderProps) {
  // Selector state
  const [service, setService] = useState<BaseService>("Acrílico esculpido");
  const [length, setLength] = useState<NailLength>("Medio");
  const [artLevel, setArtLevel] = useState<ArtLevel>("Minimalista");
  const [removal, setRemoval] = useState<RemovalOption>("No");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // Strictly manual price (NO auto-calculation)
  const [manualPrice, setManualPrice] = useState<string>("135");

  // Post-appointment appointment date (defaults to today)
  const [appointmentDate, setAppointmentDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });

  // UI state
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [copiedPostType, setCopiedPostType] = useState<string | null>(null);
  const [includePaymentDetails, setIncludePaymentDetails] = useState(false);

  // Clean phone number for destination
  const cleanPhone = clientPhone.replace(/\D/g, "");
  const normalizedPhone =
    cleanPhone.length === 10
      ? `1${cleanPhone}`
      : cleanPhone.length > 0
      ? cleanPhone
      : STUDIO_WHATSAPP_NUMBER;

  // Compute live quote
  const quoteResult = generateExpressQuote({
    clientName,
    service,
    length,
    artLevel,
    removal,
    price: manualPrice,
  });

  // Additional payment footer when toggle is enabled
  const fullQuoteText = includePaymentDetails
    ? `${quoteResult.rawText}\n\n💳 *Datos de Pago para Depósito:*\n• Zelle / Apple Pay: 929-625-7273 (Ivannia Rodriguez)\n• Venmo: @iva_nailart_nyc`
    : quoteResult.rawText;

  // Target WhatsApp link based on client's phone or studio default
  const quoteWaUrl = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(fullQuoteText)}`;

  // Copy handler
  const handleCopyQuote = async () => {
    try {
      await navigator.clipboard.writeText(fullQuoteText);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2500);
    } catch {
      // Ignore
    }
  };

  // Open WhatsApp handler
  const handleOpenWhatsAppQuote = () => {
    window.open(quoteWaUrl, "_blank", "noopener,noreferrer");
  };

  // Post-appointment actions
  const handleCopyPostMessage = async (type: "aftercare" | "review" | "refill") => {
    const msg = generatePostAppointmentMessage(type, {
      clientName,
      appointmentDate: appointmentDate ? new Date(appointmentDate) : new Date(),
    });
    try {
      await navigator.clipboard.writeText(msg.rawText);
      setCopiedPostType(type);
      setTimeout(() => setCopiedPostType(null), 2500);
    } catch {
      // Ignore
    }
  };

  const handleOpenWhatsAppPostMessage = (type: "aftercare" | "review" | "refill") => {
    const msg = generatePostAppointmentMessage(type, {
      clientName,
      appointmentDate: appointmentDate ? new Date(appointmentDate) : new Date(),
    });
    const url = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(msg.rawText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Reset to default
  const handleReset = () => {
    setService("Acrílico esculpido");
    setLength("Medio");
    setArtLevel("Minimalista");
    setRemoval("No");
    setClientName("");
    setClientPhone("");
    setManualPrice("135");
    setAppointmentDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ==================================================================== */}
      {/* HEADER / INTRO BANNER */}
      {/* ==================================================================== */}
      <div className="bg-gradient-to-br from-[#722F37] via-[#5A252C] to-[#3D1A1E] text-white p-6 sm:p-7 rounded-3xl shadow-xl shadow-[#722F37]/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#D4A574]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-[#E8C9A8] font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A574]" />
              <span>Cotizador Express & Mensajería Post-Cita</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-tight">
              Cotizador de Autor WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-white/75 mt-1 max-w-xl">
              Genera cotizaciones boutique personalizadas en 10 segundos y despacha mensajes post-servicio con 1 clic para Bay Ridge.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-all"
              title="Restablecer valores predeterminados"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>
            <a
              href="https://wa.me/19296257273"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-xs font-semibold text-white shadow-md shadow-emerald-900/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Abrir WhatsApp Web</span>
            </a>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MAIN BUILDER GRID */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: SELECTORS & PRICE INPUT (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EBE8E2] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE8E2]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#722F37]" />
                <h3 className="font-serif text-lg text-[#1A1A1A]">Parámetros de la Cotización</h3>
              </div>
              <span className="text-[11px] text-[#7A7A7A] bg-[#FAF9F7] px-2.5 py-1 rounded-full border border-[#EBE8E2]">
                5 Selectores Rápidos
              </span>
            </div>

            {/* Client Info Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                  Nombre de la Clienta
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A7A]" />
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. Camila Morales (o dejar en blanco)"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#FAF9F7] border border-[#EBE8E2] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#722F37]/20 focus:border-[#722F37] transition-all text-[#1A1A1A] placeholder:text-[#A3A3A3]"
                  />
                </div>
                <p className="text-[11px] text-[#7A7A7A] mt-1">Por defecto: &quot;Bella&quot;</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                  Teléfono / WhatsApp (Opcional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A7A]" />
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Ej. 929-625-7273"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#FAF9F7] border border-[#EBE8E2] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#722F37]/20 focus:border-[#722F37] transition-all text-[#1A1A1A] placeholder:text-[#A3A3A3]"
                  />
                </div>
                <p className="text-[11px] text-[#7A7A7A] mt-1">
                  Destino: {cleanPhone ? `+${normalizedPhone}` : `Estudio (+1 929-625-7273)`}
                </p>
              </div>
            </div>

            {/* Selector 1: Base Service */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-2">
                1. Servicio Base
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BASE_SERVICES.map((s) => {
                  const active = service === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setService(s)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        active
                          ? "bg-[#722F37] text-white border-[#722F37] shadow-sm shadow-[#722F37]/20 font-semibold"
                          : "bg-[#FAF9F7] text-[#1A1A1A] border-[#EBE8E2] hover:bg-white hover:border-[#722F37]/30"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector 2: Nail Length */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-2">
                2. Largo de Uña
              </label>
              <div className="grid grid-cols-4 gap-2">
                {NAIL_LENGTHS.map((l) => {
                  const active = length === l;
                  return (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLength(l)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        active
                          ? "bg-[#722F37] text-white border-[#722F37] shadow-sm shadow-[#722F37]/20 font-semibold"
                          : "bg-[#FAF9F7] text-[#1A1A1A] border-[#EBE8E2] hover:bg-white hover:border-[#722F37]/30"
                      }`}
                    >
                      {l}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector 3: Art Level */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-2">
                3. Nivel de Arte
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ART_LEVELS.map((a) => {
                  const active = artLevel === a;
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setArtLevel(a)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        active
                          ? "bg-[#722F37] text-white border-[#722F37] shadow-sm shadow-[#722F37]/20 font-semibold"
                          : "bg-[#FAF9F7] text-[#1A1A1A] border-[#EBE8E2] hover:bg-white hover:border-[#722F37]/30"
                      }`}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector 4: Previous Removal */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-2">
                4. Retiro Previo de Producto
              </label>
              <div className="grid grid-cols-2 gap-2">
                {REMOVAL_OPTIONS.map((r) => {
                  const active = removal === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRemoval(r)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        active
                          ? "bg-[#722F37] text-white border-[#722F37] shadow-sm shadow-[#722F37]/20 font-semibold"
                          : "bg-[#FAF9F7] text-[#1A1A1A] border-[#EBE8E2] hover:bg-white hover:border-[#722F37]/30"
                      }`}
                    >
                      {r === "Sí" ? "Sí (Retiro seguro con fresas)" : "No (Uñas limpias/naturales)"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Field: STRICTLY MANUAL */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50/60 to-[#FAF9F7] border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-amber-700" />
                  <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wide">
                    Precio Final de la Cotización (Manual)
                  </label>
                </div>
                <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Exclusivo Ivannía
                </span>
              </div>
              <p className="text-xs text-[#7A7A7A] mb-3">
                Sin cálculo automático de precio. Ingresa el monto en dólares acordado para el set.
              </p>
              <div className="relative max-w-xs">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-serif font-bold text-[#722F37]">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={manualPrice}
                  onChange={(e) => setManualPrice(e.target.value)}
                  placeholder="Ej. 135"
                  className="w-full pl-8 pr-12 py-2.5 text-base font-serif font-bold text-[#1A1A1A] bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#722F37]/20 focus:border-[#722F37] transition-all"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#7A7A7A]">
                  USD
                </span>
              </div>
            </div>

            {/* Extra Options */}
            <div className="flex items-center justify-between pt-2 text-xs">
              <label className="inline-flex items-center gap-2 cursor-pointer text-[#1A1A1A]">
                <input
                  type="checkbox"
                  checked={includePaymentDetails}
                  onChange={(e) => setIncludePaymentDetails(e.target.checked)}
                  className="rounded border-[#EBE8E2] text-[#722F37] focus:ring-[#722F37]/20"
                />
                <span>Incluir datos bancarios de depósito (Zelle, Apple Pay, Venmo)</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW & 1-CLICK ACTIONS (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EBE8E2] shadow-sm flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EBE8E2] mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-serif text-lg text-[#1A1A1A]">Mensaje Listo para Enviar</h3>
                </div>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                  WhatsApp Preview
                </span>
              </div>

              {/* Message Preview Box */}
              <div className="bg-[#FAF9F7] border border-[#EBE8E2] rounded-xl p-4 text-xs font-mono text-[#1A1A1A] whitespace-pre-wrap leading-relaxed max-h-[360px] overflow-y-auto selection:bg-[#722F37] selection:text-white">
                {fullQuoteText}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#7A7A7A] mt-2 px-1">
                <span>{fullQuoteText.length} caracteres</span>
                <span>Destino: {cleanPhone ? `+${normalizedPhone}` : `+1 (929) 625-7273`}</span>
              </div>
            </div>

            {/* 1-Click Action Buttons */}
            <div className="pt-5 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1-Click Copy */}
                <button
                  type="button"
                  onClick={handleCopyQuote}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                    copiedQuote
                      ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm"
                      : "bg-[#FAF9F7] hover:bg-[#F0EDE8] border-[#EBE8E2] text-[#1A1A1A] hover:shadow-sm"
                  }`}
                >
                  {copiedQuote ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>¡Cotización Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#7A7A7A]" />
                      <span>Copiar Cotización</span>
                    </>
                  )}
                </button>

                {/* 1-Click Open WhatsApp */}
                <button
                  type="button"
                  onClick={handleOpenWhatsAppQuote}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-md shadow-emerald-700/20 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Abrir en WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[#7A7A7A]">
                Presiona para copiar al portapapeles o enviar directamente al chat de la clienta.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* R4: POST-APPOINTMENT 1-CLICK ACTION MESSAGES */}
      {/* ==================================================================== */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-[#EBE8E2] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EBE8E2]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#722F37] border border-rose-200 text-xs font-semibold mb-1.5">
              <Heart className="w-3.5 h-3.5 text-[#722F37]" />
              <span>Fidelización & Retención (R4)</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A]">
              Mensajes Post-Cita con 1 Clic
            </h3>
            <p className="text-xs sm:text-sm text-[#7A7A7A] mt-0.5">
              Tres acciones indispensables para enviar después de cada sesión privada en el santuario.
            </p>
          </div>

          {/* Appointment Date Picker for Refill calculation */}
          <div className="flex items-center gap-2 bg-[#FAF9F7] px-3.5 py-2 rounded-xl border border-[#EBE8E2]">
            <Calendar className="w-4 h-4 text-[#722F37]" />
            <div className="text-left">
              <span className="block text-[10px] uppercase font-bold text-[#7A7A7A]">Fecha de la Cita:</span>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="text-xs bg-transparent border-0 p-0 text-[#1A1A1A] font-semibold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3 Post-Appointment Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Action 1: Cuidados Post-Servicio */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FAF9F7] to-white border border-[#EBE8E2] flex flex-col justify-between hover:border-[#722F37]/30 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-rose-100 text-[#722F37] flex items-center justify-center font-bold">
                  🌸
                </span>
                <span className="text-[10px] uppercase font-bold text-[#722F37] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  Cuidados
                </span>
              </div>
              <h4 className="font-serif text-base text-[#1A1A1A] font-bold">
                1. Cuidados Post-Servicio
              </h4>
              <p className="text-xs text-[#7A7A7A] mt-1.5 leading-relaxed">
                Envía la guía editorial de cuidado para asegurar 3-4 semanas de duración impecable con enlace a{" "}
                <code className="text-[#722F37] bg-rose-50 px-1 py-0.5 rounded font-mono text-[10px]">
                  /aftercare
                </code>.
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyPostMessage("aftercare")}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    copiedPostType === "aftercare"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-white hover:bg-[#FAF9F7] text-[#1A1A1A] border-[#EBE8E2]"
                  }`}
                >
                  {copiedPostType === "aftercare" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#7A7A7A]" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenWhatsAppPostMessage("aftercare")}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action 2: Solicitud de Reseña Google 5 Estrellas */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FAF9F7] to-white border border-[#EBE8E2] flex flex-col justify-between hover:border-amber-400 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  ⭐
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Google Maps
                </span>
              </div>
              <h4 className="font-serif text-base text-[#1A1A1A] font-bold">
                2. Reseña en Google Maps 5★
              </h4>
              <p className="text-xs text-[#7A7A7A] mt-1.5 leading-relaxed">
                Solicita una reseña de 5 estrellas para el atelier de Bay Ridge con enlace directo para disparar el SEO local.
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyPostMessage("review")}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    copiedPostType === "review"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-white hover:bg-[#FAF9F7] text-[#1A1A1A] border-[#EBE8E2]"
                  }`}
                >
                  {copiedPostType === "review" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#7A7A7A]" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenWhatsAppPostMessage("review")}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action 3: Recordatorio de Relleno (3 Semanas) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FAF9F7] to-white border border-[#EBE8E2] flex flex-col justify-between hover:border-purple-300 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                  💅
                </span>
                <span className="text-[10px] uppercase font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                  Retoque 21 Días
                </span>
              </div>
              <h4 className="font-serif text-base text-[#1A1A1A] font-bold">
                3. Recordatorio de Relleno (3 Semanas)
              </h4>
              <p className="text-xs text-[#7A7A7A] mt-1.5 leading-relaxed">
                Explica el desplazamiento del ápice y la palanca sobre la uña natural para incentivar la reserva a tiempo.
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyPostMessage("refill")}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    copiedPostType === "refill"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-white hover:bg-[#FAF9F7] text-[#1A1A1A] border-[#EBE8E2]"
                  }`}
                >
                  {copiedPostType === "refill" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#7A7A7A]" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenWhatsAppPostMessage("refill")}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
