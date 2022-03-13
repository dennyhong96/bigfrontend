export function set(
  obj: { [key: string | number]: any },
  path: string | (string | number)[],
  value?: any
) {
  path = transformPath(path);

  // set properties on the passed in object and return it
  const _set = (
    obj: { [key: string | number]: any },
    path: (string | number)[],
    value?: any
  ) => {
    if (!path.length) return value;
    const currPath = path.shift()!;

    // if currPath does not exist on the object, and there are paths after currPath
    // we need to create an empty object/array and keep recursing
    if (!obj[currPath] && path.length > 0) {
      if (typeof path[0] === "number") {
        obj[currPath] = _set([], path, value); // next path is a number index, create an empty array
      } else {
        obj[currPath] = _set({}, path, value); // next path is a string obejct key, create an empty object
      }
    } else {
      // handle cases for setting a value on props nested inside a existing prop: _set({a:{b:3}}, ['a','b'])
      // handles base case for setting a value on a non-existing prop: _set(undefined, [])
      obj[currPath] = _set(obj[currPath], path, value);
    }

    return obj;
  };
  return _set(obj, path, value);
}

function transformPath(path: string | (string | number)[]) {
  path = Array.isArray(path) ? path : path.split(/\.|\[|\]/g).filter(Boolean);
  return path.map((p) => {
    if (typeof p === "number" || !isFinite(Number(p))) return p;
    if (p.length > 1 && p.startsWith("0")) return p;
    return Number(p);
  });
}

// Example
const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

console.log(set(obj, "a.c.d[0]", "BFE"));
// console.log(obj)
