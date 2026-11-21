"use client";

import { useState, useEffect } from "react";
import { Calendar, Sparkles, ChevronUp } from "lucide-react";

interface MobileBookingBarProps {
  lang?: "en" | "es";
}

export default function MobileBookingBar({ lang = "en" }: MobileBookingBarProps) {
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
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FAF8F5]/95 backdrop-blur-lg border-t border-[#C5A059]/30 shadow-[0_-8px_20px_rgba(0,0,0,0.06)] px-4 pt-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] transition-all duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#C5A059]">
            <Sparkles className="w-3 h-3" />
            <span>{isEs ? "Brooklyn Atelier" : "Exclusive Slots"}</span>
          </div>
          <span className="text-xs font-serif text-[#111111]">
            {isEs ? "Solo 3 clientas al día" : "Max 3 Clients Daily"}
          </span>
        </div>

        <a
          href="#booking-calculator"
          className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#111111] active:bg-[#C5A059] text-white active:text-[#111111] text-xs font-medium tracking-wide shadow-md transition-colors min-h-[44px]"
        >
          <Calendar className="w-3.5 h-3.5 text-[#EAD8B1]" />
          <span>{isEs ? "Reservar Cita" : "Book Appointment"}</span>
        </a>
      </div>
    </div>
  );
}
