"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    // Unregister any active service worker and clear stale caches on localhost / development
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
          console.log("[ServiceWorker] Stale service worker unregistered");
        }
      });

      if ("caches" in window) {
        caches.keys().then((cacheNames) => {
          for (const cacheName of cacheNames) {
            caches.delete(cacheName);
            console.log("[ServiceWorker] Cleared stale cache:", cacheName);
          }
        });
      }
    }
  }, []);

  return null;
}
