function memo(
  func: (...args: any[]) => void,
  resolver?: (...args: any[]) => string
) {
  const cache = new Map();
  return function (this: any, ...args: any[]) {
    const key = resolver?.(...args) ?? args.join("_");
    if (!cache.has(key)) {
      const res = func.call(this, ...args);
      cache.set(key, res);
    }
    return cache.get(key);
  };
}
