"use client";

/**
 * IVA Nail Art - Booking Success Page
 * Silent Luxury Confirmation Experience
 */

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Download,
} from "lucide-react";
import Link from "next/link";

interface BookingDetails {
  serviceName: string;
  date: string;
  slot: string;
  customerName: string;
  amount: number;
}

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, fetch booking details from the API
    // For now, show a generic success message
    setLoading(false);
    setBooking({
      serviceName: "Luxury Nail Service",
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      slot: "Morning Glow",
      customerName: "Valued Client",
      amount: 30,
    });
  }, [sessionId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#121212] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#B8960C] rounded-full flex items-center justify-center animate-golden-glow">
              <CheckCircle className="w-12 h-12 text-[#121212]" />
            </div>
          </div>
        </div>

        {/* Confirmation Card */}
        <div className="glass-card p-8 text-center mb-6">
          <h1 className="font-serif text-3xl text-white mb-2">
            Booking Confirmed
          </h1>
          <p className="text-white/60 mb-8">
            Your exclusive appointment is secured
          </p>

          {/* Booking Details */}
          <div className="space-y-4 text-left bg-white/5 rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  Service
                </p>
                <p className="text-white font-medium">
                  {booking?.serviceName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  Date
                </p>
                <p className="text-white font-medium">{booking?.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  Time Block
                </p>
                <p className="text-white font-medium">{booking?.slot}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  Location
                </p>
                <p className="text-white font-medium">Bay Ridge, Brooklyn</p>
              </div>
            </div>
          </div>

          {/* Deposit Paid */}
          <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <p className="text-emerald-400 text-sm">
              Deposit of ${booking?.amount} paid successfully
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/13474735036?text=${encodeURIComponent(
              "Hi! I just confirmed my booking at IVA Nail Art. Looking forward to my appointment!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
          >
            Return Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-white/30 text-xs mt-8">
          A confirmation email has been sent. Please arrive 5 minutes early.
        </p>
      </div>
    </main>
  );
}
