import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'audio-storage',
  encryptionKey: 'my-encryption-key-123',
});

type StorageKey = string;
type StorageValue = string | number | boolean | string[] | null;

export const setItem = (key: StorageKey, value: StorageValue): void => {
  if (value === null) {
    storage.delete(key);
  } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    storage.set(key, value);
  } else if (Array.isArray(value)) {
    storage.set(key, JSON.stringify(value));
  } else {
    throw new Error('Unsupported value type');
  }
};

export const getItem = (key: StorageKey): StorageValue => {
  const stringValue = storage.getString(key);
  if (stringValue !== undefined) {
    try {
      const parsedValue = JSON.parse(stringValue);
      if (Array.isArray(parsedValue)) {
        return parsedValue;
      }
      return parsedValue;
    } catch {
      return stringValue;
    }
  }

  const numberValue = storage.getNumber(key);
  if (numberValue !== undefined) return numberValue;

  const booleanValue = storage.getBoolean(key);
  if (booleanValue !== undefined) return booleanValue;

  return null;
};

export const removeItem = (key: StorageKey): void => {
  storage.delete(key);
};

export const getAllKeys = (): string[] => {
  return storage.getAllKeys();
};


export const setLoginState = (isLoggedIn: boolean) => {
  storage.set('isLoggedIn', isLoggedIn);
};

// Function to retrieve login state
export const getLoginState = (): boolean => {
  return storage.getBoolean('isLoggedIn') || false;
};
