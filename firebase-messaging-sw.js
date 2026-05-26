importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDz-Y46r5p39IceBJykhUJ8FwwZ-tVCtuU",
  authDomain: "rb7free.firebaseapp.com",
  projectId: "rb7free",
  storageBucket: "rb7free.firebasestorage.app",
  messagingSenderId: "492633821316",
  appId: "1:492633821316:web:19515a2580e45f6779b2d1"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || '💸 Rb7Free';
  const options = {
    body: payload.notification?.body || 'لديك فرص ربح جديدة!',
    icon: 'https://i.ibb.co/1cyK8m1/Untitled-design-20260517-101346-0000.png',
    badge: 'https://i.ibb.co/1cyK8m1/Untitled-design-20260517-101346-0000.png',
    tag: payload.data?.tag || 'rb7free',
    requireInteraction: false
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (let c of list) {
        if (c.url.includes('rb7free') && 'focus' in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow('https://rb7free.pages.dev');
    })
  );
});