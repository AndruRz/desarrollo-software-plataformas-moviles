import { supabase } from '../../lib/supabase';
import type { Tarea } from '../../types/Tarea/Tarea';

export const listarTareas = async (): Promise<Tarea[]> => {
  const { data, error } = await supabase.from('tareas').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Tarea[];
};

export const crearTarea = async (titulo: string): Promise<Tarea> => {
  const { data, error } = await supabase.from('tareas').insert({ titulo }).select().single();
  if (error) throw error;
  return data as Tarea;
};

export const completarTarea = async (id: number, completada: boolean): Promise<void> => {
  const { error } = await supabase.from('tareas').update({ completada }).eq('id', id);
  if (error) throw error;
};

export const editarTitulo = async (id: number, titulo: string): Promise<void> => {
  const { error } = await supabase.from('tareas').update({ titulo }).eq('id', id);
  if (error) throw error;
};

export const borrarTarea = async (id: number): Promise<void> => {
  const { error } = await supabase.from('tareas').delete().eq('id', id);
  if (error) throw error;
};

export const suscribirseATareas = (
  alInsertar: (tarea: Tarea) => void,
  alActualizar: (tarea: Tarea) => void,
  alBorrar: (id: number) => void,
): (() => void) => {
  const canal = supabase
    .channel('cambios-tareas')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tareas' }, (payload) => {
      if (payload.eventType === 'INSERT') alInsertar(payload.new as Tarea);
      if (payload.eventType === 'UPDATE') alActualizar(payload.new as Tarea);
      if (payload.eventType === 'DELETE') alBorrar((payload.old as Partial<Tarea>).id as number);
    })
    .subscribe();
  return () => {
    supabase.removeChannel(canal);
  };
};
