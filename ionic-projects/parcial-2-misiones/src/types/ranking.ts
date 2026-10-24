export type RankingEntry = {
  uid: string;
  name: string;
  points: number;
};

export type RankedEntry = RankingEntry & {
  position: number;
  isMe: boolean;
};
