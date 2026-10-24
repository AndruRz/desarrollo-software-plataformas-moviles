import { useCallback, useRef } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';

export const useLocalNotifications = () => {
  const idRef = useRef(Math.floor(Date.now() / 1000) % 1000000000);

  const requestPermission = useCallback(async () => {
    try {
      const status = await LocalNotifications.checkPermissions();
      if (status.display !== 'granted') {
        await LocalNotifications.requestPermissions();
      }
    } catch {
      return;
    }
  }, []);

  const notify = useCallback(async (title: string, body: string) => {
    try {
      idRef.current += 1;
      await LocalNotifications.schedule({
        notifications: [{ id: idRef.current, title, body }],
      });
    } catch {
      return;
    }
  }, []);

  return { requestPermission, notify };
};
