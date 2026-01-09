"use client";

/**
 * IVA Nail Art - Products Shop
 * Products showcase - prices via WhatsApp inquiry
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Leaf,
  Star,
  MessageCircle,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  image: string;
  category: "cuticle-oil" | "hand-cream" | "nail-kit" | "accessories";
  badge?: string;
  badgeEs?: string;
  rating: number;
  reviews: number;
  features: string[];
  featuresEs: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "cuticle-oil-rose",
    name: "Rose Gold Cuticle Oil",
    nameEs: "Aceite de Cutícula Rose Gold",
    description: "Luxurious organic jojoba oil infused with rose hip and vitamin E. Strengthens and nourishes cuticles.",
    descriptionEs: "Lujoso aceite de jojoba orgánico con rosa mosqueta y vitamina E. Fortalece y nutre las cutículas.",
    image: "/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg",
    category: "cuticle-oil",
    badge: "Best Seller",
    badgeEs: "Más Vendido",
    rating: 4.9,
    reviews: 87,
    features: ["10-Free Formula", "Organic Ingredients"],
    featuresEs: ["Fórmula 10-Free", "Ingredientes Orgánicos"],
  },
  {
    id: "hand-cream-luxury",
    name: "Luxury Hand Cream",
    nameEs: "Crema de Manos de Lujo",
    description: "Rich, fast-absorbing cream with shea butter and collagen. Keeps hands soft for 24 hours.",
    descriptionEs: "Crema rica de rápida absorción con manteca de karité y colágeno. Manos suaves por 24 horas.",
    image: "/gallery/afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg",
    category: "hand-cream",
    rating: 4.8,
    reviews: 64,
    features: ["Anti-Aging", "Non-Greasy"],
    featuresEs: ["Anti-Edad", "No Grasoso"],
  },
  {
    id: "nail-kit-home",
    name: "At-Home Nail Care Kit",
    nameEs: "Kit de Cuidado de Uñas",
    description: "Complete kit with file, buffer, cuticle pusher, and our signature cuticle oil. Perfect between appointments.",
    descriptionEs: "Kit completo con lima, pulidor, empujador de cutículas y nuestro aceite signature. Perfecto entre citas.",
    image: "/gallery/f0d71275-94d3-4325-9592-55cbe28a5bdd.jpg",
    category: "nail-kit",
    badge: "New",
    badgeEs: "Nuevo",
    rating: 5.0,
    reviews: 23,
    features: ["Professional Tools", "Travel Case"],
    featuresEs: ["Herramientas Profesionales", "Estuche de Viaje"],
  },
  {
    id: "cuticle-oil-lavender",
    name: "Lavender Dream Cuticle Oil",
    nameEs: "Aceite de Cutícula Lavanda",
    description: "Calming lavender oil blend that promotes nail growth and relaxation. Perfect for bedtime routine.",
    descriptionEs: "Mezcla calmante de lavanda que promueve el crecimiento de uñas y relajación. Perfecto para la noche.",
    image: "/gallery/1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg",
    category: "cuticle-oil",
    rating: 4.7,
    reviews: 45,
    features: ["Promotes Sleep", "Nail Growth"],
    featuresEs: ["Promueve el Sueño", "Crecimiento de Uñas"],
  },
  {
    id: "nail-strengthener",
    name: "Diamond Nail Strengthener",
    nameEs: "Fortalecedor de Uñas Diamond",
    description: "Professional-grade treatment that repairs and strengthens damaged nails. Visible results in 2 weeks.",
    descriptionEs: "Tratamiento profesional que repara y fortalece uñas dañadas. Resultados visibles en 2 semanas.",
    image: "/gallery/810c6eb7-e2e7-49eb-87e4-c6867d09f390.jpg",
    category: "accessories",
    rating: 4.9,
    reviews: 156,
    features: ["Keratin Formula", "Clear Finish"],
    featuresEs: ["Fórmula de Keratina", "Acabado Transparente"],
  },
  {
    id: "gift-set",
    name: "IVA Signature Gift Set",
    nameEs: "Set de Regalo IVA Signature",
    description: "Our most popular products in a beautiful gift box. Includes cuticle oil, hand cream, and nail file.",
    descriptionEs: "Nuestros productos más populares en una hermosa caja de regalo. Incluye aceite, crema y lima.",
    image: "/gallery/599ff034-b45d-48af-8a8e-9996f5d98a8b.jpg",
    category: "nail-kit",
    badge: "Gift Ready",
    badgeEs: "Listo para Regalo",
    rating: 5.0,
    reviews: 34,
    features: ["Gift Wrapped", "Free Shipping"],
    featuresEs: ["Envuelto para Regalo", "Envío Gratis"],
  },
];

const CATEGORIES = {
  en: [
    { id: "all", label: "All Products" },
    { id: "cuticle-oil", label: "Cuticle Oils" },
    { id: "hand-cream", label: "Hand Care" },
    { id: "nail-kit", label: "Kits & Sets" },
    { id: "accessories", label: "Accessories" },
  ],
  es: [
    { id: "all", label: "Todos" },
    { id: "cuticle-oil", label: "Aceites" },
    { id: "hand-cream", label: "Cremas" },
    { id: "nail-kit", label: "Kits" },
    { id: "accessories", label: "Accesorios" },
  ],
};

interface ProductsShopProps {
  lang?: "en" | "es";
}

export default function ProductsShop({ lang = "en" }: ProductsShopProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const isEn = lang === "en";
  const categories = isEn ? CATEGORIES.en : CATEGORIES.es;

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleInquiry = (product: Product) => {
    const productName = isEn ? product.name : product.nameEs;
    const message = isEn
      ? `Hi! I'm interested in the "${productName}". Could you tell me more about it and the price?`
      : `¡Hola! Estoy interesada en "${productName}". ¿Podrías darme más información y el precio?`;

    window.open(
      `https://wa.me/19296257273?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="shop" className="py-16 md:py-24 px-6 md:px-8 bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
            <Leaf className="w-4 h-4 text-[#B76E79]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#B76E79] font-medium">
              {isEn ? "Clean Beauty" : "Belleza Limpia"}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">
            {isEn ? "Shop Our " : "Nuestros "}
            <span className="bg-gradient-to-r from-[#B76E79] to-[#E8B4B8] bg-clip-text text-transparent">
              {isEn ? "Products" : "Productos"}
            </span>
          </h2>
          <p className="text-white max-w-lg mx-auto">
            {isEn
              ? "Professional-grade products to maintain your nails between appointments"
              : "Productos profesionales para mantener tus uñas entre citas"}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white shadow-lg"
                  : "bg-white/10 border border-white/20 text-white hover:border-[#B76E79] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#B76E79]/50 transition-all"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-[#1A1A1A] overflow-hidden">
                  <img
                    src={product.image}
                    alt={isEn ? product.name : product.nameEs}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white text-xs font-medium rounded-full">
                      {isEn ? product.badge : product.badgeEs}
                    </span>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      favorites.has(product.id)
                        ? "bg-[#722F37] text-white"
                        : "bg-black/50 text-white hover:text-white"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.has(product.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white">
                      ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-white mb-1">
                    {isEn ? product.name : product.nameEs}
                  </h3>
                  <p className="text-sm text-white line-clamp-2 mb-3">
                    {isEn ? product.description : product.descriptionEs}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(isEn ? product.features : product.featuresEs).map((feature) => (
                      <span
                        key={feature}
                        className="text-[10px] px-2 py-1 bg-white/10 text-white rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* WhatsApp Inquiry Button */}
                  <button
                    onClick={() => handleInquiry(product)}
                    className="w-full py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {isEn ? "Ask for Price" : "Preguntar Precio"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-white text-sm mb-4">
            {isEn
              ? "Questions about our products? We're here to help!"
              : "¿Preguntas sobre nuestros productos? ¡Estamos aquí para ayudarte!"}
          </p>
          <a
            href="https://wa.me/19296257273"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#B76E79]" />
            {isEn ? "Chat with Iva" : "Chatea con Iva"}
          </a>
        </div>
      </div>
    </section>
  );
}
