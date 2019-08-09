var CACHE_STATIC_NAME = 'static-v4';
//var CACHE_DYNAMIC_NAME = 'dynamic-v2';

self.addEventListener("install", (event) => {
    // console.log("[Service Worker] Service worker install!");
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function(cache) {
            console.log('[Service Worker] Precaching App Shell');
            cache.addAll([
                '/',
                '/index.html',
                '/src/js/',
                '/src/css/app.css',
                '/src/css/feed.css',
                '/src/images/main-image.jpg',
                'https://fonts.googleapis.com/css?family=Roboto:400,700',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
            ]);
        })
    );
});

self.addEventListener("activate", (event) => {
    // console.log("[Service Worker] Service worker activate!", event);
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.open(CACHE_STATIC_NAME).then(cache => {
            return cache.match(event.request)
                .then((response) => {
                    if (response) {
                        console.log('[Service worker] Response from Cache', event.request.url);
                        return response;
                    } else {
                    return fetch(event.request)
                        .then((res) => {
                            console.log('[Service worker] Fetch Response', event.request.url);
                            cache.put(event.request.url, res.clone());
                            return res;
                        })
                        .catch(function(err) {});
                    }
                })
        })
    );
});