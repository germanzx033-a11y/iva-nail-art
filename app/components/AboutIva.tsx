"use client";

import { Heart, Award, Star, Quote } from "lucide-react";
import { ABOUT_COPY } from "../constants/luxuryRituals";

interface AboutIvaProps {
  language: "en" | "es";
}

export default function AboutIva({ language }: AboutIvaProps) {
  const isEn = language === "en";
  const content = isEn ? ABOUT_COPY.en : ABOUT_COPY.es;

  return (
    <section id="about-iva" className="py-16 md:py-24 px-6 md:px-8 bg-gradient-to-b from-white to-[#FAF9F7]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image Side */}
          <div className="relative order-1">
            {/* Main Image */}
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl relative">
              <img
                src="/portada.jpg"
                alt="Iva - Founder of IVA Nail Art"
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/30 to-transparent" />
            </div>

            {/* Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[#B76E79]/30 -z-10" />

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 md:top-6 md:-right-6 bg-gradient-to-br from-[#B76E79] to-[#722F37] text-white px-5 py-4 rounded-xl shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-[#E8B4B8]" />
                <span className="text-xs uppercase tracking-wider opacity-80">
                  {isEn ? "Mom of Ezra" : "Mamá de Ezra"}
                </span>
              </div>
              <p className="text-xl font-serif">
                {isEn ? "Protecting Lives" : "Protegiendo Vidas"}
              </p>
            </div>

            {/* Bottom Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-[#EDE9E3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#722F37]" />
                </div>
                <div>
                  <p className="font-serif text-lg text-[#0D0D0D]">10+</p>
                  <p className="text-xs text-[#6B6B6B]">
                    {isEn ? "Years Experience" : "Años de Experiencia"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-2">
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#B76E79]/10 to-[#722F37]/10 rounded-full mb-4">
              <Heart className="w-4 h-4 text-[#722F37]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#722F37] font-medium">
                {isEn ? "About Us" : "Sobre Nosotros"}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl md:text-4xl text-[#0D0D0D] mb-2">
              {content.title}
            </h2>
            <p className="text-lg text-[#B76E79] mb-6 italic">
              {content.subtitle}
            </p>

            {/* Story */}
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#B76E79]/20" />
              <div className="space-y-4 text-[#3D3D3D] leading-relaxed pl-6">
                {content.story.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Signature */}
            <p className="mt-6 font-serif text-lg text-[#722F37] italic">
              {content.signature}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {content.badges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF9F7] rounded-full border border-[#EDE9E3] text-sm text-[#6B6B6B]"
                >
                  <Star className="w-3 h-3 text-[#B76E79]" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
