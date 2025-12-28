"use client";

/**
 * IVA Nail Art - VIP Membership Teaser
 * Exclusive membership offer popup
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, X, Check, Sparkles, Gift, Calendar, Star, ArrowRight } from "lucide-react";

interface VIPTeaserProps {
  lang?: "en" | "es";
}

const VIP_BENEFITS = [
  { icon: Calendar, en: "Priority booking access", es: "Acceso prioritario a citas" },
  { icon: Gift, en: "15% off all services", es: "15% de descuento en todos los servicios" },
  { icon: Sparkles, en: "Free nail art upgrades", es: "Mejoras de arte gratis" },
  { icon: Star, en: "Exclusive member events", es: "Eventos exclusivos para miembros" },
];

export default function VIPTeaser({ lang = "en" }: VIPTeaserProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  // Show after significant scroll (50% of page)
  useEffect(() => {
    const handleScroll = () => {
      if (hasBeenShown) return;

      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercent > 50) {
        setIsVisible(true);
        setHasBeenShown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasBeenShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const t = {
    en: {
      badge: "EXCLUSIVE OFFER",
      title: "Join the VIP Club",
      subtitle: "Unlock premium perks & save on every visit",
      price: "$29",
      period: "/month",
      cta: "Become a VIP",
      secondary: "Learn More",
      limited: "Limited spots available",
    },
    es: {
      badge: "OFERTA EXCLUSIVA",
      title: "Únete al Club VIP",
      subtitle: "Desbloquea beneficios premium y ahorra en cada visita",
      price: "$29",
      period: "/mes",
      cta: "Ser VIP",
      secondary: "Más Info",
      limited: "Plazas limitadas",
    },
  };

  const text = t[lang];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C1017] via-[#2A1A1F] to-[#0D0809]" />

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B76E79]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4A574]/15 rounded-full blur-3xl" />

              {/* Floating sparkles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${15 + i * 18}%`,
                    top: `${10 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-[#D4A574]/40" />
                </motion.div>
              ))}

              {/* Content */}
              <div className="relative p-8">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white/80" />
                </button>

                {/* Crown Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-6 shadow-xl shadow-amber-500/30"
                >
                  <Crown className="w-10 h-10 text-white" />
                </motion.div>

                {/* Badge */}
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold tracking-wider">
                    {text.badge}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-serif font-bold text-white text-center mb-2">
                  {text.title}
                </h2>
                <p className="text-white/60 text-center mb-6">{text.subtitle}</p>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                    {text.price}
                  </span>
                  <span className="text-white/50 text-lg">{text.period}</span>
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  {VIP_BENEFITS.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B76E79]/30 to-[#722F37]/30 flex items-center justify-center">
                        <benefit.icon className="w-4 h-4 text-[#E8B4B8]" />
                      </div>
                      <span className="text-white/80 text-sm flex-1">
                        {lang === "en" ? benefit.en : benefit.es}
                      </span>
                      <Check className="w-4 h-4 text-emerald-400" />
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-[#1A1A1A] font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 mb-3"
                >
                  <Crown className="w-5 h-5" />
                  {text.cta}
                </motion.button>

                <button
                  onClick={handleClose}
                  className="w-full py-3 text-white/60 hover:text-white text-sm font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  {text.secondary}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Limited spots */}
                <p className="text-center text-amber-400/60 text-xs mt-4 flex items-center justify-center gap-1">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  {text.limited}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
