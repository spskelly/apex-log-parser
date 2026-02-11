const CACHE_NAME = 'apex-log-parser-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap'
];

// cache core assets on install
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// clean old caches on activate
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// cache-first with network fallback; offline fallback for navigation
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((cached) => cached || fetch(e.request)
        .then((response) => {
          // cache successful responses for future offline use
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          }
          return response;
        })
      )
      .catch(() => {
        // offline fallback for navigation requests
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});
