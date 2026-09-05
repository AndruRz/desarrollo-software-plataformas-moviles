// @ts-nocheck
import { IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

const ContactItem = ({ contacto, onDelete }) => {
  return (
    <IonItem>
      <IonLabel>
        <h2>{contacto.nombre}</h2>
        <p>{contacto.telefono}</p>
      </IonLabel>
      <IonButton fill="clear" color="danger" onClick={() => onDelete(contacto.id)}>
        <IonIcon slot="icon-only" icon={trashOutline} />
      </IonButton>
    </IonItem>
  );
};

export default ContactItem;