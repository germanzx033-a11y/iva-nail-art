"use client";

import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialsProps {
  lang: "en" | "es";
}

interface Testimonial {
  id: string;
  name: string;
  service: string;
  serviceEs: string;
  rating: 5;
  text: string;
  textEs: string;
  location: string;
  instagram?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    service: "Builder Gel + French",
    serviceEs: "Builder Gel + Francés",
    rating: 5,
    text: "IVA is an absolute artist! The attention to detail and cleanliness is unmatched. My nails have never looked better. Worth every penny!",
    textEs: "¡IVA es una artista absoluta! La atención al detalle y la limpieza es incomparable. Mis uñas nunca se han visto mejor. ¡Vale cada centavo!",
    location: "Park Slope, Brooklyn",
    instagram: "@sarahm_beauty",
  },
  {
    id: "2",
    name: "Maria G.",
    service: "Acrylic + Custom Design",
    serviceEs: "Acrílico + Diseño",
    rating: 5,
    text: "The 4-hour appointment time means no rushing. IVA takes her time to make everything perfect. The hospital-grade sterilization gives me peace of mind!",
    textEs: "El tiempo de cita de 4 horas significa que no hay prisa. IVA se toma su tiempo para que todo sea perfecto. ¡La esterilización de grado hospitalario me da tranquilidad!",
    location: "Bay Ridge, Brooklyn",
  },
  {
    id: "3",
    name: "Jennifer L.",
    service: "Gel Manicure",
    serviceEs: "Manicura en Gel",
    rating: 5,
    text: "I've been going to IVA for 3 years. The exclusivity of only 3 clients per day means I always get premium attention. She's the BEST in Brooklyn!",
    textEs: "He ido con IVA durante 3 años. La exclusividad de solo 3 clientas por día significa que siempre recibo atención premium. ¡Es la MEJOR de Brooklyn!",
    location: "Sunset Park, Brooklyn",
    instagram: "@jennibeauty",
  },
];

export default function Testimonials({ lang }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const t = {
    en: {
      title: "Client Love",
      subtitle: "Real reviews from real clients",
      service: "Service",
    },
    es: {
      title: "Amor de Clientes",
      subtitle: "Reseñas reales de clientes reales",
      service: "Servicio",
    },
  };

  const text = t[lang];
  const current = TESTIMONIALS[currentIndex];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-[#FDF8F6]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3">
            {text.title}
          </h2>
          <p className="text-[#4A0404]/60 text-sm sm:text-base">{text.subtitle}</p>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-[#4A0404]/5">
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-[#D4AF37] mb-6 opacity-30" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#D4AF37]" fill="#D4AF37" />
              ))}
            </div>

            {/* Text */}
            <p className="text-lg text-[#4A0404] leading-relaxed mb-8 italic">
              "{lang === "en" ? current.text : current.textEs}"
            </p>

            {/* Author */}
            <div className="border-t border-[#4A0404]/10 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-[#4A0404] text-lg">{current.name}</h4>
                  <p className="text-sm text-[#4A0404]/60 mt-1">{current.location}</p>
                  {current.instagram && (
                    <p className="text-xs text-[#D4AF37] mt-1">{current.instagram}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#4A0404]/40 uppercase tracking-wide mb-1">
                    {text.service}
                  </p>
                  <p className="text-sm font-medium text-[#4A0404]">
                    {lang === "en" ? current.service : current.serviceEs}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#4A0404] hover:bg-[#4A0404] hover:text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#4A0404] hover:bg-[#4A0404] hover:text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-[#4A0404] w-8"
                  : "bg-[#4A0404]/20 hover:bg-[#4A0404]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
