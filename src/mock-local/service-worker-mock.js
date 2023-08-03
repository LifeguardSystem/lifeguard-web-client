import { mock } from "./mock/application.js";
import { mockHandlers } from "./mock/handlers.js";

const version = "0.0.0";
const cacheName = `lifeguard-mock-v${version}`;

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
  const cacheKeeplist = [cacheName];
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  console.log("Claiming control");
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        const { method, url } = event.request;
        const isAGetter = method === "GET";
        if (isAGetter && !url.includes("localhost")) {
          return mock(url, mockHandlers);
        }

        return fetch(event.request);
      })
      .catch(async (error) => {
        console.error("Service worker error: ", error);
      })
  );
});
