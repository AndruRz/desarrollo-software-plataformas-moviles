import { IonContent, IonPage } from '@ionic/react';
import AppHeader from '../../components/AppHeader/AppHeader';
import ResultsSummary from '../../components/ResultsSummary/ResultsSummary';

const Results = () => (
  <IonPage>
    <AppHeader title="Resultados" />
    <IonContent>
      <ResultsSummary />
    </IonContent>
  </IonPage>
);

export default Results;
