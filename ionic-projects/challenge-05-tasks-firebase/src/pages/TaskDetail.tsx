// @ts-nocheck
import { useParams, useNavigate } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonIcon, IonText, IonBadge,
} from '@ionic/react';
import { trashOutline, createOutline } from 'ionicons/icons';
import { useTasksContext } from '../context/TasksContext';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tareas, eliminarTarea } = useTasksContext();

  const tarea = tareas.find((t) => t.id === Number(id));

  const handleDelete = () => {
    eliminarTarea(tarea.id);
    navigate('/tareas');
  };

  if (!tarea) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tareas" />
            </IonButtons>
            <IonTitle>Tarea</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText color="medium">
            <p>Esta tarea ya no existe.</p>
          </IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tareas" />
          </IonButtons>
          <IonTitle>Detalle de la tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{tarea.titulo}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonBadge color={tarea.completada ? 'success' : 'medium'}>
              {tarea.completada ? 'Completada' : 'Pendiente'}
            </IonBadge>
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" onClick={() => navigate(`/tareas/${tarea.id}/editar`)}>
          <IonIcon slot="start" icon={createOutline} />
          Editar
        </IonButton>

        <IonButton expand="block" color="danger" onClick={handleDelete}>
          <IonIcon slot="start" icon={trashOutline} />
          Eliminar tarea
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TaskDetail;