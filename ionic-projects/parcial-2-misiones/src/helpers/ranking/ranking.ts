import { RANKING_SIZE } from '../../constants/config';
import type { RankedEntry, RankingEntry } from '../../types/ranking';

export const buildVersus = (top: RankingEntry[], me: RankingEntry): RankedEntry[] => {
  const others = top
    .filter((entry) => entry.uid !== me.uid)
    .sort((a, b) => b.points - a.points)
    .slice(0, RANKING_SIZE - 1);

  return [...others, me]
    .sort((a, b) => b.points - a.points)
    .map((entry, index) => ({
      ...entry,
      position: index + 1,
      isMe: entry.uid === me.uid,
    }));
};
