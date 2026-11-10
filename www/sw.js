const C='dungsai-v1',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','img/p-3.jpg','img/p-4.jpg','img/p-5.jpg','img/p-6.jpg','img/p-7.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
