"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  Sliders,
  Flame,
  Check,
} from "lucide-react";
import {
  DayStatus,
  WeeklyAvailabilityConfig,
  DEFAULT_WEEKLY_AVAILABILITY,
  getSavedSiteContent,
  saveSiteContent,
  calculateUrgencyBanner,
} from "@/lib/contentStore";

const STATUS_OPTIONS: {
  value: DayStatus;
  labelEs: string;
  labelEn: string;
  description: string;
  bgActive: string;
  textActive: string;
  borderActive: string;
  dotColor: string;
}[] = [
  {
    value: "Cupos Libres",
    labelEs: "Cupos Libres",
    labelEn: "Available",
    description: "Varios espacios disponibles",
    bgActive: "bg-emerald-500/10",
    textActive: "text-emerald-700",
    borderActive: "border-emerald-500",
    dotColor: "bg-emerald-500",
  },
  {
    value: "Solo 1 Cupo",
    labelEs: "Solo 1 Cupo",
    labelEn: "1 Slot Left",
    description: "Último espacio (genera urgencia)",
    bgActive: "bg-amber-500/10",
    textActive: "text-amber-800",
    borderActive: "border-amber-500",
    dotColor: "bg-amber-500 animate-pulse",
  },
  {
    value: "Lleno",
    labelEs: "Lleno",
    labelEn: "Full",
    description: "Sin cupos disponibles",
    bgActive: "bg-rose-500/10",
    textActive: "text-rose-700",
    borderActive: "border-rose-500",
    dotColor: "bg-rose-500",
  },
  {
    value: "Cerrado",
    labelEs: "Cerrado",
    labelEn: "Closed",
    description: "Día de descanso de Ivannía",
    bgActive: "bg-stone-500/10",
    textActive: "text-stone-600",
    borderActive: "border-stone-400",
    dotColor: "bg-stone-400",
  },
];

export default function AdminWeeklyAvailability() {
  const [config, setConfig] = useState<WeeklyAvailabilityConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const site = getSavedSiteContent();
        if (site?.weeklyAvailability) return site.weeklyAvailability;
      } catch (e) {
        console.warn("Could not load initial weekly availability:", e);
      }
    }
    return DEFAULT_WEEKLY_AVAILABILITY;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const site = getSavedSiteContent();
        if (site?.weeklyAvailability) {
          setConfig(site.weeklyAvailability);
        }
      } catch (e) {
        console.warn("Could not reload weekly availability:", e);
      }
    };
    window.addEventListener("iva-content-updated", handleUpdate);
    return () => window.removeEventListener("iva-content-updated", handleUpdate);
  }, []);

  // Status changer for a specific day
  const handleStatusChange = (index: number, newStatus: DayStatus) => {
    setConfig((prev) => {
      const updatedDays = [...prev.days];
      updatedDays[index] = {
        ...updatedDays[index],
        status: newStatus,
      };
      return {
        ...prev,
        days: updatedDays,
      };
    });
    setSaveSuccess(false);
  };

  // Presets for quick routine administration
  const applyPreset = (presetName: "all_free" | "typical" | "weekend_full" | "sold_out" | "vacation") => {
    setSaveSuccess(false);
    setConfig((prev) => {
      const days = [...prev.days];
      if (presetName === "all_free") {
        return {
          ...prev,
          days: days.map((d) => ({ ...d, status: "Cupos Libres" as DayStatus })),
        };
      }
      if (presetName === "typical") {
        return {
          ...prev,
          days: days.map((d) => {
            if (d.key === "mon" || d.key === "sun") return { ...d, status: "Cerrado" as DayStatus };
            if (d.key === "fri" || d.key === "sat") return { ...d, status: "Solo 1 Cupo" as DayStatus };
            return { ...d, status: "Cupos Libres" as DayStatus };
          }),
        };
      }
      if (presetName === "weekend_full") {
        return {
          ...prev,
          days: days.map((d) => {
            if (d.key === "fri" || d.key === "sat" || d.key === "sun") {
              return { ...d, status: "Lleno" as DayStatus };
            }
            return d;
          }),
        };
      }
      if (presetName === "sold_out") {
        return {
          ...prev,
          days: days.map((d) => ({ ...d, status: "Lleno" as DayStatus })),
        };
      }
      if (presetName === "vacation") {
        return {
          ...prev,
          days: days.map((d) => ({ ...d, status: "Cerrado" as DayStatus })),
        };
      }
      return prev;
    });
  };

  // Save changes to localStorage and backend API
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const currentSite = getSavedSiteContent();
      const updatedSite = {
        ...currentSite,
        weeklyAvailability: config,
      };

      // 1. Save locally and dispatch event
      saveSiteContent(updatedSite);

      // 2. Sync to server fallback endpoint
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("iva_admin_key") : null;
        await fetch("/api/admin/content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(updatedSite),
        });
      } catch (apiErr) {
        console.warn("API sync skipped or unavailable:", apiErr);
      }

      // 3. Dispatch broadcast
      window.dispatchEvent(new Event("iva-content-updated"));

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err: unknown) {
      console.error("Failed to save weekly availability:", err);
      setError(err instanceof Error ? err.message : "Error al guardar disponibilidad");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm("¿Restablecer el semáforo semanal a los valores predeterminados del estudio?")) {
      setConfig(DEFAULT_WEEKLY_AVAILABILITY);
      setSaveSuccess(false);
    }
  };

  // Preview computed urgency
  const previewEs = calculateUrgencyBanner(config, "es");

  return (
    <div className="bg-white rounded-2xl border border-[#EBE8E2] shadow-sm p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EBE8E2] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#722F37]/10 text-[#722F37]">
              <Calendar className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-serif text-[#1A1A1A] tracking-tight">
              Semáforo de Disponibilidad Semanal
            </h2>
          </div>
          <p className="text-xs text-[#7A7A7A] max-w-xl">
            Control visual de cupos para los 7 días de la semana (Lunes a Domingo). Los cambios se reflejan inmediatamente en el banner de urgencia de la web pública.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#7A7A7A] hover:text-[#1A1A1A] hover:bg-stone-100 rounded-lg transition-colors border border-transparent hover:border-[#EBE8E2]"
            title="Restablecer a valores iniciales"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restablecer</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-[#722F37] hover:bg-[#5A252C] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-sm transition-all"
          >
            {isSaving ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Guardando...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>¡Guardado con Éxito!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Guardar Disponibilidad</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-xs animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Cambios publicados correctamente</p>
            <p className="text-emerald-700">El banner público en la página principal ha sido sincronizado en tiempo real.</p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Quick Presets Bar */}
      <div className="space-y-2">
        <label className="text-[11px] font-medium uppercase tracking-wider text-[#7A7A7A] flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#722F37]" />
          <span>Plantillas de Rutina Rápida</span>
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyPreset("typical")}
            className="px-3 py-1.5 text-xs rounded-lg bg-stone-100 hover:bg-[#722F37]/10 text-[#1A1A1A] hover:text-[#722F37] border border-stone-200 transition-colors"
          >
            ✨ Rutina Típica (Vie-Sáb 1 Cupo)
          </button>
          <button
            type="button"
            onClick={() => applyPreset("weekend_full")}
            className="px-3 py-1.5 text-xs rounded-lg bg-stone-100 hover:bg-[#722F37]/10 text-[#1A1A1A] hover:text-[#722F37] border border-stone-200 transition-colors"
          >
            🔥 Fin de Semana Lleno
          </button>
          <button
            type="button"
            onClick={() => applyPreset("sold_out")}
            className="px-3 py-1.5 text-xs rounded-lg bg-stone-100 hover:bg-rose-100 text-[#1A1A1A] hover:text-rose-800 border border-stone-200 transition-colors"
          >
            🚫 Semana Completa Llena
          </button>
          <button
            type="button"
            onClick={() => applyPreset("all_free")}
            className="px-3 py-1.5 text-xs rounded-lg bg-stone-100 hover:bg-emerald-100 text-[#1A1A1A] hover:text-emerald-800 border border-stone-200 transition-colors"
          >
            🟢 Todos los Días Libres
          </button>
          <button
            type="button"
            onClick={() => applyPreset("vacation")}
            className="px-3 py-1.5 text-xs rounded-lg bg-stone-100 hover:bg-stone-200 text-[#7A7A7A] hover:text-[#1A1A1A] border border-stone-200 transition-colors"
          >
            🏖️ Cerrado por Vacaciones
          </button>
        </div>
      </div>

      {/* 7-Day Visual Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium uppercase tracking-wider text-[#7A7A7A]">
            Estado de los 7 Días de la Semana
          </label>
          <span className="text-xs text-[#722F37] font-medium">
            {previewEs.availableSlotsCount} {previewEs.availableSlotsCount === 1 ? "día con cupos" : "días con cupos"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {config.days.map((dayItem, idx) => {
            const currentOption = STATUS_OPTIONS.find((s) => s.value === dayItem.status) || STATUS_OPTIONS[0];

            return (
              <div
                key={dayItem.key}
                className="bg-[#FAF8F5] rounded-xl p-3.5 border border-[#EBE8E2] flex flex-col justify-between space-y-3 hover:border-[#722F37]/30 transition-all shadow-xs"
              >
                {/* Day Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-medium text-sm text-[#1A1A1A]">
                      {dayItem.day}
                    </h3>
                    <p className="text-[10px] text-[#7A7A7A] uppercase tracking-wider">
                      {dayItem.key}
                    </p>
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full ${currentOption.dotColor}`} />
                </div>

                {/* 4 Status Selectors as Luxury Mini-Pills */}
                <div className="grid grid-cols-1 gap-1.5 pt-1">
                  {STATUS_OPTIONS.map((opt) => {
                    const isSelected = dayItem.status === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleStatusChange(idx, opt.value)}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between border ${
                          isSelected
                            ? `${opt.bgActive} ${opt.textActive} ${opt.borderActive} shadow-xs font-semibold`
                            : "bg-white text-[#555] border-[#E5E0D8] hover:bg-stone-50 hover:text-[#1A1A1A]"
                        }`}
                      >
                        <span className="truncate">{opt.labelEs}</span>
                        {isSelected && <Check className="w-3 h-3 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Urgency Message Overrides */}
      <div className="bg-[#FAF8F5] rounded-xl p-5 border border-[#EBE8E2] space-y-4">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#722F37]" />
          <h3 className="font-serif text-sm font-medium text-[#1A1A1A]">
            Mensaje de Urgencia Personalizado (Opcional)
          </h3>
        </div>
        <p className="text-xs text-[#7A7A7A]">
          Si escribes un texto aquí, reemplazará el cálculo automático de cupos en el banner público. Déjalo en blanco para usar el cálculo inteligente automático.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#444]">
              Mensaje en Español (ES)
            </label>
            <input
              type="text"
              value={config.customUrgencyMessageEs || ""}
              onChange={(e) => {
                setSaveSuccess(false);
                setConfig((prev) => ({ ...prev, customUrgencyMessageEs: e.target.value }));
              }}
              placeholder="Ej: ✨ Solo 2 cupos para esta semana en Bay Ridge"
              className="w-full px-3.5 py-2 text-xs bg-white rounded-lg border border-[#D8D2C8] focus:outline-none focus:ring-1 focus:ring-[#722F37] focus:border-[#722F37]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#444]">
              Mensaje en Inglés (EN)
            </label>
            <input
              type="text"
              value={config.customUrgencyMessageEn || ""}
              onChange={(e) => {
                setSaveSuccess(false);
                setConfig((prev) => ({ ...prev, customUrgencyMessageEn: e.target.value }));
              }}
              placeholder="E.g.: ✨ Only 2 VIP slots remaining this week in Bay Ridge"
              className="w-full px-3.5 py-2 text-xs bg-white rounded-lg border border-[#D8D2C8] focus:outline-none focus:ring-1 focus:ring-[#722F37] focus:border-[#722F37]"
            />
          </div>
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium uppercase tracking-wider text-[#7A7A7A] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B76E79]" />
            <span>Vista Previa del Banner Público (En Vivo)</span>
          </label>
          <span className="text-[11px] text-[#7A7A7A]">
            {previewEs.custom ? "Modo: Texto Personalizado" : "Modo: Cálculo Automático"}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0E0706] text-[#F4EBE1] border border-[#E8C9A8]/20 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F4EBE1]/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <p className="text-xs font-serif text-[#E8C9A8] font-medium tracking-wide">
                {previewEs.bannerText}
              </p>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#E8C9A8]/60 bg-[#722F37]/40 px-2.5 py-1 rounded-full self-start sm:self-auto border border-[#E8C9A8]/20">
              Bay Ridge, Brooklyn
            </span>
          </div>

          {/* Mini-pill days representation */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {config.days.map((d) => {
              const opt = STATUS_OPTIONS.find((s) => s.value === d.status) || STATUS_OPTIONS[0];
              return (
                <div
                  key={d.key}
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1A1110] border border-[#F4EBE1]/10 text-[10px]"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${opt.dotColor}`} />
                  <span className="text-[#F4EBE1]/80 font-medium">{d.day.slice(0, 3)}:</span>
                  <span className="text-[#E8C9A8]/90">{d.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
