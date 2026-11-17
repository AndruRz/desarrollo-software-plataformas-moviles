import { useCallback, useState } from 'react';

import { posicionActual } from '../../services/geo/geoService';
import { lugaresCercanos } from '../../services/opencage/opencageService';
import type { Lugar } from '../../services/opencage/opencageService';
import type { Coord } from '../../utils/geo';

interface EstadoLugares {
  lugares: Lugar[];
  centro: Coord | null;
  cargando: boolean;
  error: string | null;
  buscar: (tipo: string, conectado: boolean) => Promise<void>;
}

export const useLugares = (): EstadoLugares => {
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [centro, setCentro] = useState<Coord | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscar = useCallback(async (tipo: string, conectado: boolean) => {
    if (!conectado) {
      setError('Sin conexión: no se pueden buscar lugares cercanos');
      return;
    }
    try {
      setCargando(true);
      setError(null);
      const { lat, lng } = await posicionActual();
      setCentro({ lat, lng });
      setLugares(await lugaresCercanos(lat, lng, tipo));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado');
    } finally {
      setCargando(false);
    }
  }, []);

  return { lugares, centro, cargando, error, buscar };
};
