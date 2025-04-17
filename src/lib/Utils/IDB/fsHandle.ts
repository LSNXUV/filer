import { openDB } from 'idb';

const DB_NAME = 'fs-handle-db';
const STORE_NAME = 'handles';
const KEY = 'rootDirectory';

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function saveRootDirectoryHandle(handle: FileSystemDirectoryHandle) {
  const db = await getDB();
  await db.put(STORE_NAME, handle, KEY);
}

export async function getRootDirectoryHandle(): Promise<FileSystemDirectoryHandle> {
  const db = await getDB();
  return await db.get(STORE_NAME, KEY);
}

export async function removeRootDirectoryHandle() {
  const db = await getDB();
  await db.delete(STORE_NAME, KEY);
}
