export function get(
  source: Record<any, any>,
  path: string | (number | string)[],
  defaultValue: any = undefined
): any {
  path = Array.isArray(path) ? path : path.split(/\.|\[|\]/g).filter(Boolean);
  path = path.map(transformKey);
  if (!path.length) return defaultValue; // if path is initially empty, need to return defaultValue

  const _get = (source: Record<any, any>, path: (number | string)[]): any => {
    if (!path.length) return source;
    const currPath = path.shift()!;
    if (source[currPath]) {
      return _get(source[currPath], path); // currPath exists in source, keep finding with rest paths
    }
    return defaultValue; // cannot find a result, use default value
  };
  return _get(source, path);
}

function transformKey(p: string | number): string | number {
  if (typeof p === "number" || !isFinite(Number(p))) return p;
  if (p.length > 1 && p.startsWith("0")) return p;
  return Number(p);
}

// Example
const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

console.log(get(obj, ""));
console.log(get(obj, "a.b.c")); // [1,2,3]
console.log(get(obj, "a.b.c.0")); // 1
console.log(get(obj, "a.b.c[1]")); // 2
console.log(get(obj, ["a", "b", "c", "2"])); // 3
console.log(get(obj, "a.b.c[3]")); // undefined
console.log(get(obj, "a.c", "bfe")); // 'bfe'
