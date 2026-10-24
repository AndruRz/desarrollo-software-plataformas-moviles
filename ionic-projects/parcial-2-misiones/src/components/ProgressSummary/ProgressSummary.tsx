import { IonCard, IonCardContent, IonProgressBar } from '@ionic/react';
import { useMissions } from '../../hooks/useMissions/useMissions';
import './ProgressSummary.css';

const ProgressSummary = () => {
  const { points, percent, completedCount, total } = useMissions();

  return (
    <IonCard>
      <IonCardContent>
        <div className="progress-summary__points">
          <span className="progress-summary__value">{points}</span>
          <span>puntos</span>
        </div>
        <IonProgressBar value={percent / 100} color="success" />
        <div className="progress-summary__meta">
          <span>{percent}% completado</span>
          <span>
            {completedCount} / {total} misiones
          </span>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ProgressSummary;
