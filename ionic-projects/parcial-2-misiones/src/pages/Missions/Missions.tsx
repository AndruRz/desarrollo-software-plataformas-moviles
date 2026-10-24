import { IonContent, IonPage } from '@ionic/react';
import AppHeader from '../../components/AppHeader/AppHeader';
import ProgressSummary from '../../components/ProgressSummary/ProgressSummary';
import MissionList from '../../components/MissionList/MissionList';

const Missions = () => (
  <IonPage>
    <AppHeader title="Misiones" />
    <IonContent>
      <ProgressSummary />
      <MissionList />
    </IonContent>
  </IonPage>
);

export default Missions;
