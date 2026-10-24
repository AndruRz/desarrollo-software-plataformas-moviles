import { IonBadge, IonItem, IonLabel } from '@ionic/react';
import type { RankedEntry } from '../../types/ranking';

type Props = {
  entry: RankedEntry;
};

const RankingItem = ({ entry }: Props) => (
  <IonItem color={entry.isMe ? 'light' : undefined}>
    <IonBadge slot="start" color={entry.position === 1 ? 'warning' : 'medium'}>
      {entry.position}
    </IonBadge>
    <IonLabel>
      <h2>{entry.isMe ? `${entry.name} (tú)` : entry.name}</h2>
    </IonLabel>
    <IonBadge slot="end" color={entry.isMe ? 'primary' : 'medium'}>
      {entry.points} pts
    </IonBadge>
  </IonItem>
);

export default RankingItem;
