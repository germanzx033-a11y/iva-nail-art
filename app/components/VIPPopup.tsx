"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Clock, Sparkles } from "lucide-react";

export default function VIPPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem("vip-popup-dismissed");
    if (dismissed) return;

    // Show popup after 45 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 45000);

    return () => clearTimeout(showTimer);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!isVisible || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, timeLeft]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("vip-popup-dismissed", "true");
  };

  const handleClaim = () => {
    // Copy code to clipboard
    navigator.clipboard.writeText("IVA15");

    // Open WhatsApp with the code
    const message = encodeURIComponent(
      "Hi! I'd like to claim my VIP discount code IVA15 for 15% off my first visit! 💅✨"
    );
    window.open(`https://wa.me/19296257273?text=${message}`, "_blank");
    handleDismiss();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={handleDismiss}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md"
          >
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-white hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Golden accent line */}
              <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37]" />

              <div className="p-8 text-center">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full animate-ping" />
                  <div className="relative w-full h-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center">
                    <Gift className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-light text-white mb-2">
                  VIP <span className="text-[#D4AF37]">Exclusive</span> Offer
                </h3>
                <p className="text-white text-sm mb-6">
                  First-time visitor special discount
                </p>

                {/* Discount */}
                <div className="bg-white/5 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-5xl font-light text-white">15%</span>
                    <span className="text-xl text-white">OFF</span>
                  </div>
                  <p className="text-white text-sm">Your first appointment</p>

                  {/* Code */}
                  <div className="mt-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg py-3 px-6 inline-block">
                    <span className="text-[#D4AF37] font-mono text-lg tracking-wider">IVA15</span>
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center justify-center gap-2 text-white mb-6">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    Offer expires in{" "}
                    <span className="text-[#D4AF37] font-medium">{formatTime(timeLeft)}</span>
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={handleClaim}
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <span>Claim My Discount</span>
                  <Sparkles className="w-4 h-4" />
                </button>

                <p className="text-white text-xs mt-4">
                  Valid for new clients only. Cannot be combined with other offers.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
