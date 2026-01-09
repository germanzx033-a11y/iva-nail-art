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
    <section
      id="about-iva"
      className="relative py-20 md:py-32 px-6 md:px-8 overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, #FDF8F5 0%, #FAF5F2 25%, #F7F0EB 50%, #F5EDE6 75%, #FDF8F5 100%),
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(212, 165, 116, 0.03) 10px,
            rgba(212, 165, 116, 0.03) 20px
          )
        `,
        backgroundSize: '100% 100%, 40px 40px'
      }}
    >
      {/* Subtle marble texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(212, 165, 116, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(232, 164, 184, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(184, 134, 77, 0.06) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Sophisticated Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-4 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #D4A574 0%, #B8864D 50%, #8B6914 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            {isEn ? "The Artist Behind the Art" : "La Artista Detrás del Arte"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image Side */}
          <div className="relative order-1">
            {/* Main Image with Gold Organic Frame */}
            <div className="relative p-2"
              style={{
                background: 'linear-gradient(135deg, #D4A574 0%, #B8864D 50%, #8B6914 100%)',
                borderRadius: '3.5rem',
                filter: 'drop-shadow(0 15px 40px rgba(184, 134, 77, 0.25))',
              }}>
              <div className="aspect-[4/5] overflow-hidden rounded-[3rem] md:rounded-[4rem] shadow-2xl relative bg-gradient-to-br from-[#F7F0EB] to-[#F5EDE6]">
                <img
                  src="/portada.jpg"
                  alt="Iva - Founder of IVA Nail Art"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                {/* Loading placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F7F0EB] to-[#F5EDE6] animate-pulse" />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 md:top-8 md:-right-8 bg-gradient-to-br from-[#D4A574] to-[#B8864D] text-white px-6 py-5 rounded-2xl shadow-2xl z-10">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-white/90" />
                <span className="text-xs uppercase tracking-wider opacity-90 font-medium">
                  {isEn ? "Mom of Ezra" : "Mamá de Ezra"}
                </span>
              </div>
              <p className="text-xl font-serif font-semibold">
                {isEn ? "Protecting Lives" : "Protegiendo Vidas"}
              </p>
            </div>

            {/* Bottom Stats Card */}
            <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-5 border border-[#D4A574]/20 z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-[#B8864D]/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#B8864D]" />
                </div>
                <div>
                  <p className="font-serif text-2xl text-[#1A0F0F] font-semibold">3</p>
                  <p className="text-xs text-[#6B5050] font-medium">
                    {isEn ? "Years Experience" : "Años de Experiencia"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-2">
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4A574]/10 to-[#B8864D]/10 rounded-full mb-6 border border-[#D4A574]/20">
              <Heart className="w-4 h-4 text-[#B8864D]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#B8864D] font-semibold">
                {isEn ? "MEET IVA" : "CONOCE A IVA"}
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[#B8864D] mb-8 italic font-serif font-medium">
              {content.subtitle}
            </p>

            {/* Story */}
            <div className="relative">
              <Quote className="absolute -top-3 -left-3 w-10 h-10 text-[#D4A574]/20" />
              <div className="space-y-5 text-[#3D2828] leading-relaxed pl-8 text-base md:text-lg font-sans">
                {content.story.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-[#3D2828]">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Signature */}
            <p className="mt-8 font-serif text-xl text-[#B8864D] italic font-semibold">
              {content.signature}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mt-10">
              {content.badges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-[#D4A574]/20 text-sm text-[#3D2828] font-medium shadow-sm"
                >
                  <Star className="w-3.5 h-3.5 text-[#D4A574]" fill="#D4A574" />
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
