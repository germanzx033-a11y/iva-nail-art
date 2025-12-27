"use client";

/**
 * IVA Nail Art - Booking Success Page
 * EDITORIAL LUXURY - Refined Elegance
 */

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface BookingDetails {
  serviceName: string;
  date: string;
  slot: string;
  customerName: string;
  amount: number;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    setBooking({
      serviceName: "Luxury Nail Service",
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      slot: "Morning",
      customerName: "Valued Client",
      amount: 30,
    });
  }, [sessionId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="w-10 h-10 border border-[#EBE8E2] border-t-[#8C7355] rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Success Icon */}
        <div className="text-center mb-10">
          <div className="inline-flex w-20 h-20 bg-[#F1EFE9] items-center justify-center">
            <CheckCircle className="w-10 h-10 text-[#8C7355]" />
          </div>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white p-10 border border-[#EBE8E2] text-center mb-8">
          <h1 className="font-serif text-3xl text-[#1A1A1A] mb-3">
            Booking Confirmed
          </h1>
          <p className="text-[#7A7A7A] text-[14px]">
            Your appointment is secured
          </p>

          {/* Booking Details */}
          <div className="mt-10 space-y-5 text-left bg-[#F9F8F6] p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#F1EFE9] flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#8C7355]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A7A7A]">
                  Date
                </p>
                <p className="text-[#1A1A1A] font-serif">{booking?.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#F1EFE9] flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#8C7355]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A7A7A]">
                  Time
                </p>
                <p className="text-[#1A1A1A] font-serif">{booking?.slot}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#F1EFE9] flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#8C7355]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A7A7A]">
                  Location
                </p>
                <p className="text-[#1A1A1A] font-serif">Bay Ridge, Brooklyn</p>
              </div>
            </div>
          </div>

          {/* Deposit Paid */}
          <div className="mt-6 p-4 bg-[#F1EFE9] border border-[#8C7355]/20">
            <p className="text-[#8C7355] text-[13px]">
              Deposit of ${booking?.amount} paid successfully
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <a
            href={`https://wa.me/13474735036?text=${encodeURIComponent(
              "Hi! I just confirmed my booking at IVA Nail Art. Looking forward to my appointment!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white text-[11px] font-medium uppercase tracking-[0.2em] hover:opacity-70 transition-all duration-500"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>

          <Link
            href="/"
            className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-[#EBE8E2] text-[#7A7A7A] text-[11px] font-medium uppercase tracking-[0.2em] hover:opacity-70 transition-all duration-500"
          >
            Return Home
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-[#A3A3A3] text-[11px] mt-10 tracking-wide">
          A confirmation email has been sent. Please arrive 5 minutes early.
        </p>
      </div>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
          <div className="w-10 h-10 border border-[#EBE8E2] border-t-[#8C7355] rounded-full animate-spin" />
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
