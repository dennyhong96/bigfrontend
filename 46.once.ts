function once(func: Function) {
  let res: any;
  let called = false;
  return function (this: any, ...args: any[]) {
    if (!called) {
      res = func.call(this, ...args);
      called = true;
    }
    return res;
  };
}

// Example:
function func(this: { a: number }, b: number, c: number) {
  return this.a + b + c;
}
const onced = once(func);
const obj = {
  a: 1,
  onced,
};
console.log(obj.onced(2, 3)); // 6

export {};
