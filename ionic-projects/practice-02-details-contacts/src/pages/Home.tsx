// @ts-nocheck
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import ContactList from '../components/ContactList';
import './Home.css';

const Home = ({ contactos, onDelete }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis contactos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <ContactList contactos={contactos} onDelete={onDelete} />
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/crear">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
