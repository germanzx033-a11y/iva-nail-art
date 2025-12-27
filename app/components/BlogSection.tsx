"use client";

/**
 * IVA Nail Art - Premium Blog Section
 * Compact, visually stunning nail care insights
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Clock,
  Sparkles,
  ArrowRight,
  X,
  MessageCircle
} from "lucide-react";
import { CONFIG } from "../constants";

interface BlogSectionProps {
  lang: "en" | "es";
}

interface BlogPost {
  id: string;
  title: string;
  titleEs: string;
  excerpt: string;
  excerptEs: string;
  category: string;
  categoryEs: string;
  readTime: number;
  gradient: string;
  icon: string;
  tips: string[];
  tipsEs: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "gel-care",
    title: "Gel Manicure: 3+ Weeks",
    titleEs: "Gel Manicura: 3+ Semanas",
    excerpt: "Pro secrets for long-lasting nails",
    excerptEs: "Secretos pro para uñas duraderas",
    category: "Care",
    categoryEs: "Cuidado",
    readTime: 4,
    gradient: "from-rose-400 via-pink-500 to-rose-600",
    icon: "💅",
    tips: [
      "Apply cuticle oil daily (morning & night)",
      "Wear gloves when cleaning or washing dishes",
      "Avoid using nails as tools",
      "Book touch-ups every 2-3 weeks",
      "Keep hands moisturized to prevent lifting",
    ],
    tipsEs: [
      "Aplica aceite de cutícula diariamente",
      "Usa guantes al limpiar o lavar platos",
      "Evita usar las uñas como herramientas",
      "Reserva retoques cada 2-3 semanas",
      "Mantén las manos hidratadas",
    ],
  },
  {
    id: "seasonal-trends",
    title: "2025 Nail Trends",
    titleEs: "Tendencias 2025",
    excerpt: "Hottest looks from Paris to NYC",
    excerptEs: "Lo más hot de París a NYC",
    category: "Trends",
    categoryEs: "Tendencias",
    readTime: 5,
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
    icon: "✨",
    tips: [
      "Minimalist chrome accents on nude bases",
      "3D floral embellishments for special occasions",
      "Glazed donut effect with pearl powders",
      "Mixed metal French tips (gold + silver)",
      "Negative space designs with geometric lines",
    ],
    tipsEs: [
      "Acentos cromados minimalistas sobre bases nude",
      "Flores 3D para ocasiones especiales",
      "Efecto 'donut glaseado' con polvos perlados",
      "Francesas de metales mixtos (oro + plata)",
      "Diseños de espacio negativo con líneas geométricas",
    ],
  },
  {
    id: "nail-health",
    title: "Nail Health Signs",
    titleEs: "Señales de Salud",
    excerpt: "When your nails need a break",
    excerptEs: "Cuando tus uñas necesitan descanso",
    category: "Health",
    categoryEs: "Salud",
    readTime: 6,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    icon: "💎",
    tips: [
      "Peeling or splitting: Switch to builder gel for strength",
      "White spots: Boost biotin intake & hydrate cuticles",
      "Yellowing: Take a 1-week break between colors",
      "Thin nails: Use keratin treatment before reapplying gel",
      "Pain/redness: Consult a professional immediately",
    ],
    tipsEs: [
      "Descamación: Cambia a builder gel para fuerza",
      "Manchas blancas: Aumenta biotina e hidrata cutículas",
      "Amarillamiento: Toma 1 semana de descanso",
      "Uñas delgadas: Usa tratamiento de keratina",
      "Dolor/enrojecimiento: Consulta un profesional",
    ],
  },
];

export default function BlogSection({ lang }: BlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const t = {
    en: {
      title: "Nail Insights",
      subtitle: "Expert tips from IVA's studio",
      readMore: "Read",
      closePost: "Back",
      minRead: "min",
      askIva: "Have questions?",
      askButton: "Ask IVA",
    },
    es: {
      title: "Tips de Uñas",
      subtitle: "Consejos expertos del estudio de IVA",
      readMore: "Leer",
      closePost: "Volver",
      minRead: "min",
      askIva: "¿Tienes preguntas?",
      askButton: "Pregunta a IVA",
    },
  };

  const text = t[lang];

  const handleAskIVA = (post: BlogPost) => {
    const message = lang === "en"
      ? `Hi! I read your article "${post.title}" and I have a question...`
      : `¡Hola! Leí tu artículo "${post.titleEs}" y tengo una pregunta...`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // Detail Modal
  if (selectedPost) {
    return (
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-[#FDFCFB] to-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute -top-2 -right-2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Header Card */}
            <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${selectedPost.gradient} p-6 sm:p-8 text-white mb-6`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="relative">
                <span className="text-5xl sm:text-6xl mb-4 block">{selectedPost.icon}</span>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    {lang === "en" ? selectedPost.category : selectedPost.categoryEs}
                  </span>
                  <span className="flex items-center gap-1 text-white/80 text-xs">
                    <Clock className="w-3 h-3" />
                    {selectedPost.readTime} {text.minRead}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium">
                  {lang === "en" ? selectedPost.title : selectedPost.titleEs}
                </h2>
              </div>
            </div>

            {/* Tips List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                {lang === "en" ? "Key Tips" : "Consejos Clave"}
              </h3>
              <ul className="space-y-4">
                {(lang === "en" ? selectedPost.tips : selectedPost.tipsEs).map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className={`flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br ${selectedPost.gradient} text-white text-sm flex items-center justify-center font-semibold shadow-sm`}>
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed pt-0.5">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[#722F37] to-[#4A1C24] rounded-2xl p-6 text-center">
              <p className="text-white/90 mb-4">{text.askIva}</p>
              <button
                onClick={() => handleAskIVA(selectedPost)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#722F37] rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                {text.askButton}
              </button>
            </div>

            {/* Back Link */}
            <button
              onClick={() => setSelectedPost(null)}
              className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mx-auto"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              {text.closePost}
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-[#FDFCFB] to-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-2">
              <span className="bg-gradient-to-r from-[#722F37] via-[#B76E79] to-[#D4A574] bg-clip-text text-transparent font-semibold">
                {text.title}
              </span>
            </h2>
            <p className="text-gray-500 text-sm">{text.subtitle}</p>
          </motion.div>
        </div>

        {/* Compact Card Grid */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1">
                {/* Gradient Header */}
                <div className={`relative h-24 sm:h-28 bg-gradient-to-br ${post.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl" />

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl sm:text-5xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      {post.icon}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/25 backdrop-blur-sm rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
                      {lang === "en" ? post.category : post.categoryEs}
                    </span>
                  </div>

                  {/* Read Time */}
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 text-white/90 text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#722F37] transition-colors leading-tight">
                    {lang === "en" ? post.title : post.titleEs}
                  </h3>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-1">
                    {lang === "en" ? post.excerpt : post.excerptEs}
                  </p>

                  {/* Read Link */}
                  <div className="flex items-center gap-1.5 text-[#722F37] font-semibold text-sm group-hover:gap-2.5 transition-all">
                    {text.readMore}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
