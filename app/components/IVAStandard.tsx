"use client";

import { Shield, Wind, Leaf, Heart, Check, ArrowRight } from "lucide-react";
import { IVA_STANDARD, PRICE_JUSTIFICATION } from "../constants/luxuryRituals";

interface IVAStandardProps {
  language: "en" | "es";
  onBook?: () => void;
}

const iconMap = {
  Shield,
  Wind,
  Leaf,
  Heart,
};

export default function IVAStandard({ language, onBook }: IVAStandardProps) {
  const isEn = language === "en";
  const content = isEn ? IVA_STANDARD.en : IVA_STANDARD.es;
  const priceContent = isEn ? PRICE_JUSTIFICATION.en : PRICE_JUSTIFICATION.es;

  return (
    <section id="iva-standard" className="py-16 md:py-24 px-6 md:px-8 bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#B76E79]/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#8C6239]/10 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
            <Shield className="w-4 h-4 text-[#B76E79]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#B76E79] font-medium">
              {isEn ? "Clinical-Grade Luxury" : "Lujo de Grado Clínico"}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-white leading-relaxed mb-2">
            {content.subtitle}
          </p>
          <p className="text-white">
            {content.intro}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {content.features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-[#B76E79]/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#B76E79] to-[#722F37] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#E8B4B8]">
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-medium">{feature.benefit}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Price Justification Section */}
        <div className="bg-gradient-to-br from-[#722F37] via-[#5A252C] to-[#3D1A1E] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B76E79]/10 rounded-full blur-2xl" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Comparison */}
            <div>
              <h3 className="font-serif text-2xl md:text-3xl mb-4">
                {priceContent.title}
              </h3>
              <p className="text-white text-lg leading-relaxed mb-6 border-l-4 border-[#B76E79] pl-4">
                {priceContent.comparison}
              </p>
            </div>

            {/* Right: Benefits List */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <p className="text-xs uppercase tracking-[0.2em] text-[#F5C6D6] mb-4">
                {isEn ? "What You're Really Getting" : "Lo Que Realmente Obtienes"}
              </p>
              <div className="space-y-3">
                {priceContent.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#B76E79] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white">{point}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-[#F5C6D6] font-medium italic">
                  "{priceContent.conclusion}"
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative mt-8 text-center">
            <p className="text-white mb-4">{content.cta}</p>
            {onBook && (
              <button
                onClick={onBook}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#722F37] text-sm uppercase tracking-[0.15em] font-medium rounded-lg hover:bg-[#D4A5A5] transition-all shadow-xl hover:shadow-2xl"
              >
                {isEn ? "Book Your Sanctuary" : "Reserva Tu Santuario"}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
