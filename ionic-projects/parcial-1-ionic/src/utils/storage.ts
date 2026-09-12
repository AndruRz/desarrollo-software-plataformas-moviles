import { Visita } from '../types';

const SESSION_KEY = 'session';
const VISITAS_KEY = 'visitas';

const visitasIniciales: Visita[] = [
  { id: '1', paciente: 'Andre Rodriguez', hora: '08:00', estado: 'pendiente' },
  { id: '2', paciente: 'Lina Ospina', hora: '09:30', estado: 'pendiente' },
  { id: '3', paciente: 'Lana Perez', hora: '11:00', estado: 'en_camino' },
  { id: '4', paciente: 'Julian Viafara', hora: '13:15', estado: 'finalizada' },
];

export function guardarSesion(usuario: string) {
  localStorage.setItem(SESSION_KEY, usuario);
}

export function obtenerSesion(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

export function cerrarSesion() {
  localStorage.removeItem(SESSION_KEY);
}

export function obtenerVisitas(): Visita[] {
  const data = localStorage.getItem(VISITAS_KEY);
  if (!data) {
    localStorage.setItem(VISITAS_KEY, JSON.stringify(visitasIniciales));
    return visitasIniciales;
  }
  return JSON.parse(data);
}

export function actualizarVisita(visita: Visita) {
  const visitas = obtenerVisitas();
  const nuevas = visitas.map(v => (v.id === visita.id ? visita : v));
  localStorage.setItem(VISITAS_KEY, JSON.stringify(nuevas));
}
