declare global {
  interface Window {
    myLocalStorage: {
      getItem(key: string): any;
      setItem(key: string, value: string, maxAge: number): void;
      removeItem(key: string): void;
      clear(): void;
    };
  }
}

interface IStorageEntryValue {
  value: string;
  createdOn: number;
  maxAge?: number;
}

// The idea is to store a structured JSON as localstorage value, which has createdOn and maxAge in addition to value
window.myLocalStorage = {
  getItem(key: string) {
    const storageEntryStr = localStorage.getItem(key);
    if (storageEntryStr === null) return null;
    try {
      const storageEntryValue = JSON.parse(storageEntryStr);
      const { value, createdOn, maxAge } = storageEntryValue;
      if (maxAge === undefined) return value;
      if (
        !Number.isFinite(Number(maxAge)) ||
        !Number.isFinite(Number(createdOn))
      ) {
        this.removeItem(key); // bad entry, remote it
        return null;
      }
      if (Date.now() - Number(createdOn) >= Number(maxAge)) {
        this.removeItem(key); // expired
        return null;
      }
      return value;
    } catch (err) {
      return storageEntryStr; // this value is not set by myLocalStorage.setItem
    }
  },

  setItem(key: string, value: string, maxAge: number) {
    const storageEntryValue: Partial<IStorageEntryValue> = {
      value,
      createdOn: Date.now(),
      ...(maxAge !== undefined && { maxAge }),
    };
    localStorage.setItem(key, JSON.stringify(storageEntryValue));
  },

  removeItem(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

export {};
