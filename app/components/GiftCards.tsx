"use client";

import { useState } from "react";
import { Gift, Check, Sparkles } from "lucide-react";
import { CONFIG } from "../constants";

interface GiftCardsProps {
  lang: "en" | "es";
}

interface GiftCardOption {
  amount: number;
  popular?: boolean;
  description: string;
  descriptionEs: string;
}

const GIFT_CARD_OPTIONS: GiftCardOption[] = [
  {
    amount: 50,
    description: "Perfect for a gel manicure",
    descriptionEs: "Perfecto para una manicura en gel",
  },
  {
    amount: 100,
    popular: true,
    description: "Builder gel + design",
    descriptionEs: "Builder gel + diseño",
  },
  {
    amount: 150,
    description: "Premium experience + tip",
    descriptionEs: "Experiencia premium + propina",
  },
  {
    amount: 0,
    description: "Custom amount",
    descriptionEs: "Monto personalizado",
  },
];

export default function GiftCards({ lang }: GiftCardsProps) {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");

  const t = {
    en: {
      title: "Gift Luxury",
      subtitle: "Digital gift cards delivered instantly",
      chooseAmount: "Choose Amount",
      recipientName: "Recipient Name",
      senderName: "Your Name",
      personalMessage: "Personal Message (optional)",
      messagePlaceholder: "Happy Birthday! Enjoy your pampering session...",
      customAmount: "Custom Amount",
      purchase: "Purchase Gift Card via WhatsApp",
      popular: "Most Popular",
      features: [
        "Delivered instantly",
        "Never expires",
        "Can be combined",
        "Redeemable for any service",
      ],
    },
    es: {
      title: "Regala Lujo",
      subtitle: "Tarjetas de regalo digitales entregadas al instante",
      chooseAmount: "Elige el Monto",
      recipientName: "Nombre del Destinatario",
      senderName: "Tu Nombre",
      personalMessage: "Mensaje Personal (opcional)",
      messagePlaceholder: "¡Feliz cumpleaños! Disfruta tu sesión de belleza...",
      customAmount: "Monto Personalizado",
      purchase: "Comprar Tarjeta de Regalo por WhatsApp",
      popular: "Más Popular",
      features: [
        "Entrega instantánea",
        "Nunca expira",
        "Se puede combinar",
        "Canjeable por cualquier servicio",
      ],
    },
  };

  const text = t[lang];

  const handlePurchase = () => {
    const amount = selectedAmount === 0 ? customAmount : selectedAmount;
    const messageLines = [
      "🎁 *Gift Card Purchase Request*",
      "",
      `💰 *Amount:* $${amount}`,
      `👤 *Recipient:* ${recipientName || "Not specified"}`,
      `👋 *From:* ${senderName}`,
      message ? `💌 *Message:* ${message}` : "",
      "",
      "Please send me payment details!",
    ].filter(Boolean);

    const whatsappMessage = messageLines.join("\n");
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const canPurchase = senderName.trim() !== "" && (selectedAmount > 0 || customAmount !== "");

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#4A0404]/5 via-[#FDF8F6] to-[#D4AF37]/5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 mb-4">
            <Gift className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3">
            {text.title}
          </h2>
          <p className="text-[#4A0404]/60 text-sm sm:text-base">{text.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Amount Selection */}
          <div>
            <h3 className="font-medium text-[#4A0404] mb-4">{text.chooseAmount}</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {GIFT_CARD_OPTIONS.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => setSelectedAmount(option.amount)}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                    selectedAmount === option.amount
                      ? "border-[#4A0404] bg-[#4A0404]/5 shadow-md"
                      : "border-[#4A0404]/10 hover:border-[#4A0404]/30"
                  }`}
                >
                  {option.popular && (
                    <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs px-2 py-1 rounded-full">
                      {text.popular}
                    </span>
                  )}
                  <div className="font-serif text-2xl text-[#4A0404] mb-1">
                    {option.amount === 0 ? "💳" : `$${option.amount}`}
                  </div>
                  <div className="text-xs text-[#4A0404]/60">
                    {lang === "en" ? option.description : option.descriptionEs}
                  </div>
                </button>
              ))}
            </div>

            {selectedAmount === 0 && (
              <div className="mb-6">
                <label className="block text-sm text-[#4A0404]/70 mb-2">
                  {text.customAmount}
                </label>
                <input
                  type="number"
                  min="25"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full px-4 py-3 rounded-xl border border-[#4A0404]/20 focus:border-[#4A0404] focus:outline-none focus:ring-2 focus:ring-[#4A0404]/10 transition-all"
                />
              </div>
            )}

            {/* Features */}
            <div className="space-y-2">
              {text.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-[#4A0404]/70">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Personalization */}
          <div>
            <h3 className="font-medium text-[#4A0404] mb-4">
              {lang === "en" ? "Personalize" : "Personalizar"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#4A0404]/70 mb-2">
                  {text.recipientName}
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Sarah..."
                  className="w-full px-4 py-3 rounded-xl border border-[#4A0404]/20 focus:border-[#4A0404] focus:outline-none focus:ring-2 focus:ring-[#4A0404]/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-[#4A0404]/70 mb-2">
                  {text.senderName} *
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your name..."
                  className="w-full px-4 py-3 rounded-xl border border-[#4A0404]/20 focus:border-[#4A0404] focus:outline-none focus:ring-2 focus:ring-[#4A0404]/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-[#4A0404]/70 mb-2">
                  {text.personalMessage}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={text.messagePlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#4A0404]/20 focus:border-[#4A0404] focus:outline-none focus:ring-2 focus:ring-[#4A0404]/10 transition-all resize-none"
                />
              </div>

              <button
                onClick={handlePurchase}
                disabled={!canPurchase}
                className={`w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  canPurchase
                    ? "bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90 shadow-lg hover:shadow-xl"
                    : "bg-[#4A0404]/20 text-[#4A0404]/40 cursor-not-allowed"
                }`}
              >
                <Sparkles className="w-5 h-5" />
                {text.purchase}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
