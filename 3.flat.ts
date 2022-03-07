type Func = (arr: Array<any>, depth?: number) => Array<any>;

export const flat: Func = function (arr, depth = 1) {
  if (depth === 0) return arr;
  let result: any[] = [];
  for (const el of arr) {
    if (Array.isArray(el)) {
      result.push(...flat(el, depth - 1));
    } else {
      result.push(el);
    }
  }
  return result;
};
