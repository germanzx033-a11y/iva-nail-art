"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, X, Sparkles, Check, MessageCircle } from "lucide-react";
import { CONFIG } from "../constants";

interface FusionBubbleProps {
  lang: "en" | "es";
}

// Generated style names for the result
const STYLE_NAMES = {
  en: [
    "Golden Hour Elegance",
    "Midnight Luxe",
    "Rose Petal Dream",
    "Champagne Toast",
    "Velvet Burgundy",
    "Crystal Aurora",
  ],
  es: [
    "Elegancia Hora Dorada",
    "Lujo de Medianoche",
    "Sueño Pétalo Rosa",
    "Brindis Champagne",
    "Burgundy Terciopelo",
    "Aurora de Cristal",
  ],
};

export default function FusionBubble({ lang }: FusionBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inspiration, setInspiration] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [generatedStyle, setGeneratedStyle] = useState("");
  const [clickedExample, setClickedExample] = useState<number | null>(null);

  const t = {
    en: {
      button: "Undecided?",
      subtitle: "Fuse your style",
      modalTitle: "AI Style Fusion",
      modalSubtitle: "Let Iva's AI blend your inspirations into a unique design",
      placeholder: "Describe your dream nails or paste inspiration links...",
      examples: "Quick ideas:",
      example1: "Burgundy + gold accents + minimalist",
      example2: "Elegant bridal with subtle sparkle",
      example3: "Bold geometric patterns in rose tones",
      generate: "Generate Fusion",
      close: "Close",
      loadingPhrases: [
        "Analyzing preferences...",
        "Blending textures...",
        "Applying finish...",
      ],
      resultTitle: "Fusion Complete",
      resultSubtitle: "Your unique style has been created",
      bookNow: "Book This Look",
      tryAnother: "Try Another",
    },
    es: {
      button: "¿Indecisa?",
      subtitle: "Fusiona tu estilo",
      modalTitle: "Fusión de Estilo IA",
      modalSubtitle: "Deja que la IA de Iva mezcle tus inspiraciones en un diseño único",
      placeholder: "Describe tus uñas soñadas o pega links de inspiración...",
      examples: "Ideas rápidas:",
      example1: "Burgundy + acentos dorados + minimalista",
      example2: "Elegante nupcial con brillo sutil",
      example3: "Patrones geométricos audaces en tonos rosa",
      generate: "Generar Fusión",
      close: "Cerrar",
      loadingPhrases: [
        "Analizando preferencias...",
        "Mezclando texturas...",
        "Aplicando acabado...",
      ],
      resultTitle: "Fusión Completada",
      resultSubtitle: "Tu estilo único ha sido creado",
      bookNow: "Reservar Este Look",
      tryAnother: "Probar Otro",
    },
  };

  const text = t[lang];

  // Loading phase animation - changes every 800ms for disruptive effect
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingPhase((prev) => (prev + 1) % 3);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleClick = () => {
    setShowModal(true);
    setIsExpanded(false);
  };

  const handleExampleClick = useCallback((example: string, index: number) => {
    setInspiration(example);
    setClickedExample(index);
    setTimeout(() => setClickedExample(null), 300);
  }, []);

  const handleGenerate = useCallback(() => {
    if (!inspiration.trim() || isLoading) return;

    setIsLoading(true);
    setLoadingPhase(0);

    // Simulate AI processing with 3 second delay
    setTimeout(() => {
      setIsLoading(false);
      // Pick a random style name
      const styles = STYLE_NAMES[lang];
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      setGeneratedStyle(randomStyle);
      setShowResult(true);
    }, 3000);
  }, [inspiration, isLoading, lang]);

  const handleBookNow = useCallback(() => {
    const message = lang === "en"
      ? `Hi Iva! I used the AI Style Fusion and created this look:\n\n✨ Style: ${generatedStyle}\n💭 Inspiration: ${inspiration}\n\nI'd love to book an appointment to bring this to life!`
      : `¡Hola Iva! Usé la Fusión de Estilo IA y creé este look:\n\n✨ Estilo: ${generatedStyle}\n💭 Inspiración: ${inspiration}\n\n¡Me encantaría reservar una cita para hacerlo realidad!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }, [generatedStyle, inspiration, lang]);

  const handleTryAnother = useCallback(() => {
    setShowResult(false);
    setInspiration("");
    setGeneratedStyle("");
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setShowResult(false);
    setInspiration("");
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Floating Bubble Button */}
      <motion.div
        className="fixed bottom-24 right-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={handleClick}
          onHoverStart={() => setIsExpanded(true)}
          onHoverEnd={() => setIsExpanded(false)}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F7E7CE] to-[#4A0404] blur-xl opacity-60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main Bubble */}
          <div className="relative flex items-center gap-3 bg-gradient-to-br from-[#D4AF37] via-[#F7E7CE] to-[#D4AF37] rounded-full shadow-2xl overflow-hidden border-2 border-white/30">
            {/* Liquid Effect Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[#4A0404]/10"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Glass Shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            />

            {/* Content */}
            <div className="relative flex items-center gap-3 px-5 py-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Wand2 className="w-6 h-6 text-[#4A0404]" />
              </motion.div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="whitespace-nowrap text-[#4A0404]">
                      <p className="text-sm font-medium">{text.button}</p>
                      <p className="text-xs opacity-80">{text.subtitle}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-4 h-4 text-[#4A0404]" fill="#4A0404" />
              </motion.div>
            </div>
          </div>

          {/* Breathing Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-2xl w-full bg-gradient-to-br from-[#1A0F0A] via-[#2A1810] to-[#1A0F0A] rounded-3xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden my-8"
            >
              {/* Decorative Mesh Background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    radial-gradient(at 0% 0%, rgba(212, 175, 55, 0.3) 0px, transparent 50%),
                    radial-gradient(at 100% 0%, rgba(128, 0, 32, 0.2) 0px, transparent 50%),
                    radial-gradient(at 100% 100%, rgba(85, 26, 139, 0.15) 0px, transparent 50%),
                    radial-gradient(at 0% 100%, rgba(255, 228, 196, 0.25) 0px, transparent 50%)
                  `,
                }}
              />

              {/* Header */}
              <div className="relative px-6 sm:px-8 py-6 border-b border-white/10">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[#F7E7CE]" />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F7E7CE] flex items-center justify-center">
                    <Wand2 className="w-6 h-6 text-[#4A0404]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif text-[#F7E7CE]">{text.modalTitle}</h2>
                    <p className="text-xs sm:text-sm text-[#F7E7CE]/70">{text.modalSubtitle}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative px-6 sm:px-8 py-6 sm:py-8 space-y-6">
                <AnimatePresence mode="wait">
                  {!showResult ? (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Input Area */}
                      <div>
                        <textarea
                          placeholder={text.placeholder}
                          rows={4}
                          value={inspiration}
                          onChange={(e) => setInspiration(e.target.value)}
                          disabled={isLoading}
                          className="w-full px-5 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-[#F7E7CE] placeholder-[#F7E7CE]/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all resize-none disabled:opacity-50"
                        />
                      </div>

                      {/* Examples with click feedback */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                        <p className="text-[#D4AF37] text-sm font-medium mb-3">{text.examples}</p>
                        <div className="space-y-2">
                          {[text.example1, text.example2, text.example3].map((example, i) => (
                            <motion.button
                              key={i}
                              onClick={() => handleExampleClick(example, i)}
                              disabled={isLoading}
                              whileTap={{ scale: 0.98 }}
                              animate={clickedExample === i ? {
                                backgroundColor: ["rgba(212,175,55,0.3)", "rgba(255,255,255,0.05)"],
                                borderColor: ["rgba(212,175,55,1)", "rgba(255,255,255,0.1)"],
                                boxShadow: ["0 0 20px rgba(212,175,55,0.5)", "0 0 0px rgba(212,175,55,0)"],
                              } : {}}
                              transition={{ duration: 0.4 }}
                              className={`w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-[#D4AF37]/50 transition-all text-sm text-[#F7E7CE]/80 hover:text-[#F7E7CE] disabled:opacity-50 disabled:cursor-not-allowed ${
                                clickedExample === i ? "ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#1A0F0A] border-[#D4AF37]" : ""
                              } ${
                                inspiration === example ? "border-[#D4AF37]/60 bg-[#D4AF37]/10" : ""
                              }`}
                            >
                              <span className="text-[#D4AF37] mr-2">✨</span>
                              {example}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Generate Button with dynamic loading states */}
                      <motion.button
                        onClick={handleGenerate}
                        disabled={!inspiration.trim() || isLoading}
                        whileHover={inspiration.trim() && !isLoading ? { scale: 1.02 } : {}}
                        whileTap={inspiration.trim() && !isLoading ? { scale: 0.98 } : {}}
                        className={`w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 min-h-[56px] ${
                          isLoading
                            ? "bg-gradient-to-r from-[#D4AF37] via-[#F7E7CE] to-[#D4AF37] text-[#4A0404] cursor-wait"
                            : inspiration.trim()
                            ? "bg-gradient-to-r from-[#D4AF37] via-[#F7E7CE] to-[#D4AF37] text-[#4A0404] hover:shadow-lg hover:shadow-[#D4AF37]/30 cursor-pointer"
                            : "bg-white/10 text-[#F7E7CE]/40 cursor-not-allowed"
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {isLoading ? (
                            <motion.div
                              key={`loading-${loadingPhase}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center gap-2"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Sparkles className="w-5 h-5" />
                              </motion.div>
                              <span>{text.loadingPhrases[loadingPhase]}</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="generate"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-2"
                            >
                              <Sparkles className="w-5 h-5" />
                              {text.generate}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  ) : (
                    /* Result Card */
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Success Animation */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="flex justify-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F7E7CE] flex items-center justify-center shadow-lg shadow-[#D4AF37]/30">
                          <Check className="w-8 h-8 text-[#4A0404]" />
                        </div>
                      </motion.div>

                      {/* Result Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-[#D4AF37]/30"
                      >
                        {/* Generated Style Preview */}
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-[#4A0404] via-[#2A1810] to-[#D4AF37]/30">
                          {/* Decorative nail art preview */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex -space-x-2">
                              {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3 + i * 0.1 }}
                                  className="relative"
                                  style={{
                                    transform: `rotate(${(i - 2) * 12}deg)`,
                                  }}
                                >
                                  <div
                                    className="w-8 h-14 rounded-t-full shadow-lg"
                                    style={{
                                      background: `linear-gradient(135deg, ${
                                        i % 2 === 0 ? "#D4AF37" : "#4A0404"
                                      } 0%, ${i % 2 === 0 ? "#F7E7CE" : "#6A1414"} 100%)`,
                                    }}
                                  />
                                  {/* Shine effect */}
                                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-5 bg-gradient-to-b from-white/60 to-transparent rounded-full" />
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Sparkle particles */}
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              style={{
                                left: `${20 + Math.random() * 60}%`,
                                top: `${20 + Math.random() * 60}%`,
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                            >
                              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                            </motion.div>
                          ))}
                        </div>

                        {/* Style Name */}
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-serif text-[#D4AF37] mb-1">
                            {text.resultTitle}
                          </h3>
                          <p className="text-2xl font-serif text-[#F7E7CE] mb-2">
                            &quot;{generatedStyle}&quot;
                          </p>
                          <p className="text-sm text-[#F7E7CE]/60">{text.resultSubtitle}</p>
                        </div>

                        {/* Inspiration echo */}
                        <div className="bg-white/5 rounded-xl p-4 mb-4">
                          <p className="text-xs text-[#D4AF37] mb-1">Based on:</p>
                          <p className="text-sm text-[#F7E7CE]/80 italic">&quot;{inspiration}&quot;</p>
                        </div>
                      </motion.div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.button
                          onClick={handleBookNow}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F7E7CE] to-[#D4AF37] text-[#4A0404] font-medium hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-5 h-5" />
                          {text.bookNow}
                        </motion.button>

                        <motion.button
                          onClick={handleTryAnother}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-4 rounded-xl bg-white/10 text-[#F7E7CE] font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/10"
                        >
                          <Wand2 className="w-5 h-5" />
                          {text.tryAnother}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#4A0404]/20 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
