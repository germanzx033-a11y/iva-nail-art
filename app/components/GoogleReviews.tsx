"use client";

/**
 * IVA Nail Art - Google Reviews Component
 * Display real reviews with star ratings
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

// Sample reviews - in production, fetch from Google Places API
const REVIEWS: Review[] = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    text: "Absolutely amazing experience! The attention to detail is incredible. IVA made me feel so comfortable, especially being pregnant. The salon is spotless and the designs are stunning!",
    date: "2 weeks ago",
    avatar: "S",
  },
  {
    id: "2",
    author: "Emily R.",
    rating: 5,
    text: "Best nail salon in Brooklyn, hands down! The non-toxic products are a game changer. My nails have never looked better and lasted so long. Highly recommend!",
    date: "1 month ago",
    avatar: "E",
  },
  {
    id: "3",
    author: "Jessica T.",
    rating: 5,
    text: "I've been coming here for 6 months and won't go anywhere else. The 3D nail art is like nothing I've seen before. Worth every penny!",
    date: "3 weeks ago",
    avatar: "J",
  },
  {
    id: "4",
    author: "Amanda L.",
    rating: 5,
    text: "Finally found a salon that uses pregnancy-safe products! The atmosphere is so relaxing and luxurious. My gel manicure lasted 3 weeks without chipping.",
    date: "1 week ago",
    avatar: "A",
  },
  {
    id: "5",
    author: "Nicole P.",
    rating: 5,
    text: "The HEPA air filtration makes such a difference - no chemical smell! The custom nail art IVA created for my wedding was absolutely perfect. Everyone complimented my nails!",
    date: "2 months ago",
    avatar: "N",
  },
];

interface GoogleReviewsProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function GoogleReviews({ limit = 3, showViewAll = true }: GoogleReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const displayedReviews = REVIEWS.slice(0, limit);
  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  // Auto-rotate reviews
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayedReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayedReviews.length]);

  const navigate = (direction: 1 | -1) => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + direction + displayedReviews.length) % displayedReviews.length);
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-8 bg-gradient-to-b from-white to-[#F9F8F6]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full mb-4">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4"
            />
            <span className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A] font-medium">
              Google Reviews
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="font-serif text-4xl text-[#1A1A1A]">{avgRating}</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.round(parseFloat(avgRating))
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-[#7A7A7A] text-sm">
            Based on {REVIEWS.length} reviews
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-[#EBE8E2]"
            >
              <Quote className="w-10 h-10 text-[#B76E79]/30 mb-6" />

              <p className="text-lg md:text-xl text-[#3D3D3D] leading-relaxed mb-6 font-light">
                &ldquo;{displayedReviews[currentIndex].text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B76E79] to-[#722F37] rounded-full flex items-center justify-center">
                    <span className="text-white font-serif text-lg">
                      {displayedReviews[currentIndex].avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">
                      {displayedReviews[currentIndex].author}
                    </p>
                    <p className="text-sm text-[#7A7A7A]">
                      {displayedReviews[currentIndex].date}
                    </p>
                  </div>
                </div>

                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < displayedReviews[currentIndex].rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 bg-white rounded-full shadow-lg border border-[#EBE8E2] flex items-center justify-center hover:bg-[#F9F8F6] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#7A7A7A]" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 bg-white rounded-full shadow-lg border border-[#EBE8E2] flex items-center justify-center hover:bg-[#F9F8F6] transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#7A7A7A]" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {displayedReviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex
                  ? "w-6 bg-[#722F37]"
                  : "bg-[#EBE8E2] hover:bg-[#D4D0C8]"
              }`}
            />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="text-center mt-10">
            <a
              href="https://www.google.com/maps/place/IVA+Nail+Art"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#EBE8E2] rounded-full text-sm text-[#1A1A1A] hover:bg-[#F9F8F6] transition-colors shadow-sm"
            >
              View all reviews on Google
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

// Compact version for embedding
export function ReviewBadge() {
  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <a
      href="https://www.google.com/maps/place/IVA+Nail+Art"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-md border border-[#EBE8E2] hover:shadow-lg transition-shadow"
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="w-4 h-4"
      />
      <div className="flex items-center gap-1">
        <span className="font-medium text-[#1A1A1A]">{avgRating}</span>
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      </div>
      <span className="text-sm text-[#7A7A7A]">{REVIEWS.length} reviews</span>
    </a>
  );
}
