// @ts-nocheck
import { IonItem, IonLabel, IonCheckbox, IonButton, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

const TaskItem = ({ tarea, onToggle, onDelete }) => {
  return (
    <IonItem>
      <IonCheckbox
        slot="start"
        checked={tarea.completada}
        onIonChange={() => onToggle(tarea.id)}
      />
      <IonLabel style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
        {tarea.titulo}
      </IonLabel>
      <IonButton fill="clear" color="danger" onClick={() => onDelete(tarea.id)}>
        <IonIcon slot="icon-only" icon={trashOutline} />
      </IonButton>
    </IonItem>
  );
};

export default TaskItem;