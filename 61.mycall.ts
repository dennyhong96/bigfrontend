type FunctionExtended = Function & {
  mycall: (thisArg: any, ...args: any[]) => any;
};

(Function.prototype as FunctionExtended).mycall = function (
  thisArg: any,
  ...args: any[]
) {
  thisArg = Object(thisArg ?? window); // wrap primitive values, if none passed in, use window
  const funcKey = Symbol(); // unique prop name to prevent func prop name conflict with thisArg's prop names
  thisArg[funcKey] = this; // this is the function we want to call
  const res = thisArg[funcKey](...args);
  delete thisArg[funcKey]; // do not alter the thisArg
  return res;
};

// Example
function test(a: string) {
  // @ts-ignore
  console.log(this);
  console.log(a);
}

// @ts-ignore
(test as FunctionExtended).mycall({}, "abc");
test.call({}, "abc");

export {};
