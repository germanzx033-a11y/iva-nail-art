import Link from "next/link";
import { Sparkles, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0E0706] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Sparkles className="w-24 h-24 text-[#D4A574] mx-auto mb-6" />
          <h1 className="font-display text-6xl text-[#F4EBE1] mb-4">404</h1>
          <h2 className="font-serif italic text-3xl text-[#E8C9A8] mb-4">
            Page Not Found
          </h2>
          <p className="text-[#F4EBE1]/75 mb-8">
            Oops! This page doesn&apos;t exist. Let&apos;s get you back to our beautiful nail art gallery.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 glow-pill"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="mt-12 text-sm text-[#F4EBE1]/60">
          <p className="text-[#F4EBE1]/60">IVA Nail Art - Brooklyn, NY</p>
        </div>
      </div>
    </div>
  );
}
