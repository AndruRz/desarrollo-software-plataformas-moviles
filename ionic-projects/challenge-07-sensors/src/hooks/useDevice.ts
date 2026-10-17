import { useCallback, useEffect, useState } from 'react';
import { Device, type BatteryInfo, type DeviceInfo } from '@capacitor/device';

export const useDevice = () => {
  const [battery, setBattery] = useState<BatteryInfo | null>(null);
  const [info, setInfo] = useState<DeviceInfo | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDeviceData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const batteryInfo = await Device.getBatteryInfo();
      const deviceInfo = await Device.getInfo();
      const id = await Device.getId();
      setBattery(batteryInfo);
      setInfo(deviceInfo);
      setDeviceId(id.identifier);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDeviceData();
  }, [loadDeviceData]);

  return { battery, info, deviceId, loading, error, refresh: loadDeviceData };
};

export default useDevice;
