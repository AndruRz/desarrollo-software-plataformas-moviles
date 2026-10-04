import { useCallback, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  type WhereFilterOp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export type Filter = [string, WhereFilterOp, unknown];
export type WithId<T> = T & { id: string };

const useCollection = <T extends object>(table: string) => {
  const [results, setResults] = useState<WithId<T>[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = useCallback(
    async (filters: Filter[] = []) => {
      setIsPending(true);
      setError(null);
      try {
        let q = query(collection(db, table));
        for (const [field, op, value] of filters) {
          q = query(q, where(field, op, value));
        }
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as WithId<T>);
        setResults(docs);
        return docs;
      } catch (err) {
        setError((err as Error).message);
        return [];
      } finally {
        setIsPending(false);
      }
    },
    [table],
  );

  const getById = useCallback(
    async (id: string) => {
      setIsPending(true);
      setError(null);
      try {
        const snap = await getDoc(doc(db, table, id));
        return snap.exists() ? ({ id: snap.id, ...snap.data() } as WithId<T>) : null;
      } catch (err) {
        setError((err as Error).message);
        return null;
      } finally {
        setIsPending(false);
      }
    },
    [table],
  );

  const add = async (data: T) => {
    setIsPending(true);
    setError(null);
    try {
      const ref = await addDoc(collection(db, table), { ...data, createdAt: serverTimestamp() });
      return ref;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setIsPending(false);
    }
  };

  const update = async (id: string, data: Partial<T>) => {
    setIsPending(true);
    setError(null);
    try {
      await updateDoc(doc(db, table, id), { ...data, updatedAt: serverTimestamp() });
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setIsPending(false);
    }
  };

  const remove = async (id: string) => {
    setIsPending(true);
    setError(null);
    try {
      await deleteDoc(doc(db, table, id));
      setResults((prev) => prev.filter((r) => r.id !== id));
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setIsPending(false);
    }
  };

  return { results, isPending, error, getAll, getById, add, update, remove };
};

export default useCollection;
