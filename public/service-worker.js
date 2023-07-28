const version = "0.0.0";
const cacheName = `lifeguard-web-client-v${version}`;

const isLocal = location.hostname === "localhost";

const staticfilesToSaveInCache = [
  ".svg",
  ".webp",
  ".png",
  ".ico",
  ".css",
  ".js",
  ".html",
  ".mjs",
  ".webmanifest",
];

const putInCache = async (request, response) => {
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
};

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(["/"]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  if (isLocal) return null;

  const cacheKeeplist = [cacheName];
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (cacheKeeplist.indexOf(key) === -1 || isLocal) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (isLocal) return null;

  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).then((response) => {
          const isStaticAndShouldBeCached = [...staticfilesToSaveInCache].some(
            (fileType) => `${event.request.url}`.includes(fileType)
          );

          if (isStaticAndShouldBeCached)
            putInCache(event.request, response.clone());

          return response;
        });
      })
      .catch(async (error) => {
        console.error("Service worker error: ", error);
      })
  );
});
