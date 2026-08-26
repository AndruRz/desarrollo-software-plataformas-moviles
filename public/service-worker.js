const CACHE_NAME = "portafolio-pwa-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
];

// Instala el service worker y precachea el app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Limpia caches viejas al activarse
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Helpers de cada estrategia

function networkFirst(request) {
  return fetch(request)
    .then((response) => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
      return response;
    })
    .catch(() => caches.match(request));
}

function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    if (cached) return cached;
    return fetch(request).then((response) => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
      return response;
    });
  });
}

function staleWhileRevalidate(request) {
  return caches.open(CACHE_NAME).then((cache) =>
    cache.match(request).then((cached) => {
      const fetchPromise = fetch(request).then((response) => {
        cache.put(request, response.clone());
        return response;
      });
      // Devuelve el cache al instante si existe, y actualiza en segundo plano
      return cached || fetchPromise;
    })
  );
}

// Estrategia hibrida: decide segun el tipo de recurso
self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const destination = request.destination;

  // HTML -> Network First (evita servir versiones viejas de la app)
  if (destination === "document") {
    event.respondWith(networkFirst(request));
    return;
  }

  // JS / CSS -> Cache First (los nombres traen hash, son inmutables)
  if (destination === "script" || destination === "style") {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Imagenes -> Cache First + Stale While Revalidate
  if (destination === "image") {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // Llamadas a API -> Network First (datos siempre actualizados)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Cualquier otro recurso: intenta red, si falla usa cache
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
