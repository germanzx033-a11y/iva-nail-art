"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Heart, Sparkles } from "lucide-react";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);

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

    // Only add listener after 10 seconds on page
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClaim = () => {
    const message = encodeURIComponent(
      "Hi! I almost left but saw your special offer. I'd love to get my FREE nail art upgrade! 💅✨"
    );
    window.open(`https://wa.me/19296257273?text=${message}`, "_blank");
    handleClose();
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
                  Wait! Don't Go Yet...
                </h3>
                <p className="text-[#7A7A7A] mb-6">
                  We have a special gift just for you!
                </p>

                {/* Offer */}
                <div className="bg-gradient-to-r from-[#FDF8F5] to-[#F9F5F0] rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Gift className="w-6 h-6 text-[#D4AF37]" />
                    <span className="text-lg font-medium text-[#1A1A1A]">
                      FREE Nail Art Upgrade
                    </span>
                  </div>
                  <p className="text-[#7A7A7A] text-sm mb-4">
                    Book any service today and get a complimentary nail art design
                    on two nails (worth $15)!
                  </p>
                  <div className="inline-block bg-white border border-[#D4AF37]/30 rounded-lg px-4 py-2">
                    <span className="text-[#D4AF37] font-mono tracking-wider">
                      STAYWITHIVA
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleClaim}
                  className="w-full py-4 bg-gradient-to-r from-[#B76E79] to-[#D4AF37] text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Claim My Free Gift</span>
                  <Sparkles className="w-4 h-4" />
                </button>

                <button
                  onClick={handleClose}
                  className="mt-4 text-sm text-[#7A7A7A] hover:text-[#1A1A1A] transition-colors"
                >
                  No thanks, I'll pay full price
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
