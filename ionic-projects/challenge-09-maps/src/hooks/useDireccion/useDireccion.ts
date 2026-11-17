import { useEffect, useRef, useState } from 'react';

import { direccionDe, hayLlaveOpenCage } from '../../services/opencage/opencageService';
import { distanciaM } from '../../utils/geo';

interface EstadoDireccion {
  direccion: string | null;
  error: string | null;
}

/** Consulta la dirección actual solo si hay conexión y la posición cambió más de 100 m. */
export const useDireccion = (lat: number | undefined, lng: number | undefined, conectado: boolean): EstadoDireccion => {
  const [direccion, setDireccion] = useState<string | null>(null);
  const [errorConsulta, setErrorConsulta] = useState<string | null>(null);
  const ultimaConsulta = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (lat === undefined || lng === undefined || !conectado || !hayLlaveOpenCage()) return;
    const previa = ultimaConsulta.current;
    if (previa && distanciaM(previa, { lat, lng }) < 100) return;
    ultimaConsulta.current = { lat, lng };

    direccionDe(lat, lng)
      .then((texto) => {
        setDireccion(texto);
        setErrorConsulta(null);
      })
      .catch((e) => setErrorConsulta(e instanceof Error ? e.message : 'Error inesperado'));
  }, [lat, lng, conectado]);

  const error = hayLlaveOpenCage() ? errorConsulta : 'Falta VITE_OPENCAGE_KEY en el archivo .env';
  return { direccion, error };
};
