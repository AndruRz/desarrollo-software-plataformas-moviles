// @ts-nocheck
import { useState } from 'react';
import { IonItem, IonInput, IonButton } from '@ionic/react';

const ContactForm = ({ onAddContact }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = () => {
    if (nombre.trim() === '' || telefono.trim() === '') return;

    onAddContact({ id: Date.now(), nombre, telefono });
    setNombre('');
    setTelefono('');
  };

  return (
    <div className="contact-form">
      <IonItem>
        <IonInput
          label="Nombre"
          labelPlacement="stacked"
          placeholder="Nombre"
          value={nombre}
          onIonInput={(e) => setNombre(e.detail.value)}
        />
      </IonItem>
      <IonItem>
        <IonInput
          label="Teléfono"
          labelPlacement="stacked"
          placeholder="Teléfono"
          value={telefono}
          onIonInput={(e) => setTelefono(e.detail.value)}
        />
      </IonItem>
      <IonButton expand="block" onClick={handleSubmit}>
        Agregar contacto
      </IonButton>
    </div>
  );
};

export default ContactForm;