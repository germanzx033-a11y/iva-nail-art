export default function LocalSeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["NailSalon", "BeautySalon"],
    "name": "IVA Nail Art NY",
    "alternateName": "Aureate Sole Nail Atelier",
    "description": "Exclusive private nail studio in Brooklyn, NY. Specializing in luxury Russian manicures, structured gel overlays (BIAB), Gel-X extensions, and bespoke editorial nail art. Strictly by appointment (max 3 clients daily).",
    "url": "https://ivanailartny.com",
    "telephone": "+19296257273",
    "priceRange": "$$$",
    "image": "https://ivanailartny.com/og-image.jpg",
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/aureate_sole",
      "https://www.tiktok.com/@aureate_sole"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Luxury Nail Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "The Signature Russian Dry Mani",
            "description": "Medical-grade cuticle clean and Russian dry manicure protocol with luxury single-tone gel finish."
          },
          "price": "110.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aureate Structured Gel (BIAB)",
            "description": "Multi-layer builder gel overlay reinforcing natural nail plate health for 3-4 weeks."
          },
          "price": "130.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Apothecary Full Set Gel-X",
            "description": "Odorless soft gel extension system sculpted to custom high-fashion nail shapes."
          },
          "price": "150.00",
          "priceCurrency": "USD"
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
