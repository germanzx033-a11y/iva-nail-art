"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Phone, Clock, Palette, Wand2, Heart, Star } from "lucide-react";
import { CONFIG } from "../constants";
import { LUXURY_OVERLAYS } from "../constants/handAssets";
import Image from "next/image";

// Imagen realista local
const HAND_IMAGE = "/realistic_hand.jpg";

interface VirtualNailStudioProps {
  lang: "en" | "es";
}

type NailShape = "almond" | "stiletto" | "square" | "coffin";
type Finish = "glossy" | "matte" | "chrome";

const NAIL_COLORS = [
  { name: "Nude Champagne", color: "#F5D7C8" },
  { name: "Deep Burgundy", color: "#4A0404" },
  { name: "Rose Gold", color: "#B76E79" },
  { name: "Midnight Black", color: "#1A1A1A" },
  { name: "Pearl White", color: "#FDFBF7" },
  { name: "Coral Sunset", color: "#FF6F61" },
  { name: "Lavender Mist", color: "#B19CD9" },
  { name: "Classic Red", color: "#DC143C" },
];


export default function VirtualNailStudio({ lang }: VirtualNailStudioProps) {
  const [nailShape, setNailShape] = useState<NailShape>("almond");
  const [nailColor, setNailColor] = useState("#4A0404");
  const [finish, setFinish] = useState<Finish>("glossy");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [favoriteColor, setFavoriteColor] = useState<string | null>(null);

  const t = {
    en: {
      title: "Virtual Nail Studio",
      subtitle: "Discover your perfect nail look with our AI-powered preview",
      nailShape: "Nail Shape",
      chooseColor: "Choose Your Color",
      finish: "Finish Style",
      glossy: "Glossy",
      matte: "Matte",
      chrome: "Chrome",
      studioLocation: "Visit Our Brooklyn Studio",
      visitUs: "Get Directions",
      bookNow: "Book Your Appointment",
      yourLook: "Your Custom Look",
    },
    es: {
      title: "Estudio Virtual de Uñas",
      subtitle: "Descubre tu look perfecto con nuestra vista previa con IA",
      nailShape: "Forma de Uña",
      chooseColor: "Elige tu Color",
      finish: "Estilo de Acabado",
      glossy: "Brillante",
      matte: "Mate",
      chrome: "Cromado",
      studioLocation: "Visita Nuestro Estudio en Brooklyn",
      visitUs: "Ver Direcciones",
      bookNow: "Reserva tu Cita",
      yourLook: "Tu Look Personalizado",
    },
  };

  const text = t[lang];

  const handleBooking = () => {
    const colorName = NAIL_COLORS.find(c => c.color === nailColor)?.name || "Custom";
    const message = lang === "en"
      ? `Hi! I used the Virtual Nail Studio and love this combination:\n\n💅 Shape: ${nailShape}\n🎨 Color: ${colorName}\n✨ Finish: ${finish}\n\nI'd love to book an appointment!`
      : `¡Hola! Usé el Estudio Virtual y me encanta esta combinación:\n\n💅 Forma: ${nailShape}\n🎨 Color: ${colorName}\n✨ Acabado: ${finish}\n\n¡Me gustaría reservar una cita!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // Get nail shape SVG path
  const getNailShapePath = (shape: NailShape) => {
    switch (shape) {
      case "almond":
        return "M 8 50 Q 8 25 16 10 Q 24 0 32 0 Q 40 0 48 10 Q 56 25 56 50 L 56 80 L 8 80 Z";
      case "stiletto":
        return "M 12 50 L 32 0 L 52 50 L 52 80 L 12 80 Z";
      case "square":
        return "M 8 10 L 56 10 L 56 80 L 8 80 Z";
      case "coffin":
        return "M 8 50 Q 8 20 18 10 L 46 10 Q 56 20 56 50 L 56 80 L 8 80 Z";
      default:
        return "M 8 50 Q 8 25 16 10 Q 24 0 32 0 Q 40 0 48 10 Q 56 25 56 50 L 56 80 L 8 80 Z";
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Cozy Warm Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0F0A] via-[#2A1810] to-[#1A0F0A]" />
      <div className="absolute inset-0" style={{ background: LUXURY_OVERLAYS.meshGradient }} />

      {/* Subtle animated glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4A0404]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/20 backdrop-blur-md border border-[#D4AF37]/30 text-[#F7E7CE] text-xs sm:text-sm mb-6"
          >
            <Wand2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-medium tracking-wider uppercase">AI-Powered Preview</span>
          </motion.div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#F7E7CE] mb-4 tracking-tight">
            {text.title}
          </h2>

          <p className="text-[#F7E7CE]/70 text-base sm:text-lg max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Photorealistic Hand Preview */}
          <div className="relative">
            {/* Main Preview Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10"
            >
              {/* Luxury glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#4A0404]/10 pointer-events-none" />

              {/* Photo Container */}
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
                {/* Loading state */}
                {!isImageLoaded && (
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#E8D4BB] to-[#DEBA9D] animate-pulse flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#D4AF37]/50 animate-spin" />
                  </div>
                )}

                {/* Hand Photo - Imagen realista local */}
                <Image
                  src={HAND_IMAGE}
                  alt="Realistic hand preview with nail art"
                  fill
                  className={`object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setIsImageLoaded(true)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10 pointer-events-none" />

                {/* Selected Color Badge - z-20 to float above gradient */}
                <motion.div
                  key={`${nailColor}-${finish}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-4 left-4 right-4 z-20"
                >
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {text.yourLook}
                      </span>
                      <button
                        onClick={() => setFavoriteColor(favoriteColor === nailColor ? null : nailColor)}
                        className="p-1.5 hover:bg-pink-50 rounded-full transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            favoriteColor === nailColor ? 'fill-red-500 text-red-500' : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Nail Preview with selected shape */}
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-1">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative"
                            style={{
                              transform: `rotate(${(i - 2) * 8}deg) translateY(${Math.abs(i - 2) * 3}px)`,
                            }}
                          >
                            <svg width="24" height="40" viewBox="0 0 64 90">
                              <defs>
                                {finish === 'chrome' && (
                                  <linearGradient id={`chrome-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFD700" />
                                    <stop offset="50%" stopColor={nailColor} />
                                    <stop offset="100%" stopColor="#FFD700" />
                                  </linearGradient>
                                )}
                                <linearGradient id={`shine-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="white" stopOpacity="0.7" />
                                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <path
                                d={getNailShapePath(nailShape)}
                                fill={finish === 'chrome' ? `url(#chrome-${i})` : nailColor}
                                opacity={finish === 'matte' ? 0.9 : 1}
                                stroke="rgba(0,0,0,0.1)"
                                strokeWidth="1"
                              />
                              {finish === 'glossy' && (
                                <ellipse cx="32" cy="25" rx="10" ry="15" fill={`url(#shine-${i})`} />
                              )}
                            </svg>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {NAIL_COLORS.find(c => c.color === nailColor)?.name || "Custom"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {nailShape.charAt(0).toUpperCase() + nailShape.slice(1)} • {
                            finish === 'glossy' ? text.glossy :
                            finish === 'matte' ? text.matte : text.chrome
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Luxury overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: LUXURY_OVERLAYS.goldenHour }} />
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Controls */}
          <div className="space-y-6">
            {/* Nail Shape Selector */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <label className="block font-medium text-[#F7E7CE] mb-4 font-serif text-lg">{text.nailShape}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["almond", "stiletto", "square", "coffin"] as NailShape[]).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setNailShape(shape)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      nailShape === shape
                        ? "border-[#D4AF37] bg-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/20"
                        : "border-white/20 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <div className="w-full h-14 flex items-center justify-center">
                      <svg width="28" height="50" viewBox="0 0 64 90">
                        <path
                          d={getNailShapePath(shape)}
                          fill={nailShape === shape ? "#D4AF37" : "#F7E7CE"}
                          stroke={nailShape === shape ? "#B8860B" : "#D4AF37"}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-[#F7E7CE] capitalize font-medium text-center mt-2">{shape}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <label className="block font-medium text-[#F7E7CE] mb-4 flex items-center gap-2 font-serif text-lg">
                <Palette className="w-5 h-5" />
                {text.chooseColor}
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {NAIL_COLORS.map((colorOption) => (
                  <button
                    key={colorOption.name}
                    onClick={() => setNailColor(colorOption.color)}
                    className="relative group"
                    title={colorOption.name}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-full border-3 transition-all shadow-lg ${
                        nailColor === colorOption.color
                          ? "border-[#D4AF37] ring-4 ring-[#D4AF37]/30 scale-110"
                          : "border-white/30 hover:border-[#D4AF37]/50"
                      }`}
                      style={{ backgroundColor: colorOption.color }}
                    />
                    {nailColor === colorOption.color && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] rounded-full flex items-center justify-center"
                      >
                        <Star className="w-2.5 h-2.5 text-white fill-white" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Selector */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <label className="block font-medium text-[#F7E7CE] mb-4 font-serif text-lg">{text.finish}</label>
              <div className="grid grid-cols-3 gap-3">
                {(["glossy", "matte", "chrome"] as Finish[]).map((finishOption) => (
                  <button
                    key={finishOption}
                    onClick={() => setFinish(finishOption)}
                    className={`relative p-4 rounded-xl border-2 transition-all overflow-hidden ${
                      finish === finishOption
                        ? "border-[#D4AF37] bg-[#D4AF37]/20 shadow-lg"
                        : "border-white/20 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    {/* Finish visual indicator */}
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full"
                      style={{
                        background: finishOption === 'glossy'
                          ? 'linear-gradient(135deg, white 0%, transparent 60%)'
                          : finishOption === 'matte'
                          ? '#888888'
                          : 'linear-gradient(135deg, #FFD700 0%, #C0C0C0 50%, #FFD700 100%)',
                        opacity: finishOption === 'matte' ? 0.5 : 0.8
                      }}
                    />
                    <p className="text-sm text-[#F7E7CE] capitalize font-medium">
                      {finishOption === "glossy" ? text.glossy : finishOption === "matte" ? text.matte : text.chrome}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <motion.button
              onClick={handleBooking}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-xl bg-gradient-to-r from-[#4A0404] via-[#6A1414] to-[#D4AF37] text-white font-medium text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/30 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              {text.bookNow}
            </motion.button>

            {/* Brooklyn Studio Location Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4A0404]/80 via-[#6A1414]/80 to-[#4A0404]/80 backdrop-blur-md p-6 text-white border border-white/10">
              <div className="relative z-10">
                <h3 className="font-serif text-xl mb-4 text-[#F7E7CE]">{text.studioLocation}</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#D4AF37]" />
                    <p className="text-sm text-[#F7E7CE]/90">{CONFIG.location}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#D4AF37]" />
                    <p className="text-sm text-[#F7E7CE]/90">{CONFIG.hours}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#D4AF37]" />
                    <p className="text-sm text-[#F7E7CE]/90">{CONFIG.phone}</p>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 text-[#4A0404] rounded-xl font-medium hover:bg-white transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  {text.visitUs}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
