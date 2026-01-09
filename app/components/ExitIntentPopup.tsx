"use client";

/**
 * IVA Nail Art - Exit Intent Popup
 * Modelo 360 - Loss Aversion Trigger (Limbic Brain)
 * Captures departing visitors with irresistible offer
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Heart, Sparkles, Clock } from "lucide-react";

interface ExitIntentPopupProps {
  language?: "en" | "es";
  onBook?: () => void;
}

export default function ExitIntentPopup({ language = "en", onBook }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isEn = language === "en";

  const COPY = {
    en: {
      waitTitle: "Wait! Don't Go Yet...",
      subtitle: "We have a special gift just for you!",
      offerTitle: "FREE Nail Art Upgrade",
      offerDescription: "Book any ritual today and get a complimentary nail art design on two nails (worth $25)!",
      code: "STAYWITHIVA",
      cta: "Claim My Free Gift",
      noThanks: "No thanks, I'll pay full price",
      urgency: "Offer expires in 24 hours",
    },
    es: {
      waitTitle: "¡Espera! No Te Vayas...",
      subtitle: "¡Tenemos un regalo especial para ti!",
      offerTitle: "Nail Art GRATIS",
      offerDescription: "¡Reserva cualquier ritual hoy y obtén un diseño de nail art gratis en dos uñas (valor $25)!",
      code: "QUEDATECONIVA",
      cta: "Reclamar Mi Regalo",
      noThanks: "No gracias, pagaré precio completo",
      urgency: "Oferta expira en 24 horas",
    },
  };

  const copy = isEn ? COPY.en : COPY.es;

  useEffect(() => {
    // Check if already shown
    const shown = sessionStorage.getItem("exit-intent-shown");
    if (shown) return;

    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves through top of page
      if (e.clientY <= 0 && !hasTriggered) {
        hasTriggered = true;
        setIsVisible(true);
        sessionStorage.setItem("exit-intent-shown", "true");
      }
    };

    // Only add listener after 8 seconds on page
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 8000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClaim = () => {
    if (onBook) {
      onBook();
      handleClose();
    } else {
      const message = encodeURIComponent(
        isEn
          ? "Hi! I saw your special offer. I'd love to get my FREE nail art upgrade! 💅✨"
          : "¡Hola! Vi tu oferta especial. ¡Me encantaría obtener mi nail art GRATIS! 💅✨"
      );
      window.open(`https://wa.me/19296257273?text=${message}`, "_blank");
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-[95%] max-w-lg"
          >
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              {/* Decorative top */}
              <div className="h-2 bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-[#B76E79]" />

              {/* Content */}
              <div className="p-8 text-center">
                {/* Animated hearts */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="w-full h-full bg-gradient-to-br from-[#B76E79] to-[#D4AF37] rounded-full flex items-center justify-center"
                  >
                    <Heart className="w-10 h-10 text-white fill-white" />
                  </motion.div>

                  {/* Floating sparkles */}
                  <motion.div
                    animate={{ y: [-5, 5, -5], x: [-3, 3, -3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [5, -5, 5], x: [3, -3, 3] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute -bottom-1 -left-2"
                  >
                    <Sparkles className="w-5 h-5 text-[#B76E79]" />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-light text-[#1A1A1A] mb-2">
                  {copy.waitTitle}
                </h3>
                <p className="text-[#7A7A7A] mb-6">
                  {copy.subtitle}
                </p>

                {/* Offer */}
                <div className="bg-gradient-to-r from-[#FDF8F5] to-[#F9F5F0] rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Gift className="w-6 h-6 text-[#D4AF37]" />
                    <span className="text-lg font-medium text-[#1A1A1A]">
                      {copy.offerTitle}
                    </span>
                  </div>
                  <p className="text-[#7A7A7A] text-sm mb-4">
                    {copy.offerDescription}
                  </p>
                  <div className="inline-block bg-white border border-[#D4AF37]/30 rounded-lg px-4 py-2">
                    <span className="text-[#D4AF37] font-mono tracking-wider">
                      {copy.code}
                    </span>
                  </div>
                  {/* Urgency */}
                  <div className="flex items-center justify-center gap-2 mt-3 text-[#722F37]">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium">{copy.urgency}</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleClaim}
                  className="w-full py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white font-medium rounded-xl hover:from-[#8B3A44] hover:to-[#A04550] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>{copy.cta}</span>
                  <Sparkles className="w-4 h-4" />
                </button>

                <button
                  onClick={handleClose}
                  className="mt-4 text-sm text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors"
                >
                  {copy.noThanks}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
