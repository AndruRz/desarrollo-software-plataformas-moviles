import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const useCamera = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getImage = async (source: CameraSource) => {
    try {
      setError(null);
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source,
      });
      setPhoto(image.webPath ?? null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const takePhoto = () => getImage(CameraSource.Camera);
  const pickFromGallery = () => getImage(CameraSource.Photos);

  return { photo, error, takePhoto, pickFromGallery };
};

export default useCamera;
