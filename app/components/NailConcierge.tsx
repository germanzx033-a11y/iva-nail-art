"use client";

import { useState } from "react";
import { Sparkles, Compass, ArrowRight, Loader2, RefreshCw } from "lucide-react";

export interface ConciergeRecommendation {
  serviceName: string;
  artTierName: string;
  estimatedPrice: number;
  curatorEditorialNote: string;
  designConcept?: string;
}

interface NailConciergeProps {
  lang?: "en" | "es";
  onApplyRecommendation?: (rec: ConciergeRecommendation) => void;
}

export default function NailConcierge({
  lang = "en",
  onApplyRecommendation,
}: NailConciergeProps) {
  const isEs = lang === "es";

  const [occasion, setOccasion] = useState("");
  const [preferredLength] = useState<"short" | "medium" | "long" | "any">("any");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<ConciergeRecommendation | null>(null);

  const presets = [
    { label: isEs ? "Boda / Novia" : "Bridal / Wedding", value: "Bridal ceremony & reception" },
    { label: isEs ? "Gala / Noche NYC" : "NYC Gala / Fashion Event", value: "Black-tie evening gala in Manhattan" },
    { label: isEs ? "Chic Ejecutivo" : "Executive Minimalist", value: "Clean professional executive meeting" },
    { label: isEs ? "Fin de semana Chic" : "Hamptons Weekend", value: "Casual luxury weekend getaway" },
  ];

  const handleConsult = async (presetOccasion?: string) => {
    const targetOccasion = presetOccasion || occasion;
    if (!targetOccasion.trim()) return;

    setIsLoading(true);
    setRecommendation(null);

    try {
      const res = await fetch("/api/ai/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          occasion: targetOccasion,
          preferredLength,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setRecommendation(data.recommendation);
      }
    } catch (err) {
      console.error("Consultation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-concierge" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-[#111111] to-[#1f1f1f] text-[#FAF8F5] rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl border border-[#C5A059]/40 relative overflow-hidden">
        {/* Decorative Golden Ambient Blur */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#C5A059]/40 text-[#EAD8B1] text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isEs ? "Estilista IA Privada" : "Haute AI Nail Concierge"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-3">
            {isEs ? "¿No estás segura de qué elegir?" : "Bespoke Styling Consultation"}
          </h2>
          <p className="text-xs sm:text-sm font-light text-stone-300 leading-relaxed">
            {isEs
              ? "Cuéntale a nuestra IA la ocasión, evento o vibra de tu próxima salida en Nueva York y te formularemos la combinación perfecta de técnica y diseño."
              : "Share your upcoming event, attire, or aesthetic vision. Our atelier intelligence formulates your ideal service, nail art tier, and appointment duration."}
          </p>
        </div>

        {/* Input Interface */}
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          {/* Quick Preset Buttons */}
          <div>
            <label className="text-[11px] uppercase tracking-wider text-stone-400 block mb-2 font-medium">
              {isEs ? "Ocasiones Populares" : "Select Occasion or Type Below"}
            </label>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => {
                    setOccasion(preset.value);
                    handleConsult(preset.value);
                  }}
                  className={`text-xs px-3.5 py-2 rounded-full border transition-all duration-300 ${
                    occasion === preset.value
                      ? "bg-[#C5A059] text-[#111111] border-[#C5A059] font-medium"
                      : "bg-white/5 border-white/10 text-stone-300 hover:border-[#C5A059]/50 hover:bg-white/10"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder={
                isEs
                  ? "Ej: Cena en Soho con vestido negro y accesorios dorados..."
                  : "e.g. Gallery opening in Chelsea, silk cream suit, fine jewelry..."
              }
              className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-400 text-base focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
            />

            <button
              onClick={() => handleConsult()}
              disabled={isLoading || !occasion.trim()}
              className="px-6 py-3.5 rounded-xl bg-[#C5A059] hover:bg-[#EAD8B1] disabled:opacity-50 text-[#111111] font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg min-h-[48px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isEs ? "Curando..." : "Consulting..."}</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>{isEs ? "Formular Estilo" : "Consult Concierge"}</span>
                </>
              )}
            </button>
          </div>

          {/* Recommendation Output */}
          {recommendation && (
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] text-[#111111] border border-[#C5A059] shadow-xl animate-in fade-in-50 duration-500">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                    {isEs ? "Recomendación Editorial" : "Atelier Recommendation"}
                  </span>
                  <h3 className="text-xl font-serif font-semibold text-[#111111]">
                    {recommendation.designConcept}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 block">Est. Investment</span>
                  <span className="text-xl font-serif font-bold text-[#111111]">
                    ${recommendation.estimatedPrice}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                <div className="p-3 rounded-lg bg-stone-100/80">
                  <span className="text-stone-500 block mb-0.5">Base Technique</span>
                  <span className="font-semibold text-stone-900">{recommendation.serviceName}</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-100/80">
                  <span className="text-stone-500 block mb-0.5">Art Complexity</span>
                  <span className="font-semibold text-stone-900">{recommendation.artTierName}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-light italic mb-6 leading-relaxed bg-[#F4EBE1]/60 p-3.5 rounded-xl border border-stone-200">
                &ldquo;{recommendation.curatorEditorialNote}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#booking-calculator"
                  onClick={() => {
                    if (onApplyRecommendation) onApplyRecommendation(recommendation);
                  }}
                  className="flex-1 py-3 px-5 rounded-xl bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-xs sm:text-sm font-medium tracking-wide transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>{isEs ? "Aplicar esta Combinación a mi Reserva" : "Apply to My Reservation"}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => handleConsult()}
                  className="py-3 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{isEs ? "Re-consultar" : "Regenerate"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
