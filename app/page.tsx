"use client";

/**
 * IVA Nail Art - EDITORIAL LUXURY
 * High-End Fashion Magazine Aesthetic
 * With AI-Powered Design & AR Preview
 */

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Check,
  X,
  MessageCircle,
  Shield,
  Leaf,
  Wind,
  Heart,
  Menu,
  ArrowUpRight,
  Camera,
  Sparkles,
  Instagram,
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic imports for heavy components
const AIBubble = dynamic(() => import("./components/AIBubble"), { ssr: false });
const ARNailStudio = dynamic(() => import("./components/ARNailStudio"), { ssr: false });
const FloatingParticles = dynamic(() => import("./components/FloatingParticles"), { ssr: false });
const Testimonials = dynamic(() => import("./components/Testimonials"), { ssr: false });
const LuxuryGallery = dynamic(() => import("./components/LuxuryGallery"), { ssr: false });
const BackToTop = dynamic(() => import("./components/BackToTop"), { ssr: false });
const GoogleReviews = dynamic(() => import("./components/GoogleReviews"), { ssr: false });
const ProductsShop = dynamic(() => import("./components/ProductsShop"), { ssr: false });
import ScrollReveal, { StaggerContainer, StaggerItem } from "./components/ScrollReveal";
import AnimatedCounter from "./components/AnimatedCounter";

// =============================================
// DATA
// =============================================

const SERVICES = [
  {
    id: "classic-mani",
    name: "Classic Manicure",
    price: 35,
    duration: "45 min",
    description: "Nail shaping, cuticle care, hand massage, polish",
  },
  {
    id: "gel-mani",
    name: "Gel Manicure",
    price: 55,
    duration: "60 min",
    description: "Long-lasting gel polish with UV cure",
  },
  {
    id: "luxury-pedi",
    name: "Luxury Pedicure",
    price: 65,
    duration: "75 min",
    description: "Full foot treatment with exfoliation and mask",
  },
  {
    id: "nail-art",
    name: "Custom Nail Art",
    price: 85,
    priceMax: 150,
    duration: "90+ min",
    description: "Handcrafted designs, crystals, 3D art",
    featured: true,
  },
  {
    id: "gel-extensions",
    name: "Gel Extensions",
    price: 120,
    priceMax: 180,
    duration: "2+ hours",
    description: "Full set with sculpted tips",
  },
];

const TIME_SLOTS = [
  { id: "morning", label: "Morning", time: "9:00 AM - 1:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "2:00 PM - 6:00 PM" },
];

const TRUST_ITEMS = [
  { icon: Shield, label: "Hospital-Grade Sterilization" },
  { icon: Leaf, label: "10-Free Polishes" },
  { icon: Wind, label: "HEPA Filtration" },
  { icon: Heart, label: "Pregnancy Safe" },
];

const CONFIG = {
  whatsappNumber: "19296257273",
  instagram: "iva_nailart_ny",
  tiktok: "iva_nailart_ny",
  location: "Bay Ridge, Brooklyn",
  deposit: 30,
};

// =============================================
// TYPES
// =============================================

interface ServiceType {
  id: string;
  name: string;
  price: number;
  priceMax?: number;
  duration: string;
  description: string;
  featured?: boolean;
}

interface BookingState {
  step: number;
  service: ServiceType | null;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
}

const initialBooking: BookingState = {
  step: 1,
  service: null,
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
};

// =============================================
// MAIN COMPONENT
// =============================================

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [booking, setBooking] = useState<BookingState>(initialBooking);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(2024);
  const [showAR, setShowAR] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const openBooking = (service?: ServiceType) => {
    setBooking({ ...initialBooking, service: service || null });
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setBooking(initialBooking);
  };

  const nextStep = () => {
    if (booking.step < 3) {
      setBooking((prev) => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    if (booking.step > 1) {
      setBooking((prev) => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const canProceed = () => {
    switch (booking.step) {
      case 1:
        return booking.service !== null;
      case 2:
        return booking.date !== "" && booking.time !== "";
      case 3:
        return booking.name.trim() !== "" && booking.phone.trim() !== "";
      default:
        return true;
    }
  };

  const sendToWhatsApp = () => {
    const message = `Hi! I'd like to book an appointment.

Service: ${booking.service?.name}
Date: ${formatDate(booking.date)}
Time: ${TIME_SLOTS.find((s) => s.id === booking.time)?.time}
Name: ${booking.name}
Phone: ${booking.phone}

I understand a $${CONFIG.deposit} deposit is required.`;

    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    closeBooking();
  };

  // =============================================
  // RENDER
  // =============================================

  return (
    <main className="min-h-screen bg-[#F9F8F6]">
      {/* ==================== HEADER ==================== */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#F9F8F6] border-b border-[#EBE8E2]/50">
        <nav className="max-w-6xl mx-auto px-6 md:px-8 py-4 md:py-5 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl tracking-tight text-[#1A1A1A] hover:text-[#8C7355] transition-colors">
            IVA
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-xs uppercase tracking-[0.15em] text-[#4A4A4A] hover:text-[#8C7355] transition-colors">
              Services
            </a>
            <a href="#gallery" className="text-xs uppercase tracking-[0.15em] text-[#4A4A4A] hover:text-[#8C7355] transition-colors">
              Gallery
            </a>
            <a href="#shop" className="text-xs uppercase tracking-[0.15em] text-[#4A4A4A] hover:text-[#8C7355] transition-colors">
              Shop
            </a>
            <a href="#about" className="text-xs uppercase tracking-[0.15em] text-[#4A4A4A] hover:text-[#8C7355] transition-colors">
              About
            </a>
            <button onClick={() => openBooking()} className="px-6 py-3 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white text-xs uppercase tracking-[0.15em] hover:from-[#8B3A44] hover:to-[#A04550] transition-all shadow-md hover:shadow-lg">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F9F8F6] border-t border-[#EBE8E2] px-6 py-6 space-y-5">
            <a href="#services" className="block text-sm uppercase tracking-[0.1em] text-[#4A4A4A]" onClick={() => setMobileMenuOpen(false)}>
              Services
            </a>
            <a href="#gallery" className="block text-sm uppercase tracking-[0.1em] text-[#4A4A4A]" onClick={() => setMobileMenuOpen(false)}>
              Gallery
            </a>
            <a href="#shop" className="block text-sm uppercase tracking-[0.1em] text-[#4A4A4A]" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </a>
            <a href="#about" className="block text-sm uppercase tracking-[0.1em] text-[#4A4A4A]" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBooking();
              }}
              className="w-full py-3 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white text-sm uppercase tracking-[0.1em] shadow-md"
            >
              Book Now
            </button>
          </div>
        )}
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative pt-20 pb-8 md:pt-28 md:pb-16 px-6 md:px-8 overflow-hidden bg-gradient-to-br from-[#FAF9F7] via-[#FDF8F6] to-[#F5EDE8]">
        {/* Floating Sparkles */}
        <FloatingParticles count={25} />

        {/* Decorative Background Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-[#B76E79]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#8C6239]/10 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div className="order-2 md:order-1 animate-fade-in">
              {/* Tagline */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#B76E79]/10 to-[#722F37]/10 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#B76E79] rounded-full animate-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#722F37] font-medium">
                  Pregnancy-Safe Sanctuary
                </span>
              </div>

              {/* Hero Title */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#0D0D0D] leading-[1.05] mb-6 md:mb-8">
                Nail artistry
                <br />
                <span className="bg-gradient-to-r from-[#B76E79] via-[#8C6239] to-[#722F37] bg-clip-text text-transparent">
                  redefined
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-[#3D3D3D] leading-relaxed max-w-lg mb-8 md:mb-10">
                Brooklyn&apos;s premier destination for pregnancy-safe, non-toxic nail care. Limited to two clients daily for an intimate, luxurious experience.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => openBooking()}
                  className="px-8 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white text-xs uppercase tracking-[0.15em] hover:from-[#8B3A44] hover:to-[#A04550] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Book Appointment
                </button>
                <a
                  href="#services"
                  className="px-8 py-4 border-2 border-[#0D0D0D] text-[#0D0D0D] text-xs uppercase tracking-[0.15em] hover:bg-[#0D0D0D] hover:text-white transition-all text-center"
                >
                  View Services
                </a>
              </div>
            </div>

            {/* Hero Images - Collage Style */}
            <div className="order-1 md:order-2 relative">
              <div className="relative">
                {/* Main Image */}
                <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/trabajo1.jpg"
                    alt="IVA Nail Art - Luxury nail design"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating Secondary Image */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src="/trabajo2.jpg"
                    alt="Nail art detail"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 md:top-6 md:-right-6 bg-gradient-to-br from-[#B76E79] to-[#722F37] text-white px-4 py-3 rounded-xl shadow-lg">
                  <p className="text-2xl font-serif font-bold">5★</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-80">Rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TRUST BADGES ==================== */}
      <section className="py-6 md:py-8 bg-gradient-to-r from-[#722F37] via-[#8B3A44] to-[#722F37]">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/90">
                <item.icon className="w-4 h-4 text-[#D4A5A5]" />
                <span className="text-xs md:text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="py-16 md:py-24 px-6 md:px-8 bg-[#FAF9F7]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <ScrollReveal>
            <div className="max-w-xl mb-12 md:mb-16">
              <p className="text-xs uppercase tracking-[0.2em] text-[#B76E79] mb-3 font-medium">Our Services</p>
              <h2 className="font-serif text-3xl md:text-5xl text-[#0D0D0D] mb-4">Luxury Treatments</h2>
              <p className="text-[#3D3D3D]">
                Every service uses 10-free, pregnancy-safe products in a HEPA-filtered environment.
              </p>
            </div>
          </ScrollReveal>

          {/* Services List */}
          <StaggerContainer className="space-y-4">
            {SERVICES.map((service) => (
              <StaggerItem key={service.id}>
                <div
                  onClick={() => openBooking(service)}
                  className="group flex items-center justify-between p-5 md:p-6 cursor-pointer bg-white rounded-xl border border-[#EDE9E3] hover:border-[#B76E79]/30 hover:shadow-lg transition-all"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-serif text-lg md:text-xl text-[#0D0D0D]">{service.name}</h3>
                      {service.featured && (
                        <span className="text-[10px] uppercase tracking-wider text-white bg-gradient-to-r from-[#B76E79] to-[#722F37] px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#6B6B6B] hidden sm:block">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-6 md:gap-8 flex-shrink-0">
                    <div className="text-right">
                      <p className="font-serif text-xl md:text-2xl text-[#722F37]">
                        ${service.price}
                        {service.priceMax && <span className="text-[#B76E79]">+</span>}
                      </p>
                      <p className="text-xs text-[#6B6B6B]">{service.duration}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/20 flex items-center justify-center group-hover:from-[#B76E79] group-hover:to-[#722F37] transition-all">
                      <ChevronRight className="w-5 h-5 text-[#722F37] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="py-16 md:py-24 px-6 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Image */}
            <ScrollReveal animation="fadeLeft" className="order-1 relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/portada.jpg"
                  alt="IVA Nail Art Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[#B76E79]/30 -z-10" />
            </ScrollReveal>

            {/* Content */}
            <ScrollReveal animation="fadeRight" delay={0.2} className="order-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#B76E79] mb-3 font-medium">About Us</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0D0D0D] mb-6 leading-tight">
                A sanctuary for{" "}
                <span className="bg-gradient-to-r from-[#B76E79] to-[#722F37] bg-clip-text text-transparent">
                  expecting mothers
                </span>
              </h2>
              <p className="text-[#3D3D3D] leading-relaxed mb-4">
                IVA Nail Art was created with one mission: to provide a safe, luxurious nail care experience for pregnant women and anyone seeking non-toxic beauty treatments.
              </p>
              <p className="text-[#3D3D3D] leading-relaxed mb-8">
                Our studio features hospital-grade sterilization, HEPA air filtration capturing 99.97% of particles, and exclusively 10-free polishes free from harmful chemicals.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-[#B76E79]/10 to-[#722F37]/10 rounded-xl">
                  <p className="font-serif text-3xl md:text-4xl text-[#722F37]">
                    <AnimatedCounter end={2} duration={1.5} />
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[#6B6B6B] mt-1">Clients daily</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#8C6239]/10 to-[#5C4033]/10 rounded-xl">
                  <p className="font-serif text-3xl md:text-4xl text-[#8C6239]">
                    <AnimatedCounter end={100} duration={2} suffix="%" />
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[#6B6B6B] mt-1">Non-toxic</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#B76E79]/10 to-[#722F37]/10 rounded-xl">
                  <p className="font-serif text-3xl md:text-4xl text-[#722F37]">
                    <AnimatedCounter end={5} duration={1} suffix="★" />
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[#6B6B6B] mt-1">Rated</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <Testimonials />

      {/* ==================== GOOGLE REVIEWS ==================== */}
      <GoogleReviews />

      {/* ==================== GALLERY ==================== */}
      <LuxuryGallery instagramHandle={CONFIG.instagram} />

      {/* ==================== PRODUCTS SHOP ==================== */}
      <ProductsShop />

      {/* ==================== AR NAIL STUDIO SECTION ==================== */}
      <section id="virtual-studio" className="py-16 md:py-24 px-6 md:px-8 bg-gradient-to-br from-[#722F37] via-[#5A252C] to-[#3D1A1E] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B76E79]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8C6239]/20 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Content */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4A5A5] mb-3 font-medium">Technology</p>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">Virtual Try-On</h2>
              <p className="text-white/80 leading-relaxed mb-8">
                Experience the future of nail art. See how different colors look on your own hands using our cutting-edge AR technology before your appointment.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    <Camera className="w-5 h-5 text-[#D4A5A5]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Real-Time Preview</p>
                    <p className="text-sm text-white/60">See colors on your actual hand</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-[#D4A5A5]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">AI Design Generator</p>
                    <p className="text-sm text-white/60">Create custom art with AI</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowAR(true)}
                className="px-8 py-4 bg-white text-[#722F37] text-xs uppercase tracking-[0.15em] hover:bg-[#D4A5A5] transition-colors inline-flex items-center gap-3 rounded-lg font-medium shadow-xl"
              >
                <Camera className="w-4 h-4" />
                Open AR Studio
              </button>
            </div>

            {/* Preview Card */}
            <div className="bg-white/10 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/20">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#B76E79] to-[#722F37] flex items-center justify-center mb-6 shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif mb-4">Try Before You Book</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Use your camera to preview nail colors on your real hand. No downloads required - works directly in your browser.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm">1</span>
                  </div>
                  <span className="text-sm">Allow camera access</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm">2</span>
                  </div>
                  <span className="text-sm">Show your hand to the camera</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm">3</span>
                  </div>
                  <span className="text-sm">Select colors and see them on your nails</span>
                </div>
              </div>
              <button
                onClick={() => setShowAR(true)}
                className="mt-6 w-full py-4 bg-white text-[#722F37] text-sm uppercase tracking-wider font-medium rounded-xl hover:bg-[#D4A5A5] transition-colors"
              >
                Launch AR Studio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative py-12 md:py-16 px-6 md:px-8 bg-[#0A0A0A] text-white overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#722F37] via-[#B76E79] to-[#8C6239]" />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-serif text-3xl mb-3 bg-gradient-to-r from-[#D4A5A5] to-[#B76E79] bg-clip-text text-transparent">IVA</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                Pregnancy-safe nail artistry in Bay Ridge, Brooklyn.
              </p>
              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <a
                  href={`https://instagram.com/${CONFIG.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href={`https://tiktok.com/@${CONFIG.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white/40 mb-3">Hours</h4>
              <p className="text-sm text-white/60">Mon - Sat: By appointment</p>
              <p className="text-sm text-white/60">Sunday: Closed</p>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white/40 mb-3">Location</h4>
              <p className="text-sm text-white/60">{CONFIG.location}</p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-white/40 mb-3">Follow Us</h4>
              <div className="space-y-2">
                <a
                  href={`https://instagram.com/${CONFIG.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-[#E1306C] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={`https://tiktok.com/@${CONFIG.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                  TikTok
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-xs text-white/30 tracking-wide">
              &copy; {currentYear} IVA Nail Art. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ==================== AR STUDIO MODAL ==================== */}
      {showAR && (
        <div className="fixed inset-0 z-[100] bg-black">
          <ARNailStudio onClose={() => setShowAR(false)} />
        </div>
      )}

      {/* ==================== AI BUBBLE ==================== */}
      <AIBubble />

      {/* ==================== FLOATING WHATSAPP ==================== */}
      <a
        href={`https://wa.me/${CONFIG.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-[90] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:bg-[#128C7E] hover:scale-110 transition-all shadow-lg group"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ==================== BOOKING MODAL ==================== */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeBooking} />

          <div className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-hidden md:mx-4 md:rounded-lg shadow-2xl animate-slide-up">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b border-[#EBE8E2]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-[#1A1A1A]">Book Appointment</h2>
                <button onClick={closeBooking} className="p-2 hover:opacity-70 transition-all duration-500">
                  <X className="w-5 h-5 text-[#7A7A7A]" />
                </button>
              </div>

              {/* Progress */}
              <div className="flex gap-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 h-0.5 ${booking.step >= step ? "bg-[#1A1A1A]" : "bg-[#EBE8E2]"} transition-colors duration-500`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[60vh] px-8 py-8">
              {/* Step 1: Service */}
              {booking.step === 1 && (
                <div className="space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A] mb-6">Select a service</p>
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setBooking((prev) => ({ ...prev, service }))}
                      className={`w-full p-5 text-left border transition-all duration-500 ${
                        booking.service?.id === service.id ? "border-[#1A1A1A]" : "border-[#EBE8E2] hover:border-[#A3A3A3]"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-serif text-lg text-[#1A1A1A]">{service.name}</p>
                          <p className="text-[12px] text-[#7A7A7A] mt-1">{service.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-lg text-[#1A1A1A]">${service.price}{service.priceMax && "+"}</p>
                          <p className="text-[11px] text-[#A3A3A3]">{service.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2: Date & Time */}
              {booking.step === 2 && (
                <div className="space-y-8">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A] mb-4">Select a date</p>
                    <input
                      type="date"
                      min={getMinDate()}
                      value={booking.date}
                      onChange={(e) => setBooking((prev) => ({ ...prev, date: e.target.value }))}
                      className="input-boxed"
                    />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A] mb-4">Select time block</p>
                    <div className="space-y-3">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setBooking((prev) => ({ ...prev, time: slot.id }))}
                          className={`w-full p-5 text-left border transition-all duration-500 ${
                            booking.time === slot.id ? "border-[#1A1A1A]" : "border-[#EBE8E2] hover:border-[#A3A3A3]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-serif text-lg text-[#1A1A1A]">{slot.label}</p>
                              <p className="text-[12px] text-[#7A7A7A]">{slot.time}</p>
                            </div>
                            {booking.time === slot.id && <Check className="w-5 h-5 text-[#1A1A1A]" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Details */}
              {booking.step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A] block mb-3">Name *</label>
                    <input
                      type="text"
                      value={booking.name}
                      onChange={(e) => setBooking((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A] block mb-3">Phone *</label>
                    <input
                      type="tel"
                      value={booking.phone}
                      onChange={(e) => setBooking((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="(000) 000-0000"
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A7A] block mb-3">Email</label>
                    <input
                      type="email"
                      value={booking.email}
                      onChange={(e) => setBooking((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="input"
                    />
                  </div>

                  {/* Summary */}
                  <div className="p-6 bg-[#F9F8F6] mt-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#7A7A7A] mb-4">Summary</p>
                    <div className="space-y-3 text-[14px]">
                      <div className="flex justify-between">
                        <span className="text-[#7A7A7A]">Service</span>
                        <span className="text-[#1A1A1A]">{booking.service?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A7A7A]">Date</span>
                        <span className="text-[#1A1A1A]">{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A7A7A]">Time</span>
                        <span className="text-[#1A1A1A]">{TIME_SLOTS.find((s) => s.id === booking.time)?.label}</span>
                      </div>
                      <div className="pt-3 border-t border-[#EBE8E2] mt-3">
                        <div className="flex justify-between">
                          <span className="text-[#7A7A7A]">Deposit required</span>
                          <span className="text-[#1A1A1A] font-medium">${CONFIG.deposit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-[#EBE8E2] px-8 py-6">
              <div className="flex gap-4">
                {booking.step > 1 && (
                  <button onClick={prevStep} className="btn-editorial flex-1">
                    Back
                  </button>
                )}
                {booking.step < 3 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`btn-editorial-filled flex-1 ${!canProceed() ? "opacity-30 cursor-not-allowed" : ""}`}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={sendToWhatsApp}
                    disabled={!canProceed()}
                    className={`flex-1 py-4 bg-[#25D366] text-white text-[11px] font-medium uppercase tracking-[0.2em] hover:opacity-70 transition-all duration-500 ${
                      !canProceed() ? "opacity-30 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="flex items-center justify-center gap-3">
                      <MessageCircle className="w-4 h-4" />
                      Confirm via WhatsApp
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== BACK TO TOP ==================== */}
      <BackToTop />
    </main>
  );
}
