import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase/config';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setCargando(false);
    });
    return unsubscribe;
  }, []);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const register = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  return { user, cargando, login, register, logout };
}