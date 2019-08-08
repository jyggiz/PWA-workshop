self.addEventListener("install", () => {
    console.log("[Service Worker] Service worker install!");
});

self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Service worker activate!", event);
    return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(fetch(event.request));
});