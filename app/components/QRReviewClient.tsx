"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Printer,
  Sparkles,
  MessageCircle,
  ExternalLink,
  Calendar,
  Share2,
  Check,
  ShieldCheck,
  Heart,
  ArrowRight,
  Download,
} from "lucide-react";
import QRCode from "qrcode";
import { BUSINESS, SITE_URL } from "@/lib/site";

interface QRReviewClientProps {
  lang: "en" | "es";
}

export default function QRReviewClient({ lang }: QRReviewClientProps) {
  const isSpanish = lang === "es";
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"client" | "tabletop">("client");
  const [standTheme, setStandTheme] = useState<"dark" | "light">("dark");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  const reviewTargetUrl = `${SITE_URL}/${isSpanish ? "es/" : ""}qr-review?source=tabletop`;
  const googleReviewUrl = BUSINESS.googleReviewUrl;

  useEffect(() => {
    // Generate crisp QR code on mount
    QRCode.toDataURL(reviewTargetUrl, {
      width: 600,
      margin: 1,
      color: {
        dark: standTheme === "dark" ? "#0E0706" : "#0E0706",
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error("Error generating QR:", err));
  }, [reviewTargetUrl, standTheme]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(reviewTargetUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Ignore clipboard error
    }
  };

  const t = {
    title: isSpanish ? "Tu Opinión Hace Crecer a IVA" : "Your Review Makes IVA Blossom",
    subtitle: isSpanish
      ? "Cada set se diseña con dedicación individual. Si te encantaron tus uñas, déjanos una reseña de 5 estrellas en Google para ayudar a otras clientas a descubrir nuestro estudio privado en Bay Ridge."
      : "Every set is sculpted with 1-on-1 dedication. If you loved your nails today, leaving a 5-star Google review helps other women find our private sanctuary in Bay Ridge.",
    tabClient: isSpanish ? "Vista para Clientas" : "Client View",
    tabTabletop: isSpanish ? "Soporte de Mesa Imprimible (4x6 / 5x7)" : "Printable Tabletop Stand (4x6 / 5x7)",
    howWasExperience: isSpanish ? "¿Cómo calificarías tu cita de hoy?" : "How would you rate today's experience?",
    rating5: isSpanish ? "¡Experiencia Mágica de 5 Estrellas!" : "Flawless 5-Star Experience!",
    ratingBelow5: isSpanish ? "¿Podemos mejorar algo?" : "Could we improve anything?",
    leaveGoogleReview: isSpanish ? "Dejar Reseña 5 Estrellas en Google" : "Leave 5-Star Review on Google",
    privateFeedbackTitle: isSpanish ? "¿Tienes algún comentario privado para Iva?" : "Have private feedback or suggestions?",
    privateFeedbackDesc: isSpanish
      ? "Si tienes alguna sugerencia sobre tu servicio o cutículas, escríbenos directamente por WhatsApp antes de dejar una reseña pública. ¡Queremos que quedes 100% satisfecha!"
      : "If there is anything you'd like adjusted or have gentle feedback, text Iva directly on WhatsApp. We care deeply that you leave 100% thrilled with your set.",
    whatsappBtn: isSpanish ? "Escribir Privado a Iva por WhatsApp" : "Message Iva Privately on WhatsApp",
    bookNextRefill: isSpanish ? "Agendar Próximo Refill (en 3 a 4 semanas)" : "Schedule Next Refill (in 3–4 weeks)",
    printCard: isSpanish ? "Imprimir Soporte de Mesa (4x6)" : "Print Tabletop Stand (4x6)",
    downloadCard: isSpanish ? "Descargar Tarjeta en Alta Resolución" : "Download High-Res Stand Card",
    themeDark: isSpanish ? "Estilo Obsidiana y Oro" : "Dark Obsidian & Gold",
    themeLight: isSpanish ? "Estilo Marfil Minimalista" : "Crisp Minimalist Ivory",
  };

  const whatsappFeedbackUrl = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
    isSpanish
      ? "Hola Ivannía! Acabo de salir de mi cita y quería comentarte en privado:"
      : "Hi Ivannía! I just finished my appointment and wanted to share some private feedback:"
  )}`;

  return (
    <div className="min-h-screen bg-[#0E0706] text-[#F4EBE1] pb-24">
      {/* Top Banner (Hidden in Print) */}
      <div className="print:hidden border-b border-[#D4A574]/20 bg-[#160c0b]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={isSpanish ? "/es" : "/"}
            className="flex items-center gap-2.5 text-xs text-[#D4A574] hover:text-white transition-colors"
          >
            <div className="relative h-6 w-6 rounded-md overflow-hidden border border-[#D4A574]/40">
              <Image src="/logo-iva.png" alt="IVA" width={24} height={24} className="object-contain" />
            </div>
            <span className="font-display font-medium tracking-wider">IVA NAIL ART NY</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("client")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "client"
                  ? "bg-[#D4A574] text-[#0E0706] font-semibold"
                  : "text-[#F4EBE1]/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {t.tabClient}
            </button>
            <button
              onClick={() => setActiveTab("tabletop")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === "tabletop"
                  ? "bg-[#D4A574] text-[#0E0706] font-semibold"
                  : "text-[#F4EBE1]/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {t.tabTabletop}
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIEW A: CLIENT INTERACTIVE REVIEW VIEW                          */}
      {/* ============================================================== */}
      {activeTab === "client" && (
        <main className="print:hidden max-w-xl mx-auto px-4 pt-10 sm:pt-14">
          <div className="text-center">
            <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-2xl border border-[#D4A574]/40 bg-gradient-to-br from-[#1b0d0c] to-[#0E0706] p-2 shadow-2xl shadow-[#D4A574]/10">
              <Image src="/logo-iva.png" alt="IVA Nail Art" width={80} height={80} className="h-full w-full object-contain" />
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#D4A574]/30 bg-[#D4A574]/10 px-3 py-1 text-xs font-medium text-[#D4A574]">
              <Sparkles className="h-3 w-3" />
              <span>IVA PRIVATE ATELIER · BAY RIDGE</span>
            </div>

            <h1 className="mt-3 font-display text-2xl sm:text-3xl font-light text-[#F4EBE1]">
              {t.title}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-[#F4EBE1]/70 leading-relaxed font-light">
              {t.subtitle}
            </p>
          </div>

          {/* Interactive Star Rating Selector */}
          <section
            aria-label="Rating selector"
            className="mt-8 rounded-2xl border border-[#D4A574]/30 bg-[#160c0b]/90 backdrop-blur-xl p-6 sm:p-8 text-center shadow-2xl"
          >
            <p className="text-xs uppercase tracking-widest text-[#D4A574] font-medium mb-3">
              {t.howWasExperience}
            </p>

            <div className="flex justify-center items-center gap-2 sm:gap-3 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setSelectedRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`${star} star`}
                  className="p-1 transition-transform transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 sm:h-10 sm:w-10 transition-colors ${
                      (hoverRating || selectedRating) >= star
                        ? "fill-[#D4A574] text-[#D4A574] drop-shadow-[0_0_12px_rgba(212,165,116,0.5)]"
                        : "text-[#F4EBE1]/25 hover:text-[#D4A574]/50"
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className="mt-3 text-sm font-medium text-[#F4EBE1]">
              {selectedRating === 5 ? (
                <span className="text-[#D4A574] flex items-center justify-center gap-1.5">
                  <Heart className="h-4 w-4 fill-[#D4A574]" /> {t.rating5}
                </span>
              ) : (
                <span className="text-[#F4EBE1]/80">{t.ratingBelow5}</span>
              )}
            </p>

            {/* Direct Google Review Action */}
            <div className="mt-6">
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#D4A574] via-[#E2BA8E] to-[#B8864E] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-[#0E0706] shadow-xl shadow-[#D4A574]/20 hover:brightness-110 active:scale-[0.99] transition-all"
              >
                <span>{t.leaveGoogleReview}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Direct QR and Share link */}
            <div className="mt-5 flex items-center justify-center gap-4 text-xs text-[#F4EBE1]/60">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 hover:text-[#D4A574] transition-colors"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{copiedLink ? (isSpanish ? "¡Enlace copiado!" : "Link copied!") : (isSpanish ? "Copiar enlace de reseña" : "Copy review link")}</span>
              </button>
            </div>
          </section>

          {/* Private Feedback Box (Gentle detour for constructive suggestions) */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#120a09]/70 p-6">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400 border border-green-500/20">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-medium text-[#F4EBE1]">{t.privateFeedbackTitle}</h2>
                <p className="mt-1 text-xs text-[#F4EBE1]/65 leading-relaxed font-light">
                  {t.privateFeedbackDesc}
                </p>
                <a
                  href={whatsappFeedbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-green-400 hover:text-green-300 transition-colors"
                >
                  <span>{t.whatsappBtn}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </section>

          {/* Refill Scheduler */}
          <section className="mt-6 rounded-2xl border border-[#D4A574]/20 bg-[#170c0a] p-6 text-center">
            <Calendar className="h-6 w-6 text-[#D4A574] mx-auto mb-2" />
            <h2 className="text-sm font-medium text-[#F4EBE1]">{t.bookNextRefill}</h2>
            <p className="mt-1 text-xs text-[#F4EBE1]/60 font-light max-w-sm mx-auto">
              {isSpanish
                ? "El builder gel y el acrílico mantienen su integridad óptima si realizas el mantenimiento a las 3–4 semanas."
                : "Builder gel and acrylic maintain peak nail health and balance with a refill every 3–4 weeks."}
            </p>
            <a
              href={BUSINESS.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#D4A574]/40 bg-[#D4A574]/10 px-5 py-2.5 text-xs font-semibold text-[#D4A574] hover:bg-[#D4A574] hover:text-[#0E0706] transition-all"
            >
              <span>{isSpanish ? "Ver Horarios en Calendly" : "View Calendly Openings"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </section>
        </main>
      )}

      {/* ============================================================== */}
      {/* VIEW B: TABLETOP ACRYLIC STAND CARD (4x6 / 5x7) & PRINT PREVIEW */}
      {/* ============================================================== */}
      <section className={activeTab === "tabletop" ? "block max-w-2xl mx-auto px-4 pt-8" : "hidden print:block"}>
        {/* Controls Bar (hidden in print) */}
        <div className="print:hidden mb-6 flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-[#D4A574]/20 bg-[#170c0a]">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#F4EBE1]/70">{isSpanish ? "Diseño:" : "Card Style:"}</span>
            <button
              onClick={() => setStandTheme("dark")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                standTheme === "dark" ? "bg-[#D4A574] text-[#0E0706] font-semibold" : "bg-white/5 text-[#F4EBE1]/70"
              }`}
            >
              {t.themeDark}
            </button>
            <button
              onClick={() => setStandTheme("light")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                standTheme === "light" ? "bg-[#D4A574] text-[#0E0706] font-semibold" : "bg-white/5 text-[#F4EBE1]/70"
              }`}
            >
              {t.themeLight}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#D4A574] to-[#B8864E] px-4 py-2 text-xs font-semibold text-[#0E0706] hover:brightness-110 shadow-lg shadow-[#D4A574]/20"
            >
              <Printer className="h-4 w-4" />
              <span>{t.printCard}</span>
            </button>
            <a
              href="/print/iva-tabletop-review-card-4x6.png"
              download="iva-tabletop-review-card-4x6.png"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#D4A574]/40 bg-white/5 px-3 py-2 text-xs font-medium text-[#D4A574] hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
              <span>PNG (300 DPI)</span>
            </a>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PHYSICAL STAND CARD CONTAINER                                  */}
        {/* Formatted at exact 4x6 aspect ratio (w-96 min-h-[576px])       */}
        {/* ============================================================== */}
        <div
          id="tabletop-print-card"
          className={`mx-auto w-[360px] sm:w-[384px] h-[576px] p-6 sm:p-7 rounded-2xl relative flex flex-col justify-between text-center select-none shadow-2xl transition-all ${
            standTheme === "dark"
              ? "bg-[#0E0706] text-[#F4EBE1] border-4 border-[#D4A574]/80 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
              : "bg-[#FAF7F2] text-[#0E0706] border-4 border-[#B8864E] shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
          } print:border-4 print:shadow-none print:w-[4in] print:h-[6in] print:m-0`}
        >
          {/* Inner Decorative Framing Ring */}
          <div
            className={`pointer-events-none absolute inset-2.5 rounded-xl border ${
              standTheme === "dark" ? "border-[#D4A574]/30" : "border-[#B8864E]/30"
            }`}
          />

          {/* Card Top: Monogram & Brand Title */}
          <div className="relative pt-2">
            <div className="mx-auto h-14 w-14 overflow-hidden rounded-xl p-1 mb-2">
              <Image src="/logo-iva.png" alt="IVA Nail Art" width={56} height={56} className="h-full w-full object-contain" />
            </div>
            <p
              className={`font-display text-sm tracking-[0.25em] uppercase font-medium ${
                standTheme === "dark" ? "text-[#D4A574]" : "text-[#8C6239]"
              }`}
            >
              IVA NAIL ART NY
            </p>
            <p className="text-[10px] tracking-widest uppercase opacity-60 mt-0.5">
              Bay Ridge · Brooklyn · Private Studio
            </p>
          </div>

          {/* Card Middle: Headline & 5-Star Callout */}
          <div className="relative my-auto">
            <h2
              className={`font-display text-xl sm:text-2xl font-light leading-snug ${
                standTheme === "dark" ? "text-[#F4EBE1]" : "text-[#0E0706]"
              }`}
            >
              {isSpanish ? "¿Te encantaron tus uñas?" : "Loved Your Nails Today?"}
            </h2>

            {/* 5 Shiny Stars */}
            <div className="flex justify-center items-center gap-1.5 mt-2 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 fill-current ${
                    standTheme === "dark" ? "text-[#D4A574]" : "text-[#B8864E]"
                  }`}
                />
              ))}
            </div>

            {/* The QR Code Image */}
            <div
              className={`mx-auto w-36 h-36 p-2 rounded-xl border shadow-lg flex items-center justify-center bg-white ${
                standTheme === "dark" ? "border-[#D4A574]/50" : "border-[#B8864E]/40"
              }`}
            >
              {qrCodeDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrCodeDataUrl}
                  alt="Scan to review IVA Nail Art on Google"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
                  Loading QR...
                </div>
              )}
            </div>

            <p
              className={`text-xs font-medium tracking-wide mt-3 ${
                standTheme === "dark" ? "text-[#D4A574]" : "text-[#8C6239]"
              }`}
            >
              {isSpanish ? "Escanea con tu cámara para calificar en Google" : "Scan with camera to review on Google"}
            </p>
          </div>

          {/* Card Bottom: Instagram and Gratitude */}
          <div className="relative pb-2 border-t border-current/15 pt-2.5">
            <p className="text-[11px] font-semibold tracking-wider">
              @iva_nailart_nyc
            </p>
            <p className="text-[9px] opacity-65 mt-0.5 font-light">
              {isSpanish
                ? "Gracias por apoyar el arte independiente en Brooklyn"
                : "Thank you for supporting an independent artist in Brooklyn"}
            </p>
          </div>
        </div>

        {/* Helpful Tips for Iva (hidden in print) */}
        <div className="print:hidden mt-6 rounded-xl border border-white/10 bg-[#160c0b]/50 p-4 text-xs text-[#F4EBE1]/70 space-y-1.5 font-light">
          <p className="font-medium text-[#D4A574] flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            <span>Instrucciones para Iva:</span>
          </p>
          <p>• <strong>Tamaño estándar:</strong> La tarjeta está calibrada exactamente a formato 4x6 pulgadas (el tamaño clásico de marcos y portafotos acrílicos para mesa en Amazon o Target).</p>
          <p>• <strong>Impresión económica:</strong> Puedes imprimir directamente desde este navegador con &quot;Imprimir Soporte&quot; en papel fotográfico brillante, o descargar el archivo PNG para imprimir en Walgreens o CVS por menos de $0.40.</p>
          <p>• <strong>Código QR inteligente:</strong> El código redirige a la clienta a calificar 5 estrellas en Google y ofrece una vía directa de WhatsApp si desean compartir comentarios en privado.</p>
        </div>
      </section>
    </div>
  );
}
