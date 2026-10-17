import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, type PushNotificationSchema } from '@capacitor/push-notifications';

export const usePushNotifications = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<PushNotificationSchema | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    if (!Capacitor.isNativePlatform()) {
      setError('Las notificaciones push solo funcionan en un dispositivo o emulador');
      return;
    }
    try {
      setError(null);
      const result = await PushNotifications.requestPermissions();
      if (result.receive === 'granted') {
        await PushNotifications.register();
      } else {
        setError('Permiso de notificaciones denegado');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const handles = [
      PushNotifications.addListener('registration', (t) => setToken(t.value)),
      PushNotifications.addListener('registrationError', (err) => setError(err.error)),
      PushNotifications.addListener('pushNotificationReceived', (n) => setNotification(n)),
      PushNotifications.addListener('pushNotificationActionPerformed', (action) => setNotification(action.notification)),
    ];

    return () => {
      handles.forEach((h) => h.then((l) => l.remove()));
    };
  }, []);

  return { token, notification, error, requestPermission };
};

export default usePushNotifications;
