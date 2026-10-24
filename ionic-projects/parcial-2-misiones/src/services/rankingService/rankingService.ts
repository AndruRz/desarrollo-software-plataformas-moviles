import {
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
  set,
} from 'firebase/database';
import { rtdb } from '../../firebase/config';
import { RANKING_SIZE } from '../../constants/config';
import type { RankingEntry } from '../../types/ranking';

export const submitScore = (uid: string, name: string, points: number) =>
  set(ref(rtdb, `ranking/${uid}`), { name, points, updatedAt: Date.now() });

export const subscribeTopScores = (
  onData: (entries: RankingEntry[]) => void,
  onError: (error: Error) => void,
) => {
  const topQuery = query(ref(rtdb, 'ranking'), orderByChild('points'), limitToLast(RANKING_SIZE));

  return onValue(
    topQuery,
    (snapshot) => {
      const entries: RankingEntry[] = [];
      snapshot.forEach((child) => {
        const value = child.val() as { name?: string; points?: number };
        entries.push({
          uid: child.key ?? '',
          name: value.name ?? 'Usuario',
          points: Number(value.points ?? 0),
        });
      });
      onData(entries);
    },
    (error) => onError(error),
  );
};
