// Name of the Cache.
const CACHE = "cacheV1";

// Select files for caching.
let urlsToCache = [
    "/",
    "./index.html",
    "./js/bootstrap.bundle.min.js",
    "./js/bootstrap.min.js",
    "./js/browser.js",
    "./js/bubbles.js",
    "./js/d3.v4.min.js",
    "./js/darkmode.js",
    "./js/filter-gallery-buttons.js",
    "./js/filter-gallery.js",
    "./js/navComponent.js",
    "./js/jquery-3.5.1.min.js",
    "./js/navfixer.js",
    "./js/navHover.js",
    "./js/p5.min.js",
    "./js/popper.min.js",
    "./js/pwa-handler.js",
    "./js/react-dom.js",
    "./js/react.js",
    "./js/studentComponents.js",
    "./js/title.js",
    "./js/webComponents.js",
    "./css/anim.css",
    "./css/bootstrap-fixer.css",
    "./css/bootstrap.min.css",
    "./css/d3.css",
    "./css/filter-gallery.css",
    "./css/font-awesome.min.css",
    "./css/p5splash.css",
    "./css/style.css",
    "./explore/index.html",
    "./projects/index.html",
    "./projects/2020/index.html",
    "./projects/2020/student-style.css",
    "./awards/index.html",
    "./awards/2020/index.html"
];

// Cache all the selected items once application is installed.
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            console.log("Caching started.");
            return cache.addAll(urlsToCache);
        })
    );
});

// Whenever a resource is requested, return if its cached else fetch the resourcefrom server.
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});