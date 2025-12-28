"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sunrise, Sunset, X } from "lucide-react";

const GREETINGS = {
  morning: {
    en: "Good morning! ☀️",
    es: "¡Buenos días! ☀️",
    message: {
      en: "Start your day with beautiful nails",
      es: "Comienza tu día con uñas hermosas",
    },
    Icon: Sunrise,
    gradient: "from-orange-400 to-yellow-300",
  },
  afternoon: {
    en: "Good afternoon! 🌤️",
    es: "¡Buenas tardes! 🌤️",
    message: {
      en: "Perfect time for a nail refresh",
      es: "Momento perfecto para renovar tus uñas",
    },
    Icon: Sun,
    gradient: "from-yellow-400 to-orange-300",
  },
  evening: {
    en: "Good evening! 🌅",
    es: "¡Buenas noches! 🌅",
    message: {
      en: "Treat yourself after a long day",
      es: "Date un gusto después de un largo día",
    },
    Icon: Sunset,
    gradient: "from-purple-400 to-pink-400",
  },
  night: {
    en: "Hello, night owl! 🌙",
    es: "¡Hola, trasnochador! 🌙",
    message: {
      en: "Book now for tomorrow's glow",
      es: "Reserva ahora para brillar mañana",
    },
    Icon: Moon,
    gradient: "from-indigo-500 to-purple-500",
  },
};

export default function TimeGreeting() {
  const [isVisible, setIsVisible] = useState(false);
  const [greeting, setGreeting] = useState<keyof typeof GREETINGS>("morning");
  const [language, setLanguage] = useState<"en" | "es">("en");

  useEffect(() => {
    // Check if already shown this session
    const shown = sessionStorage.getItem("time-greeting-shown");
    if (shown) return;

    // Detect language from browser
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("es")) {
      setLanguage("es");
    }

    // Determine time of day
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("afternoon");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("evening");
    } else {
      setGreeting("night");
    }

    // Show after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("time-greeting-shown", "true");
    }, 2000);

    // Auto-hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const currentGreeting = GREETINGS[greeting];
  const Icon = currentGreeting.Icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-20 right-4 z-[90] max-w-xs"
        >
          <div
            className={`bg-gradient-to-r ${currentGreeting.gradient} rounded-2xl p-4 shadow-xl`}
          >
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
            >
              <X className="w-3 h-3 text-gray-600" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium text-lg">
                  {currentGreeting[language]}
                </p>
                <p className="text-white/80 text-sm">
                  {currentGreeting.message[language]}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
