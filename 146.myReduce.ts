// copied from lib.es5.d.ts
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
  const hasInitialValue = args.length > 1; // handle user explicitly passes in undefined as initialValue

  if (!hasInitialValue && this.length === 0) throw new Error(); // throw when array is empty and no initialValue passed in

  const callbackFn = args[0];
  let initialValue = args[1];

  let index = 0;
  if (!hasInitialValue) {
    index = 1;
    initialValue = this[0]; // use the first element as initialValue when user doesn't pass one in
  }

  for (; index < this.length; index++) {
    initialValue = callbackFn(initialValue, this[index], index, this);
  }

  return initialValue;
};

// Example
[1, 2, 3].myReduce((acc, cur) => {
  return acc + cur;
}, 0); // 6
