"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";

interface PWAContextType {
  isInstalled: boolean;
  isOnline: boolean;
  canInstall: boolean;
  notificationPermission: NotificationPermission | null;
  installApp: () => Promise<void>;
  requestNotifications: () => Promise<boolean>;
  sendNotification: (title: string, options?: NotificationOptions) => void;
}

const PWAContext = createContext<PWAContextType | null>(null);

export const usePWA = () => {
  const context = useContext(PWAContext);
  if (!context) {
    return {
      isInstalled: false,
      isOnline: true,
      canInstall: false,
      notificationPermission: null as NotificationPermission | null,
      installApp: async () => {},
      requestNotifications: async () => false,
      sendNotification: () => {},
    };
  }
  return context;
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAProvider({ children }: { children: ReactNode }) {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [canInstall, setCanInstall] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[PWA] Service Worker registered:", registration.scope);

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  console.log("[PWA] New version available");
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log("[PWA] Service Worker registration failed:", error);
        });
    }

    // Check if app is installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      const isIosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
      setIsInstalled(isStandalone || isIosStandalone);
    };
    checkInstalled();

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
      // Show install banner after 3 seconds
      setTimeout(() => setShowInstallBanner(true), 3000);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    };
    window.addEventListener("appinstalled", handleAppInstalled);

    // Online/Offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check notification permission
    if ("Notification" in window) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reads a browser-only value once on mount (not available during SSR)
      setNotificationPermission(Notification.permission);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setCanInstall(false);
    setShowInstallBanner(false);
  };

  const requestNotifications = async (): Promise<boolean> => {
    if (!("Notification" in window)) {
      console.log("[PWA] Notifications not supported");
      return false;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);

    if (permission === "granted") {
      try {
        const registration = await navigator.serviceWorker.ready;

        // Check if push manager is available
        if (!registration.pushManager) {
          console.log("[PWA] Push manager not available");
          return true; // Still return true since notifications work
        }

        return true;
      } catch (error) {
        console.log("[PWA] Push subscription failed:", error);
        return true; // Notifications still work locally
      }
    }

    return false;
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (notificationPermission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          icon: "/icon-192.png",
          badge: "/icon-192.png",
          ...options,
        });
      });
    }
  };

  return (
    <PWAContext.Provider
      value={{
        isInstalled,
        isOnline,
        canInstall,
        notificationPermission,
        installApp,
        requestNotifications,
        sendNotification,
      }}
    >
      {children}

      {/* Offline banner: hidden until the browser fires a real "offline" event */}
      <div
        role="status"
        aria-live="polite"
        hidden={isOnline}
        className="fixed left-0 right-0 top-0 z-[9999] bg-[#5C1A1B] py-2 text-center text-sm text-white"
      >
        Sin conexión · You&apos;re offline. Some features may be limited.
      </div>

      {/* Install Prompt */}
      {showInstallBanner && canInstall && !isInstalled && (
        <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-80 z-[90] bg-[#1A0F0D] rounded-xl shadow-2xl border border-[#F4EBE1]/15 p-5 animate-slide-up">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#B76E79] to-[#722F37] rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-serif text-xl">IVA</span>
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg text-[#F4EBE1] mb-1">Install IVA App</h3>
              <p className="text-sm text-[#F4EBE1]/75 mb-3">
                Get quick access, offline support & notifications
              </p>
              <div className="flex gap-2">
                <button
                  onClick={installApp}
                  className="flex-1 py-2 bg-gradient-to-r from-[#722F37] to-[#8B3A44] text-white text-xs uppercase tracking-wider rounded-lg"
                >
                  Install
                </button>
                <button
                  onClick={() => setShowInstallBanner(false)}
                  className="px-4 py-2 text-[#F4EBE1]/75 text-xs uppercase tracking-wider"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PWAContext.Provider>
  );
}
