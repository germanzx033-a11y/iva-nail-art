"use client";

/**
 * IVA Nail Art - Special Offer Banner
 * Animated promotional banner with countdown
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Clock, Gift, ChevronRight } from "lucide-react";

interface SpecialOfferBannerProps {
  lang?: "en" | "es";
  onBook?: () => void;
}

export default function SpecialOfferBanner({ lang = "en", onBook }: SpecialOfferBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  // Show after 8 seconds of page load
  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!hasBeenDismissed) {
        setIsVisible(true);
      }
    }, 8000);
    return () => clearTimeout(showTimer);
  }, [hasBeenDismissed]);

  // Countdown timer
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasBeenDismissed(true);
  };

  const handleClaim = () => {
    if (onBook) {
      onBook();
    }
    handleDismiss();
  };

  const t = {
    en: {
      badge: "LIMITED TIME",
      title: "New Year Special",
      subtitle: "Get 15% OFF your first visit",
      code: "Use code: BEAUTY2025",
      cta: "Claim Now",
      expires: "Expires in",
    },
    es: {
      badge: "TIEMPO LIMITADO",
      title: "Especial de Año Nuevo",
      subtitle: "Obtén 15% de descuento en tu primera visita",
      code: "Usa el código: BEAUTY2025",
      cta: "Reclamar Ahora",
      expires: "Expira en",
    },
  };

  const text = t[lang];

  const formatNumber = (n: number) => n.toString().padStart(2, "0");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-4 right-4 z-[100] w-80 max-w-[calc(100vw-2rem)]"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#722F37] via-[#8B3A44] to-[#B76E79]" />

            {/* Animated sparkles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 3) * 30}%`,
                  }}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-3 h-3 text-white/30" />
                </motion.div>
              ))}
            </div>

            {/* Content */}
            <div className="relative p-5">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400 rounded-full mb-3">
                <Gift className="w-3 h-3 text-amber-900" />
                <span className="text-[10px] font-bold text-amber-900 tracking-wider">
                  {text.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl text-white font-semibold mb-1">
                {text.title}
              </h3>
              <p className="text-white/90 text-sm mb-2">{text.subtitle}</p>

              {/* Code */}
              <div className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg mb-4">
                <span className="font-mono text-white text-sm font-bold tracking-wider">
                  {text.code}
                </span>
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-white/70" />
                <span className="text-white/70 text-xs">{text.expires}:</span>
                <div className="flex items-center gap-1">
                  <span className="px-2 py-1 bg-white/20 rounded text-white text-sm font-bold font-mono">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-white/70">:</span>
                  <span className="px-2 py-1 bg-white/20 rounded text-white text-sm font-bold font-mono">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-white/70">:</span>
                  <span className="px-2 py-1 bg-white/20 rounded text-white text-sm font-bold font-mono">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleClaim}
                className="w-full py-3 bg-white text-[#722F37] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {text.cta}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Decorative corner */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
