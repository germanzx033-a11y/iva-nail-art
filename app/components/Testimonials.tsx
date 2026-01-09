'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    role: "First-time Mom",
    content: "Finally found a salon that understands the needs of pregnant women! The HEPA filtration and non-toxic polishes gave me peace of mind. My nails looked stunning for my baby shower.",
    rating: 5,
  },
  {
    id: 2,
    name: "Jessica L.",
    role: "Regular Client",
    content: "The attention to detail is incredible. IVA creates nail art that I've never seen anywhere else. Worth every penny for the luxury experience and hospital-grade cleanliness.",
    rating: 5,
  },
  {
    id: 3,
    name: "Maria G.",
    role: "Bride-to-be",
    content: "Had my bridal nails done here and they were PERFECT. The custom 3D art with crystals was exactly what I envisioned. Everyone at my wedding asked where I got them done!",
    rating: 5,
  },
  {
    id: 4,
    name: "Emily R.",
    role: "Healthcare Worker",
    content: "As a nurse, hygiene is everything to me. IVA's sterilization practices are truly hospital-grade. Plus the private appointment setting means I can actually relax.",
    rating: 5,
  },
];

// Star component with yellow fill
const StarIcon = ({ filled = true, delay = 0 }: { filled?: boolean; delay?: number }) => (
  <motion.svg
    initial={{ opacity: 0, scale: 0, rotate: -180 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
    viewBox="0 0 24 24"
    className="w-6 h-6"
  >
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#FFC107" />
        <stop offset="100%" stopColor="#FFB300" />
      </linearGradient>
      <filter id="starGlow">
        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={filled ? "url(#starGradient)" : "none"}
      stroke={filled ? "#FFD700" : "#E0E0E0"}
      strokeWidth="1"
      filter={filled ? "url(#starGlow)" : "none"}
    />
  </motion.svg>
);

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goTo = (index: number) => {
    setIsAutoPlaying(false);
    setCurrent(index);
  };

  return (
    <section className="py-20 md:py-32 px-6 md:px-8 bg-gradient-to-b from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#722F37]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#B76E79]/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#FFD700]/5 to-transparent rounded-full" />
      </div>

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Luxury Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD700]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#FFD700] font-medium">
              Client Stories
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD700]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl text-white mb-4"
          >
            Voices of{' '}
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFB300] bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white max-w-md mx-auto text-lg"
          >
            Discover why our clients choose IVA for their luxury nail experience
          </motion.p>
        </div>

        {/* Main Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Decorative frame */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#FFD700]/20 via-[#722F37]/20 to-[#FFD700]/20 rounded-3xl blur-xl opacity-50" />

          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-3xl border border-white/10 overflow-hidden">
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#FFD700] to-transparent" />
              <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[#FFD700] to-transparent" />
            </div>
            <div className="absolute top-0 right-0 w-24 h-24">
              <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#FFD700] to-transparent" />
              <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-[#FFD700] to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24">
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#FFD700] to-transparent" />
              <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-[#FFD700] to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24">
              <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#FFD700] to-transparent" />
              <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-[#FFD700] to-transparent" />
            </div>

            <div className="p-8 md:p-16">
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#722F37] rounded-full blur-lg opacity-50" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#B76E79] rounded-full flex items-center justify-center">
                    <Quote className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-2 mb-8">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <StarIcon key={i} delay={i * 0.1} />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-center mb-10">
                    <p className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-light italic">
                      &ldquo;{testimonials[current].content}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="flex flex-col items-center">
                    {/* Avatar with gold ring */}
                    <div className="relative mb-4">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] via-[#B76E79] to-[#FFD700] rounded-full animate-spin-slow opacity-75" style={{ animationDuration: '8s' }} />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#722F37] to-[#B76E79] flex items-center justify-center border-2 border-[#0D0D0D]">
                        <span className="text-white font-serif text-2xl">
                          {testimonials[current].name.charAt(0)}
                        </span>
                      </div>
                    </div>

                    <p className="font-serif text-xl text-white mb-1">
                      {testimonials[current].name}
                    </p>
                    <p className="text-sm text-[#FFD700] uppercase tracking-wider">
                      {testimonials[current].role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 hover:border-[#FFD700]/50 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-[#FFD700] transition-colors" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 hover:border-[#FFD700]/50 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-[#FFD700] transition-colors" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === current
                    ? 'w-10 bg-gradient-to-r from-[#FFD700] to-[#B76E79]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-6 md:gap-12 mt-16 md:mt-24 max-w-3xl mx-auto"
        >
          {[
            { value: "127+", label: "Happy Clients", icon: "👑" },
            { value: "5.0", label: "Average Rating", icon: "⭐" },
            { value: "100%", label: "Recommend Us", icon: "💎" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="font-serif text-3xl md:text-5xl bg-gradient-to-r from-[#FFD700] to-[#B76E79] bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-wider text-white group-hover:text-white transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}
