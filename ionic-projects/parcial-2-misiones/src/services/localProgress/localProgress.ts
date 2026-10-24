import type { ProgressSnapshot } from '../../types/mission';

const keyFor = (uid: string) => `misiones:progreso:${uid}`;

export const loadLocalProgress = (uid: string): ProgressSnapshot | null => {
  try {
    const raw = localStorage.getItem(keyFor(uid));
    return raw ? (JSON.parse(raw) as ProgressSnapshot) : null;
  } catch {
    return null;
  }
};

export const saveLocalProgress = (uid: string, snapshot: ProgressSnapshot) => {
  try {
    localStorage.setItem(keyFor(uid), JSON.stringify(snapshot));
  } catch {
    return;
  }
};

export const clearLocalProgress = (uid: string) => {
  try {
    localStorage.removeItem(keyFor(uid));
  } catch {
    return;
  }
};
