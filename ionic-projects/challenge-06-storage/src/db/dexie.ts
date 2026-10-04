import Dexie, { type Table } from 'dexie';

export type Fruta = {
  id?: number;
  nombre: string;
  proveedor?: string;
  fechaCosecha?: string;
  createdAt?: string;
};

const db = new Dexie('MiAppDB') as Dexie & { frutas: Table<Fruta, number> };

db.version(1).stores({
  frutas: '++id, nombre, createdAt',
});

db.version(2).stores({
  frutas: '++id, nombre, proveedor, fechaCosecha, createdAt',
});

export default db;
