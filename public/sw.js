const CACHE_NAME = "nexfound-v1.0.0";
const STATIC_CACHE_NAME = "nexfound-static-v1.0.0";
const DYNAMIC_CACHE_NAME = "nexfound-dynamic-v1.0.0";

// Files to cache immediately
const STATIC_ASSETS = [
  "/",
  "/blog",
  "/logo-transparent.png",
  "/logo-dark.png",
  "/favicon.ico",
  "/og-image.jpg",
  "/apple-touch-icon.png",
  "/manifest.json",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME
            ) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip caching for Sanity CMS requests (they change frequently)
  if (url.hostname.includes("sanity")) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Handle API routes differently
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Return cached version if network fails
            return cache.match(request);
          });
      })
    );
    return;
  }

  // Cache-first strategy for static assets
  if (
    request.destination === "image" ||
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font"
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(STATIC_CACHE_NAME).then((cache) => {
          return fetch(request).then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          });
        });
      })
    );
    return;
  }

  // Network-first strategy for pages
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful HTML responses
        if (
          response.status === 200 &&
          request.headers.get("accept").includes("text/html")
        ) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Return cached version if network fails
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return offline fallback for navigation requests
          if (request.mode === "navigate") {
            return caches.match("/").then((fallbackResponse) => {
              return (
                fallbackResponse ||
                new Response("Offline - Please check your connection", {
                  status: 503,
                  statusText: "Service Unavailable",
                  headers: { "Content-Type": "text/plain" },
                })
              );
            });
          }
        });
      })
  );
});

// Background sync for newsletter subscriptions
self.addEventListener("sync", (event) => {
  if (event.tag === "newsletter-subscription") {
    event.waitUntil(
      // Handle offline newsletter subscriptions
      // This would typically send queued subscriptions when back online
      console.log("Syncing newsletter subscriptions")
    );
  }
});
