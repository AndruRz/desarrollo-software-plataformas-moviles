import { useState, type DependencyList } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db/dexie';

const useDexie = <T extends { id?: number }>(
  table: string,
  filterFn: ((item: T) => boolean) | null = null,
  deps: DependencyList = [],
) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const results =
    useLiveQuery(
      () => (filterFn ? db.table<T, number>(table).filter(filterFn).toArray() : db.table<T, number>(table).toArray()),
      [table, ...deps],
    ) ?? [];

  const add = async (data: Omit<T, 'id'>) => {
    setIsPending(true);
    setError(null);
    try {
      await db.table(table).add({ ...data, createdAt: new Date().toISOString() });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  const update = async (id: number, data: Partial<T>) => {
    setIsPending(true);
    setError(null);
    try {
      await db.table(table).update(id, data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  const deleteItem = async (id: number) => {
    setIsPending(true);
    setError(null);
    try {
      await db.table(table).delete(id);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  return { results, isPending, error, add, update, deleteItem };
};

export default useDexie;
