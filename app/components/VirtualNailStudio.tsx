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

// Skin tones for hand illustration
const SKIN_TONES = {
  fair: "#FFE0BD",
  medium: "#DEBA9D",
  tan: "#C68E6F",
  deep: "#8D5524",
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

  // Generate nail path based on shape - Townhouse style (more realistic proportions)
  const getNailPath = (shape: NailShape, baseY: number, width: number = 16, length: number = 50) => {
    const halfW = width / 2;
    const y = baseY;

    switch (shape) {
      case "almond":
        return `M${-halfW},${y} Q${-halfW},${y - 5} ${-halfW + 2},${y - 10} L${-2},${y - length + 8} Q0,${y - length} 2,${y - length + 8} L${halfW - 2},${y - 10} Q${halfW},${y - 5} ${halfW},${y} Z`;
      case "stiletto":
        return `M${-halfW},${y} L${-halfW + 2},${y - 10} L0,${y - length} L${halfW - 2},${y - 10} L${halfW},${y} Z`;
      case "square":
        return `M${-halfW},${y} L${-halfW},${y - length + 5} Q${-halfW},${y - length} ${-halfW + 3},${y - length} L${halfW - 3},${y - length} Q${halfW},${y - length} ${halfW},${y - length + 5} L${halfW},${y} Z`;
      case "coffin":
        return `M${-halfW},${y} L${-halfW},${y - length + 15} L${-halfW + 4},${y - length + 3} L${-3},${y - length} L3,${y - length} L${halfW - 4},${y - length + 3} L${halfW},${y - length + 15} L${halfW},${y} Z`;
      default:
        return "";
    }
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
          {/* LEFT: Professional Hand Illustration (Townhouse Style) */}
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

            {/* Professional Hand Illustration */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#4A0404]/10">
              <motion.svg
                viewBox="0 0 300 400"
                className="w-full h-auto max-w-sm mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <defs>
                  {/* Glossy Shine Gradient */}
                  <linearGradient id="glossyShine" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="white" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>

                  {/* Chrome Gradient */}
                  <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="25%" stopColor="#F7E7CE" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="75%" stopColor="#F7E7CE" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>

                  {/* Shadow filter */}
                  <filter id="nailShadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
                  </filter>

                  {/* Soft shadow for hand depth */}
                  <filter id="handShadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="0" dy="2" result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.2" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Radial gradient for hand shading */}
                  <radialGradient id="handShading" cx="50%" cy="40%">
                    <stop offset="0%" stopColor={SKIN_TONES[skinTone]} stopOpacity="1" />
                    <stop offset="100%" stopColor="#00000015" stopOpacity="0.15" />
                  </radialGradient>
                </defs>

                {/* Hand Palm - More realistic with shading */}
                <g filter="url(#handShadow)">
                  <motion.path
                    d="M95,385 Q70,365 68,335 C66,315 68,280 70,250 Q72,225 75,215 C77,205 82,200 90,198 L210,198 Q218,200 220,205 C222,210 225,220 227,235 Q230,260 230,290 C230,320 228,350 220,370 Q212,385 195,390 L100,390 Q97,388 95,385 Z"
                    fill="url(#handShading)"
                    stroke="#4A0404"
                    strokeWidth="0.3"
                    opacity="0.98"
                    key={skinTone}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.98 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Palm highlights for depth */}
                  <ellipse cx="150" cy="310" rx="35" ry="25" fill="white" opacity="0.08" />
                  <ellipse cx="120" cy="260" rx="20" ry="15" fill="white" opacity="0.05" />
                </g>

                {/* Fingers with realistic proportions and knuckle details */}
                {/* Pinky */}
                <g transform="translate(90, 150)">
                  {/* Finger base with knuckles */}
                  <path
                    d="M-7,50 Q-9,40 -9,30 C-9,25 -8.5,20 -8,15 Q-8,5 -7.5,-5 C-7,-10 -6.5,-15 -6,-20 Q-4,-15 -4,-10 C-4,-5 -4,0 -4,5 Q-4,15 -3.5,25 C-3,30 -3,35 -3,40 Q-2.5,45 -2,50 M2,50 Q2.5,45 3,40 C3,35 3,30 3.5,25 Q4,15 4,5 C4,0 4,-5 4,-10 Q4,-15 6,-20 Q6.5,-15 7,-10 C7.5,-5 8,0 8,5 Q8.5,10 8,15 C8.5,20 9,25 9,30 Q9,40 7,50 Z"
                    fill={SKIN_TONES[skinTone]}
                    stroke="#4A0404"
                    strokeWidth="0.3"
                  />

                  {/* Knuckle lines for realism */}
                  <line x1="-6" y1="12" x2="6" y2="12" stroke="#4A0404" strokeWidth="0.2" opacity="0.3" />
                  <line x1="-5" y1="32" x2="5" y2="32" stroke="#4A0404" strokeWidth="0.2" opacity="0.3" />

                  {/* Subtle shading on sides */}
                  <path d="M-7,50 Q-9,40 -9,30 L-8,30 Q-7,40 -6,50 Z" fill="black" opacity="0.05" />
                  <path d="M7,50 Q9,40 9,30 L8,30 Q7,40 6,50 Z" fill="black" opacity="0.05" />
                  <motion.path
                    key={`pinky-${nailShape}-${nailColor}`}
                    d={getNailPath(nailShape, -20, 12, 35)}
                    fill={finish === "chrome" ? "url(#chromeGradient)" : nailColor}
                    stroke="#4A0404"
                    strokeWidth="0.5"
                    filter="url(#nailShadow)"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0 }}
                  />
                  {finish === "glossy" && (
                    <ellipse cx="0" cy="-35" rx="4" ry="8" fill="url(#glossyShine)" />
                  )}
                </g>

                {/* Ring Finger */}
                <g transform="translate(120, 130)">
                  <path
                    d="M-8,70 Q-10,45 -10,20 C-10,10 -9.5,0 -9,-10 Q-8.5,-20 -8,-30 C-7.5,-32 -7,-34 -6.5,-35 Q-5.5,-32 -5,-30 C-4.5,-25 -4.5,-15 -4.5,-5 Q-4,10 -4,25 C-3.5,40 -3,55 -2.5,70 M2.5,70 Q3,55 3.5,40 C4,25 4,10 4.5,-5 Q4.5,-15 5,-25 C5.5,-30 6,-32 6.5,-35 Q7,-34 7.5,-32 C8,-30 8.5,-28 9,-26 Q9.5,-15 10,0 C10,10 10,20 10,30 Q10,50 8,70 Z"
                    fill={SKIN_TONES[skinTone]}
                    stroke="#4A0404"
                    strokeWidth="0.3"
                  />
                  <line x1="-7" y1="15" x2="7" y2="15" stroke="#4A0404" strokeWidth="0.2" opacity="0.3" />
                  <line x1="-6.5" y1="40" x2="6.5" y2="40" stroke="#4A0404" strokeWidth="0.2" opacity="0.3" />
                  <path d="M-8,70 Q-10,50 -10,30 L-9,30 Q-8,50 -7,70 Z" fill="black" opacity="0.05" />
                  <motion.path
                    key={`ring-${nailShape}-${nailColor}`}
                    d={getNailPath(nailShape, -35, 14, 45)}
                    fill={finish === "chrome" ? "url(#chromeGradient)" : nailColor}
                    stroke="#4A0404"
                    strokeWidth="0.5"
                    filter="url(#nailShadow)"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  />
                  {finish === "glossy" && (
                    <ellipse cx="0" cy="-52" rx="5" ry="10" fill="url(#glossyShine)" />
                  )}
                </g>

                {/* Middle Finger (longest) */}
                <g transform="translate(150, 110)">
                  <path
                    d="M-9,85 Q-11,55 -11,25 C-11,10 -10.5,-5 -10,-20 Q-9.5,-35 -9,-45 C-8.5,-48 -8,-49.5 -7.5,-50 Q-6,-48 -5.5,-45 C-5,-40 -5,-30 -5,-15 Q-4.5,0 -4.5,15 C-4,35 -3.5,60 -3,85 M3,85 Q3.5,60 4,35 C4.5,15 4.5,0 5,-15 Q5,-30 5.5,-40 C6,-45 6.5,-47.5 7.5,-50 Q8,-49.5 8.5,-48 C9,-47 9.5,-45 10,-42 Q10.5,-30 11,-15 C11,0 11,15 11,30 Q11,60 9,85 Z"
                    fill={SKIN_TONES[skinTone]}
                    stroke="#4A0404"
                    strokeWidth="0.3"
                  />
                  <line x1="-8" y1="20" x2="8" y2="20" stroke="#4A0404" strokeWidth="0.2" opacity="0.3" />
                  <line x1="-7.5" y1="50" x2="7.5" y2="50" stroke="#4A0404" strokeWidth="0.2" opacity="0.3" />
                  <path d="M-9,85 Q-11,60 -11,35 L-10,35 Q-9,60 -8,85 Z" fill="black" opacity="0.05" />
                  <motion.path
                    key={`middle-${nailShape}-${nailColor}`}
                    d={getNailPath(nailShape, -50, 16, 52)}
                    fill={finish === "chrome" ? "url(#chromeGradient)" : nailColor}
                    stroke="#4A0404"
                    strokeWidth="0.5"
                    filter="url(#nailShadow)"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  />
                  {finish === "glossy" && (
                    <ellipse cx="0" cy="-72" rx="5" ry="12" fill="url(#glossyShine)" />
                  )}
                </g>

                {/* Index Finger */}
                <g transform="translate(180, 125)">
                  <path
                    d="M-8,75 Q-10,48 -10,22 C-10,8 -9.5,-6 -9,-18 Q-8.5,-28 -8,-35 C-7.5,-36.5 -7,-37.5 -6.5,-38 Q-5.5,-36 -5,-34 C-4.5,-28 -4.5,-18 -4.5,-6 Q-4,12 -4,28 C-3.5,45 -3,60 -2.5,75 M2.5,75 Q3,60 3.5,45 C4,28 4,12 4.5,-6 Q4.5,-18 5,-28 C5.5,-34 6,-36 6.5,-38 Q7,-37.5 7.5,-36.5 C8,-35 8.5,-32 9,-28 Q9.5,-18 10,-6 C10,8 10,22 10,36 Q10,56 8,75 Z"
                    fill={SKIN_TONES[skinTone]}
                    stroke="#4A0404"
                    strokeWidth="0.3"
                  />
                  <line x1="-7" y1="18" x2="7" y2="18" stroke="#4A0404" strokeWidth="0.2" opacity="0.3" />
                  <line x1="-6.5" y1="43" x2="6.5" y2="43" stroke="#4A0404" strokeWidth="0.2" opacity="0.3" />
                  <path d="M-8,75 Q-10,55 -10,35 L-9,35 Q-8,55 -7,75 Z" fill="black" opacity="0.05" />
                  <motion.path
                    key={`index-${nailShape}-${nailColor}`}
                    d={getNailPath(nailShape, -38, 14, 48)}
                    fill={finish === "chrome" ? "url(#chromeGradient)" : nailColor}
                    stroke="#4A0404"
                    strokeWidth="0.5"
                    filter="url(#nailShadow)"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                  />
                  {finish === "glossy" && (
                    <ellipse cx="0" cy="-60" rx="5" ry="11" fill="url(#glossyShine)" />
                  )}
                </g>

                {/* Thumb */}
                <g transform="translate(70, 240)">
                  <path
                    d="M-11,40 Q-16,28 -19,14 C-20,6 -21,-2 -20,-10 Q-18,-18 -16,-23 C-15.5,-24 -15,-24.5 -14.5,-25 Q-12,-22 -10,-18 C-9,-12 -8.5,-4 -8,4 Q-7,18 -6,30 C-5.5,35 -5,37.5 -4.5,40 M4.5,40 Q5,37.5 5.5,35 C6,30 7,22 8,14 Q9,4 10,-4 C10.5,-10 11,-16 12,-20 Q13,-22 14.5,-25 Q15,-24.5 15.5,-24 C16,-23 17,-21 18,-18 Q19.5,-12 20,-6 C20.5,0 20.5,6 20,12 Q18,24 14,35 C12.5,38 11,39.5 10,40 Z"
                    fill={SKIN_TONES[skinTone]}
                    stroke="#4A0404"
                    strokeWidth="0.3"
                  />
                  <line x1="-10" y1="10" x2="10" y2="10" stroke="#4A0404" strokeWidth="0.2" opacity="0.3" />
                  <line x1="-8" y1="28" x2="8" y2="28" stroke="#4A0404" strokeWidth="0.2" opacity="0.3" />
                  <path d="M-11,40 Q-16,30 -19,20 L-18,20 Q-15,30 -10,40 Z" fill="black" opacity="0.05" />
                  <motion.path
                    key={`thumb-${nailShape}-${nailColor}`}
                    d={getNailPath(nailShape, -25, 18, 42)}
                    fill={finish === "chrome" ? "url(#chromeGradient)" : nailColor}
                    stroke="#4A0404"
                    strokeWidth="0.5"
                    filter="url(#nailShadow)"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
                  />
                  {finish === "glossy" && (
                    <ellipse cx="0" cy="-46" rx="6" ry="10" fill="url(#glossyShine)" />
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
                    <p className="text-xs mt-2 text-[#4A0404] capitalize text-center">{tone}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Nail Shape Selector */}
            <div>
              <label className="block font-medium text-[#4A0404] mb-4">{text.nailShape}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["almond", "stiletto", "square", "coffin"] as NailShape[]).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setNailShape(shape)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      nailShape === shape
                        ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-lg"
                        : "border-[#4A0404]/20 hover:border-[#D4AF37]/50"
                    }`}
                  >
                    <svg viewBox="-10 -60 20 70" className="w-full h-16 mb-2">
                      <path
                        d={getNailPath(shape, 0, 16, 50)}
                        fill={shape === nailShape ? "#D4AF37" : "#4A0404"}
                        opacity="0.4"
                        stroke="#4A0404"
                        strokeWidth="0.5"
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
                          : "border-white hover:scale-105 shadow-md"
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
