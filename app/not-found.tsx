import Link from "next/link";
import { Sparkles, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDF8F6] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Sparkles className="w-24 h-24 text-[#D4AF37] mx-auto mb-6 animate-pulse" />
          <h1 className="font-serif text-6xl text-[#4A0404] mb-4">404</h1>
          <h2 className="font-serif text-2xl text-[#4A0404] mb-4">
            Page Not Found
          </h2>
          <p className="text-[#4A0404]/60 mb-8">
            Oops! This page doesn't exist. Let's get you back to our beautiful nail art gallery.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#4A0404] text-white px-8 py-4 rounded-full font-medium hover:bg-[#4A0404]/90 transition-all shadow-lg hover:shadow-xl"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="mt-12 text-sm text-[#4A0404]/40">
          <p>IVA Nail Art - Brooklyn, NY</p>
        </div>
      </div>
    </div>
  );
}
