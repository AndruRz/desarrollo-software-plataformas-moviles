import { useCallback, useEffect, useState } from 'react';
import { LocalNotifications, type PermissionStatus } from '@capacitor/local-notifications';

type NotificationArgs = {
  id?: number;
  title?: string;
  body?: string;
  seconds?: number;
};

const newId = () => Date.now() % 2147483647;

export const useLocalNotifications = () => {
  const [permission, setPermission] = useState<PermissionStatus['display'] | null>(null);
  const [lastId, setLastId] = useState<number | null>(null);
  const [lastTapped, setLastTapped] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkPermission = useCallback(async () => {
    try {
      const result = await LocalNotifications.checkPermissions();
      setPermission(result.display);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const requestPermission = async () => {
    try {
      setError(null);
      const result = await LocalNotifications.requestPermissions();
      setPermission(result.display);
      return result.display === 'granted';
    } catch (err) {
      setError((err as Error).message);
      return false;
    }
  };

  const sendNotification = async ({ id = newId(), title = 'Notificación', body = 'Mensaje' }: NotificationArgs = {}) => {
    try {
      setError(null);
      await LocalNotifications.schedule({ notifications: [{ id, title, body }] });
      setLastId(id);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const scheduleNotification = async ({
    id = newId(),
    title = 'Recordatorio',
    body = 'Tienes algo pendiente',
    seconds = 5,
  }: NotificationArgs = {}) => {
    try {
      setError(null);
      await LocalNotifications.schedule({
        notifications: [{ id, title, body, schedule: { at: new Date(Date.now() + seconds * 1000) } }],
      });
      setLastId(id);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const cancelNotification = async (id: number) => {
    try {
      setError(null);
      await LocalNotifications.cancel({ notifications: [{ id }] });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    const listener = LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
      setLastTapped(action.notification.title ?? String(action.notification.id));
    });
    return () => {
      listener.then((l) => l.remove());
    };
  }, []);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    permission,
    lastId,
    lastTapped,
    error,
    requestPermission,
    checkPermission,
    sendNotification,
    scheduleNotification,
    cancelNotification,
  };
};

export default useLocalNotifications;
