import { Network } from '@capacitor/network';
import type { ConnectionStatus } from '@capacitor/network';

export type TipoRed = 'wifi' | 'cellular' | 'none' | 'unknown';

export interface EstadoRed {
  conectado: boolean;
  tipo: TipoRed;
}

const convertir = (estado: ConnectionStatus): EstadoRed => ({
  conectado: estado.connected,
  tipo: estado.connectionType,
});

export const estadoRed = async (): Promise<EstadoRed> => convertir(await Network.getStatus());

export const escucharRed = async (callback: (estado: EstadoRed) => void): Promise<() => void> => {
  const manejador = await Network.addListener('networkStatusChange', (estado) => callback(convertir(estado)));
  return () => {
    void manejador.remove();
  };
};
