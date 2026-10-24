import { MISSIONS } from '../../constants/missions';
import type {
  GeneralStatus,
  MissionProgress,
  MissionView,
  ProgressSnapshot,
} from '../../types/mission';

export const emptyMissions = (): MissionProgress[] =>
  MISSIONS.map((mission) => ({ id: mission.id, completed: false }));

export const normalizeMissions = (missions: MissionProgress[] | undefined): MissionProgress[] =>
  MISSIONS.map((mission) => ({
    id: mission.id,
    completed: Boolean(missions?.find((item) => item.id === mission.id)?.completed),
  }));

export const mergeMissions = (a: MissionProgress[], b: MissionProgress[]): MissionProgress[] =>
  MISSIONS.map((mission) => ({
    id: mission.id,
    completed:
      Boolean(a.find((item) => item.id === mission.id)?.completed) ||
      Boolean(b.find((item) => item.id === mission.id)?.completed),
  }));

export const calcPoints = (missions: MissionProgress[]) =>
  MISSIONS.reduce(
    (sum, mission) =>
      missions.find((item) => item.id === mission.id)?.completed ? sum + mission.points : sum,
    0,
  );

export const buildSnapshot = (missions: MissionProgress[]): ProgressSnapshot => ({
  points: calcPoints(missions),
  missions: missions.map(({ id, completed }) => ({ id, completed })),
});

export const buildViews = (missions: MissionProgress[]): MissionView[] =>
  MISSIONS.map((mission) => {
    const completed = Boolean(missions.find((item) => item.id === mission.id)?.completed);
    const unlocked = mission.requires
      ? Boolean(missions.find((item) => item.id === mission.requires)?.completed)
      : true;
    return { ...mission, completed, unlocked };
  });

export const calcStats = (missions: MissionProgress[]) => {
  const total = MISSIONS.length;
  const completedCount = missions.filter((mission) => mission.completed).length;
  const percent = Math.round((completedCount / total) * 100);
  const remaining = total - completedCount;
  const status: GeneralStatus =
    completedCount === 0 ? 'sin-iniciar' : completedCount === total ? 'completado' : 'en-progreso';
  return { total, completedCount, percent, remaining, status };
};

export const statusLabel = (status: GeneralStatus) => {
  if (status === 'completado') return 'Completado';
  if (status === 'en-progreso') return 'En progreso';
  return 'Sin iniciar';
};
