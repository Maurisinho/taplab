// Service Worker for TAPLAB CRM PWA App
const CACHE_NAME = 'taplab-crm-v1';
const ASSETS_TO_CACHE = [
  'crm.html',
  'css/crm.css',
  'js/crm.js',
  'manifest.json',
  'assets/images/isotype-dark.png',
  'assets/images/logo-dark-bg.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
