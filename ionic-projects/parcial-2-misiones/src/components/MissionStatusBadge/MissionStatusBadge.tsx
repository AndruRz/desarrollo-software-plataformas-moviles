import { IonBadge } from '@ionic/react';

type Props = {
  completed: boolean;
  unlocked: boolean;
};

const MissionStatusBadge = ({ completed, unlocked }: Props) => {
  if (completed) return <IonBadge color="success">Completada</IonBadge>;
  if (!unlocked) return <IonBadge color="medium">Bloqueada</IonBadge>;
  return <IonBadge color="warning">Pendiente</IonBadge>;
};

export default MissionStatusBadge;
