import { useCallback, useEffect, useState } from 'react';

import {
  borrarTarea,
  completarTarea,
  crearTarea,
  editarTitulo,
  listarTareas,
  suscribirseATareas,
} from '../../services/tareas/tareasService';
import type { Tarea } from '../../types/Tarea/Tarea';

const mensajeDe = (error: unknown) => (error instanceof Error ? error.message : 'Error inesperado');

interface EstadoTareas {
  tareas: Tarea[];
  cargando: boolean;
  error: string | null;
  limpiarError: () => void;
  crear: (titulo: string) => Promise<void>;
  completar: (id: number, valor: boolean) => Promise<void>;
  editar: (id: number, titulo: string) => Promise<void>;
  borrar: (id: number) => Promise<void>;
}

export const useTareas = (): EstadoTareas => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const agregarLocal = useCallback((tarea: Tarea) => {
    setTareas((actuales) => (actuales.some((t) => t.id === tarea.id) ? actuales : [tarea, ...actuales]));
  }, []);

  useEffect(() => {
    listarTareas()
      .then(setTareas)
      .catch((e) => setError(mensajeDe(e)))
      .finally(() => setCargando(false));

    return suscribirseATareas(
      agregarLocal,
      (tarea) => setTareas((actuales) => actuales.map((t) => (t.id === tarea.id ? tarea : t))),
      (id) => setTareas((actuales) => actuales.filter((t) => t.id !== id)),
    );
  }, [agregarLocal]);

  const ejecutar = async (accion: () => Promise<unknown>) => {
    try {
      setError(null);
      await accion();
    } catch (e) {
      setError(mensajeDe(e));
    }
  };

  return {
    tareas,
    cargando,
    error,
    limpiarError: () => setError(null),
    crear: (titulo: string) => ejecutar(async () => agregarLocal(await crearTarea(titulo))),
    completar: (id: number, valor: boolean) => ejecutar(() => completarTarea(id, valor)),
    editar: (id: number, titulo: string) => ejecutar(() => editarTitulo(id, titulo)),
    borrar: (id: number) => ejecutar(() => borrarTarea(id)),
  };
};
