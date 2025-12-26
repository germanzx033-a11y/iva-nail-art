"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Phone, Clock, Palette, Wand2 } from "lucide-react";
import Image from "next/image";
import { CONFIG } from "../constants";

interface VirtualNailStudioProps {
  lang: "en" | "es";
}

type SkinTone = "fair" | "medium" | "tan" | "deep";
type NailShape = "almond" | "stiletto" | "square" | "coffin";
type Finish = "glossy" | "matte" | "chrome";

// Placeholder URLs for different skin tones (user will replace with real photos)
const HAND_IMAGES = {
  fair: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80", // Fair skin elegant hand
  medium: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80", // Medium skin tone hand
  tan: "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800&q=80", // Tan skin hand
  deep: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=800&q=80", // Deep skin tone hand
};

const NAIL_COLORS = [
  { name: "Nude", color: "#F5D7C8" },
  { name: "Burgundy", color: "#4A0404" },
  { name: "Gold", color: "#D4AF37" },
  { name: "Rose", color: "#C76E7C" },
  { name: "Black", color: "#1A1A1A" },
  { name: "White", color: "#FFFFFF" },
  { name: "Coral", color: "#FF6F61" },
  { name: "Lavender", color: "#B19CD9" },
];

// Precise SVG clipPath masks for each nail (coordinates adjusted to match hand photo)
// These paths will be positioned to overlay exactly on the nail areas of the photo
const NAIL_MASKS = {
  almond: {
    thumb: "M85,195 Q95,185 105,195 L105,225 Q95,235 85,225 Z",
    index: "M145,95 Q155,85 165,95 L165,135 Q155,145 145,135 Z",
    middle: "M195,75 Q205,65 215,75 L215,125 Q205,135 195,125 Z",
    ring: "M245,85 Q255,75 265,85 L265,130 Q255,140 245,130 Z",
    pinky: "M295,115 Q305,105 315,115 L315,150 Q305,160 295,150 Z",
  },
  stiletto: {
    thumb: "M85,195 L105,195 L95,240 Z",
    index: "M145,95 L165,95 L155,150 Z",
    middle: "M195,75 L215,75 L205,140 Z",
    ring: "M245,85 L265,85 L255,145 Z",
    pinky: "M295,115 L315,115 L305,165 Z",
  },
  square: {
    thumb: "M85,195 L105,195 L105,230 L85,230 Z",
    index: "M145,95 L165,95 L165,140 L145,140 Z",
    middle: "M195,75 L215,75 L215,130 L195,130 Z",
    ring: "M245,85 L265,85 L265,135 L245,135 Z",
    pinky: "M295,115 L315,115 L315,155 L295,155 Z",
  },
  coffin: {
    thumb: "M85,195 L105,195 L103,228 L95,235 L87,228 Z",
    index: "M145,95 L165,95 L163,133 L155,145 L147,133 Z",
    middle: "M195,75 L215,75 L213,123 L205,135 L197,123 Z",
    ring: "M245,85 L265,85 L263,128 L255,140 L247,128 Z",
    pinky: "M295,115 L315,115 L313,148 L305,160 L297,148 Z",
  },
};

export default function VirtualNailStudio({ lang }: VirtualNailStudioProps) {
  const [skinTone, setSkinTone] = useState<SkinTone>("medium");
  const [nailShape, setNailShape] = useState<NailShape>("almond");
  const [nailColor, setNailColor] = useState("#4A0404");
  const [finish, setFinish] = useState<Finish>("glossy");
  const [showRecommendation, setShowRecommendation] = useState(false);

  const t = {
    en: {
      title: "Virtual Nail Studio",
      subtitle: "Try before you book - See your perfect nails come to life",
      skinTone: "Skin Tone",
      nailShape: "Nail Shape",
      chooseColor: "Choose Your Color",
      finish: "Finish",
      glossy: "Glossy",
      matte: "Matte",
      chrome: "Chrome",
      aiRecommendation: "Iva's AI Stylist",
      studioLocation: "The Brooklyn Studio",
      visitUs: "Visit Us",
      bookNow: "Book Your Transformation",
      recommendations: {
        fair: "For your fair skin tone, Iva recommends soft nudes, pastel pinks, or classic reds for a stunning contrast.",
        medium: "Your medium tone pairs beautifully with warm burgundy, rose gold, or deep plums.",
        tan: "Rich tan skin looks incredible with bold burgundy, metallics, or vibrant corals.",
        deep: "Your deep skin tone shines with deep burgundy, gold chrome, or crisp white for maximum impact.",
      },
    },
    es: {
      title: "Estudio Virtual de Uñas",
      subtitle: "Prueba antes de reservar - Mira tus uñas perfectas cobrar vida",
      skinTone: "Tono de Piel",
      nailShape: "Forma de Uña",
      chooseColor: "Elige tu Color",
      finish: "Acabado",
      glossy: "Brillante",
      matte: "Mate",
      chrome: "Cromado",
      aiRecommendation: "Estilista IA de Iva",
      studioLocation: "El Estudio Brooklyn",
      visitUs: "Visítanos",
      bookNow: "Reserva tu Transformación",
      recommendations: {
        fair: "Para tu tono de piel claro, Iva recomienda nudes suaves, rosas pastel o rojos clásicos para un contraste impresionante.",
        medium: "Tu tono medio combina hermosamente con burgundy cálido, oro rosa o ciruelas profundas.",
        tan: "La piel tan rica se ve increíble con burgundy audaz, metálicos o corales vibrantes.",
        deep: "Tu tono de piel profundo brilla con burgundy intenso, cromo dorado o blanco nítido para máximo impacto.",
      },
    },
  };

  const text = t[lang];

  useEffect(() => {
    setShowRecommendation(true);
    const timer = setTimeout(() => setShowRecommendation(false), 5000);
    return () => clearTimeout(timer);
  }, [skinTone]);

  const handleBooking = () => {
    const message = lang === "en"
      ? `Hi! I tried the Virtual Nail Studio and I love this combination:\n\n💅 Shape: ${nailShape}\n🎨 Color: ${NAIL_COLORS.find(c => c.color === nailColor)?.name || "Custom"}\n✨ Finish: ${finish}\n\nI'd like to book an appointment!`
      : `¡Hola! Probé el Estudio Virtual y me encanta esta combinación:\n\n💅 Forma: ${nailShape}\n🎨 Color: ${NAIL_COLORS.find(c => c.color === nailColor)?.name || "Personalizado"}\n✨ Acabado: ${finish}\n\n¡Me gustaría reservar una cita!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#FDF8F6] via-white to-[#4A0404]/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#4A0404] text-xs sm:text-sm mb-4">
            <Wand2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-medium tracking-wider uppercase">AI-Powered Preview</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3 tracking-tight">
            {text.title}
          </h2>

          <p className="text-[#4A0404]/60 text-base sm:text-lg max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Photorealistic Hand Visualizer with Image Masking */}
          <div className="relative">
            {/* AI Recommendation Popup */}
            <AnimatePresence>
              {showRecommendation && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-md"
                >
                  <div className="bg-gradient-to-r from-[#4A0404] to-[#D4AF37] text-white rounded-2xl p-4 shadow-2xl border border-white/20">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm mb-1">{text.aiRecommendation}</p>
                        <p className="text-xs text-white/90 leading-relaxed">
                          {text.recommendations[skinTone]}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Photorealistic Hand with SVG Mask Overlay */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#4A0404]/10">
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-[#FDF8F6] to-white">
                {/* Base: Real Hand Photo */}
                <motion.div
                  key={skinTone}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={HAND_IMAGES[skinTone]}
                    alt="Elegant hand"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </motion.div>

                {/* SVG Overlay: Nail Color Masks */}
                <svg
                  viewBox="0 0 400 500"
                  className="absolute inset-0 w-full h-full"
                  style={{ mixBlendMode: "normal" }}
                >
                  <defs>
                    {/* Glossy Shine Gradient */}
                    <linearGradient id="glossyShine" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0.6 }} />
                      <stop offset="50%" style={{ stopColor: "white", stopOpacity: 0.2 }} />
                      <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }} />
                    </linearGradient>

                    {/* Chrome Metallic Gradient */}
                    <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                      <stop offset="25%" style={{ stopColor: "#F7E7CE", stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: "#D4AF37", stopOpacity: 1 }} />
                      <stop offset="75%" style={{ stopColor: "#F7E7CE", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                    </linearGradient>

                    {/* ClipPaths for each nail in each shape */}
                    {Object.entries(NAIL_MASKS).map(([shapeName, nails]) => (
                      <g key={shapeName}>
                        {Object.entries(nails).map(([fingerName, pathData]) => (
                          <clipPath key={`${shapeName}-${fingerName}`} id={`clip-${shapeName}-${fingerName}`}>
                            <path d={pathData} />
                          </clipPath>
                        ))}
                      </g>
                    ))}
                  </defs>

                  {/* Render colored nails with current shape masks */}
                  {["thumb", "index", "middle", "ring", "pinky"].map((finger, index) => (
                    <g key={finger}>
                      {/* Base nail color */}
                      <motion.rect
                        clipPath={`url(#clip-${nailShape}-${finger})`}
                        x="0"
                        y="0"
                        width="400"
                        height="500"
                        fill={finish === "chrome" ? "url(#chromeGradient)" : nailColor}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: index * 0.1,
                        }}
                      />

                      {/* Glossy finish overlay */}
                      {finish === "glossy" && (
                        <motion.rect
                          clipPath={`url(#clip-${nailShape}-${finger})`}
                          x="0"
                          y="0"
                          width="400"
                          height="500"
                          fill="url(#glossyShine)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        />
                      )}

                      {/* Chrome additional shine effect */}
                      {finish === "chrome" && (
                        <motion.rect
                          clipPath={`url(#clip-${nailShape}-${finger})`}
                          x="0"
                          y="0"
                          width="400"
                          height="500"
                          fill="white"
                          opacity="0.3"
                          initial={{ x: -400 }}
                          animate={{ x: 400 }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear",
                            delay: index * 0.2,
                          }}
                        />
                      )}
                    </g>
                  ))}
                </svg>
              </div>

              {/* Current Selection Display */}
              <div className="mt-6 p-4 bg-[#FDF8F6] rounded-xl border border-[#4A0404]/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#4A0404]/60">Current Style:</span>
                  <span className="font-medium text-[#4A0404]">
                    {nailShape.charAt(0).toUpperCase() + nailShape.slice(1)} • {finish.charAt(0).toUpperCase() + finish.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Controls */}
          <div className="space-y-8">
            {/* Skin Tone Selector */}
            <div>
              <label className="block font-medium text-[#4A0404] mb-4">{text.skinTone}</label>
              <div className="grid grid-cols-4 gap-3">
                {(Object.keys(HAND_IMAGES) as SkinTone[]).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSkinTone(tone)}
                    className={`relative p-3 rounded-xl border-2 transition-all ${
                      skinTone === tone
                        ? "border-[#D4AF37] shadow-lg scale-105"
                        : "border-[#4A0404]/20 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <div className="relative w-full h-16 rounded-lg overflow-hidden">
                      <Image
                        src={HAND_IMAGES[tone]}
                        alt={tone}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-xs mt-2 text-[#4A0404] capitalize text-center">{tone}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Nail Shape Selector */}
            <div>
              <label className="block font-medium text-[#4A0404] mb-4">{text.nailShape}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(Object.keys(NAIL_MASKS) as NailShape[]).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setNailShape(shape)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      nailShape === shape
                        ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-lg"
                        : "border-[#4A0404]/20 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <svg viewBox="0 0 400 200" className="w-full h-16 mb-2">
                      <path
                        d={NAIL_MASKS[shape].middle}
                        transform="translate(100, 20) scale(3.5)"
                        fill={shape === nailShape ? "#D4AF37" : "#4A0404"}
                        opacity="0.4"
                        stroke="#4A0404"
                        strokeWidth="1"
                      />
                    </svg>
                    <p className="text-xs text-[#4A0404] capitalize font-medium">{shape}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <label className="block font-medium text-[#4A0404] mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                {text.chooseColor}
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {NAIL_COLORS.map((colorOption) => (
                  <button
                    key={colorOption.name}
                    onClick={() => setNailColor(colorOption.color)}
                    className={`relative group`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full border-3 transition-all ${
                        nailColor === colorOption.color
                          ? "border-[#D4AF37] shadow-lg scale-110 ring-4 ring-[#D4AF37]/20"
                          : "border-white hover:scale-105"
                      }`}
                      style={{ backgroundColor: colorOption.color }}
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-[#4A0404]/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {colorOption.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Selector */}
            <div>
              <label className="block font-medium text-[#4A0404] mb-4">{text.finish}</label>
              <div className="grid grid-cols-3 gap-3">
                {(["glossy", "matte", "chrome"] as Finish[]).map((finishOption) => (
                  <button
                    key={finishOption}
                    onClick={() => setFinish(finishOption)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      finish === finishOption
                        ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-lg"
                        : "border-[#4A0404]/20 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <p className="text-sm text-[#4A0404] capitalize font-medium">
                      {finishOption === "glossy" ? text.glossy : finishOption === "matte" ? text.matte : text.chrome}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              className="w-full py-5 rounded-xl bg-gradient-to-r from-[#4A0404] to-[#D4AF37] text-white font-medium text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              {text.bookNow}
            </button>

            {/* Brooklyn Studio Location Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4A0404] to-[#D4AF37] p-6 text-white">
              {/* Abstract Map Pattern Background */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10">
                <h3 className="font-serif text-2xl mb-4">{text.studioLocation}</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{CONFIG.location}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{CONFIG.hours}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{CONFIG.phone}</p>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#4A0404] rounded-xl font-medium hover:bg-[#F7E7CE] transition-all"
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
