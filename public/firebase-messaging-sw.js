// Import Firebase libraries
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const DEFAULT_ICON = "./img/logo-icon.png";
const DEFAULT_CLICK_URL = "https://www.test.com/";

const getFirebaseConfigFromQueryParams = () => {
  const params = new URL(location).searchParams;

  return {
    apiKey: params.get("apiKey"),
    authDomain: params.get("authDomain"),
    projectId: params.get("projectId"),
    storageBucket: params.get("storageBucket"),
    messagingSenderId: params.get("messagingSenderId"),
    appId: params.get("appId"),
    measurementId: params.get("measurementId"),
  };
};

try {
  const firebaseConfig = getFirebaseConfigFromQueryParams();
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  console.error("[firebase-messaging-sw.js] Firebase init error:", err);
}

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );

  const { data } = payload;
  if (!data || !data.title) {
    console.warn(
      "[firebase-messaging-sw.js] Invalid notification payload:",
      payload
    );
    return;
  }

  const notificationOptions = {
    ...data,
    icon: DEFAULT_ICON,
    data: {
      url: data?.url || DEFAULT_CLICK_URL,
    },
  };

  self.registration.showNotification(data.title, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  const urlToOpen = event?.notification?.data?.url || DEFAULT_CLICK_URL;
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
