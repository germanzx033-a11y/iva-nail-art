"use client";

import { Shield, CheckCircle } from "lucide-react";
import { PREGNANCY_SAFE_FEATURES } from "../constants/luxury";

interface PregnancySafeProps {
  lang: "en" | "es";
}

export default function PregnancySafe({ lang }: PregnancySafeProps) {
  const content = PREGNANCY_SAFE_FEATURES[lang];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#FDF8F6] via-white to-[#E8F5E9]">
      <div className="max-w-6xl mx-auto">
        {/* Header con Badge Certificado */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4A0404]/5 border border-[#4A0404]/10 text-[#4A0404] text-xs sm:text-sm mb-4 animate-fade-in">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-medium tracking-wider uppercase">{content.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3 tracking-tight">
            {content.title}
          </h2>

          <p className="text-[#4A0404]/60 text-base sm:text-lg max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Features Grid - Estilo Townhouse */}
        <div className="grid md:grid-cols-2 gap-6">
          {content.features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#4A0404]/5 hover:border-[#D4AF37]/30"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Icon con efecto hover */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="font-medium text-xl text-[#4A0404] mb-3 flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <span>{feature.title}</span>
                </h3>

                {/* Description */}
                <p className="text-[#4A0404]/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-[#4A0404]/5 to-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/20">
          <p className="text-[#4A0404]/80 text-sm sm:text-base">
            {lang === "en"
              ? "🤰 Expecting? Mention your trimester when booking for personalized care recommendations."
              : "🤰 ¿Embarazada? Menciona tu trimestre al reservar para recomendaciones personalizadas."}
          </p>
        </div>
      </div>
    </section>
  );
}
