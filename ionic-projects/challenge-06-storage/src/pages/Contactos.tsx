import { useCallback, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonFab,
  IonFabButton,
  IonText,
  IonSpinner,
  useIonViewWillEnter,
} from '@ionic/react';
import { add, trashOutline } from 'ionicons/icons';
import AppHeader from '../components/AppHeader';
import OfflineNotice from '../components/OfflineNotice';
import useCollection from '../hooks/useCollection';
import { useAuthContext } from '../context/AuthContext';
import { useNetworkContext } from '../context/NetworkContext';

export type Contacto = { nombre: string; telefono: string; uid: string };

const Contactos = () => {
  const { user } = useAuthContext();
  const { isOnline } = useNetworkContext();
  const { results, isPending, error, getAll, remove } = useCollection<Contacto>('contactos');

  const cargar = useCallback(() => {
    if (user && isOnline) getAll([['uid', '==', user.uid]]);
  }, [user, isOnline, getAll]);

  useIonViewWillEnter(cargar); 
  useEffect(cargar, [cargar]); 

  return (
    <IonPage>
      <AppHeader title="Contactos (Firebase)" />

      <IonContent>
        {!isOnline && <OfflineNotice text="Sin conexión: no puedes agregar, editar ni eliminar contactos." />}
        {error && (
          <IonText color="danger">
            <p className="ion-padding-horizontal">{error}</p>
          </IonText>
        )}
        {isPending && (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
          </div>
        )}

        {!isPending && results.length === 0 && (
          <IonText color="medium">
            <p className="ion-padding">Todavía no hay contactos.</p>
          </IonText>
        )}

        <IonList>
          {results.map((c) => (
            <IonItemSliding key={c.id} disabled={!isOnline}>
              <IonItem routerLink={`/tabs/contactos/${c.id}`} routerDirection="forward" detail disabled={!isOnline}>
                <IonLabel>
                  <h2>{c.nombre}</h2>
                  <p>{c.telefono}</p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => remove(c.id)}>
                  <IonIcon slot="icon-only" icon={trashOutline} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/tabs/contactos/nuevo" disabled={!isOnline}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Contactos;
