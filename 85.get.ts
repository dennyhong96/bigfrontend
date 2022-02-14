export function get(
  source: Record<any, any>,
  path: string | string[],
  defaultValue: any = undefined
): any {
  if (typeof source !== "object" || source === null) return defaultValue;

  // Normalize path into an array
  if (typeof path === "string") {
    if (!path.length) return defaultValue;
    path = path.split(/[\.\[\]]/g).filter(Boolean); // ['a', 'b', 'c', '2']
    if (!path.length) return defaultValue;
  }

  // Recursively get the result
  const currPath = path.shift()!;
  const value = source[currPath];
  if (value !== undefined) {
    if (path.length === 0) {
      return value;
    } else {
      return get(value, path, defaultValue);
    }
  } else {
    return defaultValue;
  }
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
