"use client";

import { useState, useRef, useEffect } from "react";
import { Instagram, X, ChevronLeft, ChevronRight, Sparkles, ZoomIn, Heart, Star } from "lucide-react";
import { GALLERY_IMAGES, type GalleryImage } from "@/app/data/galleryData";

interface GallerySectionProps {
  lang: "en" | "es";
  t: any;
  CONFIG: any;
}

export default function GallerySection({ lang, t, CONFIG }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [visibleImages, setVisibleImages] = useState<number>(12);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const particlesRef = useRef<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Efecto de partículas doradas
  useEffect(() => {
    const generateParticles = () => {
      const particles: Array<{ id: number; x: number; y: number; delay: number }> = [];
      for (let i = 0; i < 20; i++) {
        particles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 5,
        });
      }
      particlesRef.current = particles;
    };
    generateParticles();
  }, []);

  // Seguir el mouse para efectos de spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const gallery = galleryRef.current;
    if (gallery) {
      gallery.addEventListener("mousemove", handleMouseMove);
      return () => gallery.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imgId = entry.target.getAttribute("data-img-id");
            if (imgId) {
              setLoadedImages((prev) => new Set(prev).add(imgId));
            }
          }
        });
      },
      { rootMargin: "100px" }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleImages]);

  // Navegación con teclado en el modal
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        navigateImage(-1);
      } else if (e.key === "ArrowRight") {
        navigateImage(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const navigateImage = (direction: number) => {
    if (!selectedImage) return;
    const currentIndex = GALLERY_IMAGES.findIndex((img) => img.id === selectedImage.id);
    const newIndex = (currentIndex + direction + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setSelectedImage(GALLERY_IMAGES[newIndex]);
  };

  const loadMoreImages = () => {
    setVisibleImages((prev) => Math.min(prev + 12, GALLERY_IMAGES.length));
  };

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <section
        id="gallery"
        className="py-24 px-4 md:px-6 relative overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, #FDF8F5 0%, #FAF5F2 25%, #F7F0EB 50%, #F5EDE6 75%, #FDF8F5 100%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(212, 165, 116, 0.02) 10px,
              rgba(212, 165, 116, 0.02) 20px
            )
          `,
        }}
      >
        {/* Efectos decorativos de fondo */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E8A4B8]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Spotlight dinámico que sigue el mouse */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: `radial-gradient(circle 600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(212, 175, 55, 0.15) 0%, transparent 70%)`,
              transition: "background 0.3s ease-out",
            }}
          />

          {/* Partículas doradas flotantes */}
          {particlesRef.current.map((particle) => (
            <div
              key={particle.id}
              className="absolute pointer-events-none animate-float-particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full blur-sm opacity-40 animate-sparkle"></div>
            </div>
          ))}

          {/* Header con efecto de brillo */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent blur-3xl animate-shimmer"></div>
            <p className="text-[#D4AF37] tracking-[0.3em] text-xs md:text-sm mb-4 font-light uppercase relative z-10 animate-gradient-text">
              {t.gallery.subtitle}
            </p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#4A0404] mb-6 font-light relative z-10">
              <span className="relative inline-block">
                {t.gallery.title}
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#E8C9A8] to-[#D4AF37] rounded-full opacity-50"></span>
              </span>
            </h2>
            <p className="text-[#4A0404]/70 text-lg max-w-2xl mx-auto leading-relaxed relative z-10">
              {t.gallery.description}
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 relative z-10">
              <div className="relative">
                <Sparkles className="w-5 h-5 text-[#D4AF37] animate-sparkle" />
                <div className="absolute inset-0 bg-[#D4AF37] blur-lg opacity-30 animate-pulse"></div>
              </div>
              <span className="text-[#4A0404]/60 text-sm font-medium">
                {GALLERY_IMAGES.length} {lang === "en" ? "Masterpieces" : "Obras Maestras"}
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37] animate-sparkle" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Grid - Masonry Style con efectos 3D */}
          <div
            ref={galleryRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5"
          >
            {GALLERY_IMAGES.slice(0, visibleImages).map((image, index) => {
              const isLoaded = loadedImages.has(image.id);
              const isFeatured = image.featured;

              return (
                <div
                  key={image.id}
                  ref={(el) => {
                    if (el) imageRefs.current.set(image.id, el);
                  }}
                  data-img-id={image.id}
                  onClick={() => handleImageClick(image)}
                  onMouseEnter={() => setHoveredImageId(image.id)}
                  onMouseLeave={() => setHoveredImageId(null)}
                  className={`
                    group relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl
                    transform transition-all duration-700 ease-out
                    hover:scale-[1.05] hover:z-10 hover:rotate-1
                    ${isFeatured ? "md:col-span-2 md:row-span-2" : ""}
                    ${index % 7 === 0 ? "md:row-span-2" : ""}
                    ${index % 11 === 0 ? "md:col-span-2" : ""}
                    shadow-lg hover:shadow-2xl
                    bg-gradient-to-br from-[#D4AF37]/10 to-[#4A0404]/5
                    border border-[#D4AF37]/20 hover:border-[#D4AF37]/50
                    ${hoveredImageId === image.id ? "ring-4 ring-[#D4AF37]/30" : ""}
                  `}
                  style={{
                    aspectRatio: isFeatured ? "1/1" : index % 7 === 0 ? "2/3" : "1/1",
                    transformStyle: "preserve-3d",
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={image.alt}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleImageClick(image);
                    }
                  }}
                >
                  {/* Imagen con efecto parallax */}
                  <div className="relative w-full h-full overflow-hidden">
                    {isLoaded ? (
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-2"
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#D4AF37]/20 to-[#4A0404]/10 animate-pulse flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-[#D4AF37]/30" />
                      </div>
                    )}

                    {/* Overlay con gradiente dinámico */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A0404]/90 via-[#4A0404]/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Badge Featured con animación */}
                    {isFeatured && (
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 z-20">
                        <div className="relative bg-gradient-to-r from-[#D4AF37] to-[#E8C9A8] text-[#4A0404] px-4 py-2 rounded-full text-xs font-bold shadow-xl backdrop-blur-sm animate-pulse-glow">
                          <Star className="w-3 h-3 inline mr-1 fill-current animate-sparkle" />
                          {lang === "en" ? "Featured" : "Destacado"}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-shimmer"></div>
                        </div>
                      </div>
                    )}

                    {/* Efecto de corazón flotante en hover */}
                    {hoveredImageId === image.id && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
                        <Heart className="w-12 h-12 text-[#D4AF37] fill-[#D4AF37]/20 animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}

                    {/* Icono de zoom */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full p-2.5 shadow-xl">
                        <ZoomIn className="w-5 h-5 text-[#4A0404]" />
                      </div>
                    </div>

                    {/* Información que aparece en hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/95 backdrop-blur-xl rounded-xl p-3 md:p-4 shadow-2xl">
                        <p className="text-[#4A0404] font-semibold text-sm md:text-base mb-1">
                          {lang === "en" ? "Premium Design" : "Diseño Premium"}
                        </p>
                        <p className="text-[#4A0404]/70 text-xs md:text-sm font-medium">
                          {lang === "en" ? "Handcrafted with love" : "Hecho con amor"}
                        </p>
                      </div>
                    </div>

                    {/* Efecto de brillo animado mejorado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Efecto de ondas concéntricas en hover */}
                    {hoveredImageId === image.id && (
                      <>
                        <div className="absolute inset-0 border-2 border-[#D4AF37]/40 rounded-2xl md:rounded-3xl animate-pulse"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-[#D4AF37]/30 rounded-full animate-ping"></div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botón "Cargar más" con efectos premium */}
          {visibleImages < GALLERY_IMAGES.length && (
            <div className="text-center mt-16 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent blur-sm"></div>
              </div>
              <button
                onClick={loadMoreImages}
                className="relative px-10 py-5 bg-gradient-to-r from-[#4A0404] via-[#5C1A1B] to-[#4A0404] text-white rounded-full font-semibold hover:from-[#5C1A1B] hover:via-[#4A0404] hover:to-[#5C1A1B] transition-all duration-500 shadow-2xl hover:shadow-[#D4AF37]/20 transform hover:scale-110 hover:-translate-y-1 group overflow-hidden"
                style={{
                  backgroundSize: "200% 100%",
                  animation: hoveredImageId ? "shimmer 2s linear infinite" : "none",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  {lang === "en" ? "Load More" : "Cargar Más"} ({GALLERY_IMAGES.length - visibleImages}{" "}
                  {lang === "en" ? "remaining" : "restantes"})
                  <Sparkles className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          )}

          {/* Social Links */}
          <div className="flex justify-center gap-8 mt-16 pt-8 border-t border-[#D4AF37]/20">
            <a
              href={CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#4A0404] hover:text-[#D4AF37] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">@{CONFIG.instagram}</span>
            </a>
            <a
              href={CONFIG.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#4A0404] hover:text-[#D4AF37] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </div>
              <span className="text-sm font-medium">@{CONFIG.tiktok}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Modal Fullscreen con efectos premium */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-gradient-to-br from-black via-[#1A0F0F] to-black backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#D4AF37] rounded-full animate-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
          {/* Botón cerrar */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-[#D4AF37] transition-colors z-50 bg-black/50 rounded-full p-3 hover:bg-black/70 backdrop-blur-sm"
            aria-label={lang === "en" ? "Close" : "Cerrar"}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navegación anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
            className="absolute left-4 md:left-8 text-white hover:text-[#D4AF37] transition-colors z-50 bg-black/50 rounded-full p-4 hover:bg-black/70 backdrop-blur-sm"
            aria-label={lang === "en" ? "Previous image" : "Imagen anterior"}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navegación siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
            className="absolute right-4 md:right-8 text-white hover:text-[#D4AF37] transition-colors z-50 bg-black/50 rounded-full p-4 hover:bg-black/70 backdrop-blur-sm"
            aria-label={lang === "en" ? "Next image" : "Imagen siguiente"}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Imagen en modal con efectos premium */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Borde dorado animado */}
            <div className="absolute inset-0 border-4 border-[#D4AF37]/30 rounded-2xl animate-pulse-glow pointer-events-none"></div>
            
            <div className="relative group">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
                id="modal-image"
              />
              
              {/* Efecto de brillo en la imagen */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-transparent to-[#D4AF37]/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg pointer-events-none"></div>
            </div>

            {/* Información de la imagen */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 md:p-8">
              <p className="text-white text-lg md:text-xl font-semibold mb-2">{selectedImage.alt}</p>
              <p className="text-white/70 text-sm md:text-base">
                {GALLERY_IMAGES.findIndex((img) => img.id === selectedImage.id) + 1} / {GALLERY_IMAGES.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

