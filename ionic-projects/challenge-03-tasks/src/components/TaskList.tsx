// @ts-nocheck
import { IonList, IonText } from '@ionic/react';
import TaskItem from './TaskItem';

const TaskList = ({ tareas, onToggle, onDelete }) => {
  if (tareas.length === 0) {
    return (
      <IonText color="medium">
        <p>No hay tareas todavía.</p>
      </IonText>
    );
  }

  return (
    <IonList>
      {tareas.map((tarea) => (
        <TaskItem key={tarea.id} tarea={tarea} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </IonList>
  );
};

export default TaskList;