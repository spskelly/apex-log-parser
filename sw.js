const CACHE_NAME = 'apex-log-parser-v4';
const FONT_CSS_URL = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  FONT_CSS_URL
];

// cache core assets on install, including referenced font files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(ASSETS);
      // fetch the Google Fonts CSS and pre-cache the .woff2 files it references
      try {
        const resp = await fetch(FONT_CSS_URL);
        const css = await resp.text();
        const fontUrls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m => m[1]);
        await Promise.all(fontUrls.map(url => cache.add(url).catch(() => {})));
      } catch (_) { /* font files will be cached at runtime as fallback */ }
      return self.skipWaiting();
    })
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
