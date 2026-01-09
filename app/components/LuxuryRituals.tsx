"use client";

import { useState } from "react";
import { Shield, Wind, Leaf, Heart, Clock, Sparkles, Check, ChevronRight, Star } from "lucide-react";
import { LUXURY_RITUALS, ADD_ONS, WELLNESS_BUNDLES, SCARCITY_CTAS, type LuxuryRitual, type AddOn, type WellnessBundle } from "../constants/luxuryRituals";

interface LuxuryRitualsProps {
  language: "en" | "es";
  onBookRitual?: (ritual: LuxuryRitual, addOns?: AddOn[]) => void;
}

const categoryIcons = {
  signature: Sparkles,
  wellness: Leaf,
};

const categoryColors = {
  signature: "from-[#B76E79] to-[#722F37]",
  wellness: "from-[#8B9A7D] to-[#5C6B4F]",
};

export default function LuxuryRituals({ language, onBookRitual }: LuxuryRitualsProps) {
  const [selectedRitual, setSelectedRitual] = useState<LuxuryRitual | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [showBundles, setShowBundles] = useState(false);

  const isEn = language === "en";

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    if (!selectedRitual) return 0;
    const ritualPrice = selectedRitual.priceMin;
    const addOnsPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = ADD_ONS.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    return ritualPrice + addOnsPrice;
  };

  const handleBook = () => {
    if (selectedRitual && onBookRitual) {
      const selectedAddOnObjects = ADD_ONS.filter(a => selectedAddOns.includes(a.id));
      onBookRitual(selectedRitual, selectedAddOnObjects);
    }
  };

  return (
    <section id="rituals" className="py-16 md:py-24 px-6 md:px-8 bg-gradient-to-b from-[#FAF9F7] to-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#B76E79]/10 to-[#722F37]/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#722F37]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#722F37] font-medium">
              {isEn ? "Wellness Rituals" : "Rituales de Bienestar"}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#0D0D0D] mb-4">
            {isEn ? "Luxury Health Rituals" : "Rituales de Lujo y Salud"}
          </h2>
          <p className="text-[#3D3D3D] leading-relaxed">
            {isEn
              ? "Each ritual is a complete wellness experience. Not just nail care—a sanctuary for your biology."
              : "Cada ritual es una experiencia de bienestar completa. No solo cuidado de uñas—un santuario para tu biología."}
          </p>
        </div>

        {/* Scarcity Banner */}
        <div className="bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white px-6 py-4 rounded-xl mb-10 text-center">
          <p className="text-sm md:text-base font-medium">
            {isEn ? SCARCITY_CTAS.en.web : SCARCITY_CTAS.es.web}
          </p>
          <p className="text-xs text-white mt-1">
            {isEn ? SCARCITY_CTAS.en.urgency : SCARCITY_CTAS.es.urgency}
          </p>
        </div>

        {/* Rituals Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {LUXURY_RITUALS.map((ritual) => {
            const Icon = categoryIcons[ritual.category];
            const isSelected = selectedRitual?.id === ritual.id;

            return (
              <div
                key={ritual.id}
                onClick={() => setSelectedRitual(ritual)}
                className={`relative group cursor-pointer bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden
                  ${isSelected
                    ? "border-[#722F37] shadow-xl scale-[1.02]"
                    : "border-[#EDE9E3] hover:border-[#B76E79]/50 hover:shadow-lg"}`}
              >
                {/* Featured Badge */}
                {ritual.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`text-[10px] uppercase tracking-wider text-white px-3 py-1.5 rounded-full bg-gradient-to-r ${categoryColors[ritual.category]}`}>
                      {isEn ? "Popular" : "Popular"}
                    </span>
                  </div>
                )}

                {/* Category Header */}
                <div className={`bg-gradient-to-r ${categoryColors[ritual.category]} px-6 py-4`}>
                  <div className="flex items-center gap-2 text-white/90 mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">
                      {isEn ? ritual.tagline : ritual.taglineEs}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-white">
                    {isEn ? ritual.name : ritual.nameEs}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Price & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-serif text-2xl md:text-3xl text-[#722F37]">
                        ${ritual.priceMin}
                      </span>
                      {ritual.priceMax > ritual.priceMin && (
                        <span className="text-[#B76E79] text-lg"> - ${ritual.priceMax}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[#6B6B6B]">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{ritual.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#3D3D3D] leading-relaxed mb-4">
                    {isEn ? ritual.description : ritual.descriptionEs}
                  </p>

                  {/* Trends */}
                  {ritual.trends && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {ritual.trends.map((trend, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-wider text-[#8C6239] bg-[#8C6239]/10 px-2 py-1 rounded-full">
                          {trend}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Includes Preview */}
                  <div className="space-y-2 mb-4">
                    {(isEn ? ritual.includes : ritual.includesEs).slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                        <Check className="w-4 h-4 text-[#B76E79] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                    {(isEn ? ritual.includes : ritual.includesEs).length > 3 && (
                      <p className="text-xs text-[#B76E79] pl-6">
                        +{(isEn ? ritual.includes : ritual.includesEs).length - 3} {isEn ? "more included" : "más incluidos"}
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <button className={`w-full py-3 rounded-lg text-sm uppercase tracking-wider font-medium transition-all
                    ${isSelected
                      ? "bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white"
                      : "bg-[#F5F3F0] text-[#722F37] group-hover:bg-gradient-to-r group-hover:from-[#722F37] group-hover:to-[#8B3A44] group-hover:text-white"}`}
                  >
                    {isSelected ? (isEn ? "Selected" : "Seleccionado") : (isEn ? "Select Ritual" : "Seleccionar")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Ritual Details & Add-ons */}
        {selectedRitual && (
          <div className="bg-white rounded-2xl border border-[#EDE9E3] p-6 md:p-8 mb-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Full Includes List */}
              <div>
                <h4 className="font-serif text-xl text-[#0D0D0D] mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#B76E79]" />
                  {isEn ? "Your Ritual Includes" : "Tu Ritual Incluye"}
                </h4>
                <div className="space-y-3">
                  {(isEn ? selectedRitual.includes : selectedRitual.includesEs).map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-[#3D3D3D]">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#722F37]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h4 className="font-serif text-xl text-[#0D0D0D] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#8C6239]" />
                  {isEn ? "Enhance Your Experience" : "Mejora Tu Experiencia"}
                </h4>
                <div className="space-y-3">
                  {ADD_ONS.map((addOn) => (
                    <button
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all
                        ${selectedAddOns.includes(addOn.id)
                          ? "border-[#8C6239] bg-[#8C6239]/5"
                          : "border-[#EDE9E3] hover:border-[#8C6239]/50"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[#0D0D0D]">
                            {isEn ? addOn.name : addOn.nameEs}
                          </p>
                          <p className="text-xs text-[#6B6B6B] mt-0.5">
                            {isEn ? addOn.description : addOn.descriptionEs}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="font-serif text-lg text-[#8C6239]">+${addOn.price}</p>
                          <p className="text-[10px] text-[#6B6B6B]">{addOn.duration}</p>
                        </div>
                      </div>
                      {selectedAddOns.includes(addOn.id) && (
                        <div className="mt-2 pt-2 border-t border-[#8C6239]/20">
                          <span className="text-xs text-[#8C6239] font-medium uppercase tracking-wider">
                            {isEn ? "Added" : "Agregado"}
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Total & Book */}
            <div className="mt-8 pt-6 border-t border-[#EDE9E3] flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[#6B6B6B] mb-1">
                  {isEn ? "Your Experience Total" : "Total de Tu Experiencia"}
                </p>
                <p className="font-serif text-3xl text-[#0D0D0D]">
                  ${calculateTotal()}
                  <span className="text-lg text-[#6B6B6B] ml-2">
                    ({selectedRitual.duration})
                  </span>
                </p>
              </div>
              <button
                onClick={handleBook}
                className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white text-sm uppercase tracking-[0.15em] rounded-lg hover:from-[#8B3A44] hover:to-[#A04550] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isEn ? SCARCITY_CTAS.en.webButton : SCARCITY_CTAS.es.webButton}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Wellness Bundles */}
        <div className="mt-12">
          <button
            onClick={() => setShowBundles(!showBundles)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#F5EDE8] to-[#FAF9F7] rounded-xl border border-[#EDE9E3] hover:border-[#B76E79]/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B76E79] to-[#722F37] flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-serif text-lg text-[#0D0D0D]">
                  {isEn ? "Wellness Bundles" : "Paquetes de Bienestar"}
                </p>
                <p className="text-sm text-[#6B6B6B]">
                  {isEn ? "Save up to $30 with our curated packages" : "Ahorra hasta $30 con nuestros paquetes"}
                </p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-[#722F37] transition-transform ${showBundles ? "rotate-90" : ""}`} />
          </button>

          {showBundles && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {WELLNESS_BUNDLES.map((bundle) => (
                <div key={bundle.id} className="bg-white rounded-xl border border-[#EDE9E3] p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-serif text-lg text-[#0D0D0D]">
                      {isEn ? bundle.name : bundle.nameEs}
                    </h5>
                    <span className="text-xs uppercase tracking-wider text-white bg-[#8C6239] px-2 py-1 rounded-full">
                      {isEn ? `Save $${bundle.savings}` : `Ahorra $${bundle.savings}`}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] mb-4">
                    {isEn ? bundle.description : bundle.descriptionEs}
                  </p>
                  <div className="space-y-2 mb-4">
                    {(isEn ? bundle.includes : bundle.includesEs).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#3D3D3D]">
                        <Check className="w-4 h-4 text-[#B76E79]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#EDE9E3]">
                    <div>
                      <span className="text-sm text-[#6B6B6B] line-through">${bundle.originalPrice}</span>
                      <span className="font-serif text-xl text-[#722F37] ml-2">${bundle.bundlePrice}</span>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white text-xs uppercase tracking-wider rounded-lg hover:from-[#8B3A44] hover:to-[#A04550] transition-all">
                      {isEn ? "Select" : "Seleccionar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
