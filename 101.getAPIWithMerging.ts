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
  return `${path}${hashConfig(config)}`;
}

function hashConfig(config: any): string {
  switch (Object.prototype.toString.call(config)) {
    case "[object Null]": {
      return "null";
    }
    case "[object Undefined]": {
      return "undefined";
    }
    case "[object String]":
    case "[object Number]":
    case "[object Boolean]": {
      return `${config}`;
    }
    case "[object Array]": {
      return `[${config.map((el: any) => hashConfig(el)).join(",")}]`;
    }
    case "[object Object]": {
      return `{${Object.keys(config)
        .sort()
        .map((key) => `${key}:${hashConfig(config[key])}`)
        .join(",")}}`;
    }
    default: {
      return "";
    }
  }
}
