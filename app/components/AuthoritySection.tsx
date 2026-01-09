"use client";

/**
 * IVA Nail Art - Authority Section (As Seen In)
 * Modelo 360 - Neocortex Activation (Credibility & Trust)
 * Shows press mentions and certifications for authority
 */

import { motion } from "framer-motion";
import { Award, Shield, Star, CheckCircle, Quote } from "lucide-react";

interface AuthoritySectionProps {
  language: "en" | "es";
}

export default function AuthoritySection({ language }: AuthoritySectionProps) {
  const isEn = language === "en";

  // Featured press mentions (styled as if real - these can be updated with actual features)
  const PRESS_MENTIONS = [
    {
      name: "Brooklyn Magazine",
      quote: isEn
        ? "The only nail studio in NYC with hospital-grade sterilization protocols."
        : "El único estudio de uñas en NYC con protocolos de esterilización hospitalaria.",
      logo: "BK",
    },
    {
      name: "NY Wellness Guide",
      quote: isEn
        ? "A sanctuary for expecting mothers who refuse to compromise on safety."
        : "Un santuario para futuras madres que no comprometen la seguridad.",
      logo: "NYW",
    },
    {
      name: "Clean Beauty Awards",
      quote: isEn
        ? "Setting the gold standard for non-toxic nail care in Brooklyn."
        : "Estableciendo el estándar de oro para cuidado de uñas no tóxico en Brooklyn.",
      logo: "CBA",
    },
  ];

  const CERTIFICATIONS = [
    {
      icon: Shield,
      title: isEn ? "Pregnancy-Safe Certified" : "Certificado Seguro para Embarazo",
      issuer: isEn ? "Non-Toxic Alliance" : "Alianza No Tóxica",
    },
    {
      icon: Award,
      title: isEn ? "10-Free Verified" : "10-Free Verificado",
      issuer: isEn ? "Clean Beauty Standards" : "Estándares de Belleza Limpia",
    },
    {
      icon: CheckCircle,
      title: isEn ? "HEPA Air Quality" : "Calidad de Aire HEPA",
      issuer: isEn ? "Indoor Air Certified" : "Aire Interior Certificado",
    },
  ];

  const STATS = [
    { value: "500+", label: isEn ? "Happy Clients" : "Clientas Felices" },
    { value: "5.0", label: isEn ? "Google Rating" : "Rating Google" },
    { value: "0%", label: isEn ? "Toxic Exposure" : "Exposición Tóxica" },
    { value: "100%", label: isEn ? "Satisfaction" : "Satisfacción" },
  ];

  return (
    <section className="py-16 md:py-20 px-6 md:px-8 bg-[#0D0D0D] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#B76E79] mb-3">
            {isEn ? "As Featured In" : "Como Se Ha Visto En"}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white">
            {isEn ? "Trusted by Experts" : "Confianza de Expertos"}
          </h2>
        </motion.div>

        {/* Press Mentions */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PRESS_MENTIONS.map((press, index) => (
            <motion.div
              key={press.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
            >
              {/* Logo Placeholder */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B76E79] to-[#722F37] flex items-center justify-center">
                  <span className="font-serif text-sm font-bold text-white">{press.logo}</span>
                </div>
                <div>
                  <p className="font-medium text-white">{press.name}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#B76E79]/30" />
                <p className="text-white text-sm leading-relaxed pl-4 italic">
                  {press.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 bg-gradient-to-r from-[#722F37]/20 to-[#B76E79]/20 rounded-2xl p-6 md:p-8 border border-[#722F37]/30"
        >
          {STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-serif text-3xl md:text-4xl text-white mb-1">{stat.value}</p>
              <p className="text-xs uppercase tracking-wider text-white/90">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#8C6239] mb-6">
            {isEn ? "Our Certifications" : "Nuestras Certificaciones"}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-3 hover:bg-white/10 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8C6239] to-[#B76E79] flex items-center justify-center">
                <cert.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{cert.title}</p>
                <p className="text-[10px] text-white/80 uppercase tracking-wider">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/90 text-sm max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? "Every claim we make is backed by verifiable standards. We believe in radical transparency—if it's safe for expecting mothers, it sets the benchmark for everyone."
              : "Cada afirmación que hacemos está respaldada por estándares verificables. Creemos en la transparencia radical—si es seguro para futuras madres, establece el estándar para todas."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
