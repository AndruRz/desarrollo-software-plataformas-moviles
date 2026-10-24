import { IonList, IonNote, IonSpinner, IonText } from '@ionic/react';
import RankingItem from '../RankingItem/RankingItem';
import { useRanking } from '../../hooks/useRanking/useRanking';
import { useMissions } from '../../hooks/useMissions/useMissions';
import { useAuthContext } from '../../context/AuthContext/AuthContext';

const RankingList = () => {
  const { user, displayName } = useAuthContext();
  const { points } = useMissions();
  const { ranking, loading, error } = useRanking(user?.uid ?? '', displayName, points);

  if (loading) {
    return (
      <div className="ion-text-center ion-padding">
        <IonSpinner />
      </div>
    );
  }

  return (
    <>
      {error && (
        <IonText color="danger">
          <p className="ion-padding-horizontal">{error}</p>
        </IonText>
      )}
      <IonList inset>
        {ranking.map((entry) => (
          <RankingItem key={entry.uid} entry={entry} />
        ))}
      </IonList>
      <IonNote className="ion-padding-horizontal">
        Tu puntaje se compara con los otros 4 mejores usuarios registrados.
      </IonNote>
    </>
  );
};

export default RankingList;
