"use client";

import { useState, useEffect } from "react";
import { X, MapPin, Clock } from "lucide-react";

interface Notification {
  id: number;
  name: string;
  service: string;
  serviceEs: string;
  location: string;
  timeAgo: string;
  timeAgoEs: string;
  avatar: string;
}

interface SocialProofNotificationProps {
  lang?: "en" | "es";
}

// Realistic fake data for social proof
const NOTIFICATIONS: Notification[] = [
  { id: 1, name: "Maria G.", service: "Luxury Gel Manicure", serviceEs: "Manicura Gel de Lujo", location: "Bay Ridge", timeAgo: "2 min ago", timeAgoEs: "hace 2 min", avatar: "👩🏻" },
  { id: 2, name: "Sofia R.", service: "Full Set Acrylics", serviceEs: "Set Completo Acrílico", location: "Brooklyn", timeAgo: "5 min ago", timeAgoEs: "hace 5 min", avatar: "👩🏽" },
  { id: 3, name: "Ana L.", service: "Nail Art Design", serviceEs: "Diseño Nail Art", location: "Staten Island", timeAgo: "8 min ago", timeAgoEs: "hace 8 min", avatar: "👩🏼" },
  { id: 4, name: "Jessica M.", service: "Spa Pedicure", serviceEs: "Pedicura Spa", location: "Dyker Heights", timeAgo: "12 min ago", timeAgoEs: "hace 12 min", avatar: "👩🏻" },
  { id: 5, name: "Carmen T.", service: "Gel X Extensions", serviceEs: "Extensiones Gel X", location: "Sunset Park", timeAgo: "15 min ago", timeAgoEs: "hace 15 min", avatar: "👩🏾" },
  { id: 6, name: "Laura S.", service: "Chrome Finish", serviceEs: "Acabado Chrome", location: "Park Slope", timeAgo: "18 min ago", timeAgoEs: "hace 18 min", avatar: "👩🏻" },
  { id: 7, name: "Isabella P.", service: "3D Nail Art", serviceEs: "Nail Art 3D", location: "Bay Ridge", timeAgo: "22 min ago", timeAgoEs: "hace 22 min", avatar: "👩🏼" },
  { id: 8, name: "Valentina C.", service: "Full Mani-Pedi", serviceEs: "Mani-Pedi Completo", location: "Brooklyn", timeAgo: "25 min ago", timeAgoEs: "hace 25 min", avatar: "👩🏽" },
];

export default function SocialProofNotification({ lang = "en" }: SocialProofNotificationProps) {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  const isEn = lang === "en";

  useEffect(() => {
    if (isDismissed) return;

    // Show first notification after 15 seconds
    const initialDelay = setTimeout(() => {
      showNotification();
    }, 15000);

    return () => clearTimeout(initialDelay);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed || notificationIndex === 0) return;

    // Show subsequent notifications every 45-90 seconds (randomized)
    const interval = setInterval(() => {
      showNotification();
    }, 45000 + Math.random() * 45000);

    return () => clearInterval(interval);
  }, [notificationIndex, isDismissed]);

  const showNotification = () => {
    const notification = NOTIFICATIONS[notificationIndex % NOTIFICATIONS.length];
    setCurrentNotification(notification);
    setIsVisible(true);

    // Auto-hide after 6 seconds
    setTimeout(() => {
      setIsVisible(false);
      setNotificationIndex((prev) => prev + 1);
    }, 6000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!currentNotification || isDismissed) return null;

  return (
    <div
      className={`fixed bottom-24 left-6 z-[80] transform transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-full pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 max-w-[320px] relative overflow-hidden group">
        {/* Gold accent border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] via-[#E8C9A8] to-[#D4AF37]"></div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#E8A4B8] to-[#D4AF37] flex items-center justify-center text-2xl shadow-lg">
            {currentNotification.avatar}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800">
              <span className="font-bold text-[#4A0404]">{currentNotification.name}</span>{" "}
              {isEn ? "just booked" : "acaba de reservar"}
            </p>
            <p className="text-sm font-semibold text-[#D4AF37] truncate">
              {isEn ? currentNotification.service : currentNotification.serviceEs}
            </p>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {currentNotification.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {isEn ? currentNotification.timeAgo : currentNotification.timeAgoEs}
              </span>
            </div>
          </div>
        </div>

        {/* Verified badge */}
        <div className="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-gray-500">
            {isEn ? "Verified booking" : "Reserva verificada"}
          </span>
        </div>

        {/* Subtle animation shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_ease-in-out_infinite] pointer-events-none"></div>
      </div>
    </div>
  );
}
