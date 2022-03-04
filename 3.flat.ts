function flat(arr: any[], depth = 1): any {
  if (depth === 0) return arr;
  const result: any[] = [];
  for (const el of arr) {
    if (Array.isArray(el)) {
      result.push(...flat(el, depth - 1));
    } else {
      result.push(el);
    }
  }
  return result;
}
