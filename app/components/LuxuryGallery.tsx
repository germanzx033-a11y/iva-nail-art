"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Instagram, Sparkles, Grid3X3, LayoutGrid, ZoomIn, Heart, ChevronDown } from "lucide-react";
import { GALLERY_IMAGES, GalleryImage } from "../data/galleryData";

interface LuxuryGalleryProps {
  instagramHandle?: string;
}

const INITIAL_DISPLAY = 12;
const LOAD_MORE_COUNT = 8;

export default function LuxuryGallery({ instagramHandle = "ivanailart" }: LuxuryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY);
  const [isGridView, setIsGridView] = useState(true);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());

  // Featured images for hero showcase
  const featuredImages = useMemo(() =>
    GALLERY_IMAGES.filter(img => img.featured && !imageErrors.has(img.id)).slice(0, 4),
    [imageErrors]
  );

  // Get valid images (exclude errored ones)
  const validImages = useMemo(() =>
    GALLERY_IMAGES.filter(img => !imageErrors.has(img.id)),
    [imageErrors]
  );

  // Images to display
  const displayedImages = useMemo(() =>
    validImages.slice(0, displayCount),
    [validImages, displayCount]
  );

  const hasMore = displayCount < validImages.length;

  // Load more handler
  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + LOAD_MORE_COUNT, validImages.length));
  };

  // Like handler
  const toggleLike = (imageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  // Navigate to next/prev image
  const navigateImage = useCallback((direction: 1 | -1) => {
    if (!selectedImage) return;
    const currentIndex = validImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + direction + validImages.length) % validImages.length;
    setSelectedImage(validImages[nextIndex]);
  }, [selectedImage, validImages]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "Escape") setSelectedImage(null);
      else if (e.key === "ArrowRight") navigateImage(1);
      else if (e.key === "ArrowLeft") navigateImage(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, navigateImage]);

  // Handle image load error
  const handleImageError = (imageId: string) => {
    setImageErrors(prev => new Set(prev).add(imageId));
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-gradient-to-b from-white via-[#FDFCFB] to-[#FAF9F7] overflow-hidden">
      {/* Featured Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#B76E79]/10 to-[#722F37]/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#B76E79]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#722F37] font-medium">
              Featured Work
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#0D0D0D] mb-4">
            Nail Art <span className="bg-gradient-to-r from-[#B76E79] to-[#722F37] bg-clip-text text-transparent">Masterpieces</span>
          </h2>
          <p className="text-[#6B6B6B] max-w-lg mx-auto">
            Each design tells a story of precision, creativity, and luxury craftsmanship
          </p>
        </motion.div>

        {/* Featured Grid - Bento Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {featuredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative group cursor-pointer overflow-hidden rounded-2xl
                ${index === 0 ? "col-span-2 row-span-2" : ""}
              `}
              onClick={() => setSelectedImage(image)}
            >
              <div className={`relative w-full ${index === 0 ? "aspect-square" : "aspect-[4/5]"} bg-[#F5F5F5]`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading={index < 2 ? "eager" : "lazy"}
                  onError={() => handleImageError(image.id)}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {/* Top Badge */}
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#722F37] text-xs font-medium rounded-full">
                      Featured
                    </span>
                    <button
                      onClick={(e) => toggleLike(image.id, e)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        likedImages.has(image.id)
                          ? "bg-[#722F37] text-white"
                          : "bg-white/90 text-[#722F37] hover:bg-white"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedImages.has(image.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Bottom Info */}
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <ZoomIn className="w-4 h-4" />
                      <span className="text-sm font-medium">View Details</span>
                    </div>
                    <p className="text-white text-xs">By IVA Nail Art</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Gallery Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Gallery Header with Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#0D0D0D]">
              Complete Portfolio
            </h3>
            <p className="text-[#6B6B6B] text-sm mt-1">
              {validImages.length} designs crafted with love
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-[#F5F3EF] rounded-full p-1">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-full transition-all ${
                isGridView ? "bg-white shadow-sm text-[#722F37]" : "text-[#6B6B6B] hover:text-[#722F37]"
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-full transition-all ${
                !isGridView ? "bg-white shadow-sm text-[#722F37]" : "text-[#6B6B6B] hover:text-[#722F37]"
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className={`grid gap-3 md:gap-4 ${
            isGridView
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              : "grid-cols-2 md:grid-cols-3"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {displayedImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(image)}
              >
                <div className={`relative w-full ${isGridView ? "aspect-square" : "aspect-[4/5]"} bg-[#F5F5F5]`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={() => handleImageError(image.id)}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#722F37]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Quick Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => toggleLike(image.id, e)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        likedImages.has(image.id)
                          ? "bg-[#722F37] text-white"
                          : "bg-white/90 text-[#722F37]"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* View indicator */}
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center gap-1.5 text-white text-xs font-medium">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>View</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-10"
          >
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#722F37] text-[#722F37] font-medium rounded-full hover:bg-[#722F37] hover:text-white transition-all duration-300 group"
            >
              <span>Load More Designs</span>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <p className="text-[#9A9A9A] text-sm mt-3">
              Showing {displayedImages.length} of {validImages.length}
            </p>
          </motion.div>
        )}

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 md:p-12 bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 rounded-3xl">
            <Instagram className="w-12 h-12 mx-auto mb-4 text-[#E1306C]" />
            <h4 className="font-serif text-2xl text-[#0D0D0D] mb-2">Follow Our Journey</h4>
            <p className="text-[#6B6B6B] mb-6 max-w-md mx-auto">
              Get daily inspiration and behind-the-scenes content on Instagram
            </p>
            <a
              href={`https://instagram.com/${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-sm uppercase tracking-wider rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
              @{instagramHandle}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-lg flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-sm hover:scale-110"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-sm hover:scale-110"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />

              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-serif text-xl mb-1">IVA Nail Art</p>
                    <p className="text-white text-sm">Premium nail design</p>
                  </div>
                  <button
                    onClick={(e) => toggleLike(selectedImage.id, e)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      likedImages.has(selectedImage.id)
                        ? "bg-[#722F37] text-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${likedImages.has(selectedImage.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-2 px-4 hide-scrollbar">
              {validImages.slice(0, 12).map((img) => (
                <button
                  key={img.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }}
                  className={`
                    flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden
                    transition-all duration-200
                    ${selectedImage.id === img.id
                      ? "ring-2 ring-white scale-110"
                      : "opacity-40 hover:opacity-100"
                    }
                  `}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
