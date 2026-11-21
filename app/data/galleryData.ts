// Gallery Data - IVA Nail Art Portfolio (Editorial Curation)
// ==========================================

export type GalleryCategory = "all" | "nails" | "minimalist" | "chrome" | "3dart" | "french" | "bridal";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  altEs?: string;
  category: GalleryCategory;
  styleTag?: string;
  featured?: boolean;
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string; labelEs: string }[] = [
  { id: "all", label: "All Works", labelEs: "Colección Completa" },
  { id: "french", label: "Editorial French", labelEs: "Francés Editorial" },
  { id: "chrome", label: "Glazed & Chrome", labelEs: "Efecto Cromo" },
  { id: "minimalist", label: "Minimalist Chic", labelEs: "Minimalista Chic" },
  { id: "3dart", label: "3D & Texture Art", labelEs: "Arte 3D & Texturas" },
  { id: "bridal", label: "Bridal Sanctuary", labelEs: "Novias & Ceremonia" },
];

// Curated nail art portfolio photos classified by editorial aesthetics
export const GALLERY_IMAGES: GalleryImage[] = [
  // French & Sculpted
  { id: "img-1", src: "/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg", alt: "Editorial Orange Floral Contour Tips", category: "french", styleTag: "Artisan Floral", featured: true },
  { id: "img-2", src: "/gallery/afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg", alt: "High-Gloss Nude Minimalist Nails", category: "minimalist", styleTag: "Clean Girl Aesthetic" },
  { id: "img-3", src: "/gallery/f0d71275-94d3-4325-9592-55cbe28a5bdd.jpg", alt: "Leopard Micro-French Tips", category: "french", styleTag: "Animalier French", featured: true },
  { id: "img-4", src: "/gallery/1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg", alt: "Champagne Glazed Finish", category: "chrome", styleTag: "Glazed Glaze" },
  { id: "img-5", src: "/gallery/2b1d20c5-dd9d-45d5-85eb-da7821a34743.jpg", alt: "Delicate Negative Space Linear Art", category: "minimalist", styleTag: "Negative Space" },
  { id: "img-6", src: "/gallery/14e8d740-b174-48d9-8c87-bddcb007ec72.jpg", alt: "Sculpted 3D Metallic Pearl Drops", category: "3dart", styleTag: "3D Metallic Drops" },
  { id: "img-7", src: "/gallery/810c6eb7-e2e7-49eb-87e4-c6867d09f390.jpg", alt: "Pure Ivory Bridal Almond Finish", category: "bridal", styleTag: "Bridal Ivory" },
  { id: "img-8", src: "/gallery/0252121b-f561-4b19-bf43-11cdd5a1f36a.jpg", alt: "Liquid Gold French Smile Line", category: "french", styleTag: "Molten Gold French" },
  { id: "img-9", src: "/gallery/599ff034-b45d-48af-8a8e-9996f5d98a8b.jpg", alt: "Chrome Aura Glow Nails", category: "chrome", styleTag: "Aura Sunset" },
  { id: "img-10", src: "/gallery/5a9cfad8-1d83-41a9-adbc-5e4b6b5895e1.jpg", alt: "Minimalist Black Onyx Micro Dots", category: "minimalist", styleTag: "Onyx Micro Accent" },
  { id: "img-11", src: "/gallery/c13caa9d-09e1-4178-96d0-354c681ec3fe.jpg", alt: "Crystal Encapsulated Gel Art", category: "3dart", styleTag: "Crystal Droplet" },
  { id: "img-12", src: "/gallery/03d9f11c-1dfb-494d-9195-eb0db1acfb1e.jpg", alt: "Soft Blush Porcelain Manicure", category: "bridal", styleTag: "Soft Porcelain" },
  { id: "img-13", src: "/gallery/b0fdb34e-eb58-428e-b73d-863c0db0a7b0.jpg", alt: "Chrome Silver Mirror Coat", category: "chrome", styleTag: "Platinum Chrome" },
  { id: "img-14", src: "/gallery/2933d45a-7528-4b57-87f3-c547e6000372.jpg", alt: "Tortoiseshell High Fashion Tips", category: "french", styleTag: "Tortoiseshell Accent" },
  { id: "img-15", src: "/gallery/2e0b31b1-9878-4a33-a0a9-6b505f577892.jpg", alt: "Gold Studded Haute French Tips", category: "french", styleTag: "Gold Studded French", featured: true },
  { id: "img-16", src: "/gallery/427a7f8e-1a34-4441-b9ca-fc60cb512ee7.jpg", alt: "Sheer Silk Milky Manicure", category: "bridal", styleTag: "Milky Silk" },
  { id: "img-17", src: "/gallery/f120ff42-6df1-4553-bae9-e6538b0f2b8e.jpg", alt: "3D Sweeping Gel Ribbons", category: "3dart", styleTag: "Sculpted Ribbons" },
  { id: "img-18", src: "/gallery/163146fc-03da-4362-a982-a6c96a454a74.jpg", alt: "Rose Gold Velvet Shimmer", category: "chrome", styleTag: "Velvet Shimmer" },
  { id: "img-19", src: "/gallery/241c7f28-5927-40de-8e0c-0a9c468846f0.jpg", alt: "Clean Cuticle Russian Mani Natural", category: "minimalist", styleTag: "Russian Bare Mani" },
  { id: "img-20", src: "/gallery/d9206f5a-c79f-4487-870d-a7bb5d75cef7.jpg", alt: "Fine Line French with Pearls", category: "bridal", styleTag: "Pearl Micro-French" },
  { id: "img-21", src: "/gallery/c2bba6fb-d001-4658-bda3-2c78d8d59011.jpg", alt: "Bespoke Abstract Line Play", category: "minimalist", styleTag: "Linear Modernism" },
  { id: "img-22", src: "/gallery/cef72ddd-82d3-4959-b58b-cb3992f93726.jpg", alt: "Iridescent Mermaid Chrome", category: "chrome", styleTag: "Opal Chrome" },
  { id: "img-23", src: "/gallery/60e9b7c3-e7a8-4d55-87df-0dd46e8d51fc.jpg", alt: "3D Textured Clear Droplet Art", category: "3dart", styleTag: "Dew Drop Gel" },
  { id: "img-24", src: "/gallery/62b4f397-4390-425a-8773-99fb64e3e9ff.jpg", alt: "Double French Fine Line Curve", category: "french", styleTag: "Double French Arc" },
  { id: "img-25", src: "/gallery/3923d364-f716-4ba2-961d-83f75dedb613.jpg", alt: "Bridal Opal Crystal Sheer", category: "bridal", styleTag: "Bridal Opal" },
  { id: "img-26", src: "/gallery/7f90a13c-e5fa-4911-9798-a038d8e5753e.jpg", alt: "Geometric Minimal Gold Thread", category: "minimalist", styleTag: "Gold Thread Contour" },
  { id: "img-27", src: "/gallery/6c6a7180-39a7-47fe-89b1-50da16a9fce3.jpg", alt: "Glazed Donut Pearl Shine", category: "chrome", styleTag: "Glazed Pearl" },
  { id: "img-28", src: "/gallery/8d58cd0a-8272-4213-9665-3508c177049b.jpg", alt: "Sculpted Shell 3D Gel Texture", category: "3dart", styleTag: "Textured Seashell" },
  { id: "img-29", src: "/gallery/bb5de037-7342-4207-bc0c-2fb9c2380927.jpg", alt: "Artistic Swirl Modernist Design", category: "french", styleTag: "Artistic Wave", featured: true },
  { id: "img-30", src: "/gallery/fde4a8c5-7869-4db5-ba44-f39231c3617c.jpg", alt: "Monochrome Matte & Gloss Minimalist", category: "minimalist", styleTag: "Matte Contrast" },
  { id: "img-31", src: "/gallery/d40636f0-406e-47d5-8340-ad34a9ecccb9.jpg", alt: "Champagne Leaf French Inlay", category: "french", styleTag: "Gold Leaf Inlay" },
  { id: "img-32", src: "/gallery/412fc067-fd88-4fe3-8e6d-02329e3eb099.jpg", alt: "Cosmic Silver Starlight Chrome", category: "chrome", styleTag: "Starlight Silver" },
  { id: "img-33", src: "/gallery/2caeeefc-e9f4-4294-aebb-0fc9c2e9c8c0.jpg", alt: "3D Metallic Heart Sculpt", category: "3dart", styleTag: "Metallic Emblem" },
  { id: "img-34", src: "/gallery/f6a27073-5f54-4bdb-8fe1-736ed181a126.jpg", alt: "Clean Rose Quartz Bridal Hue", category: "bridal", styleTag: "Rose Quartz" },
  { id: "img-35", src: "/gallery/0ee48e92-e11b-42dc-8a05-93c1aac67179.jpg", alt: "Fine Cuticle Perfection Russian Set", category: "minimalist", styleTag: "Flawless Russian" },
  { id: "img-36", src: "/gallery/dd4e844c-9366-44c7-ab95-619f70174965.jpg", alt: "Editorial Cobalt Blue French Edge", category: "french", styleTag: "Cobalt Tip" },
  { id: "img-37", src: "/gallery/bff1062d-a2d4-4432-af01-0853a1a8cc82.jpg", alt: "Cat Eye Magnetized Shimmer", category: "chrome", styleTag: "Velvet Cat Eye" },
  { id: "img-38", src: "/gallery/4eebe93c-b4c7-4103-9255-9ed65fb67d01.jpg", alt: "Molten Silver Liquid Metal 3D", category: "3dart", styleTag: "Liquid Mercury" },
  { id: "img-39", src: "/gallery/5ab8ff73-fcb2-421d-b6bf-8169824f1a52.jpg", alt: "French Ombre Baby Boomer", category: "bridal", styleTag: "Baby Boomer Fade" },
  { id: "img-40", src: "/gallery/fbec4b74-7503-47de-9cd8-d78bc318cc18.jpg", alt: "Minimalist Nude with Solitary Crystal", category: "minimalist", styleTag: "Solitary Solitaire" },
];

export const getFeaturedImages = () => GALLERY_IMAGES.filter(img => img.featured).slice(0, 4);

export const getImagesByCategory = (category: GalleryCategory) =>
  category === "all" || category === "nails"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === category);
