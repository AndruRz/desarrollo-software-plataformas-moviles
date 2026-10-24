import { useCallback, useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

type CapturedPhoto = {
  base64: string;
  format: string;
};

export const useCamera = () => {
  const [photo, setPhoto] = useState<CapturedPhoto | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const capture = useCallback(async () => {
    try {
      setError(null);
      const image = await Camera.getPhoto({
        quality: 70,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        correctOrientation: true,
      });
      if (image.base64String) {
        setPhoto({ base64: image.base64String, format: image.format });
      }
    } catch (err) {
      const message = (err as Error).message ?? '';
      if (!message.toLowerCase().includes('cancel')) {
        setError('No se pudo abrir la cámara. Revisa los permisos.');
      }
    }
  }, []);

  const save = useCallback(async () => {
    if (!photo) return false;
    try {
      setSaving(true);
      setError(null);
      await Filesystem.writeFile({
        path: `evidencias/evidencia-${Date.now()}.${photo.format}`,
        data: photo.base64,
        directory: Directory.Data,
        recursive: true,
      });
      setPhoto(null);
      return true;
    } catch {
      setError('No se pudo guardar la imagen.');
      return false;
    } finally {
      setSaving(false);
    }
  }, [photo]);

  const discard = useCallback(() => {
    setPhoto(null);
    setError(null);
  }, []);

  const previewSrc = photo ? `data:image/${photo.format};base64,${photo.base64}` : null;

  return { previewSrc, saving, error, capture, save, discard };
};
