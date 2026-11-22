"use client";

import { useEffect, useState } from "react";
import { X, Calendar, MessageCircle, Instagram, ShieldCheck, Clock, Sparkles } from "lucide-react";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: "en" | "es";
  prefilledService?: string;
}

export default function CalendlyModal({
  isOpen,
  onClose,
  lang = "en",
  prefilledService = "",
}: CalendlyModalProps) {
  const [mounted, setMounted] = useState(false);
  const calendlyBaseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/iva_nailart_nyc";
  const whatsappUrl = "https://wa.me/19296257273";
  const instagramDmUrl = "https://ig.me/m/iva_nailart_nyc";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const encodedService = encodeURIComponent(prefilledService || (lang === "en" ? "Custom Nail Session" : "Sesión de Nail Art"));
  const fullCalendlyUrl = `${calendlyBaseUrl}?text_color=F4EBE1&primary_color=D4A574&background_color=0E0706&a1=${encodedService}`;

  const t = {
    en: {
      title: "Reserve Your Private Studio Session",
      subtitle: "One-on-one attention with Iva in Bay Ridge, Brooklyn.",
      selectedService: "Selected Service",
      depositNotice: "A $35 deposit confirms and locks in your date. Handled securely via Zelle, Apple Pay, or Venmo after booking.",
      openInCalendly: "Open Scheduling Calendar",
      directMessageOptions: "Prefer to book directly with Iva?",
      dmInstagram: "Chat on Instagram",
      dmWhatsApp: "Chat on WhatsApp",
      policies: "Max 3 clients daily · Hospital-grade sterilization · 24h cancellation notice required",
    },
    es: {
      title: "Reserva Tu Sesión en Estudio Privado",
      subtitle: "Atención exclusiva uno a uno con Iva en Bay Ridge, Brooklyn.",
      selectedService: "Servicio Seleccionado",
      depositNotice: "Un depósito de $35 confirma y aparta tu fecha. Se abona de forma segura por Zelle, Apple Pay o Venmo tras elegir tu horario.",
      openInCalendly: "Abrir Calendario de Citas",
      directMessageOptions: "¿Prefieres coordinar directamente con Iva?",
      dmInstagram: "Escribir por Instagram",
      dmWhatsApp: "Escribir por WhatsApp",
      policies: "Máximo 3 clientas al día · Esterilización médica · 24h de anticipación para cancelaciones",
    },
  }[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0E0706] border border-[#D4A574]/40 rounded-3xl shadow-[0_25px_70px_rgba(212,165,116,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
      >
        {/* Header */}
        <div className="relative p-6 sm:p-8 border-b border-[#F4EBE1]/10 bg-gradient-to-b from-[#1A0F0D] to-[#0E0706]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[#F4EBE1]/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#D4A574] text-xs uppercase tracking-[0.25em] font-medium mb-2">
            <Sparkles className="w-4 h-4" />
            <span>IVA NAIL ART NY · BAY RIDGE</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EBE1] font-light italic">
            {t.title}
          </h3>
          <p className="text-sm text-[#F4EBE1]/70 mt-1">
            {t.subtitle}
          </p>

          {prefilledService && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A574]/15 border border-[#D4A574]/30 text-xs text-[#E8C9A8]">
              <span className="text-[#F4EBE1]/60">{t.selectedService}:</span>
              <span className="font-semibold">{prefilledService}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* Deposit Alert */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#1A0F0D]/90 border border-[#D4A574]/25">
            <ShieldCheck className="w-6 h-6 text-[#D4A574] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#F4EBE1]/85 leading-relaxed">
              {t.depositNotice}
            </div>
          </div>

          {/* Primary Action: Calendly Embedded / Direct Button */}
          <div className="text-center pt-2">
            <a
              href={fullCalendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-4 px-8 rounded-full bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#D4A574] text-[#0E0706] text-base font-semibold tracking-wide shadow-lg hover:brightness-110 hover:scale-[1.01] transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span>{t.openInCalendly}</span>
            </a>
            <p className="text-[0.75rem] text-[#F4EBE1]/50 mt-2 flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Calendly · ivanailartny.com</span>
            </p>
          </div>

          {/* Direct channels */}
          <div className="pt-4 border-t border-[#F4EBE1]/10">
            <p className="text-xs text-center text-[#F4EBE1]/70 mb-4 uppercase tracking-wider">
              {t.directMessageOptions}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#F4EBE1] text-xs font-medium hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{t.dmWhatsApp}</span>
              </a>

              <a
                href={instagramDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-full border border-[#E1306C]/40 bg-[#E1306C]/10 text-[#F4EBE1] text-xs font-medium hover:bg-[#E1306C]/20 transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>{t.dmInstagram}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#140B0A] border-t border-[#F4EBE1]/10 text-center">
          <p className="text-[0.7rem] text-[#F4EBE1]/50">
            {t.policies}
          </p>
        </div>
      </div>
    </div>
  );
}
