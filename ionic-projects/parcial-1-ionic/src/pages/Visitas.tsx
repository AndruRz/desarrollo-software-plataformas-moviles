import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonList, IonItem,
  IonLabel, IonBadge, IonButtons, IonButton
} from '@ionic/react';
import { obtenerVisitas, cerrarSesion } from '../utils/storage';
import { Visita, estadoLabel } from '../types';

const colorEstado: Record<string, string> = {
  pendiente: 'warning',
  en_camino: 'primary',
  finalizada: 'success',
};

const Visitas: React.FC = () => {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setVisitas(obtenerVisitas());
  }, []);

  const handleLogout = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas de hoy</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>Salir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {visitas.map(v => (
            <IonItem key={v.id} button onClick={() => navigate(`/tabs/visitas/${v.id}`)}>
              <IonLabel>
                <h2>{v.paciente}</h2>
                <p>{v.hora}</p>
              </IonLabel>
              <IonBadge color={colorEstado[v.estado]}>{estadoLabel[v.estado]}</IonBadge>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Visitas;