"use client";

/**
 * IVA Nail Art - Verified Reviews System
 * Post-appointment reviews with photo uploads
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Camera,
  X,
  Check,
  Quote,
  ChevronLeft,
  ChevronRight,
  Shield,
  ThumbsUp,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  service: string;
  photos?: string[];
  verified: boolean;
  helpful: number;
  response?: {
    text: string;
    date: string;
  };
}

const VERIFIED_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    text: "Absolutely incredible experience! The attention to detail is unmatched. I came in for my wedding nails and IVA created the most stunning 3D floral design. Everyone at my wedding couldn't stop complimenting them!",
    date: "2025-01-15",
    service: "Bridal Package",
    photos: ["/gallery/nail1.jpg", "/gallery/nail2.jpg"],
    verified: true,
    helpful: 24,
    response: {
      text: "Thank you so much Sarah! It was an honor to be part of your special day. Congratulations! 💕",
      date: "2025-01-16",
    },
  },
  {
    id: "2",
    author: "Emily R.",
    rating: 5,
    text: "Best nail salon in Brooklyn, hands down! As a pregnant mom, finding a salon with non-toxic products was crucial. The HEPA filtration makes such a difference - no chemical smell at all!",
    date: "2025-01-10",
    service: "Signature Gel Manicure",
    photos: ["/gallery/nail3.jpg"],
    verified: true,
    helpful: 18,
  },
  {
    id: "3",
    author: "Jessica T.",
    rating: 5,
    text: "I've been coming here for 6 months and won't go anywhere else. The chrome work is like nothing I've seen before. Worth every penny!",
    date: "2024-12-28",
    service: "Chrome Art Manicure",
    verified: true,
    helpful: 15,
  },
  {
    id: "4",
    author: "Amanda L.",
    rating: 5,
    text: "Finally found my go-to nail artist! The gel manicure lasted 3 weeks without a single chip. The glazed donut effect was perfect.",
    date: "2024-12-20",
    service: "Gel Manicure",
    photos: ["/gallery/nail4.jpg"],
    verified: true,
    helpful: 12,
  },
  {
    id: "5",
    author: "Nicole P.",
    rating: 4,
    text: "Beautiful work and very clean space. Only giving 4 stars because the appointment ran a bit over time, but the results were worth the wait!",
    date: "2024-12-15",
    service: "3D Nail Art",
    verified: true,
    helpful: 8,
    response: {
      text: "Thanks for the feedback Nicole! We're working on improving our timing while maintaining quality. Looking forward to your next visit!",
      date: "2024-12-16",
    },
  },
];

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: Partial<Review>) => void;
}

function WriteReviewModal({ isOpen, onClose, onSubmit }: WriteReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [service, setService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    "Signature Gel Manicure",
    "3D Nail Art",
    "Chrome Art Manicure",
    "Luxury Spa Pedicure",
    "Bridal Package",
    "Other",
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In production, upload to cloud storage
      const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file));
      setPhotos((prev) => [...prev, ...newPhotos].slice(0, 4));
    }
  };

  const handleSubmit = async () => {
    if (rating === 0 || !text.trim()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500)); // Simulate API call

    onSubmit({
      rating,
      text,
      service,
      photos,
      verified: true,
    });

    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EBE8E2] px-6 py-4 flex items-center justify-between">
          <h3 className="font-serif text-xl text-[#1A1A1A]">Write a Review</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#F9F8F6] rounded-full">
            <X className="w-5 h-5 text-[#7A7A7A]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Your Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Service Received
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-3 border border-[#EBE8E2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30"
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Your Review
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              className="w-full px-4 py-3 border border-[#EBE8E2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B76E79]/30 resize-none"
            />
            <p className="text-xs text-[#7A7A7A] mt-1">
              {text.length}/500 characters
            </p>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Add Photos (Optional)
            </label>
            <div className="flex gap-3">
              {photos.map((photo, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setPhotos((p) => p.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              {photos.length < 4 && (
                <label className="w-20 h-20 border-2 border-dashed border-[#EBE8E2] rounded-xl flex items-center justify-center cursor-pointer hover:border-[#B76E79] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Camera className="w-6 h-6 text-[#7A7A7A]" />
                </label>
              )}
            </div>
            <p className="text-xs text-[#7A7A7A] mt-2">
              Show off your nails! Up to 4 photos.
            </p>
          </div>

          {/* Verified Badge Info */}
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
            <Shield className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-800">
              Your review will be marked as verified since you had an appointment with us.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#EBE8E2] px-6 py-4">
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || !text.trim() || isSubmitting}
            className="w-full py-3 bg-[#722F37] text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5A252C] transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface VerifiedReviewsProps {
  showWriteReview?: boolean;
  limit?: number;
  language?: "en" | "es";
}

export default function VerifiedReviews({ showWriteReview = true, limit = 5, language = "en" }: VerifiedReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [helpfulClicked, setHelpfulClicked] = useState<string[]>([]);

  const isSpanish = language === "es";
  const reviews = VERIFIED_REVIEWS.slice(0, limit);

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const totalReviews = reviews.length;

  const handleHelpful = (reviewId: string) => {
    if (!helpfulClicked.includes(reviewId)) {
      setHelpfulClicked((prev) => [...prev, reviewId]);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return isSpanish ? "Hoy" : "Today";
    if (days === 1) return isSpanish ? "Ayer" : "Yesterday";
    if (days < 7) return isSpanish ? `Hace ${days} días` : `${days} days ago`;
    if (days < 30) return isSpanish ? `Hace ${Math.floor(days / 7)} semanas` : `${Math.floor(days / 7)} weeks ago`;
    return isSpanish ? `Hace ${Math.floor(days / 30)} meses` : `${Math.floor(days / 30)} months ago`;
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-8 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full text-xs text-green-700 mb-4">
            <Shield className="w-3 h-3" />
            {isSpanish ? "Reseñas Verificadas" : "Verified Reviews"}
          </span>

          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4">
            {isSpanish ? "Lo Que Dicen Nuestros Clientes" : "What Our Clients Say"}
          </h2>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="font-serif text-5xl text-[#1A1A1A]">{avgRating}</div>
              <div className="flex gap-0.5 justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(parseFloat(avgRating))
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-[#7A7A7A] mt-1">
                {isSpanish ? `${totalReviews} reseñas verificadas` : `${totalReviews} verified reviews`}
              </p>
            </div>
          </div>

          {showWriteReview && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#722F37] text-white rounded-full hover:bg-[#5A252C] transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              {isSpanish ? "Escribir una Reseña" : "Write a Review"}
            </button>
          )}
        </div>

        {/* Reviews Grid */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-[#EBE8E2]"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#B76E79] to-[#722F37] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-serif text-lg">
                    {review.author.charAt(0)}
                  </span>
                </div>

                <div className="flex-1">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-medium text-[#1A1A1A]">{review.author}</span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-full text-xs text-green-700">
                        <Check className="w-3 h-3" />
                        {isSpanish ? "Verificado" : "Verified"}
                      </span>
                    )}
                    <span className="text-sm text-[#7A7A7A]">• {formatDate(review.date)}</span>
                  </div>

                  {/* Rating & Service */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#B76E79]">{review.service}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-[#3D3D3D] leading-relaxed mb-4">{review.text}</p>

                  {/* Photos */}
                  {review.photos && review.photos.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.photos.map((photo, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedPhoto(photo)}
                          className="w-20 h-20 rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
                        >
                          <img
                            src={photo}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Response from IVA */}
                  {review.response && (
                    <div className="bg-[#F9F8F6] rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-[#722F37] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-serif">I</span>
                        </div>
                        <span className="text-sm font-medium text-[#1A1A1A]">Response from IVA</span>
                        <span className="text-xs text-[#7A7A7A]">• {formatDate(review.response.date)}</span>
                      </div>
                      <p className="text-sm text-[#3D3D3D]">{review.response.text}</p>
                    </div>
                  )}

                  {/* Helpful Button */}
                  <button
                    onClick={() => handleHelpful(review.id)}
                    disabled={helpfulClicked.includes(review.id)}
                    className={`flex items-center gap-2 text-sm ${
                      helpfulClicked.includes(review.id)
                        ? "text-[#722F37]"
                        : "text-[#7A7A7A] hover:text-[#1A1A1A]"
                    } transition-colors`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${helpfulClicked.includes(review.id) ? "fill-current" : ""}`} />
                    {isSpanish ? "Útil" : "Helpful"} ({review.helpful + (helpfulClicked.includes(review.id) ? 1 : 0)})
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 px-6 py-3 border border-[#EBE8E2] rounded-full text-[#1A1A1A] hover:bg-[#F9F8F6] transition-colors">
            {isSpanish ? "Ver todas las reseñas" : "View all reviews"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(review) => {
          console.log("New review:", review);
          setShowModal(false);
        }}
      />

      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedPhoto}
              alt=""
              className="max-w-full max-h-[90vh] rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
