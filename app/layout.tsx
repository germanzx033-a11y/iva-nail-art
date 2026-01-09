import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PWAProvider from "./components/PWAProvider";

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
  variable: "--font-playfair",
  display: "swap",
});

// =============================================
// METADATA & SEO
// =============================================

export const metadata: Metadata = {
  metadataBase: new URL("https://iva-nail-art.vercel.app"),
  title: {
    default: "IVA Nail Art | Luxury Nail Salon Brooklyn | Premium Nail Art Studio",
    template: "%s | IVA Nail Art - Luxury Nails Brooklyn",
  },
  description:
    "Premier luxury nail art studio in Bay Ridge, Brooklyn. Award-winning artistry, hospital-grade sterilization, HEPA air filtration, and premium 10-Free polishes. Private studio experience. Book your exclusive appointment today.",
  keywords: [
    "luxury nail salon Brooklyn",
    "premium nail art NYC",
    "nail artist Brooklyn",
    "10-free nail salon",
    "HEPA filtered nail studio",
    "hospital-grade nail salon",
    "luxury private nail studio",
    "Bay Ridge nail artist",
    "11209 nail salon",
    "nail art designs",
    "gel manicure Brooklyn",
    "acrylic nails Brooklyn",
    "chrome nails NYC",
    "3D nail art",
  ],
  authors: [{ name: "IVA Nail Art" }],
  creator: "IVA Nail Art",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iva-nail-art.vercel.app",
    siteName: "IVA Nail Art",
    title: "IVA Nail Art | Luxury Nail Art Studio Brooklyn",
    description: "Premier luxury nail art studio in Bay Ridge, Brooklyn. Award-winning artistry, hospital-grade sterilization, and premium 10-Free polishes. Book your exclusive appointment.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IVA Nail Art - Luxury Nail Art Studio Brooklyn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IVA Nail Art | Luxury Nail Salon Brooklyn",
    description: "Premier luxury nail art studio in Bay Ridge. Award-winning artistry. Book your exclusive appointment.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// =============================================
// JSON-LD STRUCTURED DATA
// =============================================

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["NailSalon", "LocalBusiness", "HealthAndBeautyBusiness"],
  name: "IVA Nail Art",
  description: "The Purest Protocol in Brooklyn. Clinical-grade luxury nail sanctuary with hospital-grade sterilization, HEPA air filtration, and 10-Free vegan polishes. Pregnancy-safe, non-toxic nail care. Only 2 private appointments daily.",
  url: "https://iva-nail-art.vercel.app",
  telephone: "+1-929-625-7273",
  priceRange: "$$$",
  slogan: "Safe for Miracles. Essential for You.",
  knowsAbout: ["Pregnancy-safe nail care", "Non-toxic manicure", "10-Free polishes", "HEPA air filtration", "Hospital-grade sterilization"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brooklyn",
    addressRegion: "NY",
    postalCode: "11209",
    streetAddress: "Bay Ridge",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.6195,
    longitude: -74.0304,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "105",
    highPrice: "170",
    priceCurrency: "USD",
    offerCount: "3",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Luxury Health Rituals",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "The Purest Ritual",
          description: "Signature non-toxic manicure with 10-Free breathable polish",
        },
        price: "105",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "The Maternity Sanctuary Protocol",
          description: "Pregnancy-safe luxury treatment with lymphatic drainage",
        },
        price: "155",
        priceCurrency: "USD",
      },
    ],
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#FFFFFF" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-white text-[#111111]`}>
        <PWAProvider>
          {children}
        </PWAProvider>
      </body>
    </html>
  );
}
