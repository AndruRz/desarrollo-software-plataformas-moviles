import { describe, expect, it } from 'vitest';

import { claveDia, distanciaM, distanciaTotal, formatearDistancia, formatearDuracion, msAKmh } from './geo';

describe('geo', () => {
  it('calcula la distancia entre dos puntos', () => {
    // 1 grado de longitud en el ecuador ≈ 111.19 km
    expect(distanciaM({ lat: 0, lng: 0 }, { lat: 0, lng: 1 })).toBeCloseTo(111195, -3);
    expect(distanciaM({ lat: 3.4, lng: -76.5 }, { lat: 3.4, lng: -76.5 })).toBe(0);
  });

  it('suma la distancia de una ruta', () => {
    const ruta = [
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0.001 },
      { lat: 0, lng: 0.002 },
    ];
    expect(distanciaTotal(ruta)).toBeCloseTo(222.4, 0);
    expect(distanciaTotal([])).toBe(0);
  });

  it('formatea distancia, duración y velocidad', () => {
    expect(formatearDistancia(850)).toBe('850 m');
    expect(formatearDistancia(1500)).toBe('1.50 km');
    expect(formatearDuracion(65_000)).toBe('01:05');
    expect(formatearDuracion(3_725_000)).toBe('1:02:05');
    expect(msAKmh(10)).toBe(36);
    expect(msAKmh(null)).toBe(0);
  });

  it('genera la clave del día en hora local', () => {
    expect(claveDia(new Date(2026, 10, 16, 12).getTime())).toBe('2026-11-16');
  });
});
