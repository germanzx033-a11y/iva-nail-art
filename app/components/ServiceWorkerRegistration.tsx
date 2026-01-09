"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("IVA Nail Art: Service Worker registered successfully", registration.scope);

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New content available, show update notification
                  console.log("IVA Nail Art: New content available, refresh to update");
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log("IVA Nail Art: Service Worker registration failed:", error);
        });
    }
  }, []);

  return null;
}
