import { Device } from '@capacitor/device';

export interface EstadoBateria {
  nivel?: number;
  cargando?: boolean;
}

export const nivelBateria = async (): Promise<EstadoBateria> => {
  try {
    const info = await Device.getBatteryInfo();
    return { nivel: info.batteryLevel, cargando: info.isCharging };
  } catch {
    return {};
  }
};
