"use client";

/**
 * IVA Nail Art - Booking Cancelled Page
 * EDITORIAL LUXURY - Refined Elegance
 */

import { X, ArrowRight, MessageCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function BookingCancelPage() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-8">
      <div className="w-full max-w-md text-center">
        {/* Cancel Icon */}
        <div className="mb-10">
          <div className="inline-flex w-20 h-20 bg-[#F1EFE9] items-center justify-center">
            <X className="w-10 h-10 text-[#7A7A7A]" />
          </div>
        </div>

        {/* Message */}
        <div className="bg-white p-10 border border-[#EBE8E2] mb-8">
          <h1 className="font-serif text-3xl text-[#1A1A1A] mb-4">
            Booking Not Completed
          </h1>
          <p className="text-[#7A7A7A] text-[14px] leading-relaxed">
            No worries! Your appointment was not confirmed and no payment was
            processed. Your selected time slot has been released.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#1A1A1A] text-white text-[11px] font-medium uppercase tracking-[0.2em] hover:opacity-70 transition-all duration-500"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Link>

          <a
            href={`https://wa.me/13474735036?text=${encodeURIComponent(
              "Hi! I had trouble completing my booking. Can you help me schedule an appointment?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-[#EBE8E2] text-[#7A7A7A] text-[11px] font-medium uppercase tracking-[0.2em] hover:opacity-70 transition-all duration-500"
          >
            <MessageCircle className="w-4 h-4" />
            Need Help? Chat with Us
          </a>
        </div>

        {/* Reassurance */}
        <div className="mt-10 p-5 bg-white border border-[#EBE8E2]">
          <p className="text-[#7A7A7A] text-[12px] leading-relaxed">
            Slots are limited to 2 clients per day.
            <br />
            Book early to secure your preferred time.
          </p>
        </div>
      </div>
    </main>
  );
}
