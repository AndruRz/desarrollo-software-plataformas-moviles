import { distanciaM } from './geo';
import type { Coord } from './geo';

/** Metros que debes alejarte del último punto para considerar que te moviste. */
export const UMBRAL_MOVIMIENTO_M = 15;
/** Velocidad (m/s) a partir de la cual se considera movimiento aunque la distancia sea corta. */
export const VELOCIDAD_MIN_MS = 1;
/** Velocidad (m/s) para el aviso de movimiento rápido (8 m/s ≈ 29 km/h). */
export const VELOCIDAD_RAPIDA_MS = 8;
/** Tiempo quieto para el aviso "mucho tiempo sin moverte". */
export const QUIETO_AVISO_MS = 2 * 60 * 1000;
/** Tiempo quieto para detener solo el recorrido en modo automático. */
export const QUIETO_AUTO_MS = 60 * 1000;
/** Nivel de batería (0-1) desde el cual se detiene el tracking. */
export const BATERIA_MINIMA = 0.15;
/** Lecturas de GPS con peor precisión (en metros) se ignoran. */
export const PRECISION_MAX_M = 50;

export interface LecturaMovimiento extends Coord {
  velocidad: number | null;
}

export const hayMovimiento = (ancla: Coord, punto: LecturaMovimiento): boolean =>
  distanciaM(ancla, punto) >= UMBRAL_MOVIMIENTO_M || (punto.velocidad ?? 0) >= VELOCIDAD_MIN_MS;

export const esVelocidadRapida = (velocidad: number | null | undefined): boolean =>
  (velocidad ?? 0) >= VELOCIDAD_RAPIDA_MS;

export const bateriaBaja = (nivel: number | undefined, cargando?: boolean): boolean =>
  nivel !== undefined && nivel >= 0 && nivel <= BATERIA_MINIMA && !cargando;
