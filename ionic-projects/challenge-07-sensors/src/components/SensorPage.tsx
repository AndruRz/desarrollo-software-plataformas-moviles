import type { ReactNode } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonText } from '@ionic/react';

type Props = {
  title: string;
  error?: string | null;
  children: ReactNode;
};

const SensorPage = ({ title, error, children }: Props) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      {children}
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
    </IonContent>
  </IonPage>
);

export default SensorPage;
