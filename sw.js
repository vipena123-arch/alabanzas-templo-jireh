// CADA VEZ QUE HAGAS CAMBIOS EN LAS CANCIONES O EL DISEÑO:
// Cambia este nombre (ej: "v1" a "v2", "v3", etc.)
const CACHE_NAME = "templo-jireh-v3";

// Archivos que se guardarán en el celular
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./icono.png",
  "./manifest.json"
];

// 1. INSTALACIÓN: Descarga los archivos
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. ACTIVACIÓN: Borra cachés viejas (v1 cuando subas la v2)
self.addEventListener("activate", (e) => {
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

// 3. INTERCEPTAR PETICIONES: Sirve lo guardado si no hay internet
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Si está en caché, lo devuelve. Si no, lo busca en internet.
      return response || fetch(e.request);
    })
  );
});
