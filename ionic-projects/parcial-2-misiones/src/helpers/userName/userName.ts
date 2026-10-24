import type { User } from 'firebase/auth';

export const getDisplayName = (user: User | null) => {
  if (!user) return '';
  if (user.displayName) return user.displayName;
  return user.email ? user.email.split('@')[0] : 'Usuario';
};
