"use client";

import Image from "next/image";
import { Heart, Award, Star, Quote } from "lucide-react";
import { ABOUT_COPY } from "../constants/luxuryRituals";

// Set to "/ivannia.jpg" (4:5 portrait in /public) once the photo is ready; until then the nail photo stays.
const ARTIST_PHOTO: string | null = null;

interface AboutIvaProps {
  language: "en" | "es";
}

export default function AboutIva({ language }: AboutIvaProps) {
  const isEn = language === "en";
  const content = isEn ? ABOUT_COPY.en : ABOUT_COPY.es;

  return (
    <section
      id="about-iva"
      className="relative py-20 md:py-32 px-6 md:px-8 overflow-hidden bg-[#140B0A]"
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Sophisticated Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="font-display mb-5 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">
            {isEn ? "Meet Iva" : "Conoce a Iva"}
          </p>
          <h2 className="text-[#F4EBE1]">
            <span className="font-display block text-2xl font-bold md:text-4xl">{isEn ? "The artist" : "La artista"}</span>
            <span className="font-serif text-4xl font-normal italic text-[#E8C9A8] md:text-6xl">{isEn ? "behind the art" : "detrás del arte"}</span>
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
                <Image
                  src={ARTIST_PHOTO ?? "/portada.jpg"}
                  alt={ARTIST_PHOTO ? (isEn ? "Portrait of Ivannia Rodríguez, nail artist at IVA Nail Art NY" : "Retrato de Ivannia Rodríguez, artista de uñas de IVA Nail Art NY") : (isEn ? "White almond nails with gold leaf art by IVA Nail Art" : "Uñas almendradas blancas con arte de hojas doradas de IVA Nail Art")}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-3 md:top-8 md:-right-8 bg-gradient-to-br from-[#D4A574] to-[#B8864D] text-white px-6 py-5 rounded-2xl shadow-2xl z-10">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-white/90" />
                <span className="text-xs uppercase tracking-wider opacity-90 font-medium">
                  {isEn ? "Mom of Ezra" : "Mamá de Ezra"}
                </span>
              </div>
              <p className="text-xl font-serif font-semibold text-white">
                {isEn ? "Protecting Lives" : "Protegiendo Vidas"}
              </p>
            </div>

            {/* Bottom Stats Card */}
            <div className="absolute -bottom-8 -left-3 md:-left-8 bg-[#F4EBE1] rounded-2xl shadow-xl p-5 border border-[#D4A574]/20 z-10">
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
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[#E8C9A8] mb-8 italic font-serif font-medium">
              {content.subtitle}
            </p>

            {/* Story */}
            <div className="relative">
              <Quote className="absolute -top-3 -left-3 w-10 h-10 text-[#D4A574]/20" />
              <div className="space-y-5 text-[#F4EBE1]/85 leading-relaxed pl-8 text-base md:text-lg font-sans">
                {content.story.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-[#F4EBE1]/85">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Signature */}
            <p className="mt-8 font-serif text-xl text-[#E8C9A8] italic font-semibold">
              {content.signature}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mt-10">
              {content.badges.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F4EBE1]/25 text-sm text-[#F4EBE1]/90 font-medium"
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
