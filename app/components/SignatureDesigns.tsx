"use client";

import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { SIGNATURE_DESIGNS } from "../constants/luxury";

interface SignatureDesignsProps {
  lang: "en" | "es";
  onBookService: (serviceName: string) => void;
}

export default function SignatureDesigns({ lang, onBookService }: SignatureDesignsProps) {
  const t = {
    en: {
      title: "Signature Designs",
      subtitle: "The IVA Collection",
      shopLook: "Book This Look",
      starting: "Starting at",
    },
    es: {
      title: "Diseños Firma",
      subtitle: "La Colección IVA",
      shopLook: "Reservar Este Look",
      starting: "Desde",
    },
  };

  const text = t[lang];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#4A0404]/[0.02]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3">
            {text.title}
          </h2>
          <p className="text-[#4A0404]/60 text-sm sm:text-base">{text.subtitle}</p>
        </div>

        {/* Designs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIGNATURE_DESIGNS.map((design) => (
            <div
              key={design.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0404]/80 via-[#4A0404]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Popular badge */}
                {design.popular && (
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3" fill="currentColor" />
                    Popular
                  </div>
                )}

                {/* CTA Button - appears on hover */}
                <button
                  onClick={() => onBookService(design.serviceCategory)}
                  className="absolute bottom-4 left-4 right-4 py-3 bg-white text-[#4A0404] rounded-xl font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
                >
                  {text.shopLook}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#4A0404] mb-2">
                  {lang === "en" ? design.name : design.nameEs}
                </h3>
                <p className="text-sm text-[#4A0404]/60 mb-3">
                  {lang === "en" ? design.description : design.descriptionEs}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#4A0404]/40 uppercase tracking-wide">
                    {design.serviceCategory}
                  </span>
                  <span className="font-serif text-lg text-[#4A0404]">
                    {text.starting} ${design.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
