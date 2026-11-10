const C = 'dungsai-v2';
const F = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png',
  'img/p-3.jpg', 'img/p-4.jpg', 'img/p-5.jpg', 'img/p-6.jpg', 'img/p-7.jpg'];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(c => c.addAll(F)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Ưu tiên mạng (luôn lấy bản mới nhất), mất mạng thì dùng bản đã lưu -> chạy offline
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone();
    if (r.ok) caches.open(C).then(c => c.put(e.request, copy));
    return r;
  }).catch(() => caches.match(e.request)));
});
