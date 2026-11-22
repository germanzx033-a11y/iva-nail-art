# 🔍 Specialist 1: Technical SEO & Structured Data Architecture
**Role:** Technical SEO & Semantic Web Specialist  
**Reports to:** Director of Growth (VP of Growth & Local Acquisition)  
**Status:** Active Execution Dossier  
**Focus Area:** Schema.org JSON-LD, Next.js 16 Metadata, Crawlability & Core Web Vitals  

---

## 1. Specialist Mission
Ensure that **IVA Nail Art NY** maintains the highest technical search standards in the luxury beauty industry. The specialist owns the complete semantic graph on `ivanailartny.com`, guaranteeing that Google, Bing, Apple Maps, and AI answer engines (Search Generative Experience, ChatGPT Search, Perplexity) parse studio attributes with 100% fidelity.

---

## 2. Core Responsibilities

1. **Schema.org Structured Data Architecture:**
   - Maintain the consolidated `@graph` in `app/components/LocalSeoSchema.tsx`.
   - Prevent schema duplication (e.g. eliminating dead/unrendered `jsonLd` declarations in `app/layout.tsx`).
   - Validate dual-type declarations (`["NailSalon", "BeautySalon"]`), geospatial coordinates, opening hours specifications, price range, and offer catalog.
2. **Next.js 16 Metadata & Canonical URLs:**
   - Ensure every page (flagship home, 8 service landing routes, try-on, nail-match) serves absolute canonical URLs (`https://ivanailartny.com/...`).
   - Enforce OpenGraph and Twitter Cards metadata pointing to official handle `@iva_nailart_nyc`.
   - Configure multi-language `hreflang` alternates connecting English and Spanish twin pages.
3. **Core Web Vitals & Rendering Performance:**
   - Maintain LCP (Largest Contentful Paint) < 1.2s via optimized WebP/AVIF images.
   - Maintain CLS (Cumulative Layout Shift) = 0 via aspect-ratio reserving and font-display swap.
   - Maintain INP (Interaction to Next Paint) < 100ms.
4. **Crawl Budget & Indexing Governance:**
   - Manage `app/robots.ts` and `app/sitemap.ts` to ensure all 33 production routes are indexed while administrative routes (`/admin-iva`) and ephemeral checkout endpoints remain `noindex`.

---

## 3. Production Schema.org JSON-LD Graph Specification

The master structured data object rendered in `<head>` via `app/components/LocalSeoSchema.tsx` must adhere to this exact specification:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["NailSalon", "BeautySalon"],
      "@id": "https://ivanailartny.com/#nailsalon",
      "name": "IVA Nail Art NY",
      "alternateName": "IVA Nail Art Brooklyn",
      "description": "Exclusive private nail studio in Bay Ridge, Brooklyn NY 11209. Specializing in luxury Russian dry manicures, structured builder gel overlays (BIAB), Gel-X extensions, and bespoke editorial nail art. By appointment only.",
      "url": "https://ivanailartny.com/",
      "telephone": "+1-929-625-7273",
      "priceRange": "$$",
      "image": "https://ivanailartny.com/og-image.jpg",
      "logo": "https://ivanailartny.com/icon-512.png",
      "founder": {
        "@type": "Person",
        "name": "Ivannia Rodríguez",
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
        "https://tiktok.com/@iva_nailart_nyc"
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
              "name": "Gel-X Extensions Full Set",
              "description": "Full cover soft gel tip extension system cured to natural nail with zero damage and custom shaping."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Sculpted Acrylic Full Set",
              "description": "Precision sculpted acrylic set with balanced apex and durable natural finish."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Luxury Spa Pedicure",
              "description": "Hospital-grade waterless pedicure, callus smoothing, cuticle care, and long-lasting gel polish."
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://ivanailartny.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where is IVA Nail Art located in Brooklyn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "IVA Nail Art is an exclusive private studio in Bay Ridge, Brooklyn, NY 11209. All visits are strictly by appointment only with dedicated 1-on-1 attention."
          }
        },
        {
          "@type": "Question",
          "name": "How does the booking and deposit process work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Appointments are scheduled via our Calendly calendar. A $35 non-refundable deposit is confirmed manually via WhatsApp (+1 929-625-7273) or Instagram DM (@iva_nailart_nyc) via Zelle, Apple Pay, or Venmo to lock in your dedicated slot."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between a Russian Manicure and regular gel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Russian dry manicure uses specialized diamond e-file bits to thoroughly contour the cuticle pocket without water or harsh chemicals. Paired with structured Builder Gel (BIAB), manicures last 3 to 4 weeks with zero chipping, peeling, or lifting."
          }
        },
        {
          "@type": "Question",
          "name": "What are your cancellation and late arrival policies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide a 15-minute grace period. Because we reserve 3-4 hours exclusively for each client, we require at least 24 hours advance notice for any rescheduling or cancellation."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide bilingual consultations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We provide full bilingual client consultations in both English and Spanish (atención 100% bilingüe)."
          }
        }
      ]
    }
  ]
}
```

---

## 4. Verification & Quality Protocols
- **Google Rich Results Test:** Verify that the homepage generates valid Rich Results with zero errors for `NailSalon` and `FAQPage`.
- **Schema.org Validator:** Ensure no syntax warnings or orphaned node IDs.
- **Codebase Linting:** ESLint must pass with zero errors across all components importing structured data.
