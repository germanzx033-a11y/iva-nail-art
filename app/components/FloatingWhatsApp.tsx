"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  lang?: "en" | "es";
  phoneNumber: string;
}

export default function FloatingWhatsApp({ lang = "en", phoneNumber }: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const isEn = lang === "en";

  // Show after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-open chat bubble after 8 seconds if user hasn't interacted
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setShowPulse(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  // Hide pulse after first interaction
  const handleClick = () => {
    setHasInteracted(true);
    setShowPulse(false);
    setIsOpen(!isOpen);
  };

  const quickMessages = [
    {
      text: isEn ? "💅 I want to book an appointment" : "💅 Quiero agendar una cita",
      message: isEn
        ? "Hi! I want to book a nail appointment. What times do you have available? 💅"
        : "¡Hola! Quiero agendar una cita para uñas. ¿Qué horarios tienes disponibles? 💅"
    },
    {
      text: isEn ? "💰 Ask about prices" : "💰 Preguntar precios",
      message: isEn
        ? "Hi! I'd like to know your prices for nail services. Thank you!"
        : "¡Hola! Me gustaría saber los precios de tus servicios de uñas. ¡Gracias!"
    },
    {
      text: isEn ? "📍 Location & hours" : "📍 Ubicación y horarios",
      message: isEn
        ? "Hi! Could you share your location and business hours? Thank you!"
        : "¡Hola! ¿Podrías compartirme tu ubicación y horarios? ¡Gracias!"
    },
  ];

  const sendMessage = (message: string) => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
      {/* Chat Bubble */}
      <div
        className={`transform transition-all duration-500 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[320px] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl">💅</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm">IVA Nail Art</h4>
              <p className="text-white/80 text-xs">
                {isEn ? "Usually replies instantly" : "Responde al instante"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 bg-[#E5DDD5] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjAzKSIvPjwvc3ZnPg==')] min-h-[100px]">
            <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%] relative">
              <div className="absolute -left-2 top-3 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-white border-b-[6px] border-b-transparent"></div>
              <p className="text-gray-800 text-sm">
                {isEn
                  ? "Hi! 👋 Welcome to IVA Nail Art. How can I help you today?"
                  : "¡Hola! 👋 Bienvenida a IVA Nail Art. ¿Cómo puedo ayudarte hoy?"}
              </p>
              <span className="text-[10px] text-gray-400 mt-1 block text-right">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>

          {/* Quick Replies */}
          <div className="p-3 bg-white border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2 font-medium">
              {isEn ? "Quick messages:" : "Mensajes rápidos:"}
            </p>
            <div className="flex flex-col gap-2">
              {quickMessages.map((item, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(item.message)}
                  className="text-left px-3 py-2 bg-gray-50 hover:bg-[#25D366]/10 rounded-lg text-sm text-gray-700 hover:text-[#128C7E] transition-all border border-gray-100 hover:border-[#25D366]/30"
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={handleClick}
        className="relative group"
        aria-label={isEn ? "Chat on WhatsApp" : "Chatear por WhatsApp"}
      >
        {/* Pulse Animation */}
        {showPulse && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></span>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-20"></span>
          </>
        )}

        {/* Notification Badge */}
        {!hasInteracted && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold animate-bounce z-10">
            1
          </span>
        )}

        {/* Button */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group-hover:rotate-[15deg]">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isEn ? "Chat with us!" : "¡Escríbenos!"}
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[6px] border-l-black/80 border-b-[6px] border-b-transparent"></div>
        </div>
      </button>
    </div>
  );
}
