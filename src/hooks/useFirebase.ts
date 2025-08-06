import { getToken, messaging } from "@integrations/firebase";
import apiConfig from "@utils/api";
import { useCallback, useEffect } from "react";
import { useGetMailProgramInstance } from "./useMailProgramInstance";

export const useFirebaseNotification = (isAuthenticated: boolean) => {
  const { provider } = useGetMailProgramInstance();
  const requestPermission = useCallback(async () => {
    if (isAuthenticated && provider) {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const scriptURL = "/firebase-messaging-sw.js";

        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
          serviceWorkerRegistration:
            await navigator.serviceWorker.register(scriptURL),
        });

        localStorage.setItem("notification-token", token);

        const publicKey = provider.publicKey.toBase58();

        await apiConfig("register-fcm-notification", "POST", {
          action: "register",
          userPubKey: publicKey,
          fcmId: token,
        });
      } else if (permission === "denied") {
        const token = localStorage.getItem("notification-token");
        if (token) {
          await apiConfig("register-fcm-notification", "POST", {
            action: "unregister",
            fcmId: token,
          });
          localStorage.removeItem("notification-token");
        }
      }
    }
  }, [isAuthenticated, provider]);

  const revokePermission = useCallback(async () => {
    const token = localStorage.getItem("notification-token");

    if (!isAuthenticated && token) {
      await apiConfig("register-fcm-notification", "POST", {
        action: "unregister",
        fcmId: token,
      });
      localStorage.removeItem("notification-token");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Trigger permission request if user is authorized
    if (isAuthenticated) {
      requestPermission();
    } else {
      revokePermission();
    }
  }, [isAuthenticated, requestPermission, revokePermission]);
};
