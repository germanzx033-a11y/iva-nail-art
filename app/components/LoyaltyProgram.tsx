"use client";

import { Crown, Star, Sparkles, Gift, Calendar, Heart } from "lucide-react";

interface LoyaltyProgramProps {
  lang: "en" | "es";
}

interface Tier {
  id: string;
  name: string;
  nameEs: string;
  icon: React.ReactNode;
  visits: number;
  color: string;
  bgColor: string;
  benefits: string[];
  benefitsEs: string[];
}

const TIERS: Tier[] = [
  {
    id: "bronze",
    name: "Bronze Beauty",
    nameEs: "Bronce Belleza",
    icon: <Heart className="w-6 h-6" />,
    visits: 1,
    color: "#CD7F32",
    bgColor: "bg-[#CD7F32]/10",
    benefits: [
      "5% off all services",
      "Birthday month surprise",
      "Priority waitlist",
    ],
    benefitsEs: [
      "5% descuento en servicios",
      "Sorpresa de cumpleaños",
      "Lista de espera prioritaria",
    ],
  },
  {
    id: "silver",
    name: "Silver Sparkle",
    nameEs: "Plata Brillante",
    icon: <Sparkles className="w-6 h-6" />,
    visits: 5,
    color: "#C0C0C0",
    bgColor: "bg-[#C0C0C0]/10",
    benefits: [
      "10% off all services",
      "Free nail art upgrade (once/month)",
      "Early access to new designs",
      "Exclusive seasonal designs",
    ],
    benefitsEs: [
      "10% descuento en servicios",
      "Mejora gratis de nail art (1/mes)",
      "Acceso anticipado a diseños",
      "Diseños de temporada exclusivos",
    ],
  },
  {
    id: "gold",
    name: "Gold Goddess",
    nameEs: "Diosa Dorada",
    icon: <Crown className="w-6 h-6" />,
    visits: 10,
    color: "#D4AF37",
    bgColor: "bg-[#D4AF37]/10",
    benefits: [
      "15% off all services",
      "Free service on your birthday",
      "Complimentary luxury add-on",
      "VIP booking privileges",
      "Bring a friend discount (20% off)",
    ],
    benefitsEs: [
      "15% descuento en servicios",
      "Servicio gratis en cumpleaños",
      "Agregado de lujo complementario",
      "Privilegios VIP de reserva",
      "Descuento para invitar amiga (20%)",
    ],
  },
];

export default function LoyaltyProgram({ lang }: LoyaltyProgramProps) {
  const t = {
    en: {
      title: "VIP Rewards Program",
      subtitle: "Because loyalty deserves luxury",
      howItWorks: "How It Works",
      step1: "Book & Visit",
      step1Desc: "Every appointment counts towards your tier",
      step2: "Earn Points",
      step2Desc: "Automatically track your progress",
      step3: "Unlock Perks",
      step3Desc: "Enjoy exclusive benefits & savings",
      joinNow: "Join When You Book",
      afterVisits: "After {visits} visits",
    },
    es: {
      title: "Programa VIP de Recompensas",
      subtitle: "Porque la lealtad merece lujo",
      howItWorks: "Cómo Funciona",
      step1: "Reserva y Visita",
      step1Desc: "Cada cita cuenta para tu nivel",
      step2: "Gana Puntos",
      step2Desc: "Seguimiento automático de progreso",
      step3: "Desbloquea Beneficios",
      step3Desc: "Disfruta beneficios exclusivos",
      joinNow: "Únete al Reservar",
      afterVisits: "Después de {visits} visitas",
    },
  };

  const text = t[lang];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#4A0404]/5 via-white to-[#D4AF37]/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 mb-4">
            <Star className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3">
            {text.title}
          </h2>
          <p className="text-[#4A0404]/60 text-sm sm:text-base">{text.subtitle}</p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {TIERS.map((tier, index) => (
            <div
              key={tier.id}
              className={`relative p-6 rounded-2xl border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                index === 2
                  ? "border-[#D4AF37] shadow-lg scale-105"
                  : "border-[#4A0404]/10"
              }`}
            >
              {index === 2 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white text-xs px-3 py-1 rounded-full font-medium">
                  {lang === "en" ? "Most Exclusive" : "Más Exclusivo"}
                </div>
              )}

              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${tier.bgColor} mb-4`} style={{ color: tier.color }}>
                {tier.icon}
              </div>

              <h3 className="font-serif text-2xl text-[#4A0404] mb-2">
                {lang === "en" ? tier.name : tier.nameEs}
              </h3>

              <p className="text-sm text-[#4A0404]/60 mb-4">
                {text.afterVisits.replace("{visits}", tier.visits.toString())}
              </p>

              <ul className="space-y-3">
                {(lang === "en" ? tier.benefits : tier.benefitsEs).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#4A0404]/80">
                    <Star className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="font-serif text-2xl text-[#4A0404] text-center mb-8">
            {text.howItWorks}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#4A0404]/5 mb-4">
                <Calendar className="w-7 h-7 text-[#4A0404]" />
              </div>
              <h4 className="font-medium text-[#4A0404] mb-2">{text.step1}</h4>
              <p className="text-sm text-[#4A0404]/60">{text.step1Desc}</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#D4AF37]/10 mb-4">
                <Sparkles className="w-7 h-7 text-[#D4AF37]" />
              </div>
              <h4 className="font-medium text-[#4A0404] mb-2">{text.step2}</h4>
              <p className="text-sm text-[#4A0404]/60">{text.step2Desc}</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#4A0404]/5 mb-4">
                <Gift className="w-7 h-7 text-[#4A0404]" />
              </div>
              <h4 className="font-medium text-[#4A0404] mb-2">{text.step3}</h4>
              <p className="text-sm text-[#4A0404]/60">{text.step3Desc}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-[#4A0404]/70 text-sm">
            {text.joinNow}
          </p>
        </div>
      </div>
    </section>
  );
}
