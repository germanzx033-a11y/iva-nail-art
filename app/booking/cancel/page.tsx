"use client";

/**
 * IVA Nail Art - Booking Cancelled Page
 * Silent Luxury Cancellation Experience
 */

import { XCircle, ArrowRight, MessageCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function BookingCancelPage() {
  return (
    <main className="min-h-screen bg-[#121212] flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        {/* Cancel Icon */}
        <div className="mb-8">
          <div className="inline-flex w-20 h-20 bg-white/5 rounded-full items-center justify-center">
            <XCircle className="w-10 h-10 text-white/40" />
          </div>
        </div>

        {/* Message */}
        <div className="glass-card p-8 mb-6">
          <h1 className="font-serif text-2xl text-white mb-3">
            Booking Not Completed
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            No worries! Your appointment was not confirmed and no payment was
            processed. Your selected time slot has been released.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-[#121212] font-medium hover:opacity-90 transition-all gold-glow-hover"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </Link>

          <a
            href={`https://wa.me/13474735036?text=${encodeURIComponent(
              "Hi! I had trouble completing my booking. Can you help me schedule an appointment?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Need Help? Chat with Us
          </a>
        </div>

        {/* Reassurance */}
        <div className="mt-8 p-4 bg-white/5 rounded-xl">
          <p className="text-white/40 text-xs">
            Slots are limited to 2 clients per day.
            <br />
            Book early to secure your preferred time.
          </p>
        </div>
      </div>
    </main>
  );
}
