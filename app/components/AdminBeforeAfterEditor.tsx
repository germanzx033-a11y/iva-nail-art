"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  Upload,
  Image as ImageIcon,
  ArrowLeftRight,
  Layers,
  X,
} from "lucide-react";
import {
  BeforeAfterConfig,
  DEFAULT_BEFORE_AFTER,
  getSavedSiteContent,
  saveSiteContent,
} from "@/lib/contentStore";
import BeforeAfterSlider from "./BeforeAfterSlider";

// Preset transformation pairs for 1-click application by Ivannía
const PRESET_TRANSFORMATION_PAIRS = [
  {
    name: "👑 Manicura Rusa Signature",
    beforeImage: "/gallery/afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg",
    afterImage: "/trabajo1.jpg",
    titleEs: "Transformación Signature",
    titleEn: "Signature Transformation",
    subtitleEs: "Manicura rusa profunda y arquitectura escultural en acrílico.",
    subtitleEn: "Russian dry manicure prep & sculpted acrylic apex architecture.",
  },
  {
    name: "🌸 Nail Art Escultural",
    beforeImage: "/gallery/241c7f28-5927-40de-8e0c-0a9c468846f0.jpg",
    afterImage: "/trabajo2.jpg",
    titleEs: "Nail Art a Mano Alzada & Estructura",
    titleEn: "Hand-Painted Art & Structure",
    subtitleEs: "De base natural a set escultural almendrado con diseño a mano alzada.",
    subtitleEn: "From natural base to sculpted almond set with bespoke hand-painted art.",
  },
  {
    name: "🎄 Velvet Red & Cinta Dorada",
    beforeImage: "/gallery/0ee48e92-e11b-42dc-8a05-93c1aac67179.jpg",
    afterImage: "/trabajo3.jpg",
    titleEs: "Holiday Velvet Red & Relieves Dorados",
    titleEn: "Holiday Velvet Red & Gold Accents",
    subtitleEs: "Efecto terciopelo magnético y relieves metálicos de alta gama.",
    subtitleEn: "Magnetic velvet finish with high-end metallic relief accents.",
  },
  {
    name: "✨ Gel Estructurado Glazed",
    beforeImage: "/gallery/bff1062d-a2d4-4432-af01-0853a1a8cc82.jpg",
    afterImage: "/gallery/1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg",
    titleEs: "Gel Estructurado & Nivelación Nude",
    titleEn: "Structured Gel & Nude Leveling",
    subtitleEs: "Fortalecimiento sobre uña natural con brillo glazed perlado.",
    subtitleEn: "Natural nail reinforcement with glazed pearl shine.",
  },
];

// Curated library photos for individual slot selection
const AVAILABLE_PHOTO_PRESETS = [
  { label: "Uña Natural / Preparación", src: "/gallery/afb39b9f-63de-4281-9d62-57670fc5f3b5.jpg", tag: "Before" },
  { label: "Base Previa Corta", src: "/gallery/241c7f28-5927-40de-8e0c-0a9c468846f0.jpg", tag: "Before" },
  { label: "Crecimiento Previo 3 Semanas", src: "/gallery/0ee48e92-e11b-42dc-8a05-93c1aac67179.jpg", tag: "Before" },
  { label: "Uña Natural Nude", src: "/gallery/bff1062d-a2d4-4432-af01-0853a1a8cc82.jpg", tag: "Before" },
  { label: "Acrílico Esculpido Signature", src: "/trabajo1.jpg", tag: "After" },
  { label: "Nail Art a Mano Alzada", src: "/trabajo2.jpg", tag: "After" },
  { label: "Velvet Red & Cinta Dorada", src: "/trabajo3.jpg", tag: "After" },
  { label: "Champagne Glazed Finish", src: "/gallery/1c77f4d1-58a0-4b2f-b1ca-f7054eeb9627.jpg", tag: "After" },
  { label: "Floral Orange French", src: "/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg", tag: "After" },
  { label: "Liquid Gold French Smile", src: "/gallery/0252121b-f561-4b19-bf43-11cdd5a1f36a.jpg", tag: "After" },
  { label: "Sculpted Acrylic Fruits", src: "/gallery/810c6eb7-e2e7-49eb-87e4-c6867d09f390.jpg", tag: "After" },
  { label: "Delicate Negative Space", src: "/gallery/2b1d20c5-dd9d-45d5-85eb-da7821a34743.jpg", tag: "After" },
];

export default function AdminBeforeAfterEditor() {
  const [config, setConfig] = useState<BeforeAfterConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const site = getSavedSiteContent();
        if (site?.beforeAfter) return site.beforeAfter;
      } catch (e) {
        console.warn("Could not load initial before/after admin config:", e);
      }
    }
    return DEFAULT_BEFORE_AFTER;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Uploading state
  const [uploadingTarget, setUploadingTarget] = useState<"before" | "after" | null>(null);

  // Preset picker modal state
  const [activePickerTarget, setActivePickerTarget] = useState<"before" | "after" | null>(null);

  // Hidden file input refs
  const beforeFileInputRef = useRef<HTMLInputElement>(null);
  const afterFileInputRef = useRef<HTMLInputElement>(null);

  // Sync when storage changes
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const site = getSavedSiteContent();
        if (site?.beforeAfter) {
          setConfig(site.beforeAfter);
        }
      } catch (err) {
        console.warn("Could not reload before/after admin config:", err);
      }
    };
    window.addEventListener("iva-content-updated", handleUpdate);
    return () => window.removeEventListener("iva-content-updated", handleUpdate);
  }, []);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "before" | "after"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingTarget(target);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = typeof window !== "undefined" ? localStorage.getItem("iva_admin_key") : null;
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed with status ${res.status}`);
      }

      const data = await res.json();
      if (data.url) {
        setConfig((prev) => ({
          ...prev,
          [target === "before" ? "beforeImage" : "afterImage"]: data.url,
        }));
      } else {
        throw new Error(data.error || "No URL returned from upload");
      }
    } catch (err: unknown) {
      console.error("Upload error:", err);
      setError(
        err instanceof Error
          ? `Error al subir imagen: ${err.message}`
          : "Error al subir la imagen seleccionada."
      );
    } finally {
      setUploadingTarget(null);
      // Reset input value so same file can be selected again
      e.target.value = "";
    }
  };

  const handleSwapImages = () => {
    setConfig((prev) => ({
      ...prev,
      beforeImage: prev.afterImage,
      afterImage: prev.beforeImage,
    }));
  };

  const handleApplyPreset = (preset: (typeof PRESET_TRANSFORMATION_PAIRS)[0]) => {
    setConfig((prev) => ({
      ...prev,
      beforeImage: preset.beforeImage,
      afterImage: preset.afterImage,
      titleEs: preset.titleEs,
      titleEn: preset.titleEn,
      subtitleEs: preset.subtitleEs,
      subtitleEn: preset.subtitleEn,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);

    const sanitizedConfig: BeforeAfterConfig = {
      enabled: Boolean(config.enabled),
      beforeImage: config.beforeImage ? config.beforeImage.trim() : DEFAULT_BEFORE_AFTER.beforeImage,
      afterImage: config.afterImage ? config.afterImage.trim() : DEFAULT_BEFORE_AFTER.afterImage,
      titleEs: config.titleEs ? config.titleEs.trim() : DEFAULT_BEFORE_AFTER.titleEs,
      titleEn: config.titleEn ? config.titleEn.trim() : DEFAULT_BEFORE_AFTER.titleEn,
      subtitleEs: config.subtitleEs ? config.subtitleEs.trim() : "",
      subtitleEn: config.subtitleEn ? config.subtitleEn.trim() : "",
    };

    try {
      const currentSite = getSavedSiteContent();
      const updatedSite = {
        ...currentSite,
        beforeAfter: sanitizedConfig,
      };

      // 1. Save locally
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
        console.warn("API sync fallback skipped:", apiErr);
      }

      // 3. Dispatch broadcast event for live reactive updates
      window.dispatchEvent(new Event("iva-content-updated"));

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err: unknown) {
      console.error("Failed to save before/after config:", err);
      setError("Error al guardar la configuración de Antes y Después.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "¿Restablecer la configuración del comparador de Antes y Después a los valores iniciales de lujo?"
      )
    ) {
      setConfig(DEFAULT_BEFORE_AFTER);
    }
  };

  return (
    <div className="bg-[#1C0F0D]/85 border border-[#D4A574]/30 rounded-2xl p-5 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden">
      {/* Decorative Gold Glow Header */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent opacity-75" />

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={beforeFileInputRef}
        onChange={(e) => handleFileUpload(e, "before")}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={afterFileInputRef}
        onChange={(e) => handleFileUpload(e, "after")}
        accept="image/*"
        className="hidden"
      />

      {/* Card Header & Main Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D4A574]/20">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#722F37]/40 border border-[#D4A574]/40 text-[#E8C9A8]">
              <Sparkles className="w-5 h-5 text-[#D4A574]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#F5E6D3] tracking-wide">
                Módulo Antes y Después / Before & After Slider
              </h2>
              <p className="text-xs sm:text-sm text-[#D4A574]/80 mt-0.5">
                Comparador interactivo de transformaciones en la página principal (R5)
              </p>
            </div>
          </div>
        </div>

        {/* ON / OFF Switch */}
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              config.enabled
                ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                : "bg-neutral-900 border-neutral-700 text-neutral-400"
            }`}
          >
            {config.enabled ? "ACTIVO / VISIBLE" : "DESACTIVADO"}
          </span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-13 h-7 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-[#0E0706] after:content-[''] after:absolute after:top-[2px] after:left-[3px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#722F37] peer-checked:border-[#D4A574] border border-neutral-700" />
          </label>
        </div>
      </div>

      {/* Preset Transformation Packs */}
      <div className="mt-6">
        <label className="block text-xs font-semibold text-[#E8C9A8] uppercase tracking-wider mb-2">
          ✨ Sets Preconfigurados de Atelier (1 Clic):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESET_TRANSFORMATION_PAIRS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="text-left p-3 rounded-xl bg-[#0E0706]/70 border border-[#D4A574]/25 hover:border-[#D4A574] hover:bg-[#722F37]/20 transition-all text-xs group"
            >
              <span className="font-semibold text-[#F5E6D3] group-hover:text-[#E8C9A8] block">
                {preset.name}
              </span>
              <span className="text-[11px] text-[#D4A574]/75 truncate block mt-0.5">
                {preset.titleEs}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Image Slots: Before & After */}
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* Swap Button in Middle */}
        <button
          type="button"
          onClick={handleSwapImages}
          title="Intercambiar fotos de Antes y Después"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#722F37] border border-[#D4A574] text-[#E8C9A8] shadow-lg hover:scale-110 active:scale-95 transition-all"
        >
          <ArrowLeftRight className="w-4 h-4 text-[#E8C9A8]" />
        </button>

        {/* 1. Slot: Foto del Antes */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0E0706]/75 border border-[#D4A574]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider text-[#E8C9A8] uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4A574]" />
                Foto del Antes (Uña natural / Crecimiento)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-black/60 text-[#D4A574]/90 border border-white/5">
                LADO IZQUIERDO
              </span>
            </div>

            {/* Thumbnail Preview */}
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-black/80 border border-white/10 mb-3 group">
              {config.beforeImage ? (
                <img
                  src={config.beforeImage}
                  alt="Vista previa Antes"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 text-xs">
                  <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
                  <span>Sin imagen asignada</span>
                </div>
              )}
              {uploadingTarget === "before" && (
                <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-xs text-[#E8C9A8] font-medium gap-2">
                  <div className="w-4 h-4 border-2 border-[#D4A574] border-t-transparent rounded-full animate-spin" />
                  <span>Subiendo foto...</span>
                </div>
              )}
            </div>

            {/* Quick Actions for Before Slot */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => beforeFileInputRef.current?.click()}
                disabled={uploadingTarget === "before"}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#722F37]/40 hover:bg-[#722F37]/70 border border-[#D4A574]/40 text-[#E8C9A8] text-xs font-semibold transition-all disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5 text-[#D4A574]" />
                <span>Subir Foto</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePickerTarget("before")}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0E0706] hover:bg-[#1C0F0D] border border-[#D4A574]/40 text-[#E8C9A8] text-xs font-semibold transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-[#D4A574]" />
                <span>Elegir Preset</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#D4A574]/80 mb-1">
              Ruta o URL de Imagen:
            </label>
            <input
              type="text"
              value={config.beforeImage}
              onChange={(e) => setConfig({ ...config, beforeImage: e.target.value })}
              placeholder="/gallery/... o https://..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-black/60 border border-neutral-700 text-[#F5E6D3] focus:border-[#D4A574] focus:outline-none"
            />
          </div>
        </div>

        {/* 2. Slot: Foto del Después */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0E0706]/75 border border-[#D4A574]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider text-[#E8C9A8] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#D4A574]" />
                Foto del Después (Resultado Ruso / Esculpido)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#722F37]/60 text-[#E8C9A8] border border-white/5">
                LADO DERECHO
              </span>
            </div>

            {/* Thumbnail Preview */}
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-black/80 border border-white/10 mb-3 group">
              {config.afterImage ? (
                <img
                  src={config.afterImage}
                  alt="Vista previa Después"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 text-xs">
                  <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
                  <span>Sin imagen asignada</span>
                </div>
              )}
              {uploadingTarget === "after" && (
                <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-xs text-[#E8C9A8] font-medium gap-2">
                  <div className="w-4 h-4 border-2 border-[#D4A574] border-t-transparent rounded-full animate-spin" />
                  <span>Subiendo foto...</span>
                </div>
              )}
            </div>

            {/* Quick Actions for After Slot */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                type="button"
                onClick={() => afterFileInputRef.current?.click()}
                disabled={uploadingTarget === "after"}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#722F37]/40 hover:bg-[#722F37]/70 border border-[#D4A574]/40 text-[#E8C9A8] text-xs font-semibold transition-all disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5 text-[#D4A574]" />
                <span>Subir Foto</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePickerTarget("after")}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0E0706] hover:bg-[#1C0F0D] border border-[#D4A574]/40 text-[#E8C9A8] text-xs font-semibold transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-[#D4A574]" />
                <span>Elegir Preset</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#D4A574]/80 mb-1">
              Ruta o URL de Imagen:
            </label>
            <input
              type="text"
              value={config.afterImage}
              onChange={(e) => setConfig({ ...config, afterImage: e.target.value })}
              placeholder="/gallery/... o https://..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-black/60 border border-neutral-700 text-[#F5E6D3] focus:border-[#D4A574] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Preset Picker Modal */}
      {activePickerTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1C0F0D] border border-[#D4A574]/50 rounded-2xl p-5 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#D4A574]/20 mb-4">
              <h3 className="text-sm sm:text-base font-serif text-[#F5E6D3]">
                Seleccionar foto para{" "}
                <span className="text-[#D4A574] uppercase font-sans font-bold">
                  {activePickerTarget === "before" ? "Antes (Izquierda)" : "Después (Derecha)"}
                </span>
              </h3>
              <button
                type="button"
                onClick={() => setActivePickerTarget(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#E8C9A8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVAILABLE_PHOTO_PRESETS.map((photo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setConfig((prev) => ({
                      ...prev,
                      [activePickerTarget === "before" ? "beforeImage" : "afterImage"]: photo.src,
                    }));
                    setActivePickerTarget(null);
                  }}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-700 hover:border-[#D4A574] transition-all text-left bg-black"
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-2">
                    <span className="text-[10px] font-bold text-white leading-tight drop-shadow">
                      {photo.label}
                    </span>
                    <span className="text-[9px] text-[#D4A574] mt-0.5">{photo.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bilingual Titles & Subtitles */}
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-[#D4A574]/20">
        {/* Spanish Title & Subtitle */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#E8C9A8] uppercase tracking-wider block">
            🇪🇸 Textos en Español
          </span>
          <div>
            <label className="block text-[11px] text-[#D4A574]/80 mb-1">Título (ES):</label>
            <input
              type="text"
              value={config.titleEs}
              onChange={(e) => setConfig({ ...config, titleEs: e.target.value })}
              placeholder="Ej: Transformación Signature"
              className="w-full px-3 py-2 text-xs rounded-lg bg-black/60 border border-neutral-700 text-[#F5E6D3] focus:border-[#D4A574] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#D4A574]/80 mb-1">Subtítulo (ES):</label>
            <textarea
              rows={2}
              value={config.subtitleEs || ""}
              onChange={(e) => setConfig({ ...config, subtitleEs: e.target.value })}
              placeholder="Ej: Manicura rusa profunda y arquitectura escultural en acrílico."
              className="w-full px-3 py-2 text-xs rounded-lg bg-black/60 border border-neutral-700 text-[#F5E6D3] focus:border-[#D4A574] focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* English Title & Subtitle */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-[#E8C9A8] uppercase tracking-wider block">
            🇺🇸 English Copy
          </span>
          <div>
            <label className="block text-[11px] text-[#D4A574]/80 mb-1">Title (EN):</label>
            <input
              type="text"
              value={config.titleEn}
              onChange={(e) => setConfig({ ...config, titleEn: e.target.value })}
              placeholder="e.g. Signature Transformation"
              className="w-full px-3 py-2 text-xs rounded-lg bg-black/60 border border-neutral-700 text-[#F5E6D3] focus:border-[#D4A574] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] text-[#D4A574]/80 mb-1">Subtitle (EN):</label>
            <textarea
              rows={2}
              value={config.subtitleEn || ""}
              onChange={(e) => setConfig({ ...config, subtitleEn: e.target.value })}
              placeholder="e.g. Russian dry manicure prep & sculpted acrylic apex architecture."
              className="w-full px-3 py-2 text-xs rounded-lg bg-black/60 border border-neutral-700 text-[#F5E6D3] focus:border-[#D4A574] focus:outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* Interactive Live Preview Slider */}
      <div className="mt-8 pt-6 border-t border-[#D4A574]/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#D4A574]" />
            <h3 className="text-xs sm:text-sm font-semibold text-[#E8C9A8] uppercase tracking-wider">
              Vista Previa Interactiva en Vivo / Live Preview
            </h3>
          </div>
          <span className="text-[11px] text-[#D4A574]/70">
            Prueba arrastrar el control o usar las flechas del teclado
          </span>
        </div>

        {config.enabled ? (
          <div className="p-3 sm:p-5 rounded-xl bg-black/50 border border-[#D4A574]/20">
            <BeforeAfterSlider
              lang="es"
              customConfig={config}
              showCardContainer={false}
              className="max-w-2xl mx-auto"
            />
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-black/40 border border-dashed border-neutral-700 text-center text-xs text-neutral-400">
            El módulo se encuentra desactivado. Actívalo para visualizarlo en vivo en la página principal.
          </div>
        )}
      </div>

      {/* Notifications: Success & Error */}
      {saveSuccess && (
        <div className="mt-6 flex items-center gap-2 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>¡Configuración de Antes y Después guardada y sincronizada exitosamente!</span>
        </div>
      )}

      {error && (
        <div className="mt-6 flex items-center gap-2 p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Action Buttons: Save & Reset */}
      <div className="mt-8 pt-6 border-t border-[#D4A574]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-700 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restablecer por Defecto</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A574] via-[#E8C9A8] to-[#B3874B] text-[#0E0706] hover:brightness-110 active:scale-95 text-xs font-bold tracking-wide shadow-[0_4px_18px_rgba(212,165,116,0.35)] transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-[#0E0706] border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isSaving ? "Guardando..." : "Guardar Cambios"}</span>
        </button>
      </div>
    </div>
  );
}
