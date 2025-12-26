"use client";

import { useState } from "react";
import { BookOpen, ChevronRight, Clock, Tag } from "lucide-react";
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
  image: string;
  tips: string[];
  tipsEs: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "gel-care",
    title: "How to Make Your Gel Manicure Last 3+ Weeks",
    titleEs: "Cómo Hacer que tu Manicura en Gel Dure 3+ Semanas",
    excerpt: "Professional secrets to extend the life of your gel nails",
    excerptEs: "Secretos profesionales para prolongar la vida de tus uñas en gel",
    category: "Care Tips",
    categoryEs: "Consejos de Cuidado",
    readTime: 4,
    image: "💅",
    tips: [
      "Apply cuticle oil daily (morning & night)",
      "Wear gloves when cleaning or washing dishes",
      "Avoid using nails as tools",
      "Book touch-ups every 2-3 weeks",
      "Keep hands moisturized to prevent lifting",
    ],
    tipsEs: [
      "Aplica aceite de cutícula diariamente (mañana y noche)",
      "Usa guantes al limpiar o lavar platos",
      "Evita usar las uñas como herramientas",
      "Reserva retoques cada 2-3 semanas",
      "Mantén las manos hidratadas para evitar despegues",
    ],
  },
  {
    id: "seasonal-trends",
    title: "2025 Nail Art Trends: What's Hot This Season",
    titleEs: "Tendencias de Nail Art 2025: Lo Más Popular Esta Temporada",
    excerpt: "Discover the latest luxury nail designs from Paris to Brooklyn",
    excerptEs: "Descubre los últimos diseños de lujo desde París hasta Brooklyn",
    category: "Trends",
    categoryEs: "Tendencias",
    readTime: 5,
    image: "✨",
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
    title: "5 Signs Your Nails Need a Break (And What to Do)",
    titleEs: "5 Señales de que tus Uñas Necesitan un Descanso (Y Qué Hacer)",
    excerpt: "Learn when to pause and how to strengthen your natural nails",
    excerptEs: "Aprende cuándo pausar y cómo fortalecer tus uñas naturales",
    category: "Health",
    categoryEs: "Salud",
    readTime: 6,
    image: "🩺",
    tips: [
      "Peeling or splitting: Switch to builder gel for strength",
      "White spots: Boost biotin intake & hydrate cuticles",
      "Yellowing: Take a 1-week break between colors",
      "Thin nails: Use keratin treatment before reapplying gel",
      "Pain/redness: Consult a professional immediately",
    ],
    tipsEs: [
      "Descamación o grietas: Cambia a builder gel para fuerza",
      "Manchas blancas: Aumenta biotina e hidrata cutículas",
      "Amarillamiento: Toma 1 semana de descanso entre colores",
      "Uñas delgadas: Usa tratamiento de keratina antes de gel",
      "Dolor/enrojecimiento: Consulta a un profesional de inmediato",
    ],
  },
];

export default function BlogSection({ lang }: BlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const t = {
    en: {
      title: "Nail Care Insights",
      subtitle: "Expert tips from IVA's studio",
      readMore: "Read Tips",
      closePost: "Back to Articles",
      minRead: "min read",
      askIva: "Ask IVA Personally",
      bookConsultation: "Book a Consultation",
    },
    es: {
      title: "Guía de Cuidado de Uñas",
      subtitle: "Consejos expertos del estudio de IVA",
      readMore: "Leer Consejos",
      closePost: "Volver a Artículos",
      minRead: "min de lectura",
      askIva: "Pregúntale a IVA Personalmente",
      bookConsultation: "Reservar Consulta",
    },
  };

  const text = t[lang];

  const handleAskIVA = (post: BlogPost) => {
    const message = lang === "en"
      ? `Hi! I read your article "${post.title}" and I have a question about nail care...`
      : `¡Hola! Leí tu artículo "${post.titleEs}" y tengo una pregunta sobre cuidado de uñas...`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  if (selectedPost) {
    return (
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-[#4A0404]/60 hover:text-[#4A0404] mb-6 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            {text.closePost}
          </button>

          <div className="text-6xl mb-4">{selectedPost.image}</div>
          <div className="flex items-center gap-4 text-sm text-[#4A0404]/60 mb-4">
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {lang === "en" ? selectedPost.category : selectedPost.categoryEs}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {selectedPost.readTime} {text.minRead}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#4A0404] mb-6">
            {lang === "en" ? selectedPost.title : selectedPost.titleEs}
          </h2>

          <p className="text-[#4A0404]/70 mb-8 text-lg">
            {lang === "en" ? selectedPost.excerpt : selectedPost.excerptEs}
          </p>

          <div className="bg-[#FDF8F6] rounded-2xl p-6 sm:p-8 mb-8">
            <h3 className="font-medium text-[#4A0404] mb-4 flex items-center gap-2">
              <span className="text-xl">{selectedPost.image}</span>
              {lang === "en" ? "Key Takeaways" : "Puntos Clave"}
            </h3>
            <ul className="space-y-3">
              {(lang === "en" ? selectedPost.tips : selectedPost.tipsEs).map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37] text-white text-sm flex items-center justify-center font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-[#4A0404]/80">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#4A0404] to-[#D4AF37] rounded-2xl p-6 sm:p-8 text-white text-center">
            <p className="mb-4 text-lg">
              {text.askIva}
            </p>
            <button
              onClick={() => handleAskIVA(selectedPost)}
              className="bg-white text-[#4A0404] px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors"
            >
              {text.bookConsultation}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4A0404]/5 mb-4">
            <BookOpen className="w-8 h-8 text-[#4A0404]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3">
            {text.title}
          </h2>
          <p className="text-[#4A0404]/60 text-sm sm:text-base">{text.subtitle}</p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="group bg-[#FDF8F6] rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="p-6">
                <div className="text-5xl mb-4">{post.image}</div>

                <div className="flex items-center gap-3 text-xs text-[#4A0404]/60 mb-3">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {lang === "en" ? post.category : post.categoryEs}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime} {text.minRead}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-[#4A0404] mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {lang === "en" ? post.title : post.titleEs}
                </h3>

                <p className="text-sm text-[#4A0404]/60 mb-4 line-clamp-2">
                  {lang === "en" ? post.excerpt : post.excerptEs}
                </p>

                <div className="flex items-center gap-2 text-[#4A0404] font-medium text-sm group-hover:text-[#D4AF37] transition-colors">
                  {text.readMore}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
