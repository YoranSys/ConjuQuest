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
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_URLS)).then(() => self.skipWaiting())
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

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
