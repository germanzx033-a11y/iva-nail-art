import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PWAProvider from "./components/PWAProvider";

/**
 * IVA Nail Art - LUXURY EDITORIAL
 * Elegant, Sophisticated Design
 * Bay Ridge, Brooklyn - Pregnancy-Safe Boutique
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
    default: "IVA Nail Art | Pregnancy-Safe Luxury Nails in Bay Ridge, Brooklyn",
    template: "%s | IVA Nail Art",
  },
  description:
    "Brooklyn's premier pregnancy-safe nail art sanctuary. Hospital-grade sterilization, 10-Free polishes, HEPA filtration, and luxury services in Bay Ridge (11209). Max 2 clients daily.",
  keywords: [
    "pregnancy safe nails",
    "non-toxic nail salon",
    "luxury nail art Brooklyn",
    "Bay Ridge nail salon",
    "pregnancy safe manicure",
    "10-free nail polish",
    "HEPA filtered nail salon",
    "medical grade sterilization",
    "Brooklyn nail artist",
    "11209 nail salon",
  ],
  authors: [{ name: "IVA Nail Art" }],
  creator: "IVA Nail Art",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iva-nail-art.vercel.app",
    siteName: "IVA Nail Art",
    title: "IVA Nail Art | Pregnancy-Safe Luxury Nails",
    description: "Brooklyn's premier pregnancy-safe nail art sanctuary.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IVA Nail Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IVA Nail Art | Pregnancy-Safe Luxury Nails",
    description: "Brooklyn's premier pregnancy-safe nail art sanctuary.",
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
  "@type": ["NailSalon", "LocalBusiness"],
  name: "IVA Nail Art",
  description: "Brooklyn's premier pregnancy-safe nail art sanctuary.",
  url: "https://iva-nail-art.vercel.app",
  telephone: "+1-347-473-5036",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brooklyn",
    addressRegion: "NY",
    postalCode: "11209",
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
