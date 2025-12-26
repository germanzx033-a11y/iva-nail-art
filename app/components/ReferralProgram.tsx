"use client";

import { useState } from "react";
import { Gift, Users, Sparkles, Copy, Check, Heart } from "lucide-react";
import { CONFIG } from "../constants";

interface ReferralProgramProps {
  lang: "en" | "es";
}

export default function ReferralProgram({ lang }: ReferralProgramProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  const t = {
    en: {
      title: "Share the Luxury",
      subtitle: "Give $20, Get $20 when your friends book their first appointment",
      howItWorks: "How It Works",
      yourCode: "Your Referral Code",
      copyCode: "Copy Code",
      copied: "Copied!",
      shareNow: "Share Your Code",
      steps: [
        {
          icon: <Users className="w-8 h-8" />,
          title: "Share Your Code",
          description: "Send your unique code to friends who haven't visited IVA yet",
        },
        {
          icon: <Sparkles className="w-8 h-8" />,
          title: "They Book & Save",
          description: "Your friend gets $20 off their first appointment of $80+",
        },
        {
          icon: <Gift className="w-8 h-8" />,
          title: "You Earn Rewards",
          description: "Receive $20 credit after their appointment is completed",
        },
      ],
      benefits: {
        title: "Referral Rewards",
        unlimited: "Unlimited Referrals",
        unlimitedDesc: "No cap on how many friends you can refer",
        stackable: "Stackable Credits",
        stackableDesc: "Combine multiple credits for premium services",
        never: "Never Expires",
        neverDesc: "Use your credits anytime, no expiration date",
      },
      terms: "Min. $80 purchase for discount. New clients only. Cannot be combined with other offers.",
      getStarted: "Get Your Referral Code",
    },
    es: {
      title: "Comparte el Lujo",
      subtitle: "Regala $20, recibe $20 cuando tus amigas reserven su primera cita",
      howItWorks: "Cómo Funciona",
      yourCode: "Tu Código de Referido",
      copyCode: "Copiar Código",
      copied: "¡Copiado!",
      shareNow: "Comparte tu Código",
      steps: [
        {
          icon: <Users className="w-8 h-8" />,
          title: "Comparte tu Código",
          description: "Envía tu código único a amigas que no hayan visitado IVA",
        },
        {
          icon: <Sparkles className="w-8 h-8" />,
          title: "Ellas Reservan y Ahorran",
          description: "Tu amiga obtiene $20 de descuento en su primera cita de $80+",
        },
        {
          icon: <Gift className="w-8 h-8" />,
          title: "Ganas Recompensas",
          description: "Recibe $20 de crédito después de que completen su cita",
        },
      ],
      benefits: {
        title: "Recompensas de Referidos",
        unlimited: "Referencias Ilimitadas",
        unlimitedDesc: "Sin límite de amigas que puedes referir",
        stackable: "Créditos Acumulables",
        stackableDesc: "Combina múltiples créditos para servicios premium",
        never: "Nunca Expiran",
        neverDesc: "Usa tus créditos cuando quieras, sin fecha de caducidad",
      },
      terms: "Compra mín. $80 para descuento. Solo clientas nuevas. No se puede combinar con otras ofertas.",
      getStarted: "Obtén tu Código de Referido",
    },
  };

  const text = t[lang];

  // Generate a sample referral code (in real app, this would be unique per user)
  const referralCode = "IVANAILS20";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleGetCode = () => {
    const message = lang === "en"
      ? "Hi! I'd like to get my unique referral code to share IVA Nail Art with my friends. Can you set one up for me?"
      : "¡Hola! Me gustaría obtener mi código de referido único para compartir IVA Nail Art con mis amigas. ¿Puedes configurar uno para mí?";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareCode = () => {
    const message = lang === "en"
      ? `💅 Discover IVA Nail Art - the most exclusive nail studio in Brooklyn!\n\nUse my code "${referralCode}" to get $20 off your first appointment ($80+).\n\n✨ Pregnancy-safe products\n🧼 Hospital-grade sterilization\n🤰 Max 3 clients per day\n\nBook now: https://iva-nail-art.vercel.app`
      : `💅 ¡Descubre IVA Nail Art - el estudio de uñas más exclusivo de Brooklyn!\n\nUsa mi código "${referralCode}" para obtener $20 de descuento en tu primera cita ($80+).\n\n✨ Productos seguros para embarazadas\n🧼 Esterilización hospitalaria\n🤰 Máx. 3 clientas por día\n\nReserva ahora: https://iva-nail-art.vercel.app`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 mb-4">
            <Heart className="w-8 h-8 text-[#D4AF37]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3 tracking-tight">
            {text.title}
          </h2>

          <p className="text-[#4A0404]/60 text-base sm:text-lg max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-center font-medium text-2xl text-[#4A0404] mb-10">{text.howItWorks}</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {text.steps.map((step, index) => (
              <div key={index} className="text-center">
                {/* Step Number & Icon */}
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4A0404]/10 to-[#D4AF37]/10 flex items-center justify-center text-[#4A0404]">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>

                <h4 className="font-medium text-lg text-[#4A0404] mb-2">{step.title}</h4>
                <p className="text-sm text-[#4A0404]/60 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Code Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-[#4A0404] to-[#D4AF37] rounded-2xl p-8 sm:p-10 text-white text-center shadow-2xl">
            <p className="text-[#F7E7CE] text-sm mb-3 uppercase tracking-wider">{text.yourCode}</p>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
              <div className="flex items-center justify-center gap-4">
                <span className="font-serif text-3xl sm:text-4xl tracking-widest">{referralCode}</span>
                <button
                  onClick={handleCopyCode}
                  className="p-3 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  title={text.copyCode}
                >
                  {copiedCode ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              {copiedCode && (
                <p className="text-[#F7E7CE] text-sm mt-2 animate-fade-in">{text.copied}</p>
              )}
            </div>

            <button
              onClick={handleShareCode}
              className="w-full py-4 rounded-xl bg-white text-[#4A0404] font-medium hover:bg-[#F7E7CE] transition-all shadow-lg hover:shadow-xl"
            >
              {text.shareNow}
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="bg-[#FDF8F6] rounded-2xl p-8 sm:p-10">
          <h3 className="text-center font-medium text-2xl text-[#4A0404] mb-8">{text.benefits.title}</h3>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 mb-3">
                <span className="text-2xl">♾️</span>
              </div>
              <h4 className="font-medium text-[#4A0404] mb-2">{text.benefits.unlimited}</h4>
              <p className="text-sm text-[#4A0404]/60">{text.benefits.unlimitedDesc}</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="font-medium text-[#4A0404] mb-2">{text.benefits.stackable}</h4>
              <p className="text-sm text-[#4A0404]/60">{text.benefits.stackableDesc}</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 mb-3">
                <span className="text-2xl">⏳</span>
              </div>
              <h4 className="font-medium text-[#4A0404] mb-2">{text.benefits.never}</h4>
              <p className="text-sm text-[#4A0404]/60">{text.benefits.neverDesc}</p>
            </div>
          </div>

          <p className="text-center text-xs text-[#4A0404]/50 italic">{text.terms}</p>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={handleGetCode}
            className="px-8 py-4 rounded-xl bg-[#4A0404] text-white font-medium hover:bg-[#4A0404]/90 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            <Gift className="w-5 h-5" />
            {text.getStarted}
          </button>
        </div>
      </div>
    </section>
  );
}
