function isEqual(a: any, b: any, compared = new Map<any, any>()): boolean {
  if (a === b) return true; // handle primitives, and reference equality

  if (typeof a !== "object" || typeof b !== "object") return false;

  // handle circular reference
  if (compared.has(a) && compared.get(a) === b) return true;
  compared.set(a, b);

  // compare each key and value of the object/array recursively
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (let i = 0; i < aKeys.length; i++) {
    const akey = aKeys[i];
    const bKey = bKeys[i];
    const aVal = a[akey];
    const bVal = b[bKey];
    if (!isEqual(akey, bKey, compared) || !isEqual(aVal, bVal, compared))
      return false;
  }
  return true;
}

function isEqual2(a: any, b: any, compared = new Map<any, any>()): boolean {
  // console.log(a, b, new Map(compared));
  if (
    typeof a === "object" &&
    typeof b === "object" &&
    a !== null &&
    b !== null
  ) {
    if (compared.has(a) && compared.get(a) === b) return true;
    compared.set(a, b);
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      let result = true;
      for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i], compared)) result = false;
      }
      return result;
    } else if (!Array.isArray(a) && !Array.isArray(b)) {
      const aKeys = [...Object.keys(a), ...Object.getOwnPropertySymbols(a)];
      const bKeys = [...Object.keys(b), ...Object.getOwnPropertySymbols(b)];
      if (!isEqual(aKeys, bKeys, compared)) return false;
      let result = true;
      for (let i = 0; i < aKeys.length; i++) {
        if (!isEqual(a[i], b[i], compared)) result = false;
      }
      return result;
    } else {
      return false;
    }
  }
  return a === b;
}

// Example
const a: any = {};
a.self = a;
const b: any = { self: a };
console.log(isEqual(a, b));

export {};
