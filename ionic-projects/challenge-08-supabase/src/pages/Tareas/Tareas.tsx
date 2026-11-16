import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import type { Session } from '@supabase/supabase-js';
import { logOut } from 'ionicons/icons';
import { useState } from 'react';

import AvatarPicker from '../../components/AvatarPicker/AvatarPicker';
import TareaForm from '../../components/TareaForm/TareaForm';
import TareaList from '../../components/TareaList/TareaList';
import { useAvatar } from '../../hooks/useAvatar/useAvatar';
import { useSession } from '../../hooks/useSession/useSession';
import { useTareas } from '../../hooks/useTareas/useTareas';
import { cerrarSesion } from '../../services/auth/authService';
import type { Tarea } from '../../types/Tarea/Tarea';

interface TareasContenidoProps {
  session: Session;
}

const TareasContenido: React.FC<TareasContenidoProps> = ({ session }) => {
  const { tareas, cargando, error, limpiarError, crear, completar, editar, borrar } = useTareas();
  const avatar = useAvatar(session);
  const [enEdicion, setEnEdicion] = useState<Tarea | null>(null);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={cerrarSesion} aria-label="Cerrar sesión">
              <IonIcon slot="icon-only" icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AvatarPicker url={avatar.url} subiendo={avatar.subiendo} alCapturar={avatar.capturar} />
        <TareaForm alCrear={crear} />
        <TareaList
          tareas={tareas}
          cargando={cargando}
          alCompletar={completar}
          alEditar={setEnEdicion}
          alBorrar={borrar}
        />
        <IonAlert
          isOpen={enEdicion !== null}
          header="Editar tarea"
          inputs={[{ name: 'titulo', type: 'text', value: enEdicion?.titulo }]}
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            {
              text: 'Guardar',
              handler: (datos: { titulo: string }) => {
                if (enEdicion && datos.titulo.trim()) editar(enEdicion.id, datos.titulo.trim());
              },
            },
          ]}
          onDidDismiss={() => setEnEdicion(null)}
        />
        <IonToast
          isOpen={Boolean(error || avatar.error)}
          message={error ?? avatar.error ?? ''}
          duration={3000}
          color="danger"
          onDidDismiss={() => {
            limpiarError();
            avatar.limpiarError();
          }}
        />
      </IonContent>
    </IonPage>
  );
};

const Tareas: React.FC = () => {
  const { session } = useSession();
  return session ? <TareasContenido session={session} /> : null;
};

export default Tareas;
