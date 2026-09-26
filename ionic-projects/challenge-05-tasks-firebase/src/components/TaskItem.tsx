// @ts-nocheck
import { IonItem, IonLabel, IonCheckbox, IonButton, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

const TaskItem = ({ tarea, onToggle, onDelete, onOpen }) => {
  return (
    <IonItem button onClick={() => onOpen(tarea.id)}>
      <IonCheckbox
        slot="start"
        checked={tarea.completada}
        onClick={(e) => e.stopPropagation()}
        onIonChange={() => onToggle(tarea.id)}
      />
      <IonLabel style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
        {tarea.titulo}
      </IonLabel>
      <IonButton
        fill="clear"
        color="danger"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(tarea.id);
        }}
      >
        <IonIcon slot="icon-only" icon={trashOutline} />
      </IonButton>
    </IonItem>
  );
};

export default TaskItem;