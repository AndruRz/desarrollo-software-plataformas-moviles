import { useState } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

type WriteArgs = {
  path: string;
  data: unknown;
  directory?: Directory;
  isJson?: boolean;
};

type ReadArgs = {
  path: string;
  directory?: Directory;
  isJson?: boolean;
};

type PathArgs = {
  path: string;
  directory?: Directory;
};

export const useFilesystem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const writeFile = async ({ path, data, directory = Directory.Data, isJson = true }: WriteArgs) => {
    try {
      setLoading(true);
      setError(null);
      const content = isJson ? JSON.stringify(data) : String(data);
      await Filesystem.writeFile({ path, data: content, directory, encoding: Encoding.UTF8, recursive: true });
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const readFile = async ({ path, directory = Directory.Data, isJson = true }: ReadArgs) => {
    try {
      setLoading(true);
      setError(null);
      const result = await Filesystem.readFile({ path, directory, encoding: Encoding.UTF8 });
      const text = typeof result.data === 'string' ? result.data : await result.data.text();
      return isJson ? JSON.parse(text) : text;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async ({ path, directory = Directory.Data }: PathArgs) => {
    try {
      setLoading(true);
      setError(null);
      await Filesystem.deleteFile({ path, directory });
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const listFiles = async ({ path = '', directory = Directory.Data }: Partial<PathArgs> = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await Filesystem.readdir({ path, directory });
      return result.files.map((file) => file.name);
    } catch (err) {
      setError((err as Error).message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createDir = async ({ path, directory = Directory.Data }: PathArgs) => {
    try {
      setLoading(true);
      setError(null);
      await Filesystem.mkdir({ path, directory, recursive: true });
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteDir = async ({ path, directory = Directory.Data }: PathArgs) => {
    try {
      setLoading(true);
      setError(null);
      await Filesystem.rmdir({ path, directory, recursive: true });
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, writeFile, readFile, deleteFile, listFiles, createDir, deleteDir };
};

export default useFilesystem;
