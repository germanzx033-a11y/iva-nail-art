"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal, ArrowRight, ShieldCheck } from "lucide-react";
import {
  BeforeAfterConfig,
  DEFAULT_BEFORE_AFTER,
  getSavedSiteContent,
} from "@/lib/contentStore";

export interface SliderState {
  value: number;
  ariaValueNow: number;
  ariaValueMin: number;
  ariaValueMax: number;
  role: "slider";
  clipPathPercent: string;
  beforeVisiblePercent: number;
  afterVisiblePercent: number;
}

/**
 * Pure function computing Before/After slider position and ARIA accessibility state.
 * Clamps position between 0 and 100, returning normalized geometry and visibility percentages.
 */
export function computeSliderState(position: number): SliderState {
  const clamped = Math.max(0, Math.min(100, Math.round(position)));
  return {
    value: clamped,
    ariaValueNow: clamped,
    ariaValueMin: 0,
    ariaValueMax: 100,
    role: "slider",
    clipPathPercent: `${clamped}%`,
    beforeVisiblePercent: clamped,
    afterVisiblePercent: 100 - clamped,
  };
}

/**
 * Returns true only when Before/After configuration is enabled with valid image paths.
 */
export function shouldRenderSlider(
  config?: Partial<BeforeAfterConfig> | null
): boolean {
  return Boolean(
    config &&
      config.enabled &&
      config.beforeImage &&
      typeof config.beforeImage === "string" &&
      config.beforeImage.trim().length > 0 &&
      config.afterImage &&
      typeof config.afterImage === "string" &&
      config.afterImage.trim().length > 0
  );
}

export interface BeforeAfterSliderProps {
  lang?: "en" | "es";
  initialPosition?: number;
  className?: string;
  onBookClick?: () => void;
  customConfig?: BeforeAfterConfig;
  showCardContainer?: boolean;
}

export default function BeforeAfterSlider({
  lang = "es",
  initialPosition = 50,
  className = "",
  onBookClick,
  customConfig,
  showCardContainer = true,
}: BeforeAfterSliderProps) {
  const [storedConfig, setStoredConfig] = useState<BeforeAfterConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const site = getSavedSiteContent();
        if (site?.beforeAfter) return site.beforeAfter;
      } catch (err) {
        console.warn("Could not load initial before/after config:", err);
      }
    }
    return DEFAULT_BEFORE_AFTER;
  });

  const config = customConfig || storedConfig;

  const [position, setPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Subscribe to reactive site content updates
  useEffect(() => {
    if (customConfig) return; // In custom preview mode, don't override from storage

    const handleUpdate = () => {
      try {
        const site = getSavedSiteContent();
        if (site?.beforeAfter) {
          setStoredConfig(site.beforeAfter);
        }
      } catch (err) {
        console.warn("Could not reload before/after config:", err);
      }
    };

    window.addEventListener("iva-content-updated", handleUpdate);
    return () => window.removeEventListener("iva-content-updated", handleUpdate);
  }, [customConfig]);

  // If disabled or missing images, do not render ghost element
  if (!shouldRenderSlider(config)) {
    return null;
  }

  const sliderState = computeSliderState(position);
  const isEn = lang === "en";

  const title = isEn
    ? (config.titleEn && config.titleEn.trim() ? config.titleEn : config.titleEs)
    : (config.titleEs && config.titleEs.trim() ? config.titleEs : config.titleEn);

  const subtitle = isEn
    ? (config.subtitleEn && config.subtitleEn.trim() ? config.subtitleEn : config.subtitleEs)
    : (config.subtitleEs && config.subtitleEs.trim() ? config.subtitleEs : config.subtitleEn);

  const updatePositionFromPointer = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const offsetX = clientX - rect.left;
    const percent = (offsetX / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, percent)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback if pointer capture unsupported
    }
    updatePositionFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    updatePositionFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setPosition((prev) => Math.max(0, prev - (e.shiftKey ? 10 : 2)));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setPosition((prev) => Math.min(100, prev + (e.shiftKey ? 10 : 2)));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  const sliderContent = (
    <div className={`w-full ${className}`}>
      {/* Title & Subtitle Header */}
      {showCardContainer && (
        <div className="text-center mb-8 px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#722F37]/30 border border-[#D4A574]/40 text-[#E8C9A8] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A574]" />
            <span>{isEn ? "Atelier Transformation" : "Transformación en Atelier"}</span>
          </div>
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F5E6D3] tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-sm sm:text-base text-[#D4A574]/90 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Main Interactive Comparison Container */}
      <div className="relative max-w-4xl mx-auto px-2 sm:px-0">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-[#D4A574]/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-[#0E0706] touch-none select-none cursor-ew-resize group"
          style={{ willChange: "transform" }}
        >
          {/* Bottom Layer: After Image (Full background) */}
          <Image
            src={config.afterImage}
            alt={isEn ? "Transformed Russian Manicure After State" : "Resultado Después - Manicura Rusa Transformada"}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            unoptimized={config.afterImage.startsWith("data:")}
            className="object-cover select-none pointer-events-none"
            draggable={false}
          />

          {/* Top Layer: Before Image (Clipped from left to position) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{
              clipPath: `inset(0 ${100 - sliderState.value}% 0 0)`,
              willChange: "clip-path",
            }}
          >
            <Image
              src={config.beforeImage}
              alt={isEn ? "Natural Nail Before State" : "Estado Antes - Uña Natural"}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              unoptimized={config.beforeImage.startsWith("data:")}
              className="object-cover select-none pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-[#E8C9A8] via-[#D4A574] to-[#722F37] pointer-events-none shadow-[0_0_12px_rgba(212,165,116,0.8)] z-20"
            style={{
              left: `${sliderState.value}%`,
              transform: "translateX(-50%)",
            }}
          />

          {/* WAI-ARIA Accessible Handle */}
          <div
            ref={sliderRef}
            role={sliderState.role}
            tabIndex={0}
            aria-valuenow={sliderState.ariaValueNow}
            aria-valuemin={sliderState.ariaValueMin}
            aria-valuemax={sliderState.ariaValueMax}
            aria-label={
              isEn
                ? "Interactive Before and After nail transformation comparison"
                : "Comparador interactivo de transformación de uñas antes y después"
            }
            aria-orientation="horizontal"
            onKeyDown={handleKeyDown}
            style={{
              left: `${sliderState.value}%`,
              transform: "translate(-50%, -50%)",
            }}
            className={`absolute top-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-br from-[#E8C9A8] via-[#D4A574] to-[#B3874B] text-[#0E0706] shadow-[0_0_20px_rgba(212,165,116,0.85)] border-2 border-[#0E0706] cursor-ew-resize outline-none focus:ring-4 focus:ring-[#D4A574]/60 transition-transform ${
              isDragging ? "scale-110 shadow-[0_0_25px_rgba(232,201,168,1)]" : "group-hover:scale-105"
            }`}
          >
            <MoveHorizontal className="w-5 h-5 text-[#0E0706] drop-shadow" />
          </div>

          {/* Editorial Overlay Badges */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase backdrop-blur-md bg-[#0E0706]/80 text-[#E8C9A8] border border-[#D4A574]/40 shadow-lg pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574]/70" />
            <span>{isEn ? "ANTES / BEFORE" : "ANTES / BEFORE"}</span>
          </div>

          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase backdrop-blur-md bg-[#722F37]/85 text-[#F5E6D3] border border-[#D4A574]/50 shadow-lg pointer-events-none">
            <Sparkles className="w-3 h-3 text-[#E8C9A8]" />
            <span>{isEn ? "DESPUÉS / AFTER" : "DESPUÉS / AFTER"}</span>
          </div>

          {/* Interactive Drag Hint (Fades out when interacted) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-medium tracking-wide backdrop-blur-md bg-black/65 text-[#E8C9A8]/90 border border-white/10 pointer-events-none">
            {isEn
              ? "← Drag or use arrow keys to compare →"
              : "← Desliza o usa las flechas para comparar →"}
          </div>
        </div>

        {/* Footer Luxury Guarantee & Booking CTA */}
        {showCardContainer && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#722F37]/20 via-[#1C0F0D]/60 to-[#722F37]/20 border border-[#D4A574]/20">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#E8C9A8]/90 text-center sm:text-left">
              <ShieldCheck className="w-4 h-4 text-[#D4A574] shrink-0" />
              <span>
                {isEn
                  ? "Flawless cuticle clearance, durable structured apex & 3+ weeks retention."
                  : "Limpieza impecable de cutícula, ápice escultural y retención de más de 3 semanas."}
              </span>
            </div>

            <a
              href="#booking"
              onClick={(e) => {
                if (onBookClick) {
                  e.preventDefault();
                  onBookClick();
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#D4A574] to-[#B3874B] text-[#0E0706] hover:brightness-110 shadow-[0_4px_15px_rgba(212,165,116,0.3)] transition-all shrink-0"
            >
              <span>{isEn ? "Book This Transformation" : "Quiero Esta Transformación"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return sliderContent;
}
