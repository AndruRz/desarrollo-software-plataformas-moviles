import type { MissionProgress } from '../../types/mission';
import {
  emptyMissions,
  mergeMissions,
  normalizeMissions,
} from '../../helpers/progress/progress';

export type MissionsState = {
  missions: MissionProgress[];
  ready: boolean;
};

export type MissionsAction =
  | { type: 'hydrate'; missions: MissionProgress[] }
  | { type: 'merge'; missions: MissionProgress[] }
  | { type: 'ready' }
  | { type: 'complete'; id: number }
  | { type: 'reset' };

export const initialMissionsState: MissionsState = {
  missions: emptyMissions(),
  ready: false,
};

export const missionsReducer = (state: MissionsState, action: MissionsAction): MissionsState => {
  switch (action.type) {
    case 'hydrate':
      return { missions: normalizeMissions(action.missions), ready: false };
    case 'merge':
      return { ...state, missions: mergeMissions(state.missions, action.missions) };
    case 'ready':
      return { ...state, ready: true };
    case 'complete':
      return {
        ...state,
        missions: state.missions.map((mission) =>
          mission.id === action.id ? { ...mission, completed: true } : mission,
        ),
      };
    case 'reset':
      return { missions: emptyMissions(), ready: state.ready };
    default:
      return state;
  }
};
