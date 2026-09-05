// @ts-nocheck
import { IonList, IonText } from '@ionic/react';
import ContactItem from './ContactItem';

const ContactList = ({ contactos, onDelete }) => {
  if (contactos.length === 0) {
    return (
      <IonText color="medium">
        <p>Todavía no hay contactos.</p>
      </IonText>
    );
  }

  return (
    <IonList>
      {contactos.map((contacto) => (
        <ContactItem key={contacto.id} contacto={contacto} onDelete={onDelete} />
      ))}
    </IonList>
  );
};

export default ContactList;