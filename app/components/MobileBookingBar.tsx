"use client";

import { useState, useEffect } from "react";
import { Calendar, Sparkles } from "lucide-react";

interface MobileBookingBarProps {
  lang?: "en" | "es";
  onBookClick?: () => void;
}

export default function MobileBookingBar({ lang = "en", onBookClick }: MobileBookingBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isEs = lang === "es";

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling down 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0E0706]/95 backdrop-blur-lg border-t border-[#D4A574]/30 shadow-[0_-8px_20px_rgba(0,0,0,0.5)] px-4 pt-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] transition-all duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#D4A574]">
            <Sparkles className="w-3 h-3" />
            <span>{isEs ? "Brooklyn Atelier" : "Exclusive Slots"}</span>
          </div>
          <span className="text-xs font-serif text-[#F4EBE1]">
            {isEs ? "Solo 3 clientas al día" : "Max 3 Clients Daily"}
          </span>
        </div>

        {onBookClick ? (
          <button
            type="button"
            onClick={onBookClick}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#D4A574] text-[#0E0706] text-xs font-semibold tracking-wide shadow-md hover:brightness-110 active:scale-95 transition-all min-h-[44px] cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0E0706]" />
            <span>{isEs ? "Reservar Cita" : "Book Appointment"}</span>
          </button>
        ) : (
          <a
            href="https://calendly.com/iva_nailart_nyc?text_color=F4EBE1&primary_color=D4A574&background_color=0E0706"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-full bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#D4A574] text-[#0E0706] text-xs font-semibold tracking-wide shadow-md hover:brightness-110 active:scale-95 transition-all min-h-[44px]"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0E0706]" />
            <span>{isEs ? "Reservar Cita" : "Book Appointment"}</span>
          </a>
        )}
      </div>
    </div>
  );
}
