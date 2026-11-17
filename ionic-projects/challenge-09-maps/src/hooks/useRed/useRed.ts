import { useEffect, useState } from 'react';

import { escucharRed, estadoRed } from '../../services/red/redService';
import type { EstadoRed } from '../../services/red/redService';

export const useRed = (): EstadoRed => {
  const [estado, setEstado] = useState<EstadoRed>({ conectado: true, tipo: 'unknown' });

  useEffect(() => {
    let cancelado = false;
    let quitar: (() => void) | undefined;

    estadoRed().then((actual) => {
      if (!cancelado) setEstado(actual);
    });
    escucharRed(setEstado).then((quitarEscucha) => {
      if (cancelado) quitarEscucha();
      else quitar = quitarEscucha;
    });

    return () => {
      cancelado = true;
      quitar?.();
    };
  }, []);

  return estado;
};
