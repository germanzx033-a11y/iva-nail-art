// Gallery Data - IVA Nail Art Portfolio
// ==========================================

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  featured?: boolean;
}

export type GalleryCategory = "all" | "nails";

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string; labelEs: string }[] = [
  { id: "all", label: "All", labelEs: "Todos" },
  { id: "nails", label: "Nail Art", labelEs: "Uñas" },
];

// Gallery images - All nail art portfolio photos
// Featured images are carefully selected for variety (4 unique designs)
export const GALLERY_IMAGES: GalleryImage[] = [
  // Featured 1 - Orange flowers (main hero)
  { id: "img-1", src: "/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg", alt: "Orange Daisy Nail Art", category: "nails", featured: true },
  { id: "img-2", src: "/gallery/afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg", alt: "Nail Art Design", category: "nails" },
  // Featured 2 - Leopard print (position 2)
  { id: "img-3", src: "/gallery/f0d71275-94d3-4325-9592-55cbe28a5bdd.jpg", alt: "Leopard Print French Tips", category: "nails", featured: true },
  { id: "img-4", src: "/gallery/1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-5", src: "/gallery/2b1d20c5-dd9d-45d5-85eb-da7821a34743.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-6", src: "/gallery/14e8d740-b174-48d9-8c87-bddcb007ec72.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-7", src: "/gallery/810c6eb7-e2e7-49eb-87e4-c6867d09f390.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-8", src: "/gallery/0252121b-f561-4b19-bf43-11cdd5a1f36a.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-9", src: "/gallery/599ff034-b45d-48af-8a8e-9996f5d98a8b.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-10", src: "/gallery/5a9cfad8-1d83-41a9-adbc-5e4b6b5895e1.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-11", src: "/gallery/c13caa9d-09e1-4178-96d0-354c681ec3fe.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-12", src: "/gallery/03d9f11c-1dfb-494d-9195-eb0db1acfb1e.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-13", src: "/gallery/b0fdb34e-eb58-428e-b73d-863c0db0a7b0.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-14", src: "/gallery/2933d45a-7528-4b57-87f3-c547e6000372.jpg", alt: "Nail Art Design", category: "nails" },
  // Featured 3 - Gold studded nails (position 3)
  { id: "img-15", src: "/gallery/2e0b31b1-9878-4a33-a0a9-6b505f577892.jpg", alt: "Gold Studded French Tips", category: "nails", featured: true },
  { id: "img-16", src: "/gallery/427a7f8e-1a34-4441-b9ca-fc60cb512ee7.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-17", src: "/gallery/f120ff42-6df1-4553-bae9-e6538b0f2b8e.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-18", src: "/gallery/163146fc-03da-4362-a982-a6c96a454a74.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-19", src: "/gallery/241c7f28-5927-40de-8e0c-0a9c468846f0.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-20", src: "/gallery/d9206f5a-c79f-4487-870d-a7bb5d75cef7.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-21", src: "/gallery/c2bba6fb-d001-4658-bda3-2c78d8d59011.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-22", src: "/gallery/cef72ddd-82d3-4959-b58b-cb3992f93726.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-23", src: "/gallery/60e9b7c3-e7a8-4d55-87df-0dd46e8d51fc.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-24", src: "/gallery/62b4f397-4390-425a-8773-99fb64e3e9ff.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-25", src: "/gallery/3923d364-f716-4ba2-961d-83f75dedb613.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-26", src: "/gallery/7f90a13c-e5fa-4911-9798-a038d8e5753e.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-27", src: "/gallery/6c6a7180-39a7-47fe-89b1-50da16a9fce3.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-28", src: "/gallery/8d58cd0a-8272-4213-9665-3508c177049b.jpg", alt: "Nail Art Design", category: "nails" },
  // Featured 4 - Artistic swirl design (position 4)
  { id: "img-29", src: "/gallery/bb5de037-7342-4207-bc0c-2fb9c2380927.jpg", alt: "Artistic Swirl Nail Design", category: "nails", featured: true },
  { id: "img-30", src: "/gallery/fde4a8c5-7869-4db5-ba44-f39231c3617c.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-31", src: "/gallery/d40636f0-406e-47d5-8340-ad34a9ecccb9.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-32", src: "/gallery/412fc067-fd88-4fe3-8e6d-02329e3eb099.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-33", src: "/gallery/2caeeefc-e9f4-4294-aebb-0fc9c2e9c8c0.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-34", src: "/gallery/f6a27073-5f54-4bdb-8fe1-736ed181a126.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-35", src: "/gallery/0ee48e92-e11b-42dc-8a05-93c1aac67179.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-36", src: "/gallery/dd4e844c-9366-44c7-ab95-619f70174965.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-37", src: "/gallery/bff1062d-a2d4-4432-af01-0853a1a8cc82.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-38", src: "/gallery/4eebe93c-b4c7-4103-9255-9ed65fb67d01.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-39", src: "/gallery/5ab8ff73-fcb2-421d-b6bf-8169824f1a52.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-40", src: "/gallery/fbec4b74-7503-47de-9cd8-d78bc318cc18.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-41", src: "/gallery/a7ace8b2-2380-41a5-baab-f452cf57225e.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-42", src: "/gallery/efb14645-0003-4ee7-909d-7b09a8d4802b.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-43", src: "/gallery/5dd64827-a692-4126-8211-a5997b7224b7.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-44", src: "/gallery/7ae683dd-d5a6-4a94-9343-28ef799651c5.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-45", src: "/gallery/0c7498b5-632d-450e-9a33-debd00035d1c.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-46", src: "/gallery/58c6c5b1-3821-4e0c-81ed-72648a3f5473.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-47", src: "/gallery/e0f92257-2c31-49d7-801b-e3fca8e2ac27.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-48", src: "/gallery/8b71770a-c0ba-421f-9a3d-c5af05218c9a.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-49", src: "/gallery/e1af9e2d-6e85-4a77-82a5-8c3dd24c3f71.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-50", src: "/gallery/607b8b07-341d-4e31-a108-a2e9363a70bd.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-51", src: "/gallery/e27fd2c8-db1d-45e2-ab2d-2200c6b20f78.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-52", src: "/gallery/2acfb6e7-176a-4424-bfb0-dbbcf7773aea.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-53", src: "/gallery/8b480868-c297-4971-9aca-dad488bf03d7.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-54", src: "/gallery/fac8bcfa-2bd4-48c4-8eb1-27493509e9df.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-55", src: "/gallery/4266e1af-8165-469f-8129-d4aba024de57.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-56", src: "/gallery/da2b89a8-2033-40e9-a651-236b4c461695.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-57", src: "/gallery/0f015809-32ce-4b4b-bb24-e046bc76955f.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-58", src: "/gallery/7a363e72-e1b0-455a-b54f-21884daa47b7.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-59", src: "/gallery/3c674045-4b17-4a57-a98a-49b0fa0c30b3.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-60", src: "/gallery/9c9a929a-b39c-4b6d-b5f2-ea72d50732b1.jpg", alt: "Nail Art Design", category: "nails" },
  { id: "img-61", src: "/gallery/3ece88f3-2d38-40d8-beb7-2945ec10ddf9.jpg", alt: "Nail Art Design", category: "nails" },
];

// Get featured images for hero/highlights (exactly 4)
export const getFeaturedImages = () => GALLERY_IMAGES.filter(img => img.featured).slice(0, 4);

// Get images by category
export const getImagesByCategory = (category: GalleryCategory) =>
  category === "all"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === category);
