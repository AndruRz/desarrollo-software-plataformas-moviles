// @ts-nocheck
import { IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

const ContactItem = ({ contacto, onDelete }) => {
  return (
    <IonItemSliding>
      <IonItem routerLink={`/detalle/${contacto.id}`} routerDirection="forward" detail>
        <IonLabel>
          <h2>{contacto.nombre}</h2>
          <p>{contacto.telefono}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => onDelete(contacto.id)}>
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ContactItem;
