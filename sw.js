const CACHE_NAME = 'boompace-v5';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// System Notification Receiver for Heavy Lockscreen Vibration
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TRIGGER_ALERT') {
    self.registration.showNotification(event.data.title || 'BoomPace Alert', {
      body: event.data.body || 'Interval Complete!',
      icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3HKwH2hjspvFI-iLkd_ZnRWR1FZ430Vx0QMGioVGoH9bkkMuleUHTryjizz1BiLSF0_dqLJKaFV05Yx2w4X7wtxQeMwHtiowjxrKz16LeUZEcviNOjw5PbYZvNrMEbLQRPkVpQ4-kt-bLZgrvSIF_lmcJFfJP5e0Yln0af7yyfiNo5txCFiX_6QsNF_ZgE-53Jjz8L2zyH8U57v5uhrLSN14dThWq4jO9q4N3KLtcGryAHcZH916OAA',
      badge: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3HKwH2hjspvFI-iLkd_ZnRWR1FZ430Vx0QMGioVGoH9bkkMuleUHTryjizz1BiLSF0_dqLJKaFV05Yx2w4X7wtxQeMwHtiowjxrKz16LeUZEcviNOjw5PbYZvNrMEbLQRPkVpQ4-kt-bLZgrvSIF_lmcJFfJP5e0Yln0af7yyfiNo5txCFiX_6QsNF_ZgE-53Jjz8L2zyH8U57v5uhrLSN14dThWq4jO9q4N3KLtcGryAHcZH916OAA',
      vibrate: event.data.vibrate || [500, 150, 500, 150, 800],
      tag: 'boompace-alert-' + Date.now(),
      renotify: true,
      requireInteraction: true,
      silent: false
    });
  }
});

self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
