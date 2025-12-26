import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Premium Serif Font for Headlines - Magazine Style
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// Premium Sans-Serif for Body - Clean & Modern
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iva-nail-art.vercel.app'),
  title: "IVA Nail Art | Luxury Nails in Brooklyn",
  description: "Exclusive nail art studio in Brooklyn, NY. Book your appointment today.",
  keywords: ["nail art", "manicure", "pedicure", "acrylic nails", "gel nails", "Brooklyn", "NY", "nail salon"],
  authors: [{ name: "IVA Nail Art" }],
  openGraph: {
    title: "IVA Nail Art | Luxury Nails in Brooklyn",
    description: "Exclusive nail art studio in Brooklyn, NY. Premium manicures, pedicures, and custom nail art. Book your appointment today!",
    url: "https://iva-nail-art.vercel.app",
    siteName: "IVA Nail Art",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/portada.jpg",
        width: 1200,
        height: 630,
        alt: "IVA Nail Art - Luxury Nail Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IVA Nail Art | Luxury Nails in Brooklyn",
    description: "Exclusive nail art studio in Brooklyn, NY. Book your appointment today!",
    images: ["/portada.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
