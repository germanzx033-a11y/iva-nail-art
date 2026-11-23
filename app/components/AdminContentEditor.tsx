"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Save,
  RotateCcw,
  ExternalLink,
  Check,
  Copy,
  Image as ImageIcon,
  Type,
  Sparkles,
  Phone,
  Clock,
  Shield,
  Layers,
  ChevronRight,
  Upload,
} from "lucide-react";
import {
  SiteContent,
  DEFAULT_SITE_CONTENT,
  getSavedSiteContent,
  saveSiteContent,
  resetSiteContent,
} from "@/lib/contentStore";

const AVAILABLE_IMAGES = [
  { label: "Trabajo 1 (Acrílico Esculpido)", src: "/trabajo1.jpg" },
  { label: "Trabajo 2 (Nail Art a Mano)", src: "/trabajo2.jpg" },
  { label: "Trabajo 3 (Diseño & Cotización)", src: "/trabajo3.jpg" },
  { label: "Portada Original", src: "/portada.jpg" },
  { label: "Aurora Chrome Gold", src: "/gallery/aurora-chrome-gold.jpg" },
  { label: "Blush Aura French", src: "/gallery/blush-aura-french.jpg" },
  { label: "Amber Aura", src: "/gallery/amber-aura.jpg" },
  { label: "Blue Stone Charms", src: "/gallery/blue-stone-gold-charms.jpg" },
  { label: "Milky White Square", src: "/gallery/milky-white-square.jpg" },
  { label: "Pastel Zebra French", src: "/gallery/pastel-zebra-french.jpg" },
  { label: "Chocolate Cat Eye", src: "/gallery/chocolate-cat-eye.jpg" },
  { label: "Lilac 3D Orchid", src: "/gallery/lilac-3d-orchid.jpg" },
];

export default function AdminContentEditor() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [activeTab, setActiveTab] = useState<"photos" | "texts" | "services" | "contact" | "policies">("photos");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [pickingPhotoScene, setPickingPhotoScene] = useState<number | null>(null);

  useEffect(() => {
    setContent(getSavedSiteContent());
  }, []);

  const handleSave = async () => {
    saveSiteContent(content);
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
    } catch (e) {
      console.warn("Server save error", e);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm("¿Estás seguro de restablecer todos los textos e imágenes a los valores predeterminados?")) {
      resetSiteContent();
      setContent(DEFAULT_SITE_CONTENT);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2500);
    } catch {}
  };

  const updateHeroScene = (index: number, field: string, value: any) => {
    setContent((prev) => {
      const scenes = [...prev.heroScenes];
      scenes[index] = { ...scenes[index], [field]: value };
      return { ...prev, heroScenes: scenes };
    });
  };

  const updateService = (index: number, field: string, value: any) => {
    setContent((prev) => {
      const services = [...prev.services];
      services[index] = { ...services[index], [field]: value };
      return { ...prev, services };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#EBE8E2] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#722F37] border border-rose-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gestor de Contenido & Web (CMS)</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl text-[#1A1A1A]">Editor Visual de la Página</h2>
          <p className="text-xs sm:text-sm text-[#7A7A7A]">
            Modifica las fotos de portada, nombres, textos de acrílico y datos de contacto de forma inmediata.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#722F37] to-[#8B3A44] hover:opacity-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-[#722F37]/20 transition-all cursor-pointer"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? "¡Guardado con Éxito!" : "Guardar Cambios"}</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FAF9F7] hover:bg-[#F0EDE8] border border-[#EBE8E2] rounded-xl text-xs sm:text-sm font-semibold text-[#1A1A1A] transition-all"
          >
            <span>Ver Web en Vivo</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#7A7A7A]" />
          </a>

          <button
            type="button"
            onClick={handleCopyJson}
            title="Copiar JSON de configuración"
            className="p-2.5 bg-[#FAF9F7] hover:bg-[#F0EDE8] border border-[#EBE8E2] rounded-xl text-xs text-[#7A7A7A] transition-all"
          >
            {copiedJson ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Restablecer valores originales"
            className="p-2.5 bg-[#FAF9F7] hover:bg-rose-50 hover:text-red-600 border border-[#EBE8E2] rounded-xl text-xs text-[#7A7A7A] transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Tus cambios han sido guardados localmente y transmitidos al servidor. Los verás reflejados al abrir la web.</span>
        </div>
      )}

      {/* Internal Navigation Sub-tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "photos", label: "Fotos de Portada & Hero", icon: ImageIcon },
          { id: "texts", label: "Nombres & Textos", icon: Type },
          { id: "services", label: "Servicios de Acrílico", icon: Layers },
          { id: "contact", label: "Contacto & Horarios", icon: Phone },
          { id: "policies", label: "Políticas & Depósito", icon: Shield },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-white text-[#722F37] border-2 border-[#722F37]/30 shadow-sm font-semibold"
                : "bg-[#FAF9F7] text-[#7A7A7A] hover:bg-white border border-[#EBE8E2]"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ============================================================ */}
      {/* TAB 1: FOTOS DE PORTADA & HERO */}
      {/* ============================================================ */}
      {activeTab === "photos" && (
        <div className="space-y-6">
          <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-medium">Control de las 3 Escenas de Portada:</strong>
              Puedes tocar el botón de &quot;Elegir de Galería&quot; en cualquiera de las 3 escenas para cambiar la foto al instante con fotos reales de acrílico y nail art, o pegar una dirección URL directa.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.heroScenes.map((scene, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#EBE8E2] shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-bold text-[#722F37] tracking-wider">
                      Foto Escena {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPickingPhotoScene(pickingPhotoScene === idx ? null : idx)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#722F37] bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-200 transition-colors"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>{pickingPhotoScene === idx ? "Cerrar Galería" : "Elegir Foto"}</span>
                    </button>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#140B0A] border border-[#EBE8E2] mb-3 group">
                    <Image
                      src={scene.src}
                      alt={`Foto Portada ${idx + 1}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        // Fallback if broken image URL
                        (e.target as HTMLImageElement).src = "/trabajo1.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-serif font-semibold">{scene.es[0]} {scene.es[1]}</p>
                      <p className="text-[10px] text-white/70 line-clamp-1">{scene.noteEs}</p>
                    </div>
                  </div>

                  {/* Quick Photo Selector Grid (if expanded) */}
                  {pickingPhotoScene === idx && (
                    <div className="p-3 bg-[#FAF9F7] rounded-xl border border-[#EBE8E2] mb-3 space-y-2 animate-fadeIn">
                      <p className="text-[11px] font-medium text-[#1A1A1A]">Toca una foto para asignarla:</p>
                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
                        {AVAILABLE_IMAGES.map((img) => (
                          <div
                            key={img.src}
                            onClick={() => {
                              updateHeroScene(idx, "src", img.src);
                              setPickingPhotoScene(null);
                            }}
                            className={`cursor-pointer rounded-lg overflow-hidden border-2 relative aspect-[3/4] ${
                              scene.src === img.src ? "border-[#722F37] ring-2 ring-[#722F37]/30" : "border-transparent hover:border-gray-300"
                            }`}
                          >
                            <Image src={img.src} alt={img.label} fill sizes="80px" className="object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom URL Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-[#7A7A7A] block">Ruta o URL de Imagen:</label>
                    <input
                      type="text"
                      value={scene.src}
                      onChange={(e) => updateHeroScene(idx, "src", e.target.value)}
                      placeholder="/trabajo1.jpg"
                      className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-[#722F37]"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
                  <div>
                    <label className="text-[11px] font-medium text-[#7A7A7A] block">Texto Principal (Español):</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="text"
                        value={scene.es[0]}
                        onChange={(e) => {
                          const newEs = [e.target.value, scene.es[1]];
                          updateHeroScene(idx, "es", newEs);
                        }}
                        className="text-xs p-2 bg-gray-50 border border-gray-200 rounded-lg"
                      />
                      <input
                        type="text"
                        value={scene.es[1]}
                        onChange={(e) => {
                          const newEs = [scene.es[0], e.target.value];
                          updateHeroScene(idx, "es", newEs);
                        }}
                        className="text-xs p-2 bg-gray-50 border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-[#7A7A7A] block">Subtítulo / Nota (Español):</label>
                    <textarea
                      rows={2}
                      value={scene.noteEs}
                      onChange={(e) => updateHeroScene(idx, "noteEs", e.target.value)}
                      className="w-full text-xs p-2 bg-gray-50 border border-gray-200 rounded-lg resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: NOMBRES & TEXTOS */}
      {/* ============================================================ */}
      {activeTab === "texts" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EBE8E2] shadow-sm space-y-5">
            <h3 className="font-serif text-lg text-[#1A1A1A] flex items-center gap-2">
              <Type className="w-4 h-4 text-[#722F37]" />
              <span>Identidad del Negocio & Bio de Ivannía</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1.5">Nombre del Estudio / Marca:</label>
                <input
                  type="text"
                  value={content.businessName}
                  onChange={(e) => setContent({ ...content, businessName: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1.5">Nombre de la Artista:</label>
                <input
                  type="text"
                  value={content.aboutIva.name}
                  onChange={(e) => setContent({ ...content, aboutIva: { ...content.aboutIva, name: e.target.value } })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 text-xs">
              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1.5">Bio / Historia de Ivannía (Español):</label>
                <textarea
                  rows={4}
                  value={content.aboutIva.bioEs}
                  onChange={(e) => setContent({ ...content, aboutIva: { ...content.aboutIva, bioEs: e.target.value } })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1.5">Bio / Historia de Ivannía (English):</label>
                <textarea
                  rows={3}
                  value={content.aboutIva.bioEn}
                  onChange={(e) => setContent({ ...content, aboutIva: { ...content.aboutIva, bioEn: e.target.value } })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: SERVICIOS DE ACRÍLICO */}
      {/* ============================================================ */}
      {activeTab === "services" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EBE8E2] shadow-sm space-y-5">
            <div>
              <h3 className="font-serif text-lg text-[#1A1A1A] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#722F37]" />
                <span>Servicios Base en el Selector de Cita</span>
              </h3>
              <p className="text-xs text-[#7A7A7A] mt-1">
                Configura los nombres y descripciones que las clientas ven al seleccionar su tratamiento en la portada.
              </p>
            </div>

            <div className="space-y-4">
              {content.services.map((svc, idx) => (
                <div key={svc.id} className="p-4 rounded-xl border border-gray-200 bg-[#FAF9F7] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#722F37]">Servicio #{idx + 1} ({svc.id})</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-500">Duración:</span>
                      <input
                        type="number"
                        value={svc.durationMin}
                        onChange={(e) => updateService(idx, "durationMin", Number(e.target.value))}
                        className="w-20 text-xs p-1.5 bg-white border border-gray-200 rounded-lg text-center"
                      />
                      <span className="text-[11px] text-gray-500">min</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-1">Nombre (Español):</label>
                      <input
                        type="text"
                        value={svc.nameEs}
                        onChange={(e) => updateService(idx, "nameEs", e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-200 rounded-lg font-medium text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-1">Nombre (English):</label>
                      <input
                        type="text"
                        value={svc.name}
                        onChange={(e) => updateService(idx, "name", e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-200 rounded-lg font-medium text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-1">Descripción (Español):</label>
                      <textarea
                        rows={2}
                        value={svc.descriptionEs}
                        onChange={(e) => updateService(idx, "descriptionEs", e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-500 block mb-1">Descripción (English):</label>
                      <textarea
                        rows={2}
                        value={svc.description}
                        onChange={(e) => updateService(idx, "description", e.target.value)}
                        className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-gray-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: CONTACTO & HORARIOS */}
      {/* ============================================================ */}
      {activeTab === "contact" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EBE8E2] shadow-sm space-y-5">
            <h3 className="font-serif text-lg text-[#1A1A1A] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#722F37]" />
              <span>Teléfono, Redes Sociales & Ubicación</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1.5">Teléfono / WhatsApp Directo:</label>
                <input
                  type="text"
                  value={content.phone}
                  onChange={(e) => setContent({ ...content, phone: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1.5">Número WhatsApp (sin signos para enlaces):</label>
                <input
                  type="text"
                  value={content.whatsappNumber}
                  onChange={(e) => setContent({ ...content, whatsappNumber: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1.5">Usuario de Instagram (@):</label>
                <input
                  type="text"
                  value={content.instagram}
                  onChange={(e) => setContent({ ...content, instagram: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="text-[#7A7A7A] font-medium block mb-1.5">Usuario de TikTok (@):</label>
                <input
                  type="text"
                  value={content.tiktok}
                  onChange={(e) => setContent({ ...content, tiktok: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[#7A7A7A] font-medium block mb-1.5">Ubicación del Estudio:</label>
                <input
                  type="text"
                  value={content.location}
                  onChange={(e) => setContent({ ...content, location: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: POLÍTICAS & DEPÓSITO */}
      {/* ============================================================ */}
      {activeTab === "policies" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EBE8E2] shadow-sm space-y-5">
            <h3 className="font-serif text-lg text-[#1A1A1A] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#722F37]" />
              <span>Depósito de Reserva & Cotización Privada</span>
            </h3>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs space-y-1">
              <span className="font-semibold block">Política de Precios Activa:</span>
              <p>
                Todos los precios de tratamientos permanecen <strong>ocultos al público</strong>. La web guía a la clienta a consultar directamente por WhatsApp, donde Ivannía cotiza de acuerdo con el largo y el diseño a medida.
              </p>
            </div>

            <div className="max-w-xs text-xs space-y-2">
              <label className="text-[#7A7A7A] font-medium block">Monto de Depósito de Reserva ($ USD):</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-semibold">$</span>
                <input
                  type="number"
                  value={content.deposit}
                  onChange={(e) => setContent({ ...content, deposit: Number(e.target.value) })}
                  className="w-28 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-semibold text-center"
                />
              </div>
              <p className="text-[11px] text-gray-500">
                Este monto se cobra por Zelle, Apple Pay o Venmo para asegurar el bloque exclusivo de tiempo.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
