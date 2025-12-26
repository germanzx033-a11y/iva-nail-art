"use client";

import { Download, Image as ImageIcon, FileText, Palette, Share2, Instagram } from "lucide-react";
import { CONFIG } from "../constants";

interface PressKitProps {
  lang: "en" | "es";
}

export default function PressKit({ lang }: PressKitProps) {
  const t = {
    en: {
      title: "Press & Influencer Kit",
      subtitle: "Everything you need to share IVA Nail Art with your audience",
      forInfluencers: "For Influencers & Content Creators",
      downloadAll: "Download Full Press Kit",
      assets: "Available Assets",
      partnership: "Partnership Opportunities",
      contactUs: "Contact for Collaborations",
      items: [
        {
          icon: <ImageIcon className="w-6 h-6" />,
          title: "Brand Logos",
          description: "High-resolution logos (PNG, SVG) in all brand colors",
          fileSize: "2.4 MB",
        },
        {
          icon: <Palette className="w-6 h-6" />,
          title: "Brand Guidelines",
          description: "Color palette, typography, and usage rules",
          fileSize: "850 KB",
        },
        {
          icon: <ImageIcon className="w-6 h-6" />,
          title: "Studio Photos",
          description: "Professional photos of our work and space",
          fileSize: "12.5 MB",
        },
        {
          icon: <FileText className="w-6 h-6" />,
          title: "Fact Sheet",
          description: "About IVA, services, pricing, and contact info",
          fileSize: "245 KB",
        },
      ],
      benefits: [
        "🎁 Complimentary services for featured posts",
        "💰 15% affiliate commission on referrals",
        "✨ Early access to new designs & collections",
        "📸 Professional content photography included",
      ],
    },
    es: {
      title: "Kit de Prensa e Influencers",
      subtitle: "Todo lo que necesitas para compartir IVA Nail Art con tu audiencia",
      forInfluencers: "Para Influencers y Creadores de Contenido",
      downloadAll: "Descargar Kit Completo",
      assets: "Recursos Disponibles",
      partnership: "Oportunidades de Colaboración",
      contactUs: "Contacta para Colaboraciones",
      items: [
        {
          icon: <ImageIcon className="w-6 h-6" />,
          title: "Logos de Marca",
          description: "Logos en alta resolución (PNG, SVG) en todos los colores",
          fileSize: "2.4 MB",
        },
        {
          icon: <Palette className="w-6 h-6" />,
          title: "Guía de Marca",
          description: "Paleta de colores, tipografía y reglas de uso",
          fileSize: "850 KB",
        },
        {
          icon: <ImageIcon className="w-6 h-6" />,
          title: "Fotos del Estudio",
          description: "Fotos profesionales de nuestro trabajo y espacio",
          fileSize: "12.5 MB",
        },
        {
          icon: <FileText className="w-6 h-6" />,
          title: "Hoja Informativa",
          description: "Sobre IVA, servicios, precios e información de contacto",
          fileSize: "245 KB",
        },
      ],
      benefits: [
        "🎁 Servicios gratuitos por publicaciones destacadas",
        "💰 15% comisión de afiliado en referencias",
        "✨ Acceso anticipado a nuevos diseños y colecciones",
        "📸 Fotografía de contenido profesional incluida",
      ],
    },
  };

  const text = t[lang];

  const handleDownloadKit = () => {
    // Redirect to WhatsApp to request press kit
    const message = lang === "en"
      ? "Hi! I'm interested in the Press Kit for content creation and potential collaboration. Could you send me the materials?"
      : "¡Hola! Estoy interesada en el Kit de Prensa para creación de contenido y posible colaboración. ¿Podrías enviarme los materiales?";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#4A0404]/5 via-white to-[#D4AF37]/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#4A0404] text-xs sm:text-sm mb-4">
            <Share2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-medium tracking-wider uppercase">{text.forInfluencers}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3 tracking-tight">
            {text.title}
          </h2>

          <p className="text-[#4A0404]/60 text-base sm:text-lg max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Assets List */}
          <div>
            <h3 className="font-medium text-xl text-[#4A0404] mb-6">{text.assets}</h3>
            <div className="space-y-4">
              {text.items.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-5 border border-[#4A0404]/10 hover:border-[#D4AF37]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#4A0404]/5 flex items-center justify-center text-[#4A0404] group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37] transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#4A0404] mb-1">{item.title}</h4>
                      <p className="text-sm text-[#4A0404]/60 mb-2">{item.description}</p>
                      <span className="text-xs text-[#4A0404]/40">{item.fileSize}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownloadKit}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-[#4A0404] to-[#D4AF37] text-white font-medium hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              {text.downloadAll}
            </button>
          </div>

          {/* Right: Partnership Benefits */}
          <div>
            <h3 className="font-medium text-xl text-[#4A0404] mb-6">{text.partnership}</h3>

            <div className="bg-gradient-to-br from-[#FDF8F6] to-white rounded-2xl p-8 border border-[#D4AF37]/20 mb-6">
              <ul className="space-y-4">
                {text.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#4A0404]/80">
                    <span className="text-xl flex-shrink-0 mt-0.5">✨</span>
                    <span className="text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instagram Highlight */}
            <div className="bg-white rounded-2xl p-6 border border-[#4A0404]/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#4A0404]">@{CONFIG.instagram}</p>
                  <p className="text-xs text-[#4A0404]/50">
                    {lang === "en" ? "Tag us in your content!" : "¡Etiquétanos en tu contenido!"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleDownloadKit}
                className="w-full py-3 rounded-xl border-2 border-[#4A0404]/20 text-[#4A0404] font-medium hover:bg-[#4A0404]/5 transition-all"
              >
                {text.contactUs}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-[#4A0404]/5 to-[#D4AF37]/5 rounded-2xl border border-[#D4AF37]/20">
          <p className="text-[#4A0404]/80 text-sm sm:text-base">
            {lang === "en"
              ? "📧 Media inquiries & collaborations: Contact us via WhatsApp for personalized partnership packages"
              : "📧 Consultas de medios y colaboraciones: Contáctanos por WhatsApp para paquetes personalizados"}
          </p>
        </div>
      </div>
    </section>
  );
}
