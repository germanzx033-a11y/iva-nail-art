"use client";

/**
 * IVA Nail Art - Social Proof Toast Notifications
 * Shows fake "recent bookings" to create FOMO and social proof
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, MapPin } from "lucide-react";

const FAKE_BOOKINGS = [
  { name: "Sarah M.", service: "Luxury Gel Manicure", location: "Bay Ridge", time: "2 min ago" },
  { name: "Maria L.", service: "Pregnancy-Safe Pedicure", location: "Brooklyn", time: "5 min ago" },
  { name: "Jennifer K.", service: "Chrome Nail Art", location: "Staten Island", time: "8 min ago" },
  { name: "Ana R.", service: "French Tips", location: "Manhattan", time: "12 min ago" },
  { name: "Emily W.", service: "3D Nail Design", location: "Queens", time: "15 min ago" },
  { name: "Lisa T.", service: "Full Set Acrylics", location: "Bay Ridge", time: "18 min ago" },
  { name: "Carmen S.", service: "Ombre Nails", location: "Brooklyn", time: "22 min ago" },
  { name: "Nicole P.", service: "Gel Pedicure", location: "Park Slope", time: "25 min ago" },
];

export default function SocialProofToast() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(FAKE_BOOKINGS[0]);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Don't show if user has dismissed before
    if (typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem("socialProofDismissed");
      if (dismissed) return;
    }

    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      showNotification();
    }, 15000); // 15 seconds after page load

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (hasInteracted) return;

    // Show periodically
    const interval = setInterval(() => {
      showNotification();
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, [hasInteracted]);

  const showNotification = () => {
    // Pick random booking
    const randomIndex = Math.floor(Math.random() * FAKE_BOOKINGS.length);
    setCurrentBooking(FAKE_BOOKINGS[randomIndex]);
    setIsVisible(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setHasInteracted(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("socialProofDismissed", "true");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-24 left-4 z-[80] max-w-xs"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-[#EBE8E2] p-4 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={handleDismiss}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#B76E79] to-[#722F37] rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#1A1A1A]">
                  {currentBooking.name}
                </p>
                <p className="text-[10px] text-[#7A7A7A]">just booked!</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss();
                }}
                className="text-[#A3A3A3] hover:text-[#1A1A1A] text-lg leading-none"
              >
                ×
              </button>
            </div>

            {/* Service */}
            <p className="text-sm font-medium text-[#722F37] mb-2">
              {currentBooking.service}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 text-[10px] text-[#7A7A7A]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {currentBooking.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {currentBooking.time}
              </span>
            </div>

            {/* Progress bar animation */}
            <div className="mt-3 h-0.5 bg-[#EBE8E2] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B76E79] to-[#722F37]"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
