import type { MissionDefinition } from '../types/mission';
import { MOVE_DISTANCE_METERS, STILL_SECONDS } from './config';

export const MISSIONS: MissionDefinition[] = [
  {
    id: 1,
    kind: 'photo',
    title: 'Evidencia',
    description: 'Toma una foto con la cámara y guárdala.',
    points: 30,
  },
  {
    id: 2,
    kind: 'movement',
    title: 'Movimiento real',
    description: `Muévete más de ${MOVE_DISTANCE_METERS} metros desde tu posición original.`,
    points: 40,
  },
  {
    id: 3,
    kind: 'stillness',
    title: 'Permanencia activa',
    description: `Quédate quieto ${STILL_SECONDS} segundos y el celular vibrará.`,
    points: 50,
    requires: 2,
  },
];

export const TOTAL_POINTS = MISSIONS.reduce((sum, mission) => sum + mission.points, 0);
