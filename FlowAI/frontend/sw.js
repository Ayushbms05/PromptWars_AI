const CACHE_NAME = 'flowai-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './crowd_predict.js',
    './navigation_logic.js',
    './fnb_orders.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
