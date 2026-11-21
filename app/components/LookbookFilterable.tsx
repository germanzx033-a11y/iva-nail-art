"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, ZoomIn, X, Calendar, ArrowRight, Heart } from "lucide-react";
import {
  GALLERY_CATEGORIES,
  GALLERY_IMAGES,
  GalleryCategory,
  GalleryImage,
} from "@/app/data/galleryData";

interface LookbookFilterableProps {
  onSelectStyle?: (styleName: string) => void;
  lang?: "en" | "es";
}

export default function LookbookFilterable({
  onSelectStyle,
  lang = "en",
}: LookbookFilterableProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const isEs = lang === "es";

  return (
    <section id="lookbook" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EBE1] border border-[#C5A059]/30 text-[#111111] text-xs uppercase tracking-[0.2em] font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>{isEs ? "Colección Privada" : "Private Haute Lookbook"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#111111] tracking-tight mb-4">
          {isEs ? "El Archivo de Arte & Estilo" : "Curated Nail Artistry & Aesthetics"}
        </h2>
        <p className="text-sm md:text-base font-light text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto">
          {isEs
            ? "Explora nuestras creaciones exclusivas de manicura rusa, extensiones de gel estructurado y acabados de alta costura para clientas de Nueva York."
            : "Explore our signature Russian manicure compositions, structured gel overlays, and bespoke editorial finishes crafted in Brooklyn, NY."}
        </p>
      </div>

      {/* Aesthetic Filter Pills */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none px-2">
        {GALLERY_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all duration-300 border ${
                isActive
                  ? "bg-[#111111] text-[#FAF8F5] border-[#111111] shadow-md shadow-black/5"
                  : "bg-white/80 text-[#4A4A4A] border-stone-200/80 hover:border-[#C5A059]/50 hover:bg-[#FAF8F5]"
              }`}
            >
              {isEs ? cat.labelEs : cat.label}
            </button>
          );
        })}
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {filteredImages.slice(0, 16).map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-200/60"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Subtle Gradient & Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block text-[10px] uppercase tracking-[0.15em] text-[#EAD8B1] font-semibold mb-1">
                  {image.styleTag || (isEs ? "Arte Exclusivo" : "Signature Art")}
                </span>
                <p className="text-xs sm:text-sm font-serif line-clamp-1">{image.alt}</p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20 text-[11px] text-white/90">
                  <ZoomIn className="w-3.5 h-3.5 text-[#EAD8B1]" />
                  <span>{isEs ? "Ver Detalle" : "Inspect Look"}</span>
                </div>
              </div>
            </div>

            {/* Featured Badge */}
            {image.featured && (
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#111111] text-[9px] uppercase tracking-wider font-semibold shadow-sm">
                Featured
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-[#FAF8F5] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#C5A059]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[4/5] w-full bg-stone-200">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
                priority
              />
            </div>

            {/* Modal Info & CTA */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C5A059]">
                  {selectedImage.styleTag || "Signature Creation"}
                </span>
                <span className="text-xs text-stone-500 font-sans">IVA Atelier Brooklyn</span>
              </div>
              <h3 className="text-xl font-serif text-[#111111] mb-2">{selectedImage.alt}</h3>
              <p className="text-xs sm:text-sm text-stone-600 mb-5 leading-relaxed">
                {isEs
                  ? "Diseño realizado con productos seguros para embarazo, técnicas de manicura rusa y acabado de brillo de larga duración."
                  : "Crafted with hospital-grade dry manicure protocol, non-toxic premium pigments, and high-shine diamond sealant."}
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="#booking-calculator"
                  onClick={() => {
                    if (onSelectStyle) onSelectStyle(selectedImage.alt);
                    setSelectedImage(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#111111] hover:bg-[#C5A059] text-white hover:text-[#111111] text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isEs ? "Reservar Este Estilo" : "Book This Aesthetic"}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
