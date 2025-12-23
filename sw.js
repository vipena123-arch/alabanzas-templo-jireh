// IMPORTANTE: CAMBIA ESTE "v1" a "v2", "v3"... CADA VEZ QUE SUBAS CANCIONES
const CACHE_NAME = "templo-jireh-v6";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./icono.png",
  "./manifest.json"
];

// Instalar y forzar espera
self.addEventListener("install", (e) => {
  self.skipWaiting(); // <--- ESTO ES LA CLAVE DE LA RAPIDEZ
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activar y tomar control
self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim()); // <--- TOMA EL CONTROL INMEDIATO
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Servir contenido (Offline first)
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
