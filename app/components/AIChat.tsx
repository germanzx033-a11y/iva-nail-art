"use client";

/**
 * IVA Nail Art - AI Chat Assistant
 * Smart FAQ bot with service suggestions and auto-booking
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  Loader2,
  Bot,
  User,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  action?: {
    type: "book" | "call" | "directions";
    label: string;
    url: string;
  };
}

// Knowledge base for the AI
const KNOWLEDGE_BASE = {
  greetings: ["hello", "hi", "hey", "hola", "buenos dias", "buenas"],
  services: {
    keywords: ["service", "services", "what do you offer", "precio", "price", "cost", "servicio", "manicure", "pedicure", "gel", "acrylic"],
    response: {
      en: "We offer a range of luxury nail services:\n\n✨ **Signature Gel Manicure** - From $65\n✨ **3D Nail Art** - From $85\n✨ **Luxury Spa Pedicure** - From $85\n✨ **Bridal & Special Occasions** - Custom pricing\n\nAll services use non-toxic, pregnancy-safe products!",
      es: "Ofrecemos una gama de servicios de lujo:\n\n✨ **Manicura Gel Signature** - Desde $65\n✨ **Arte 3D en Uñas** - Desde $85\n✨ **Pedicura Spa de Lujo** - Desde $85\n✨ **Novias y Ocasiones Especiales** - Precio personalizado\n\n¡Todos los servicios usan productos no tóxicos y seguros para el embarazo!"
    }
  },
  booking: {
    keywords: ["book", "appointment", "schedule", "cita", "reserva", "agendar", "available", "disponible"],
    response: {
      en: "I'd love to help you book an appointment! 📅\n\nYou can:\n1. Book directly via WhatsApp (fastest!)\n2. Call us at (347) 555-NAIL\n3. Use our online booking calendar\n\nWe're open Tuesday-Sunday, 10AM-7PM.",
      es: "¡Me encantaría ayudarte a reservar una cita! 📅\n\nPuedes:\n1. Reservar por WhatsApp (¡más rápido!)\n2. Llamarnos al (347) 555-NAIL\n3. Usar nuestro calendario de reservas online\n\nEstamos abiertos de Martes a Domingo, 10AM-7PM."
    }
  },
  hours: {
    keywords: ["hours", "open", "close", "when", "horario", "abierto", "cerrado", "cuando"],
    response: {
      en: "Our hours are:\n\n🕐 Tuesday - Friday: 10AM - 7PM\n🕐 Saturday: 9AM - 6PM\n🕐 Sunday: 11AM - 5PM\n🔴 Monday: Closed\n\nWe recommend booking in advance as spots fill quickly!",
      es: "Nuestro horario es:\n\n🕐 Martes - Viernes: 10AM - 7PM\n🕐 Sábado: 9AM - 6PM\n🕐 Domingo: 11AM - 5PM\n🔴 Lunes: Cerrado\n\n¡Recomendamos reservar con anticipación ya que los espacios se llenan rápido!"
    }
  },
  location: {
    keywords: ["where", "location", "address", "directions", "donde", "ubicacion", "direccion", "brooklyn"],
    response: {
      en: "We're located in the heart of Brooklyn! 📍\n\n**IVA Nail Art Studio**\n123 Nail Art Lane\nBrooklyn, NY 11201\n\nNear the Bergen Street subway station (F/G lines).\nStreet parking available!",
      es: "¡Estamos ubicados en el corazón de Brooklyn! 📍\n\n**IVA Nail Art Studio**\n123 Nail Art Lane\nBrooklyn, NY 11201\n\nCerca de la estación de metro Bergen Street (líneas F/G).\n¡Estacionamiento en la calle disponible!"
    }
  },
  pregnancy: {
    keywords: ["pregnant", "pregnancy", "safe", "toxic", "embarazada", "embarazo", "seguro", "toxico"],
    response: {
      en: "Absolutely! We specialize in pregnancy-safe nail care 🤰\n\n✅ 10-free, non-toxic polishes\n✅ HEPA air filtration system\n✅ Comfortable seating positions\n✅ Extra sanitization protocols\n\nMany expecting mothers choose us specifically for our safe products!",
      es: "¡Absolutamente! Nos especializamos en cuidado de uñas seguro para el embarazo 🤰\n\n✅ Esmaltes no tóxicos 10-free\n✅ Sistema de filtración de aire HEPA\n✅ Posiciones de asiento cómodas\n✅ Protocolos extra de sanitización\n\n¡Muchas futuras mamás nos eligen específicamente por nuestros productos seguros!"
    }
  },
  nailArt: {
    keywords: ["design", "art", "custom", "3d", "diseño", "arte", "personalizado", "chrome", "ombre"],
    response: {
      en: "Our nail art is what makes us special! 🎨\n\nWe offer:\n• Hand-painted custom designs\n• 3D nail art & embellishments\n• Chrome & holographic finishes\n• Ombre & gradient effects\n• Seasonal & themed collections\n\nBring your Pinterest board or let us create something unique!",
      es: "¡Nuestro arte en uñas es lo que nos hace especiales! 🎨\n\nOfrecemos:\n• Diseños personalizados pintados a mano\n• Arte 3D y adornos\n• Acabados cromados y holográficos\n• Efectos ombre y degradados\n• Colecciones de temporada y temáticas\n\n¡Trae tu tablero de Pinterest o déjanos crear algo único!"
    }
  },
  loyalty: {
    keywords: ["loyalty", "points", "rewards", "discount", "lealtad", "puntos", "recompensas", "descuento"],
    response: {
      en: "Join our IVA Rewards program! 🌟\n\n• Earn 1 point per $1 spent\n• 100 points = $10 off\n• Birthday bonus: 50 extra points\n• Referral bonus: 100 points\n• VIP tier unlocks exclusive perks!\n\nAsk about it at your next visit!",
      es: "¡Únete a nuestro programa IVA Rewards! 🌟\n\n• Gana 1 punto por $1 gastado\n• 100 puntos = $10 de descuento\n• Bonus de cumpleaños: 50 puntos extra\n• Bonus por referir: 100 puntos\n• ¡El nivel VIP desbloquea beneficios exclusivos!\n\n¡Pregunta en tu próxima visita!"
    }
  },
  default: {
    en: "I'm here to help! You can ask me about:\n\n• Our services & pricing\n• Booking appointments\n• Hours & location\n• Pregnancy-safe options\n• Custom nail art\n• Loyalty rewards\n\nWhat would you like to know?",
    es: "¡Estoy aquí para ayudar! Puedes preguntarme sobre:\n\n• Nuestros servicios y precios\n• Reservar citas\n• Horario y ubicación\n• Opciones seguras para el embarazo\n• Arte en uñas personalizado\n• Recompensas de lealtad\n\n¿Qué te gustaría saber?"
  }
};

function detectLanguage(text: string): "en" | "es" {
  const spanishWords = ["hola", "cita", "reserva", "precio", "servicio", "donde", "cuando", "gracias", "por favor"];
  const lowerText = text.toLowerCase();
  const hasSpanish = spanishWords.some(word => lowerText.includes(word));
  return hasSpanish ? "es" : "en";
}

function getAIResponse(input: string): { content: string; suggestions?: string[]; action?: Message["action"] } {
  const lowerInput = input.toLowerCase();
  const lang = detectLanguage(input);

  // Check for greetings
  if (KNOWLEDGE_BASE.greetings.some(g => lowerInput.includes(g))) {
    return {
      content: lang === "es"
        ? "¡Hola! 👋 Bienvenida a IVA Nail Art. ¿En qué puedo ayudarte hoy?"
        : "Hello! 👋 Welcome to IVA Nail Art. How can I help you today?",
      suggestions: lang === "es"
        ? ["Ver servicios", "Reservar cita", "Horario", "Ubicación"]
        : ["View services", "Book appointment", "Hours", "Location"]
    };
  }

  // Check each category
  for (const [, data] of Object.entries(KNOWLEDGE_BASE)) {
    if (typeof data === "object" && "keywords" in data) {
      if (data.keywords.some((k: string) => lowerInput.includes(k))) {
        const response: { content: string; suggestions?: string[]; action?: Message["action"] } = {
          content: data.response[lang]
        };

        // Add specific actions based on category
        if (lowerInput.includes("book") || lowerInput.includes("reserva") || lowerInput.includes("cita")) {
          response.action = {
            type: "book",
            label: lang === "es" ? "Reservar por WhatsApp" : "Book via WhatsApp",
            url: "https://wa.me/13475551234?text=Hi! I'd like to book an appointment"
          };
        } else if (lowerInput.includes("location") || lowerInput.includes("donde") || lowerInput.includes("direccion")) {
          response.action = {
            type: "directions",
            label: lang === "es" ? "Obtener direcciones" : "Get Directions",
            url: "https://maps.google.com/?q=IVA+Nail+Art+Brooklyn"
          };
        }

        return response;
      }
    }
  }

  // Default response
  return {
    content: KNOWLEDGE_BASE.default[lang],
    suggestions: lang === "es"
      ? ["Servicios", "Reservar", "Horario", "Productos seguros"]
      : ["Services", "Book", "Hours", "Safe products"]
  };
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const browserLang = navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
      setMessages([{
        id: "welcome",
        type: "bot",
        content: browserLang === "es"
          ? "¡Hola! 💅 Soy el asistente virtual de IVA Nail Art. ¿En qué puedo ayudarte hoy?"
          : "Hello! 💅 I'm IVA Nail Art's virtual assistant. How can I help you today?",
        timestamp: new Date(),
        suggestions: browserLang === "es"
          ? ["Ver servicios", "Reservar cita", "Horario", "¿Es seguro para el embarazo?"]
          : ["View services", "Book appointment", "Hours", "Is it pregnancy-safe?"]
      }]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getAIResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
        action: response.action
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-[#B76E79] to-[#722F37] rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6" />
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#EBE8E2]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#B76E79] to-[#722F37] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">IVA Assistant</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online • Replies instantly
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#FAFAFA]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                    <div className="flex items-end gap-2">
                      {message.type === "bot" && (
                        <div className="w-8 h-8 bg-gradient-to-br from-[#B76E79] to-[#722F37] rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-2xl ${
                          message.type === "user"
                            ? "bg-[#722F37] text-white rounded-br-md"
                            : "bg-white text-[#3D3D3D] rounded-bl-md shadow-sm border border-[#EBE8E2]"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.type === "user" && (
                        <div className="w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-[#7A7A7A]" />
                        </div>
                      )}
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.type === "bot" && (
                      <div className="flex flex-wrap gap-2 mt-3 ml-10">
                        {message.suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1.5 bg-white border border-[#EBE8E2] rounded-full text-xs text-[#722F37] hover:bg-[#F9F8F6] transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    {message.action && message.type === "bot" && (
                      <a
                        href={message.action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 ml-10 px-4 py-2 bg-[#722F37] text-white rounded-lg text-sm hover:bg-[#5A252C] transition-colors"
                      >
                        {message.action.type === "book" && <Calendar className="w-4 h-4" />}
                        {message.action.type === "call" && <Phone className="w-4 h-4" />}
                        {message.action.type === "directions" && <MapPin className="w-4 h-4" />}
                        {message.action.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#B76E79] to-[#722F37] rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border border-[#EBE8E2]">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#7A7A7A] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#7A7A7A] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#7A7A7A] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-[#EBE8E2]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-[#F9F8F6] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 bg-[#722F37] rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5A252C] transition-colors"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
              <p className="text-[10px] text-[#7A7A7A] text-center mt-2">
                Powered by IVA AI • For complex queries, contact us directly
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
