import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { nivelBateria } from '../../services/bateria/bateriaService';
import { pedirPermisoUbicacion, posicionActual, vigilarPosicion } from '../../services/geo/geoService';
import { notificar, pedirPermisoNotificaciones } from '../../services/notificaciones/notificacionService';
import { guardarRecorrido } from '../../services/recorridos/recorridosService';
import { vibrar } from '../../services/vibracion/vibracionService';
import type { MotivoFin, Posicion, PuntoRuta, Recorrido } from '../../types/Recorrido';
import { distanciaTotal, msAKmh } from '../../utils/geo';
import {
  PRECISION_MAX_M,
  QUIETO_AUTO_MS,
  QUIETO_AVISO_MS,
  VELOCIDAD_RAPIDA_MS,
  bateriaBaja,
  esVelocidadRapida,
  hayMovimiento,
} from '../../utils/movimiento';

interface Opciones {
  conectado: boolean;
  automatico: boolean;
}

interface EstadoTracking {
  posicion: Posicion | null;
  puntos: PuntoRuta[];
  grabando: boolean;
  distanciaM: number;
  duracionMs: number;
  aviso: string | null;
  limpiarAviso: () => void;
  iniciar: () => Promise<void>;
  detener: () => Promise<void>;
}

const mensajeDe = (error: unknown) => (error instanceof Error ? error.message : 'Error inesperado');

export const useTracking = ({ conectado, automatico }: Opciones): EstadoTracking => {
  const [posicion, setPosicion] = useState<Posicion | null>(null);
  const [puntos, setPuntos] = useState<PuntoRuta[]>([]);
  const [grabando, setGrabando] = useState(false);
  const [inicio, setInicio] = useState(0);
  const [ahora, setAhora] = useState(0);
  const [aviso, setAviso] = useState<string | null>(null);

  const grabandoRef = useRef(false);
  const iniciandoRef = useRef(false);
  const puntosRef = useRef<PuntoRuta[]>([]);
  const inicioRef = useRef(0);
  const anclaRef = useRef<PuntoRuta | null>(null);
  const ultimoMovimientoRef = useRef(0);
  const quietoAvisadoRef = useRef(false);
  const rapidoAvisadoRef = useRef(false);
  const conectadoAntesRef = useRef(conectado);

  const avisar = useCallback((mensaje: string, comoNotificacion = false) => {
    setAviso(mensaje);
    if (comoNotificacion) void notificar('Mapa y Sensores', mensaje);
  }, []);

  const finalizar = useCallback(
    async (motivo: MotivoFin) => {
      if (!grabandoRef.current) return;
      grabandoRef.current = false;
      setGrabando(false);

      const recorrido: Recorrido = {
        id: String(inicioRef.current),
        inicio: inicioRef.current,
        fin: Date.now(),
        puntos: puntosRef.current,
        distanciaM: distanciaTotal(puntosRef.current),
        motivoFin: motivo,
      };

      let resultado = 'Recorrido guardado';
      if (recorrido.puntos.length < 2) {
        resultado = 'Recorrido descartado: muy pocos puntos';
      } else {
        try {
          await guardarRecorrido(recorrido);
        } catch (e) {
          resultado = `No se pudo guardar el recorrido: ${mensajeDe(e)}`;
        }
      }

      if (motivo === 'bateria') avisar(`Batería baja: recorrido detenido. ${resultado}`, true);
      else if (motivo === 'quieto') avisar(`Sin movimiento: recorrido detenido. ${resultado}`, true);
      else avisar(resultado);
    },
    [avisar],
  );

  const comenzar = useCallback(
    async (origen: 'manual' | 'auto') => {
      if (grabandoRef.current || iniciandoRef.current) return;
      iniciandoRef.current = true;
      try {
        const bateria = await nivelBateria();
        if (bateriaBaja(bateria.nivel, bateria.cargando)) {
          avisar('Batería baja: no se puede iniciar el recorrido');
          return;
        }
        if (!(await pedirPermisoUbicacion())) {
          avisar('Permiso de ubicación denegado');
          return;
        }
        void pedirPermisoNotificaciones();

        const ahoraMs = Date.now();
        puntosRef.current = anclaRef.current ? [anclaRef.current] : [];
        inicioRef.current = ahoraMs;
        ultimoMovimientoRef.current = ahoraMs;
        quietoAvisadoRef.current = false;
        rapidoAvisadoRef.current = false;
        grabandoRef.current = true;
        setPuntos(puntosRef.current);
        setInicio(ahoraMs);
        setAhora(ahoraMs);
        setGrabando(true);
        void vibrar();
        avisar(origen === 'auto' ? 'Movimiento detectado: recorrido iniciado' : 'Recorrido iniciado');
      } finally {
        iniciandoRef.current = false;
      }
    },
    [avisar],
  );

  // Se actualiza en cada render para que el callback del GPS siempre vea el estado más reciente.
  const alPosicionRef = useRef<(p: Posicion) => void>(() => undefined);
  useEffect(() => {
    alPosicionRef.current = (p: Posicion) => {
      setPosicion(p);
      if (p.precision > PRECISION_MAX_M) return;

      const punto: PuntoRuta = { lat: p.lat, lng: p.lng, t: p.t, velocidad: p.velocidad };
      if (!anclaRef.current) {
        anclaRef.current = punto;
        ultimoMovimientoRef.current = p.t;
      }
      const movido = hayMovimiento(anclaRef.current, punto);
      if (movido) {
        anclaRef.current = punto;
        ultimoMovimientoRef.current = p.t;
        quietoAvisadoRef.current = false;
        if (!grabandoRef.current && automatico) void comenzar('auto');
      }
      if (!grabandoRef.current) return;

      if (movido || puntosRef.current.length === 0) {
        puntosRef.current = [...puntosRef.current, punto];
        setPuntos(puntosRef.current);
      }

      const quietoMs = p.t - ultimoMovimientoRef.current;
      if (!movido && quietoMs >= QUIETO_AVISO_MS && !quietoAvisadoRef.current) {
        quietoAvisadoRef.current = true;
        avisar('Llevas mucho tiempo sin moverte', true);
      }
      if (!movido && automatico && quietoMs >= QUIETO_AUTO_MS) void finalizar('quieto');

      if (esVelocidadRapida(p.velocidad)) {
        if (!rapidoAvisadoRef.current) {
          rapidoAvisadoRef.current = true;
          avisar(`Te estás moviendo muy rápido (${msAKmh(p.velocidad)} km/h)`, true);
        }
      } else if ((p.velocidad ?? 0) < VELOCIDAD_RAPIDA_MS / 2) {
        rapidoAvisadoRef.current = false;
      }
    };
  });

  // Posición inicial para centrar el mapa aunque todavía no se haya iniciado el tracking.
  useEffect(() => {
    posicionActual()
      .then((p) => {
        anclaRef.current ??= { lat: p.lat, lng: p.lng, t: p.t, velocidad: p.velocidad };
        setPosicion(p);
      })
      .catch(() => undefined);
  }, []);

  // El GPS se vigila mientras se graba o mientras el modo automático esté activo.
  const vigilando = grabando || automatico;
  useEffect(() => {
    if (!vigilando) return;
    let cancelado = false;
    let quitar: (() => void) | undefined;

    pedirPermisoUbicacion()
      .then((ok) => {
        if (!ok) throw new Error('Permiso de ubicación denegado');
        return vigilarPosicion(
          (p) => alPosicionRef.current(p),
          (mensaje) => setAviso(mensaje),
        );
      })
      .then((quitarVigilancia) => {
        if (cancelado) quitarVigilancia();
        else quitar = quitarVigilancia;
      })
      .catch((e) => setAviso(mensajeDe(e)));

    return () => {
      cancelado = true;
      quitar?.();
    };
  }, [vigilando]);

  // Reloj para la duración mostrada.
  useEffect(() => {
    if (!grabando) return;
    const id = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(id);
  }, [grabando]);

  // Batería baja: detiene el recorrido y lo guarda.
  useEffect(() => {
    if (!grabando) return;
    const id = setInterval(async () => {
      const bateria = await nivelBateria();
      if (bateriaBaja(bateria.nivel, bateria.cargando)) void finalizar('bateria');
    }, 15000);
    return () => clearInterval(id);
  }, [grabando, finalizar]);

  // Aviso cuando se pierde o vuelve la conexión durante un recorrido.
  useEffect(() => {
    if (grabandoRef.current && conectadoAntesRef.current !== conectado) {
      avisar(
        conectado ? 'Conexión restablecida' : 'Sin conexión: el recorrido se sigue guardando en el celular',
        !conectado,
      );
    }
    conectadoAntesRef.current = conectado;
  }, [conectado, avisar]);

  const distanciaM = useMemo(() => distanciaTotal(puntos), [puntos]);

  return {
    posicion,
    puntos,
    grabando,
    distanciaM,
    duracionMs: grabando ? ahora - inicio : 0,
    aviso,
    limpiarAviso: () => setAviso(null),
    iniciar: () => comenzar('manual'),
    detener: () => finalizar('manual'),
  };
};
