"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Phone, Clock, Palette, Wand2 } from "lucide-react";
import { CONFIG } from "../constants";

interface VirtualNailStudioProps {
  lang: "en" | "es";
}

type SkinTone = "fair" | "medium" | "tan" | "deep";
type NailShape = "almond" | "stiletto" | "square" | "coffin";
type Finish = "glossy" | "matte" | "chrome";

const SKIN_TONES = {
  fair: "#FFE0BD",
  medium: "#DEBA9D",
  tan: "#C68E6F",
  deep: "#8D5524",
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

// SVG paths para diferentes formas de uñas
const NAIL_SHAPES = {
  almond: "M20,5 Q30,0 40,5 L40,35 Q30,45 20,35 Z",
  stiletto: "M20,5 L40,5 L30,50 Z",
  square: "M20,5 L40,5 L40,40 L20,40 Z",
  coffin: "M20,5 L40,5 L38,40 L30,50 L22,40 Z",
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

  const getFinishStyle = (baseColor: string): string => {
    if (finish === "matte") return baseColor;
    if (finish === "chrome") {
      return `url(#chromeGradient)`;
    }
    return baseColor; // glossy
  };

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
          {/* LEFT: Interactive Hand Visualizer */}
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

            {/* SVG Hand Visualizer */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#4A0404]/10">
              <motion.svg
                viewBox="0 0 400 500"
                className="w-full h-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <defs>
                  {/* Chrome Gradient */}
                  <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#D4AF37", stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: "#F7E7CE", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#D4AF37", stopOpacity: 1 }} />
                  </linearGradient>

                  {/* Glossy Shine */}
                  <linearGradient id="glossyShine" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0.4 }} />
                    <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }} />
                  </linearGradient>

                  {/* Matte filter */}
                  <filter id="matteFilter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
                  </filter>
                </defs>

                {/* Hand Palm */}
                <path
                  d="M150,400 Q100,350 100,300 L100,200 Q100,180 120,180 L280,180 Q300,180 300,200 L300,300 Q300,350 250,400 Z"
                  fill={SKIN_TONES[skinTone]}
                  stroke="#4A0404"
                  strokeWidth="1"
                  opacity="0.95"
                />

                {/* Fingers - 5 fingers with nails */}
                {/* Thumb */}
                <g>
                  <path
                    d="M100,220 Q80,200 80,170 Q80,140 100,120 Q120,140 120,170 Q120,200 100,220 Z"
                    fill={SKIN_TONES[skinTone]}
                    stroke="#4A0404"
                    strokeWidth="1"
                  />
                  <motion.path
                    d={NAIL_SHAPES[nailShape]}
                    transform="translate(70, 100) scale(0.6)"
                    fill={getFinishStyle(nailColor)}
                    stroke="#4A0404"
                    strokeWidth="1.5"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 0.6, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  />
                  {finish === "glossy" && (
                    <ellipse
                      cx="90"
                      cy="115"
                      rx="8"
                      ry="4"
                      fill="url(#glossyShine)"
                      opacity="0.6"
                    />
                  )}
                </g>

                {/* Index Finger */}
                <g>
                  <path
                    d="M140,180 Q130,100 130,60 Q130,30 150,20 Q170,30 170,60 Q170,100 160,180 Z"
                    fill={SKIN_TONES[skinTone]}
                    stroke="#4A0404"
                    strokeWidth="1"
                  />
                  <motion.path
                    d={NAIL_SHAPES[nailShape]}
                    transform="translate(120, 0) scale(0.65)"
                    fill={getFinishStyle(nailColor)}
                    stroke="#4A0404"
                    strokeWidth="1.5"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 0.65, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  />
                  {finish === "glossy" && (
                    <ellipse
                      cx="145"
                      cy="18"
                      rx="8"
                      ry="5"
                      fill="url(#glossyShine)"
                      opacity="0.6"
                    />
                  )}
                </g>

                {/* Middle Finger */}
                <g>
                  <path
                    d="M180,180 Q175,90 175,40 Q175,10 195,0 Q215,10 215,40 Q215,90 210,180 Z"
                    fill={SKIN_TONES[skinTone]}
                    stroke="#4A0404"
                    strokeWidth="1"
                  />
                  <motion.path
                    d={NAIL_SHAPES[nailShape]}
                    transform="translate(165, -20) scale(0.7)"
                    fill={getFinishStyle(nailColor)}
                    stroke="#4A0404"
                    strokeWidth="1.5"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 0.7, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  />
                  {finish === "glossy" && (
                    <ellipse
                      cx="195"
                      cy="0"
                      rx="9"
                      ry="5"
                      fill="url(#glossyShine)"
                      opacity="0.6"
                    />
                  )}
                </g>

                {/* Ring Finger */}
                <g>
                  <path
                    d="M220,180 Q218,100 218,55 Q218,25 238,15 Q258,25 258,55 Q258,100 255,180 Z"
                    fill={SKIN_TONES[skinTone]}
                    stroke="#4A0404"
                    strokeWidth="1"
                  />
                  <motion.path
                    d={NAIL_SHAPES[nailShape]}
                    transform="translate(208, -5) scale(0.65)"
                    fill={getFinishStyle(nailColor)}
                    stroke="#4A0404"
                    strokeWidth="1.5"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 0.65, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                  />
                  {finish === "glossy" && (
                    <ellipse
                      cx="238"
                      cy="13"
                      rx="8"
                      ry="5"
                      fill="url(#glossyShine)"
                      opacity="0.6"
                    />
                  )}
                </g>

                {/* Pinky Finger */}
                <g>
                  <path
                    d="M260,180 Q262,120 262,80 Q262,50 280,40 Q298,50 298,80 Q298,120 295,180 Z"
                    fill={SKIN_TONES[skinTone]}
                    stroke="#4A0404"
                    strokeWidth="1"
                  />
                  <motion.path
                    d={NAIL_SHAPES[nailShape]}
                    transform="translate(252, 20) scale(0.55)"
                    fill={getFinishStyle(nailColor)}
                    stroke="#4A0404"
                    strokeWidth="1.5"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 0.55, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
                  />
                  {finish === "glossy" && (
                    <ellipse
                      cx="272"
                      cy="38"
                      rx="7"
                      ry="4"
                      fill="url(#glossyShine)"
                      opacity="0.6"
                    />
                  )}
                </g>
              </motion.svg>

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
                {(Object.keys(SKIN_TONES) as SkinTone[]).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSkinTone(tone)}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      skinTone === tone
                        ? "border-[#D4AF37] shadow-lg scale-105"
                        : "border-[#4A0404]/20 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <div
                      className="w-full h-12 rounded-lg"
                      style={{ backgroundColor: SKIN_TONES[tone] }}
                    />
                    <p className="text-xs mt-2 text-[#4A0404] capitalize">{tone}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Nail Shape Selector */}
            <div>
              <label className="block font-medium text-[#4A0404] mb-4">{text.nailShape}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(Object.keys(NAIL_SHAPES) as NailShape[]).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setNailShape(shape)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      nailShape === shape
                        ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-lg"
                        : "border-[#4A0404]/20 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <svg viewBox="0 0 60 70" className="w-full h-16 mb-2">
                      <path
                        d={NAIL_SHAPES[shape]}
                        fill={shape === nailShape ? "#D4AF37" : "#4A0404"}
                        opacity="0.3"
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
