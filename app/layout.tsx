import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Syncopate } from "next/font/google";
import "./globals.css";
import PWAProvider from "./components/PWAProvider";
import Analytics from "./components/Analytics";

/**
 * IVA Nail Art - LUXURY EDITORIAL
 * Elegant, Sophisticated Design
 * Bay Ridge, Brooklyn - Premium Nail Art Studio
 */

// Inter - Clean Sans-Serif for body
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Playfair Display - Elegant Serif for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"], // the brand's italic headlines use the real italic, not a slanted fallback
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

const SITE_URL = "https://iva-nail-art.vercel.app";
const DESCRIPTION =
  "Private nail art studio in Bay Ridge, Brooklyn. Hand-painted designs, gel and structured manicures, chrome, cat eye and 3D art. By appointment only — book by Instagram DM.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IVA Nail Art | Private Nail Art Studio in Bay Ridge, Brooklyn",
    template: "%s | IVA Nail Art",
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
    siteName: "IVA Nail Art",
    title: "IVA Nail Art — Nails as wearable art",
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IVA Nail Art — hand-painted nail designs in Bay Ridge, Brooklyn" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IVA Nail Art — Nails as wearable art",
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  appleWebApp: { capable: true, title: "IVA Nails", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0E0706",
};

// =============================================
// JSON-LD STRUCTURED DATA
// Only facts that appear on the site: no ratings, prices or claims that cannot be verified.
// =============================================

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: "IVA Nail Art",
  description: DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/icon-512.png`,
  telephone: "+1-929-625-7273",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brooklyn",
    addressRegion: "NY",
    postalCode: "11209",
    addressCountry: "US",
  },
  areaServed: "Bay Ridge, Brooklyn, NY",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  sameAs: ["https://instagram.com/iva_nailart_ny", "https://tiktok.com/@iva_nailart_ny"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Nail services",
    itemListElement: [
      "Gel Manicure",
      "Structured Gel Manicure",
      "Builder Gel Manicure",
      "Gel Pedicure",
      "Full Set Acrylic",
      "Chrome / Cat Eye",
      "Hand-painted Nail Art",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
