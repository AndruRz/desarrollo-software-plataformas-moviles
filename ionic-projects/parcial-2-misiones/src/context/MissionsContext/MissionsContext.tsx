import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { useAuthContext } from '../AuthContext/AuthContext';
import { useLocalNotifications } from '../../hooks/useLocalNotifications/useLocalNotifications';
import { initialMissionsState, missionsReducer } from './missionsReducer';
import { MISSIONS } from '../../constants/missions';
import {
  buildSnapshot,
  buildViews,
  calcStats,
  emptyMissions,
} from '../../helpers/progress/progress';
import {
  loadLocalProgress,
  saveLocalProgress,
} from '../../services/localProgress/localProgress';
import {
  fetchRemoteProgress,
  saveRemoteProgress,
} from '../../services/progressService/progressService';
import { submitScore } from '../../services/rankingService/rankingService';
import type { GeneralStatus, MissionView } from '../../types/mission';

type MissionsContextType = {
  missions: MissionView[];
  points: number;
  total: number;
  completedCount: number;
  percent: number;
  remaining: number;
  status: GeneralStatus;
  ready: boolean;
  complete: (id: number) => void;
  reset: () => void;
};

const MissionsContext = createContext<MissionsContextType | null>(null);

export const MissionsProvider = ({ children }: { children: ReactNode }) => {
  const { user, displayName } = useAuthContext();
  const uid = user?.uid ?? '';
  const [state, dispatch] = useReducer(missionsReducer, initialMissionsState);
  const { requestPermission, notify } = useLocalNotifications();

  useEffect(() => {
    if (!uid) {
      dispatch({ type: 'hydrate', missions: emptyMissions() });
      return;
    }

    let cancelled = false;
    const local = loadLocalProgress(uid);
    dispatch({ type: 'hydrate', missions: local?.missions ?? emptyMissions() });

    fetchRemoteProgress(uid)
      .then((remote) => {
        if (!cancelled && remote) dispatch({ type: 'merge', missions: remote.missions ?? [] });
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) dispatch({ type: 'ready' });
      });

    requestPermission();

    return () => {
      cancelled = true;
    };
  }, [uid, requestPermission]);

  useEffect(() => {
    if (!uid || !state.ready) return;
    const snapshot = buildSnapshot(state.missions);
    saveLocalProgress(uid, snapshot);
    saveRemoteProgress(uid, snapshot).catch(() => undefined);
  }, [uid, state.ready, state.missions]);

  const stats = useMemo(() => calcStats(state.missions), [state.missions]);
  const points = useMemo(() => buildSnapshot(state.missions).points, [state.missions]);
  const views = useMemo(() => buildViews(state.missions), [state.missions]);

  useEffect(() => {
    if (!uid || !state.ready) return;
    submitScore(uid, displayName, points).catch(() => undefined);
  }, [uid, displayName, points, state.ready]);

  const complete = useCallback(
    (id: number) => {
      const view = views.find((mission) => mission.id === id);
      if (!view || view.completed || !view.unlocked) return;

      dispatch({ type: 'complete', id });

      const doneAfter = stats.completedCount + 1;
      const left = MISSIONS.length - doneAfter;

      notify('Misión completada', 'Has completado una misión');
      if (left === 1) {
        notify('Ya casi', 'Te falta 1 misión para completar');
      }
    },
    [views, stats.completedCount, notify],
  );

  const reset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  const value: MissionsContextType = {
    missions: views,
    points,
    total: stats.total,
    completedCount: stats.completedCount,
    percent: stats.percent,
    remaining: stats.remaining,
    status: stats.status,
    ready: state.ready,
    complete,
    reset,
  };

  return <MissionsContext.Provider value={value}>{children}</MissionsContext.Provider>;
};

export const useMissionsContext = () => {
  const context = useContext(MissionsContext);
  if (!context) throw new Error('useMissionsContext debe usarse dentro de <MissionsProvider>');
  return context;
};
