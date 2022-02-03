function isEqual(a: any, b: any, cachedRes = new Map<any, any>()): boolean {
  if (
    typeof a === "object" &&
    typeof b === "object" &&
    a !== null &&
    b !== null
  ) {
    if (cachedRes.has(a) && cachedRes.get(a) === b) return true; // Handle circular reference
    cachedRes.set(a, b);
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      let res = true;
      for (let i = 0; i < a.length; i++) {
        const elA = a[i];
        const elB = b[i];
        if (!isEqual(elA, elB, cachedRes)) res = false;
      }
      return res;
    } else if (!Array.isArray(a) && !Array.isArray(b)) {
      if (!isEqual(Object.keys(a), Object.keys(b), cachedRes)) return false;
      if (!isEqual(Object.values(a), Object.values(b), cachedRes)) return false;
      return true;
    } else {
      return false;
    }
  }
  return a === b;
}

export {};
