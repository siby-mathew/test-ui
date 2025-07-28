import { useCallback, useEffect, useRef, useState } from "react";
import { getToken, onMessage } from "@firebase/messaging";
import { messaging } from "@integrations/firebase";

type NotificationCallback = (payload: any) => void;

export function useFirebaseNotification() {
  const [token, setToken] = useState<string | null>(null);
  const handlersRef = useRef<Set<NotificationCallback>>(new Set());

  const buildServiceWorkerURL = useCallback(() => {
    let scriptURL = "firebase-messaging-sw.js";
    const env = import.meta.env;

    scriptURL += `?apiKey=${env.VITE_APP_API_KEY}`;
    scriptURL += `&authDomain=${env.VITE_APP_AUTH_DOMAIN}`;
    scriptURL += `&projectId=${env.VITE_APP_PROJECT_ID}`;
    scriptURL += `&storageBucket=${env.VITE_APP_STORAGE_BUCKET}`;
    scriptURL += `&messagingSenderId=${env.VITE_APP_MESSAGING_SENDER_ID}`;
    scriptURL += `&appId=${env.VITE_APP_APP_ID}`;
    scriptURL += `&measurementId=${env.VITE_APP_MEASUREMENT_ID}`;

    return scriptURL;
  }, []);

  const getMessagingToken = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        buildServiceWorkerURL()
      );

      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (currentToken) {
        setToken(currentToken);
        return currentToken;
      } else {
        console.warn(
          "No registration token available. Request permission to generate one."
        );
        return null;
      }
    } catch (err) {
      console.error("An error occurred while retrieving token.", err);
      return null;
    }
  }, [buildServiceWorkerURL]);

  const register = useCallback((callback: NotificationCallback) => {
    handlersRef.current.add(callback);
  }, []);

  const unregister = useCallback((callback: NotificationCallback) => {
    handlersRef.current.delete(callback);
  }, []);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      handlersRef.current.forEach((cb) => cb(payload));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    getMessagingToken,
    registerNotificationHandler: register,
    unregisterNotificationHandler: unregister,
    token,
  };
}
