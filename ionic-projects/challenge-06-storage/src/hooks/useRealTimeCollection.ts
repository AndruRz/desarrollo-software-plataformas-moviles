import { useEffect, useState } from 'react';
import { ref, push, set, update as rtdbUpdate, remove, onValue } from 'firebase/database';
import { rtdb } from '../firebase/config';

export type WithId<T> = T & { id: string };

const useRealTimeCollection = <T extends object>(table: string | null) => {
  const [results, setResults] = useState<WithId<T>[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!table) {
      setResults([]);
      return;
    }
    setIsPending(true);

    const unsubscribe = onValue(
      ref(rtdb, table),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.entries(snapshot.val() as Record<string, T>).map(
            ([id, value]) => ({ id, ...value }) as WithId<T>,
          );
          setResults(data);
        } else {
          setResults([]);
        }
        setIsPending(false);
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      },
    );

    return () => unsubscribe();
  }, [table]);

  const add = async (data: T) => {
    if (!table) return null;
    setError(null);
    try {
      return await push(ref(rtdb, table), { ...data, createdAt: new Date().toISOString() });
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  const setDoc = async (id: string, data: T) => {
    if (!table) return false;
    setError(null);
    try {
      await set(ref(rtdb, `${table}/${id}`), { ...data, updatedAt: new Date().toISOString() });
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    }
  };

  const update = async (id: string, data: Partial<T>) => {
    if (!table) return false;
    setError(null);
    try {
      await rtdbUpdate(ref(rtdb, `${table}/${id}`), { ...data, updatedAt: new Date().toISOString() });
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    }
  };

  const deleteDoc = async (id: string) => {
    if (!table) return false;
    setError(null);
    try {
      await remove(ref(rtdb, `${table}/${id}`));
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    }
  };

  return { results, isPending, error, add, setDoc, update, deleteDoc };
};

export default useRealTimeCollection;
