// Self-destructing Service Worker to ensure developers and visitors get fresh builds
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(cacheNames.map((name) => caches.delete(name)));
      })
      .then(() => self.registration.unregister())
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  // Pass through all requests directly to the network without caching
  event.respondWith(fetch(event.request));
});
