export type MissionKind = 'photo' | 'movement' | 'stillness';

export type MissionDefinition = {
  id: number;
  kind: MissionKind;
  title: string;
  description: string;
  points: number;
  requires?: number;
};

export type MissionProgress = {
  id: number;
  completed: boolean;
};

export type ProgressSnapshot = {
  points: number;
  missions: MissionProgress[];
};

export type MissionView = MissionDefinition & {
  completed: boolean;
  unlocked: boolean;
};

export type GeneralStatus = 'sin-iniciar' | 'en-progreso' | 'completado';
