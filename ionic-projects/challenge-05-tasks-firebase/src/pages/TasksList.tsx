// @ts-nocheck
import { useNavigate } from 'react-router-dom';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
  IonContent, IonFab, IonFabButton,
} from '@ionic/react';
import { logOutOutline, add } from 'ionicons/icons';
import TaskList from '../components/TaskList';
import { useTasksContext } from '../context/TasksContext';
import { useAuthContext } from '../context/AuthContext';

const TasksList = () => {
  const navigate = useNavigate();
  const { tareas, alternarTarea, eliminarTarea } = useTasksContext();
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <TaskList
          tareas={tareas}
          onToggle={alternarTarea}
          onDelete={eliminarTarea}
          onOpen={(id) => navigate(`/tareas/${id}`)}
        />

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/tareas/nueva">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default TasksList;