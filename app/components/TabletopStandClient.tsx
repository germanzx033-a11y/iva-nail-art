"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Printer,
  Download,
  Sparkles,
  Star,
  Crown,
} from "lucide-react";
import QRCode from "qrcode";
import { SITE_URL } from "@/lib/site";

interface TabletopStandClientProps {
  lang: "en" | "es";
}

export default function TabletopStandClient({ lang }: TabletopStandClientProps) {
  const isEs = lang === "es";
  const [activeCard, setActiveCard] = useState<"dual" | "vip" | "review" | "lookbook">("dual");
  const [standTheme, setStandTheme] = useState<"obsidian" | "clean-white">("obsidian");
  const [standSize, setStandSize] = useState<"4x6" | "5x7" | "tent">("4x6");

  const [vipQr, setVipQr] = useState<string>("");
  const [reviewQr, setReviewQr] = useState<string>("");
  const [lookbookQr, setLookbookQr] = useState<string>("");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const vipUrl = `${SITE_URL}/${isEs ? "es/" : ""}vip-club?source=stand`;
  const reviewUrl = `${SITE_URL}/${isEs ? "es/" : ""}qr-review?source=stand`;
  const lookbookUrl = `${SITE_URL}/${isEs ? "es/" : ""}winter-collection?source=stand`;

  useEffect(() => {
    const isDark = standTheme === "obsidian";
    const qrDarkColor = isDark ? "#0E0706" : "#1A1A1A";
    const qrLightColor = "#FFFFFF";

    // Generate VIP QR
    QRCode.toDataURL(vipUrl, {
      width: 700,
      margin: 1,
      color: { dark: qrDarkColor, light: qrLightColor },
    })
      .then(setVipQr)
      .catch(console.error);

    // Generate Review QR
    QRCode.toDataURL(reviewUrl, {
      width: 700,
      margin: 1,
      color: { dark: qrDarkColor, light: qrLightColor },
    })
      .then(setReviewQr)
      .catch(console.error);

    // Generate Lookbook QR
    QRCode.toDataURL(lookbookUrl, {
      width: 700,
      margin: 1,
      color: { dark: qrDarkColor, light: qrLightColor },
    })
      .then(setLookbookQr)
      .catch(console.error);
  }, [vipUrl, reviewUrl, lookbookUrl, standTheme]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQr = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1A1A1A] print:bg-white print:p-0">
      {/* ================= SCREEN-ONLY CONTROLS ================= */}
      <header className="print:hidden sticky top-0 z-50 bg-[#0E0706] text-[#F4EBE1] border-b border-[#D4A574]/20 px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={isEs ? "/es" : "/"}
              className="relative h-8 w-8 rounded-lg overflow-hidden border border-[#D4A574]/40 p-0.5 bg-[#170c0a] shrink-0"
            >
              <Image src="/logo-iva.png" alt="IVA Nail Art" width={32} height={32} className="object-contain" />
            </Link>
            <div>
              <h1 className="font-display text-sm sm:text-base font-semibold tracking-wider text-[#D4A574] flex items-center gap-2">
                <span>{isEs ? "Expositor QR Imprimible para Mesa" : "Printable Tabletop QR Stand"}</span>
                <span className="text-[10px] bg-[#D4A574]/20 text-[#D4A574] px-2 py-0.5 rounded-full border border-[#D4A574]/30">
                  Bay Ridge Studio
                </span>
              </h1>
              <p className="text-[11px] text-[#F4EBE1]/70">
                {isEs
                  ? "Tarjeta de acrílico para tu mesa de manicura: fidelización VIP y reseñas en Google con 1 escaneo."
                  : "Acrylic table stand for your manicure station: VIP loyalty stamps & Google reviews in 1 tap."}
              </p>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href={isEs ? "/table-display" : "/es/table-display"}
              className="text-xs text-[#F4EBE1]/70 hover:text-[#D4A574] transition-colors border border-[#D4A574]/30 rounded-lg px-2.5 py-1.5"
            >
              {isEs ? "Switch to EN" : "Cambiar a ES"}
            </Link>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B8864E] px-4 py-2 text-xs font-semibold text-[#0E0706] shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isEs ? "Imprimir / Guardar PDF" : "Print / Save PDF"}</span>
            </button>

            <Link
              href="/admin-iva"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs text-[#F4EBE1] transition-all"
            >
              <span>{isEs ? "Volver al Admin" : "Back to Admin"}</span>
            </Link>
          </div>
        </div>

        {/* Customization Ribbon */}
        <div className="max-w-6xl mx-auto mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Card Layout Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#D4A574] font-medium mr-1">{isEs ? "Contenido:" : "Content:"}</span>
            {[
              { id: "dual", label: isEs ? "Doble: VIP + Reseñas" : "Dual: VIP + Reviews" },
              { id: "vip", label: isEs ? "Solo VIP Pass" : "VIP Pass Only" },
              { id: "review", label: isEs ? "Solo Reseñas 5★" : "5★ Reviews Only" },
              { id: "lookbook", label: isEs ? "Lookbook Invierno" : "Winter Lookbook" },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveCard(mode.id as typeof activeCard)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeCard === mode.id
                    ? "bg-[#D4A574] text-[#0E0706] font-semibold"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Theme & Size Selectors */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-[#D4A574] font-medium mr-1">{isEs ? "Tema:" : "Theme:"}</span>
              <button
                onClick={() => setStandTheme("obsidian")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  standTheme === "obsidian"
                    ? "bg-[#D4A574] text-[#0E0706] font-semibold"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                Obsidian Gold
              </button>
              <button
                onClick={() => setStandTheme("clean-white")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  standTheme === "clean-white"
                    ? "bg-white text-[#0E0706] font-semibold"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                Clean White (Ahorro de tinta)
              </button>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-[#D4A574] font-medium mr-1">{isEs ? "Tamaño:" : "Size:"}</span>
              <button
                onClick={() => setStandSize("4x6")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  standSize === "4x6" ? "bg-[#D4A574] text-[#0E0706] font-semibold" : "bg-white/10 text-white/80"
                }`}
              >
                4&quot; x 6&quot; (Estándar)
              </button>
              <button
                onClick={() => setStandSize("5x7")}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  standSize === "5x7" ? "bg-[#D4A574] text-[#0E0706] font-semibold" : "bg-white/10 text-white/80"
                }`}
              >
                5&quot; x 7&quot; (Grande)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= PRINT PREVIEW CONTAINER ================= */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center print:p-0 print:m-0 print:max-w-none">
        {/* Notice for Printing */}
        <div className="print:hidden w-full max-w-xl mb-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {isEs
                ? "💡 Consejo: Al presionar 'Imprimir', selecciona tamaño 4x6 o Carta y activa 'Gráficos de fondo'."
                : "💡 Tip: When clicking 'Print', select 4x6 or Letter size and check 'Background Graphics'."}
            </span>
          </div>
          {downloadSuccess && (
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              {isEs ? "¡QR Descargado!" : "QR Downloaded!"}
            </span>
          )}
        </div>

        {/* The Actual Printable Physical Card */}
        <div
          id="printable-card"
          className={`relative shadow-2xl transition-all duration-300 print:shadow-none print:m-auto ${
            standSize === "4x6"
              ? "w-[380px] min-h-[570px] print:w-[4in] print:h-[6in]"
              : "w-[450px] min-h-[630px] print:w-[5in] print:h-[7in]"
          } ${
            standTheme === "obsidian"
              ? "bg-[#0E0706] text-[#F4EBE1] border-2 border-[#D4A574]/40"
              : "bg-white text-[#1A1A1A] border-2 border-gray-300"
          } rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden print:rounded-none`}
        >
          {/* Subtle Decorative Frame */}
          <div
            className={`absolute inset-2 border rounded-2xl pointer-events-none print:inset-1.5 ${
              standTheme === "obsidian" ? "border-[#D4A574]/25" : "border-gray-200"
            }`}
          />

          {/* Top Branding Header */}
          <div className="relative z-10 text-center space-y-1.5 pt-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div
                className={`h-7 w-7 rounded-lg overflow-hidden border p-0.5 flex items-center justify-center ${
                  standTheme === "obsidian" ? "border-[#D4A574]/50 bg-[#170c0a]" : "border-gray-300 bg-gray-50"
                }`}
              >
                <Image src="/logo-iva.png" alt="IVA Nail Art" width={26} height={26} className="object-contain" />
              </div>
              <span
                className={`font-display text-sm tracking-[0.25em] font-medium uppercase ${
                  standTheme === "obsidian" ? "text-[#D4A574]" : "text-[#722F37]"
                }`}
              >
                IVA NAIL ART NY
              </span>
            </div>

            <p
              className={`text-[10px] tracking-[0.2em] uppercase font-serif ${
                standTheme === "obsidian" ? "text-[#F4EBE1]/60" : "text-gray-500"
              }`}
            >
              {isEs ? "ATELIER PRIVADO · BAY RIDGE, BROOKLYN" : "PRIVATE NAIL SANCTUARY · BROOKLYN"}
            </p>
          </div>

          {/* ================= CONTENT: DUAL CARD ================= */}
          {activeCard === "dual" && (
            <div className="relative z-10 my-auto py-4 space-y-5">
              {/* Top Half: VIP Club */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center gap-3.5 ${
                  standTheme === "obsidian"
                    ? "bg-[#170c0a] border-[#D4A574]/30"
                    : "bg-[#FAF9F7] border-gray-200"
                }`}
              >
                <div className="p-1.5 bg-white rounded-xl shadow-md shrink-0">
                  {vipQr ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={vipQr} alt="VIP Club QR" className="w-24 h-24 object-contain" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-lg" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-amber-500">
                    <Crown className="w-3 h-3" />
                    <span>{isEs ? "SANCTUARY CIRCLE" : "SANCTUARY CIRCLE"}</span>
                  </div>
                  <h3
                    className={`font-serif text-sm font-semibold leading-tight ${
                      standTheme === "obsidian" ? "text-[#F4EBE1]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {isEs ? "Tarjeta Digital VIP de Sellos" : "Digital VIP Loyalty Pass"}
                  </h3>
                  <p
                    className={`text-[11px] leading-snug ${
                      standTheme === "obsidian" ? "text-[#F4EBE1]/70" : "text-gray-600"
                    }`}
                  >
                    {isEs
                      ? "Escanea con tu cámara para acumular tu sello hoy. En tu 6ta visita: ¡manicura de cortesía!"
                      : "Scan to collect today's stamp. 6th visit unlocks a complimentary signature set!"}
                  </p>
                </div>
              </div>

              {/* Bottom Half: 5-Star Reviews */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center gap-3.5 ${
                  standTheme === "obsidian"
                    ? "bg-[#170c0a] border-[#D4A574]/30"
                    : "bg-[#FAF9F7] border-gray-200"
                }`}
              >
                <div className="p-1.5 bg-white rounded-xl shadow-md shrink-0">
                  {reviewQr ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={reviewQr} alt="Google Review QR" className="w-24 h-24 object-contain" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-lg" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-2.5 h-2.5 fill-amber-400" />
                    ))}
                    <span className="text-[10px] font-semibold text-amber-500 ml-0.5">GOOGLE 5★</span>
                  </div>
                  <h3
                    className={`font-serif text-sm font-semibold leading-tight ${
                      standTheme === "obsidian" ? "text-[#F4EBE1]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {isEs ? "¿Amando tus uñas hoy?" : "Loved your nails today?"}
                  </h3>
                  <p
                    className={`text-[11px] leading-snug ${
                      standTheme === "obsidian" ? "text-[#F4EBE1]/70" : "text-gray-600"
                    }`}
                  >
                    {isEs
                      ? "Tu reseña de 5 estrellas apoya a una artista independiente local en Brooklyn."
                      : "Your 5-star review supports an independent woman-owned studio in Brooklyn."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= CONTENT: VIP ONLY ================= */}
          {activeCard === "vip" && (
            <div className="relative z-10 my-auto py-4 text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-semibold uppercase tracking-widest text-amber-400">
                <Crown className="w-3.5 h-3.5" />
                <span>SANCTUARY CIRCLE VIP</span>
              </div>

              <h2
                className={`font-serif text-xl sm:text-2xl font-light ${
                  standTheme === "obsidian" ? "text-[#F4EBE1]" : "text-[#1A1A1A]"
                }`}
              >
                {isEs ? (
                  <>
                    Acumula Sellos &amp; <span className="italic text-[#D4A574]">Gana Recompensas</span>
                  </>
                ) : (
                  <>
                    Collect Stamps &amp; <span className="italic text-[#D4A574]">Unlock Rewards</span>
                  </>
                )}
              </h2>

              {/* Big High-Res QR Code */}
              <div className="p-3 bg-white rounded-2xl shadow-xl inline-block mx-auto border-2 border-[#D4A574]/40">
                {vipQr ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={vipQr} alt="VIP Club QR" className="w-44 h-44 object-contain" />
                ) : (
                  <div className="w-44 h-44 bg-gray-200 animate-pulse rounded-xl" />
                )}
              </div>

              <p
                className={`text-xs max-w-xs mx-auto leading-relaxed ${
                  standTheme === "obsidian" ? "text-[#F4EBE1]/75" : "text-gray-600"
                }`}
              >
                {isEs
                  ? "Apunta la cámara de tu celular para abrir tu pase digital sin instalar ninguna aplicación. En tu 6ta visita: ¡manicura de cortesía!"
                  : "Point your phone camera to unlock your wallet pass instantly. Complete 6 visits to earn a complimentary bespoke set!"}
              </p>

              {/* Referral Incentive Footer */}
              <div
                className={`p-2.5 rounded-xl border text-[11px] font-medium ${
                  standTheme === "obsidian"
                    ? "bg-[#170c0a] border-[#D4A574]/20 text-[#D4A574]"
                    : "bg-gray-50 border-gray-200 text-[#722F37]"
                }`}
              >
                {isEs
                  ? "🎁 Regala $15 a una amiga · Recibe $15 de crédito en tu cuenta"
                  : "🎁 Give $15 to a friend · Get $15 studio credit"}
              </div>
            </div>
          )}

          {/* ================= CONTENT: REVIEW ONLY ================= */}
          {activeCard === "review" && (
            <div className="relative z-10 my-auto py-4 text-center space-y-4">
              <div className="flex items-center justify-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <h2
                className={`font-serif text-xl sm:text-2xl font-light ${
                  standTheme === "obsidian" ? "text-[#F4EBE1]" : "text-[#1A1A1A]"
                }`}
              >
                {isEs ? (
                  <>
                    ¿Te Encantaron tus <span className="italic text-[#D4A574]">Uñas Hoy?</span>
                  </>
                ) : (
                  <>
                    Loved Your <span className="italic text-[#D4A574]">Experience Today?</span>
                  </>
                )}
              </h2>

              <div className="p-3 bg-white rounded-2xl shadow-xl inline-block mx-auto border-2 border-[#D4A574]/40">
                {reviewQr ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={reviewQr} alt="Google Review QR" className="w-44 h-44 object-contain" />
                ) : (
                  <div className="w-44 h-44 bg-gray-200 animate-pulse rounded-xl" />
                )}
              </div>

              <p
                className={`text-xs max-w-xs mx-auto leading-relaxed ${
                  standTheme === "obsidian" ? "text-[#F4EBE1]/75" : "text-gray-600"
                }`}
              >
                {isEs
                  ? "Escanea para dejarnos tu reseña de 5 estrellas en Google. Como atelier independiente, tu recomendación hace toda la diferencia."
                  : "Scan to leave a 5-star review on Google. As an independent artist, your words mean everything to our studio."}
              </p>
            </div>
          )}

          {/* ================= CONTENT: LOOKBOOK ONLY ================= */}
          {activeCard === "lookbook" && (
            <div className="relative z-10 my-auto py-4 text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-[11px] font-semibold uppercase tracking-widest text-sky-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WINTER 2025/2026</span>
              </div>

              <h2
                className={`font-serif text-xl sm:text-2xl font-light ${
                  standTheme === "obsidian" ? "text-[#F4EBE1]" : "text-[#1A1A1A]"
                }`}
              >
                {isEs ? "Explora la Colección de Invierno" : "Browse Winter & Holiday Sets"}
              </h2>

              <div className="p-3 bg-white rounded-2xl shadow-xl inline-block mx-auto border-2 border-[#D4A574]/40">
                {lookbookQr ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={lookbookQr} alt="Lookbook QR" className="w-44 h-44 object-contain" />
                ) : (
                  <div className="w-44 h-44 bg-gray-200 animate-pulse rounded-xl" />
                )}
              </div>

              <p
                className={`text-xs max-w-xs mx-auto leading-relaxed ${
                  standTheme === "obsidian" ? "text-[#F4EBE1]/75" : "text-gray-600"
                }`}
              >
                {isEs
                  ? "Escanea con tu teléfono mientras nosotras preparamos tus uñas para elegir tu tono velvet, cromo 3D o diseño de fin de año."
                  : "Scan to browse our 6 editorial holiday looks while we prep your nails for your custom set."}
              </p>
            </div>
          )}

          {/* Bottom Card Footer */}
          <div
            className={`relative z-10 pt-3 border-t text-center space-y-1 ${
              standTheme === "obsidian" ? "border-[#D4A574]/20" : "border-gray-200"
            }`}
          >
            <p
              className={`text-[11px] font-medium tracking-wider ${
                standTheme === "obsidian" ? "text-[#D4A574]" : "text-[#722F37]"
              }`}
            >
              Instagram: @iva_nailart_nyc · WhatsApp: +1 (929) 625-7273
            </p>
            <p
              className={`text-[9px] uppercase tracking-widest ${
                standTheme === "obsidian" ? "text-[#F4EBE1]/40" : "text-gray-400"
              }`}
            >
              ivanailartny.com · Bay Ridge, Brooklyn NY
            </p>
          </div>
        </div>

        {/* Download Standalone QRs Bar (Screen only) */}
        <div className="print:hidden mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => handleDownloadQr(vipQr, "iva-vip-club-qr.png")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs text-gray-700 hover:text-black hover:border-black shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-amber-600" />
            <span>{isEs ? "Descargar QR VIP (PNG)" : "Download VIP QR (PNG)"}</span>
          </button>

          <button
            onClick={() => handleDownloadQr(reviewQr, "iva-google-review-qr.png")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs text-gray-700 hover:text-black hover:border-black shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-amber-600" />
            <span>{isEs ? "Descargar QR Reseñas (PNG)" : "Download Review QR (PNG)"}</span>
          </button>

          <button
            onClick={() => handleDownloadQr(lookbookQr, "iva-winter-lookbook-qr.png")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs text-gray-700 hover:text-black hover:border-black shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-sky-600" />
            <span>{isEs ? "Descargar QR Lookbook (PNG)" : "Download Lookbook QR (PNG)"}</span>
          </button>
        </div>
      </main>
    </div>
  );
}
