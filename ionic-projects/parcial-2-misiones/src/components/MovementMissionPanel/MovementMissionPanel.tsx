import { IonButton, IonIcon, IonProgressBar, IonSpinner, IonText } from '@ionic/react';
import { navigateOutline } from 'ionicons/icons';
import { useDistanceTracker } from '../../hooks/useDistanceTracker/useDistanceTracker';
import { useMissions } from '../../hooks/useMissions/useMissions';
import { MOVE_DISTANCE_METERS } from '../../constants/config';
import './MovementMissionPanel.css';

type Props = {
  missionId: number;
};

const MovementMissionPanel = ({ missionId }: Props) => {
  const { complete } = useMissions();
  const { tracking, hasOrigin, distance, accuracy, error, start, stop } = useDistanceTracker({
    threshold: MOVE_DISTANCE_METERS,
    onReached: () => complete(missionId),
  });

  if (!tracking) {
    return (
      <>
        <IonButton expand="block" onClick={start}>
          <IonIcon slot="start" icon={navigateOutline} />
          Marcar punto de inicio
        </IonButton>
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}
      </>
    );
  }

  return (
    <>
      {hasOrigin ? (
        <>
          <div className="movement-panel__reading">
            <span className="movement-panel__distance">{Math.round(distance)} m</span>
            <span>de {MOVE_DISTANCE_METERS} m</span>
          </div>
          <IonProgressBar value={Math.min(1, distance / MOVE_DISTANCE_METERS)} />
          <p className="movement-panel__hint">Camina en línea recta. Precisión GPS: {accuracy ? Math.round(accuracy) : '-'} m</p>
        </>
      ) : (
        <p className="movement-panel__hint">
          <IonSpinner name="dots" /> Buscando señal GPS precisa para fijar tu punto de inicio...
        </p>
      )}
      <IonButton expand="block" fill="outline" color="medium" onClick={stop}>
        Cancelar
      </IonButton>
    </>
  );
};

export default MovementMissionPanel;
