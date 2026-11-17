import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { useCallback, useState } from 'react';

import RecorridoCard from '../../components/RecorridoCard/RecorridoCard';
import { diasConRecorridos, recorridosDelDia } from '../../services/recorridos/recorridosService';
import type { Recorrido } from '../../types/Recorrido';
import { claveDia } from '../../utils/geo';

const Historial: React.FC = () => {
  const [dias, setDias] = useState<string[]>([]);
  const [dia, setDia] = useState<string>('');
  const [recorridos, setRecorridos] = useState<Recorrido[]>([]);

  const cargarDia = useCallback(async (nuevoDia: string) => {
    setDia(nuevoDia);
    setRecorridos(await recorridosDelDia(nuevoDia));
  }, []);

  // La página queda montada al navegar, así que se recarga cada vez que se vuelve a mostrar.
  useIonViewWillEnter(() => {
    diasConRecorridos().then((lista) => {
      setDias(lista);
      void cargarDia(lista[0] ?? claveDia(Date.now()));
    });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/mapa" />
          </IonButtons>
          <IonTitle>Historial</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {dias.length > 0 && (
          <IonItem>
            <IonSelect label="Día" value={dia} onIonChange={(e) => void cargarDia(String(e.detail.value))}>
              {dias.map((d) => (
                <IonSelectOption key={d} value={d}>
                  {d}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        )}
        {recorridos.length === 0 ? (
          <div className="ion-text-center ion-padding">
            <IonNote>Todavía no hay recorridos guardados</IonNote>
          </div>
        ) : (
          recorridos.map((r) => <RecorridoCard key={r.id} recorrido={r} />)
        )}
      </IonContent>
    </IonPage>
  );
};

export default Historial;
