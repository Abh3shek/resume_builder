const CACHE_NAME = "resume-builder-cache-v1.0.1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles/style.css",
  "/scripts/app.js",
  //   add more if needed
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  console.log("📦 Service Worker: Installed & Assets Cached");
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  console.log("🧹 Service Worker: Old Caches Cleaned");
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("fetching from cache");
        return response;
      } // Return cached response if found
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone()); // Save new response in cache
          return networkResponse; // Return network response to page
        });
      });
    })
  );
});
