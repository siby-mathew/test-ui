// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBBVNUAy0jwECUukyM8o2NuTfVldk2sKNU",
  authDomain: "solmail-b0fe6.firebaseapp.com",
  projectId: "solmail-b0fe6",
  storageBucket: "solmail-b0fe6.firebasestorage.app",
  messagingSenderId: "876765604345",
  appId: "1:876765604345:web:8a91d17c04ed995b6af528",
  measurementId: "G-0X49VLGKBP",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notification = payload.data;
  if (!notification) {
    console.warn(
      "[firebase-messaging-sw.js] Unknown notification on message ",
      payload
    );
    return;
  }

  // Customize notification here
  const notificationOptions = {
    ...notification,
    icon: "./img/logo-icon.png",
    data: { url: "https://www.test.com/" },
  };

  self.registration.showNotification(notification.title, notificationOptions);
});

// Handle notification click event
self.addEventListener("notificationclick", (event) => {
  // event.notification.close(); // CLosing the notification when clicked
  const urlToOpen = event?.notification?.data?.url || "https://www.test.com/";
  // Open the URL in the default browser.
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((windowClients) => {
        // Check if there is already a window/tab open with the target URL
        for (const client of windowClients) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        // If not, open a new window/tab with the target URL
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
