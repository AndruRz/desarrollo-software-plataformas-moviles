import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IonPage, IonContent, IonItem, IonInput, IonButton, IonIcon, IonText } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import AppHeader from '../components/AppHeader';
import OfflineNotice from '../components/OfflineNotice';
import useCollection from '../hooks/useCollection';
import { useAuthContext } from '../context/AuthContext';
import { useNetworkContext } from '../context/NetworkContext';
import type { Contacto } from './Contactos';

const ContactoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { isOnline } = useNetworkContext();
  const { isPending, error, getById, add, update, remove } = useCollection<Contacto>('contactos');

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [noExiste, setNoExiste] = useState(false);

  const editando = Boolean(id) && id !== 'nuevo';

  useEffect(() => {
    if (!editando || !id || !isOnline) return;
    getById(id).then((c) => {
      if (!c) return setNoExiste(true);
      setNombre(c.nombre);
      setTelefono(c.telefono);
    });
  }, [editando, id, isOnline, getById]);

  const handleGuardar = async () => {
    if (!user || !nombre.trim() || !telefono.trim()) return;
    const ok = editando && id ? await update(id, { nombre, telefono }) : await add({ nombre, telefono, uid: user.uid });
    if (ok) navigate('/tabs/contactos', { replace: true });
  };

  const handleEliminar = async () => {
    if (!id) return;
    if (await remove(id)) navigate('/tabs/contactos', { replace: true });
  };

  return (
    <IonPage>
      <AppHeader title={editando ? 'Detalle del contacto' : 'Nuevo contacto'} back="/tabs/contactos" />

      <IonContent className="ion-padding">
        {!isOnline && <OfflineNotice text="Sin conexión: las acciones están deshabilitadas." />}
        {noExiste && (
          <IonText color="medium">
            <p>Este contacto ya no existe.</p>
          </IonText>
        )}
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonItem>
          <IonInput
            label="Nombre"
            labelPlacement="stacked"
            placeholder="Nombre"
            value={nombre}
            onIonInput={(e) => setNombre(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Teléfono"
            labelPlacement="stacked"
            placeholder="Teléfono"
            type="tel"
            value={telefono}
            onIonInput={(e) => setTelefono(e.detail.value ?? '')}
          />
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" onClick={handleGuardar} disabled={!isOnline || isPending}>
          {editando ? 'Guardar cambios' : 'Guardar contacto'}
        </IonButton>

        {editando && (
          <IonButton expand="block" color="danger" onClick={handleEliminar} disabled={!isOnline || isPending}>
            <IonIcon slot="start" icon={trashOutline} />
            Eliminar contacto
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ContactoForm;
