import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonItem, IonLabel, IonButton
} from '@ionic/react';
import { obtenerVisitas, actualizarVisita } from '../utils/storage';
import { Visita, EstadoVisita, estadoLabel } from '../types';

const siguienteEstado: Record<EstadoVisita, EstadoVisita> = {
  pendiente: 'en_camino',
  en_camino: 'finalizada',
  finalizada: 'finalizada',
};

const VisitaDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [visita, setVisita] = useState<Visita | null>(null);

  useEffect(() => {
    const encontrada = obtenerVisitas().find(v => v.id === id);
    setVisita(encontrada ?? null);
  }, [id]);

  const cambiarEstado = () => {
    if (!visita) return;
    const actualizada = { ...visita, estado: siguienteEstado[visita.estado] };
    actualizarVisita(actualizada);
    setVisita(actualizada);
  };

  if (!visita) {
    return (
      <IonPage>
        <IonContent className="ion-padding">Visita no encontrada</IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/visitas" />
          </IonButtons>
          <IonTitle>Detalle de visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>Paciente</IonLabel>
          <IonLabel slot="end">{visita.paciente}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Hora</IonLabel>
          <IonLabel slot="end">{visita.hora}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Estado</IonLabel>
          <IonLabel slot="end">{estadoLabel[visita.estado]}</IonLabel>
        </IonItem>
        <IonButton
          expand="block"
          className="ion-margin-top"
          disabled={visita.estado === 'finalizada'}
          onClick={cambiarEstado}
        >
          {visita.estado === 'pendiente'
            ? 'Marcar en camino'
            : visita.estado === 'en_camino'
              ? 'Marcar finalizada'
              : 'Visita finalizada'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default VisitaDetalle;