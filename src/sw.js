const CACHE_NAME = "pwa-cache-v7";

self.addEventListener("install", event => {
  // Cache mínimo da página inicial para garantir fallback
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.webmanifest",
        "/img/equ-logo.png"
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Só cacheia respostas válidas e básicas (mesmo domínio)
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== "basic"
        ) {
          return networkResponse;
        }

        const clone = networkResponse.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });

        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;

          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
        });
      })
  );
});