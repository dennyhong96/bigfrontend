interface IStoreEntryValue {
  value: string;
  createdOn: number;
  maxAge?: number;
}

interface DocumentExtended extends Document {
  myCookie?: string;
}

// enable myCookie
function install() {
  const cookieStore = new Map<string, IStoreEntryValue>();
  // cookieKey -> { value: cookieValue, createdOn: number, maxAge?: number }

  Object.defineProperty(document, "myCookie", {
    get(): string {
      const cookieKeyValuePairs: string[] = [];
      for (const [cookieKey, storeEntryValue] of cookieStore) {
        if (
          storeEntryValue.maxAge !== undefined &&
          Date.now() >= storeEntryValue.createdOn + storeEntryValue.maxAge
        ) {
          cookieStore.delete(cookieKey); // Cookie storeEntryValue expired
          continue;
        }
        cookieKeyValuePairs.push(`${cookieKey}=${storeEntryValue.value}`);
      }
      return cookieKeyValuePairs.join("; ");
    },
    set(value: string): void {
      value = value.replace(/\s/g, "");
      const [cookieEntry, ...options] = value.split(";");
      const [cookieKey, cookieValue] = cookieEntry.split("=");
      if (!cookieKey || !cookieValue) return;
      const storeEntryValue: Partial<IStoreEntryValue> = {
        value: cookieValue,
        createdOn: Date.now(),
      };
      options.forEach((option) => {
        const [optionName, optionValue] = option.split("=");
        if (!optionName || !optionValue) return;
        if (optionName === "max-age") {
          const maxAge = parseInt(optionValue);
          if (!Number.isFinite(maxAge)) return;
          storeEntryValue.maxAge = maxAge * 1000;
        }
      });
      cookieStore.set(cookieKey, storeEntryValue as IStoreEntryValue);
    },

    configurable: true, // configurable: true so we can delete it when uninstalling
  });
}

// disable myCookie
function uninstall() {
  delete (document as DocumentExtended)["myCookie"];
}
