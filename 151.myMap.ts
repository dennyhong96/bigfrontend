declare interface Array<T> {
  myMap<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];
}

Array.prototype.myMap = function <T, U>(
  callbackfn: (value: T, index: number, array: T[]) => U,
  thisArg?: any
): U[] {
  const len = this.length; // Prevent callback changing array length causing infinite loop
  const result: U[] = [];
  for (let i = 0; i < len; i++) {
    if (!(i in this)) continue; // need to skip empty elements in a sparse input array
    result[i] = callbackfn.call(thisArg, this[i], i, this);
  }
  return result;
};
