import { IonText } from '@ionic/react';

const OfflineNotice = ({ text }: { text: string }) => (
  <IonText color="danger">
    <p className="ion-padding-horizontal">{text}</p>
  </IonText>
);

export default OfflineNotice;
