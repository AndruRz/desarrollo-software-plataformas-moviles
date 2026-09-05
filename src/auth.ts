// Pequeño helper para no tocar localStorage directamente desde las páginas.
// El "token" en este challenge es simple: solo guardamos "logged" = "true".

const TOKEN_KEY = 'logged';

export const isLogged = (): boolean => {
  return localStorage.getItem(TOKEN_KEY) === 'true';
};

export const login = (): void => {
  localStorage.setItem(TOKEN_KEY, 'true');
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
