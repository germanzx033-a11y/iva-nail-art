import { SITE_URL, BUSINESS } from "@/lib/site";

export default function LocalSeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["NailSalon", "BeautySalon"],
        "@id": `${SITE_URL}/#nailsalon`,
        "name": BUSINESS.name,
        "alternateName": "IVA Nail Art Brooklyn",
        "description": "Exclusive private nail studio in Bay Ridge, Brooklyn NY 11209. Specializing in luxury Russian dry manicures, structured builder gel overlays (BIAB), Gel-X extensions, and bespoke editorial nail art. By appointment only.",
        "url": `${SITE_URL}/`,
        "telephone": "+1-929-625-7273",
        "priceRange": "$$",
        "image": `${SITE_URL}/og-image.jpg`,
        "logo": `${SITE_URL}/icon-512.png`,
        "founder": {
          "@type": "Person",
          "name": BUSINESS.artist,
          "jobTitle": "Master Nail Artist & Founder"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Bay Ridge",
          "addressLocality": "Brooklyn",
          "addressRegion": "NY",
          "postalCode": "11209",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 40.6262,
          "longitude": -74.0328
        },
        "areaServed": [
          { "@type": "Place", "name": "Bay Ridge, Brooklyn, NY" },
          { "@type": "Place", "name": "Dyker Heights, Brooklyn, NY" },
          { "@type": "Place", "name": "Bensonhurst, Brooklyn, NY" },
          { "@type": "City", "name": "Brooklyn" },
          { "@type": "City", "name": "New York" }
        ],
        "knowsLanguage": ["Spanish", "English"],
        "paymentAccepted": "Cash, Zelle, Apple Pay, Venmo (Manual $35 deposit holds your slot)",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "17:30",
            "closes": "22:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday", "Sunday"],
            "opens": "10:00",
            "closes": "22:00"
          }
        ],
        "sameAs": [
          "https://instagram.com/iva_nailart_nyc",
          "https://tiktok.com/@iva_nailart_ny"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Bespoke Nail Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Builder Gel Manicure (BIAB)",
                "description": "Multi-layer structured builder gel overlay reinforcing natural nail plate health for 3 to 4 weeks with zero lifting."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Russian Dry Manicure",
                "description": "Precision electronic cuticle clean and Russian dry manicure protocol with pure single-tone or editorial gel finish."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Gel-X Extensions",
                "description": "Full cover soft gel tip extension system sculpted to natural almond, square, or coffin silhouettes."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Bespoke Editorial Nail Art",
                "description": "Hand-painted 3D textures, chrome finishes, velvet cat-eye, micro-French lines, and customized art per nail."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Luxury Spa Pedicure",
                "description": "Deep medical-grade foot care, precision cuticle grooming, gentle exfoliation, and long-lasting gel polish."
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Where is IVA Nail Art located in Brooklyn?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "IVA Nail Art is a private boutique nail studio located in Bay Ridge, Brooklyn, NY 11209. Services are provided one-on-one strictly by appointment."
            }
          },
          {
            "@type": "Question",
            "name": "Do you accept walk-ins?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, IVA Nail Art operates strictly by appointment only to ensure each client receives dedicated time with zero rush, zero waiting lines, and medical-grade sterilization."
            }
          },
          {
            "@type": "Question",
            "name": "How does the $35 deposit work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A $35 deposit holds your dedicated appointment time. Once you schedule via Calendly or message @iva_nailart_nyc on Instagram or WhatsApp (+1 929-625-7273), Iva confirms your quote and provides deposit details."
            }
          },
          {
            "@type": "Question",
            "name": "What is Builder Gel (BIAB) and how long does it last?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Builder Gel is a flexible, highly durable gel that strengthens and protects natural nails, allowing them to grow without breaking. Sets typically last 3 to 4 weeks before needing a refill."
            }
          },
          {
            "@type": "Question",
            "name": "Are consultations available in Spanish and English?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, consultations and all customer care are fully bilingual in both English and Spanish (atención 100% bilingüe)."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
