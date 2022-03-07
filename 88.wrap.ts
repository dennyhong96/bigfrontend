export function wrap(arr: any[] & { [key in string | symbol | number]: any }) {
  // prop is alway going to be a string, we need to transform it into a number for indexes
  function transformIndexProp(
    prop: string | symbol | number,
    arrLengh: number
  ): string | symbol | number {
    // array object has a Symbol.Iterator symbol, symbol cannot be
    // converted into a number, it throws an error
    if (typeof prop !== "symbol" && Number.isFinite(Number(prop))) {
      prop = Number(prop);
      if (prop < 0) {
        prop += arrLengh;
      }
    }
    return prop;
  }

  return new Proxy(arr, {
    get(target, prop: string | symbol | number) {
      prop = transformIndexProp(prop, target.length);
      return target[prop];
    },

    set(target, prop: string | symbol | number, value) {
      prop = transformIndexProp(prop, target.length);

      // setting negative index leading overflow should throw error
      if (typeof prop === "number" && prop < 0) {
        throw new Error("Negetive index overflow");
      }
      target[prop] = value;
      return true;
    },
  });
}
