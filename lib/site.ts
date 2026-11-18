// Single source for the public site address. Set NEXT_PUBLIC_SITE_URL (e.g.
// https://ivanailartny.com) when a custom domain is connected; everything
// that builds absolute URLs (canonical, sitemap, robots, JSON-LD) follows it.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://iva-nail-art.vercel.app").replace(/\/$/, "");

export const BUSINESS = {
  name: "IVA Nail Art NY",
  alternateName: "IVA Nail Art",
  artist: "Ivannia Rodríguez",
  phone: "+1 (929) 625-7273",
  phoneE164: "+19296257273",
  instagramUrl: "https://instagram.com/iva_nailart_nyc",
  tiktokUrl: "https://tiktok.com/@iva_nailart_ny",
  whatsappNumber: "19296257273",
};
