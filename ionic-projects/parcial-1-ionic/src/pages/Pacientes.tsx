import { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import { obtenerVisitas } from '../utils/storage';

const Pacientes: React.FC = () => {
  const [pacientes, setPacientes] = useState<string[]>([]);

  useEffect(() => {
    const nombres = obtenerVisitas().map(v => v.paciente);
    setPacientes(Array.from(new Set(nombres)));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {pacientes.map(p => (
            <IonItem key={p}>
              <IonLabel>{p}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Pacientes;
