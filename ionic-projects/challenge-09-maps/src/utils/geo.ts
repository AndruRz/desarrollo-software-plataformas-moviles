export interface Coord {
  lat: number;
  lng: number;
}

const RADIO_TIERRA_M = 6371000;
const rad = (grados: number) => (grados * Math.PI) / 180;
const dos = (n: number) => String(n).padStart(2, '0');

/** Distancia en metros entre dos coordenadas (fórmula de Haversine). */
export const distanciaM = (a: Coord, b: Coord): number => {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * RADIO_TIERRA_M * Math.asin(Math.min(1, Math.sqrt(h)));
};

export const distanciaTotal = (puntos: Coord[]): number =>
  puntos.slice(1).reduce((acumulado, punto, i) => acumulado + distanciaM(puntos[i], punto), 0);

export const formatearDistancia = (metros: number): string =>
  metros < 1000 ? `${Math.round(metros)} m` : `${(metros / 1000).toFixed(2)} km`;

export const formatearDuracion = (ms: number): string => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const horas = Math.floor(total / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segundos = total % 60;
  return horas > 0 ? `${horas}:${dos(minutos)}:${dos(segundos)}` : `${dos(minutos)}:${dos(segundos)}`;
};

export const msAKmh = (metrosPorSegundo: number | null | undefined): number =>
  Math.round((metrosPorSegundo ?? 0) * 3.6);

/** Clave de día en hora local: YYYY-MM-DD. */
export const claveDia = (timestamp: number): string => {
  const fecha = new Date(timestamp);
  return `${fecha.getFullYear()}-${dos(fecha.getMonth() + 1)}-${dos(fecha.getDate())}`;
};

export const horaCorta = (timestamp: number): string =>
  new Date(timestamp).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
