// @ts-nocheck
import { useParams, useNavigate } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
} from '@ionic/react';
import { callOutline, trashOutline } from 'ionicons/icons';

const Detail = ({ contactos, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const contacto = contactos.find((c) => c.id === Number(id));

  const handleDelete = () => {
    onDelete(contacto.id);
    navigate('/list');
  };

  if (!contacto) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/list" />
            </IonButtons>
            <IonTitle>Contacto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText color="medium">
            <p>Este contacto ya no existe.</p>
          </IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/list" />
          </IonButtons>
          <IonTitle>Detalle del contacto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{contacto.nombre}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonIcon icon={callOutline} style={{ marginRight: 8 }} />
            {contacto.telefono}
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" color="danger" onClick={handleDelete}>
          <IonIcon slot="start" icon={trashOutline} />
          Eliminar contacto
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Detail;
