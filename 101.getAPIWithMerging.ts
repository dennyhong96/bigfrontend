declare function getAPI<T>(path: string, config: object): Promise<T>;

interface ICacheEntry {
  promise: Promise<any>;
  timestamp: number;
}

const cache = new Map<string, ICacheEntry>();

function getAPIWithMerging<T>(path: string, config: object): Promise<T> {
  const key = generateHash(path, config);
  if (!cache.has(key) || Date.now() - cache.get(key)!.timestamp > 1000) {
    const promise = getAPI(path, config);
    cache.set(key, {
      promise,
      timestamp: Date.now(),
    });
  }
  return cache.get(key)!.promise;
}

getAPIWithMerging.clearCache = () => {
  cache.clear();
};

function generateHash(path: string, config: object): string {
  return `${path}::${serialize(config)}`;
}

const serialize = (config: any): string => {
  // Handle primitives
  if (
    ["string", "number", "boolean"].includes(typeof config) ||
    config === undefined ||
    config === null
  ) {
    return `${config}`;
  }

  // Handle array
  if (Array.isArray(config)) {
    return `[${config.map((el) => serialize(el)).join(",")}]`;
  }

  // use sort to ignore object entry order in config
  return `{${Object.keys(config)
    .sort()
    .map((key) => `${key}:${serialize(config[key])}`)
    .join(",")}}`;
};
