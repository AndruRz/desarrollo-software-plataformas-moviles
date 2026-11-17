import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

const cargarImagen = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolver, rechazar) => {
    const imagen = new Image();
    imagen.onload = () => resolver(imagen);
    imagen.onerror = () => rechazar(new Error('No se pudo leer la foto'));
    imagen.src = src;
  });

/** Dibuja las líneas de texto como marca de agua en la parte inferior de la imagen. */
export const aplicarMarcaDeAgua = async (dataUrl: string, lineas: string[]): Promise<string> => {
  const imagen = await cargarImagen(dataUrl);
  const lienzo = document.createElement('canvas');
  lienzo.width = imagen.width;
  lienzo.height = imagen.height;
  const ctx = lienzo.getContext('2d');
  if (!ctx) throw new Error('No se pudo preparar la marca de agua');
  ctx.drawImage(imagen, 0, 0);

  const tamano = Math.max(16, Math.round(imagen.width / 28));
  const interlineado = tamano * 1.35;
  const alto = lineas.length * interlineado + tamano * 0.6;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(0, imagen.height - alto, imagen.width, alto);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${tamano}px sans-serif`;
  ctx.textBaseline = 'top';
  lineas.forEach((linea, i) => {
    ctx.fillText(linea, tamano * 0.6, imagen.height - alto + tamano * 0.3 + i * interlineado, imagen.width - tamano);
  });
  return lienzo.toDataURL('image/jpeg', 0.9);
};

export const tomarFotoConMarca = async (lineas: string[]): Promise<string> => {
  const foto = await Camera.getPhoto({
    quality: 80,
    width: 1280,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Camera,
  });
  return aplicarMarcaDeAgua(foto.dataUrl as string, lineas);
};

/** Guarda la foto en el almacenamiento de la app (carpeta fotos/). */
export const guardarFoto = async (dataUrl: string): Promise<string> => {
  const ruta = `fotos/${Date.now()}.jpg`;
  await Filesystem.writeFile({
    path: ruta,
    directory: Directory.Data,
    recursive: true,
    data: dataUrl.split(',')[1],
  });
  return ruta;
};
