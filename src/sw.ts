const worker = (self as unknown) as ServiceWorkerGlobalScope;

const CACHE_NAME = "sw-v1";
const CACHE_FILES = [
    "/",
    "/index.html",
    "/main.js",
    "/sw.js",
    "/style.css",
    "/assets/lightblue.jpg",
    "/assets/lightgold.jpg"
];

worker.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(CACHE_FILES))
            .then(() => worker.skipWaiting())
    );
});

worker.addEventListener("active", (event: ExtendableEvent) => {
    event.waitUntil(
        caches.keys().then(keyNames =>
            Promise.all(
                keyNames.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
});

worker.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
