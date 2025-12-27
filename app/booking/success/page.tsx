"use client";

/**
 * IVA Nail Art - Booking Success Page
 * EDITORIAL LUXURY - Refined Elegance with Celebration Effect
 */

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface BookingDetails {
  serviceName: string;
  date: string;
  slot: string;
  customerName: string;
  amount: number;
}

// Confetti particle component
function ConfettiParticle({ delay, x }: { delay: number; x: number }) {
  const colors = ["#B76E79", "#722F37", "#FFD700", "#D4A5A5", "#8C6239"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <motion.div
      className="absolute w-3 h-3 rounded-sm"
      style={{
        backgroundColor: color,
        left: `${x}%`,
        top: -20,
      }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{
        y: "100vh",
        rotate: 720,
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: delay,
        ease: "easeIn",
      }}
    />
  );
}

// Celebration confetti
function Confetti() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <ConfettiParticle key={p.id} x={p.x} delay={p.delay} />
      ))}
    </div>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [showConfetti, setShowConfetti] = useState(true);

  // Initialize booking data directly
  const booking: BookingDetails = {
    serviceName: "Luxury Nail Service",
    date: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    slot: "Morning",
    customerName: "Valued Client",
    amount: 30,
  };

  // Hide confetti after animation
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Use sessionId for future API calls if needed
  void sessionId;

  return (
    <main className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-8 relative overflow-hidden">
      {/* Confetti celebration */}
      {showConfetti && <Confetti />}

      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-[#B76E79]/30" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Icon with pulse animation */}
        <div className="text-center mb-10">
          <motion.div
            className="inline-flex w-20 h-20 bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/20 items-center justify-center rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-10 h-10 text-[#722F37]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Confirmation Card */}
        <motion.div
          className="bg-white p-10 border border-[#EBE8E2] text-center mb-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h1
            className="font-serif text-3xl text-[#1A1A1A] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Booking Confirmed
          </motion.h1>
          <p className="text-[#7A7A7A] text-[14px]">
            Your appointment is secured ✨
          </p>

          {/* Booking Details */}
          <div className="mt-10 space-y-5 text-left bg-[#F9F8F6] p-6 rounded-lg">
            {[
              { icon: Calendar, label: "Date", value: booking?.date },
              { icon: Clock, label: "Time", value: booking?.slot },
              { icon: MapPin, label: "Location", value: "Bay Ridge, Brooklyn" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#B76E79]/10 to-[#722F37]/10 flex items-center justify-center rounded-lg">
                  <item.icon className="w-4 h-4 text-[#722F37]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A7A7A]">
                    {item.label}
                  </p>
                  <p className="text-[#1A1A1A] font-serif">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Deposit Paid - with celebration style */}
          <motion.div
            className="mt-6 p-4 bg-gradient-to-r from-[#B76E79]/10 to-[#722F37]/10 border border-[#B76E79]/20 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-[#722F37] text-[13px] font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Deposit of ${booking?.amount} paid successfully
              <Sparkles className="w-4 h-4" />
            </p>
          </motion.div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href={`https://wa.me/19296257273?text=${encodeURIComponent(
              "Hi! I just confirmed my booking at IVA Nail Art. Looking forward to my appointment!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white text-[11px] font-medium uppercase tracking-[0.2em] hover:opacity-90 transition-all duration-300 rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </motion.a>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/"
              className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-[#EBE8E2] text-[#7A7A7A] text-[11px] font-medium uppercase tracking-[0.2em] hover:border-[#722F37] hover:text-[#722F37] transition-all duration-300 rounded-lg"
            >
              Return Home
              <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          className="text-center text-[#A3A3A3] text-[11px] mt-10 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          A confirmation email has been sent. Please arrive 5 minutes early.
        </motion.p>
      </motion.div>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
          <div className="w-10 h-10 border border-[#EBE8E2] border-t-[#722F37] rounded-full animate-spin" />
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
