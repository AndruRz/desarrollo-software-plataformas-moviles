import { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonSpinner,
} from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import AppHeader from '../components/AppHeader';
import OfflineNotice from '../components/OfflineNotice';
import useRealTimeCollection from '../hooks/useRealTimeCollection';
import { useAuthContext } from '../context/AuthContext';
import { useNetworkContext } from '../context/NetworkContext';

type Tarea = { titulo: string; completada: boolean };

const Tareas = () => {
  const { user } = useAuthContext();
  const { isOnline } = useNetworkContext();
  const [titulo, setTitulo] = useState('');

  const { results, isPending, error, add, update, deleteDoc } = useRealTimeCollection<Tarea>(
    user ? `tareas/${user.uid}` : null,
  );

  const handleAgregar = async () => {
    if (!titulo.trim()) return;
    await add({ titulo: titulo.trim(), completada: false });
    setTitulo('');
  };

  const ordenadas = [...results].sort((a, b) =>
    String((a as { createdAt?: string }).createdAt ?? '').localeCompare(
      String((b as { createdAt?: string }).createdAt ?? ''),
    ),
  );

  return (
    <IonPage>
      <AppHeader title="Tareas (Realtime)" />

      <IonContent className="ion-padding">
        {!isOnline && <OfflineNotice text="Sin conexión: no puedes agregar, completar ni eliminar tareas." />}
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonItem>
          <IonInput
            label="Nueva tarea"
            labelPlacement="stacked"
            placeholder="Ej: Entregar el challenge"
            value={titulo}
            disabled={!isOnline}
            onIonInput={(e) => setTitulo(e.detail.value ?? '')}
          />
        </IonItem>
        <IonButton expand="block" className="ion-margin-top" onClick={handleAgregar} disabled={!isOnline}>
          Agregar tarea
        </IonButton>

        {isPending && (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
          </div>
        )}

        <IonList className="ion-margin-top">
          {ordenadas.map((t) => (
            <IonItem key={t.id}>
              <IonCheckbox
                slot="start"
                checked={t.completada}
                disabled={!isOnline}
                onIonChange={(e) => {
                  if (e.detail.checked !== t.completada) update(t.id, { completada: e.detail.checked });
                }}
              />
              <IonLabel style={t.completada ? { textDecoration: 'line-through', opacity: 0.6 } : undefined}>
                {t.titulo}
              </IonLabel>
              <IonButton slot="end" fill="clear" color="danger" disabled={!isOnline} onClick={() => deleteDoc(t.id)}>
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {!isPending && ordenadas.length === 0 && (
          <IonText color="medium">
            <p>No hay tareas todavía.</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tareas;
