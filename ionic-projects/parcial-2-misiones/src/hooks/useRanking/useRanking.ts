import { useEffect, useMemo, useState } from 'react';
import { subscribeTopScores } from '../../services/rankingService/rankingService';
import { buildVersus } from '../../helpers/ranking/ranking';
import type { RankingEntry } from '../../types/ranking';

export const useRanking = (uid: string, name: string, points: number) => {
  const [top, setTop] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeTopScores(
      (entries) => {
        setTop(entries);
        setError(null);
        setLoading(false);
      },
      () => {
        setError('No se pudo leer el ranking. Revisa las reglas de Firebase.');
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  const ranking = useMemo(
    () => buildVersus(top, { uid, name, points }),
    [top, uid, name, points],
  );

  return { ranking, loading, error };
};
