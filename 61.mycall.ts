type FunctionExtended = Function & {
  mycall: (thisArg: any, ...args: any[]) => any;
};

(Function.prototype as FunctionExtended).mycall = function (
  thisArg: any,
  ...args: any[]
) {
  thisArg = Object(thisArg ?? window); // Objectify primitive types
  thisArg = Object(thisArg);
  const func = Symbol(); // unique prop name
  thisArg[func] = this; // this is the function we want to call
  const res = thisArg[func](...args);
  delete thisArg[func]; // do not alter the thisArg
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
