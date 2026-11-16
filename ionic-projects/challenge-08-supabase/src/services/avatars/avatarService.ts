import { supabase } from '../../lib/supabase';

export const subirAvatar = async (userId: string, blob: Blob): Promise<string> => {
  const ruta = `${userId}/${Date.now()}.jpg`;
  const { error } = await supabase.storage
    .from('avatars')
    .upload(ruta, blob, { upsert: true, contentType: blob.type || 'image/jpeg' });
  if (error) throw error;
  const { data } = supabase.storage.from('avatars').getPublicUrl(ruta);
  const { error: errorUsuario } = await supabase.auth.updateUser({
    data: { avatar_url: data.publicUrl },
  });
  if (errorUsuario) throw errorUsuario;
  return data.publicUrl;
};
