"use client";

import { useState, useRef } from "react";
import {
  Download,
  Upload,
  Database,
  CheckCircle2,
  AlertCircle,
  FileJson,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import {
  getSavedSiteContent,
  saveSiteContent,
  sanitizeSiteContent,
  SiteContent,
  StudioBackupPayload,
} from "@/lib/contentStore";
import { ClientProfile, DEFAULT_CLIENTS } from "@/app/components/AdminClientCRM";

const CRM_STORAGE_KEY = "iva_admin_clients_v1";

export default function AdminBackupRestore() {
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
    details?: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Generates and downloads a complete studio JSON backup.
   * File format: iva-studio-backup-YYYY-MM-DD.json
   */
  const handleExportBackup = () => {
    try {
      setIsProcessing(true);
      const currentSiteContent: SiteContent = getSavedSiteContent();

      let currentCrmClients: ClientProfile[] = DEFAULT_CLIENTS;
      if (typeof window !== "undefined") {
        try {
          const rawClients = localStorage.getItem(CRM_STORAGE_KEY);
          if (rawClients) {
            const parsed = JSON.parse(rawClients);
            if (Array.isArray(parsed)) {
              currentCrmClients = parsed;
            }
          }
        } catch (e) {
          console.warn("Could not read CRM clients from localStorage:", e);
        }
      }

      const now = new Date();
      const dateStr = now.toISOString().split("T")[0];
      const filename = `iva-studio-backup-${dateStr}.json`;

      const payload: StudioBackupPayload = {
        version: 1,
        app: "iva-nail-art",
        exportedAt: now.toISOString(),
        siteContent: currentSiteContent,
        crmClients: currentCrmClients,
      };

      const jsonStr = JSON.stringify(payload, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);

      setStatusMessage({
        type: "success",
        text: `Copia descargada: "${filename}"`,
        details: `Incluye ${currentCrmClients.length} clientas del CRM, catálogo de servicios, galería, fotos y ajustes semanales.`,
      });
    } catch (err) {
      console.error("Export error:", err);
      setStatusMessage({
        type: "error",
        text: "Error al generar la copia de seguridad.",
        details: err instanceof Error ? err.message : "Error desconocido",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Handles selecting and validating a JSON backup file to restore.
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatusMessage(null);

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== "string") {
          throw new Error("No se pudo leer el archivo seleccionado.");
        }

        let parsed: unknown;
        try {
          parsed = JSON.parse(text);
        } catch {
          throw new Error("El archivo no contiene un formato JSON válido o está corrupto.");
        }

        // Schema validation
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          throw new Error("Estructura de archivo inválida. Se esperaba un objeto JSON.");
        }

        const candidate = parsed as Record<string, unknown>;

        if (candidate.app !== "iva-nail-art") {
          throw new Error(
            `El archivo no pertenece a IVA Nail Art (encontrado: "${typeof candidate.app === "string" ? candidate.app : "desconocido"}"). Debe ser un respaldo oficial generado por el estudio.`
          );
        }

        if (candidate.version !== 1) {
          throw new Error(
            `Versión de esquema no compatible (${String(candidate.version)}). Se requiere versión 1.`
          );
        }

        if (!candidate.siteContent || typeof candidate.siteContent !== "object") {
          throw new Error("El archivo no incluye el bloque de configuración del sitio (siteContent).");
        }

        // 1. Sanitize & save site content
        const sanitizedContent = sanitizeSiteContent(candidate.siteContent);
        saveSiteContent(sanitizedContent);

        // 2. Restore CRM clients if present
        let restoredClientsCount = 0;
        if (Array.isArray(candidate.crmClients) && typeof window !== "undefined") {
          localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(candidate.crmClients));
          restoredClientsCount = candidate.crmClients.length;
          window.dispatchEvent(new Event("iva-clients-updated"));
        }

        // 3. Dispatch global content updated event
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("iva-content-updated"));
        }

        // 4. Sync to server fallback endpoint
        try {
          const token = typeof window !== "undefined" ? localStorage.getItem("iva_admin_key") : null;
          await fetch("/api/admin/content", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(sanitizedContent),
          });
        } catch (apiErr) {
          console.warn("Server sync fallback warning:", apiErr);
        }

        setStatusMessage({
          type: "success",
          text: "¡Copia de seguridad restaurada exitosamente!",
          details: `Se restablecieron los textos, galería, disponibilidad semanal y ${restoredClientsCount} clientas en el CRM.`,
        });
      } catch (err) {
        console.error("Restore error:", err);
        setStatusMessage({
          type: "error",
          text: "Fallo en la restauración del archivo.",
          details: err instanceof Error ? err.message : "Error inesperado al validar el respaldo.",
        });
      } finally {
        setIsProcessing(false);
        // Reset file input so user can re-upload same file if desired
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };

    reader.onerror = () => {
      setIsProcessing(false);
      setStatusMessage({
        type: "error",
        text: "Error al leer el archivo desde el disco.",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EBE8E2] shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#EBE8E2]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#722F37] to-[#B76E79] flex items-center justify-center text-white shadow-sm">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-[#1A1A1A] flex items-center gap-2">
              Copia de Seguridad & Restauración
              <span className="text-[10px] font-sans font-semibold tracking-wider uppercase bg-[#FAF9F7] text-[#722F37] px-2 py-0.5 rounded-full border border-[#EBE8E2]">
                JSON v1
              </span>
            </h3>
            <p className="text-xs text-[#7A7A7A] mt-0.5">
              Exporta o importa el estado completo del estudio: CMS web, fotos, semáforo semanal y perfiles del CRM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#7A7A7A] bg-[#FAF9F7] px-3 py-1.5 rounded-lg border border-[#EBE8E2] w-fit">
          <ShieldCheck className="w-4 h-4 text-[#722F37]" />
          <span>Almacenamiento Seguro Local & Servidor</span>
        </div>
      </div>

      {/* Notification banner */}
      {statusMessage && (
        <div
          className={`mt-5 p-4 rounded-xl border flex items-start gap-3 transition-all ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : statusMessage.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-900"
              : "bg-blue-50 border-blue-200 text-blue-900"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold">{statusMessage.text}</p>
            {statusMessage.details && (
              <p className="text-xs mt-1 opacity-90">{statusMessage.details}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-xs opacity-60 hover:opacity-100 px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Action Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Export Panel */}
        <div className="p-5 rounded-xl border border-[#EBE8E2] bg-[#FAF9F7]/60 flex flex-col justify-between hover:border-[#722F37]/30 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileJson className="w-4 h-4 text-[#722F37]" />
              <h4 className="font-medium text-sm text-[#1A1A1A]">Exportar Copia de Seguridad</h4>
            </div>
            <p className="text-xs text-[#7A7A7A] leading-relaxed">
              Genera un archivo JSON descargable con todo el contenido personalizado de IVA Nail Art:
              fotos asignadas, precios de servicios, textos, disponibilidad semanal, avisos y ficha completa de clientas.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-[#EBE8E2]/60 flex items-center justify-between">
            <span className="text-[11px] text-[#7A7A7A] font-mono">
              iva-studio-backup-*.json
            </span>
            <button
              type="button"
              onClick={handleExportBackup}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#722F37] text-white hover:bg-[#5C242C] transition-all text-xs font-medium shadow-sm hover:shadow disabled:opacity-50"
            >
              {isProcessing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              Exportar Copia (.json)
            </button>
          </div>
        </div>

        {/* Import Panel */}
        <div className="p-5 rounded-xl border border-[#EBE8E2] bg-[#FAF9F7]/60 flex flex-col justify-between hover:border-[#722F37]/30 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Upload className="w-4 h-4 text-[#B76E79]" />
              <h4 className="font-medium text-sm text-[#1A1A1A]">Restaurar Copia de Seguridad</h4>
            </div>
            <p className="text-xs text-[#7A7A7A] leading-relaxed">
              Carga un archivo de respaldo previo para restablecer el estudio. Valida la integridad del esquema,
              actualiza el almacenamiento del navegador, notifica a los componentes activos y sincroniza con el servidor.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-[#EBE8E2]/60 flex items-center justify-between">
            <span className="text-[11px] text-[#7A7A7A]">
              Acepta archivos <span className="font-mono">.json</span>
            </span>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#722F37] text-[#722F37] hover:bg-[#FDF8F6] transition-all text-xs font-medium shadow-sm hover:shadow disabled:opacity-50"
            >
              {isProcessing ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              Restaurar Copia (.json)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
