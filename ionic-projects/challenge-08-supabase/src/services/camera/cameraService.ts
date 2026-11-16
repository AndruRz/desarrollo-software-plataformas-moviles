import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const tomarFoto = async (): Promise<Blob> => {
  const foto = await Camera.getPhoto({
    quality: 80,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
  });
  const respuesta = await fetch(foto.dataUrl as string);
  return respuesta.blob();
};
