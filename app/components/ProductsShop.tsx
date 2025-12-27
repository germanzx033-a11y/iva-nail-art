"use client";

/**
 * IVA Nail Art - Products Shop
 * E-commerce section for nail care products
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  X,
  Check,
  Sparkles,
  Leaf,
  Star,
  MessageCircle,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "cuticle-oil" | "hand-cream" | "nail-kit" | "accessories";
  badge?: string;
  rating: number;
  reviews: number;
  features: string[];
  inStock: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: "cuticle-oil-rose",
    name: "Rose Gold Cuticle Oil",
    description: "Luxurious organic jojoba oil infused with rose hip and vitamin E. Strengthens and nourishes cuticles.",
    price: 28,
    image: "/products/cuticle-oil.jpg",
    category: "cuticle-oil",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 87,
    features: ["10-Free Formula", "Organic Ingredients", "Pregnancy Safe"],
    inStock: true,
  },
  {
    id: "hand-cream-luxury",
    name: "Luxury Hand Cream",
    description: "Rich, fast-absorbing cream with shea butter and collagen. Keeps hands soft for 24 hours.",
    price: 35,
    originalPrice: 42,
    image: "/products/hand-cream.jpg",
    category: "hand-cream",
    badge: "20% Off",
    rating: 4.8,
    reviews: 64,
    features: ["Anti-Aging", "Non-Greasy", "Subtle Rose Scent"],
    inStock: true,
  },
  {
    id: "nail-kit-home",
    name: "At-Home Nail Care Kit",
    description: "Complete kit with file, buffer, cuticle pusher, and our signature cuticle oil. Perfect between appointments.",
    price: 65,
    image: "/products/nail-kit.jpg",
    category: "nail-kit",
    badge: "New",
    rating: 5.0,
    reviews: 23,
    features: ["Professional Tools", "Travel Case", "Tutorial Included"],
    inStock: true,
  },
  {
    id: "cuticle-oil-lavender",
    name: "Lavender Dream Cuticle Oil",
    description: "Calming lavender oil blend that promotes nail growth and relaxation. Perfect for bedtime routine.",
    price: 28,
    image: "/products/cuticle-oil-lavender.jpg",
    category: "cuticle-oil",
    rating: 4.7,
    reviews: 45,
    features: ["Promotes Sleep", "Nail Growth", "Aromatherapy"],
    inStock: true,
  },
  {
    id: "nail-strengthener",
    name: "Diamond Nail Strengthener",
    description: "Professional-grade treatment that repairs and strengthens damaged nails. Visible results in 2 weeks.",
    price: 32,
    image: "/products/strengthener.jpg",
    category: "accessories",
    rating: 4.9,
    reviews: 156,
    features: ["Keratin Formula", "Clear Finish", "10-Free"],
    inStock: true,
  },
  {
    id: "gift-set",
    name: "IVA Signature Gift Set",
    description: "Our most popular products in a beautiful gift box. Includes cuticle oil, hand cream, and nail file.",
    price: 85,
    originalPrice: 98,
    image: "/products/gift-set.jpg",
    category: "nail-kit",
    badge: "Gift Ready",
    rating: 5.0,
    reviews: 34,
    features: ["Gift Wrapped", "Personal Note", "Free Shipping"],
    inStock: true,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "cuticle-oil", label: "Cuticle Oils" },
  { id: "hand-cream", label: "Hand Care" },
  { id: "nail-kit", label: "Kits & Sets" },
  { id: "accessories", label: "Accessories" },
];

interface CartItem extends Product {
  quantity: number;
}

export default function ProductsShop() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

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

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const items = cart
      .map((item) => `${item.quantity}x ${item.name} ($${item.price * item.quantity})`)
      .join("\n");

    const message = `Hi! I'd like to order these products:\n\n${items}\n\nTotal: $${cartTotal}\n\nPlease let me know the payment and delivery options!`;

    window.open(
      `https://wa.me/13474735036?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section id="shop" className="py-16 md:py-24 px-6 md:px-8 bg-gradient-to-b from-[#F9F8F6] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#B76E79]/10 to-[#722F37]/10 rounded-full mb-4">
            <Leaf className="w-4 h-4 text-[#722F37]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#722F37] font-medium">
              Clean Beauty
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#0D0D0D] mb-4">
            Shop Our <span className="bg-gradient-to-r from-[#B76E79] to-[#722F37] bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-[#6B6B6B] max-w-lg mx-auto">
            Professional-grade, pregnancy-safe products to maintain your nails between appointments
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white shadow-lg"
                  : "bg-white border border-[#EBE8E2] text-[#6B6B6B] hover:border-[#722F37] hover:text-[#722F37]"
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
                className="group bg-white rounded-2xl overflow-hidden border border-[#EBE8E2] hover:shadow-xl hover:border-[#B76E79]/30 transition-all"
              >
                {/* Product Image */}
                <div
                  className="relative aspect-square bg-[#F5F3EF] cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Placeholder - replace with actual images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-[#722F37]/50" />
                    </div>
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white text-xs font-medium rounded-full">
                      {product.badge}
                    </span>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      favorites.has(product.id)
                        ? "bg-[#722F37] text-white"
                        : "bg-white/80 text-[#6B6B6B] hover:text-[#722F37]"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.has(product.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>

                  {/* Quick Add */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full py-3 bg-white text-[#722F37] rounded-xl font-medium text-sm shadow-lg hover:bg-[#722F37] hover:text-white transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
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
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#7A7A7A]">
                      ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#1A1A1A] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#7A7A7A] line-clamp-2 mb-3">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features.slice(0, 2).map((feature) => (
                      <span
                        key={feature}
                        className="text-[10px] px-2 py-1 bg-[#F5F3EF] text-[#6B6B6B] rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-xl text-[#722F37]">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-[#A3A3A3] line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-10 h-10 bg-[#F5F3EF] rounded-full flex items-center justify-center text-[#722F37] hover:bg-[#722F37] hover:text-white transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating Cart Button */}
        {cartCount > 0 && (
          <motion.button
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-24 right-6 z-40 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white rounded-full shadow-2xl"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium">{cartCount} items</span>
            <span className="w-px h-4 bg-white/30" />
            <span className="font-serif">${cartTotal}</span>
          </motion.button>
        )}

        {/* Cart Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl"
              >
                {/* Cart Header */}
                <div className="p-6 border-b border-[#EBE8E2]">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-xl text-[#1A1A1A]">
                      Your Cart ({cartCount})
                    </h2>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 hover:bg-[#F5F3EF] rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-[#7A7A7A]" />
                    </button>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: "calc(100vh - 250px)" }}>
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-12 h-12 text-[#EBE8E2] mx-auto mb-3" />
                      <p className="text-[#7A7A7A]">Your cart is empty</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 bg-[#F9F8F6] rounded-xl"
                      >
                        {/* Product Image Placeholder */}
                        <div className="w-20 h-20 bg-[#EBE8E2] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-8 h-8 text-[#B76E79]" />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-medium text-[#1A1A1A] text-sm">
                            {item.name}
                          </h4>
                          <p className="text-sm text-[#722F37] mt-1">
                            ${item.price}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 bg-white rounded-full flex items-center justify-center border border-[#EBE8E2]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 bg-white rounded-full flex items-center justify-center border border-[#EBE8E2]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#A3A3A3] hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Cart Footer */}
                {cart.length > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-[#EBE8E2]">
                    <div className="flex justify-between mb-4">
                      <span className="text-[#7A7A7A]">Subtotal</span>
                      <span className="font-serif text-xl text-[#1A1A1A]">
                        ${cartTotal}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full py-4 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Checkout via WhatsApp
                    </button>
                    <p className="text-center text-xs text-[#7A7A7A] mt-3">
                      Free shipping on orders over $75
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-video bg-[#F5F3EF]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#B76E79]/20 to-[#722F37]/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-[#722F37]/50" />
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedProduct.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#7A7A7A]">
                      {selectedProduct.reviews} reviews
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl text-[#1A1A1A] mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-[#6B6B6B] mb-4">
                    {selectedProduct.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {selectedProduct.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#722F37]" />
                        <span className="text-sm text-[#3D3D3D]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl text-[#722F37]">
                        ${selectedProduct.price}
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="text-[#A3A3A3] line-through">
                          ${selectedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
