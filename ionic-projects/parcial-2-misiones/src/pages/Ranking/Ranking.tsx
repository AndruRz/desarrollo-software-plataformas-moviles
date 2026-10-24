import { IonContent, IonPage } from '@ionic/react';
import AppHeader from '../../components/AppHeader/AppHeader';
import RankingList from '../../components/RankingList/RankingList';

const Ranking = () => (
  <IonPage>
    <AppHeader title="Ranking" />
    <IonContent>
      <RankingList />
    </IonContent>
  </IonPage>
);

export default Ranking;
