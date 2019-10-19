/* eslint-disable no-undef */
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.core.setCacheNameDetails({
  prefix: 'dancer-spots',
  suffix: 'v2'
});

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  new RegExp('.+/events/.+'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'event-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 2 * 24 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('.+/venues/.+'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'venues-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 1,
        maxAgeSeconds: 2 * 24 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('.+/profiles/.+'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'profiles-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 2 * 24 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('.+/profile/.+'),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  new RegExp('./favicon.ico'),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  new RegExp('.+/lessons/'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'lessons-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 2 * 24 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('.*.js'),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  // Cache CSS files.
  /\.css$/,
  // Use cache but update in the background.
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache'
  })
);

workbox.routing.registerRoute(
  // Cache image files.
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available.
  new workbox.strategies.CacheFirst({
    // Use a custom cache name.
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images.
        maxEntries: 50,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('.+/res.cloudinary.com/.+'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cloudinary-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
);
