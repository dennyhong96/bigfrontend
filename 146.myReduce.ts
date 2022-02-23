declare interface Array<T> {
  myReduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;
  myReduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;
  myReduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;
}

Array.prototype.myReduce = function (...args: any[]) {
  // user can omit initialValue, but they can also pass in undefined as initialValue explicitly
  // the way we can check if user passed in an initialValue is by looknig at args length
  let hasInitialValue = args.length > 1;

  // need to throw per spec
  if (!hasInitialValue && this.length === 0) throw new Error();

  const callbackFn = args[0];
  let initialValue = args[1];
  let index = 0;
  if (!hasInitialValue) {
    initialValue = this[0]; // use the first element as initialValue if user doesn't pass one in
    index = 1; // starts off the loop at the second element
  }

  const length = this.length; // handle edge case where callbackFn could modify array length
  for (; index < length; index++) {
    const element = this[index];
    initialValue = callbackFn(initialValue, element, index, this);
  }

  return initialValue;
};
