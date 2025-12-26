"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Phone, Clock, Palette, Wand2 } from "lucide-react";
import { CONFIG } from "../constants";
import { getHandImage, getSkinTones, LUXURY_OVERLAYS, type HandImage } from "../constants/handAssets";

interface VirtualNailStudioProps {
  lang: "en" | "es";
}

type SkinTone = HandImage["skinTone"];
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
      bookNow: "Claim Your Spot",
      recommendations: {
        light: "For your fair skin tone, Iva recommends soft nudes, pastel pinks, or classic reds for a stunning contrast.",
        medium: "Your medium tone pairs beautifully with warm burgundy, rose gold, or deep plums.",
        tan: "Rich tan skin looks incredible with bold burgundy, metallics, or vibrant corals.",
        deep: "Your deep skin tone shines with deep burgundy, gold chrome, or crisp white for maximum impact.",
        rich: "Your rich skin tone is perfection with jewel tones, gold chrome, or bold burgundy.",
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
      bookNow: "Asegura tu Espacio",
      recommendations: {
        light: "Para tu tono de piel claro, Iva recomienda nudes suaves, rosas pastel o rojos clásicos para un contraste impresionante.",
        medium: "Tu tono medio combina hermosamente con burgundy cálido, oro rosa o ciruelas profundas.",
        tan: "La piel tan rica se ve increíble con burgundy audaz, metálicos o corales vibrantes.",
        deep: "Tu tono de piel profundo brilla con burgundy intenso, cromo dorado o blanco nítido para máximo impacto.",
        rich: "Tu tono rico es perfección con tonos joya, cromo dorado o burgundy audaz.",
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
      ? `Hi! I tried the Virtual Nail Studio and I love this combination:\n\n💅 Shape: ${nailShape}\n🎨 Color: ${NAIL_COLORS.find(c => c.color === nailColor)?.name || "Custom"}\n✨ Finish: ${finish}\n\nI'd like to claim my exclusive spot!`
      : `¡Hola! Probé el Estudio Virtual y me encanta esta combinación:\n\n💅 Forma: ${nailShape}\n🎨 Color: ${NAIL_COLORS.find(c => c.color === nailColor)?.name || "Personalizado"}\n✨ Acabado: ${finish}\n\n¡Me gustaría asegurar mi espacio exclusivo!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handImage = getHandImage(skinTone, "palm");

  // Get finish CSS class
  const getFinishClass = () => {
    if (finish === "glossy") return "shadow-2xl";
    if (finish === "matte") return "saturate-90";
    if (finish === "chrome") return "shadow-2xl saturate-150";
    return "";
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Luxury Mesh Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A1810] via-[#1A0F0A] to-[#4A0404] opacity-95" />
      <div className="absolute inset-0" style={{ background: LUXURY_OVERLAYS.meshGradient }} />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      />

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
          {/* LEFT: Photorealistic Hand Visualization */}
          <div className="relative">
            {/* AI Recommendation Popup */}
            <AnimatePresence>
              {showRecommendation && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-md"
                >
                  <div className="bg-gradient-to-r from-[#4A0404] via-[#6A1414] to-[#D4AF37] text-white rounded-2xl p-4 shadow-2xl border border-[#D4AF37]/30 backdrop-blur-md">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5 animate-pulse" />
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

            {/* Photorealistic Hand with Glassmorphism */}
            <motion.div
              key={skinTone}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10"
            >
              {/* Luxury glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#4A0404]/10 pointer-events-none" />

              {/* Hand Image Container */}
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
                {/* Base Hand Image */}
                <motion.div
                  key={`hand-${skinTone}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{
                    backgroundImage: `url(${handImage.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'contrast(1.05) brightness(1.02)',
                  }}
                >
                  {/* Overlay for luxury aesthetic */}
                  <div className="absolute inset-0" style={{ background: LUXURY_OVERLAYS.goldenHour }} />
                </motion.div>

                {/* Nail Color Overlays - Positioned over fingernails */}
                {/* These positions are approximate - adjust based on actual hand images */}
                {[
                  { id: 'thumb', top: '65%', left: '15%', size: '18%', delay: 0 },
                  { id: 'index', top: '15%', left: '65%', size: '16%', delay: 0.1 },
                  { id: 'middle', top: '5%', left: '48%', size: '17%', delay: 0.2 },
                  { id: 'ring', top: '12%', left: '32%', size: '16%', delay: 0.3 },
                  { id: 'pinky', top: '25%', left: '18%', size: '14%', delay: 0.4 },
                ].map((nail) => (
                  <motion.div
                    key={`${nail.id}-${nailColor}-${finish}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: nail.delay
                    }}
                    className={`absolute ${getFinishClass()}`}
                    style={{
                      top: nail.top,
                      left: nail.left,
                      width: nail.size,
                      aspectRatio: nailShape === 'square' ? '0.7' : nailShape === 'stiletto' ? '0.4' : '0.55',
                      background: finish === 'chrome'
                        ? `linear-gradient(135deg, ${nailColor} 0%, #FFD700 50%, ${nailColor} 100%)`
                        : nailColor,
                      borderRadius: nailShape === 'square'
                        ? '8% 8% 0 0'
                        : nailShape === 'almond'
                        ? '50% 50% 50% 50% / 60% 60% 40% 40%'
                        : nailShape === 'stiletto'
                        ? '50% 50% 50% 50% / 80% 80% 20% 20%'
                        : '40% 40% 0 0',
                      opacity: finish === 'matte' ? 0.85 : 0.9,
                      filter: finish === 'glossy'
                        ? 'brightness(1.1) saturate(1.2)'
                        : finish === 'chrome'
                        ? 'brightness(1.3) saturate(1.5)'
                        : 'saturate(0.9)',
                      mixBlendMode: 'multiply',
                      transform: 'rotate(-5deg)',
                    }}
                  >
                    {/* Glossy highlight */}
                    {finish === 'glossy' && (
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-1/4 bg-white/60 rounded-full blur-sm" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Current Selection Display */}
              <div className="mt-8 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#F7E7CE]/70">Current Style:</span>
                  <span className="font-medium text-[#F7E7CE]">
                    {nailShape.charAt(0).toUpperCase() + nailShape.slice(1)} • {finish.charAt(0).toUpperCase() + finish.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Controls with Glassmorphism */}
          <div className="space-y-8">
            {/* Skin Tone Selector */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <label className="block font-medium text-[#F7E7CE] mb-4 font-serif text-lg">{text.skinTone}</label>
              <div className="grid grid-cols-5 gap-3">
                {getSkinTones().map((tone) => {
                  const toneImage = getHandImage(tone);
                  return (
                    <button
                      key={tone}
                      onClick={() => setSkinTone(tone)}
                      className={`relative p-2 rounded-xl border-2 transition-all ${
                        skinTone === tone
                          ? "border-[#D4AF37] shadow-lg shadow-[#D4AF37]/30 scale-105"
                          : "border-white/20 hover:border-[#D4AF37]/50"
                      }`}
                    >
                      <div
                        className="w-full h-16 rounded-lg"
                        style={{
                          backgroundImage: `url(${toneImage.url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <p className="text-xs mt-2 text-[#F7E7CE] capitalize text-center">{tone}</p>
                    </button>
                  );
                })}
              </div>
            </div>

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
                    <div className="w-full h-16 mb-2 flex items-center justify-center">
                      <div
                        className="h-full aspect-[0.5]"
                        style={{
                          background: shape === nailShape ? "#D4AF37" : "#F7E7CE",
                          borderRadius: shape === 'square'
                            ? '20% 20% 0 0'
                            : shape === 'almond'
                            ? '50% 50% 50% 50% / 60% 60% 40% 40%'
                            : shape === 'stiletto'
                            ? '50% 50% 50% 50% / 80% 80% 20% 20%'
                            : '40% 40% 0 0',
                        }}
                      />
                    </div>
                    <p className="text-xs text-[#F7E7CE] capitalize font-medium">{shape}</p>
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
                    className={`relative group`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full border-3 transition-all ${
                        nailColor === colorOption.color
                          ? "border-[#D4AF37] shadow-lg shadow-[#D4AF37]/40 scale-110 ring-4 ring-[#D4AF37]/20"
                          : "border-white/30 hover:scale-105 shadow-md"
                      }`}
                      style={{ backgroundColor: colorOption.color }}
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-[#F7E7CE]/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {colorOption.name}
                    </span>
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
                    className={`p-4 rounded-xl border-2 transition-all ${
                      finish === finishOption
                        ? "border-[#D4AF37] bg-[#D4AF37]/20 shadow-lg"
                        : "border-white/20 hover:border-[#D4AF37]/50"
                    }`}
                  >
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
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4A0404]/80 via-[#6A1414]/80 to-[#D4AF37]/80 backdrop-blur-md p-6 text-white border border-white/10">
              <div className="relative z-10">
                <h3 className="font-serif text-2xl mb-4 text-[#F7E7CE]">{text.studioLocation}</h3>

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
