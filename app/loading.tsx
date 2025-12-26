import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FDF8F6] flex items-center justify-center">
      <div className="text-center">
        <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto mb-6 animate-pulse" />
        <h2 className="font-serif text-2xl text-[#4A0404] mb-2">
          IVA Nail Art
        </h2>
        <p className="text-[#4A0404]/60 text-sm">Loading beauty...</p>

        {/* Elegant loading bar */}
        <div className="mt-6 w-48 h-1 bg-[#4A0404]/10 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-[#D4AF37] rounded-full animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}
