"use client";

import { Shield, Sparkles } from "lucide-react";
import { IVA_PROMISE } from "../constants/luxury";

interface IVAPromiseProps {
  lang: "en" | "es";
}

export default function IVAPromise({ lang }: IVAPromiseProps) {
  const content = IVA_PROMISE[lang];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#FDF8F6] to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4A0404]/5 mb-4">
            <Shield className="w-8 h-8 text-[#4A0404]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3">
            {content.title}
          </h2>
          <p className="text-[#4A0404]/60 text-sm sm:text-base">{content.subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#4A0404]/5 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="font-medium text-[#4A0404] mb-2 text-lg">
                {feature.title}
              </h3>
              <p className="text-sm text-[#4A0404]/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A0404]/5 rounded-full">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm text-[#4A0404] font-medium">
              {lang === "en"
                ? "Your health and safety are our highest priority"
                : "Tu salud y seguridad son nuestra máxima prioridad"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
