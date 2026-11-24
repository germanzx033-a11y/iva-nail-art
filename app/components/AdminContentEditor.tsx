"use client";

import { useState, useEffect, useRef } from "react";
import {
  Save,
  RotateCcw,
  ExternalLink,
  Check,
  Image as ImageIcon,
  Type,
  Sparkles,
  Phone,
  Layers,
  Upload,
  Camera,
  X,
  Plus,
  Grid,
  Search,
} from "lucide-react";
import {
  SiteContent,
  DEFAULT_SITE_CONTENT,
  DEFAULT_SERVICE_IMAGES,
  DEFAULT_SERVICE_TEXTS,
  getSavedSiteContent,
  saveSiteContent,
  resetSiteContent,
  UploadedImageItem,
} from "@/lib/contentStore";

// Curated stock/portfolio images with nice human-readable labels
const PRESET_STUDIO_PHOTOS = [
  { label: "Trabajo 1 (Acrílico Esculpido Signature)", src: "/trabajo1.jpg", cat: "studio" },
  { label: "Trabajo 2 (Nail Art a Mano Alzada)", src: "/trabajo2.jpg", cat: "studio" },
  { label: "Trabajo 3 (Diseño Navideño & Terciopelo)", src: "/trabajo3.jpg", cat: "studio" },
  { label: "Portada Original de Estudio", src: "/portada.jpg", cat: "studio" },
  { label: "Aurora Chrome Gold", src: "/gallery/aurora-chrome-gold.jpg", cat: "editorial" },
  { label: "Blush Aura French", src: "/gallery/blush-aura-french.jpg", cat: "editorial" },
  { label: "Amber Aura Glaze", src: "/gallery/amber-aura.jpg", cat: "editorial" },
  { label: "Blue Stone Charms", src: "/gallery/blue-stone-gold-charms.jpg", cat: "editorial" },
  { label: "Milky White Square", src: "/gallery/milky-white-square.jpg", cat: "editorial" },
  { label: "Pastel Zebra French", src: "/gallery/pastel-zebra-french.jpg", cat: "editorial" },
  { label: "Chocolate Cat Eye", src: "/gallery/chocolate-cat-eye.jpg", cat: "editorial" },
  { label: "Lilac 3D Orchid", src: "/gallery/lilac-3d-orchid.jpg", cat: "editorial" },
  { label: "Floral Orange French", src: "/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg", cat: "editorial" },
  { label: "Leopard Micro-French", src: "/gallery/f0d71275-94d3-4325-9592-55cbe28a5bdd.jpg", cat: "editorial" },
  { label: "Gold Studded Haute French", src: "/gallery/2e0b31b1-9878-4a33-a0a9-6b505f577892.jpg", cat: "editorial" },
  { label: "Sculpted Acrylic Fruit & Swirls", src: "/gallery/810c6eb7-e2e7-49eb-87e4-c6867d09f390.jpg", cat: "editorial" },
  { label: "Liquid Gold French Smile", src: "/gallery/0252121b-f561-4b19-bf43-11cdd5a1f36a.jpg", cat: "editorial" },
];

const SERVICE_META: Record<string, { cat: string; catLabel: string }> = {
  a1: { cat: "acrylic", catLabel: "Acrílico Esculpido" },
  a2: { cat: "acrylic", catLabel: "Acrílico Mantenimiento" },
  a3: { cat: "acrylic", catLabel: "Acrílico Remoción" },
  m1: { cat: "manicure", catLabel: "Manicura en Seco" },
  m2: { cat: "manicure", catLabel: "Manicura en Gel" },
  m3: { cat: "manicure", catLabel: "Manicura Rusa" },
  m4: { cat: "manicure", catLabel: "Gel Estructurado" },
  m5: { cat: "manicure", catLabel: "Extensiones Soft Gel" },
  p1: { cat: "pedicure", catLabel: "Sets de Manos & Diseños" },
  p2: { cat: "pedicure", catLabel: "Sets de Manos & Diseños" },
  p3: { cat: "pedicure", catLabel: "Sets de Manos & Diseños" },
  p4: { cat: "pedicure", catLabel: "Sets de Manos & Diseños" },
  n1: { cat: "nailart", catLabel: "Nail Art Nivel 1" },
  n2: { cat: "nailart", catLabel: "Nail Art Nivel 2" },
  n3: { cat: "nailart", catLabel: "Nail Art Nivel 3" },
  n4: { cat: "nailart", catLabel: "Nail Art Efectos" },
  n5: { cat: "nailart", catLabel: "Nail Art Francesa" },
  e1: { cat: "extras", catLabel: "Servicio Extra" },
  e2: { cat: "extras", catLabel: "Servicio Extra" },
  e3: { cat: "extras", catLabel: "Servicio Extra" },
};

export default function AdminContentEditor() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [activeTab, setActiveTab] = useState<"hero" | "gallery" | "serviceCards" | "texts" | "contact">("hero");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  // Filter for services tab
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>("all");
  const [serviceSearch, setServiceSearch] = useState<string>("");

  // Photo picker state
  const [pickerTarget, setPickerTarget] = useState<{
    type: "hero" | "gallery" | "service";
    indexOrKey: number | string;
  } | null>(null);
  const [pickerCategory, setPickerCategory] = useState<"all" | "studio" | "uploaded" | "editorial">("all");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleServiceTextChange = (svcKey: string, langKey: "name" | "nameEs", val: string) => {
    setContent((prev) => {
      const existing = prev.serviceTexts?.[svcKey] || DEFAULT_SERVICE_TEXTS[svcKey] || { name: "", nameEs: "" };
      return {
        ...prev,
        serviceTexts: {
          ...(prev.serviceTexts || {}),
          [svcKey]: {
            ...existing,
            [langKey]: val,
          },
        },
      };
    });
  };

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
    if (confirm("¿Estás seguro de restablecer todos los textos e imágenes a los valores predeterminados de IVA Nail Art?")) {
      resetSiteContent();
      setContent(DEFAULT_SITE_CONTENT);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  // Compress image on mobile client before uploading to avoid huge payloads
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const maxDim = 1200;
          let { width, height } = img;
          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleMobileFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setIsUploading(true);

    try {
      // 1. Client-side compression
      const compressedDataUrl = await compressImage(file);

      // 2. Upload to server
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dataUrl: compressedDataUrl,
          name: file.name,
        }),
      });

      const data = await res.json();
      const finalUrl = data.url || compressedDataUrl;

      const newUpload: UploadedImageItem = {
        id: `upload-${Date.now()}`,
        src: finalUrl,
        name: file.name,
        timestamp: Date.now(),
      };

      const updatedUploads = [newUpload, ...(content.uploadedImages || [])];

      // If pickerTarget was active, assign directly
      const updatedHero = [...content.heroScenes];
      const updatedServiceImages = { ...(content.serviceImages || {}) };
      const updatedGallery = [...(content.galleryItems || [])];

      if (pickerTarget) {
        if (pickerTarget.type === "hero" && typeof pickerTarget.indexOrKey === "number") {
          updatedHero[pickerTarget.indexOrKey].src = finalUrl;
        } else if (pickerTarget.type === "service") {
          updatedServiceImages[pickerTarget.indexOrKey as string] = finalUrl;
        } else if (pickerTarget.type === "gallery" && typeof pickerTarget.indexOrKey === "number") {
          updatedGallery[pickerTarget.indexOrKey].src = finalUrl;
        }
        setPickerTarget(null);
      }

      const newContent: SiteContent = {
        ...content,
        uploadedImages: updatedUploads,
        heroScenes: updatedHero,
        serviceImages: updatedServiceImages,
        galleryItems: updatedGallery,
      };

      setContent(newContent);
      saveSiteContent(newContent);
      setUploadToast("¡Foto subida y asignada con éxito!");
      setTimeout(() => setUploadToast(null), 3000);
    } catch (err) {
      console.error("Upload error:", err);
      alert("No se pudo subir la foto. Intenta de nuevo.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const assignPhoto = (src: string) => {
    if (!pickerTarget) return;

    if (pickerTarget.type === "hero" && typeof pickerTarget.indexOrKey === "number") {
      const hero = [...content.heroScenes];
      hero[pickerTarget.indexOrKey].src = src;
      const updated = { ...content, heroScenes: hero };
      setContent(updated);
      saveSiteContent(updated);
    } else if (pickerTarget.type === "service") {
      const serviceImages = { ...(content.serviceImages || {}), [pickerTarget.indexOrKey as string]: src };
      const updated = { ...content, serviceImages };
      setContent(updated);
      saveSiteContent(updated);
    } else if (pickerTarget.type === "gallery" && typeof pickerTarget.indexOrKey === "number") {
      const gallery = [...(content.galleryItems || [])];
      gallery[pickerTarget.indexOrKey].src = src;
      const updated = { ...content, galleryItems: gallery };
      setContent(updated);
      saveSiteContent(updated);
    }

    setPickerTarget(null);
  };

  const allAvailablePhotos = [
    ...(content.uploadedImages || []).map((u) => ({ label: `Subida: ${u.name}`, src: u.src, cat: "uploaded" })),
    ...PRESET_STUDIO_PHOTOS,
  ];

  const filteredPhotos = allAvailablePhotos.filter((p) => {
    if (pickerCategory === "all") return true;
    return p.cat === pickerCategory;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hidden File Input for Mobile Camera / Gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleMobileFileUpload}
        className="hidden"
      />

      {/* Top Bar with Status and Actions */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EBE8E2] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#722F37] border border-rose-200 text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Studio Asset & Content CMS</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl text-[#1A1A1A]">Administrador de Fotos y Textos</h2>
          <p className="text-xs sm:text-sm text-[#7A7A7A]">
            Sube fotos directamente desde tu teléfono, cambia las fotos de portada, servicios y galería en 1 toque.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Upload className={`w-4 h-4 ${isUploading ? "animate-bounce" : ""}`} />
            <span>{isUploading ? "Subiendo Foto..." : "Subir Foto desde Celular"}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#722F37] to-[#8B3A44] hover:opacity-95 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-[#722F37]/20 transition-all cursor-pointer"
          >
            {savedSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? "¡Guardado!" : "Guardar Cambios"}</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-[#FAF9F7] hover:bg-[#F0EDE8] border border-[#EBE8E2] rounded-xl text-xs font-medium text-[#1A1A1A] transition-all"
            title="Ver sitio web"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={handleReset}
            title="Restablecer original"
            className="p-2.5 bg-[#FAF9F7] hover:bg-rose-50 hover:text-red-600 border border-[#EBE8E2] rounded-xl text-xs text-[#7A7A7A] transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {uploadToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn shadow-sm">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{uploadToast}</span>
        </div>
      )}

      {/* Main Tabs Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "hero", label: "Fotos de Portada (3 Escenas)", icon: ImageIcon },
          { id: "serviceCards", label: "Fotos y Nombres de Servicios", icon: Layers },
          { id: "gallery", label: "Galería & Lookbook", icon: Grid },
          { id: "texts", label: "Textos & Biografía", icon: Type },
          { id: "contact", label: "Teléfonos & Redes", icon: Phone },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#722F37] text-white shadow-md shadow-[#722F37]/20 font-medium"
                : "bg-white text-stone-600 hover:bg-[#FAF9F7] border border-[#EBE8E2]"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: HERO SCENES (PORTADA) */}
      {/* ========================================================================= */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-medium">3 Fotos Principales de Portada:</strong>
              Estas son las 3 imágenes grandes que las clientas ven al entrar a ivanailartny.com. Toca <strong>&quot;Cambiar Foto&quot;</strong> para elegir una foto de la galería o subir una nueva foto de acrílico desde tu celular.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.heroScenes.map((scene, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border border-[#EBE8E2] shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#722F37] uppercase tracking-wider">
                      Foto Escena #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPickerTarget({ type: "hero", indexOrKey: idx })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F7] hover:bg-[#722F37] hover:text-white text-[#722F37] text-xs font-semibold rounded-xl border border-stone-200 transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Cambiar Foto</span>
                    </button>
                  </div>

                  {/* Clean, Full Aspect Ratio Card */}
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-200 shadow-inner group">
                    <img
                      src={scene.src}
                      alt={`Escena ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/trabajo1.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-serif font-bold text-[#E8C9A8]">{scene.es[0]} {scene.es[1]}</p>
                      <p className="text-[11px] text-white/80 line-clamp-2 mt-0.5">{scene.noteEs}</p>
                    </div>
                  </div>
                </div>

                {/* Edit Texts for this Scene */}
                <div className="space-y-3 pt-3 border-t border-stone-100 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">Título de la Foto (Línea 1 y 2):</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={scene.es[0]}
                        onChange={(e) => {
                          const scenes = [...content.heroScenes];
                          scenes[idx].es = [e.target.value, scene.es[1]];
                          setContent({ ...content, heroScenes: scenes });
                        }}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-medium focus:bg-white focus:border-[#722F37]"
                        placeholder="Uñas acrílicas"
                      />
                      <input
                        type="text"
                        value={scene.es[1]}
                        onChange={(e) => {
                          const scenes = [...content.heroScenes];
                          scenes[idx].es = [scene.es[0], e.target.value];
                          setContent({ ...content, heroScenes: scenes });
                        }}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-medium focus:bg-white focus:border-[#722F37]"
                        placeholder="en Bay Ridge"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-700 block mb-1">Subtítulo / Nota Descriptiva:</label>
                    <textarea
                      rows={2}
                      value={scene.noteEs}
                      onChange={(e) => {
                        const scenes = [...content.heroScenes];
                        scenes[idx].noteEs = e.target.value;
                        setContent({ ...content, heroScenes: scenes });
                      }}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs focus:bg-white focus:border-[#722F37] resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FOTOS Y NOMBRES DE CADA SERVICIO */}
      {/* ========================================================================= */}
      {activeTab === "serviceCards" && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE8E2] shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
              <div>
                <h3 className="font-serif text-xl text-stone-900">Fotos y Nombres de Cada Servicio</h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
                  Cambia la foto y edita el nombre en español e inglés de cualquier servicio. Si una imagen muestra manos en vez de pies (como en las tarjetas de pedicura), puedes escribir el nombre correcto aquí mismo.
                </p>
              </div>

              {/* Quick Search */}
              <div className="relative w-full md:w-72 shrink-0">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar servicio o ID (ej: p1)..."
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37]"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: "all", label: "Todos (20)" },
                { id: "manicure", label: "Manicura (5)" },
                { id: "acrylic", label: "Acrílico (3)" },
                { id: "pedicure", label: "Diseños de Manos (4)" },
                { id: "nailart", label: "Nail Art (5)" },
                { id: "extras", label: "Extras (3)" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setServiceCategoryFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer shrink-0 ${
                    serviceCategoryFilter === f.id
                      ? "bg-[#722F37] text-white shadow-sm"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {Object.keys(DEFAULT_SERVICE_TEXTS)
                .filter((svcKey) => {
                  const meta = SERVICE_META[svcKey];
                  const texts = content.serviceTexts?.[svcKey] || DEFAULT_SERVICE_TEXTS[svcKey];
                  if (serviceCategoryFilter !== "all" && meta?.cat !== serviceCategoryFilter) {
                    return false;
                  }
                  if (serviceSearch.trim()) {
                    const q = serviceSearch.toLowerCase().trim();
                    const matchKey = svcKey.toLowerCase().includes(q);
                    const matchEs = (texts?.nameEs || "").toLowerCase().includes(q);
                    const matchEn = (texts?.name || "").toLowerCase().includes(q);
                    return matchKey || matchEs || matchEn;
                  }
                  return true;
                })
                .map((svcKey) => {
                  const meta = SERVICE_META[svcKey] || { cat: "general", catLabel: "Servicio" };
                  const texts = content.serviceTexts?.[svcKey] || DEFAULT_SERVICE_TEXTS[svcKey] || { name: "", nameEs: "" };
                  const currentImg =
                    content.serviceImages?.[svcKey] ||
                    DEFAULT_SERVICE_IMAGES[svcKey] ||
                    "/gallery/c61db860-4810-473d-9af3-90ea78e17226.jpg";

                  return (
                    <div
                      key={svcKey}
                      className="p-4 sm:p-5 bg-stone-50/80 rounded-2xl border border-stone-200/90 hover:border-stone-300 transition-all flex flex-col sm:flex-row gap-4 items-start shadow-xs"
                    >
                      {/* Photo Thumbnail + Change Button */}
                      <div className="flex sm:flex-col items-center gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                        <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-stone-900 border border-stone-300 shadow-sm shrink-0">
                          <img
                            src={currentImg}
                            alt={texts.nameEs || svcKey}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/trabajo1.jpg";
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setPickerTarget({ type: "service", indexOrKey: svcKey })}
                          className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:border-[#722F37] text-[11px] font-semibold text-[#722F37] hover:bg-stone-50 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Cambiar Foto</span>
                        </button>
                      </div>

                      {/* Manual Editable Fields */}
                      <div className="flex-1 w-full space-y-3">
                        <div className="flex items-center justify-between gap-2 border-b border-stone-200/60 pb-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-600 bg-stone-200/70 px-2 py-0.5 rounded">
                            ID: {svcKey}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#722F37]">
                            {meta.catLabel}
                          </span>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-800 mb-1">
                            Nombre en Español (se ve en la página)
                          </label>
                          <input
                            type="text"
                            value={texts.nameEs || ""}
                            onChange={(e) => handleServiceTextChange(svcKey, "nameEs", e.target.value)}
                            placeholder="Ej: Manicura Floral Artesanal"
                            className="w-full text-xs sm:text-sm px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 font-medium focus:outline-none focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                            Nombre en Inglés
                          </label>
                          <input
                            type="text"
                            value={texts.name || ""}
                            onChange={(e) => handleServiceTextChange(svcKey, "name", e.target.value)}
                            placeholder="E.g. Artisan Floral Manicure"
                            className="w-full text-xs sm:text-sm px-3 py-2 bg-white rounded-lg border border-stone-300 text-stone-900 font-medium focus:outline-none focus:border-[#722F37] focus:ring-1 focus:ring-[#722F37]"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: GALERÍA & LOOKBOOK */}
      {/* ========================================================================= */}
      {activeTab === "gallery" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#EBE8E2] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-serif text-lg text-stone-900">Fotos de la Galería y Portafolio</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Cambia cualquier foto de la galería, su título en español y el estilo que describe el set.
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#722F37] text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Nueva Foto</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {(content.galleryItems || []).map((item, idx) => (
                <div key={item.id || idx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-stone-900 border border-stone-300 group">
                    <img
                      src={item.src}
                      alt={item.altEs || item.alt}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/trabajo1.jpg";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setPickerTarget({ type: "gallery", indexOrKey: idx })}
                      className="absolute bottom-2 right-2 px-2.5 py-1.5 bg-black/75 backdrop-blur-sm text-white text-[11px] rounded-lg font-medium flex items-center gap-1"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>Cambiar</span>
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="text-[10px] font-semibold text-stone-600 block mb-1">Título del Diseño (Español):</label>
                      <input
                        type="text"
                        value={item.altEs || item.alt}
                        onChange={(e) => {
                          const gallery = [...(content.galleryItems || [])];
                          gallery[idx].altEs = e.target.value;
                          setContent({ ...content, galleryItems: gallery });
                        }}
                        className="w-full p-2 bg-white border border-stone-300 rounded-lg text-stone-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-stone-600 block mb-1">Estilo / Etiqueta:</label>
                      <input
                        type="text"
                        value={item.styleTag || ""}
                        onChange={(e) => {
                          const gallery = [...(content.galleryItems || [])];
                          gallery[idx].styleTag = e.target.value;
                          setContent({ ...content, galleryItems: gallery });
                        }}
                        className="w-full p-2 bg-white border border-stone-300 rounded-lg text-stone-700"
                        placeholder="ej. Acrílico Signature"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: TEXTOS & BIOGRAFÍA */}
      {/* ========================================================================= */}
      {activeTab === "texts" && (
        <div className="bg-white p-6 rounded-3xl border border-[#EBE8E2] shadow-sm space-y-5">
          <h3 className="font-serif text-lg text-stone-900 flex items-center gap-2">
            <Type className="w-4 h-4 text-[#722F37]" />
            <span>Nombres del Estudio & Biografía de Ivannía</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-stone-700 font-semibold block mb-1.5">Nombre del Negocio:</label>
              <input
                type="text"
                value={content.businessName}
                onChange={(e) => setContent({ ...content, businessName: e.target.value })}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-medium"
              />
            </div>

            <div>
              <label className="text-stone-700 font-semibold block mb-1.5">Nombre de la Artista:</label>
              <input
                type="text"
                value={content.aboutIva.name}
                onChange={(e) => setContent({ ...content, aboutIva: { ...content.aboutIva, name: e.target.value } })}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-medium"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-stone-100 text-xs">
            <div>
              <label className="text-stone-700 font-semibold block mb-1.5">Biografía de Ivannía (Español):</label>
              <textarea
                rows={4}
                value={content.aboutIva.bioEs}
                onChange={(e) => setContent({ ...content, aboutIva: { ...content.aboutIva, bioEs: e.target.value } })}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 leading-relaxed"
              />
            </div>

            <div>
              <label className="text-stone-700 font-semibold block mb-1.5">Biografía de Ivannía (English):</label>
              <textarea
                rows={3}
                value={content.aboutIva.bioEn}
                onChange={(e) => setContent({ ...content, aboutIva: { ...content.aboutIva, bioEn: e.target.value } })}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: CONTACTO & REDES */}
      {/* ========================================================================= */}
      {activeTab === "contact" && (
        <div className="bg-white p-6 rounded-3xl border border-[#EBE8E2] shadow-sm space-y-5">
          <h3 className="font-serif text-lg text-stone-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#722F37]" />
            <span>Datos de Contacto, Redes y Depósito</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-stone-700 font-semibold block mb-1.5">WhatsApp / Teléfono Directo:</label>
              <input
                type="text"
                value={content.phone}
                onChange={(e) => setContent({ ...content, phone: e.target.value })}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-medium"
              />
            </div>

            <div>
              <label className="text-stone-700 font-semibold block mb-1.5">Usuario de Instagram (@):</label>
              <input
                type="text"
                value={content.instagram}
                onChange={(e) => setContent({ ...content, instagram: e.target.value })}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-medium"
              />
            </div>

            <div>
              <label className="text-stone-700 font-semibold block mb-1.5">Ubicación del Estudio:</label>
              <input
                type="text"
                value={content.location}
                onChange={(e) => setContent({ ...content, location: e.target.value })}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-medium"
              />
            </div>

            <div>
              <label className="text-stone-700 font-semibold block mb-1.5">Depósito de Reserva ($ USD):</label>
              <input
                type="number"
                value={content.deposit}
                onChange={(e) => setContent({ ...content, deposit: Number(e.target.value) })}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 font-semibold"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SELECTOR PROFESIONAL DE FOTOS (HERO / SERVICIO / GALERÍA) */}
      {/* ========================================================================= */}
      {pickerTarget !== null && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl max-h-[85vh] sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div>
                <h3 className="font-serif text-lg text-stone-900">Seleccionar Foto</h3>
                <p className="text-xs text-stone-500">
                  Toca una foto para aplicarla o sube una nueva desde tu celular.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPickerTarget(null)}
                className="p-2 hover:bg-stone-200 rounded-full text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Upload & Filter Buttons */}
            <div className="p-3 border-b border-stone-200 bg-white flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-1.5 text-xs">
                {[
                  { id: "all", label: "Todas" },
                  { id: "studio", label: "Estudio Real" },
                  { id: "uploaded", label: "Mis Subidas" },
                  { id: "editorial", label: "Editorial" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setPickerCategory(f.id as "all" | "studio" | "uploaded" | "editorial")}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      pickerCategory === f.id
                        ? "bg-[#722F37] text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Tomar / Subir Foto</span>
              </button>
            </div>

            {/* Modal Photo Grid */}
            <div className="p-4 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredPhotos.map((photo, i) => (
                <div
                  key={`${photo.src}-${i}`}
                  onClick={() => assignPhoto(photo.src)}
                  className="group cursor-pointer rounded-2xl overflow-hidden border-2 border-stone-200 hover:border-[#722F37] relative aspect-[3/4] bg-stone-900 shadow-sm transition-all hover:scale-[1.02]"
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/trabajo1.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <p className="text-[11px] font-medium text-white leading-tight">{photo.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-stone-200 bg-stone-50 flex justify-end">
              <button
                type="button"
                onClick={() => setPickerTarget(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
