import { get, ref, set } from 'firebase/database';
import { rtdb } from '../../firebase/config';
import type { ProgressSnapshot } from '../../types/mission';

const progressRef = (uid: string) => ref(rtdb, `progress/${uid}`);

export const fetchRemoteProgress = async (uid: string): Promise<ProgressSnapshot | null> => {
  const snapshot = await get(progressRef(uid));
  return snapshot.exists() ? (snapshot.val() as ProgressSnapshot) : null;
};

export const saveRemoteProgress = (uid: string, snapshot: ProgressSnapshot) =>
  set(progressRef(uid), snapshot);
