import type { ReactNode } from 'react';
import { IonCard, IonCardContent, IonChip, IonIcon } from '@ionic/react';
import { cameraOutline, checkmarkCircle, timerOutline, walkOutline } from 'ionicons/icons';
import MissionStatusBadge from '../MissionStatusBadge/MissionStatusBadge';
import type { MissionKind, MissionView } from '../../types/mission';
import './MissionCard.css';

const icons: Record<MissionKind, string> = {
  photo: cameraOutline,
  movement: walkOutline,
  stillness: timerOutline,
};

type Props = {
  mission: MissionView;
  requirementText?: string;
  children?: ReactNode;
};

const MissionCard = ({ mission, requirementText, children }: Props) => {
  const showBody = !mission.completed && mission.unlocked;

  return (
    <IonCard>
      <IonCardContent>
        <div className="mission-card__header">
          <IonIcon
            className="mission-card__icon"
            icon={mission.completed ? checkmarkCircle : icons[mission.kind]}
            color={mission.completed ? 'success' : 'primary'}
          />
          <div className="mission-card__title">
            <h2>{mission.title}</h2>
            <p>{mission.description}</p>
          </div>
          <div className="mission-card__side">
            <MissionStatusBadge completed={mission.completed} unlocked={mission.unlocked} />
            <IonChip color="primary">+{mission.points} pts</IonChip>
          </div>
        </div>

        {!mission.unlocked && requirementText && (
          <p className="mission-card__locked">{requirementText}</p>
        )}

        {showBody && <div className="mission-card__body">{children}</div>}
      </IonCardContent>
    </IonCard>
  );
};

export default MissionCard;
