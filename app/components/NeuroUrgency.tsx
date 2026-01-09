"use client";

/**
 * IVA Nail Art - NeuroUrgency Component
 * Modelo 360 - Reptilian & Limbic Brain Activation
 * Creates psychological urgency through scarcity and countdown
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, AlertTriangle, Sparkles, Calendar } from "lucide-react";

interface NeuroUrgencyProps {
  language: "en" | "es";
  onBook?: () => void;
}

export default function NeuroUrgency({ language, onBook }: NeuroUrgencyProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [viewersNow, setViewersNow] = useState(0);
  const [recentBookings, setRecentBookings] = useState(0);
  const [slotsToday, setSlotsToday] = useState(2);
  const [isVisible, setIsVisible] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(false);

  const isEn = language === "en";

  // Calculate time until end of today's booking window (6 PM)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(18, 0, 0, 0); // 6 PM

      // If past 6 PM, show time until tomorrow 6 PM
      if (now >= endOfDay) {
        endOfDay.setDate(endOfDay.getDate() + 1);
      }

      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });

      // Increase urgency when less than 2 hours left
      setPulseIntensity(hours < 2);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time viewers and bookings (psychological social proof)
  useEffect(() => {
    // Initialize on client only
    setViewersNow(Math.floor(Math.random() * 4) + 3);
    setRecentBookings(Math.floor(Math.random() * 3) + 2);

    // Randomly reduce available slots (scarcity)
    const hour = new Date().getHours();
    if (hour >= 14) {
      setSlotsToday(1); // Afternoon: only 1 slot left
    }
    if (hour >= 16) {
      setSlotsToday(0); // After 4 PM: fully booked
    }

    // Update viewers periodically
    const viewerInterval = setInterval(() => {
      setViewersNow(Math.floor(Math.random() * 4) + 3);
    }, 12000);

    return () => clearInterval(viewerInterval);
  }, []);

  // Show component after scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const COPY = {
    en: {
      slotsLeft: slotsToday === 0 ? "Fully Booked Today" : `Only ${slotsToday} Slot${slotsToday === 1 ? "" : "s"} Left Today`,
      viewers: `${viewersNow} women viewing right now`,
      recentBook: `${recentBookings} appointments booked in last hour`,
      countdown: "Next availability closes in",
      urgentCta: "Secure Your Spot Now",
      waitlist: "Join VIP Waitlist",
      guarantee: "100% Satisfaction Guarantee",
    },
    es: {
      slotsLeft: slotsToday === 0 ? "Agotado Hoy" : `Solo ${slotsToday} Espacio${slotsToday === 1 ? "" : "s"} Hoy`,
      viewers: `${viewersNow} mujeres viendo ahora`,
      recentBook: `${recentBookings} citas reservadas en la última hora`,
      countdown: "La próxima disponibilidad cierra en",
      urgentCta: "Asegura Tu Lugar Ahora",
      waitlist: "Únete a Lista VIP",
      guarantee: "100% Garantía de Satisfacción",
    },
  };

  const copy = isEn ? COPY.en : COPY.es;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-96 z-[85] pointer-events-auto"
      >
        <div className={`bg-white rounded-2xl shadow-2xl border border-[#EDE9E3] overflow-hidden ${pulseIntensity ? "ring-2 ring-[#722F37] ring-opacity-50 animate-pulse" : ""}`}>
          {/* Urgency Header */}
          <div className={`px-4 py-3 ${slotsToday === 0 ? "bg-[#1A1A1A]" : "bg-gradient-to-r from-[#722F37] to-[#8B3A44]"} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {slotsToday === 0 ? (
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{copy.slotsLeft}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs opacity-80">{isEn ? "Live" : "En vivo"}</span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          {slotsToday > 0 && (
            <div className="px-4 py-3 bg-gradient-to-r from-[#FAF9F7] to-[#F5EDE8] border-b border-[#EDE9E3]">
              <p className="text-[10px] uppercase tracking-wider text-[#6B6B6B] mb-2">{copy.countdown}</p>
              <div className="flex items-center justify-center gap-3">
                <div className="text-center">
                  <div className="bg-[#0D0D0D] text-white px-3 py-2 rounded-lg font-mono text-xl font-bold">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#6B6B6B] mt-1">{isEn ? "hrs" : "hrs"}</span>
                </div>
                <span className="text-xl font-bold text-[#722F37]">:</span>
                <div className="text-center">
                  <div className="bg-[#0D0D0D] text-white px-3 py-2 rounded-lg font-mono text-xl font-bold">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#6B6B6B] mt-1">{isEn ? "min" : "min"}</span>
                </div>
                <span className="text-xl font-bold text-[#722F37]">:</span>
                <div className="text-center">
                  <div className="bg-[#722F37] text-white px-3 py-2 rounded-lg font-mono text-xl font-bold">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#6B6B6B] mt-1">{isEn ? "sec" : "seg"}</span>
                </div>
              </div>
            </div>
          )}

          {/* Social Proof Stats */}
          <div className="px-4 py-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-[#3D3D3D]">
              <Users className="w-4 h-4 text-[#B76E79]" />
              <span>{copy.viewers}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#3D3D3D]">
              <Calendar className="w-4 h-4 text-[#8C6239]" />
              <span>{copy.recentBook}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="px-4 pb-4">
            <button
              onClick={onBook}
              className={`w-full py-3 rounded-xl text-sm uppercase tracking-wider font-medium transition-all flex items-center justify-center gap-2 ${
                slotsToday === 0
                  ? "bg-[#1A1A1A] text-white hover:bg-[#333]"
                  : "bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white hover:from-[#8B3A44] hover:to-[#A04550] shadow-lg hover:shadow-xl"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {slotsToday === 0 ? copy.waitlist : copy.urgentCta}
            </button>
            <p className="text-[10px] text-center text-[#6B6B6B] mt-2">{copy.guarantee}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
