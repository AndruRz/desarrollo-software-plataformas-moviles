export type EstadoVisita = 'pendiente' | 'en_camino' | 'finalizada';

export interface Visita {
  id: string;
  paciente: string;
  hora: string;
  estado: EstadoVisita;
}

export const estadoLabel: Record<EstadoVisita, string> = {
  pendiente: 'Pendiente',
  en_camino: 'En camino',
  finalizada: 'Finalizada',
};