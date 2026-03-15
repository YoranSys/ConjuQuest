const CACHE_NAME = 'conjuquest-v1';

// Compute the base path so the SW works both at the root ('/') and
// under a sub-path (e.g. '/ConjuQuest/' when hosted on GitHub Pages).
const BASE = self.location.pathname.replace(/\/sw\.js$/, '');

const STATIC_PATHS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon.svg',
  '/styles/main.css',
  '/src/main.js',
  '/src/db.js',
  '/src/state.js',
  '/src/data/verbes.js',
  '/src/data/questions.js',
  '/src/data/loot-tables.js',
  '/src/engine/xp.js',
  '/src/engine/loot.js',
  '/src/games/missile/game.js',
  '/src/games/snake/game.js',
  '/src/games/frappe/game.js',
  '/src/games/memory/game.js',
  '/src/ui/animations.js',
  '/src/ui/components/feedback.js',
  '/src/ui/components/xp-bar.js',
  '/src/ui/components/item-card.js',
  '/src/ui/components/chest.js',
  '/src/ui/screens/home.js',
  '/src/ui/screens/profile.js',
  '/src/ui/screens/loot-screen.js',
  '/src/ui/screens/game-result.js',
  '/src/utils/audio.js',
  '/src/utils/haptics.js',
];

// Prefix every path with the detected base so cache keys match real request URLs.
const STATIC_URLS = STATIC_PATHS.map(p => BASE + p);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // Use { cache: 'reload' } to bypass the HTTP cache and always fetch
      // fresh files from the network when installing a new service worker.
      .then((cache) => cache.addAll(STATIC_URLS.map(url => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Network-first for HTML navigation requests so that a manual page refresh
  // always picks up the latest version of index.html after a deployment.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          const cachePutPromise = caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          event.waitUntil(cachePutPromise.catch(() => {}));
          return response;
        }
        // Non-OK (4xx/5xx): serve cached version if available, otherwise the error response.
        return caches.match(request).then((cached) => cached || response);
      }).catch(() =>
        // Network failure: serve cached version or a generic offline response.
        caches.match(request).then(
          (cached) => cached || new Response('Offline', { status: 503, statusText: 'Service Unavailable' })
        )
      )
    );
    return;
  }

  // Cache-first for all other assets.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          const cachePutPromise = caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          event.waitUntil(cachePutPromise.catch(() => {}));
        }
        return response;
      });
    })
  );
});
