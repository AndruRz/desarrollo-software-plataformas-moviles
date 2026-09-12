import { useNavigate } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton } from '@ionic/react';
import { obtenerSesion, cerrarSesion } from '../utils/storage';

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const usuario = obtenerSesion();

  const handleLogout = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>Usuario</IonLabel>
          <IonLabel slot="end">{usuario}</IonLabel>
        </IonItem>
        <IonButton expand="block" color="danger" className="ion-margin-top" onClick={handleLogout}>
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
