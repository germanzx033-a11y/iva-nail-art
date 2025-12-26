import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

/**
 * IVA Nail Art - Root Layout
 * Silent Luxury / Vogue-Noir Theme
 * Bay Ridge, Brooklyn - Pregnancy-Safe Boutique
 */

// Premium Serif Font for Headlines
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// Premium Sans-Serif for Body
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
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
    "maternity safe nails",
    "organic nail care",
  ],
  authors: [{ name: "IVA Nail Art" }],
  creator: "IVA Nail Art",
  publisher: "IVA Nail Art",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_US",
    url: "https://iva-nail-art.vercel.app",
    siteName: "IVA Nail Art",
    title: "IVA Nail Art | Pregnancy-Safe Luxury Nails in Bay Ridge, Brooklyn",
    description:
      "Brooklyn's premier pregnancy-safe nail art sanctuary. Hospital-grade sterilization, 10-Free polishes, and luxury services. Max 2 clients daily.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IVA Nail Art - Luxury Pregnancy-Safe Nail Sanctuary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IVA Nail Art | Pregnancy-Safe Luxury Nails",
    description:
      "Brooklyn's premier pregnancy-safe nail art sanctuary in Bay Ridge.",
    images: ["/og-image.jpg"],
    creator: "@ivanailart",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Beauty & Personal Care",
};

// =============================================
// JSON-LD STRUCTURED DATA
// =============================================

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["NailSalon", "LocalBusiness", "HealthAndBeautyBusiness"],
      "@id": "https://iva-nail-art.vercel.app/#business",
      name: "IVA Nail Art",
      alternateName: "IVA Nail Art Sanctuary",
      description:
        "Brooklyn's premier pregnancy-safe nail art sanctuary featuring hospital-grade sterilization, 10-Free polishes, HEPA filtration, and luxury services. Limited to 2 clients daily for personalized attention.",
      url: "https://iva-nail-art.vercel.app",
      telephone: "+1-347-473-5036",
      email: "hello@ivanailart.com",
      image: "https://iva-nail-art.vercel.app/og-image.jpg",
      logo: "https://iva-nail-art.vercel.app/logo.png",
      priceRange: "$$$",
      currenciesAccepted: "USD",
      paymentAccepted: ["Cash", "Credit Card", "Zelle", "Venmo"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bay Ridge",
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
      areaServed: {
        "@type": "City",
        name: "Brooklyn",
        sameAs: "https://en.wikipedia.org/wiki/Brooklyn",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "10:00",
          closes: "16:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Nail Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pregnancy-Safe Manicure",
              description:
                "10-Free polish manicure safe for expecting mothers",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              price: "45",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Luxury Gel Extensions",
              description: "Premium gel nail extensions with custom art",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              price: "120",
            },
          },
        ],
      },
      amenityFeature: [
        {
          "@type": "LocationFeatureSpecification",
          name: "HEPA Air Filtration",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Hospital-Grade Sterilization",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Pregnancy-Safe Products",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Private Appointments",
          value: true,
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        ratingCount: "127",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Sarah M.",
          },
          reviewBody:
            "Finally a salon that takes pregnancy safety seriously! The HEPA filtration and non-toxic polishes gave me peace of mind.",
        },
      ],
      sameAs: [
        "https://www.instagram.com/ivanailart",
        "https://www.facebook.com/ivanailart",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://iva-nail-art.vercel.app/#website",
      url: "https://iva-nail-art.vercel.app",
      name: "IVA Nail Art",
      description: "Pregnancy-Safe Luxury Nail Art in Bay Ridge, Brooklyn",
      publisher: {
        "@id": "https://iva-nail-art.vercel.app/#business",
      },
      inLanguage: ["en-US", "es-US"],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://iva-nail-art.vercel.app/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://iva-nail-art.vercel.app",
        },
      ],
    },
  ],
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
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#121212" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-[#121212] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
