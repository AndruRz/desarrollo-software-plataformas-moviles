import { Geolocation } from '@capacitor/geolocation';
import type { Position } from '@capacitor/geolocation';

import type { Posicion } from '../../types/Recorrido';

const aPosicion = (p: Position): Posicion => ({
  lat: p.coords.latitude,
  lng: p.coords.longitude,
  t: p.timestamp,
  velocidad: p.coords.speed,
  precision: p.coords.accuracy,
});

export const pedirPermisoUbicacion = async (): Promise<boolean> => {
  try {
    const permisos = await Geolocation.requestPermissions();
    return permisos.location === 'granted' || permisos.coarseLocation === 'granted';
  } catch {
    // En el navegador no hay requestPermissions: el propio navegador pregunta al pedir la posición.
    return true;
  }
};

export const posicionActual = async (): Promise<Posicion> =>
  aPosicion(await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 15000 }));

export const vigilarPosicion = async (
  alPosicion: (posicion: Posicion) => void,
  alError: (mensaje: string) => void,
): Promise<() => void> => {
  const id = await Geolocation.watchPosition({ enableHighAccuracy: true, timeout: 20000 }, (posicion, error) => {
    if (error) alError(error.message ?? 'No se pudo leer el GPS');
    else if (posicion) alPosicion(aPosicion(posicion));
  });
  return () => {
    void Geolocation.clearWatch({ id });
  };
};
