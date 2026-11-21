import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IVA Nail Art — Bay Ridge, Brooklyn",
    short_name: "IVA Nails",
    description: "Private nail art studio in Bay Ridge, Brooklyn. Hand-painted designs by appointment.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E0706",
    theme_color: "#0E0706",
    orientation: "portrait",
    scope: "/",
    lang: "en",
    dir: "ltr",
    categories: ["beauty", "lifestyle"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Services", short_name: "Services", url: "/#services" },
      { name: "Gallery", short_name: "Gallery", url: "/#gallery" },
      { name: "Virtual try-on", short_name: "Try-on", url: "/try-on" },
      { name: "Nail Match quiz", short_name: "Nail Match", url: "/nail-match" },
    ],
  };
}
