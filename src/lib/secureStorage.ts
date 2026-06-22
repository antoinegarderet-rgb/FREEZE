import * as SecureStore from 'expo-secure-store';

/**
 * Supabase persists session data as a single JSON blob that can exceed
 * SecureStore's per-key size limit, so large values are chunked across keys.
 */
const CHUNK_SIZE = 1800;

function chunkKey(key: string, index: number): string {
  return `${key}_chunk_${index}`;
}

async function getChunkCount(key: string): Promise<number> {
  const raw = await SecureStore.getItemAsync(`${key}_chunk_count`);
  return raw ? parseInt(raw, 10) : 0;
}

export const secureStorageAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    const count = await getChunkCount(key);
    if (count === 0) {
      return SecureStore.getItemAsync(key);
    }
    const chunks: string[] = [];
    for (let i = 0; i < count; i++) {
      const chunk = await SecureStore.getItemAsync(chunkKey(key, i));
      if (chunk === null) return null;
      chunks.push(chunk);
    }
    return chunks.join('');
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await SecureStore.deleteItemAsync(key);
    const previousCount = await getChunkCount(key);
    for (let i = 0; i < previousCount; i++) {
      await SecureStore.deleteItemAsync(chunkKey(key, i));
    }

    if (value.length <= CHUNK_SIZE) {
      await SecureStore.setItemAsync(`${key}_chunk_count`, '0');
      await SecureStore.setItemAsync(key, value);
      return;
    }

    const chunkCount = Math.ceil(value.length / CHUNK_SIZE);
    for (let i = 0; i < chunkCount; i++) {
      const chunk = value.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      await SecureStore.setItemAsync(chunkKey(key, i), chunk);
    }
    await SecureStore.setItemAsync(`${key}_chunk_count`, String(chunkCount));
  },
  removeItem: async (key: string): Promise<void> => {
    const count = await getChunkCount(key);
    for (let i = 0; i < count; i++) {
      await SecureStore.deleteItemAsync(chunkKey(key, i));
    }
    await SecureStore.deleteItemAsync(`${key}_chunk_count`);
    await SecureStore.deleteItemAsync(key);
  },
};
