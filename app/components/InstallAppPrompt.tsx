"use client";

import { useState, useEffect } from "react";
import { X, Download, Smartphone, Share, Plus } from "lucide-react";

interface InstallAppPromptProps {
  lang?: "en" | "es";
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallAppPrompt({ lang = "en" }: InstallAppPromptProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  const isEn = lang === "en";

  useEffect(() => {
    // Check if already installed
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);

    // Check if dismissed recently
    const dismissed = localStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      // Don't show for 7 days after dismissal
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) {
        return;
      }
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt (Chrome, Edge, etc.)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after 30 seconds of browsing
      setTimeout(() => setIsVisible(true), 30000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // For iOS, show after 30 seconds if not standalone
    if (isIOSDevice && !standalone) {
      setTimeout(() => setIsVisible(true), 30000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString());
  };

  if (isStandalone || !isVisible) return null;

  return (
    <>
      {/* Main Install Prompt */}
      <div
        className={`fixed bottom-32 left-1/2 -translate-x-1/2 z-[85] w-[calc(100%-2rem)] max-w-md transform transition-all duration-500 ${
          showIOSInstructions ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="bg-gradient-to-br from-[#4A0404] to-[#2a0202] rounded-2xl shadow-2xl overflow-hidden border border-[#D4AF37]/30">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-white/60 hover:text-white p-1 transition-colors z-10"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start gap-4">
              {/* App Icon */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#E8C9A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">💅</span>
              </div>

              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">IVA Nail Art</h3>
                <p className="text-white/70 text-sm mb-3">
                  {isEn
                    ? "Install our app for quick booking & exclusive offers!"
                    : "¡Instala nuestra app para reservas rápidas y ofertas exclusivas!"}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-white/10 text-white/90 text-xs px-2 py-1 rounded-full">
                    {isEn ? "⚡ Fast booking" : "⚡ Reserva rápida"}
                  </span>
                  <span className="bg-white/10 text-white/90 text-xs px-2 py-1 rounded-full">
                    {isEn ? "🔔 Notifications" : "🔔 Notificaciones"}
                  </span>
                  <span className="bg-white/10 text-white/90 text-xs px-2 py-1 rounded-full">
                    {isEn ? "📱 Works offline" : "📱 Sin conexión"}
                  </span>
                </div>

                {/* Install Button */}
                <button
                  onClick={handleInstall}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#E8C9A8] text-[#4A0404] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-[1.02] transition-all"
                >
                  {isIOS ? (
                    <>
                      <Share className="w-5 h-5" />
                      {isEn ? "Install on iPhone" : "Instalar en iPhone"}
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      {isEn ? "Install Free App" : "Instalar App Gratis"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#E8C9A8] to-[#D4AF37]"></div>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowIOSInstructions(false)}
          ></div>

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4A0404] to-[#5C1A1B] p-5 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#D4AF37] to-[#E8C9A8] rounded-2xl flex items-center justify-center shadow-lg mb-3">
                <span className="text-3xl">💅</span>
              </div>
              <h3 className="text-white font-bold text-xl">
                {isEn ? "Install IVA Nail Art" : "Instalar IVA Nail Art"}
              </h3>
            </div>

            {/* Steps */}
            <div className="p-5">
              <p className="text-gray-600 text-sm mb-4 text-center">
                {isEn
                  ? "Follow these steps to install our app on your iPhone:"
                  : "Sigue estos pasos para instalar nuestra app en tu iPhone:"}
              </p>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-[#007AFF] rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      {isEn ? 'Tap the "Share" button' : 'Toca el botón "Compartir"'}
                    </p>
                    <Share className="w-5 h-5 text-[#007AFF] mt-1" />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-[#007AFF] rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      {isEn ? 'Scroll and tap "Add to Home Screen"' : 'Desplaza y toca "Añadir a inicio"'}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Plus className="w-5 h-5 text-[#007AFF]" />
                      <Smartphone className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-[#007AFF] rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      {isEn ? 'Tap "Add" to install' : 'Toca "Añadir" para instalar'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSInstructions(false)}
                className="w-full mt-5 py-3 bg-gradient-to-r from-[#4A0404] to-[#5C1A1B] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                {isEn ? "Got it!" : "¡Entendido!"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
