// @ts-nocheck
import { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './Home.css';

const Home = () => {
  const [tareas, setTareas] = useState([]);

  const agregarTarea = (nuevaTarea) => {
    setTareas((prev) => [...prev, nuevaTarea]);
  };

  const alternarTarea = (id) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
    );
  };

  const eliminarTarea = (id) => {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <TaskForm onAddTask={agregarTarea} />
        <TaskList tareas={tareas} onToggle={alternarTarea} onDelete={eliminarTarea} />
      </IonContent>
    </IonPage>
  );
};

export default Home;