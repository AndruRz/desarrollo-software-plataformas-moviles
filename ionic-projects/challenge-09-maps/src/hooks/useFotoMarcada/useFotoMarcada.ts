import { useState } from 'react';

import { guardarFoto, tomarFotoConMarca } from '../../services/foto/fotoService';
import type { Posicion } from '../../types/Recorrido';

interface EstadoFoto {
  foto: string | null;
  procesando: boolean;
  error: string | null;
  limpiarError: () => void;
  capturar: () => Promise<void>;
}

export const useFotoMarcada = (posicion: Posicion | null, direccion: string | null): EstadoFoto => {
  const [foto, setFoto] = useState<string | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const capturar = async () => {
    if (!posicion) {
      setError('Todavía no hay ubicación para la marca de agua');
      return;
    }
    try {
      setError(null);
      const lineas = [
        `Lat ${posicion.lat.toFixed(5)}  Lng ${posicion.lng.toFixed(5)}`,
        ...(direccion ? [direccion] : []),
        new Date().toLocaleString('es-CO'),
      ];
      const resultado = await tomarFotoConMarca(lineas);
      setProcesando(true);
      await guardarFoto(resultado);
      setFoto(resultado);
    } catch (e) {
      const mensaje = e instanceof Error ? e.message : 'Error inesperado';
      if (!/cancel/i.test(mensaje)) setError(mensaje);
    } finally {
      setProcesando(false);
    }
  };

  return { foto, procesando, error, limpiarError: () => setError(null), capturar };
};
