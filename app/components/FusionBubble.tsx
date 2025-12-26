"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, X, Sparkles } from "lucide-react";

interface FusionBubbleProps {
  lang: "en" | "es";
  onOpenInspiration?: () => void;
}

export default function FusionBubble({ lang, onOpenInspiration }: FusionBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const t = {
    en: {
      button: "Undecided?",
      subtitle: "Fuse your style",
      modalTitle: "AI Style Fusion",
      modalSubtitle: "Let Iva's AI blend your inspirations into a unique design",
      placeholder: "Describe your dream nails or paste inspiration links...",
      examples: "Examples:",
      example1: "Burgundy + gold accents + minimalist",
      example2: "Elegant bridal with subtle sparkle",
      example3: "Bold geometric patterns in rose tones",
      generate: "Generate Fusion",
      close: "Close",
    },
    es: {
      button: "¿Indecisa?",
      subtitle: "Fusiona tu estilo",
      modalTitle: "Fusión de Estilo IA",
      modalSubtitle: "Deja que la IA de Iva mezcle tus inspiraciones en un diseño único",
      placeholder: "Describe tus uñas soñadas o pega links de inspiración...",
      examples: "Ejemplos:",
      example1: "Burgundy + acentos dorados + minimalista",
      example2: "Elegante nupcial con brillo sutil",
      example3: "Patrones geométricos audaces en tonos rosa",
      generate: "Generar Fusión",
      close: "Cerrar",
    },
  };

  const text = t[lang];

  const handleClick = () => {
    setShowModal(true);
    setIsExpanded(false);
  };

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
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Glass Shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />

            {/* Content */}
            <div className="relative flex items-center gap-3 px-5 py-4">
              {/* Icon */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Wand2 className="w-6 h-6 text-[#4A0404]" />
              </motion.div>

              {/* Text */}
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

              {/* Sparkle Particle */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-4 h-4 text-[#4A0404]" fill="#4A0404" />
              </motion.div>
            </div>
          </div>

          {/* Breathing Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.button>
      </motion.div>

      {/* Inspiration Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-2xl w-full bg-gradient-to-br from-[#1A0F0A] via-[#2A1810] to-[#1A0F0A] rounded-3xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden"
            >
              {/* Decorative Mesh Background */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    radial-gradient(at 0% 0%, rgba(212, 175, 55, 0.3) 0px, transparent 50%),
                    radial-gradient(at 100% 0%, rgba(128, 0, 32, 0.2) 0px, transparent 50%),
                    radial-gradient(at 100% 100%, rgba(85, 26, 139, 0.15) 0px, transparent 50%),
                    radial-gradient(at 0% 100%, rgba(255, 228, 196, 0.25) 0px, transparent 50%)
                  `
                }}
              />

              {/* Header */}
              <div className="relative px-8 py-8 border-b border-white/10">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[#F7E7CE]" />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F7E7CE] flex items-center justify-center">
                    <Wand2 className="w-6 h-6 text-[#4A0404]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif text-[#F7E7CE]">{text.modalTitle}</h2>
                    <p className="text-sm text-[#F7E7CE]/70">{text.modalSubtitle}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative px-8 py-8 space-y-6">
                {/* Input Area */}
                <div>
                  <textarea
                    placeholder={text.placeholder}
                    rows={6}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-[#F7E7CE] placeholder-[#F7E7CE]/40 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 transition-all resize-none"
                  />
                </div>

                {/* Examples */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <p className="text-[#D4AF37] text-sm font-medium mb-3">{text.examples}</p>
                  <div className="space-y-2">
                    {[text.example1, text.example2, text.example3].map((example, i) => (
                      <button
                        key={i}
                        className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/30 transition-all text-sm text-[#F7E7CE]/80 hover:text-[#F7E7CE]"
                      >
                        <span className="text-[#D4AF37] mr-2">✨</span>
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F7E7CE] to-[#D4AF37] text-[#4A0404] font-medium hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  {text.generate}
                </motion.button>
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
