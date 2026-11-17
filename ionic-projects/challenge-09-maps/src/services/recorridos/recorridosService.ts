import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

import type { Recorrido } from '../../types/Recorrido';
import { claveDia } from '../../utils/geo';

const CARPETA = 'recorridos';
const rutaDia = (dia: string) => `${CARPETA}/${dia}.json`;

export const recorridosDelDia = async (dia: string): Promise<Recorrido[]> => {
  try {
    const { data } = await Filesystem.readFile({
      path: rutaDia(dia),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    const texto = typeof data === 'string' ? data : await data.text();
    return JSON.parse(texto) as Recorrido[];
  } catch {
    return [];
  }
};

/** Agrega el recorrido al archivo JSON del día en que empezó (un archivo por día). */
export const guardarRecorrido = async (recorrido: Recorrido): Promise<void> => {
  const dia = claveDia(recorrido.inicio);
  const previos = await recorridosDelDia(dia);
  await Filesystem.writeFile({
    path: rutaDia(dia),
    directory: Directory.Data,
    encoding: Encoding.UTF8,
    recursive: true,
    data: JSON.stringify([...previos, recorrido]),
  });
};

/** Días que tienen recorridos guardados, del más reciente al más antiguo. */
export const diasConRecorridos = async (): Promise<string[]> => {
  try {
    const { files } = await Filesystem.readdir({ path: CARPETA, directory: Directory.Data });
    return files
      .map((archivo) => archivo.name)
      .filter((nombre) => nombre.endsWith('.json'))
      .map((nombre) => nombre.replace('.json', ''))
      .sort()
      .reverse();
  } catch {
    return [];
  }
};
