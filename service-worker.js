importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/team.html", revision: "1" },
  { url: "/pages/home.html", revision: "1" },
  { url: "/pages/saved.html", revision: "1" },
  { url: "/css/materialize.min.css", revision: "1" },
  { url: "/css/style.css", revision: "1" },
  { url: "/js/materialize.min.js", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/js/nav.js", revision: "1" },
  { url: "/js/sw-register.js", revision: "1" },
  { url: "/js/api.js", revision: "1" },
  { url: "/js/db.js", revision: "1" },
  { url: "/js/idb.js", revision: "1" },  
  { url: "/js/util.js", revision: "1" },
  { url: "/service-worker.js", revision: "1" },
  { url: "/images/ic_bookmark_filled.svg", revision: "1" },
  { url: "/images/ic_bookmark.svg", revision: "1" },
  { url: "/images/icon.png", revision: "1" },
  { url: "/images/loader.gif", revision: "1" },
  { url: "/images/noaccess.png", revision: "1" },
  { url: "/images/notfound.png", revision: "1" },
], {
  ignoreUrlParametersMatching: [/.*/]
});


workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: `football-team`
  })
)

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "/images/icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
