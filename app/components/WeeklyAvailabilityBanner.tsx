"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  ArrowRight,
  Flame,
} from "lucide-react";
import {
  WeeklyAvailabilityConfig,
  DEFAULT_WEEKLY_AVAILABILITY,
  getSavedSiteContent,
  calculateUrgencyBanner,
  DayStatus,
} from "@/lib/contentStore";

interface WeeklyAvailabilityBannerProps {
  lang?: "en" | "es";
  onBookClick?: () => void;
}

const STATUS_COLOR_CONFIG: Record<
  DayStatus,
  {
    bgBadge: string;
    textBadge: string;
    borderBadge: string;
    dotColor: string;
    labelEs: string;
    labelEn: string;
  }
> = {
  "Cupos Libres": {
    bgBadge: "bg-emerald-950/40",
    textBadge: "text-emerald-300",
    borderBadge: "border-emerald-500/30",
    dotColor: "bg-emerald-400",
    labelEs: "Libre",
    labelEn: "Available",
  },
  "Solo 1 Cupo": {
    bgBadge: "bg-amber-950/40",
    textBadge: "text-amber-200",
    borderBadge: "border-amber-400/40",
    dotColor: "bg-amber-400 animate-pulse",
    labelEs: "1 Cupo",
    labelEn: "1 Spot Left",
  },
  Lleno: {
    bgBadge: "bg-rose-950/30",
    textBadge: "text-rose-300/80",
    borderBadge: "border-rose-500/20",
    dotColor: "bg-rose-500",
    labelEs: "Lleno",
    labelEn: "Full",
  },
  Cerrado: {
    bgBadge: "bg-neutral-900/60",
    textBadge: "text-neutral-400",
    borderBadge: "border-neutral-700/30",
    dotColor: "bg-neutral-600",
    labelEs: "Cerrado",
    labelEn: "Closed",
  },
};

const DAY_ABBREVIATIONS: Record<string, { es: string; en: string }> = {
  mon: { es: "Lun", en: "Mon" },
  tue: { es: "Mar", en: "Tue" },
  wed: { es: "Mié", en: "Wed" },
  thu: { es: "Jue", en: "Thu" },
  fri: { es: "Vie", en: "Fri" },
  sat: { es: "Sáb", en: "Sat" },
  sun: { es: "Dom", en: "Sun" },
};

export default function WeeklyAvailabilityBanner({
  lang = "es",
  onBookClick,
}: WeeklyAvailabilityBannerProps) {
  const [weeklyConfig, setWeeklyConfig] = useState<WeeklyAvailabilityConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const site = getSavedSiteContent();
        if (site?.weeklyAvailability) return site.weeklyAvailability;
      } catch (err) {
        console.warn("Could not load initial weekly availability banner content:", err);
      }
    }
    return DEFAULT_WEEKLY_AVAILABILITY;
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const site = getSavedSiteContent();
        if (site?.weeklyAvailability) {
          setWeeklyConfig(site.weeklyAvailability);
        }
      } catch (err) {
        console.warn("Could not reload weekly availability banner content:", err);
      }
    };
    window.addEventListener("iva-content-updated", handleUpdate);
    return () => window.removeEventListener("iva-content-updated", handleUpdate);
  }, []);

  const banner = calculateUrgencyBanner(weeklyConfig, lang);
  const isEn = lang === "en";

  return (
    <section
      aria-label={isEn ? "Weekly Atelier Availability" : "Disponibilidad Semanal del Atelier"}
      className="w-full bg-gradient-to-b from-[#0E0706] via-[#160B09] to-[#0E0706] py-8 px-4 sm:px-6 lg:px-8 border-y border-[#E8C9A8]/15"
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1C0E0C] via-[#241210] to-[#1C0E0C] border border-[#E8C9A8]/30 p-5 sm:p-6 shadow-2xl shadow-black/60">
          {/* Subtle Ambient Gold Glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-64 h-64 bg-[#E8C9A8]/10 rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#722F37]/30 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Urgency Headline & Status */}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-[#722F37] text-[#E8C9A8] border border-[#E8C9A8]/30">
                  <Calendar className="w-3 h-3 text-[#E8C9A8]" />
                  <span>{isEn ? "LIVE ATELIER SCHEDULE" : "AGENDA EN VIVO"}</span>
                </span>

                {banner.isUrgent && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>{isEn ? "HIGH DEMAND" : "ALTA DEMANDA"}</span>
                  </span>
                )}
              </div>

              {/* Main Banner Message */}
              <h3 className="text-base sm:text-lg md:text-xl font-serif text-[#F4EBE1] font-medium tracking-wide">
                {banner.bannerText}
              </h3>

              <p className="text-xs text-[#E8C9A8]/70">
                {isEn
                  ? "Ivannía takes only 2 to 3 appointments per day in Bay Ridge for true 1-on-1 private attention."
                  : "Ivannía atiende únicamente 2 a 3 citas al día en Bay Ridge para una atención 100% exclusiva y personalizada."}
              </p>
            </div>

            {/* CTA Button */}
            <div className="shrink-0">
              {onBookClick ? (
                <button
                  type="button"
                  onClick={onBookClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E8C9A8] via-[#F4EBE1] to-[#E8C9A8] text-[#140B0A] font-serif text-xs font-semibold tracking-wider uppercase hover:shadow-lg hover:shadow-[#E8C9A8]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>{banner.allBooked ? (isEn ? "Reserve Ahead" : "Reserva Anticipada") : (isEn ? "Secure My Slot" : "Asegurar Mi Cupo")}</span>
                  <ArrowRight className="w-4 h-4 text-[#140B0A]" />
                </button>
              ) : (
                <a
                  href="#booking"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E8C9A8] via-[#F4EBE1] to-[#E8C9A8] text-[#140B0A] font-serif text-xs font-semibold tracking-wider uppercase hover:shadow-lg hover:shadow-[#E8C9A8]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>{banner.allBooked ? (isEn ? "Reserve Ahead" : "Reserva Anticipada") : (isEn ? "Secure My Slot" : "Asegurar Mi Cupo")}</span>
                  <ArrowRight className="w-4 h-4 text-[#140B0A]" />
                </a>
              )}
            </div>
          </div>

          {/* 7-Day Visual Mini-Pills Matrix */}
          <div className="mt-5 pt-4 border-t border-[#F4EBE1]/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {weeklyConfig.days.map((item) => {
                const colors = STATUS_COLOR_CONFIG[item.status] || STATUS_COLOR_CONFIG["Cupos Libres"];
                const dayLabel = isEn
                  ? (DAY_ABBREVIATIONS[item.key]?.en || item.day)
                  : (DAY_ABBREVIATIONS[item.key]?.es || item.day);
                const statusLabel = isEn ? colors.labelEn : colors.labelEs;

                return (
                  <div
                    key={item.key}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl border ${colors.bgBadge} ${colors.borderBadge} transition-all hover:brightness-110`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${colors.dotColor}`} />
                      <span className="font-serif text-xs font-medium text-[#F4EBE1]">
                        {dayLabel}
                      </span>
                    </div>

                    <span className={`text-[11px] font-medium ${colors.textBadge}`}>
                      {statusLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
