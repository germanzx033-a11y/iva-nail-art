"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import PWAInstallPrompt from "./PWAInstallPrompt";

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
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
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

      {/* Luxury Bilingual PWA Install Prompt (iOS Safari + Android/Chrome) */}
      <PWAInstallPrompt />
    </PWAContext.Provider>
  );
}
