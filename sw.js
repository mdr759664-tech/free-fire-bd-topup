const CACHE_NAME='ultra-topup-bd-v2-fixed-full-list-no-empty-file';
const urlsToCache=['/','/index.html','/manifest.json','/app-logo.jpg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.map(cacheName => {
    if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
  }))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => {
    if (response) return response;
    return fetch(event.request).then(res => {
      if (!res || res.status !== 200 || res.type !== 'opaque') return res;
      const resClone = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
      return res;
    }).catch(()=> caches.match('/index.html'));
  }));
});
