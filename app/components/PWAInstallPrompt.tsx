"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Share, PlusSquare, Sparkles, Download, Check } from "lucide-react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const STORAGE_KEY = "iva_pwa_dismissed_until";
const SNOOZE_DAYS = 7;
const PERMANENT_DAYS = 45;

export default function PWAInstallPrompt() {
  const pathname = usePathname();
  const isSpanish = pathname?.startsWith("/es") ?? false;

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android" | "other" | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial browser-only client mount
    setMounted(true);

    // 1. Check if already installed / standalone
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 2. Check dismissal timestamp
    try {
      const dismissedUntil = localStorage.getItem(STORAGE_KEY);
      if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
        return;
      }
    } catch {
      // Ignore storage errors (private mode)
    }

    // 3. Platform detection
    const ua = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const isAndroid = /android/.test(ua);

    if (isIos) {
      setPlatform("ios");
      // Gentle delay for iOS users so they can enjoy the hero first
      const timer = setTimeout(() => setIsOpen(true), 4000);
      return () => clearTimeout(timer);
    } else if (isAndroid) {
      setPlatform("android");
    } else {
      setPlatform("other");
    }

    // 4. Android / Chrome beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after a short delay
      setTimeout(() => setIsOpen(true), 3500);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsOpen(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleDismiss = (days: number = SNOOZE_DAYS) => {
    setIsOpen(false);
    try {
      const until = Date.now() + days * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, until.toString());
    } catch {
      // Storage unavailable
    }
  };

  const handleNativeInstall = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstalledSuccess(true);
        setTimeout(() => {
          setIsInstalled(true);
          setIsOpen(false);
        }, 1500);
      } else {
        handleDismiss(3);
      }
    } catch (err) {
      console.warn("PWA install error:", err);
      handleDismiss(1);
    }
  };

  if (!mounted || isInstalled || !isOpen) {
    return null;
  }

  // Bilingual text dictionary
  const t = {
    badge: isSpanish ? "APP OFICIAL" : "OFFICIAL APP",
    title: isSpanish ? "Instalar IVA Nail Art en tu Móvil" : "Install IVA Nail Art on Your Phone",
    subtitle: isSpanish
      ? "Acceso directo en 1 toque a citas, fotos de diseños y cuidados de uñas sin abrir el navegador."
      : "1-tap direct access to bookings, custom nail art galleries & aftercare guides without typing a URL.",
    iosStep1: isSpanish ? "1. Toca el botón Compartir" : "1. Tap the Share button",
    iosStep1Detail: isSpanish ? "en la barra inferior de Safari" : "in Safari's bottom toolbar",
    iosStep2: isSpanish ? "2. Selecciona 'Añadir a pantalla de inicio'" : "2. Tap 'Add to Home Screen'",
    iosStep2Detail: isSpanish ? "busca el ícono con el signo +" : "look for the icon with the + symbol",
    androidBtn: isSpanish ? "Instalar en 1 Toque" : "Install with 1-Tap",
    installed: isSpanish ? "¡Instalada con éxito!" : "Installed successfully!",
    later: isSpanish ? "Quizás más tarde" : "Maybe later",
    dontShowAgain: isSpanish ? "No volver a mostrar" : "Don't show again",
  };

  return (
    <aside
      aria-label="Install App"
      className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[80] animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#D4A574]/30 bg-[#0E0706]/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-[#F4EBE1]">
        {/* Subtle Luxury Gold Ambient Glow */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[#D4A574]/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#B76E79]/15 blur-2xl" />

        {/* Close Button */}
        <button
          onClick={() => handleDismiss(SNOOZE_DAYS)}
          aria-label="Close install prompt"
          className="absolute top-4 right-4 rounded-full p-1.5 text-[#F4EBE1]/60 hover:text-[#F4EBE1] hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Row */}
        <div className="flex items-start gap-3.5 pr-6">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-[#D4A574]/40 bg-gradient-to-br from-[#1b0d0c] to-[#0E0706] p-1.5 shadow-md">
            <Image
              src="/logo-iva.png"
              alt="IVA Nail Art"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4A574]/40 bg-[#D4A574]/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#D4A574] uppercase">
              <Sparkles className="h-2.5 w-2.5" />
              <span>{t.badge}</span>
            </div>
            <h3 className="mt-1 font-display text-base font-medium text-[#F4EBE1] leading-snug">
              {t.title}
            </h3>
          </div>
        </div>

        <p className="mt-2.5 text-xs text-[#F4EBE1]/75 leading-relaxed font-light">
          {t.subtitle}
        </p>

        {/* Platform-Specific Instructions */}
        {platform === "ios" ? (
          <div className="mt-4 space-y-2 rounded-xl border border-[#D4A574]/20 bg-[#160c0b]/80 p-3 text-xs">
            <div className="flex items-center gap-2.5 text-[#F4EBE1]">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#D4A574]/15 text-[#D4A574]">
                <Share className="h-4 w-4" />
              </div>
              <div>
                <span className="font-medium text-[#F4EBE1]">{t.iosStep1}</span>
                <span className="block text-[11px] text-[#F4EBE1]/60">{t.iosStep1Detail}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-[#F4EBE1] pt-1 border-t border-[#D4A574]/10">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#D4A574]/15 text-[#D4A574]">
                <PlusSquare className="h-4 w-4" />
              </div>
              <div>
                <span className="font-medium text-[#D4A574]">{t.iosStep2}</span>
                <span className="block text-[11px] text-[#F4EBE1]/60">{t.iosStep2Detail}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={handleNativeInstall}
              disabled={installedSuccess}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A574] to-[#B8864E] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0E0706] shadow-lg shadow-[#D4A574]/20 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-80"
            >
              {installedSuccess ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>{t.installed}</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>{t.androidBtn}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-[#F4EBE1]/50 border-t border-white/5 pt-3">
          <button
            onClick={() => handleDismiss(SNOOZE_DAYS)}
            className="hover:text-[#D4A574] transition-colors"
          >
            {t.later}
          </button>
          <button
            onClick={() => handleDismiss(PERMANENT_DAYS)}
            className="hover:text-[#D4A574] transition-colors text-[10px]"
          >
            {t.dontShowAgain}
          </button>
        </div>
      </div>
    </aside>
  );
}
