// @ts-nocheck
import { createContext, useContext, useState } from 'react';

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tareas, setTareas] = useState([]);

  const agregarTarea = (nuevaTarea) => {
    setTareas((prev) => [...prev, { id: Date.now(), completada: false, ...nuevaTarea }]);
  };

  const editarTarea = (id, cambios) => {
    setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, ...cambios } : t)));
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
    <TasksContext.Provider
      value={{ tareas, agregarTarea, editarTarea, alternarTarea, eliminarTarea }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  return useContext(TasksContext);
}