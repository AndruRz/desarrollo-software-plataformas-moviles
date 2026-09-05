// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/react';

const Create = ({ onAddContact }) => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = () => {
    if (nombre.trim() === '' || telefono.trim() === '') return;

    onAddContact({ id: Date.now(), nombre, telefono });
    navigate('/list');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/list" />
          </IonButtons>
          <IonTitle>Nuevo contacto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
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
        <IonButton expand="block" className="ion-margin-top" onClick={handleSubmit}>
          Guardar contacto
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Create;
