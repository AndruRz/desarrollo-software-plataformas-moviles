import { Navigate, Route } from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { flagOutline, podiumOutline, statsChartOutline } from 'ionicons/icons';
import Missions from '../../pages/Missions/Missions';
import Ranking from '../../pages/Ranking/Ranking';
import Results from '../../pages/Results/Results';

const MainTabs = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="misiones" element={<Missions />} />
      <Route path="ranking" element={<Ranking />} />
      <Route path="resultados" element={<Results />} />
      <Route index element={<Navigate to="misiones" replace />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="misiones" href="/tabs/misiones">
        <IonIcon icon={flagOutline} />
        <IonLabel>Misiones</IonLabel>
      </IonTabButton>
      <IonTabButton tab="ranking" href="/tabs/ranking">
        <IonIcon icon={podiumOutline} />
        <IonLabel>Ranking</IonLabel>
      </IonTabButton>
      <IonTabButton tab="resultados" href="/tabs/resultados">
        <IonIcon icon={statsChartOutline} />
        <IonLabel>Resultados</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default MainTabs;
