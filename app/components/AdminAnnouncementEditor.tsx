"use client";

import { useState, useEffect } from "react";
import {
  Megaphone,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  Check,
  Clock,
  Sliders,
} from "lucide-react";
import {
  AnnouncementBarConfig,
  DEFAULT_ANNOUNCEMENT_BAR,
  getSavedSiteContent,
  saveSiteContent,
} from "@/lib/contentStore";

const ANNOUNCEMENT_PRESETS = [
  {
    name: "🎄 Agenda Navideña",
    textEs: "🎄 Agenda Navideña & Fin de Año Abierta — Reserva tu set exclusivo antes de que se agoten los cupos.",
    textEn: "🎄 Holiday & New Year Booking Calendar is Open — Reserve your bespoke set before slots fill.",
    badgeEs: "FIESTAS",
    badgeEn: "HOLIDAYS",
    linkUrl: "/#booking",
  },
  {
    name: "👑 Acceso VIP",
    textEs: "✨ Calendario VIP Abierto en Bay Ridge — Atención privada 1 a 1 para clientas selectas.",
    textEn: "✨ VIP Sanctuary Calendar Open in Bay Ridge — Private 1-on-1 sessions for bespoke nails.",
    badgeEs: "VIP ACCESS",
    badgeEn: "VIP ACCESS",
    linkUrl: "/#booking",
  },
  {
    name: "💅 Nueva Colección de Diseños",
    textEs: "🌸 Nueva Colección de Diseños Artesanales & Chrome Velvet disponible este mes.",
    textEn: "🌸 New Artisan Hand-Painted & Chrome Velvet Collection available this month.",
    badgeEs: "NUEVO",
    badgeEn: "NEW",
    linkUrl: "/#gallery",
  },
  {
    name: "🏖️ Aviso de Vacaciones",
    textEs: "Aviso: El estudio permanecerá cerrado del 15 al 22 para descanso. Reservas anticipadas abiertas.",
    textEn: "Notice: The studio will be closed from the 15th to the 22nd. Advance bookings open.",
    badgeEs: "AVISO",
    badgeEn: "NOTICE",
    linkUrl: "/#booking",
  },
];

export default function AdminAnnouncementEditor() {
  const [config, setConfig] = useState<AnnouncementBarConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const site = getSavedSiteContent();
        if (site?.announcementBar) return site.announcementBar;
      } catch (e) {
        console.warn("Could not load initial announcement bar config:", e);
      }
    }
    return DEFAULT_ANNOUNCEMENT_BAR;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const site = getSavedSiteContent();
        if (site?.announcementBar) {
          setConfig(site.announcementBar);
        }
      } catch (e) {
        console.warn("Could not reload announcement bar config:", e);
      }
    };
    window.addEventListener("iva-content-updated", handleUpdate);
    return () => window.removeEventListener("iva-content-updated", handleUpdate);
  }, []);

  // Apply quick preset
  const applyPreset = (preset: (typeof ANNOUNCEMENT_PRESETS)[number]) => {
    setSaveSuccess(false);
    setConfig((prev) => ({
      ...prev,
      enabled: true,
      textEs: preset.textEs,
      textEn: preset.textEn,
      badgeEs: preset.badgeEs,
      badgeEn: preset.badgeEn,
      linkUrl: preset.linkUrl,
    }));
  };

  // Save handler
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);

    // Sanitize linkUrl: disallow javascript: URLs
    let sanitizedLink = config.linkUrl ? config.linkUrl.trim() : "";
    if (sanitizedLink.toLowerCase().startsWith("javascript:")) {
      sanitizedLink = "";
    }

    const sanitizedConfig: AnnouncementBarConfig = {
      ...config,
      textEs: config.textEs ? config.textEs.trim() : "",
      textEn: config.textEn ? config.textEn.trim() : "",
      badgeEs: config.badgeEs ? config.badgeEs.trim() : "",
      badgeEn: config.badgeEn ? config.badgeEn.trim() : "",
      linkUrl: sanitizedLink,
    };

    try {
      const currentSite = getSavedSiteContent();
      const updatedSite = {
        ...currentSite,
        announcementBar: sanitizedConfig,
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
      console.error("Failed to save announcement bar config:", err);
      setError(err instanceof Error ? err.message : "Error al guardar barra de avisos");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("¿Restablecer la barra de anuncios a los valores predeterminados?")) {
      setConfig(DEFAULT_ANNOUNCEMENT_BAR);
      setSaveSuccess(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EBE8E2] shadow-sm p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EBE8E2] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#722F37]/10 text-[#722F37]">
              <Megaphone className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-serif text-[#1A1A1A] tracking-tight">
              Barra de Avisos & Temporadas
            </h2>
          </div>
          <p className="text-xs text-[#7A7A7A] max-w-xl">
            Control del banner superior de la web para comunicar horarios de temporada, aperturas de agenda navideña, vacaciones o avisos importantes para clientas.
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
                <span>Guardar Anuncio</span>
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
            <p className="font-medium">Barra de anuncios actualizada correctamente</p>
            <p className="text-emerald-700">El encabezado superior de la web pública ha sido actualizado en tiempo real.</p>
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

      {/* Master ON/OFF Switch */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE8E2] flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                config.enabled ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"
              }`}
            />
            <span className="font-serif text-sm font-semibold text-[#1A1A1A]">
              Mostrar Barra de Anuncio en la Web
            </span>
          </div>
          <p className="text-xs text-[#7A7A7A]">
            {config.enabled
              ? "Activada: El aviso superior se mostrará a todas las visitantes en la parte más alta de la página."
              : "Desactivada: La barra estará oculta y no ocupará ningún espacio en la web."}
          </p>
        </div>

        {/* Toggle switch */}
        <button
          type="button"
          role="switch"
          aria-checked={config.enabled}
          onClick={() => {
            setSaveSuccess(false);
            setConfig((prev) => ({ ...prev, enabled: !prev.enabled }));
          }}
          className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#722F37] focus:ring-offset-2 ${
            config.enabled ? "bg-[#722F37]" : "bg-neutral-300"
          }`}
        >
          <span className="sr-only">Activar barra de anuncios</span>
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              config.enabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Preset Quick Starters */}
      <div className="space-y-2">
        <label className="text-[11px] font-medium uppercase tracking-wider text-[#7A7A7A] flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#722F37]" />
          <span>Plantillas de Temporada Listas para Usar</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {ANNOUNCEMENT_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 text-xs rounded-lg bg-stone-100 hover:bg-[#722F37]/10 text-[#1A1A1A] hover:text-[#722F37] border border-stone-200 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Text Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Spanish Text */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#1A1A1A] flex items-center justify-between">
            <span>Texto del Anuncio en Español (ES) *</span>
            <span className="text-[10px] text-[#7A7A7A]">Visible para versión en español</span>
          </label>
          <textarea
            rows={3}
            value={config.textEs || ""}
            onChange={(e) => {
              setSaveSuccess(false);
              setConfig((prev) => ({ ...prev, textEs: e.target.value }));
            }}
            placeholder="Ej: 🎄 Agenda Navideña abierta — Citas de Diciembre con Ivannía en Bay Ridge..."
            className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#D8D2C8] focus:outline-none focus:ring-1 focus:ring-[#722F37] focus:border-[#722F37]"
          />
        </div>

        {/* English Text */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#1A1A1A] flex items-center justify-between">
            <span>Texto del Anuncio en Inglés (EN) *</span>
            <span className="text-[10px] text-[#7A7A7A]">Visible for English version</span>
          </label>
          <textarea
            rows={3}
            value={config.textEn || ""}
            onChange={(e) => {
              setSaveSuccess(false);
              setConfig((prev) => ({ ...prev, textEn: e.target.value }));
            }}
            placeholder="E.g.: 🎄 Holiday Booking Calendar is now open — Reserve your bespoke session..."
            className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-[#D8D2C8] focus:outline-none focus:ring-1 focus:ring-[#722F37] focus:border-[#722F37]"
          />
        </div>

        {/* Badge ES */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#1A1A1A]">
            Etiqueta / Badge (ES) (Opcional)
          </label>
          <input
            type="text"
            value={config.badgeEs || ""}
            onChange={(e) => {
              setSaveSuccess(false);
              setConfig((prev) => ({ ...prev, badgeEs: e.target.value }));
            }}
            placeholder="Ej: FIESTAS, TEMPORADA, AVISO"
            className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#D8D2C8] focus:outline-none focus:ring-1 focus:ring-[#722F37] focus:border-[#722F37]"
          />
        </div>

        {/* Badge EN */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#1A1A1A]">
            Badge (EN) (Optional)
          </label>
          <input
            type="text"
            value={config.badgeEn || ""}
            onChange={(e) => {
              setSaveSuccess(false);
              setConfig((prev) => ({ ...prev, badgeEn: e.target.value }));
            }}
            placeholder="E.g.: HOLIDAYS, VIP ACCESS, NOTICE"
            className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#D8D2C8] focus:outline-none focus:ring-1 focus:ring-[#722F37] focus:border-[#722F37]"
          />
        </div>

        {/* Link URL */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-medium text-[#1A1A1A] flex items-center justify-between">
            <span>Enlace de Redirección (Opcional)</span>
            <span className="text-[10px] text-[#7A7A7A]">Ej: /#booking, /#services, o enlace externo</span>
          </label>
          <input
            type="text"
            value={config.linkUrl || ""}
            onChange={(e) => {
              setSaveSuccess(false);
              setConfig((prev) => ({ ...prev, linkUrl: e.target.value }));
            }}
            placeholder="Ej: /#booking o https://wa.me/19296257273"
            className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-[#D8D2C8] focus:outline-none focus:ring-1 focus:ring-[#722F37] focus:border-[#722F37]"
          />
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="space-y-2 pt-2">
        <label className="text-[11px] font-medium uppercase tracking-wider text-[#7A7A7A] flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-[#722F37]" />
          <span>Vista Previa en Vivo (Paleta Atelier Lujo)</span>
        </label>

        {config.enabled && (config.textEs || config.textEn) ? (
          <div className="w-full bg-[#722F37] text-[#E8C9A8] border border-[#E8C9A8]/30 rounded-xl py-3 px-4 shadow-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 overflow-hidden">
              {config.badgeEs && (
                <span className="px-2 py-0.5 rounded-full bg-[#E8C9A8] text-[#722F37] font-semibold text-[10px] tracking-widest uppercase shrink-0">
                  {config.badgeEs}
                </span>
              )}
              <p className="text-xs font-serif tracking-wide truncate">
                {config.textEs || config.textEn}
              </p>
            </div>

            {config.linkUrl && (
              <span className="shrink-0 flex items-center gap-1 text-[11px] text-[#E8C9A8] underline underline-offset-2 hover:text-white font-medium">
                <span>Ver Más</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-stone-500 text-xs text-center">
            {config.enabled
              ? "Introduce un texto para ver la vista previa del anuncio."
              : "La barra está desactivada (ON/OFF). Actívala para previsualizar."}
          </div>
        )}
      </div>
    </div>
  );
}
