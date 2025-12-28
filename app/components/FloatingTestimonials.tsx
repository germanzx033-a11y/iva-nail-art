"use client";

/**
 * IVA Nail Art - Floating Testimonials
 * Animated social proof carousel
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, X } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  textEs: string;
  service: string;
  serviceEs: string;
  avatar: string;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Maria G.",
    rating: 5,
    text: "Absolutely stunning work! IVA is a true artist. My nails have never looked this good!",
    textEs: "¡Trabajo absolutamente impresionante! IVA es una verdadera artista. ¡Mis uñas nunca se habían visto tan bien!",
    service: "3D Floral Design",
    serviceEs: "Diseño Floral 3D",
    avatar: "👩",
    date: "Dec 2024"
  },
  {
    id: 2,
    name: "Jennifer L.",
    rating: 5,
    text: "Best nail salon in Brooklyn! The attention to detail is incredible. Worth every penny.",
    textEs: "¡El mejor salón de uñas en Brooklyn! La atención al detalle es increíble. Vale cada centavo.",
    service: "Chrome French Tips",
    serviceEs: "Puntas Francesas Chrome",
    avatar: "👱‍♀️",
    date: "Dec 2024"
  },
  {
    id: 3,
    name: "Sofia R.",
    rating: 5,
    text: "I've been coming here for 6 months and I'm always impressed. The designs are unique!",
    textEs: "He venido aquí por 6 meses y siempre me impresiona. ¡Los diseños son únicos!",
    service: "Gel Manicure + Art",
    serviceEs: "Gel Manicura + Arte",
    avatar: "👩‍🦰",
    date: "Nov 2024"
  },
  {
    id: 4,
    name: "Ashley M.",
    rating: 5,
    text: "Professional, creative, and so talented! My go-to place for special occasions.",
    textEs: "¡Profesional, creativa y muy talentosa! Mi lugar favorito para ocasiones especiales.",
    service: "Luxury Spa Pedicure",
    serviceEs: "Pedicura Spa de Lujo",
    avatar: "👧",
    date: "Nov 2024"
  },
];

interface FloatingTestimonialsProps {
  lang?: "en" | "es";
}

export default function FloatingTestimonials({ lang = "en" }: FloatingTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

  // Show after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasBeenDismissed) {
        setIsVisible(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [hasBeenDismissed]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasBeenDismissed(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const testimonial = TESTIMONIALS[currentIndex];

  const t = {
    en: {
      title: "What Our Clients Say",
      verified: "Verified Client",
    },
    es: {
      title: "Lo Que Dicen Nuestras Clientas",
      verified: "Cliente Verificada",
    },
  };

  const text = t[lang];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-24 left-4 z-[100] w-80 max-w-[calc(100vw-2rem)]"
        >
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#722F37] to-[#B76E79] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Quote className="w-4 h-4 text-white/80" />
                <span className="text-white text-xs font-medium">{text.title}</span>
              </div>
              <button
                onClick={handleDismiss}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    "{lang === "en" ? testimonial.text : testimonial.textEs}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/20 flex items-center justify-center text-lg">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-[#722F37]">
                        {lang === "en" ? testimonial.service : testimonial.serviceEs}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block">{testimonial.date}</span>
                      <span className="text-[9px] text-emerald-600 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        {text.verified}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="px-4 pb-3 flex items-center justify-between">
              <div className="flex gap-1">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex ? "bg-[#722F37] w-4" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={handlePrev}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -bottom-1 -right-1 w-16 h-16 bg-gradient-to-tl from-[#B76E79]/10 to-transparent rounded-tl-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
