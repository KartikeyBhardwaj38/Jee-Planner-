const CACHE = "jee-planner-v1";
const ASSETS = [
  "/Jee-Planner-/",
  "/Jee-Planner-/index.html",
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js",
  "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js",
  "https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    })).catch(() => caches.match("/Jee-Planner-/index.html"))
  );
});
```
→ Commit

---

### 🔧 Fix 3 — Edit `index.html` on GitHub

Find this line near the bottom:
```
navigator.serviceWorker.register("/jee-planner/sw.js")
```
Change to:
```
navigator.serviceWorker.register("sw.js")
