import { describe, expect, it } from 'vitest';

import { bateriaBaja, esVelocidadRapida, hayMovimiento } from './movimiento';

const ancla = { lat: 3.45, lng: -76.53 };

describe('movimiento', () => {
  it('ignora el ruido pequeño del GPS', () => {
    expect(hayMovimiento(ancla, { lat: 3.45003, lng: -76.53, velocidad: 0 })).toBe(false);
  });

  it('detecta movimiento por distancia', () => {
    expect(hayMovimiento(ancla, { lat: 3.4503, lng: -76.53, velocidad: 0 })).toBe(true);
  });

  it('detecta movimiento por velocidad', () => {
    expect(hayMovimiento(ancla, { ...ancla, velocidad: 1.5 })).toBe(true);
  });

  it('detecta velocidad rápida', () => {
    expect(esVelocidadRapida(9)).toBe(true);
    expect(esVelocidadRapida(2)).toBe(false);
    expect(esVelocidadRapida(null)).toBe(false);
  });

  it('detecta batería baja solo si no está cargando', () => {
    expect(bateriaBaja(0.1, false)).toBe(true);
    expect(bateriaBaja(0.1, true)).toBe(false);
    expect(bateriaBaja(0.5, false)).toBe(false);
    expect(bateriaBaja(undefined)).toBe(false);
  });
});
