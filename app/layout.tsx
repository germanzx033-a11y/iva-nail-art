import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Syncopate } from "next/font/google";
import "./globals.css";
import PWAProvider from "./components/PWAProvider";
import Analytics from "./components/Analytics";
import LocalSeoSchema from "./components/LocalSeoSchema";
import { SITE_URL } from "@/lib/site";

/**
 * IVA Nail Art - LUXURY EDITORIAL
 * Elegant, Sophisticated Design
 * Bay Ridge, Brooklyn - Premium Nail Art Studio
 */

// Inter - Clean Sans-Serif for body (variable font)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Playfair Display - Elegant Serif for headings (variable font)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Syncopate - wide display caps for statement headings
const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
  display: "swap",
});

// =============================================
// METADATA & SEO
// =============================================

const DESCRIPTION =
  "Private nail studio in Bay Ridge, Brooklyn · Estudio privado de uñas. Builder gel, acrylics, gel pedicure & custom nail art. EN/ES.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IVA Nail Art NY | Builder Gel & Nail Art in Bay Ridge, Brooklyn",
    template: "%s | IVA Nail Art NY",
  },
  description: DESCRIPTION,
  keywords: [
    "nail artist Bay Ridge",
    "nail art Brooklyn",
    "private nail studio Brooklyn",
    "gel manicure Brooklyn",
    "structured gel manicure",
    "chrome nails Brooklyn",
    "cat eye nails",
    "3D nail art",
    "11209 nail salon",
  ],
  authors: [{ name: "IVA Nail Art" }],
  creator: "IVA Nail Art",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon-192.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_US"],
    url: SITE_URL,
    siteName: "IVA Nail Art NY",
    title: "IVA Nail Art NY | Boutique Nail Studio in Bay Ridge, Brooklyn",
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IVA Nail Art — hand-painted nail designs in Bay Ridge, Brooklyn" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@iva_nailart_nyc",
    creator: "@iva_nailart_nyc",
    title: "IVA Nail Art NY | Boutique Nail Studio in Bay Ridge, Brooklyn",
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  other: { "geo.region": "US-NY", "geo.placename": "Bay Ridge, Brooklyn" },
  appleWebApp: { capable: true, title: "IVA Nails", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0E0706",
};

// =============================================
// ROOT LAYOUT
// =============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${syncopate.variable}`}>
      <head>
        <LocalSeoSchema />
      </head>
      <body className="antialiased bg-[#0E0706] text-[#F4EBE1]">
        <Analytics />
        <PWAProvider>
          {children}
        </PWAProvider>
      </body>
    </html>
  );
}
