/**
 * IVA Nail Art - Advanced Service Worker
 * PWA with Push Notifications, Background Sync, and Offline Support
 */

const CACHE_VERSION = 'v2';
const STATIC_CACHE = `iva-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `iva-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `iva-images-${CACHE_VERSION}`;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/portada.jpg',
  '/trabajo1.jpg',
  '/trabajo2.jpg',
  '/trabajo3.jpg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker v2...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.log('[SW] Cache failed:', err);
      })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => !name.includes(CACHE_VERSION))
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and API calls
  if (request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/')) return;

  // For images, use image cache
  if (isImageRequest(url.pathname)) {
    event.respondWith(imageFirst(request));
    return;
  }

  // For Next.js assets, try network first
  if (url.pathname.startsWith('/_next/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // For static assets, try cache first
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // For pages, try network first with cache fallback
  event.respondWith(networkFirst(request));
});

// Check if request is for a static asset
function isStaticAsset(pathname) {
  return /\.(js|css|woff2?|ttf|eot)$/i.test(pathname);
}

// Check if request is for an image
function isImageRequest(pathname) {
  return /\.(jpg|jpeg|png|gif|svg|webp|ico)$/i.test(pathname);
}

// Cache-first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed for:', request.url);
    return new Response('Offline', { status: 503 });
  }
}

// Network-first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/');
    }

    return new Response('Offline', { status: 503 });
  }
}

// Image-first strategy (cache with long TTL)
async function imageFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Refresh in background
    fetch(request).then((response) => {
      if (response.ok) {
        caches.open(IMAGE_CACHE).then((cache) => {
          cache.put(request, response);
        });
      }
    });
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('', { status: 404 });
  }
}

// =============================================
// PUSH NOTIFICATIONS
// =============================================

self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');

  let data = {
    title: 'IVA Nail Art',
    body: 'You have a new notification',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'iva-notification',
    data: { url: '/' }
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icon-192.png',
    badge: data.badge || '/icon-192.png',
    tag: data.tag || 'iva-notification',
    vibrate: [200, 100, 200],
    data: data.data || { url: '/' },
    actions: data.actions || [
      { action: 'open', title: 'View' },
      { action: 'dismiss', title: 'Dismiss' }
    ],
    requireInteraction: data.requireInteraction || false
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);

  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window open
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(urlToOpen);
            return client.focus();
          }
        }
        // Open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// =============================================
// BACKGROUND SYNC
// =============================================

self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'sync-bookings') {
    event.waitUntil(syncBookings());
  }

  if (event.tag === 'sync-loyalty') {
    event.waitUntil(syncLoyalty());
  }
});

async function syncBookings() {
  try {
    const cache = await caches.open('iva-pending');
    const requests = await cache.keys();

    for (const request of requests) {
      if (request.url.includes('/api/booking')) {
        const response = await cache.match(request);
        const body = await response.json();

        await fetch(request, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        await cache.delete(request);
      }
    }
  } catch (error) {
    console.log('[SW] Sync bookings failed:', error);
  }
}

async function syncLoyalty() {
  try {
    const cache = await caches.open('iva-pending');
    const requests = await cache.keys();

    for (const request of requests) {
      if (request.url.includes('/api/loyalty')) {
        const response = await cache.match(request);
        const body = await response.json();

        await fetch(request, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        await cache.delete(request);
      }
    }
  } catch (error) {
    console.log('[SW] Sync loyalty failed:', error);
  }
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-appointments') {
    event.waitUntil(checkUpcomingAppointments());
  }
});

async function checkUpcomingAppointments() {
  try {
    const response = await fetch('/api/notifications/check');
    const data = await response.json();

    if (data.upcoming) {
      self.registration.showNotification('Appointment Reminder', {
        body: `Your appointment is ${data.upcoming.timeUntil}`,
        icon: '/icon-192.png',
        tag: 'appointment-reminder',
        data: { url: '/booking' }
      });
    }
  } catch (error) {
    console.log('[SW] Check appointments failed:', error);
  }
}
