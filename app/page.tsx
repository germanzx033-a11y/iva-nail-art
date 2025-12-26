"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Instagram,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  X,
  MessageCircle,
  CreditCard,
  Shield,
  Star,
  Menu,
} from "lucide-react";

// Import data and translations
import {
  Service,
  Language,
  CONFIG,
  IMAGES,
  SERVICES,
  TIME_BLOCKS,
  CATEGORIES,
  TRANSLATIONS,
} from "./constants";
import PriceCalculator from "./components/PriceCalculator";
import IVAPromise from "./components/IVAPromise";
import SignatureDesigns from "./components/SignatureDesigns";
import TrustBadges from "./components/TrustBadges";
import BeforeAfter from "./components/BeforeAfter";
import Testimonials from "./components/Testimonials";
import GiftCards from "./components/GiftCards";
import LoyaltyProgram from "./components/LoyaltyProgram";
import BlogSection from "./components/BlogSection";

// =============================================
// LOCAL INTERFACES
// =============================================
interface BookingState {
  step: number;
  service: Service | null;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  acceptedPolicies: boolean;
}

// =============================================
// INITIAL BOOKING STATE
// =============================================
const initialBookingState: BookingState = {
  step: 1,
  service: null,
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  acceptedPolicies: false,
};

// =============================================
// MAIN COMPONENT
// =============================================
export default function Home() {
  // Centralized state
  const [lang, setLang] = useState<Language>("en");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Service["category"]>("manicure");
  const [formData, setFormData] = useState<BookingState>(initialBookingState);
  const [currentYear, setCurrentYear] = useState<number>(2024);

  const t = TRANSLATIONS[lang];

  // Fix hydration error - set current year on client side only
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // =============================================
  // HELPER FUNCTIONS
  // =============================================
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString(lang === "en" ? "en-US" : "es-ES", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const getMinDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const renderPrice = (service: Service): string => {
    return service.priceMax ? `$${service.price}–$${service.priceMax}` : `$${service.price}`;
  };

  const filteredServices = SERVICES.filter((s) => s.category === selectedCategory);

  // =============================================
  // STEP VALIDATION
  // =============================================
  const canProceed = (): boolean => {
    switch (formData.step) {
      case 1:
        return formData.service !== null;
      case 2:
        return formData.date !== "" && formData.time !== "";
      case 3:
        return formData.name.trim() !== "" && formData.phone.trim() !== "" && formData.acceptedPolicies;
      default:
        return true;
    }
  };

  // =============================================
  // NAVIGATION
  // =============================================
  const nextStep = () => {
    if (canProceed() && formData.step < 4) {
      setFormData((prev) => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    if (formData.step > 1) {
      setFormData((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const openBooking = (service?: Service) => {
    setFormData({
      ...initialBookingState,
      service: service || null,
    });
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setFormData(initialBookingState);
  };

  // =============================================
  // WHATSAPP
  // =============================================
  const sendToWhatsApp = () => {
    const serviceName = lang === "en" ? formData.service?.name : formData.service?.nameEs;
    const priceText = formData.service?.priceMax
      ? `$${formData.service.price} - $${formData.service.priceMax}`
      : `$${formData.service?.price}`;

    // Find the selected time block
    const selectedBlock = TIME_BLOCKS.find(block => block.time === formData.time);
    const timeBlockInfo = selectedBlock
      ? `${selectedBlock.icon} ${lang === "en" ? selectedBlock.label : selectedBlock.labelEs}`
      : formData.time;

    const messageLines = [
      "✨ *New Appointment Request* ✨",
      "",
      `👤 *Name:* ${formData.name}`,
      `📱 *Phone:* ${formData.phone}`,
      formData.email ? `📧 *Email:* ${formData.email}` : "",
      "",
      `💅 *Service:* ${serviceName}`,
      `💰 *Price:* ${priceText}`,
      `📅 *Date:* ${formatDate(formData.date)}`,
      `🕐 *Time Block:* ${timeBlockInfo}`,
      CONFIG.maternityMode ? `⏱️ *Duration:* ${CONFIG.appointmentDuration}-hour block` : "",
      "",
      `I understand a $${CONFIG.deposit} deposit is required.`,
      "Please confirm availability! 💕",
    ].filter(Boolean);

    const message = messageLines.join("\n");
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    closeBooking();
  };

  // =============================================
  // RENDER BOOKING STEPS
  // =============================================
  const renderBookingStep = () => {
    switch (formData.step) {
      // STEP 1: Select Service
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#4A0404]">{t.booking.step1}</h3>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedCategory === cat.key
                      ? "bg-[#4A0404] text-white"
                      : "bg-[#4A0404]/5 text-[#4A0404]/70 hover:bg-[#4A0404]/10"
                  }`}
                >
                  {cat.icon} {lang === "en" ? cat.en : cat.es}
                </button>
              ))}
            </div>

            {/* Services List */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {filteredServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setFormData((prev) => ({ ...prev, service }))}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                    formData.service?.id === service.id
                      ? "border-[#4A0404] bg-[#4A0404]/5"
                      : "border-transparent bg-white hover:border-[#4A0404]/20"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#4A0404] text-sm">
                          {lang === "en" ? service.name : service.nameEs}
                        </span>
                        {service.popular && (
                          <span className="bg-[#D4AF37] text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star className="w-2.5 h-2.5" fill="currentColor" /> Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#4A0404]/50 mt-0.5">
                        {lang === "en" ? service.description : service.descriptionEs}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-lg text-[#4A0404]">{renderPrice(service)}</p>
                      <p className="text-[10px] text-[#4A0404]/40">{service.duration}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      // STEP 2: Date & Time
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#4A0404]">{t.booking.step2}</h3>

            {/* Date Input */}
            <div>
              <label className="block text-sm text-[#4A0404]/70 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                {t.booking.date}
              </label>
              <input
                type="date"
                min={getMinDate()}
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-[#4A0404]/20 bg-white focus:border-[#4A0404] focus:outline-none focus:ring-2 focus:ring-[#4A0404]/10 text-[#4A0404] transition-all"
              />
            </div>

            {/* Time Blocks - Maternity Mode 🤰 */}
            <div>
              <label className="block text-sm text-[#4A0404]/70 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                {t.booking.time}
              </label>
              {CONFIG.maternityMode && (
                <div className="mb-3 p-3 bg-pink-50 border border-pink-200 rounded-lg">
                  <p className="text-xs text-pink-800 flex items-center gap-2">
                    <span>🤰</span>
                    <span>
                      {lang === "en"
                        ? "Appointments are 4-hour blocks to ensure rest time"
                        : "Las citas son bloques de 4 horas para asegurar tiempo de descanso"}
                    </span>
                  </p>
                </div>
              )}
              <div className="space-y-3">
                {TIME_BLOCKS.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => setFormData((prev) => ({ ...prev, time: block.time }))}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                      formData.time === block.time
                        ? "border-[#4A0404] bg-[#4A0404]/5 shadow-md"
                        : "border-[#4A0404]/10 bg-white hover:border-[#4A0404]/30 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{block.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-[#4A0404]">
                          {lang === "en" ? block.label : block.labelEs}
                        </div>
                        <div className="text-xs text-[#4A0404]/50 mt-0.5">
                          {lang === "en" ? "4-hour appointment block" : "Bloque de 4 horas"}
                        </div>
                      </div>
                      {formData.time === block.time && (
                        <Check className="w-5 h-5 text-[#4A0404]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      // STEP 3: Details & Policies
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#4A0404]">{t.booking.step3}</h3>

            {/* Name */}
            <div>
              <label className="block text-sm text-[#4A0404]/70 mb-2">{t.booking.name} *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder={t.booking.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-[#4A0404]/20 bg-white focus:border-[#4A0404] focus:outline-none focus:ring-2 focus:ring-[#4A0404]/10 text-[#4A0404] transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-[#4A0404]/70 mb-2">{t.booking.phone} *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder={t.booking.phonePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-[#4A0404]/20 bg-white focus:border-[#4A0404] focus:outline-none focus:ring-2 focus:ring-[#4A0404]/10 text-[#4A0404] transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-[#4A0404]/70 mb-2">{t.booking.email}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder={t.booking.emailPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-[#4A0404]/20 bg-white focus:border-[#4A0404] focus:outline-none focus:ring-2 focus:ring-[#4A0404]/10 text-[#4A0404] transition-all"
              />
            </div>

            {/* Policies */}
            <div className="bg-[#F7E7CE]/30 p-4 rounded-xl">
              <h4 className="font-medium text-[#4A0404] text-sm mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t.booking.policyTitle}
              </h4>
              <ul className="text-xs text-[#4A0404]/60 space-y-1 mb-4">
                <li>• {t.booking.policyDeposit}</li>
                <li>• {t.booking.policyCancellation}</li>
              </ul>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptedPolicies}
                  onChange={(e) => setFormData((prev) => ({ ...prev, acceptedPolicies: e.target.checked }))}
                  className="mt-0.5 w-5 h-5 rounded border-[#4A0404]/30 text-[#4A0404] focus:ring-[#4A0404] cursor-pointer"
                />
                <span className="text-sm text-[#4A0404]">{t.booking.policyAccept} *</span>
              </label>
            </div>
          </div>
        );

      // STEP 4: Summary & Confirm
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F7E7CE]/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-serif text-[#4A0404]">{t.booking.step4}</h3>
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#4A0404]/5">
              <h4 className="font-medium text-[#4A0404] mb-4 text-sm">{t.booking.summary}</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#4A0404]/60">{t.booking.service}</span>
                  <span className="font-medium text-[#4A0404] text-right">
                    {lang === "en" ? formData.service?.name : formData.service?.nameEs}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A0404]/60">{t.booking.dateTime}</span>
                  <span className="font-medium text-[#4A0404] text-right">
                    {formatDate(formData.date)}, {formData.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#4A0404]/60">{t.booking.location}</span>
                  <span className="font-medium text-[#4A0404]">{CONFIG.location}</span>
                </div>
                <hr className="border-[#4A0404]/10" />
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#4A0404]">{t.booking.depositDue}</span>
                  <span className="font-serif text-2xl text-[#4A0404]">${CONFIG.deposit}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-[#4A0404]/5 rounded-xl p-4 flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#4A0404]/60 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#4A0404]/60">
                {lang === "en"
                  ? "You'll receive Zelle payment instructions via WhatsApp after confirming."
                  : "Recibirás instrucciones de pago por Zelle vía WhatsApp después de confirmar."}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // =============================================
  // RENDER
  // =============================================
  return (
    <main className="min-h-screen bg-[#FDF8F6]">
      {/* ==================== HEADER ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F6]/90 backdrop-blur-md border-b border-[#4A0404]/5">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="font-serif text-xl sm:text-2xl text-[#4A0404] tracking-wide">
            IVA <span className="font-light">Nail Art</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm text-[#4A0404]/70 hover:text-[#4A0404] transition-colors">
              {t.nav.services}
            </a>
            <a href="#gallery" className="text-sm text-[#4A0404]/70 hover:text-[#4A0404] transition-colors">
              {t.nav.gallery}
            </a>
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-xs px-3 py-1.5 rounded-full border border-[#4A0404]/20 text-[#4A0404]/70 hover:bg-[#4A0404]/5 transition-colors"
            >
              {t.langSwitch}
            </button>
            <button
              onClick={() => openBooking()}
              className="bg-[#4A0404] text-[#FDF8F6] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#4A0404]/90 transition-colors"
            >
              {t.nav.book}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              className="text-xs px-2 py-1 rounded-full border border-[#4A0404]/20 text-[#4A0404]/70"
            >
              {t.langSwitch}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#4A0404]"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#FDF8F6] border-t border-[#4A0404]/5 px-4 py-4 space-y-3">
            <a
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-[#4A0404]/70 py-2"
            >
              {t.nav.services}
            </a>
            <a
              href="#gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-[#4A0404]/70 py-2"
            >
              {t.nav.gallery}
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBooking();
              }}
              className="w-full bg-[#4A0404] text-[#FDF8F6] py-3 rounded-full text-sm font-medium"
            >
              {t.nav.book}
            </button>
          </div>
        )}
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.hero}
            alt="IVA Nail Art"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#4A0404]/50 via-[#4A0404]/30 to-[#FDF8F6]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 pt-20 max-w-4xl mx-auto">
          <p className="text-[#F7E7CE] text-xs sm:text-sm tracking-[0.3em] mb-4 font-medium uppercase">
            {t.hero.tagline}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 font-light">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openBooking()}
              className="group flex items-center gap-2 bg-white text-[#4A0404] px-8 py-4 rounded-full font-medium hover:bg-[#F7E7CE] transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              {t.hero.cta}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Info Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              {CONFIG.location}
            </span>
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              {CONFIG.hours}
            </span>
          </div>

          {/* Social */}
          <div className="flex justify-center gap-3 mt-8">
            <a
              href={CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm hover:bg-white/20 transition-all"
            >
              <Instagram className="w-4 h-4" />
              @{CONFIG.instagram}
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* ==================== TRUST BADGES ==================== */}
      <TrustBadges lang={lang} />

      {/* ==================== IVA PROMISE ==================== */}
      <IVAPromise lang={lang} />

      {/* ==================== SIGNATURE DESIGNS ==================== */}
      <SignatureDesigns lang={lang} onBookService={() => openBooking()} />

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3">
              {t.services.title}
            </h2>
            <p className="text-[#4A0404]/60 text-sm sm:text-base mb-4">{t.services.subtitle}</p>
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#D4AF37] text-white text-sm font-medium hover:bg-[#D4AF37]/90 transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {lang === "en" ? "Price Calculator" : "Calculadora de Precios"}
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat.key
                    ? "bg-[#4A0404] text-white shadow-lg"
                    : "bg-[#4A0404]/5 text-[#4A0404]/70 hover:bg-[#4A0404]/10"
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {lang === "en" ? cat.en : cat.es}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => openBooking(service)}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#4A0404]/5 cursor-pointer hover:-translate-y-1"
              >
                {service.popular && (
                  <div className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3" fill="currentColor" />
                    Popular
                  </div>
                )}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-[#4A0404] group-hover:text-[#4A0404]/80 transition-colors">
                      {lang === "en" ? service.name : service.nameEs}
                    </h3>
                    <p className="text-sm text-[#4A0404]/50 mt-1">
                      {lang === "en" ? service.description : service.descriptionEs}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-xl text-[#4A0404]">{renderPrice(service)}</p>
                    <p className="text-xs text-[#4A0404]/40">{service.duration}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-[#D4AF37] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.booking.bookNow} <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== GALLERY ==================== */}
      <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#4A0404]/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0404] mb-3">
              {t.gallery.title}
            </h2>
            <p className="text-[#4A0404]/60 text-sm sm:text-base">{t.gallery.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {IMAGES.gallery.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={src}
                  alt={`Nail Art ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0404]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-white text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    View on Instagram
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#4A0404]/70 hover:text-[#4A0404] transition-colors"
            >
              <Instagram className="w-5 h-5" />
              {t.gallery.viewMore} @{CONFIG.instagram}
            </a>
          </div>
        </div>
      </section>

      {/* ==================== BEFORE/AFTER ==================== */}
      <BeforeAfter lang={lang} />

      {/* ==================== TESTIMONIALS ==================== */}
      <Testimonials lang={lang} />

      {/* ==================== GIFT CARDS ==================== */}
      <GiftCards lang={lang} />

      {/* ==================== LOYALTY PROGRAM ==================== */}
      <LoyaltyProgram lang={lang} />

      {/* ==================== BLOG SECTION ==================== */}
      <BlogSection lang={lang} />

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#4A0404] text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-2xl mb-4">IVA Nail Art</h3>
              <p className="text-white/60 text-sm">{t.footer.tagline}</p>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                {t.footer.hours}
              </h4>
              <p className="text-white/60 text-sm">{CONFIG.hours}</p>
              <p className="text-[#F7E7CE] text-sm mt-1">{t.footer.byAppointment}</p>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                {t.footer.location}
              </h4>
              <p className="text-white/60 text-sm">{CONFIG.location}</p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                {t.footer.contact}
              </h4>
              <p className="text-white/60 text-sm">{CONFIG.phone}</p>
              <div className="flex gap-4 mt-4">
                <a
                  href={CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/40 text-xs sm:text-sm">
            © {currentYear} IVA Nail Art. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ==================== FLOATING WHATSAPP ==================== */}
      <a
        href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
          lang === "en" ? "Hi! I'd like to book an appointment 💅" : "¡Hola! Me gustaría reservar una cita 💅"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#4A0404] text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {t.chat}
        </span>
      </a>

      {/* ==================== BOOKING MODAL ==================== */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#4A0404]/50 backdrop-blur-sm"
            onClick={closeBooking}
          />

          {/* Modal */}
          <div className="relative bg-[#FDF8F6] w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-hidden shadow-2xl animate-slide-up sm:animate-fade-in">
            {/* Header */}
            <div className="sticky top-0 bg-[#FDF8F6] z-10 px-6 py-4 border-b border-[#4A0404]/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-[#4A0404]">{t.booking.title}</h2>
                <button
                  onClick={closeBooking}
                  className="p-2 hover:bg-[#4A0404]/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[#4A0404]/60" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        formData.step >= step
                          ? "bg-[#4A0404] text-white"
                          : "bg-[#4A0404]/10 text-[#4A0404]/40"
                      }`}
                    >
                      {formData.step > step ? <Check className="w-4 h-4" /> : step}
                    </div>
                    {step < 4 && (
                      <div
                        className={`w-8 sm:w-12 h-0.5 mx-1 transition-all duration-300 ${
                          formData.step > step ? "bg-[#4A0404]" : "bg-[#4A0404]/10"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[55vh] px-6 py-6">
              {renderBookingStep()}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#FDF8F6] border-t border-[#4A0404]/10 px-6 py-4">
              <div className="flex gap-3">
                {formData.step > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex-1 py-3 rounded-xl border border-[#4A0404]/20 text-[#4A0404] font-medium hover:bg-[#4A0404]/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t.booking.back}
                  </button>
                )}

                {formData.step < 4 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      canProceed()
                        ? "bg-[#4A0404] text-white hover:bg-[#4A0404]/90"
                        : "bg-[#4A0404]/20 text-[#4A0404]/40 cursor-not-allowed"
                    }`}
                  >
                    {t.booking.next}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={sendToWhatsApp}
                    className="flex-1 py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.booking.confirm}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PRICE CALCULATOR ==================== */}
      <PriceCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        lang={lang}
      />
    </main>
  );
}