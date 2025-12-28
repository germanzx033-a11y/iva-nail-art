"use client";

/**
 * IVA Nail Art - Live Activity Indicator
 * Shows real-time (simulated) activity to create FOMO
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Users, ShoppingBag, Calendar, MapPin } from "lucide-react";

interface Activity {
  id: number;
  type: "viewing" | "booking" | "purchase";
  message: string;
  messageEs: string;
  icon: typeof Eye;
  location?: string;
  time: string;
}

const LOCATIONS = [
  "Brooklyn, NY",
  "Manhattan, NY",
  "Queens, NY",
  "Staten Island, NY",
  "New Jersey",
  "Long Island, NY",
];

const SERVICES = [
  { en: "Gel Manicure", es: "Manicura Gel" },
  { en: "3D Nail Art", es: "Arte 3D" },
  { en: "Luxury Pedicure", es: "Pedicura de Lujo" },
  { en: "Chrome Nails", es: "Uñas Chrome" },
  { en: "French Tips", es: "Puntas Francesas" },
];

const NAMES = ["Maria", "Jennifer", "Sofia", "Ashley", "Emily", "Sarah", "Ana", "Isabella", "Olivia", "Emma"];

export default function LiveActivityIndicator({ lang = "en" }: { lang?: "en" | "es" }) {
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [viewerCount, setViewerCount] = useState(0);

  // Initialize viewer count
  useEffect(() => {
    setViewerCount(Math.floor(Math.random() * 8) + 12); // 12-20 viewers
  }, []);

  // Fluctuate viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(8, Math.min(25, newCount));
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Generate random activities
  useEffect(() => {
    const generateActivity = (): Activity => {
      const types: Activity["type"][] = ["viewing", "booking", "purchase"];
      const type = types[Math.floor(Math.random() * types.length)];
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
      const service = SERVICES[Math.floor(Math.random() * SERVICES.length)];
      const minutesAgo = Math.floor(Math.random() * 10) + 1;

      switch (type) {
        case "booking":
          return {
            id: Date.now(),
            type,
            message: `${name} just booked ${service.en}`,
            messageEs: `${name} acaba de reservar ${service.es}`,
            icon: Calendar,
            location,
            time: `${minutesAgo}m ago`,
          };
        case "purchase":
          return {
            id: Date.now(),
            type,
            message: `${name} purchased a gift card`,
            messageEs: `${name} compró una tarjeta de regalo`,
            icon: ShoppingBag,
            location,
            time: `${minutesAgo}m ago`,
          };
        default:
          return {
            id: Date.now(),
            type,
            message: `Someone from ${location} is viewing`,
            messageEs: `Alguien de ${location} está viendo`,
            icon: Eye,
            time: "now",
          };
      }
    };

    // Show first activity after 10 seconds
    const initialTimer = setTimeout(() => {
      setCurrentActivity(generateActivity());
    }, 10000);

    // Show new activities every 20-40 seconds
    const interval = setInterval(() => {
      setCurrentActivity(generateActivity());
    }, 20000 + Math.random() * 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Hide activity after 5 seconds
  useEffect(() => {
    if (!currentActivity) return;

    const timer = setTimeout(() => {
      setCurrentActivity(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentActivity]);

  const t = {
    en: { viewers: "people viewing now" },
    es: { viewers: "personas viendo ahora" },
  };

  return (
    <>
      {/* Viewer Count - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3 }}
        className="fixed top-24 left-4 z-[90] hidden lg:flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-100"
      >
        <div className="relative">
          <Users className="w-4 h-4 text-[#722F37]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        <span className="text-sm font-medium text-gray-700">
          <span className="text-[#722F37] font-bold">{viewerCount}</span> {t[lang].viewers}
        </span>
      </motion.div>

      {/* Activity Toast - Bottom Left */}
      <AnimatePresence>
        {currentActivity && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            className="fixed bottom-24 left-4 z-[90] max-w-xs hidden sm:block"
          >
            <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 flex items-start gap-3">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                currentActivity.type === "booking"
                  ? "bg-emerald-100 text-emerald-600"
                  : currentActivity.type === "purchase"
                  ? "bg-purple-100 text-purple-600"
                  : "bg-blue-100 text-blue-600"
              }`}>
                <currentActivity.icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {lang === "en" ? currentActivity.message : currentActivity.messageEs}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {currentActivity.location && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      {currentActivity.location}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">{currentActivity.time}</span>
                </div>
              </div>

              {/* Verification badge */}
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Arrow pointer */}
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
