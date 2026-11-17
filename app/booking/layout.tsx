import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Booking",
  robots: { index: false, follow: false },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#121212] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
