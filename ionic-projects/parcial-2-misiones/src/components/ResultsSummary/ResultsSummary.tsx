import { useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';
import { checkmarkCircle, ellipseOutline, refreshOutline } from 'ionicons/icons';
import { useMissions } from '../../hooks/useMissions/useMissions';
import { statusLabel } from '../../helpers/progress/progress';
import { TOTAL_POINTS } from '../../constants/missions';
import './ResultsSummary.css';

const statusColor = {
  'sin-iniciar': 'medium',
  'en-progreso': 'warning',
  completado: 'success',
} as const;

const ResultsSummary = () => {
  const { missions, points, completedCount, total, status, reset } = useMissions();
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <div className="results-summary__grid">
        <IonCard className="results-summary__stat">
          <IonCardContent>
            <span className="results-summary__number">
              {points}
              <small> / {TOTAL_POINTS}</small>
            </span>
            <span className="results-summary__label">Puntos totales</span>
          </IonCardContent>
        </IonCard>
        <IonCard className="results-summary__stat">
          <IonCardContent>
            <span className="results-summary__number">
              {completedCount}
              <small> / {total}</small>
            </span>
            <span className="results-summary__label">Misiones completadas</span>
          </IonCardContent>
        </IonCard>
      </div>

      <div className="results-summary__status">
        <IonChip color={statusColor[status]}>Estado general: {statusLabel(status)}</IonChip>
      </div>

      <IonList inset>
        {missions.map((mission) => (
          <IonItem key={mission.id}>
            <IonIcon
              slot="start"
              icon={mission.completed ? checkmarkCircle : ellipseOutline}
              color={mission.completed ? 'success' : 'medium'}
            />
            <IonLabel>{mission.title}</IonLabel>
            <IonLabel slot="end" color={mission.completed ? 'success' : 'medium'}>
              {mission.completed ? `+${mission.points}` : `${mission.points} pts`}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>

      <div className="ion-padding">
        <IonButton expand="block" color="medium" fill="outline" onClick={() => setConfirming(true)}>
          <IonIcon slot="start" icon={refreshOutline} />
          Reiniciar misiones
        </IonButton>
      </div>

      <IonAlert
        isOpen={confirming}
        header="Reiniciar misiones"
        message="Se borrará tu progreso y tus puntos volverán a 0."
        buttons={[
          { text: 'Cancelar', role: 'cancel' },
          { text: 'Reiniciar', role: 'confirm', handler: reset },
        ]}
        onDidDismiss={() => setConfirming(false)}
      />
    </>
  );
};

export default ResultsSummary;
