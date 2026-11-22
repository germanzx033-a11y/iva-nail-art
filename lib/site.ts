// Single source for the public site address. Set NEXT_PUBLIC_SITE_URL (e.g.
// https://ivanailartny.com) when a custom domain is connected; everything
// that builds absolute URLs (canonical, sitemap, robots, JSON-LD) follows it.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ivanailartny.com").replace(/\/$/, "");

export const BUSINESS = {
  name: "IVA Nail Art NY",
  alternateName: "IVA Nail Art Brooklyn",
  artist: "Ivannia Rodríguez",
  phone: "+1 (929) 625-7273",
  phoneE164: "+19296257273",
  instagram: "iva_nailart_nyc",
  instagramUrl: "https://instagram.com/iva_nailart_nyc",
  instagramDmUrl: "https://ig.me/m/iva_nailart_nyc",
  tiktok: "iva_nailart_nyc",
  tiktokUrl: "https://tiktok.com/@iva_nailart_nyc",
  whatsappNumber: "19296257273",
  whatsappUrl: "https://wa.me/19296257273",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/iva_nailart_nyc",
  deposit: 35,
  googleReviewUrl:
    process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
    "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=IVA+Nail+Art+NY+Bay+Ridge+Brooklyn",
};
