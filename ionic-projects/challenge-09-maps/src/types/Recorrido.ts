export interface PuntoRuta {
  lat: number;
  lng: number;
  t: number;
  velocidad: number | null;
}

export type MotivoFin = 'manual' | 'bateria' | 'quieto';

export interface Recorrido {
  id: string;
  inicio: number;
  fin: number;
  puntos: PuntoRuta[];
  distanciaM: number;
  motivoFin: MotivoFin;
}

export interface Posicion extends PuntoRuta {
  precision: number;
}
