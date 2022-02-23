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
  const result: U[] = [];
  const length = this.length; // handle edge case where callbackFn modifies the array
  for (let i = 0; i < length; i++) {
    if (!(i in this)) continue; // handle edge case where array is sparse with empty slots, skip those
    const element = this[i];
    result[i] = callbackfn.call(thisArg, element, i, this);
  }
  return result;
};
