import { IonButton, IonIcon, IonProgressBar, IonText } from '@ionic/react';
import { pauseCircleOutline } from 'ionicons/icons';
import { useStillness } from '../../hooks/useStillness/useStillness';
import { useVibration } from '../../hooks/useVibration/useVibration';
import { useMissions } from '../../hooks/useMissions/useMissions';
import { STILL_SECONDS } from '../../constants/config';
import './StillnessMissionPanel.css';

type Props = {
  missionId: number;
};

const StillnessMissionPanel = ({ missionId }: Props) => {
  const { complete } = useMissions();
  const { vibrate } = useVibration();

  const { active, remaining, moving, error, start, stop } = useStillness({
    seconds: STILL_SECONDS,
    onComplete: () => {
      vibrate();
      complete(missionId);
    },
  });

  if (!active) {
    return (
      <>
        <IonButton expand="block" onClick={start}>
          <IonIcon slot="start" icon={pauseCircleOutline} />
          Quedarme quieto {STILL_SECONDS} s
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
      <div className="still-panel__count">{Math.ceil(remaining)}</div>
      <IonProgressBar
        value={1 - remaining / STILL_SECONDS}
        color={moving ? 'danger' : 'success'}
      />
      <p className={`still-panel__hint${moving ? ' still-panel__hint--moving' : ''}`}>
        {moving ? 'Te moviste, el contador se reinició.' : 'No muevas el celular.'}
      </p>
      <IonButton expand="block" fill="outline" color="medium" onClick={stop}>
        Cancelar
      </IonButton>
    </>
  );
};

export default StillnessMissionPanel;
