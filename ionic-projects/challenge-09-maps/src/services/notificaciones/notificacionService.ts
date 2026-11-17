import { LocalNotifications } from '@capacitor/local-notifications';

let permiso: boolean | null = null;

export const pedirPermisoNotificaciones = async (): Promise<boolean> => {
  try {
    const resultado = await LocalNotifications.requestPermissions();
    permiso = resultado.display === 'granted';
  } catch {
    permiso = false;
  }
  return permiso;
};

export const notificar = async (titulo: string, cuerpo: string): Promise<void> => {
  try {
    if (permiso === null) await pedirPermisoNotificaciones();
    if (!permiso) return;
    await LocalNotifications.schedule({
      notifications: [{ id: Math.floor(Math.random() * 2_000_000_000) + 1, title: titulo, body: cuerpo }],
    });
  } catch {
    // Las notificaciones locales no existen en el navegador: el aviso en pantalla (toast) cubre ese caso.
  }
};
